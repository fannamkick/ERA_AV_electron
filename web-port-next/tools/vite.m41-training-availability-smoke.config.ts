import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm41_training_availability_smoke.ts'),
      fileName: () => 'm41-training-availability-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m41-training-availability-smoke',
  },
});
