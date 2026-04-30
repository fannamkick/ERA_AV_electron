export type InventoryState = {
  readonly itemCounts: Record<string, number>;
  readonly itemRestrictions: Record<string, boolean | number | string>;
  readonly legacyItemRestrictionIndexesNeedingMapping: Record<string, boolean | number | string>;
};

export const initialInventoryState: InventoryState = {
  itemCounts: {},
  itemRestrictions: {},
  legacyItemRestrictionIndexesNeedingMapping: {},
};
