import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm35_turn_long_smoke.ts'),
      fileName: () => 'm35-turn-long-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m35-turn-long-smoke',
  },
});
