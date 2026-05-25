export interface StatKeyDefinition {
  readonly key: string;
  readonly index: number;
  readonly original: string;
  readonly description?: string;
}

export const PALAM_KEYS = {
  pleasureC: { key: 'pleasureC', index: 0, original: 'PALAM:0' },
  pleasureB: { key: 'pleasureB', index: 1, original: 'PALAM:1' },
  pleasureV: { key: 'pleasureV', index: 2, original: 'PALAM:2' },
  arousal: { key: 'arousal', index: 3, original: 'PALAM:3' },
  submission: { key: 'submission', index: 4, original: 'PALAM:4' },
  lust: { key: 'lust', index: 5, original: 'PALAM:5' },
  obedience: { key: 'obedience', index: 6, original: 'PALAM:6' },
  pain: { key: 'pain', index: 9, original: 'PALAM:9' },
  fear: { key: 'fear', index: 10, original: 'PALAM:10' },
  disgust: { key: 'disgust', index: 11, original: 'PALAM:11' },
  depression: { key: 'depression', index: 13, original: 'PALAM:13' },
} as const satisfies Record<string, StatKeyDefinition>;

export const SOURCE_KEYS = {
  pleasureC: { key: 'pleasureC', index: 0, original: 'SOURCE:0' },
  pleasureV: { key: 'pleasureV', index: 1, original: 'SOURCE:1' },
  pleasureA: { key: 'pleasureA', index: 2, original: 'SOURCE:2' },
  arousal: { key: 'arousal', index: 3, original: 'SOURCE:3' },
  submission: { key: 'submission', index: 4, original: 'SOURCE:4' },
  lust: { key: 'lust', index: 5, original: 'SOURCE:5' },
  obedience: { key: 'obedience', index: 6, original: 'SOURCE:6' },
  love: { key: 'love', index: 7, original: 'SOURCE:7' },
  comfort: { key: 'comfort', index: 8, original: 'SOURCE:8' },
  pain: { key: 'pain', index: 9, original: 'SOURCE:9' },
  fear: { key: 'fear', index: 10, original: 'SOURCE:10' },
  shame: { key: 'shame', index: 11, original: 'SOURCE:11', description: 'Legacy shame-like source buffer; current SourceCheck mapping does not convert it to PALAM.' },
  semen: { key: 'semen', index: 12, original: 'SOURCE:12' },
  depression: { key: 'depression', index: 13, original: 'SOURCE:13' },
  aversion: { key: 'aversion', index: 14, original: 'SOURCE:14', description: 'Legacy antipathy/aversion source buffer; current SourceCheck mapping does not convert it to PALAM.' },
  habit: { key: 'habit', index: 16, original: 'SOURCE:16' },
  pleasureB: { key: 'pleasureB', index: 17, original: 'SOURCE:17' },
} as const satisfies Record<string, StatKeyDefinition>;

export const TALENT_KEYS = {
  rebellious: { key: 'rebellious', index: 11, original: 'TALENT:11' },
  tough: { key: 'tough', index: 12, original: 'TALENT:12' },
  honest: { key: 'honest', index: 13, original: 'TALENT:13' },
  prideHigh: { key: 'prideHigh', index: 15, original: 'TALENT:15' },
  prideLow: { key: 'prideLow', index: 17, original: 'TALENT:17' },
  curiosity: { key: 'curiosity', index: 23, original: 'TALENT:23' },
  conservative: { key: 'conservative', index: 24, original: 'TALENT:24' },
  showOff: { key: 'showOff', index: 28, original: 'TALENT:28' },
  suppressed: { key: 'suppressed', index: 32, original: 'TALENT:32' },
  resisting: { key: 'resisting', index: 34, original: 'TALENT:34' },
  shy: { key: 'shy', index: 35, original: 'TALENT:35' },
  weakPoint: { key: 'weakPoint', index: 37, original: 'TALENT:37' },
  kissLover: { key: 'kissLover', index: 79, original: 'TALENT:79' },
  bisexual: { key: 'bisexual', index: 81, original: 'TALENT:81' },
  sadistLegacy: { key: 'sadistLegacy', index: 83, original: 'TALENT:83' },
  sensitivityLow: { key: 'sensitivityLow', index: 61, original: 'TALENT:61' },
  sensitivityHigh: { key: 'sensitivityHigh', index: 62, original: 'TALENT:62' },
  devoted: { key: 'devoted', index: 63, original: 'TALENT:63' },
  filthIgnore: { key: 'filthIgnore', index: 64, original: 'TALENT:64', description: 'Legacy filth-ignore talent used by assistant dirty-part checks' },
  tongueSkill: { key: 'tongueSkill', index: 52, original: 'TALENT:52' },
  pleasureDeny: { key: 'pleasureDeny', index: 71, original: 'TALENT:71' },
  instantFall: { key: 'instantFall', index: 73, original: 'TALENT:73' },
  lewd: { key: 'lewd', index: 76, original: 'TALENT:76' },
  love: { key: 'love', index: 85, original: 'TALENT:85' },
  sadist: { key: 'sadist', index: 86, original: 'TALENT:86' },
  compatibilityGood: { key: 'compatibilityGood', index: 87, original: 'TALENT:87' },
  charm: { key: 'charm', index: 91, original: 'TALENT:91' },
  mysteriousCharm: { key: 'mysteriousCharm', index: 92, original: 'TALENT:92' },
  intimidating: { key: 'intimidating', index: 93, original: 'TALENT:93' },
  rubber: { key: 'rubber', index: 118, original: 'TALENT:118' },
  virgin: { key: 'virgin', index: 0, original: 'TALENT:0' },
  analVirgin: { key: 'analVirgin', index: 2, original: 'TALENT:2' },
  futanari: { key: 'futanari', index: 121, original: 'TALENT:121' },
  male: { key: 'male', index: 122, original: 'TALENT:122' },
  inexperienced: { key: 'inexperienced', index: 135, original: 'TALENT:135' },
  bestialityTolerant: { key: 'bestialityTolerant', index: 136, original: 'TALENT:136' },
  noMouthService: { key: 'noMouthService', index: 151, original: 'TALENT:151' },
  pregnant: { key: 'pregnant', index: 153, original: 'TALENT:153' },
  teacher: { key: 'teacher', index: 201, original: 'TALENT:201' },
  specialAppeal: { key: 'specialAppeal', index: 505, original: 'TALENT:505' },
} as const satisfies Record<string, StatKeyDefinition>;

export const ABILITY_KEYS = {
  sensitivityC: { key: 'sensitivityC', index: 0, original: 'ABL:0' },
  sensitivityB: { key: 'sensitivityB', index: 1, original: 'ABL:1' },
  sensitivityV: { key: 'sensitivityV', index: 2, original: 'ABL:2' },
  obedience: { key: 'obedience', index: 10, original: 'ABL:10' },
  desire: { key: 'desire', index: 11, original: 'ABL:11' },
  technique: { key: 'technique', index: 12, original: 'ABL:12' },
  service: { key: 'service', index: 13, original: 'ABL:13' },
  mouthService: { key: 'mouthService', index: 16, original: 'ABL:16' },
  lesbian: { key: 'lesbian', index: 22, original: 'ABL:22' },
  lesbianAddiction: { key: 'lesbianAddiction', index: 33, original: 'ABL:33' },
  bestiality: { key: 'bestiality', index: 39, original: 'ABL:39' },
  sex: { key: 'sex', index: 14, original: 'ABL:14' },
  speech: { key: 'speech', index: 15, original: 'ABL:15' },
  masochism: { key: 'masochism', index: 21, original: 'ABL:21' },
} as const satisfies Record<string, StatKeyDefinition>;

export const EXP_KEYS = {
  vaginalSex: { key: 'vaginalSex', index: 0, original: 'EXP:0' },
  caress: { key: 'caress', index: 14, original: 'EXP:14' },
  highSensitivity: { key: 'highSensitivity', index: 23, original: 'EXP:23' },
  affectionExperience: { key: 'affectionExperience', index: 23, original: 'EXP:23', description: 'Legacy affection experience used by contact commands' },
  nonVirginPair: { key: 'nonVirginPair', index: 40, original: 'EXP:40' },
  lesbianExperience: { key: 'lesbianExperience', index: 40, original: 'EXP:40', description: 'Legacy female-female contact experience' },
  virginPair: { key: 'virginPair', index: 41, original: 'EXP:41' },
  gayExperience: { key: 'gayExperience', index: 41, original: 'EXP:41', description: 'Legacy male-male contact experience' },
  kiss: { key: 'kiss', index: 47, original: 'EXP:47' },
  cunnilingus: { key: 'cunnilingus', index: 51, original: 'EXP:51' },
} as const satisfies Record<string, StatKeyDefinition>;

export const BASE_KEYS = {
  health: { key: 'health', index: 0, original: 'BASE:0' },
  stamina: { key: 'stamina', index: 1, original: 'BASE:1' },
  ejaculationGauge: { key: 'ejaculationGauge', index: 2, original: 'BASE:2' },
} as const satisfies Record<string, StatKeyDefinition>;

export const LOSEBASE_KEYS = {
  health: { key: 'health', index: 0, original: 'LOSEBASE:0' },
  stamina: { key: 'stamina', index: 1, original: 'LOSEBASE:1' },
} as const satisfies Record<string, StatKeyDefinition>;

export const UP_KEYS = {
  arousal: { key: 'arousal', index: 3, original: 'UP:3' },
  fear: { key: 'fear', index: 10, original: 'UP:10' },
} as const satisfies Record<string, StatKeyDefinition>;

export const MARK_KEYS = {
  pain: { key: 'pain', index: 0, original: 'MARK:0' },
  pleasure: { key: 'pleasure', index: 1, original: 'MARK:1' },
  submission: { key: 'submission', index: 2, original: 'MARK:2' },
  resistance: { key: 'resistance', index: 3, original: 'MARK:3' },
} as const satisfies Record<string, StatKeyDefinition>;

export const EQUIPMENT_KEYS = {
  vibrator: { key: 'vibrator', index: 11, original: 'TEQUIP:11' },
  analVibrator: { key: 'analVibrator', index: 13, original: 'TEQUIP:13' },
  clitCap: { key: 'clitCap', index: 14, original: 'TEQUIP:14' },
  nippleCap: { key: 'nippleCap', index: 15, original: 'TEQUIP:15' },
  milker: { key: 'milker', index: 16, original: 'TEQUIP:16' },
  onahole: { key: 'onahole', index: 17, original: 'TEQUIP:17' },
  rope: { key: 'rope', index: 44, original: 'TEQUIP:44' },
  gag: { key: 'gag', index: 45, original: 'TEQUIP:45' },
  enemaPlug: { key: 'enemaPlug', index: 46, original: 'TEQUIP:46' },
  mask: { key: 'mask', index: 55, original: 'TEQUIP:55' },
  bathPlay: { key: 'bathPlay', index: 58, original: 'TEQUIP:58' },
  singleWoodenHorse: { key: 'singleWoodenHorse', index: 70, original: 'TEQUIP:70' },
  bestialityPlay: { key: 'bestialityPlay', index: 89, original: 'TEQUIP:89' },
  tentacleTraining: { key: 'tentacleTraining', index: 90, original: 'TEQUIP:90' },
  tentacleMouth: { key: 'tentacleMouth', index: 98, original: 'TEQUIP:98' },
  slime: { key: 'slime', index: 150, original: 'TEQUIP:150' },
  slimeVaginalEntry: { key: 'slimeVaginalEntry', index: 151, original: 'TEQUIP:151' },
  slimeAnalEntry: { key: 'slimeAnalEntry', index: 152, original: 'TEQUIP:152' },
  slimeMouth: { key: 'slimeMouth', index: 154, original: 'TEQUIP:154' },
} as const satisfies Record<string, StatKeyDefinition>;

export const ITEM_KEYS = {
  penisBand: { key: 'penisBand', index: 4, original: 'ITEM:4' },
  playMat: { key: 'playMat', index: 13, original: 'ITEM:13' },
} as const satisfies Record<string, StatKeyDefinition>;

export const STAIN_PART_KEYS = {
  mouth: { key: 'mouth', index: 0, original: 'STAIN:0' },
  hand: { key: 'hand', index: 1, original: 'STAIN:1' },
  penis: { key: 'penis', index: 2, original: 'STAIN:2' },
  vagina: { key: 'vagina', index: 3, original: 'STAIN:3' },
  anus: { key: 'anus', index: 4, original: 'STAIN:4' },
  breast: { key: 'breast', index: 5, original: 'STAIN:5' },
} as const satisfies Record<string, StatKeyDefinition>;

export const STAIN_BITS = {
  vaginalFluid: 1,
  penis: 2,
  semen: 4,
  anal: 8,
  breastMilk: 16,
  urine: 32,
} as const;

export const JUEL_KEYS = {
  pleasureC: { key: 'pleasureC', index: 0, original: 'JUEL:0' },
  pleasureB: { key: 'pleasureB', index: 1, original: 'JUEL:1' },
  pleasureV: { key: 'pleasureV', index: 2, original: 'JUEL:2' },
  arousal: { key: 'arousal', index: 3, original: 'JUEL:3' },
  submission: { key: 'submission', index: 4, original: 'JUEL:4' },
  obedience: { key: 'obedience', index: 6, original: 'JUEL:6' },
  pain: { key: 'pain', index: 9, original: 'JUEL:9' },
  fear: { key: 'fear', index: 10, original: 'JUEL:10' },
} as const satisfies Record<string, StatKeyDefinition>;

export type PalamKey = keyof typeof PALAM_KEYS;
export type SourceKey = keyof typeof SOURCE_KEYS;
export type TalentKey = keyof typeof TALENT_KEYS;
export type AbilityKey = keyof typeof ABILITY_KEYS;
export type ExpKey = keyof typeof EXP_KEYS;
export type JuelKey = keyof typeof JUEL_KEYS;
export type BaseKey = keyof typeof BASE_KEYS;
export type LoseBaseKey = keyof typeof LOSEBASE_KEYS;
export type UpKey = keyof typeof UP_KEYS;
export type MarkKey = keyof typeof MARK_KEYS;
export type EquipmentKey = keyof typeof EQUIPMENT_KEYS;
export type StainPartKey = keyof typeof STAIN_PART_KEYS;
export type ItemKey = keyof typeof ITEM_KEYS;
