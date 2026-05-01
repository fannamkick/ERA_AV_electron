import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm37_work_all_smoke.ts'),
      fileName: () => 'm37-work-all-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m37-work-all-smoke',
  },
});
