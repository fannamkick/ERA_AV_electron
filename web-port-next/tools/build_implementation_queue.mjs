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

function slug(value) {
  return (
    String(value || 'unknown')
      .replace(/\\/g, '/')
      .replace(/[^A-Za-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .slice(0, 120) || 'unknown'
  );
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

const ownerPlan = {
  M28: { role: 'main-route-connector', area: 'main-route' },
  M29: { role: 'shop-purchase-implementer', area: 'shop-purchase' },
  M30: { role: 'item-use-implementer', area: 'item-use' },
  M31: { role: 'recruit-implementer', area: 'recruit' },
  M32: { role: 'character-identity-owner', area: 'character-identity' },
  M33: { role: 'body-stat-owner', area: 'body-stat' },
  M34: { role: 'social-equipment-cflag-owner', area: 'social-equipment-cflag' },
  M35: { role: 'turn-time-owner', area: 'turn-time' },
  M36: { role: 'visit-facility-owner', area: 'visit-facility' },
  M37: { role: 'work-owner', area: 'work' },
  M38: { role: 'filming-definition-owner', area: 'filming-definition' },
  M39: { role: 'filming-execution-owner', area: 'filming-execution' },
  M40: { role: 'training-session-owner', area: 'training-session' },
  M41: { role: 'training-availability-owner', area: 'training-availability' },
  M42: { role: 'training-effect-0-34-owner', area: 'training-effect-0-34' },
  M43: { role: 'training-effect-35-69-owner', area: 'training-effect-35-69' },
  M44: { role: 'training-effect-70-104-and-post-owner', area: 'training-effect-70-104-post' },
  M45: { role: 'common-maintenance-owner', area: 'common-maintenance' },
  M46: { role: 'mission-owner', area: 'mission' },
  M47: { role: 'world-event-owner', area: 'world-event' },
  M48: { role: 'ending-meta-owner', area: 'ending-meta' },
  M49: { role: 'info-settings-catchall-owner', area: 'info-settings-catchall' },
  M50: { role: 'save-roundtrip-owner', area: 'save-roundtrip' },
  M51: { role: 'final-gap-audit-owner', area: 'final-gap-audit' },
  M52: { role: 'complete-port-verdict-owner', area: 'complete-port-verdict' },
};

function queueOwner(row) {
  if (row.implementationOwnerMilestone === 'M27') return 'M51';
  return row.implementationOwnerMilestone;
}

function verificationFor(owner) {
  if (owner === 'M50') return 'npm run gate:milestone-scope-closure -- M50';
  if (owner === 'M51') return 'npm run gate:final-gap-audit';
  if (owner === 'M52') return 'npm run gate:complete-port-verdict';
  return `npm run gate:milestone-scope-closure -- ${owner}`;
}

function areaForReviewRow(row) {
  if (row.rowKind === 'source-file-review') return `${ownerPlan[queueOwner(row)]?.area || 'source-file-review'}:${slug(row.sourcePath)}`;
  return ownerPlan[queueOwner(row)]?.area || slug(row.groupKey || row.definitionKey || row.runtimeOwner || row.rowKind);
}

function requirementTemplate(rows, owner) {
  const kinds = new Set(rows.map((row) => row.rowKind));
  return {
    sourceEvidence: 'Every referenced row keeps primary source evidence or is converted into approved exclusion with user approval.',
    featureRuntime: kinds.has('feature')
      ? 'Feature rows require route/action/view/handler success evidence before the owner milestone can close.'
      : 'No feature rows in this unit.',
    definitionConsumption: kinds.has('definition')
      ? 'Definition rows require runtime consumption through feature/view/calculation/save-init, or a blocker/approved exclusion.'
      : 'No definition rows in this unit.',
    saveRoundtrip: kinds.has('save-mapping') || owner === 'M50'
      ? 'Save mapping rows require domain write/read use and save roundtrip verification when mutated.'
      : 'Save roundtrip required only if this unit mutates save state.',
    sessionLifecycle: kinds.has('session-mapping')
      ? 'Session/calculation rows require create, consume, dispose checks and must not enter save payloads.'
      : 'No session/calculation rows in this unit.',
    viewEvidence: 'If user-visible state is involved, the owner milestone must add view evidence or an explicit not-visible reason.',
    pathCoverage: 'Success path is required. Failure/cancel/roundtrip are required when the row kind or feature flow can produce them.',
  };
}

function makeUnit(rows, owner, area) {
  const rowKinds = countBy(rows, (row) => row.rowKind);
  const sourceStatuses = countBy(rows, (row) => row.sourceStatus);
  const hasFeature = Boolean(rowKinds.feature);
  const hasSave = Boolean(rowKinds['save-mapping']);
  const hasSession = Boolean(rowKinds['session-mapping']);
  return {
    unitId: `unit:${owner}:${slug(area)}`,
    ownerMilestone: owner,
    ownerRole: ownerPlan[owner]?.role || 'unknown-owner',
    implementationArea: area,
    status: 'queued',
    rowCount: rows.length,
    rowCountsByKind: rowKinds,
    sourceStatusCounts: sourceStatuses,
    rowRefs: rows.map((row) => row.reviewId).sort(),
    primarySourceEvidenceIds: unique(rows.map((row) => row.sourceEvidenceId)).sort(),
    sourcePaths: unique(rows.map((row) => row.sourcePath)).sort(),
    requiredEvidenceTemplate: requirementTemplate(rows, owner),
    verification: {
      ownerGate: verificationFor(owner),
      build: 'npm run build',
      successPathRequired: true,
      failurePathRequired: hasFeature,
      cancelPathRequired: hasFeature,
      saveRoundtripRequired: hasSave,
      sessionCleanupRequired: hasSession,
    },
    closureRule:
      'All rowRefs in this unit must become implemented/used/mapped-consumed, remain blocker-owned by this unit, or receive explicit approved exclusion before the owner milestone can close.',
  };
}

const audit = readJson('data/coverage/audits/pre-implementation-gap-audit.json');
const blockers = readJson('data/coverage/blockers.json');
const features = readJson('data/coverage/features.json');
const definitions = readJson('data/coverage/definitions.json');
const approvedExclusions = readJson('data/coverage/approved-exclusions.json');

const auditRows = audit.implementationReviewRows ?? [];
const queueRows = auditRows.map((row) => ({
  ...row,
  queueOwnerMilestone: queueOwner(row),
  queueArea: areaForReviewRow(row),
  verificationCommand: verificationFor(queueOwner(row)),
}));

const unitGroups = new Map();
for (const row of queueRows) {
  const key = `${row.queueOwnerMilestone}:${row.queueArea}`;
  const rows = unitGroups.get(key) ?? [];
  rows.push(row);
  unitGroups.set(key, rows);
}

const queueUnits = [...unitGroups.entries()]
  .map(([key, rows]) => {
    const [owner, ...areaParts] = key.split(':');
    return makeUnit(rows, owner, areaParts.join(':'));
  })
  .sort((a, b) => a.unitId.localeCompare(b.unitId));

const featureRows = features.rows ?? [];
const definitionRows = definitions.rows ?? [];
const reviewById = new Map(queueRows.map((row) => [`${row.rowKind}:${row.rowId}`, row]));
const blockerToReviewRows = new Map();

for (const row of featureRows) {
  if (!row.blockerId) continue;
  const review = reviewById.get(`feature:${row.featureId}`);
  if (!review) continue;
  const rows = blockerToReviewRows.get(row.blockerId) ?? [];
  rows.push(review);
  blockerToReviewRows.set(row.blockerId, rows);
}

for (const row of definitionRows) {
  if (!row.blockerId) continue;
  const review = reviewById.get(`definition:${row.definitionRowId}`);
  if (!review) continue;
  const rows = blockerToReviewRows.get(row.blockerId) ?? [];
  rows.push(review);
  blockerToReviewRows.set(row.blockerId, rows);
}

const blockerFreezeRows = (blockers.blockers ?? [])
  .map((blocker) => {
    const linkedRows = blockerToReviewRows.get(blocker.blockerId) ?? [];
    const owners = unique(linkedRows.map((row) => row.queueOwnerMilestone));
    const frozenOwnerMilestone = owners[0] || 'M52';
    return {
      blockerId: blocker.blockerId,
      status: 'frozen-open',
      originalOwnerMilestone: blocker.ownerMilestone,
      frozenOwnerMilestone,
      ownerRole: ownerPlan[frozenOwnerMilestone]?.role || 'complete-port-verdict-owner',
      blockedTarget: blocker.blockedTarget,
      sourceEvidenceId: blocker.sourceEvidenceId,
      sourceLocation: blocker.sourceLocation,
      reason: blocker.reason,
      requiredDecision: blocker.requiredDecision,
      linkedReviewRows: linkedRows.map((row) => row.reviewId).sort(),
      linkedOwnerMilestones: owners,
      closureRule:
        'The frozen owner must implement all linked rows or obtain an explicit approved exclusion. The blocker cannot be silently dropped.',
      verificationToClose: verificationFor(frozenOwnerMilestone),
    };
  })
  .sort((a, b) => a.blockerId.localeCompare(b.blockerId));

const approvedExclusionRequests = blockerFreezeRows.map((row) => ({
  requestId: `approval-request:${row.blockerId}`,
  status: 'not-requested',
  rowKind: 'blocker',
  rowId: row.blockerId,
  ownerMilestone: row.frozenOwnerMilestone,
  sourceEvidenceId: row.sourceEvidenceId,
  sourceLocation: row.sourceLocation,
  approvalRequired: true,
  approvalRule: 'Only the user can approve exclusion. Until approval exists, implementation remains required.',
  existingApprovedExclusionId: '',
}));

const evidenceOwnerMap = new Map();
for (const row of queueRows) {
  if (!row.sourceEvidenceId) continue;
  const item = evidenceOwnerMap.get(row.sourceEvidenceId) ?? {
    sourceEvidenceId: row.sourceEvidenceId,
    sourcePath: row.sourcePath,
    owners: new Set(),
    reviewRows: [],
  };
  item.owners.add(row.queueOwnerMilestone);
  item.reviewRows.push(row.reviewId);
  evidenceOwnerMap.set(row.sourceEvidenceId, item);
}

const sharedSourceOwnership = [...evidenceOwnerMap.values()]
  .filter((item) => item.owners.size > 1)
  .map((item) => {
    const owners = [...item.owners].sort();
    return {
      sourceEvidenceId: item.sourceEvidenceId,
      sourcePath: item.sourcePath,
      primaryOwnerMilestone: owners[0],
      referenceOwnerMilestones: owners.slice(1),
      reviewRows: item.reviewRows.sort(),
      rule: 'The primary owner closes behavior. Reference owners may read the same source evidence but cannot mark it complete independently.',
    };
  })
  .sort((a, b) => a.sourceEvidenceId.localeCompare(b.sourceEvidenceId));

const ownerTransfers = queueRows
  .filter((row) => row.implementationOwnerMilestone !== row.queueOwnerMilestone)
  .map((row) => ({
    reviewId: row.reviewId,
    from: row.implementationOwnerMilestone,
    to: row.queueOwnerMilestone,
    reason: 'M27 cannot remain the implementation owner after queue closure; manifest-only foundation review transfers to final gap audit.',
  }));

const implementationQueue = {
  schemaVersion: 'implementation-queue/v1',
  generatedBy: 'tools/build_implementation_queue.mjs',
  sourceInputs: {
    preImplementationGapAudit: 'data/coverage/audits/pre-implementation-gap-audit.json',
    blockers: 'data/coverage/blockers.json',
    approvedExclusions: 'data/coverage/approved-exclusions.json',
  },
  queueContract: {
    purpose: 'Freeze M28+ implementation units from M26 review rows.',
    rowCoverageRule: 'Every M26 implementationReviewRows entry must appear in exactly one queue unit.',
    ownerRule: 'No queue unit may have M27 as implementation owner after this milestone.',
    gapIntakeProcedure: [
      'Add the newly discovered original source row to feature/definition/save/session coverage first.',
      'Add sourceEvidenceId and primary source path before implementation.',
      'Assign ownerMilestone and verificationCommand.',
      'Regenerate M26 audit and M27 queue before closing the owning implementation milestone.',
    ],
  },
  summary: {
    reviewRowsInput: auditRows.length,
    queueRows: queueRows.length,
    queueUnits: queueUnits.length,
    queueRowsByKind: countBy(queueRows, (row) => row.rowKind),
    queueRowsByOwnerMilestone: countBy(queueRows, (row) => row.queueOwnerMilestone),
    queueUnitsByOwnerMilestone: countBy(queueUnits, (row) => row.ownerMilestone),
    blockerFreezeRows: blockerFreezeRows.length,
    approvedExclusionRequestRows: approvedExclusionRequests.length,
    sharedSourceEvidenceRows: sharedSourceOwnership.length,
    ownerTransfers: ownerTransfers.length,
  },
  ownerPlan: Object.entries(ownerPlan).map(([milestone, plan]) => ({
    milestone,
    ...plan,
    queueUnitCount: queueUnits.filter((unit) => unit.ownerMilestone === milestone).length,
    queueRowCount: queueRows.filter((row) => row.queueOwnerMilestone === milestone).length,
  })),
  queueUnits,
  sharedSourceOwnership,
  ownerTransfers,
};

const blockerFreezeList = {
  schemaVersion: 'blocker-freeze-list/v1',
  generatedBy: 'tools/build_implementation_queue.mjs',
  sourceInputs: {
    blockers: 'data/coverage/blockers.json',
    implementationQueue: 'data/coverage/implementation-queue.json',
  },
  summary: {
    blockerRows: blockerFreezeRows.length,
    byFrozenOwnerMilestone: countBy(blockerFreezeRows, (row) => row.frozenOwnerMilestone),
    withoutLinkedReviewRows: blockerFreezeRows.filter((row) => row.linkedReviewRows.length === 0).length,
  },
  freezeRule:
    'A blocker remains open until the frozen owner implements linked rows or obtains explicit user-approved exclusion.',
  blockers: blockerFreezeRows,
};

const approvedExclusionRequestList = {
  schemaVersion: 'approved-exclusion-requests/v1',
  generatedBy: 'tools/build_implementation_queue.mjs',
  sourceInputs: {
    blockerFreezeList: 'data/coverage/blocker-freeze-list.json',
    approvedExclusions: 'data/coverage/approved-exclusions.json',
  },
  summary: {
    requestRows: approvedExclusionRequests.length,
    approvedRows: approvedExclusions.exclusions?.length ?? 0,
    requestedRows: approvedExclusionRequests.filter((row) => row.status !== 'not-requested').length,
  },
  requests: approvedExclusionRequests,
};

writeJson('data/coverage/implementation-queue.json', implementationQueue);
writeJson('data/coverage/blocker-freeze-list.json', blockerFreezeList);
writeJson('data/coverage/approved-exclusion-requests.json', approvedExclusionRequestList);

console.log(
  `coverage:implementation-queue wrote ${queueUnits.length} unit(s), ${queueRows.length} queued review row(s), ${blockerFreezeRows.length} frozen blocker(s), ${approvedExclusionRequests.length} approval request candidate(s).`,
);
