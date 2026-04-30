import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm12_work_smoke.ts'),
      fileName: () => 'm12-work-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m12-work-smoke',
  },
});
