#!/usr/bin/env node
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, dirname, extname, isAbsolute, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import type { ServerNotification, ServerRequest } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { Equalang, EqualangError, SITE, VERSION, type Job, type Source } from './api.js';

/*
 * Equalang as tools an agent can call.
 *
 * Three things shaped this file.
 *
 * A file never passes through the model. A tool takes where a file is -- a
 * path on this machine, or a public URL -- and answers with where the results
 * were written. A 5 MB PDF in a tool result would cost a fortune in context
 * to say nothing; MCP has no file type anyway.
 *
 * A job lives inside one tool call. Handing back a job id and trusting the
 * model to poll is a loop that gets abandoned halfway, so the tool waits --
 * but not past what a client allows a call, after which the caller gets the
 * id and an instruction to use check_job.
 *
 * Work costs the user's credits, so the user is told a number first:
 * estimate_cost uploads a file without starting anything and answers with the
 * most a job on it can cost, and its file_id starts the job without a second
 * upload.
 */

// Long enough that most documents finish inside one call, short enough to
// stay under the timeout MCP clients apply to a tool call.
const DEFAULT_WAIT_SECONDS = 50;
const MAX_WAIT_SECONDS = 240;

const api = new Equalang(process.env.EQUALANG_API_KEY?.trim() || undefined);
if (!process.env.EQUALANG_API_KEY?.trim()) {
  // The key is a credential for the API, not a precondition of this process:
  // a keyless server still answers initialize and tools/list, which is how
  // clients and directories inspect it. stderr, because stdout is the protocol.
  console.error('equalang-mcp: EQUALANG_API_KEY is not set; tools that need it will answer with how to get one.');
}

// Where the results of a job still running when its call returned belong:
// check_job, called later, has only the id. This process outlives the call.
const destinations = new Map<string, string>();

const server = new McpServer({ name: 'equalang', version: VERSION }, {
  // Read by the model once, before any tool: the things that are true of all of them.
  instructions:
    'Equalang translates whole files with their layout kept, transcribes recordings, and translates plain text. ' +
    'Give tools an absolute path or a public URL; they answer with the paths they wrote, never with file contents -- do not read a result back unless asked. ' +
    "Jobs spend the user's credits: before translate_file or transcribe_recording, tell the user the cost (estimate_cost gives the number for a file, free) and get their agreement; " +
    'never process many files on your own say-so. A tool that answers before its job is done gives a job_id: call check_job with it. ' +
    'Language codes come from list_languages. Retry a failure only when it says retryable: true.',
});

/**
 * An answer, said twice: as text for every client, and as structuredContent
 * for those that read it. Files written to disk are also named as resource
 * links, which is how MCP says "here is a file" without carrying its bytes.
 */
function text(payload: Record<string, unknown>, written: Array<{ path: string; kind: string }> = []) {
  return {
    content: [
      { type: 'text' as const, text: JSON.stringify(payload, null, 2) },
      ...written.map(({ path, kind }) => ({
        type: 'resource_link' as const, uri: pathToFileURL(path).href, name: basename(path), description: kind,
      })),
    ],
    structuredContent: payload,
  };
}

/** `isError` marks it a failure; without it a model reads the message as a result and carries on. */
function failure(cause: unknown) {
  const error = cause instanceof EqualangError ? cause : new EqualangError(cause instanceof Error ? cause.message : String(cause));
  return {
    isError: true,
    content: [{
      type: 'text' as const,
      text: JSON.stringify({ error: error.message, code: error.code || undefined, retryable: error.retryable, ...(error.data ?? {}) }, null, 2),
    }],
  };
}

/** A path on this machine, or a public URL the API fetches itself. */
function sourceOf(source: string | undefined, fileId: string | undefined): Source {
  if (Boolean(source) === Boolean(fileId)) {
    throw new EqualangError('Pass exactly one of source (a path or URL) and file_id (from estimate_cost).', 'INVALID_SOURCE');
  }
  if (fileId) return { fileId };
  if (/^https?:\/\//i.test(source!)) return { url: source! };
  const path = source!.startsWith('~/') ? join(homedir(), source!.slice(2)) : source!;
  if (!isAbsolute(path)) {
    throw new EqualangError(`"${source}" is not an absolute path or an http(s) URL. This server does not share the agent's working directory.`, 'INVALID_SOURCE');
  }
  return { path };
}

/**
 * Beside the source, unless the caller chose somewhere. A file uploaded by
 * estimate_cost is remembered by where it came from; a URL has no "beside".
 */
function destinationOf(source: Source, outputDir: string | undefined): string | undefined {
  if (outputDir) return resolve(outputDir);
  if ('path' in source) return dirname(source.path);
  return 'fileId' in source ? destinations.get(source.fileId) : undefined;
}

/** A name that is free in `directory`: a result never overwrites what is already there. */
async function freeName(directory: string, filename: string): Promise<string> {
  const extension = extname(filename);
  const stem = filename.slice(0, filename.length - extension.length);
  for (let n = 0; ; n++) {
    const candidate = join(directory, n === 0 ? filename : `${stem} (${n})${extension}`);
    if (!(await stat(candidate).then(() => true, () => false))) return candidate;
  }
}

/** What the model needs about a job; files are named by where they were written. */
async function report(job: Job, destination: string | undefined) {
  const summary = {
    job_id: job.job_id,
    task: job.task,
    status: job.status,
    finished: job.finished,
    progress_percent: job.progress_percent,
    credits_reserved: job.usage?.credits_reserved ?? null,
    credits_charged: job.finished ? job.usage?.credits_charged ?? null : null,
  };
  if (!job.finished) {
    if (destination) destinations.set(job.job_id, destination);
    return text({
      ...summary,
      note: 'Still running, which is normal for a long file. Call check_job with this job_id to collect the result; ' +
        'the work continues either way. cancel_job stops it.',
    });
  }
  if (job.status !== 'SUCCEEDED') {
    return failure(new EqualangError(
      job.error?.message ?? `the job ended as ${job.status}`, job.error?.code ?? job.status, job.error?.retryable ?? false,
      { job_id: job.job_id }));
  }
  if (!destination) {
    // A job made from a URL, with nowhere named to put its results.
    return text({
      ...summary,
      outputs: job.outputs.map(({ kind, format, filename, download_url }) => ({ kind, format, filename, download_url })),
      note: 'The links are temporary. Call check_job with output_dir to save the files instead.',
    });
  }
  await mkdir(destination, { recursive: true });
  const saved = [];
  for (const output of job.outputs) {
    // The name is the API's; only its last component is trusted with a path on this machine.
    const path = await freeName(destination, basename(output.filename));
    await writeFile(path, await api.fetchOutput(output));
    saved.push({ kind: output.kind, format: output.format, path });
  }
  destinations.delete(job.job_id);
  return text({ ...summary, outputs: saved }, saved);
}

type Extra = RequestHandlerExtra<ServerRequest, ServerNotification>;

/**
 * Tell a client that asked for it how the job is going. Progress is also what
 * lets a client keep a long call open instead of timing it out.
 */
function progressTo(extra: Extra) {
  const progressToken = extra._meta?.progressToken;
  if (progressToken === undefined) return undefined;
  return (job: Job) => {
    void extra.sendNotification({
      method: 'notifications/progress',
      params: { progressToken, progress: job.progress_percent, total: 100, message: job.status.toLowerCase() },
    }).catch(() => undefined);
  };
}

async function run(task: 'translate' | 'transcribe', input: {
  source?: string; file_id?: string; target_language?: string; source_language?: string;
  options: Record<string, unknown>; output_dir?: string; wait_seconds?: number;
}, extra: Extra) {
  try {
    const source = sourceOf(input.source, input.file_id);
    const destination = destinationOf(source, input.output_dir);
    const created = await api.createJob(task, source, {
      targetLanguage: input.target_language, sourceLanguage: input.source_language, options: input.options,
    });
    if ('fileId' in source) destinations.delete(source.fileId);
    const budget = Math.min(Math.max(input.wait_seconds ?? DEFAULT_WAIT_SECONDS, 0), MAX_WAIT_SECONDS) * 1000;
    return await report(await api.wait(created.job_id, budget, progressTo(extra)), destination);
  } catch (cause) {
    return failure(cause);
  }
}

const SOURCE = z.string().optional().describe(
  'The file: an absolute path on this machine, or a public http(s) URL (fetched by Equalang, not downloaded here). Omit when passing file_id.');
const FILE_ID = z.string().optional().describe('A file already uploaded by estimate_cost, instead of source: starts the job without uploading again.');
const OUTPUT_DIR = z.string().optional().describe(
  'Directory for the results. Defaults to beside a local source. A URL source has no "beside": without this the answer carries temporary links.');
const WAIT = z.number().optional().describe(`Seconds to wait before answering with a job_id instead (default ${DEFAULT_WAIT_SECONDS}, at most ${MAX_WAIT_SECONDS}).`);
const LANGUAGE = 'A language code such as en, zh-CN, zh-TW, ja, ko, es, fr, de. list_languages has the codes: fewer for files than for text.';
const COSTS = 'COSTS THE USER\'S CREDITS: say what it will cost and get their agreement first -- estimate_cost gives the number for a file.';

// Every tool that writes only adds files beside existing ones, so none is
// destructive; destructiveHint defaults to true when a tool is not read-only,
// which makes the explicit false the half that carries information.
const WRITES = { readOnlyHint: false, destructiveHint: false, openWorldHint: true };
const READS = { readOnlyHint: true, openWorldHint: true };

server.registerTool('translate_file', {
  title: 'Translate a file',
  annotations: WRITES,
  description:
    'Translate a whole file into another language and save the result, keeping its layout, tables, images and formulas. ' +
    'Documents (pdf, docx, pptx, xlsx, epub, html, txt), subtitles (srt, vtt), pictures (jpg, png, webp, bmp), and recordings ' +
    '(mp3, m4a, wav, flac, ogg, aac, opus, mp4, mov, webm, mkv), which come back as translated subtitles. ' +
    'Answers with the paths written, never the contents. ' + COSTS,
  inputSchema: {
    source: SOURCE,
    file_id: FILE_ID,
    target_language: z.string().describe(`Language to translate into. ${LANGUAGE}`),
    source_language: z.string().optional().describe('Language of the file; omit to detect it.'),
    bilingual: z.boolean().optional().describe('Subtitles and recordings only: keep the original line above each translated one.'),
    output_formats: z.array(z.enum(['srt', 'vtt', 'txt', 'json'])).optional().describe('Recordings only: the formats to write (default srt).'),
    output_dir: OUTPUT_DIR,
    wait_seconds: WAIT,
  },
}, async ({ bilingual, output_formats, ...input }, extra) => run('translate', {
  ...input, options: { subtitle_bilingual: bilingual, output_formats },
}, extra));

server.registerTool('transcribe_recording', {
  title: 'Transcribe a recording',
  annotations: WRITES,
  description:
    'Write down what is said in an audio or video file (mp3, m4a, wav, flac, ogg, aac, opus, mp4, mov, webm, mkv) as timed text, ' +
    'in the language spoken, and save it. For a translation of the recording use translate_file instead. ' +
    'Charged for the speech actually heard: silence and music are not. ' + COSTS,
  inputSchema: {
    source: SOURCE,
    file_id: FILE_ID,
    source_language: z.string().optional().describe('Language spoken; omit to detect it.'),
    output_formats: z.array(z.enum(['srt', 'vtt', 'txt', 'json'])).optional().describe('The formats to write (default srt). txt is plain text without times.'),
    output_dir: OUTPUT_DIR,
    wait_seconds: WAIT,
  },
}, async ({ output_formats, ...input }, extra) => run('transcribe', { ...input, options: { output_formats } }, extra));

server.registerTool('translate_text', {
  title: 'Translate text',
  // Changes nothing on this machine, but spends credits: not read-only.
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  description:
    'Translate short plain texts and answer with the translations, in order. For strings in hand -- labels, messages, a paragraph; ' +
    'for anything that is a file, use translate_file, which keeps its formatting. At most 50 texts of 5,000 characters, 20,000 characters per call. ' +
    'Charged by length, a small amount; the answer says how much.',
  inputSchema: {
    texts: z.array(z.string().min(1)).min(1).max(50).describe('The texts, each translated on its own.'),
    target_language: z.string().describe(`Language to translate into. ${LANGUAGE}`),
    source_language: z.string().optional().describe('Language of the texts; omit to detect it.'),
  },
}, async ({ texts, target_language, source_language }) => {
  try {
    const answer = await api.translateText(texts, target_language, source_language);
    return text({
      translations: answer.translations.map((item) => item.error
        ? { error: item.error.message, code: item.error.code, retryable: item.error.retryable }
        : { text: item.translated_text, detected_source_language: item.detected_source_language }),
      credits_charged: answer.usage.credits_charged,
    });
  } catch (cause) {
    return failure(cause);
  }
});

server.registerTool('estimate_cost', {
  title: 'Estimate what a file will cost',
  annotations: WRITES,
  description:
    'Upload a local file without starting anything, and answer with the most a job on it can cost in credits. Free. ' +
    'Pass the returned file_id to translate_file or transcribe_recording so the file is not uploaded twice; kept_until says how long it is held. ' +
    'A recording is charged for the speech actually heard, usually less than the estimate.',
  inputSchema: { path: z.string().describe('Absolute path to the file on this machine.') },
}, async ({ path }) => {
  try {
    const source = sourceOf(path, undefined);
    if (!('path' in source)) throw new EqualangError('estimate_cost takes a local file; a URL is measured when its job is created.', 'INVALID_SOURCE');
    const upload = await api.upload(source.path);
    destinations.set(upload.file_id, dirname(source.path));
    return text({
      file_id: upload.file_id, filename: upload.filename, size_bytes: upload.size_bytes,
      credits_to_translate: upload.quote?.translate ?? null, credits_to_transcribe: upload.quote?.transcribe ?? null,
      kept_until: upload.expires_at,
    });
  } catch (cause) {
    return failure(cause);
  }
});

server.registerTool('check_job', {
  title: 'Check a job',
  annotations: WRITES,
  description: 'Look a job up by id and, if it has finished, save its results. Use after a tool answered before its job was done.',
  inputSchema: {
    job_id: z.string().describe('The job_id an earlier call answered with.'),
    output_dir: OUTPUT_DIR,
    wait_seconds: z.number().optional().describe(`Seconds to keep waiting if it is still running (default 0, at most ${MAX_WAIT_SECONDS}).`),
  },
}, async ({ job_id, output_dir, wait_seconds }, extra) => {
  try {
    const budget = Math.min(Math.max(wait_seconds ?? 0, 0), MAX_WAIT_SECONDS) * 1000;
    return await report(await api.wait(job_id, budget, progressTo(extra)), output_dir ? resolve(output_dir) : destinations.get(job_id));
  } catch (cause) {
    return failure(cause);
  }
});

server.registerTool('cancel_job', {
  title: 'Cancel a job',
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
  description: 'Stop a queued or running job. A cancelled job is not charged; one that had already finished is left as it is.',
  inputSchema: { job_id: z.string().describe('The job to stop.') },
}, async ({ job_id }) => {
  try {
    const job = await api.cancel(job_id);
    return text({ job_id: job.job_id, status: job.status, finished: job.finished });
  } catch (cause) {
    return failure(cause);
  }
});

server.registerTool('get_credit_balance', {
  title: 'Check the credit balance',
  annotations: READS,
  description: `How many credits the account has. Credits are bought at ${SITE}/pricing; the same balance serves the website and this server.`,
  inputSchema: {},
}, async () => {
  try {
    return text(await api.balance());
  } catch (cause) {
    return failure(cause);
  }
});

server.registerTool('list_languages', {
  title: 'List the languages',
  annotations: READS,
  description: 'The language codes Equalang takes, with their names, read from the live API. Needs no key. Use it to turn a language\'s name into its code.',
  inputSchema: {
    kind: z.enum(['file', 'text']).optional().describe('file (default): the languages translate_file takes; text: the wider set translate_text takes.'),
    matching: z.string().optional().describe('Only languages whose name or code contains this, e.g. "chinese" or "pt".'),
  },
}, async ({ kind, matching }) => {
  try {
    const all = await api.languages(kind === 'text' ? 'text' : 'document');
    const wanted = matching?.trim().toLowerCase();
    return text({ languages: wanted ? all.filter(({ code, name }) => `${code} ${name}`.toLowerCase().includes(wanted)) : all });
  } catch (cause) {
    return failure(cause);
  }
});

server.connect(new StdioServerTransport()).catch((cause) => {
  console.error(`equalang-mcp failed to start: ${cause instanceof Error ? cause.message : cause}`);
  process.exit(1);
});
