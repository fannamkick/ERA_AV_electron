import type { CatalogId } from './types';

export const immediateTargetUseItemIds = ['30', '31', '40', '41', '43'] as const;
export const immediateMasterUseItemIds = ['38', '39', '42', '52'] as const;
export const immediateItemUseIds = [...immediateTargetUseItemIds, ...immediateMasterUseItemIds] as readonly CatalogId[];

export const specialTrainingItemIds = [
  '200',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
  '209',
  '210',
  '211',
  '212',
  '213',
  '214',
] as const;

export const immediateTargetUseItemIdSet = new Set<CatalogId>(immediateTargetUseItemIds);
export const immediateMasterUseItemIdSet = new Set<CatalogId>(immediateMasterUseItemIds);
export const immediateItemUseIdSet = new Set<CatalogId>(immediateItemUseIds);
export const specialTrainingItemIdSet = new Set<CatalogId>(specialTrainingItemIds);
