import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm29_item_shop_smoke.ts'),
      fileName: () => 'm29-item-shop-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m29-item-shop-smoke',
  },
});
