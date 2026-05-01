import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const rootDir = resolve(__dirname, '..');
const toolsDir = resolve(rootDir, 'tools');

export default defineConfig({
  build: {
    lib: {
      entry: resolve(toolsDir, 'm42_training_effect_smoke.ts'),
      formats: ['es'],
      fileName: () => 'm42-training-effect-smoke.mjs',
    },
    outDir: '.tmp/m42-training-effect-smoke',
    emptyOutDir: true,
    target: 'node18',
  },
});
