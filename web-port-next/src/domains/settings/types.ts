export type SettingsState = {
  readonly system: Record<string, boolean | number | string>;
  readonly characterDefaults: Record<string, boolean | number | string>;
  readonly debug: Record<string, boolean | number | string>;
  readonly testMode: boolean;
  readonly legacySettingsFlagsNeedingMapping: Record<string, boolean | number | string>;
};

export const initialSettingsState: SettingsState = {
  system: {},
  characterDefaults: {},
  debug: {},
  testMode: false,
  legacySettingsFlagsNeedingMapping: {},
};
