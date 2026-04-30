import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const analysisDir = path.join(root, 'data', 'game-system-analysis');
const coverageDir = path.join(root, 'data', 'coverage');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readTsv(relativePath) {
  const raw = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/^\uFEFF/, '');
  const [headerLine, ...lines] = raw.split(/\r?\n/).filter((line) => line.length > 0);
  const headers = headerLine.split('\t');
  return lines.map((line) => {
    const cells = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
}

function slug(value) {
  return String(value || 'unknown')
    .replace(/\\/g, '/')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 120) || 'unknown';
}

function areaGroup(row) {
  const area = row.area || '';
  const label = row.sourceLabel || row.label || '';
  const file = row.path || row.sourceFile || '';
  const value = `${area} ${label} ${file}`;

  if (value.includes('指導')) return { groupKey: 'training', ownerMilestone: 'M28' };
  if (value.includes('ミッション')) return { groupKey: 'mission', ownerMilestone: 'M27' };
  if (value.includes('訪問')) return { groupKey: 'visit', ownerMilestone: 'M26' };
  if (value.includes('ＡＶ撮影') || value.includes('AV_') || value.includes('AV_TOP')) {
    return { groupKey: 'shooting', ownerMilestone: 'M26' };
  }
  if (value.includes('娼館') || value.includes('ARBEIT') || value.includes('JOB_') || value.includes('WORK_')) {
    return { groupKey: 'work', ownerMilestone: 'M26' };
  }
  if (value.includes('能力上昇') || value.includes('ABLUP') || value.includes('ABILITY_UP')) {
    return { groupKey: 'ability-up', ownerMilestone: 'M23' };
  }
  if (value.includes('SHOP_ITEM') || value.includes('ITEM_') || value.includes('EVENTBUY')) {
    return { groupKey: 'item-shop', ownerMilestone: 'M24' };
  }
  if (value.includes('CHARA_BUY') || value.includes('SELL_CHARA')) {
    return { groupKey: 'recruit', ownerMilestone: 'M24' };
  }
  if (value.includes('SAVE') || value.includes('LOAD') || value.includes('SAVEDATA')) {
    return { groupKey: 'persistence', ownerMilestone: 'M29' };
  }
  if (value.includes('ENDING') || value.includes('クリアボーナス') || value.includes('実績')) {
    return { groupKey: 'ending-event-meta', ownerMilestone: 'M27' };
  }
  if (value.includes('TIPS') || value.includes('INFO') || value.includes('TESTMODE')) {
    return { groupKey: 'info-help-debug', ownerMilestone: 'M23' };
  }
  if (value.includes('EVENT') || value.includes('イベント')) {
    return { groupKey: 'event-world', ownerMilestone: 'M27' };
  }
  return { groupKey: 'common-system', ownerMilestone: 'M23' };
}

function baseRow(partial) {
  return {
    featureId: partial.featureId,
    parentFeatureId: partial.parentFeatureId ?? '',
    sourceKind: partial.sourceKind,
    groupKey: partial.groupKey,
    ownerMilestone: partial.ownerMilestone,
    sourceFile: partial.sourceFile ?? '',
    sourceLabel: partial.sourceLabel ?? '',
    sourceLabelId: partial.sourceLabelId ?? '',
    sourceLine: partial.sourceLine ?? '',
    playerInput: partial.playerInput ?? '',
    endRoute: partial.endRoute ?? '',
    status: partial.status,
    runtimeRoute: partial.runtimeRoute ?? '',
    runtimeAction: partial.runtimeAction ?? '',
    viewBuilder: partial.viewBuilder ?? '',
    handlerOwner: partial.handlerOwner ?? '',
    definitionReads: partial.definitionReads ?? [],
    stateWrites: partial.stateWrites ?? [],
    sessionWrites: partial.sessionWrites ?? [],
    successSmokeId: partial.successSmokeId ?? '',
    failureSmokeId: partial.failureSmokeId ?? '',
    cancelSmokeId: partial.cancelSmokeId ?? '',
    saveRoundtripId: partial.saveRoundtripId ?? '',
    blockerId: partial.blockerId ?? '',
    classification: partial.classification ?? '',
    notes: partial.notes ?? '',
  };
}

function implementedRow(partial) {
  return baseRow({
    status: 'implemented',
    ...partial,
  });
}

function blockerRow(partial) {
  const blockerId = partial.blockerId ?? `blocker:m19:${partial.groupKey}`;
  return baseRow({
    status: 'blocker',
    blockerId,
    ...partial,
  });
}

function createMainRows() {
  return [
    implementedRow({
      featureId: 'feature:game:new',
      sourceKind: 'main-flow',
      groupKey: 'new-game',
      ownerMilestone: 'M4',
      sourceFile: 'original-game/ERB/システム関係/SYSTEM_GAMESTART.ERB',
      sourceLabel: 'EVENTFIRST',
      playerInput: 'new game mode selection',
      endRoute: 'mainMenu',
      runtimeRoute: 'newGame',
      runtimeAction: 'game/new',
      viewBuilder: 'RouteScreen(newGame)',
      handlerOwner: 'src/features/newGame.ts',
      definitionReads: ['definitions.characters', 'definitions.items'],
      stateWrites: ['GameState.clock', 'GameState.economy', 'GameState.people', 'GameState.inventory'],
      sessionWrites: ['GameSession.ui'],
      successSmokeId: 'smoke:phase1:new-game',
      failureSmokeId: 'smoke:phase1:invalid-new-game',
      saveRoundtripId: 'test:roundtrip:new-game',
    }),
    implementedRow({
      featureId: 'feature:main-menu',
      sourceKind: 'main-flow',
      groupKey: 'main-menu',
      ownerMilestone: 'M5',
      sourceFile: 'original-game/ERB/システム関係/SHOP_MAIN.ERB',
      sourceLabel: 'EVENTSHOP/USERSHOP',
      playerInput: 'main menu choice',
      endRoute: 'selected feature route',
      runtimeRoute: 'mainMenu',
      runtimeAction: 'route/change',
      viewBuilder: 'buildMainMenuView',
      handlerOwner: 'src/features/mainMenu.ts',
      definitionReads: ['definitions'],
      sessionWrites: ['GameSession.ui'],
      successSmokeId: 'smoke:phase1:main-menu',
      failureSmokeId: 'smoke:phase1:unknown-route',
    }),
    implementedRow({
      featureId: 'feature:item-shop:purchase-basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'item-shop',
      ownerMilestone: 'M6',
      sourceFile: 'original-game/ERB/システム関係/SHOP_ITEM.ERB',
      sourceLabel: 'ITEM_SHOP/EVENTBUY/BUY_PLURAL/CLEAR_SHOP',
      playerInput: '102',
      endRoute: 'mainMenu',
      runtimeRoute: 'itemShop',
      runtimeAction: 'main/openItemShop; shop/selectListing; shop/changeQuantity; shop/confirmPurchase; shop/cancel',
      viewBuilder: 'buildItemShopView',
      handlerOwner: 'src/features/itemShop.ts',
      definitionReads: ['definitions.items', 'definitions.shopListings'],
      stateWrites: ['GameState.economy.currentMoney', 'GameState.inventory.itemCounts'],
      sessionWrites: ['GameSession.shop'],
      successSmokeId: 'smoke:phase1:purchase-success',
      failureSmokeId: 'smoke:phase1:purchase-money-failure',
      cancelSmokeId: 'smoke:phase1:shop-cancel',
      saveRoundtripId: 'test:roundtrip:item-purchase',
    }),
    blockerRow({
      featureId: 'feature:item-shop:use-effects',
      parentFeatureId: 'feature:item-shop:purchase-basic',
      sourceKind: 'main-menu-child',
      groupKey: 'item-shop',
      ownerMilestone: 'M24',
      sourceFile: 'original-game/ERB/システム関係/SHOP_ITEM.ERB',
      sourceLabel: 'USE_ITEM',
      playerInput: 'item use choice',
      endRoute: 'mainMenu',
      classification: 'item-use-effects',
      notes: 'M6 covers purchase only. Item use effects must be completed item by item in M24.',
    }),
    implementedRow({
      featureId: 'feature:recruit:basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'recruit',
      ownerMilestone: 'M7',
      sourceFile: 'original-game/ERB/システム関係/CHARA_BUY.ERB',
      sourceLabel: 'CHARA_BUY_NEW',
      playerInput: '101',
      endRoute: 'mainMenu',
      runtimeRoute: 'recruit',
      runtimeAction: 'main/openRecruit; recruit/selectListing; recruit/confirm; recruit/cancel',
      viewBuilder: 'buildRecruitView',
      handlerOwner: 'src/features/recruit.ts',
      definitionReads: ['definitions.recruitListings', 'definitions.characters'],
      stateWrites: ['GameState.economy.currentMoney', 'GameState.people', 'GameState.body', 'GameState.social', 'GameState.equipment'],
      sessionWrites: ['GameSession.recruit'],
      successSmokeId: 'smoke:m7:recruit-success',
      failureSmokeId: 'smoke:m7:money-or-duplicate-failure',
      cancelSmokeId: 'smoke:m7:recruit-cancel',
      saveRoundtripId: 'test:roundtrip:recruit',
    }),
    implementedRow({
      featureId: 'feature:turn:end-basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'turn-end',
      ownerMilestone: 'M8',
      sourceFile: 'original-game/ERB/イベント関係/EVENT_TURNEND.ERB',
      sourceLabel: 'BEGIN TURNEND/EVENTTURNEND',
      playerInput: '105',
      endRoute: 'mainMenu',
      runtimeRoute: 'mainMenu',
      runtimeAction: 'turn/end',
      viewBuilder: 'buildMainMenuView',
      handlerOwner: 'src/features/turnEnd.ts',
      stateWrites: ['GameState.clock', 'GameState.run.scheduledEvents'],
      sessionWrites: ['GameSession.* cleanup'],
      successSmokeId: 'smoke:m8:turn-end',
      saveRoundtripId: 'test:roundtrip:turn-end',
    }),
    implementedRow({
      featureId: 'feature:persistence:save-load-basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'persistence',
      ownerMilestone: 'M9',
      sourceFile: 'original-game/ERB/システム関係/AUTOSAVE.ERB',
      sourceLabel: 'SAVEGAME/LOADGAME',
      playerInput: 'save/load menu',
      endRoute: 'mainMenu or loaded route',
      runtimeRoute: 'saveLoad',
      runtimeAction: 'main/openSaveLoad; save/createSnapshot; save/loadSnapshot; save/cancel',
      viewBuilder: 'buildSaveLoadView',
      handlerOwner: 'src/features/saveLoad.ts',
      stateWrites: ['GameState from save payload on load'],
      sessionWrites: ['GameSession.saveLoad'],
      successSmokeId: 'smoke:m9:save-load-roundtrip',
      failureSmokeId: 'smoke:m9:corrupt-or-future-schema-failure',
      cancelSmokeId: 'smoke:m9:save-cancel',
      saveRoundtripId: 'test:roundtrip:save-load',
    }),
    implementedRow({
      featureId: 'feature:visit:office-room-basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'visit',
      ownerMilestone: 'M10',
      sourceFile: 'original-game/ERB/訪問関係/HOUMON.ERB',
      sourceLabel: 'HOUMON',
      playerInput: '109',
      endRoute: 'mainMenu',
      runtimeRoute: 'visit',
      runtimeAction: 'main/openVisit; visit/selectPlace; visit/selectAction; visit/confirmAction; visit/cancel',
      viewBuilder: 'buildVisitView',
      handlerOwner: 'src/features/visit.ts',
      definitionReads: ['definitions.visitPlaces'],
      stateWrites: ['GameState.economy.currentMoney', 'GameState.world.unlocks', 'GameState.featureState.visits'],
      sessionWrites: ['GameSession.visit'],
      successSmokeId: 'smoke:m10:visit-success',
      failureSmokeId: 'smoke:m10:money-or-duplicate-failure',
      cancelSmokeId: 'smoke:m10:visit-cancel',
      saveRoundtripId: 'smoke:m10:save-boundary',
    }),
    implementedRow({
      featureId: 'feature:mission:basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'mission',
      ownerMilestone: 'M11',
      sourceFile: 'original-game/ERB/ミッション関係/MISSION.ERB',
      sourceLabel: 'MISSION_MAIN',
      playerInput: '120',
      endRoute: 'mainMenu',
      runtimeRoute: 'mission',
      runtimeAction: 'main/openMission; mission/select; mission/accept; mission/report; mission/cancel',
      viewBuilder: 'buildMissionView',
      handlerOwner: 'src/features/mission.ts',
      definitionReads: ['definitions.missionDefinitions'],
      stateWrites: ['GameState.mission', 'GameState.economy.currentMoney'],
      sessionWrites: ['GameSession.mission'],
      successSmokeId: 'smoke:m11:mission-report',
      failureSmokeId: 'smoke:m11:mission-condition-failure',
      cancelSmokeId: 'smoke:m11:mission-cancel',
      saveRoundtripId: 'smoke:m11:save-boundary',
    }),
    implementedRow({
      featureId: 'feature:work:basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'work',
      ownerMilestone: 'M12',
      sourceFile: 'original-game/ERB/娼館関係/YUUKAKU_TOP.ERB',
      sourceLabel: 'YUUKAKU_TOP/ARBEIT_EXEC',
      playerInput: '103',
      endRoute: 'turn/end -> mainMenu',
      runtimeRoute: 'work',
      runtimeAction: 'main/openWork; work/select; work/selectCharacter; work/execute; work/cancel',
      viewBuilder: 'buildWorkView',
      handlerOwner: 'src/features/work.ts',
      definitionReads: ['definitions.workDefinitions'],
      stateWrites: ['GameState.economy.currentMoney', 'GameState.people.experiences', 'GameState.body.fatigue', 'GameState.work'],
      sessionWrites: ['GameSession.work'],
      successSmokeId: 'smoke:m12:work-execute',
      failureSmokeId: 'smoke:m12:missing-selection-failure',
      cancelSmokeId: 'smoke:m12:work-cancel',
      saveRoundtripId: 'smoke:m12:save-boundary',
    }),
    implementedRow({
      featureId: 'feature:shooting:basic',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'shooting',
      ownerMilestone: 'M13',
      sourceFile: 'original-game/ERB/ＡＶ撮影関係/AV_TOP.ERB',
      sourceLabel: 'AV_TOP',
      playerInput: '104',
      endRoute: 'turn/end -> mainMenu',
      runtimeRoute: 'shooting',
      runtimeAction: 'main/openShooting; shooting/selectTarget; shooting/selectScene; shooting/confirmScene; shooting/cancel',
      viewBuilder: 'buildShootingView',
      handlerOwner: 'src/features/shooting.ts',
      definitionReads: ['definitions.filmingSceneDefinitions'],
      stateWrites: ['GameState.economy.currentMoney', 'GameState.people.experiences', 'GameState.body.fatigue', 'GameState.featureState.shooting'],
      sessionWrites: ['GameSession.shooting'],
      successSmokeId: 'smoke:m13:shooting-confirm',
      failureSmokeId: 'smoke:m13:missing-target-or-scene-failure',
      cancelSmokeId: 'smoke:m13:shooting-cancel',
      saveRoundtripId: 'smoke:m13:save-boundary',
    }),
    implementedRow({
      featureId: 'feature:training:basic-command',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'training',
      ownerMilestone: 'M14',
      sourceFile: 'original-game/ERB/指導関係/TRAIN_MAIN.ERB',
      sourceLabel: 'BEFORE_TRAIN/EVENTTRAIN/EVENTCOM',
      playerInput: '100',
      endRoute: 'turn/end -> mainMenu',
      runtimeRoute: 'training',
      runtimeAction: 'main/openTraining; training/selectTarget; training/selectExecutor; training/selectCommand; training/execute; training/cancel',
      viewBuilder: 'buildTrainingView',
      handlerOwner: 'src/features/training.ts',
      definitionReads: ['definitions.trainingCommands'],
      stateWrites: ['GameState.people.experiences', 'GameState.body.fatigue', 'GameState.body.parameters'],
      sessionWrites: ['GameSession.interaction'],
      successSmokeId: 'smoke:m14:training-execute',
      failureSmokeId: 'smoke:m14:missing-selection-failure',
      cancelSmokeId: 'smoke:m14:training-cancel',
      saveRoundtripId: 'smoke:m14:save-boundary',
    }),
    blockerRow({
      featureId: 'feature:wardrobe-clothing',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'wardrobe-clothing',
      ownerMilestone: 'M24',
      sourceFile: 'original-game/ERB/システム関係/SHOP_MAIN.ERB',
      sourceLabel: '재단/의복',
      endRoute: 'mainMenu',
      classification: 'main-menu-unimplemented',
    }),
    blockerRow({
      featureId: 'feature:ability-up',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'ability-up',
      ownerMilestone: 'M23',
      sourceFile: 'original-game/ERB/システム関係/SHOP_MAIN.ERB',
      sourceLabel: 'ABILITY_UP',
      playerInput: '112',
      endRoute: 'mainMenu or turn/end',
      classification: 'main-menu-unimplemented',
    }),
    blockerRow({
      featureId: 'feature:info-settings-achievement-help-debug',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'info-help-debug',
      ownerMilestone: 'M23',
      sourceFile: 'original-game/ERB/TIPS関係/TIPS.ERB',
      sourceLabel: 'TIPS/INFO/TESTMODE',
      endRoute: 'mainMenu',
      classification: 'main-menu-unimplemented',
    }),
    blockerRow({
      featureId: 'feature:ending-check',
      parentFeatureId: 'feature:main-menu',
      sourceKind: 'main-menu-child',
      groupKey: 'ending-event-meta',
      ownerMilestone: 'M27',
      sourceFile: 'original-game/ERB/イベント関係/ENDING.ERB',
      sourceLabel: 'ENDING_CHECK',
      endRoute: 'mainMenu or quitGame',
      classification: 'main-menu-unimplemented',
    }),
  ];
}

function persistenceClassification(row) {
  const text = `${row.action || ''} ${row.text || ''}`;
  if (text.includes('SAVEGLOBAL')) return 'global-save';
  if (text.includes('LOADGLOBAL')) return 'global-load';
  if (text.includes('SAVEGAME')) return 'save';
  if (text.includes('LOADGAME')) return 'load';
  if (text.includes('SAVEDATA')) return 'schema';
  return 'persistence-unknown';
}

function exitClassification(row) {
  const text = `${row.action || ''} ${row.text || ''}`;
  if (text.includes('QUIT')) return 'game-quit';
  if (text.includes('RESETDATA')) return 'reset-data';
  if (text.includes('RETURNF')) return 'function-return';
  return 'normal-return';
}

function pauseClassification(row) {
  return row.action === 'INPUT' ? 'input-wait' : 'message-wait';
}

function createFlowRows(flowRows) {
  return flowRows.map((row, index) => {
    const group = areaGroup(row);
    const actionKind = row.actionKind;
    const classification =
      actionKind === 'persistence'
        ? persistenceClassification(row)
        : actionKind === 'exit'
          ? exitClassification(row)
          : pauseClassification(row);

    return blockerRow({
      featureId: `feature:flow:${actionKind}:${slug(row.path)}:${row.line}:${index + 1}`,
      sourceKind: `flow-control:${actionKind}`,
      groupKey: group.groupKey,
      ownerMilestone: actionKind === 'persistence' ? 'M29' : group.ownerMilestone,
      sourceFile: row.path,
      sourceLabel: row.sourceLabel,
      sourceLabelId: row.sourceLabelId,
      sourceLine: row.line,
      endRoute: classification,
      classification,
      notes: row.text,
      blockerId: `blocker:m19:flow:${actionKind}:${group.groupKey}`,
    });
  });
}

function createDynamicRows(dynamicRows) {
  return dynamicRows.map((row, index) => {
    const group = areaGroup(row);
    const hasCandidates = Number(row.candidateCount || '0') > 0;
    return blockerRow({
      featureId: `feature:dynamic-call:${slug(row.path)}:${row.line}:${index + 1}`,
      sourceKind: 'dynamic-call',
      groupKey: group.groupKey,
      ownerMilestone: group.ownerMilestone,
      sourceFile: row.path,
      sourceLabel: row.sourceLabel,
      sourceLine: row.line,
      endRoute: hasCandidates ? 'dynamic target set' : 'runtime-generated target',
      classification: hasCandidates ? 'candidate-labels-recorded' : 'no-static-candidates',
      notes: `${row.kind} ${row.targetRaw}; pattern=${row.pattern}; candidateCount=${row.candidateCount}; candidates=${row.candidateLabels}`,
      blockerId: `blocker:m19:dynamic:${group.groupKey}`,
    });
  });
}

function createEntryRows(labelRows, entryKind) {
  return labelRows
    .filter((row) => row.entryKind === entryKind)
    .map((row, index) => {
      const group = areaGroup(row);
      return blockerRow({
        featureId: `feature:${entryKind}:${slug(row.path)}:${row.line}:${index + 1}`,
        sourceKind: entryKind,
        groupKey: group.groupKey,
        ownerMilestone: group.ownerMilestone,
        sourceFile: row.path,
        sourceLabel: row.label,
        sourceLabelId: row.labelId,
        sourceLine: row.line,
        endRoute: entryKind === 'engine-entry' ? 'engine entry' : 'unreachable or externally invoked',
        classification: entryKind,
        notes:
          entryKind === 'unreferenced-global'
            ? 'Static analysis found no incoming call. M19 records it separately instead of deleting it.'
            : 'Engine entry must be connected to runtime feature coverage or closed by later milestone.',
        blockerId: `blocker:m19:${entryKind}:${group.groupKey}`,
      });
    });
}

function countBy(rows, keyFn) {
  const result = {};
  for (const row of rows) {
    const key = keyFn(row);
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function createBlockers(rows) {
  const blockers = new Map();
  for (const row of rows) {
    if (row.status !== 'blocker') continue;
    if (blockers.has(row.blockerId)) continue;
    blockers.set(row.blockerId, {
      blockerId: row.blockerId,
      ownerMilestone: row.ownerMilestone,
      sourceLocation: row.sourceFile,
      blockedTarget: row.groupKey,
      status: 'blocker',
      reason: row.classification || 'feature coverage not implemented yet',
      requiredDecision: 'Implement the owning feature unit with M18 templates, or record an approved exclusion with user approval.',
      temporaryRuntimeBehavior: 'Not completed in runtime coverage.',
      completionBlocked: true,
      unblocksWhen: 'Coverage row becomes implemented with route/action/view/handler/smoke evidence, or approved-excluded with user approval.',
      verificationToClose: 'npm run gate:feature-coverage',
    });
  }
  return [...blockers.values()].sort((a, b) => a.blockerId.localeCompare(b.blockerId));
}

function readExistingExternalBlockers() {
  const blockersPath = path.join(coverageDir, 'blockers.json');

  if (!fs.existsSync(blockersPath)) {
    return [];
  }

  const existing = JSON.parse(fs.readFileSync(blockersPath, 'utf8'));
  if (!Array.isArray(existing.blockers)) {
    return [];
  }

  return existing.blockers.filter((blocker) => !String(blocker.blockerId ?? '').startsWith('blocker:m19:'));
}

function mergeBlockers(...groups) {
  const merged = new Map();

  for (const group of groups) {
    for (const blocker of group) {
      merged.set(blocker.blockerId, blocker);
    }
  }

  return [...merged.values()].sort((a, b) => a.blockerId.localeCompare(b.blockerId));
}

const summary = readJson('data/game-system-analysis/summary.json');
const dynamicRows = readTsv('data/game-system-analysis/dynamic-call-patterns.tsv');
const flowRows = readTsv('data/game-system-analysis/flow-control-actions.tsv');
const labelRows = readTsv('data/game-system-analysis/label-index.tsv');

const rows = [
  ...createMainRows(),
  ...createDynamicRows(dynamicRows),
  ...createFlowRows(flowRows),
  ...createEntryRows(labelRows, 'engine-entry'),
  ...createEntryRows(labelRows, 'unreferenced-global'),
];

const coverage = {
  schemaVersion: 'feature-coverage/v1',
  generatedBy: 'tools/build_feature_coverage.mjs',
  sourceAnalysis: {
    summaryPath: 'data/game-system-analysis/summary.json',
    dynamicCallPatternsPath: 'data/game-system-analysis/dynamic-call-patterns.tsv',
    flowControlActionsPath: 'data/game-system-analysis/flow-control-actions.tsv',
    labelIndexPath: 'data/game-system-analysis/label-index.tsv',
  },
  expectedCounts: {
    dynamicCalls: summary.flowGraph.dynamicEdges,
    flowControlActions: summary.flowGraph.flowControlActions,
    exitActions: summary.flowGraph.exitActions,
    pauseActions: summary.flowGraph.pauseActions,
    persistenceActions: summary.flowGraph.persistenceActions,
    engineEntries: summary.flowGraph.engineEntries,
    unreferencedGlobalEntries: summary.flowGraph.unreferencedGlobalEntries,
  },
  rowSchema: {
    featureId: 'Stable feature coverage id.',
    parentFeatureId: 'Parent coverage feature id when this is a child unit.',
    sourceKind: 'main-flow, main-menu-child, dynamic-call, flow-control:<kind>, engine-entry, or unreferenced-global.',
    groupKey: 'Owner group consumed by M23-M29.',
    ownerMilestone: 'Milestone responsible for implementation or closure.',
    sourceFile: 'Original ERB source file.',
    sourceLabel: 'Original label or function.',
    sourceLabelId: 'Original label id when available.',
    sourceLine: 'Original line number when available.',
    playerInput: 'Menu choice or input condition when known.',
    endRoute: 'Expected return/exit route or classified flow result.',
    status: 'implemented, blocker, or approved-excluded.',
    runtimeRoute: 'New UI route. Required for implemented rows.',
    runtimeAction: 'New GameAction. Required for implemented rows.',
    viewBuilder: 'New view builder/component. Required for implemented rows.',
    handlerOwner: 'New feature handler file. Required for implemented rows.',
    definitionReads: 'Definitions read by implemented feature.',
    stateWrites: 'GameState writes by implemented feature.',
    sessionWrites: 'GameSession writes/cleanup by implemented feature.',
    successSmokeId: 'Success smoke/assertion id. Required for implemented rows.',
    failureSmokeId: 'Failure smoke/assertion id when applicable.',
    cancelSmokeId: 'Cancel smoke/assertion id when applicable.',
    saveRoundtripId: 'Roundtrip/boundary assertion id when save is affected.',
    blockerId: 'Blocker registry id for blocker rows.',
    classification: 'M19 classification for flow/dynamic/unreachable rows.',
    notes: 'Short source evidence note.',
  },
  summary: {
    totalRows: rows.length,
    byStatus: countBy(rows, (row) => row.status),
    bySourceKind: countBy(rows, (row) => row.sourceKind),
    byGroupKey: countBy(rows, (row) => row.groupKey),
    byOwnerMilestone: countBy(rows, (row) => row.ownerMilestone),
  },
  rows,
};

const blockers = {
  schemaVersion: 'blocker-registry/v1',
  generatedBy: 'coverage scripts',
  blockers: mergeBlockers(createBlockers(rows), readExistingExternalBlockers()),
};

fs.mkdirSync(coverageDir, { recursive: true });
fs.writeFileSync(path.join(coverageDir, 'features.json'), `${JSON.stringify(coverage, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(coverageDir, 'blockers.json'), `${JSON.stringify(blockers, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      features: coverage.summary,
      blockers: blockers.blockers.length,
      output: ['data/coverage/features.json', 'data/coverage/blockers.json'],
    },
    null,
    2,
  ),
);
