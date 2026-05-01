import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm33_body_stat_smoke.ts'),
      fileName: () => 'm33-body-stat-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m33-body-stat-smoke',
  },
});
