import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm16_roundtrip.ts'),
      fileName: () => 'm16-roundtrip.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m16-roundtrip',
  },
});
