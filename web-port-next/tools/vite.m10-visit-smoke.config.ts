import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm10_visit_smoke.ts'),
      fileName: () => 'm10-visit-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m10-visit-smoke',
  },
});
