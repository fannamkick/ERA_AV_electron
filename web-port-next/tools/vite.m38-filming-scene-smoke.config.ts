import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm38_filming_scene_smoke.ts'),
      fileName: () => 'm38-filming-scene-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m38-filming-scene-smoke',
  },
});
