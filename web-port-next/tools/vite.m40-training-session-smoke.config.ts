import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm40_training_session_smoke.ts'),
      fileName: () => 'm40-training-session-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m40-training-session-smoke',
  },
});
