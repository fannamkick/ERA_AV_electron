import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm31_recruit_all_smoke.ts'),
      fileName: () => 'm31-recruit-all-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m31-recruit-all-smoke',
  },
});
