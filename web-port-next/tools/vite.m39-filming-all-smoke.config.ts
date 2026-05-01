import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm39_filming_all_smoke.ts'),
      fileName: () => 'm39-filming-all-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m39-filming-all-smoke',
  },
});
