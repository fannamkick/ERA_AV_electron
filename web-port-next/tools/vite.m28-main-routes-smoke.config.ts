import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm28_main_routes_smoke.ts'),
      fileName: () => 'm28-main-routes-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m28-main-routes-smoke',
  },
});
