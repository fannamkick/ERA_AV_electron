import type { CatalogId } from './types';

export const recruitListingItemIds: readonly CatalogId[] = [
  '100',
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110',
  '111',
  '112',
  '113',
  '114',
  '115',
  '116',
  '117',
  '118',
  '119',
  '120',
  '121',
  '122',
  '123',
  '124',
  '125',
  '126',
  '127',
  '128',
  '129',
  '130',
  '131',
  '132',
  '133',
  '134',
  '135',
  '136',
  '137',
  '138',
  '139',
  '140',
  '141',
  '142',
  '143',
  '144',
  '145',
  '146',
  '150',
];

export const repeatableRecruitListingItemIds = new Set<CatalogId>(['150']);

export const recruitAdvertisementTemplateId = '51';

export const recruitAdvertisementMaxCount = 5;

export function characterTemplateIdForRecruitListingItemId(itemId: CatalogId): CatalogId | undefined {
  const numericId = Number(itemId);
  if (!Number.isInteger(numericId)) return undefined;

  if (numericId >= 100 && numericId <= 146) {
    return String(numericId - 99);
  }

  if (numericId === 150) {
    return recruitAdvertisementTemplateId;
  }

  return undefined;
}

export function isRecruitListingItemId(itemId: CatalogId): boolean {
  return recruitListingItemIds.includes(itemId);
}

export function isRepeatableRecruitListingItemId(itemId: CatalogId): boolean {
  return repeatableRecruitListingItemIds.has(itemId);
}
