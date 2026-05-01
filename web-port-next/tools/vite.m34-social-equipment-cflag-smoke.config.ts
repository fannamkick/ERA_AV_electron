import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const toolsDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(toolsDir, 'm34_social_equipment_cflag_smoke.ts'),
      fileName: () => 'm34-social-equipment-cflag-smoke.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: '.tmp/m34-social-equipment-cflag-smoke',
  },
});
