import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm32_character_identity_smoke.ts'),
      fileName: () => 'm32-character-identity-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m32-character-identity-smoke',
  },
});
