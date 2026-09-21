/**
 * Drive the built server over real stdio JSON-RPC, the way a client does.
 *
 * Calling its functions would prove the functions work; it would not prove the
 * server speaks the protocol, registers its tools, or keeps stdout clean. Only
 * spawning it and talking to it does.
 *
 *   node selftest.mjs                                   # protocol, tool list, the keyless tool
 *   EQUALANG_API_KEY=el_... node selftest.mjs file.txt  # and a real translation (spends credits)
 *   EQUALANG_API_KEY=el_... node selftest.mjs file.txt recording.mp3
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const [documentPath, recordingPath] = process.argv.slice(2).map((path) => resolve(path));
const keyed = Boolean(process.env.EQUALANG_API_KEY);
const INITIALIZE = { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'selftest', version: '1' } };

/**
 * One server, spoken to over stdio. Its config directory is always a fresh
 * one -- holding `config` as its settings file, if given -- so whether a run
 * has a key is decided by EQUALANG_API_KEY above, not by whatever the machine
 * running it keeps in ~/.config/equalang.
 */
function serve(env = {}, config) {
  const home = mkdtempSync(join(tmpdir(), 'equalang-selftest-'));
  const settingsFile = join(home, 'equalang', '.env');
  if (config !== undefined) {
    mkdirSync(join(home, 'equalang'));
    writeFileSync(settingsFile, config);
  }
  const child = spawn('node', ['dist/index.js'], { stdio: ['pipe', 'pipe', 'pipe'], env: { ...process.env, XDG_CONFIG_HOME: home, ...env } });
  const server = { home, settingsFile, stderr: '', buffer: '', strays: 0, progress: [], kill: () => child.kill() };
  child.stderr.on('data', (chunk) => { server.stderr += chunk.toString(); });

  const pending = new Map();
  child.stdout.on('data', (chunk) => {
    server.buffer += chunk.toString();
    let newline;
    while ((newline = server.buffer.indexOf('\n')) >= 0) {
      const line = server.buffer.slice(0, newline).trim();
      server.buffer = server.buffer.slice(newline + 1);
      if (!line) continue;
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        server.strays += 1;  // a stray console.log on stdout breaks every client
        continue;
      }
      if (message.method === 'notifications/progress') server.progress.push(message.params);
      pending.get(message.id)?.(message);
      pending.delete(message.id);
    }
  });

  server.notify = (method) => child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method })}\n`);
  let nextId = 1;
  server.call = (method, params, timeoutMs = 300_000) => {
    const id = nextId++;
    child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
    return new Promise((done, fail) => {
      const timer = setTimeout(() => fail(new Error(`${method} timed out`)), timeoutMs);
      pending.set(id, (message) => { clearTimeout(timer); done(message); });
    });
  };
  server.tool = async (name, args, progressToken) => {
    const response = await server.call('tools/call', { name, arguments: args, ...(progressToken ? { _meta: { progressToken } } : {}) });
    let payload;
    try { payload = JSON.parse(response.result?.content?.[0]?.text ?? ''); } catch { payload = {}; }
    return { isError: response.result?.isError === true, payload, result: response.result };
  };
  return server;
}

const main = serve();
const { call, tool, progress } = main;

let failures = 0;
function check(label, ok, detail = '') {
  console.log(`  [${ok ? 'OK ' : 'FAIL'}] ${label}${!ok && detail ? ` - ${detail}` : ''}`);
  if (!ok) failures += 1;
}

console.log('== protocol');
const initialized = await call('initialize', INITIALIZE);
const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
check('answers initialize as equalang, at the published version',
  initialized.result?.serverInfo?.name === 'equalang' && initialized.result?.serverInfo?.version === version, JSON.stringify(initialized.result?.serverInfo));
check('tells the model, once, what is true of every tool', /estimate_cost/.test(initialized.result?.instructions ?? '') && /never with file contents/.test(initialized.result.instructions));
main.notify('notifications/initialized');

const tools = (await call('tools/list', {})).result?.tools ?? [];
const expected = ['translate_file', 'transcribe_recording', 'translate_text', 'estimate_cost', 'check_job', 'cancel_job', 'get_credit_balance', 'list_languages'];
check(`registers its ${expected.length} tools`, expected.every((name) => tools.some((t) => t.name === name)) && tools.length === expected.length,
  tools.map((t) => t.name).join(','));
check('every tool carries a description a model can select on', tools.every((t) => (t.description ?? '').length > 60));
check('the tools that spend credits say so', ['translate_file', 'transcribe_recording'].every((name) => /COSTS THE USER'S CREDITS/.test(tools.find((t) => t.name === name)?.description ?? '')));
check('read-only tools are marked so', ['get_credit_balance', 'list_languages'].every((name) => tools.find((t) => t.name === name)?.annotations?.readOnlyHint === true));

console.log('\n== without a key');
const languages = await tool('list_languages', { matching: 'chinese' });
check('list_languages reads the live contract', !languages.isError && languages.payload.languages?.some((l) => l.code === 'zh-CN'), JSON.stringify(languages.payload).slice(0, 160));
check('an answer is said twice: as text, and as structuredContent', JSON.stringify(languages.result?.structuredContent) === JSON.stringify(languages.payload));
const relative = await tool('translate_file', { source: 'report.pdf', target_language: 'ja' });
check('a relative path is refused with a reason, before anything is sent', relative.isError && relative.payload.code === 'INVALID_SOURCE');
const both = await tool('translate_file', { source: '/tmp/a.pdf', file_id: 'x', target_language: 'ja' });
check('source and file_id together are refused', both.isError && both.payload.code === 'INVALID_SOURCE');

// One key per machine, in the user's config file: the skill reads the same one.
// A made-up key answered with UNAUTHORIZED proves it was read and sent.
console.log("\n== the key's one home");
{
  const later = serve({ EQUALANG_API_KEY: '' });
  await later.call('initialize', INITIALIZE);
  const before = await later.tool('get_credit_balance', {});
  check('with no key anywhere, the answer names the file one goes in',
    before.payload.code === 'MISSING_API_KEY' && before.payload.error?.includes(later.settingsFile), before.payload.error);
  mkdirSync(join(later.home, 'equalang'));
  writeFileSync(later.settingsFile, '# saved by hand\nexport EQUALANG_API_KEY="el_selftest_made_up"\n');
  const after = await later.tool('get_credit_balance', {});
  check('a key saved there after the server started is used, without a restart', after.payload.code === 'UNAUTHORIZED', JSON.stringify(after.payload));
  later.kill();

  const configured = serve(
    { EQUALANG_API_KEY: '', EQUALANG_BASE_URL: process.env.EQUALANG_BASE_URL || 'https://equalang.com/v1' },
    'EQUALANG_API_KEY=el_selftest_made_up\nEQUALANG_BASE_URL=https://nonexistent.invalid/v1\n');
  await configured.call('initialize', INITIALIZE);
  const answer = await configured.tool('get_credit_balance', {});
  // NETWORK here would mean the file's address was used over the environment's.
  check('the environment wins over the file', answer.payload.code === 'UNAUTHORIZED', JSON.stringify(answer.payload));
  check('a key in the file needs no missing-key notice', configured.stderr === '', configured.stderr);
  configured.kill();
}

if (!keyed) {
  const balance = await tool('get_credit_balance', {});
  check('a call that needs the key says how to get one, and not to invent one',
    balance.isError && balance.payload.code === 'MISSING_API_KEY' && /Never invent/.test(balance.payload.error));
} else {
  console.log('\n== with a key');
  const balance = await tool('get_credit_balance', {});
  check('balance is numbers', typeof balance.payload.available_credits === 'number', JSON.stringify(balance.payload));
  const missing = await tool('translate_file', { source: '/definitely/not/here.docx', target_language: 'ja' });
  check('a missing file is a typed error that retrying will not fix', missing.isError && missing.payload.code === 'FILE_NOT_FOUND' && missing.payload.retryable === false);
  const badLanguage = await tool('translate_text', { texts: ['Hello'], target_language: 'klingon' });
  check("the API's own refusal reaches the model with its code", badLanguage.isError && badLanguage.payload.code === 'INVALID_REQUEST', JSON.stringify(badLanguage.payload));
  const words = await tool('translate_text', { texts: ['Good morning.', 'Where is the station?'], target_language: 'zh-CN' });
  check('translate_text answers in order and says what it charged',
    !words.isError && words.payload.translations?.length === 2 && words.payload.translations.every((t) => t.text) && typeof words.payload.credits_charged === 'number', JSON.stringify(words.payload));

  const article = await tool('translate_text', { text: 'Opening paragraph.\n\n' + 'This sentence belongs to a longer piece. '.repeat(160), target_language: 'zh-CN' });
  check('one long text goes in whole and comes back as one translation', !article.isError && article.payload.translations?.length === 1 && article.payload.translations[0].text, JSON.stringify(article.payload).slice(0, 200));
  const neither = await tool('translate_text', { target_language: 'zh-CN' });
  check('neither texts nor text is refused before anything is sent', neither.isError && neither.payload.code === 'INVALID_REQUEST');

  if (documentPath && existsSync(documentPath)) {
    console.log('\n== a document, end to end (spends credits)');
    const estimate = await tool('estimate_cost', { path: documentPath });
    check('estimate_cost names a number before anything is spent', typeof estimate.payload.credits_to_translate === 'number' && estimate.payload.file_id, JSON.stringify(estimate.payload));
    const translated = await tool('translate_file', { file_id: estimate.payload.file_id, target_language: 'zh-CN', wait_seconds: 200 }, 'selftest-progress');
    console.log(`  ${JSON.stringify(translated.payload)}`);
    check('the job made from that file_id succeeds', translated.payload.status === 'SUCCEEDED');
    check('its result is written beside the source it was estimated from', (translated.payload.outputs ?? []).length > 0 && translated.payload.outputs.every((o) => existsSync(o.path) && o.path.startsWith(resolve(documentPath, '..'))));
    check('it charged no more than it was told it could', translated.payload.credits_charged <= estimate.payload.credits_to_translate + 1e-9);
    check('the answer is paths, not the document', JSON.stringify(translated.payload).length < 1200);
    const links = (translated.result?.content ?? []).filter((c) => c.type === 'resource_link');
    check('each file written is also named as a resource link', links.length === translated.payload.outputs?.length && links.every((l) => l.uri.startsWith('file://')));
    check('a client that asked for progress was told how the job went', progress.some((p) => p.progressToken === 'selftest-progress' && typeof p.progress === 'number'), JSON.stringify(progress.slice(-2)));
    const again = await tool('check_job', { job_id: translated.payload.job_id });
    check('check_job on a job already collected answers with links, and writes nothing twice', again.payload.finished === true && again.payload.outputs?.[0]?.download_url && !again.payload.outputs[0].path);
    const saved = await tool('check_job', { job_id: translated.payload.job_id, output_dir: resolve(documentPath, '..') });
    check('saving a collected job again names the file already there instead of copying it',
      saved.payload.outputs?.map((o) => o.path).join() === translated.payload.outputs?.map((o) => o.path).join(), JSON.stringify(saved.payload.outputs));
    const cancelled = await tool('cancel_job', { job_id: translated.payload.job_id });
    check('cancelling a finished job leaves it as it is', !cancelled.isError && cancelled.payload.status === 'SUCCEEDED');
  }
  if (recordingPath && existsSync(recordingPath)) {
    console.log('\n== a recording (spends credits)');
    const heard = await tool('transcribe_recording', { source: recordingPath, output_formats: ['srt', 'txt'], wait_seconds: 240 });
    console.log(`  ${JSON.stringify(heard.payload)}`);
    check('comes back as a transcript in both formats', heard.payload.status === 'SUCCEEDED' && (heard.payload.outputs ?? []).map((o) => o.format).sort().join() === 'srt,txt');
  }
}

console.log('\n== stdout hygiene');
check('nothing but JSON-RPC was written to stdout', main.strays === 0 && main.buffer.trim() === '');
check('stderr carries at most the missing-key notice', keyed ? main.stderr === '' : /EQUALANG_API_KEY is not set/.test(main.stderr) && main.stderr.trim().split('\n').length === 1, main.stderr.slice(0, 200));

main.kill();
console.log(failures ? `\n${failures} FAILURES` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
