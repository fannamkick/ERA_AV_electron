// Rename compiled .js files to .mjs for ES Module support
import { renameSync, existsSync } from 'fs';
import { join } from 'path';

const distElectron = './dist-electron';

const filesToRename = ['main.js', 'preload.js'];

for (const file of filesToRename) {
  const jsPath = join(distElectron, file);
  const mjsPath = join(distElectron, file.replace('.js', '.mjs'));

  if (existsSync(jsPath)) {
    renameSync(jsPath, mjsPath);
    console.log(`✓ Renamed ${file} to ${file.replace('.js', '.mjs')}`);
  }
}

console.log('✓ All files renamed to .mjs');
