import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');
const originalRoot = path.join(workspaceRoot, 'original-game');
const hoMaterialRoot = path.join(workspaceRoot, 'Ho版資料（作成中途）');
const outputPath = path.join(root, 'data', 'coverage', 'source-manifest.json');

function normalize(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function sourcePathFromAbsolute(absolutePath) {
  return normalize(path.relative(workspaceRoot, absolutePath));
}

function walkFiles(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(absolutePath));
      continue;
    }
    if (entry.isFile()) {
      result.push(absolutePath);
    }
  }
  return result;
}

function sha256(absolutePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');
}

function classify(absolutePath) {
  const sourcePath = sourcePathFromAbsolute(absolutePath);
  const fileName = path.basename(absolutePath);
  const lowerName = fileName.toLowerCase();
  const lowerPath = sourcePath.toLowerCase();
  const extension = path.extname(fileName).toLowerCase();

  if (lowerPath.startsWith('original-game/csv/')) {
    if (/^chara.*\.csv$/i.test(fileName)) {
      return { sourceTier: 'primary', sourceKind: 'chara-csv', rootId: 'primary:chara-csv' };
    }
    if (lowerName === 'variablesize.csv') {
      return { sourceTier: 'primary', sourceKind: 'variable-size-csv', rootId: 'primary:variable-size-csv' };
    }
    if (extension === '.csv' && !fileName.startsWith('_')) {
      return { sourceTier: 'primary', sourceKind: 'csv', rootId: 'primary:csv' };
    }
    return { sourceTier: 'auxiliary', sourceKind: extension === '.csv' ? 'auxiliary-csv' : 'csv-config', rootId: 'auxiliary:csv' };
  }

  if (lowerPath.startsWith('original-game/erb/')) {
    if (extension === '.erb') {
      return { sourceTier: 'primary', sourceKind: 'erb', rootId: 'primary:erb' };
    }
    if (extension === '.erh') {
      return { sourceTier: 'primary', sourceKind: 'erh', rootId: 'primary:erb' };
    }
    return { sourceTier: 'auxiliary', sourceKind: 'erb-adjacent', rootId: 'auxiliary:erb' };
  }

  if (!lowerPath.startsWith('original-game/')) {
    if (extension === '.csv') {
      return { sourceTier: 'auxiliary', sourceKind: 'auxiliary-csv', rootId: 'auxiliary:ho-material' };
    }
    if (extension === '.txt') {
      return { sourceTier: 'auxiliary', sourceKind: 'source-note', rootId: 'auxiliary:ho-material' };
    }
  }

  if (extension === '.txt' || extension === '.md') {
    return { sourceTier: 'auxiliary', sourceKind: 'source-note', rootId: 'auxiliary:root-doc' };
  }

  if (extension === '.config') {
    return { sourceTier: 'auxiliary', sourceKind: 'runtime-config', rootId: 'auxiliary:runtime' };
  }

  if (extension === '.exe') {
    return { sourceTier: 'auxiliary', sourceKind: 'runtime-binary', rootId: 'auxiliary:runtime' };
  }

  return { sourceTier: 'auxiliary', sourceKind: 'unknown-original-file', rootId: 'auxiliary:other' };
}

function countBy(files, keyFn) {
  const counts = {};
  for (const file of files) {
    const key = keyFn(file);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

const sourceRoots = [originalRoot, hoMaterialRoot].filter((sourceRoot) => fs.existsSync(sourceRoot));

const sourceFiles = sourceRoots.length > 0
  ? sourceRoots.flatMap((sourceRoot) => walkFiles(sourceRoot))
      .map((absolutePath) => {
        const stat = fs.statSync(absolutePath);
        const classification = classify(absolutePath);
        return {
          sourcePath: sourcePathFromAbsolute(absolutePath),
          sourceTier: classification.sourceTier,
          sourceKind: classification.sourceKind,
          rootId: classification.rootId,
          extension: path.extname(absolutePath).toLowerCase(),
          sizeBytes: stat.size,
          sha256: sha256(absolutePath),
        };
      })
      .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath))
  : [];

const roots = [
  {
    rootId: 'primary:csv',
    sourceTier: 'primary',
    sourceKind: 'csv',
    sourcePath: 'original-game/CSV',
    role: 'CSV definition root. Non-Chara, non-VariableSize CSV files are static definition evidence unless classified as auxiliary.',
    exists: fs.existsSync(path.join(originalRoot, 'CSV')),
  },
  {
    rootId: 'primary:erb',
    sourceTier: 'primary',
    sourceKind: 'erb',
    sourcePath: 'original-game/ERB',
    role: 'ERB/ERH behavior, flow, condition, text, and effect evidence root.',
    exists: fs.existsSync(path.join(originalRoot, 'ERB')),
  },
  {
    rootId: 'primary:chara-csv',
    sourceTier: 'primary',
    sourceKind: 'chara-csv',
    sourcePath: 'original-game/CSV/Chara*.csv',
    role: 'Character template and initial state evidence.',
    exists: sourceFiles.some((file) => file.sourceKind === 'chara-csv'),
  },
  {
    rootId: 'primary:variable-size-csv',
    sourceTier: 'primary',
    sourceKind: 'variable-size-csv',
    sourcePath: 'original-game/CSV/VariableSize.CSV',
    role: 'Original variable family size evidence.',
    exists: fs.existsSync(path.join(originalRoot, 'CSV', 'VariableSize.CSV')),
  },
  {
    rootId: 'auxiliary:csv',
    sourceTier: 'auxiliary',
    sourceKind: 'auxiliary-csv',
    sourcePath: 'original-game/CSV/_* and CSV config files',
    role: 'Auxiliary CSV/config evidence. These files may explain original behavior but do not complete runtime coverage alone.',
    exists: sourceFiles.some((file) => file.rootId === 'auxiliary:csv'),
  },
  {
    rootId: 'auxiliary:root-doc',
    sourceTier: 'auxiliary',
    sourceKind: 'source-note',
    sourcePath: 'original-game/*.txt',
    role: 'Original package notes. They are interpretation aids, not completion evidence by themselves.',
    exists: sourceFiles.some((file) => file.rootId === 'auxiliary:root-doc'),
  },
  {
    rootId: 'auxiliary:ho-material',
    sourceTier: 'auxiliary',
    sourceKind: 'auxiliary-csv-or-note',
    sourcePath: 'Ho版資料（作成中途）',
    role: 'Bundled source-side notes and supplemental CSV. These are aids for interpretation and cannot complete runtime coverage without primary original evidence.',
    exists: fs.existsSync(hoMaterialRoot),
  },
];

const manifest = {
  schemaVersion: 'source-manifest/v1',
  generatedBy: 'tools/build_source_manifest.mjs',
  workspaceRoot: '..',
  sourcePriority: [
    {
      sourceTier: 'primary',
      completionUse: 'May support implemented, used, mapped, non-save, calculation-only, template, listing, blocker, and approved-excluded statuses.',
    },
    {
      sourceTier: 'auxiliary',
      completionUse: 'May explain or disambiguate primary evidence but cannot complete a coverage row without primary evidence.',
    },
    {
      sourceTier: 'derived',
      completionUse: 'Project documents and generated reports are interpretation aids only. Derived evidence alone is not completion evidence.',
    },
  ],
  roots,
  summary: {
    totalFiles: sourceFiles.length,
    bySourceTier: countBy(sourceFiles, (file) => file.sourceTier),
    bySourceKind: countBy(sourceFiles, (file) => file.sourceKind),
    byRootId: countBy(sourceFiles, (file) => file.rootId),
  },
  files: sourceFiles,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      sourceManifest: manifest.summary,
      output: 'data/coverage/source-manifest.json',
    },
    null,
    2,
  ),
);
