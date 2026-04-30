export type TextState = {
  readonly displayRules: Record<string, string>;
  readonly particleRules: Record<string, string>;
  readonly addressRules: Record<string, string>;
  readonly characterTextEntries: Record<string, Record<string, string>>;
  readonly generatedNames: Record<string, string>;
  readonly persistentJournal: readonly string[];
  readonly legacyTextIndexesNeedingMapping: Record<string, string>;
};

export const initialTextState: TextState = {
  displayRules: {},
  particleRules: {},
  addressRules: {},
  characterTextEntries: {},
  generatedNames: {},
  persistentJournal: [],
  legacyTextIndexesNeedingMapping: {},
};
