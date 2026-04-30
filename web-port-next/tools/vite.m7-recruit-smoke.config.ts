import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm7_recruit_smoke.ts'),
      fileName: () => 'm7-recruit-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m7-recruit-smoke',
  },
});
