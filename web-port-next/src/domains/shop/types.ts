export type ShopProgressState = {
  readonly unlockedListingIds: readonly string[];
  readonly hiddenListingIds: readonly string[];
  readonly facilityFlags: Record<string, boolean | number | string>;
  readonly legacyShopFlagsNeedingMapping: Record<string, boolean | number | string>;
};

export type ShopState = {
  readonly progress: ShopProgressState;
};

export type ShopSessionState = {
  readonly selectedItemId?: string;
  readonly selectedListingId?: string;
  readonly selectedUseItemId?: string;
  readonly selectedUseTargetCharacterId?: string;
  readonly visibleListingIds: readonly string[];
  readonly visibleUseItemIds: readonly string[];
  readonly quantity: number;
};

export const initialShopState: ShopState = {
  progress: {
    unlockedListingIds: [],
    hiddenListingIds: [],
    facilityFlags: {},
    legacyShopFlagsNeedingMapping: {},
  },
};

export const initialShopSessionState: ShopSessionState = {
  visibleListingIds: [],
  visibleUseItemIds: [],
  quantity: 0,
};
