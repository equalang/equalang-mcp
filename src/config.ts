import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

/**
 * The one place on this machine that keeps Equalang's settings: `NAME=value`
 * lines in the user's config directory.
 *
 * Not beside this package: `npx` keeps its copy in a cache it may replace at
 * any time, and the Equalang skill -- a different install altogether -- reads
 * the same file, so one key saved once serves both.
 */
export const CONFIG_FILE = join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'equalang', '.env');

/**
 * A setting from the environment, or else its line in CONFIG_FILE.
 *
 * Read when it is needed rather than once at startup, so a key saved after the
 * client started this server is found without restarting it.
 */
export function setting(name: string): string | undefined {
  const value = process.env[name]?.trim();
  if (value) return value;
  let text: string;
  try {
    text = readFileSync(CONFIG_FILE, 'utf8');
  } catch {
    return undefined;
  }
  let found: string | undefined;
  for (const line of text.split(/\r?\n/)) {
    const at = line.indexOf('=');
    if (at < 0) continue;
    if (line.slice(0, at).trim().replace(/^export\s+/, '') === name) {
      found = line.slice(at + 1).trim().replace(/^["']+|["']+$/g, '');
    }
  }
  return found || undefined;
}
