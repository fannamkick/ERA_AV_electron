export interface DomainRuntimeContext {
  getNumericStat(stat: string, key: string, targetId?: number): number;
  hasTag?(tag: string, targetId?: number): boolean;
  resolveTargetId?(role: string): number | undefined;
  getRelation?(fromCharacterId: number, toCharacterId: number): number;
}

export function readNumericStat(
  context: DomainRuntimeContext,
  stat: string,
  key: string,
  role?: string,
): number {
  const targetId = role ? context.resolveTargetId?.(role) : undefined;
  return context.getNumericStat(stat, key, targetId);
}

export function hasNumericStat(
  context: DomainRuntimeContext,
  stat: string,
  key: string,
  role?: string,
): boolean {
  return readNumericStat(context, stat, key, role) !== 0;
}
