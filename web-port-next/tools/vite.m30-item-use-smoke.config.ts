import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm30_item_use_smoke.ts'),
      fileName: () => 'm30-item-use-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m30-item-use-smoke',
  },
});
