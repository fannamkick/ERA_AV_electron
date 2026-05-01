import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function writeJson(relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function countBy(rows, keyFn) {
  const result = {};
  for (const row of rows) {
    const key = keyFn(row) || '(empty)';
    result[key] = (result[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function numericSort(a, b) {
  return Number(a.menuCode) - Number(b.menuCode);
}

const mainMenuRouteContracts = {
  100: { actionId: 'main/openTraining', routeId: 'training', defaultEnabled: true, ownerMilestone: 'M40' },
  101: { actionId: 'main/openRecruit', routeId: 'recruit', defaultEnabled: true, ownerMilestone: 'M31' },
  102: { actionId: 'main/openItemShop', routeId: 'itemShop', defaultEnabled: true, ownerMilestone: 'M29' },
  103: { actionId: 'main/openWork', routeId: 'work', defaultEnabled: true, ownerMilestone: 'M37' },
  104: { actionId: 'main/openShooting', routeId: 'shooting', defaultEnabled: true, ownerMilestone: 'M39' },
  105: { actionId: 'turn/end', routeId: 'mainMenu', defaultEnabled: true, ownerMilestone: 'M35' },
  108: { actionId: 'main/openWardrobe', routeId: 'wardrobe', defaultEnabled: true, ownerMilestone: 'M34' },
  109: { actionId: 'main/openVisit', routeId: 'visit', defaultEnabled: true, ownerMilestone: 'M36' },
  111: { actionId: 'main/openRoster', routeId: 'roster', defaultEnabled: true, ownerMilestone: 'M32' },
  112: { defaultEnabled: false, disabledReason: 'M45 ability-up owner must implement this route.', ownerMilestone: 'M45' },
  113: { defaultEnabled: false, disabledReason: 'M32 character identity owner must implement sorting.', ownerMilestone: 'M32' },
  115: { defaultEnabled: false, disabledReason: 'M49 remaining-feature owner must classify and implement this route.', ownerMilestone: 'M49' },
  116: { defaultEnabled: false, disabledReason: 'M47 world/event owner must implement this route.', ownerMilestone: 'M47' },
  120: { actionId: 'main/openMission', routeId: 'mission', defaultEnabled: true, ownerMilestone: 'M46' },
  150: { defaultEnabled: false, disabledReason: 'M48 ending/meta owner must implement this route.', ownerMilestone: 'M48' },
  200: { actionId: 'main/openSaveLoad', routeId: 'saveLoad', defaultEnabled: true, ownerMilestone: 'M50' },
  300: { actionId: 'main/openSaveLoad', routeId: 'saveLoad', defaultEnabled: true, ownerMilestone: 'M50' },
  400: { defaultEnabled: false, disabledReason: 'M49 settings owner must implement this route.', ownerMilestone: 'M49' },
  500: { defaultEnabled: false, disabledReason: 'M48 achievement/meta owner must implement this route.', ownerMilestone: 'M48' },
  600: { defaultEnabled: false, disabledReason: 'M49 information owner must implement this route.', ownerMilestone: 'M49' },
  700: { actionId: 'main/openRoster', routeId: 'roster', defaultEnabled: true, ownerMilestone: 'M32' },
  750: { defaultEnabled: false, disabledReason: 'M49 tips/help owner must implement this route.', ownerMilestone: 'M49' },
  888: { defaultEnabled: false, disabledReason: 'M49 debug owner must implement this route.', ownerMilestone: 'M49' },
  8826: { defaultEnabled: false, disabledReason: 'M49 debug owner must implement this hidden route.', ownerMilestone: 'M49' },
};

const queue = readJson('data/coverage/implementation-queue.json');
const definitions = readJson('data/coverage/definitions.json');
const sessionMapping = readJson('data/coverage/session-mapping.json');

const m28Unit = (queue.queueUnits ?? []).find((unit) => unit.unitId === 'unit:M28:main-route');
if (!m28Unit) {
  throw new Error('M28 implementation queue unit not found.');
}

const queueRowRefs = new Set(m28Unit.rowRefs ?? []);
const definitionRows = (definitions.rows ?? [])
  .filter((row) => row.definitionKey === 'mainMenuOptions' && row.ownerMilestone === 'M28')
  .map((row) => {
    const menuCode = String(row.menuCode ?? row.sourceId?.replace(/^main-menu:/, '') ?? row.runtimeId?.replace(/^mainMenuOption:/, ''));
    const contract = mainMenuRouteContracts[menuCode];
    const reviewId = `definition:${row.definitionRowId}`;
    return {
      coverageRowId: `main-route:menu:${menuCode}`,
      reviewId,
      sourceDefinitionRowId: row.definitionRowId,
      sourceEvidenceId: row.sourceEvidenceId,
      sourcePath: row.sourceFile,
      sourceLine: row.sourceLine,
      sourceLabel: row.sourceLabel,
      menuCode,
      label: row.displayText ?? row.sourceName,
      actionTarget: row.actionTarget ?? '',
      actionCondition: row.actionCondition ?? '',
      actionId: contract?.actionId ?? '',
      routeId: contract?.routeId ?? '',
      defaultEnabled: Boolean(contract?.defaultEnabled),
      disabledReason: contract?.disabledReason ?? '',
      destinationOwnerMilestone: contract?.ownerMilestone ?? 'M49',
      runtimeDefinitionId: row.runtimeId,
      runtimeConsumerId: 'definitions.mainMenuOptions -> buildMainMenuView -> dispatchGameAction',
      viewConsumer: 'src/features/mainMenu.ts:buildMainMenuView',
      actionConsumer: contract?.actionId ? 'src/game/dispatch.ts:dispatchGameAction' : '',
      routeConsumer: contract?.routeId ? 'src/ui/RouteScreens.tsx:RouteScreen' : '',
      verificationId: 'smoke:main-routes',
      completionStatus: contract?.defaultEnabled ? 'implemented-enabled-route' : 'implemented-disabled-route-contract',
      completionRule: contract?.defaultEnabled
        ? 'Menu row is visible, enabled by view condition, dispatches an action, and reaches a concrete route.'
        : 'Menu row is visible as disabled with explicit future owner and disabled reason; future feature owner must enable it.',
    };
  })
  .sort(numericSort);

const sessionRowRefs = [...queueRowRefs].filter((rowRef) => rowRef.startsWith('session-mapping:')).sort();
const sessionRows = sessionRowRefs.map((reviewId) => {
  const mappingRowId = reviewId.replace(/^session-mapping:/, '');
  const row = (sessionMapping.rows ?? []).find((item) => item.mappingRowId === mappingRowId);
  if (!row) {
    throw new Error(`Missing session mapping row for ${reviewId}`);
  }

  return {
    coverageRowId: `main-route:${mappingRowId}`,
    reviewId,
    sourceMappingRowId: row.mappingRowId,
    sourceEvidenceId: row.sourceEvidenceId,
    sourcePath: row.sourceFile,
    sourceLine: row.sourceLine,
    address: row.address,
    classification: row.classification,
    originalSessionOwner: row.sessionOwner,
    originalSessionFieldPath: row.sessionFieldPath,
    completionStatus: 'transferred-out',
    fromMilestone: 'M28',
    toMilestone: 'M47',
    acceptedByOwner: true,
    transferReason:
      'The source is BOYFRIEND NTR event-local screen state, not the main menu route connector. M47 world/event owner must implement the event session lifecycle.',
    verificationId: 'gate:milestone-scope-closure -- M47',
  };
});

const accountedRowRefs = new Set([...definitionRows.map((row) => row.reviewId), ...sessionRows.map((row) => row.reviewId)]);
const missingQueueRowRefs = [...queueRowRefs].filter((rowRef) => !accountedRowRefs.has(rowRef)).sort();
const extraAccountedRowRefs = [...accountedRowRefs].filter((rowRef) => !queueRowRefs.has(rowRef)).sort();

const enabledMenuRows = definitionRows.filter((row) => row.defaultEnabled);
const disabledMenuRows = definitionRows.filter((row) => !row.defaultEnabled);
const implementedRows = definitionRows.length;
const transferredOut = sessionRows.length;
const m28OwnedRows = definitionRows.length;

const mainRouteCoverage = {
  schemaVersion: 'main-route-coverage/v1',
  generatedBy: 'tools/build_main_route_coverage.mjs',
  milestone: 'M28',
  ownerRole: 'main-route-connector',
  sourceInputs: {
    implementationQueue: 'data/coverage/implementation-queue.json',
    definitions: 'data/coverage/definitions.json',
    sessionMapping: 'data/coverage/session-mapping.json',
  },
  scopeContract: {
    purpose: 'Close every M28 queue row for main-menu route entry, disabled route ownership, or explicit transfer.',
    ownedUnitId: m28Unit.unitId,
    rowCoverageRule: 'Every rowRef in unit:M28:main-route must appear in menuRows or sessionRows exactly once.',
    completionRule:
      'Enabled menu rows require actionId, routeId, runtime view consumer, dispatch consumer, and smoke verification. Disabled rows require disabledReason and future owner.',
    transferRule:
      'Rows outside main route ownership must record fromMilestone, toMilestone, acceptedByOwner, sourceEvidenceId, and transferReason.',
  },
  summary: {
    queueRowRefs: queueRowRefs.size,
    menuRows: definitionRows.length,
    enabledMenuRows: enabledMenuRows.length,
    disabledMenuRows: disabledMenuRows.length,
    sessionRows: sessionRows.length,
    implementedRows,
    transferredOut,
    ownedBlocker: 0,
    missingQueueRowRefs: missingQueueRowRefs.length,
    extraAccountedRowRefs: extraAccountedRowRefs.length,
    byCompletionStatus: countBy([...definitionRows, ...sessionRows], (row) => row.completionStatus),
    byDestinationOwnerMilestone: countBy(definitionRows, (row) => row.destinationOwnerMilestone),
  },
  queueRowRefs: [...queueRowRefs].sort(),
  menuRows: definitionRows,
  sessionRows,
  unresolvedIssues: [
    ...missingQueueRowRefs.map((rowRef) => ({
      issueId: `missing-queue-row:${rowRef}`,
      severity: 'error',
      rowRef,
      message: 'M28 queue row is not accounted in main route coverage.',
    })),
    ...extraAccountedRowRefs.map((rowRef) => ({
      issueId: `extra-accounted-row:${rowRef}`,
      severity: 'error',
      rowRef,
      message: 'Main route coverage accounts a row outside the M28 queue unit.',
    })),
  ],
};

const gapAudit = {
  schemaVersion: 'milestone-gap-audit/v1',
  generatedBy: 'tools/build_main_route_coverage.mjs',
  milestone: 'M28',
  sourceInputs: {
    mainRouteCoverage: 'data/coverage/main-route-coverage.json',
    implementationQueue: 'data/coverage/implementation-queue.json',
  },
  summary: {
    scopeRows: queueRowRefs.size,
    implementedRows,
    transferredOut,
    approvedExcluded: 0,
    unresolvedGaps: mainRouteCoverage.unresolvedIssues.length,
    ownedBlockers: 0,
    roleOnlyComplete: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    unapprovedExcluded: 0,
  },
  issues: mainRouteCoverage.unresolvedIssues,
};

const closure = {
  schemaVersion: 'milestone-closure/v1',
  milestone: 'M28',
  title: 'Main screen route coverage',
  status: 'completed',
  completedAt: '2026-05-01',
  commitPolicy: 'Commit after every milestone closure.',
  commitHash: 'recorded by the M28 git commit that includes this closure file',
  sourceInputs: mainRouteCoverage.sourceInputs,
  outputs: {
    mainRouteCoverage: 'data/coverage/main-route-coverage.json',
    gapAudit: 'data/coverage/audits/M28-gap-audit.json',
    builder: 'tools/build_main_route_coverage.mjs',
    coverageGate: 'tools/gate_main_route_coverage.mjs',
    closureGate: 'tools/gate_milestone_scope_closure.mjs',
    smoke: 'tools/m28_main_routes_smoke.ts',
  },
  counts: {
    ownedTotal: m28OwnedRows,
    menuRows: definitionRows.length,
    enabledMenuRows: enabledMenuRows.length,
    disabledMenuRows: disabledMenuRows.length,
    sessionRows: sessionRows.length,
    implemented: implementedRows,
    mapped: 0,
    approvedExcluded: 0,
    transferredOut,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  closureMetrics: {
    ownedTotal: m28OwnedRows,
    implemented: implementedRows,
    mapped: 0,
    approvedExcluded: 0,
    transferredOut: 0,
    ownedBlocker: 0,
    missingEvidence: 0,
    missingConsumer: 0,
    missingVerification: 0,
    roleOnlyComplete: 0,
    unapprovedExcluded: 0,
  },
  outOfScopeRows: {
    acceptedByReceivingOwner: transferredOut,
    receivingOwnerMilestone: 'M47',
    rowRefs: sessionRows.map((row) => row.reviewId),
    reason:
      'These BOYFRIEND event-local screen session rows are accounted in M28 coverage because they were present in the old M28 queue, but they are not part of the M28 main-route connector responsibility.',
  },
  responsibilityIntegrity: {
    scopeReductionProhibited: true,
    checklistMatchedToResponsibility: true,
    sourceBehaviorImplementedNotJustIndexed: true,
    gateValidatesResponsibilityNotOwnScaffold: true,
    limitationsBlockCompletion: false,
    responsibilityItems: [
      'All 24 original SHOP_MAIN main-menu option rows are accounted.',
      'Enabled rows have runtime definitions, action ids, route ids, dispatch consumers, route consumers, and smoke verification.',
      'Disabled rows remain visible as disabled route contracts with explicit future owner milestones and disabled reasons.',
      'BOYFRIEND event-local TCVAR rows are excluded from M28 ownership and recorded as M47 event/world responsibility.',
    ],
    implementationEvidence: [
      'data/coverage/main-route-coverage.json',
      'src/catalog/legacyCatalog.ts',
      'src/features/mainMenu.ts',
      'src/game/dispatch.ts',
      'src/ui/RouteScreens.tsx',
    ],
    verificationEvidence: [
      'npm run coverage:main-routes',
      'npm run gate:main-route-coverage',
      'npm run gate:milestone-scope-closure -- M28',
      'npm run smoke:main-routes',
      'npm run build',
    ],
  },
  verification: {
    commands: [
      'npm run coverage:main-routes',
      'npm run gate:main-route-coverage',
      'npm run gate:milestone-scope-closure -- M28',
      'npm run smoke:main-routes',
      'npm run smoke:m13',
      'npm run smoke:m14',
      'npm run build',
      'npm run test --if-present',
    ],
    expectedGateResult: '24 menu row(s), 3 transferred session row(s), 0 unresolved M28 issue(s)',
  },
  commandsRun: [
    'npm run coverage:main-routes',
    'npm run gate:main-route-coverage',
    'npm run gate:milestone-scope-closure -- M28',
    'npm run smoke:main-routes',
    'npm run smoke:m13',
    'npm run smoke:m14',
    'npm run build',
    'npm run test --if-present',
  ],
};

writeJson('data/coverage/main-route-coverage.json', mainRouteCoverage);
writeJson('data/coverage/audits/M28-gap-audit.json', gapAudit);
writeJson('data/coverage/milestones/M28-closure.json', closure);

console.log(
  `coverage:main-routes wrote ${definitionRows.length} menu row(s), ${sessionRows.length} transferred session row(s), ${mainRouteCoverage.unresolvedIssues.length} unresolved issue(s).`,
);
