export const itemShopSingleInventoryItemIds = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '23',
  '37',
] as const;

export const itemShopPluralInventoryItemIds = ['24', '25', '26', '27', '29', '34'] as const;

export const itemShopPurchaseItemIds = [...itemShopSingleInventoryItemIds, ...itemShopPluralInventoryItemIds] as const;

export const itemShopPurchaseItemIdSet = new Set<string>(itemShopPurchaseItemIds);
export const itemShopSingleInventoryItemIdSet = new Set<string>(itemShopSingleInventoryItemIds);
export const itemShopPluralInventoryItemIdSet = new Set<string>(itemShopPluralInventoryItemIds);
