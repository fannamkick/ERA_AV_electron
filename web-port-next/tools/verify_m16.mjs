import { spawnSync } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const commands = [
  'typecheck',
  'smoke:phase1',
  'smoke:m7',
  'smoke:m8',
  'smoke:m9',
  'smoke:m10',
  'smoke:m11',
  'smoke:m12',
  'smoke:m13',
  'smoke:m14',
  'test:roundtrip',
  'gate:boundaries',
  'gate:raw-names',
  'gate:stubs',
  'build',
];

for (const command of commands) {
  console.log(`\n[M16] npm run ${command}`);
  const result = spawnSync(npmCommand, ['run', command], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('\nverify:m16 passed.');
