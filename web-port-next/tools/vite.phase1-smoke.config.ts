import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'phase1_smoke.ts'),
      fileName: () => 'phase1-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/phase1-smoke',
  },
});
