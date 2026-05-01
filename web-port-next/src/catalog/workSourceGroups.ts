export type WorkSourceKind = 'arbeit' | 'brothel' | 'brothel-menu' | 'event' | 'job' | 'special' | 'system';

export type WorkSourceGroup = {
  readonly sourcePath: string;
  readonly sourceFile: string;
  readonly kind: WorkSourceKind;
  readonly labels: readonly string[];
};

export const workSourceGroups: readonly WorkSourceGroup[] = [
  {
    sourcePath: 'original-game/ERB/イベント関係/EVENT_WORK_MESSAGE_SP.ERB',
    sourceFile: 'EVENT_WORK_MESSAGE_SP.ERB',
    kind: 'event',
    labels: ['WORK_MESSAGE_ORGY_01', 'WORK_MESSAGE_STRIP_01', 'WORK_MESSAGE_STRIP_02'],
  },
  {
    sourcePath: 'original-game/ERB/イベント関係/職業素質系/JOB_EXEC.ERB',
    sourceFile: 'JOB_EXEC.ERB',
    kind: 'job',
    labels: ['JOB_EXEC', 'JOB_EXEC_203', 'JOB_EXEC_402', 'JOB_EXEC_421'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/ORIGINAL.ERB',
    sourceFile: 'ORIGINAL.ERB',
    kind: 'system',
    labels: ['WORK_EXP2'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/SHOP_YUUKAKU.ERB',
    sourceFile: 'SHOP_YUUKAKU.ERB',
    kind: 'brothel-menu',
    labels: ['WORK_NORMAL', 'WORK_RECEPTION', 'WORK_SPECIAL', 'WORK_SPECIAL_SELECT'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT.ERB',
    sourceFile: 'ARBEIT.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_ADD_EXP', 'ARBEIT_CHECK_RENEW', 'ARBEIT_EXEC', 'ARBEIT_HEADER_INFO', 'ARBEIT_LIST', 'ARBEIT_RESIGN', 'ARBEIT_SIGNUP'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_01_KANON.ERB',
    sourceFile: 'ARBEIT_01_KANON.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_1', 'ARBEIT_INFO_1', 'ARBEIT_PERMISSION_1', 'ARBEIT_TITLE_1'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_02_SAORI.ERB',
    sourceFile: 'ARBEIT_02_SAORI.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_2', 'ARBEIT_INFO_2', 'ARBEIT_PERMISSION_2', 'ARBEIT_TITLE_2'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_03_YUKAKO.ERB',
    sourceFile: 'ARBEIT_03_YUKAKO.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_3', 'ARBEIT_INFO_3', 'ARBEIT_PERMISSION_3', 'ARBEIT_TITLE_3'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_04_HARUNO.ERB',
    sourceFile: 'ARBEIT_04_HARUNO.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_4', 'ARBEIT_INFO_4', 'ARBEIT_PERMISSION_4', 'ARBEIT_TITLE_4'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_05_ELENA.ERB',
    sourceFile: 'ARBEIT_05_ELENA.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_5', 'ARBEIT_INFO_5', 'ARBEIT_PERMISSION_5', 'ARBEIT_TITLE_5'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_06_AYESHA.ERB',
    sourceFile: 'ARBEIT_06_AYESHA.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_6', 'ARBEIT_INFO_6', 'ARBEIT_PERMISSION_6', 'ARBEIT_TITLE_6'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_07_OTOHA.ERB',
    sourceFile: 'ARBEIT_07_OTOHA.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_7', 'ARBEIT_INFO_7', 'ARBEIT_PERMISSION_7', 'ARBEIT_TITLE_7'],
  },
  {
    sourcePath: 'original-game/ERB/システム関係/アルバイト関係/ARBEIT_08_MARI.ERB',
    sourceFile: 'ARBEIT_08_MARI.ERB',
    kind: 'arbeit',
    labels: ['ARBEIT_EXEC_8', 'ARBEIT_INFO_8', 'ARBEIT_PERMISSION_8', 'ARBEIT_TITLE_8'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_RECEPTION.ERB',
    sourceFile: 'WORK_RECEPTION.ERB',
    kind: 'brothel',
    labels: ['RECEPTION_MAIN', 'RECEPTION_MAIN2', 'RECEPTION_TALKING', 'RECEPTION_TEMPTATION', 'RECEPTION_VAGINASEX', 'RESEPTION_SERVICE'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_RESULT.ERB',
    sourceFile: 'WORK_RESULT.ERB',
    kind: 'brothel',
    labels: ['WORKING_MAIN'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_CONCERT.ERB',
    sourceFile: 'WORK_S_CONCERT.ERB',
    kind: 'special',
    labels: ['CONCERT'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_KBPLAY.ERB',
    sourceFile: 'WORK_S_KBPLAY.ERB',
    kind: 'special',
    labels: ['KB_PLAY'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_LUNCHSTALL.ERB',
    sourceFile: 'WORK_S_LUNCHSTALL.ERB',
    kind: 'special',
    labels: ['LUNCH_NAME', 'LUNCH_NAME_PAWAPOKE', 'LUNCH_STALL'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_SEXORGY.ERB',
    sourceFile: 'WORK_S_SEXORGY.ERB',
    kind: 'special',
    labels: ['FELLATIO_CONTEST', 'HUMAN_RACING', 'ONANY_CONTEST', 'SEX_ORGY'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_STRIP.ERB',
    sourceFile: 'WORK_S_STRIP.ERB',
    kind: 'special',
    labels: ['STRIPTEASE'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_SUB.ERB',
    sourceFile: 'WORK_S_SUB.ERB',
    kind: 'special',
    labels: ['WORK_SP_SEX_02', 'WORK_SUB_PRINT_FULLNAME', 'WORK_SUB_PRINT_MEMBER'],
  },
  {
    sourcePath: 'original-game/ERB/娼館関係/WORK_S_VAUCTION.ERB',
    sourceFile: 'WORK_S_VAUCTION.ERB',
    kind: 'special',
    labels: ['V_AUCTION'],
  },
];

export function slugWorkSourcePart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');
}

export function workSourceDefinitionId(sourceFile: string, sourceLabel: string): string {
  return `work:${slugWorkSourcePart(sourceFile.replace(/\.ERB$/u, ''))}.${slugWorkSourcePart(sourceLabel)}`;
}

export const workSourceLabelCount = workSourceGroups.reduce((sum, group) => sum + group.labels.length, 0);
