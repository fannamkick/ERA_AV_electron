import * as fs from 'fs';
import * as path from 'path';
import { auditErbTrainingModel, type ErbTrainingModelAudit } from '../model/erbTrainingModel';

export interface ModelAuditOptions {
  webPortRoot: string;
  sourceRoot?: string;
  outPath?: string;
}

export function runModelAudit(options: ModelAuditOptions): ErbTrainingModelAudit {
  const audit = auditErbTrainingModel({
    webPortRoot: options.webPortRoot,
    sourceRoot: options.sourceRoot,
  });

  if (options.outPath) {
    fs.mkdirSync(path.dirname(options.outPath), { recursive: true });
    fs.writeFileSync(options.outPath, `${JSON.stringify(audit, null, 2)}\n`, 'utf-8');
  }

  return audit;
}

export function summarizeModelAudit(audit: ErbTrainingModelAudit): Record<string, unknown> {
  const flowNeedsEngine = audit.flowCoverage
    .filter((row) => row.lowering === 'needsEngineCapability')
    .map((row) => ({ construct: row.construct, count: row.count }));
  const callNeedsCatalog = audit.callCoverage.targets
    .filter((row) => row.lowering !== 'existingEngine')
    .map((row) => ({ target: row.target, count: row.count, kind: row.kind, lowering: row.lowering }));
  const domainsByResidence = audit.domainCoverage.domains.reduce<Record<string, number>>((acc, row) => {
    acc[row.residence] = (acc[row.residence] ?? 0) + row.count;
    return acc;
  }, {});
  const filesWithBlockers = Object.keys(audit.fileBlockers);

  return {
    fileCount: audit.fileCount,
    domainCoverage: {
      modeled: audit.domainCoverage.modeled,
      unmodeled: audit.domainCoverage.unmodeled,
      byResidence: domainsByResidence,
    },
    roleCoverage: audit.roleCoverage.map((row) => ({ role: row.role, count: row.count })),
    dynamicIndexRefCount: audit.dynamicIndexRefs.length,
    sessionVariables: audit.sessionVariableCoverage.map((row) => ({ variable: row.variable, count: row.count })),
    scalarLocals: audit.scalarLocalCoverage.slice(0, 30).map((row) => ({ variable: row.variable, count: row.count })),
    mutationOperators: audit.mutationOperators.map((row) => ({ operator: row.operator, count: row.count })),
    flowNeedsEngine,
    callTargetCount: audit.callCoverage.targetCount,
    unclassifiedCallTargetCount: audit.callCoverage.unclassifiedTargetCount,
    callNeedsCatalog,
    entryCoverage: audit.entryCoverage.map((row) => ({ kind: row.kind, count: row.count })),
    filesWithBlockers: filesWithBlockers.length,
    blockerKinds: filesWithBlockers.reduce<Record<string, number>>((acc, file) => {
      for (const blocker of audit.fileBlockers[file]) acc[blocker] = (acc[blocker] ?? 0) + 1;
      return acc;
    }, {}),
    verdict: audit.verdict,
  };
}
