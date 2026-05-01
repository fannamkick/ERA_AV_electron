export type CharacterEquipmentState = {
  readonly persistentEquipmentItemIds: readonly string[];
  readonly clothing: Record<string, boolean | number | string>;
  readonly piercings: readonly string[];
  readonly restrictions: readonly string[];
  readonly availabilityFlags: Record<string, boolean | number | string>;
  readonly legacyEquipmentIndexesNeedingMapping: Record<string, boolean | number | string>;
};

export type EquipmentState = {
  readonly byCharacterId: Record<string, CharacterEquipmentState>;
};

export const initialEquipmentState: EquipmentState = {
  byCharacterId: {},
};
