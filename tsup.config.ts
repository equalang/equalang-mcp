import { readFileSync } from 'node:fs';

import { defineConfig } from 'tsup';

// The version the server reports over MCP is the one npm published: one fact,
// read from package.json, rather than a constant that drifts from it.
const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node18',
  clean: true,
  define: { __PACKAGE_VERSION__: JSON.stringify(version) },
});
