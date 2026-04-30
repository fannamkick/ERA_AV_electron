import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspaceRoot = path.resolve(root, '..');
const erbRoot = path.join(workspaceRoot, 'original-game', 'ERB');
const outputPath = path.join(root, 'data', 'coverage', 'erb-derived-definitions.json');

function normalize(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function sourcePathFromAbsolute(absolutePath) {
  return normalize(path.relative(workspaceRoot, absolutePath));
}

function readText(absolutePath) {
  return fs.readFileSync(absolutePath, 'utf8').replace(/^\uFEFF/, '');
}

function stripComment(line) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith(';')) return '';
  return line.split(';', 1)[0];
}

function walkFiles(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(absolutePath));
      continue;
    }
    if (entry.isFile() && ['.erb', '.erh'].includes(path.extname(entry.name).toLowerCase())) {
      result.push(absolutePath);
    }
  }
  return result;
}

function slug(value) {
  return String(value || 'unknown')
    .replace(/\\/g, '/')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 140) || 'unknown';
}

function countBy(rows, keyFn) {
  const result = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function addRow(rows, partial) {
  const sourceEvidence = {
    evidenceId: `source:erb-definition:${slug(partial.derivedDefinitionId)}`,
    sourceTier: 'primary',
    sourceKind: partial.sourceFile.toLowerCase().endsWith('.erh') ? 'erh-label' : 'erb-label',
    sourcePath: partial.sourceFile,
    label: partial.sourceLabel,
    line: String(partial.sourceLine),
    csvRow: '',
    family: '',
    index: '',
    accessDirection: 'definition',
    sourceRole: 'original',
  };

  rows.push({
    sourceKind: 'erb-derived-definition',
    classification: 'runtime-definition',
    approvedExclusionId: '',
    blockerId: '',
    componentLabels: [],
    componentCoverage: {
      display: 0,
      condition: 0,
      calculation: 0,
      effect: 0,
      text: 0,
    },
    conflictStatus: 'none',
    conflictWith: '',
    ...partial,
    sourceEvidenceId: sourceEvidence.evidenceId,
    sourceEvidence,
  });
}

function parseFiles() {
  const files = walkFiles(erbRoot).sort((a, b) => sourcePathFromAbsolute(a).localeCompare(sourcePathFromAbsolute(b)));
  const labels = [];
  const filesByBaseName = new Map();
  const labelRe = /^\s*@([^\s(;]+)/;

  for (const absolutePath of files) {
    const sourceFile = sourcePathFromAbsolute(absolutePath);
    const lines = readText(absolutePath).split(/\r?\n/);
    if (!filesByBaseName.has(path.basename(absolutePath))) {
      filesByBaseName.set(path.basename(absolutePath), []);
    }
    filesByBaseName.get(path.basename(absolutePath)).push({ absolutePath, sourceFile, lines });

    for (let index = 0; index < lines.length; index += 1) {
      const line = stripComment(lines[index]);
      const match = labelRe.exec(line);
      if (!match) continue;
      labels.push({
        label: match[1],
        sourceFile,
        absolutePath,
        line: index + 1,
      });
    }
  }

  return { files, labels, filesByBaseName };
}

function labelComponentRole(component) {
  if (['TITLE', 'INFO', 'RESULT_START', 'RESULT_PERFECT', 'RESULT_SUCCESS', 'RESULT_FAILED'].includes(component)) {
    return 'display';
  }
  if (['VISIBLE', 'PERMISSION', 'COND', 'CHARA_NO'].includes(component)) {
    return 'condition';
  }
  if (['FEE', 'CALC', 'EXP'].includes(component)) {
    return 'calculation';
  }
  if (['RECEIVE', 'REPORT', 'EXEC'].includes(component)) {
    return 'effect';
  }
  return 'text';
}

function extractResultsValue(file, lineNumber) {
  const start = Math.max(0, Number(lineNumber) - 1);
  for (let index = start + 1; index < Math.min(file.lines.length, start + 12); index += 1) {
    const line = stripComment(file.lines[index]).trim();
    const match = /^RESULTS\s*=\s*(.+)$/.exec(line);
    if (match) return match[1].trim();
    if (/^\s*@/.test(line)) break;
  }
  return '';
}

function parseMenuRows(file, sourceLabel, codePrefix) {
  if (!file) return [];
  const labelRe = /^\s*@([^\s(;]+)/;
  const optionRe = /\[\s*(\d+)\s*\]\s*-\s*(.+)$/;
  const actionRe = /^\s*(?:ELSE)?IF\s+RESULT\s*==\s*(\d+)(.*)$/;
  const callRe = /^\s*(CALL|BEGIN)\s+([A-Za-z0-9_]+)/;
  const directActionRe = /^\s*(SAVEGAME|LOADGAME|RETURN|RETURNF|QUIT|RESETDATA)\b/;

  let currentLabel = '(file)';
  const rows = new Map();
  const actions = new Map();
  const actionLabel = sourceLabel === 'SHOW_SHOP' ? 'USERSHOP' : sourceLabel;

  for (let index = 0; index < file.lines.length; index += 1) {
    const line = stripComment(file.lines[index]);
    const labelMatch = labelRe.exec(line);
    if (labelMatch) {
      currentLabel = labelMatch[1];
      continue;
    }

    if (currentLabel === sourceLabel) {
      const optionMatch = optionRe.exec(line);
      if (optionMatch) {
        const code = optionMatch[1];
        const text = optionMatch[2].trim();
        rows.set(code, {
          code,
          text,
          sourceFile: file.sourceFile,
          sourceLine: index + 1,
          sourceLabel,
        });
      }
    }

    if (currentLabel !== sourceLabel && sourceLabel !== 'EVENTSHOP') continue;
  }

  let activeCode = '';
  let actionCurrentLabel = '(file)';
  for (let index = 0; index < file.lines.length; index += 1) {
    const line = stripComment(file.lines[index]);
    const labelMatch = labelRe.exec(line);
    if (labelMatch) {
      actionCurrentLabel = labelMatch[1];
      continue;
    }
    const actionMatch = actionRe.exec(line);
    if (actionMatch) {
      if (actionCurrentLabel !== actionLabel) {
        activeCode = '';
        continue;
      }
      activeCode = actionMatch[1];
      actions.set(activeCode, {
        condition: actionMatch[2].trim(),
        target: '',
        actionLine: index + 1,
        sourceLabel: actionCurrentLabel,
      });
      continue;
    }
    if (/^\s*(ELSEIF|ELSE|ENDIF)\b/.test(line)) {
      activeCode = '';
    }
    if (!activeCode || actions.get(activeCode)?.target) continue;

    const callMatch = callRe.exec(line);
    if (callMatch) {
      actions.get(activeCode).target = `${callMatch[1]} ${callMatch[2]}`;
      actions.get(activeCode).actionLine = index + 1;
      continue;
    }

    const directMatch = directActionRe.exec(line);
    if (directMatch) {
      actions.get(activeCode).target = directMatch[1];
      actions.get(activeCode).actionLine = index + 1;
      continue;
    }

    if (/\bBOUGHT\s*=/.test(line)) {
      actions.get(activeCode).target = 'BOUGHT flag -> EVENTBUY';
      actions.get(activeCode).actionLine = index + 1;
    }
  }

  for (const [code, action] of actions) {
    if (rows.has(code) || code === '999') continue;
    rows.set(code, {
      code,
      text: `hidden result branch ${code}`,
      sourceFile: file.sourceFile,
      sourceLine: action.actionLine,
      sourceLabel: action.sourceLabel,
      hidden: true,
    });
  }

  return [...rows.values()]
    .filter((row) => row.code !== '999')
    .map((row) => ({
      ...row,
      sourceId: `${codePrefix}:${row.code}`,
      actionTarget: actions.get(row.code)?.target ?? '',
      actionCondition: actions.get(row.code)?.condition ?? '',
      actionLine: actions.get(row.code)?.actionLine ?? '',
    }))
    .sort((a, b) => Number(a.code) - Number(b.code));
}

function createMenuDefinitions(rows, options) {
  return rows.map((row) => ({
    derivedDefinitionId: `erbdef:${options.definitionKey}:${row.code}`,
    definitionKey: options.definitionKey,
    sourceFile: row.sourceFile,
    sourceId: row.sourceId,
    sourceName: row.text,
    sourceLabel: row.sourceLabel,
    sourceLine: row.sourceLine,
    runtimeId: `${options.runtimeIdPrefix}:${row.code}`,
    runtimeOwner: options.runtimeOwner,
    role: 'listing',
    consumerKind: 'feature',
    consumingFeature: options.consumingFeature,
    consumingView: options.consumingView,
    consumingCalculation: '',
    saveInitPath: '',
    handlerPath: options.handlerPath,
    viewPath: options.viewPath,
    calculationPath: '',
    statusForDefinitionCoverage: 'listing',
    ownerMilestone: options.ownerMilestone,
    menuCode: row.code,
    displayText: row.text,
    actionTarget: row.actionTarget,
    actionCondition: row.actionCondition,
    notes: row.actionTarget
      ? `ERB menu option. action=${row.actionTarget}`
      : 'ERB menu option. Later route milestone must assign an action target.',
  }));
}

function groupComponents(labels, regex) {
  const groups = new Map();
  for (const label of labels) {
    const match = regex.exec(label.label);
    if (!match) continue;
    const component = match[1];
    const id = match[2];
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push({ component, ...label });
  }
  return new Map([...groups.entries()].sort(([a], [b]) => Number(a) - Number(b)));
}

function componentCoverage(components) {
  const result = {
    display: 0,
    condition: 0,
    calculation: 0,
    effect: 0,
    text: 0,
  };
  for (const component of components) {
    result[labelComponentRole(component.component)] += 1;
  }
  return result;
}

function createComponentDefinitionRows(groups, options, filesBySourcePath) {
  const rows = [];

  for (const [id, components] of groups) {
    const preferred = components.find((component) => component.component === options.titleComponent) ?? components[0];
    const file = filesBySourcePath.get(preferred.sourceFile);
    const sourceName = file ? extractResultsValue(file, preferred.line) : '';
    const labels = components
      .map((component) => ({
        component: component.component,
        label: component.label,
        sourceFile: component.sourceFile,
        line: component.line,
        role: labelComponentRole(component.component),
      }))
      .sort((a, b) => a.component.localeCompare(b.component));

    rows.push({
      derivedDefinitionId: `erbdef:${options.definitionKey}:${id}`,
      definitionKey: options.definitionKey,
      sourceFile: preferred.sourceFile,
      sourceId: `${options.sourceIdPrefix}:${id}`,
      sourceName: sourceName || `${options.sourceNamePrefix} ${id}`,
      sourceLabel: preferred.label,
      sourceLine: preferred.line,
      runtimeId: `${options.runtimeIdPrefix}:${id}`,
      runtimeOwner: options.runtimeOwner,
      role: options.role,
      consumerKind: options.consumerKind,
      consumingFeature: options.consumingFeature,
      consumingView: options.consumingView,
      consumingCalculation: options.consumingCalculation,
      saveInitPath: '',
      handlerPath: options.handlerPath,
      viewPath: options.viewPath,
      calculationPath: options.calculationPath,
      statusForDefinitionCoverage: options.statusForDefinitionCoverage,
      ownerMilestone: options.ownerMilestone,
      componentLabels: labels,
      componentCoverage: componentCoverage(labels),
      requiredComponents: options.requiredComponents,
      notes: `${options.sourceNamePrefix} ERB component group. components=${labels.map((row) => row.component).join(',')}`,
    });
  }

  return rows;
}

function createLabelRows(labels, regex, options, filesBySourcePath) {
  return labels
    .filter((label) => regex.test(label.label))
    .map((label) => {
      regex.lastIndex = 0;
      const file = filesBySourcePath.get(label.sourceFile);
      const sourceName = file ? extractResultsValue(file, label.line) : '';
      const stableId = `${label.label}:${label.sourceFile}:${label.line}`;
      return {
        derivedDefinitionId: `erbdef:${options.definitionKey}:${slug(stableId)}`,
        definitionKey: options.definitionKey,
        sourceFile: label.sourceFile,
        sourceId: stableId,
        sourceName: sourceName || label.label,
        sourceLabel: label.label,
        sourceLine: label.line,
        runtimeId: `${options.runtimeIdPrefix}:${slug(stableId)}`,
        runtimeOwner: options.runtimeOwner,
        role: options.role,
        consumerKind: options.consumerKind,
        consumingFeature: options.consumingFeature,
        consumingView: options.consumingView,
        consumingCalculation: options.consumingCalculation ?? '',
        saveInitPath: '',
        handlerPath: options.handlerPath ?? '',
        viewPath: options.viewPath ?? '',
        calculationPath: options.calculationPath ?? '',
        statusForDefinitionCoverage: options.statusForDefinitionCoverage,
        ownerMilestone: options.ownerMilestone,
        notes: options.notes ?? '',
      };
    })
    .sort((a, b) => a.sourceId.localeCompare(b.sourceId));
}

const { labels, filesByBaseName } = parseFiles();
const filesBySourcePath = new Map();
for (const files of filesByBaseName.values()) {
  for (const file of files) filesBySourcePath.set(file.sourceFile, file);
}

const shopMain = filesByBaseName.get('SHOP_MAIN.ERB')?.[0];
const houmon = filesByBaseName.get('HOUMON.ERB')?.[0];
const rows = [];

for (const row of createMenuDefinitions(parseMenuRows(shopMain, 'SHOW_SHOP', 'main-menu'), {
  definitionKey: 'mainMenuOptions',
  runtimeIdPrefix: 'mainMenuOption',
  runtimeOwner: 'definitions.mainMenuOptions',
  consumingFeature: 'feature:main-menu',
  consumingView: 'buildMainMenuView',
  handlerPath: 'src/features/mainMenu.ts',
  viewPath: 'src/ui/RouteScreens.tsx',
  ownerMilestone: 'M28',
})) addRow(rows, row);

for (const row of createMenuDefinitions(parseMenuRows(houmon, 'HOUMON', 'visit-place'), {
  definitionKey: 'visitPlaces',
  runtimeIdPrefix: 'visitPlace',
  runtimeOwner: 'definitions.visitPlaces',
  consumingFeature: 'feature:visit:office-room-basic',
  consumingView: 'buildVisitView',
  handlerPath: 'src/features/visit.ts',
  viewPath: 'src/ui/RouteScreens.tsx',
  ownerMilestone: 'M36',
})) addRow(rows, row);

const missionGroups = groupComponents(labels, /^MISSION_(TITLE|VISIBLE|FEE|INFO|RECEIVE|CALC|REPORT|COND|CHARA_NO)_(\d+)/);
const sceneGroups = groupComponents(labels, /^SCENE_(TITLE|VISIBLE|FEE|INFO|CALC|RESULT_START|RESULT_PERFECT|RESULT_SUCCESS|RESULT_FAILED|EXP)_(\d+)/);
const arbeitGroups = groupComponents(labels, /^ARBEIT_(TITLE|PERMISSION|EXEC|INFO)_(\d+)/);
const achievementGroups = groupComponents(labels, /^ACHIEVEMENT_(TITLE|CALC)_(\d+)/);

for (const row of createComponentDefinitionRows(missionGroups, {
  definitionKey: 'missionDefinitions',
  sourceIdPrefix: 'mission',
  sourceNamePrefix: 'mission',
  runtimeIdPrefix: 'mission',
  runtimeOwner: 'definitions.missionDefinitions',
  titleComponent: 'TITLE',
  role: 'rule',
  consumerKind: 'feature-and-calculation',
  consumingFeature: 'feature:mission:basic',
  consumingView: 'buildMissionView',
  consumingCalculation: 'mission condition/reward calculation',
  handlerPath: 'src/features/mission.ts',
  viewPath: 'src/ui/RouteScreens.tsx',
  calculationPath: 'M46 mission calculation pipeline',
  statusForDefinitionCoverage: 'listing',
  ownerMilestone: 'M46',
  requiredComponents: ['TITLE', 'VISIBLE', 'FEE', 'INFO', 'RECEIVE', 'CALC', 'REPORT'],
}, filesBySourcePath)) addRow(rows, row);

for (const row of createComponentDefinitionRows(sceneGroups, {
  definitionKey: 'filmingSceneDefinitions',
  sourceIdPrefix: 'filming-scene',
  sourceNamePrefix: 'filming scene',
  runtimeIdPrefix: 'filmingScene',
  runtimeOwner: 'definitions.filmingSceneDefinitions',
  titleComponent: 'TITLE',
  role: 'rule',
  consumerKind: 'feature-and-calculation',
  consumingFeature: 'feature:shooting:basic',
  consumingView: 'buildShootingView',
  consumingCalculation: 'filming scene visibility/fee/result calculation',
  handlerPath: 'src/features/shooting.ts',
  viewPath: 'src/ui/RouteScreens.tsx',
  calculationPath: 'M38/M39 filming pipeline',
  statusForDefinitionCoverage: 'listing',
  ownerMilestone: 'M38',
  requiredComponents: ['TITLE', 'VISIBLE', 'FEE', 'INFO', 'CALC', 'RESULT_START', 'RESULT_SUCCESS', 'RESULT_FAILED', 'EXP'],
}, filesBySourcePath)) addRow(rows, row);

for (const row of createComponentDefinitionRows(arbeitGroups, {
  definitionKey: 'workDefinitions',
  sourceIdPrefix: 'arbeit',
  sourceNamePrefix: 'arbeit',
  runtimeIdPrefix: 'arbeit',
  runtimeOwner: 'definitions.workDefinitions',
  titleComponent: 'TITLE',
  role: 'rule',
  consumerKind: 'feature-and-calculation',
  consumingFeature: 'feature:work:basic',
  consumingView: 'buildWorkView',
  consumingCalculation: 'arbeit availability/execution calculation',
  handlerPath: 'src/features/work.ts',
  viewPath: 'src/ui/RouteScreens.tsx',
  calculationPath: 'M37 work calculation pipeline',
  statusForDefinitionCoverage: 'listing',
  ownerMilestone: 'M37',
  requiredComponents: ['TITLE', 'PERMISSION', 'EXEC', 'INFO'],
}, filesBySourcePath)) addRow(rows, row);

for (const row of createComponentDefinitionRows(achievementGroups, {
  definitionKey: 'achievementDefinitions',
  sourceIdPrefix: 'achievement',
  sourceNamePrefix: 'achievement',
  runtimeIdPrefix: 'achievement',
  runtimeOwner: 'definitions.achievementDefinitions',
  titleComponent: 'TITLE',
  role: 'display',
  consumerKind: 'view-and-calculation',
  consumingFeature: 'feature:info-settings-achievement-help-debug',
  consumingView: 'achievement views in M49',
  consumingCalculation: 'achievement condition calculation',
  handlerPath: 'M49 achievement handlers',
  viewPath: 'M49 achievement views',
  calculationPath: 'M49 achievement calculation pipeline',
  statusForDefinitionCoverage: 'display-only',
  ownerMilestone: 'M49',
  requiredComponents: ['TITLE', 'CALC'],
}, filesBySourcePath)) addRow(rows, row);

for (const row of createLabelRows(labels, /^EVENT[A-Z0-9_]*$/, {
  definitionKey: 'eventDefinitions',
  runtimeIdPrefix: 'event',
  runtimeOwner: 'definitions.eventDefinitions',
  role: 'rule',
  consumerKind: 'feature-and-calculation',
  consumingFeature: 'feature:ending-check;feature:turn:end-basic;feature:training:basic-command',
  consumingView: 'event/world views in M47',
  consumingCalculation: 'event trigger/effect calculation',
  handlerPath: 'M47 event handlers',
  viewPath: 'M47 event views',
  calculationPath: 'M47 event trigger pipeline',
  statusForDefinitionCoverage: 'listing',
  ownerMilestone: 'M47',
  notes: 'ERB event label. M47 must split trigger, condition, text, and effect before implementation closure.',
}, filesBySourcePath)) addRow(rows, row);

for (const row of createLabelRows(labels, /^ENDING[A-Z0-9_]*$/, {
  definitionKey: 'endingDefinitions',
  runtimeIdPrefix: 'ending',
  runtimeOwner: 'definitions.endingDefinitions',
  role: 'rule',
  consumerKind: 'feature-and-calculation',
  consumingFeature: 'feature:ending-check',
  consumingView: 'ending views in M48',
  consumingCalculation: 'ending condition calculation',
  handlerPath: 'M48 ending handlers',
  viewPath: 'M48 ending views',
  calculationPath: 'M48 ending condition pipeline',
  statusForDefinitionCoverage: 'listing',
  ownerMilestone: 'M48',
  notes: 'ERB ending label. M48 must connect condition, result, meta save, and end route.',
}, filesBySourcePath)) addRow(rows, row);

for (const row of createLabelRows(labels, /^TIPS[A-Z0-9_]*$/, {
  definitionKey: 'helpTextDefinitions',
  runtimeIdPrefix: 'helpText',
  runtimeOwner: 'definitions.helpTextDefinitions',
  role: 'display',
  consumerKind: 'view',
  consumingFeature: 'feature:info-settings-achievement-help-debug',
  consumingView: 'help/tips views in M49',
  statusForDefinitionCoverage: 'display-only',
  ownerMilestone: 'M49',
  notes: 'ERB help/text label. M49 must connect it to visible view/text coverage.',
}, filesBySourcePath)) addRow(rows, row);

const conflicts = [];
const report = {
  schemaVersion: 'erb-derived-definitions/v1',
  generatedBy: 'tools/build_erb_derived_definitions.mjs',
  sourceInputs: {
    erbRoot: 'original-game/ERB',
    labelIndex: 'data/game-system-analysis/label-index.tsv'
  },
  rowSchema: {
    derivedDefinitionId: 'Stable id for an ERB-only definition candidate.',
    definitionKey: 'Runtime definition collection.',
    classification: 'runtime-definition, blocker, or approved-excluded.',
    sourceFile: 'Original ERB/ERH source file.',
    sourceLabel: 'Original ERB label.',
    sourceLine: 'Original line number.',
    sourceId: 'Original semantic id, such as mission:1 or main-menu:100.',
    runtimeOwner: 'Definitions owner that future implementation must consume.',
    statusForDefinitionCoverage: 'Definition coverage status to merge into definitions.json.',
    componentLabels: 'Sub-labels that split title, condition, calculation, effect, and text.'
  },
  summary: {
    totalRows: rows.length,
    byDefinitionKey: countBy(rows, (row) => row.definitionKey),
    byOwnerMilestone: countBy(rows, (row) => row.ownerMilestone),
    byStatusForDefinitionCoverage: countBy(rows, (row) => row.statusForDefinitionCoverage),
    byRole: countBy(rows, (row) => row.role),
    conflicts: conflicts.length,
    componentLabels: rows.reduce((sum, row) => sum + (row.componentLabels?.length ?? 0), 0)
  },
  conflicts,
  rows,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      erbDerivedDefinitions: report.summary,
      output: 'data/coverage/erb-derived-definitions.json',
    },
    null,
    2,
  ),
);
