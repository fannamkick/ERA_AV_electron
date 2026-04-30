import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm9_save_load_smoke.ts'),
      fileName: () => 'm9-save-load-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m9-save-load-smoke',
  },
});
