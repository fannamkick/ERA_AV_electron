# Artifact Policy

Build outputs are regenerated artifacts, not source-of-truth files.

## Ignored Artifacts

These should stay ignored by git:

- `dist/`
- `dist-electron/`
- `release/`
- `node_modules/`
- logs and temporary files

The root `.gitignore` already covers `dist`, `node_modules`, logs, and `web-port/release/`.

## Source Of Truth

Use these as source:

- `src/`
- `electron/`
- `docs/`
- `tools/`
- config files such as `package.json`, `tsconfig*.json`, and `vite.config.ts`

## Regeneration Rule

Regenerate artifacts with:

```bash
npx vite build
npx tsc -p tsconfig.electron.json
```

Avoid relying on checked-in `dist` or `dist-electron` contents when reviewing source changes.

## Known Packaging Issue

`npm run build:electron` may hang in `electron-builder` packaging in the current workspace. Treat packaging as a separate release task until that is resolved.
