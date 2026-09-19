#!/usr/bin/env node
/**
 * Check this client against the API it talks to.
 *
 * A published client rots when the API moves, and it rots in someone else's
 * install. This reads the API's own public contract and verifies that every
 * path this client builds, and every field it sends or reads, is one the
 * contract still documents. No credentials: anyone who forks this can run it.
 *
 *   node check-api.mjs            # https://equalang.com/v1
 *   EQUALANG_BASE_URL=https://test.equalang.com/v1 node check-api.mjs
 */
import { readFileSync } from 'node:fs';

const BASE_URL = (process.env.EQUALANG_BASE_URL ?? 'https://equalang.com/v1').replace(/\/$/, '');
const source = readFileSync(new URL('./src/api.ts', import.meta.url), 'utf8');

const document = await fetch(`${BASE_URL}/openapi.json`).then((r) => r.json());
const paths = Object.keys(document.paths);
const schemas = document.components.schemas;
let failures = 0;
const check = (label, ok, detail = '') => { console.log(`  [${ok ? 'OK ' : 'FAIL'}] ${label}${!ok && detail ? ` - ${detail}` : ''}`); if (!ok) failures += 1; };

console.log(`contract ${document.info.version} at ${BASE_URL}`);
// Paths as the client writes them: '/files', `/jobs/${task}`, `/jobs/${...}/cancel`.
const written = [...source.matchAll(/['`](\/(?:jobs|files|text|credits)[^'`\s]*)['`]/g)].map((m) => m[1]);
for (const path of new Set(written)) {
  const shape = new RegExp('^' + path.replace(/\$\{[^}]+\}/g, '[^/]+') + '$');
  const known = paths.some((p) => shape.test(p.replace(/\{[^}]+\}/g, 'x')) || shape.test(p));
  check(`${path} is a documented path`, known);
}
const has = (schema, field) => field in (schemas[schema]?.properties ?? {});
for (const [schema, fields] of Object.entries({
  File: ['file_id', 'filename', 'extension', 'size_bytes', 'expires_at', 'quote'],
  Job: ['job_id', 'task', 'status', 'finished', 'progress_percent', 'outputs', 'error', 'usage'],
  JobOutput: ['kind', 'format', 'file_id', 'filename', 'download_url'],
  JobUsage: ['credits_reserved', 'credits_charged'],
  ErrorResponse: ['code', 'message', 'retryable'],
  DocumentTranslateOptions: ['subtitle_bilingual', 'output_formats'],
})) {
  const missing = fields.filter((field) => !has(schema, field));
  check(`${schema} still has ${fields.join(', ')}`, missing.length === 0, `missing ${missing.join(', ')}`);
}
// What the tool descriptions promise a model is checked too: a format the API
// dropped, or a limit it moved, would otherwise be a lie told on every tools/list.
const tools = readFileSync(new URL('./src/index.ts', import.meta.url), 'utf8');
const accepted = schemas.File.properties.extension.enum;
// Only the prose: lines that are nothing but a string literal.
const prose = tools.split('\n').filter((line) => /^\s+'.*'(?: \+|,)?$/.test(line)).join('\n');
const promised = [...new Set([...prose.matchAll(/\((?:[a-z0-9]+, )+[a-z0-9]+\)/g)].flatMap((m) => m[0].slice(1, -1).split(', ')))];
check(`every format the descriptions name is accepted (${promised.length})`, promised.length > 20 && promised.every((ext) => accepted.includes(ext)), promised.filter((ext) => !accepted.includes(ext)).join(','));
check('every format the API accepts is named in a description', accepted.every((ext) => promised.includes(ext) || ext === 'jpeg'), accepted.filter((ext) => !promised.includes(ext)).join(','));
const texts = schemas.PublicTextTranslateRequest.properties.texts;
const whole = schemas.PublicTextTranslateRequest.properties.text;
check('translate_text states the limits the API enforces',
  tools.includes(`max(${texts.maxItems})`) && tools.includes(`at most ${texts.maxItems} texts of ${texts.items.maxLength.toLocaleString('en')} characters, ${texts['x-max-total-characters'].toLocaleString('en')} characters per call`)
  && tools.includes(`max(${whole?.maxLength})`) && tools.includes(`up to ${whole?.maxLength.toLocaleString('en')} characters`));
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const registry = JSON.parse(readFileSync(new URL('./server.json', import.meta.url), 'utf8'));
check('server.json names the version package.json does', registry.version === pkg.version && registry.packages.every((p) => p.version === pkg.version && p.identifier === pkg.name));
check('the language lists are where list_languages reads them', ['DocumentLanguage', 'TextLanguage'].every((name) => Array.isArray(schemas[name]?.oneOf)));
console.log(failures ? `${failures} FAILURES` : 'The client matches the contract.');
process.exit(failures ? 1 : 0);
