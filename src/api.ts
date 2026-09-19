import { randomUUID } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { basename } from 'node:path';

/**
 * The Equalang API, as a client needs it. Nothing here knows about MCP.
 *
 * The API says most of what a client has to decide: an error carries
 * `retryable`, a running job carries `Retry-After`, an upload carries the
 * most it can cost. This file repeats those answers rather than guessing them
 * from status codes and sleep constants.
 */

export const SITE = 'https://equalang.com';
const DEFAULT_BASE_URL = `${SITE}/v1`;
const KEYS_URL = `${SITE}/api-keys`;
const PRICING_URL = `${SITE}/pricing`;

// What the API accepts; checked before the read so an oversized file is a
// sentence instead of a heap exhaustion halfway through it.
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;
// How often a request that failed without reaching a verdict is sent again.
const ATTEMPTS = 3;

/** A failure the model can act on: what happened, and whether trying again can help. */
export class EqualangError extends Error {
  constructor(
    message: string,
    readonly code: string = '',
    readonly retryable: boolean = false,
    readonly data: Record<string, unknown> | null = null,
  ) {
    super(message);
    this.name = 'EqualangError';
  }
}

export type Output = {
  kind: string;
  format: string;
  file_id: string;
  filename: string;
  download_url: string | null;
};

export type Job = {
  job_id: string;
  task: string;
  status: string;
  finished: boolean;
  progress_percent: number;
  source_filename: string | null;
  source_language: string | null;
  target_language: string | null;
  outputs: Output[];
  error: { code: string; message: string; retryable: boolean } | null;
  usage: { meter: string; source_units: number; credits_reserved: number; credits_charged: number };
};

export type Created = { job_id: string; status: string; credits_reserved: number };

export type Upload = {
  file_id: string;
  filename: string;
  extension: string;
  size_bytes: number;
  expires_at: string;
  quote: { translate: number; transcribe: number | null } | null;
};

/** What a job is made from: bytes on this machine, a public URL, or a file already uploaded. */
export type Source = { path: string } | { url: string } | { fileId: string };

export type JobOptions = {
  targetLanguage?: string;
  sourceLanguage?: string;
  options?: Record<string, unknown>;
};

/** The options the caller actually set, or nothing: an empty object is not a choice. */
function chosen(options: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  const set = Object.entries(options ?? {}).filter(([, value]) => value !== undefined);
  return set.length > 0 ? Object.fromEntries(set) : undefined;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class Equalang {
  readonly baseUrl: string;

  constructor(private readonly apiKey: string | undefined, baseUrl?: string) {
    this.baseUrl = (baseUrl ?? process.env.EQUALANG_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');
  }

  /**
   * One request, sent again only when sending it again is safe and can help.
   *
   * `body` is a function because a FormData body is consumed by the attempt
   * that sends it. A request that creates something carries one
   * Idempotency-Key across its attempts, so the retry of a request whose
   * answer was lost finds the job the first attempt made instead of making
   * -- and charging for -- a second.
   */
  private async request<T>(
    method: string,
    path: string,
    body?: () => BodyInit,
    init: { json?: boolean; creates?: boolean; keyless?: boolean } = {},
  ): Promise<{ data: T; headers: Headers }> {
    if (!init.keyless && !this.apiKey) {
      throw new EqualangError(
        `EQUALANG_API_KEY is not set. Ask the user for a key, or to create one at ${KEYS_URL}, ` +
          'then set it in the MCP client config: "env": { "EQUALANG_API_KEY": "el_..." }. Never invent a key.',
        'MISSING_API_KEY',
      );
    }
    const headers: Record<string, string> = { 'User-Agent': `equalang-mcp/${VERSION}` };
    if (!init.keyless) headers.Authorization = `Bearer ${this.apiKey}`;
    if (init.json) headers['Content-Type'] = 'application/json';
    if (init.creates) headers['Idempotency-Key'] = randomUUID();

    let failure: EqualangError | undefined;
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
      let response: Response;
      try {
        response = await fetch(`${this.baseUrl}${path}`, { method, headers, body: body?.() });
      } catch (cause) {
        failure = new EqualangError(
          `cannot reach ${this.baseUrl}: ${cause instanceof Error ? cause.message : String(cause)}`, 'NETWORK', true);
        // A request that creates and is not protected by a key is not repeated blindly.
        if (method !== 'GET' && !init.creates) throw failure;
        await sleep(1000 * attempt);
        continue;
      }
      const payload = (await response.json().catch(() => null)) as
        | { code?: string; message?: string; data?: T; retryable?: boolean }
        | null;
      if (response.ok && payload) return { data: payload.data as T, headers: response.headers };

      const code = payload?.code ?? `HTTP_${response.status}`;
      let message = payload?.message ?? response.statusText;
      if (response.status === 401) message += ` Check EQUALANG_API_KEY, or create a key at ${KEYS_URL}.`;
      if (response.status === 402) message += ` Top up at ${PRICING_URL}.`;
      failure = new EqualangError(
        message, code, payload?.retryable ?? response.status >= 500,
        (payload?.data as Record<string, unknown> | null) ?? null);
      if (!failure.retryable || attempt === ATTEMPTS) throw failure;
      await sleep(Math.min(Number(response.headers.get('Retry-After') || attempt), 20) * 1000);
    }
    throw failure!;
  }

  private async part(path: string): Promise<{ blob: Blob; name: string }> {
    const size = await stat(path).then((s) => s.size, () => {
      throw new EqualangError(`no such file: ${path}`, 'FILE_NOT_FOUND');
    });
    if (size > MAX_UPLOAD_BYTES) {
      throw new EqualangError(
        `${basename(path)} is ${(size / 1_048_576).toFixed(1)} MB; the limit is ${MAX_UPLOAD_BYTES / 1_048_576} MB`,
        'FILE_TOO_LARGE');
    }
    return { blob: new Blob([await readFile(path)]), name: basename(path) };
  }

  /** Upload without starting anything: the answer says what a job on the file would cost. */
  async upload(path: string): Promise<Upload> {
    const { blob, name } = await this.part(path);
    const form = () => {
      const body = new FormData();
      body.append('file', blob, name);
      return body;
    };
    return (await this.request<Upload>('POST', '/files', form)).data;
  }

  /**
   * Start a job. Bytes on this machine are uploaded with the request; a URL is
   * handed to the API, which fetches it itself -- nothing is downloaded here
   * only to be uploaded again; an uploaded file is named by its id.
   */
  async createJob(task: 'translate' | 'transcribe', source: Source, job: JobOptions): Promise<Created> {
    const fields: Record<string, unknown> = {
      target_language: task === 'translate' ? job.targetLanguage : undefined,
      source_language: job.sourceLanguage,
      options: chosen(job.options),
    };
    if ('path' in source) {
      const { blob, name } = await this.part(source.path);
      const form = () => {
        const body = new FormData();
        body.append('file', blob, name);
        for (const [key, value] of Object.entries(fields)) {
          if (value !== undefined) body.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
        return body;
      };
      return (await this.request<Created>('POST', `/jobs/${task}`, form, { creates: true })).data;
    }
    const named = 'url' in source ? { file_url: source.url } : { file_id: source.fileId };
    const json = JSON.stringify({ ...named, ...fields });
    return (await this.request<Created>('POST', `/jobs/${task}`, () => json, { json: true, creates: true })).data;
  }

  async job(jobId: string): Promise<{ job: Job; retryAfterMs: number }> {
    const { data, headers } = await this.request<Job>('GET', `/jobs/${encodeURIComponent(jobId)}`);
    return { job: data, retryAfterMs: Math.max(1, Number(headers.get('Retry-After') || 2)) * 1000 };
  }

  /**
   * Wait for a job, but not forever: MCP clients give a tool call about a
   * minute and jobs can run for several. Whatever is true when the budget
   * runs out is returned, and the caller is told how to pick the job up.
   * The pause between looks is the one the API asks for.
   */
  async wait(jobId: string, budgetMs: number): Promise<Job> {
    const deadline = Date.now() + budgetMs;
    for (;;) {
      const { job, retryAfterMs } = await this.job(jobId);
      const left = deadline - Date.now();
      if (job.finished || left <= 0) return job;
      await sleep(Math.min(retryAfterMs, left));
    }
  }

  async cancel(jobId: string): Promise<Job> {
    return (await this.request<Job>('POST', `/jobs/${encodeURIComponent(jobId)}/cancel`)).data;
  }

  async translateText(texts: string[], targetLanguage: string, sourceLanguage?: string) {
    const json = JSON.stringify({ texts, target_language: targetLanguage, source_language: sourceLanguage });
    type Answer = {
      translations: Array<{ translated_text: string | null; detected_source_language: string | null;
        error: { code: string; message: string; retryable: boolean } | null }>;
      usage: { credits_charged: number };
    };
    return (await this.request<Answer>('POST', '/text/translate', () => json, { json: true, creates: true })).data;
  }

  async balance(): Promise<Record<string, number>> {
    return (await this.request<Record<string, number>>('GET', '/credits/balance')).data;
  }

  /**
   * The languages the API takes, read from its own contract: a list copied
   * into this package would be wrong the day a language was added.
   */
  async languages(kind: 'document' | 'text'): Promise<Array<{ code: string; name: string }>> {
    const response = await fetch(`${this.baseUrl}/openapi.json`).catch(() => null);
    const document = (await response?.json().catch(() => null)) as
      | { components?: { schemas?: Record<string, { oneOf?: Array<{ const: string; title: string }> }> } }
      | null;
    const schema = document?.components?.schemas?.[kind === 'text' ? 'TextLanguage' : 'DocumentLanguage'];
    if (!schema?.oneOf) throw new EqualangError(`cannot read the language list from ${this.baseUrl}/openapi.json`, 'NETWORK', true);
    return schema.oneOf.map((choice) => ({ code: choice.const, name: choice.title }));
  }

  /** A finished job's file. The link is signed and short-lived: a plain GET, without the key. */
  async fetchOutput(output: Output): Promise<Buffer> {
    if (!output.download_url) throw new EqualangError(`${output.filename} is no longer kept`, 'FILE_EXPIRED');
    const response = await fetch(output.download_url);
    if (!response.ok) throw new EqualangError(`downloading ${output.filename} failed with HTTP ${response.status}`, 'DOWNLOAD_FAILED', true);
    return Buffer.from(await response.arrayBuffer());
  }
}

// Replaced at build time from package.json (see tsup.config.ts).
declare const __PACKAGE_VERSION__: string;
export const VERSION = __PACKAGE_VERSION__;
