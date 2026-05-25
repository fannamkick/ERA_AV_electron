export interface NumericKeyDefinition {
  readonly key: string;
  readonly index: number;
  readonly original: string;
  readonly description?: string;
}

export const FLAG_KEYS = {
  weekLimit: { key: 'weekLimit', index: 3, original: 'FLAG:3', description: 'Scenario week limit' },
  targetMoney: { key: 'targetMoney', index: 4, original: 'FLAG:4', description: 'Scenario target money' },
  difficulty: { key: 'difficulty', index: 5, original: 'FLAG:5', description: 'Selected difficulty' },
  maxOwnedCharacters: { key: 'maxOwnedCharacters', index: 23, original: 'FLAG:23', description: 'Owned character cap' },
  additionalCommandsDisabled: { key: 'additionalCommandsDisabled', index: 71, original: 'FLAG:71', description: 'Legacy flag that disables derived/extra training commands' },
  firstKissConfirmBypass: { key: 'firstKissConfirmBypass', index: 82, original: 'FLAG:82', description: 'Legacy first-kiss confirmation bypass flag' },
} as const satisfies Record<string, NumericKeyDefinition>;

export const CFLAG_KEYS = {
  affection: { key: 'affection', index: 2, original: 'CFLAG:2', description: 'Legacy affection/arousal threshold flag used by training EXP checks' },
  fainted: { key: 'fainted', index: 16, original: 'CFLAG:16', description: 'Legacy faint state flag' },
  firstKissLegacy: { key: 'firstKissLegacy', index: 16, original: 'CFLAG:16', description: 'Legacy first-kiss marker in kiss/contact commands; overlaps old migrated faint alias' },
  clothing: { key: 'clothing', index: 40, original: 'CFLAG:40', description: 'Legacy clothing bit field' },
  lowerItem: { key: 'lowerItem', index: 42, original: 'CFLAG:42', description: 'Legacy lower special item id' },
  firstKiss: { key: 'firstKiss', index: 101, original: 'CFLAG:101', description: 'Simplified legacy first-kiss marker' },
  stockingType: { key: 'stockingType', index: 170, original: 'CFLAG:170', description: 'Legacy stocking type' },
  stockingState: { key: 'stockingState', index: 173, original: 'CFLAG:173', description: 'Legacy stocking state' },
  contractPrice: { key: 'contractPrice', index: 620, original: 'CFLAG:620', description: 'Recruitment or contract price' },
  menstrualStatus: { key: 'menstrualStatus', index: 644, original: 'CFLAG:644', description: 'Legacy menstrual state used by COM_ORDER' },
  firstTrainingDay: { key: 'firstTrainingDay', index: 600, original: 'CFLAG:600', description: 'First training day marker' },
  assignmentLocation: { key: 'assignmentLocation', index: 684, original: 'CFLAG:684', description: 'Current assignment location' },
} as const satisfies Record<string, NumericKeyDefinition>;

export const TFLAG_KEYS = {
  selectedCommand: { key: 'selectedCommand', index: 0, original: 'TFLAG:0', description: 'Current training command' },
  loveContactCount: { key: 'loveContactCount', index: 30, original: 'TFLAG:30', description: 'Legacy contact/love counter updated by kiss-like commands' },
  previousTrainerWasAssistant: { key: 'previousTrainerWasAssistant', index: 50, original: 'TFLAG:50', description: 'Legacy previous trainer marker: 0=master, 1=assistant' },
  previousPreviousCommand: { key: 'previousPreviousCommand', index: 59, original: 'TFLAG:59', description: 'Legacy previous-previous command marker' },
  previousCommand: { key: 'previousCommand', index: 10000, original: 'PREVCOM', description: 'Modular bridge for legacy PREVCOM command history' },
  sexualContact: { key: 'sexualContact', index: 100, original: 'TFLAG:100', description: 'Legacy sexual/contact marker for the current command' },
  trainerFirstContact: { key: 'trainerFirstContact', index: 620, original: 'TFLAG:620', description: 'Legacy trainer-side first-contact bit field' },
  targetFirstContact: { key: 'targetFirstContact', index: 621, original: 'TFLAG:621', description: 'Legacy target-side first-contact bit field' },
  fainted: { key: 'fainted', index: 899, original: 'TFLAG:899', description: 'Legacy temporary faint/passout marker' },
} as const satisfies Record<string, NumericKeyDefinition>;

export type FlagKey = keyof typeof FLAG_KEYS;
export type CFlagKey = keyof typeof CFLAG_KEYS;
export type TFlagKey = keyof typeof TFLAG_KEYS;
