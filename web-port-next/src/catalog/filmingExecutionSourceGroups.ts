export type FilmingExecutionSourceGroup = {
  readonly sourcePath: string;
  readonly sourceFile: string;
  readonly labels: readonly string[];
};

export const filmingExecutionSourceGroups: readonly FilmingExecutionSourceGroup[] = [
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/ITEM_AV.ERB',
    sourceFile: 'ITEM_AV.ERB',
    labels: ['ITEM_AV'],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/LIFELIST_AV.ERB',
    sourceFile: 'LIFELIST_AV.ERB',
    labels: ['LIFE_LIST_AV'],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/SHOP_AV.ERB',
    sourceFile: 'SHOP_AV.ERB',
    labels: ['AV_CHOOSE', 'AV_LABO', 'AV_LIST', 'AV_RESULT', 'AV_TOP', 'CHARA_SELECT_AV'],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE01_INTERVIEW.ERB',
    sourceFile: 'SCENE01_INTERVIEW.ERB',
    labels: [
      'SCENE_CALC_1',
      'SCENE_EXP_1',
      'SCENE_FEE_1',
      'SCENE_INFO_1',
      'SCENE_RESULT_FAILED_1',
      'SCENE_RESULT_PERFECT_1',
      'SCENE_RESULT_START_1',
      'SCENE_RESULT_SUCCESS_1',
      'SCENE_TITLE_1',
      'SCENE_VISIBLE_1',
    ],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE02_MUSTERBATION.ERB',
    sourceFile: 'SCENE02_MUSTERBATION.ERB',
    labels: [
      'SCENE_CALC_2',
      'SCENE_EXP_2',
      'SCENE_FEE_2',
      'SCENE_INFO_2',
      'SCENE_RESULT_FAILED_2',
      'SCENE_RESULT_PERFECT_2',
      'SCENE_RESULT_START_2',
      'SCENE_RESULT_SUCCESS_2',
      'SCENE_TITLE_2',
      'SCENE_VISIBLE_2',
    ],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE03_FELLATIO.ERB',
    sourceFile: 'SCENE03_FELLATIO.ERB',
    labels: [
      'SCENE_CALC_3',
      'SCENE_EXP_3',
      'SCENE_FEE_3',
      'SCENE_INFO_3',
      'SCENE_RESULT_FAILED_3',
      'SCENE_RESULT_PERFECT_3',
      'SCENE_RESULT_START_3',
      'SCENE_RESULT_SUCCESS_3',
      'SCENE_TITLE_3',
      'SCENE_VISIBLE_3',
    ],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE04_AV_HARDSEX.ERB',
    sourceFile: 'SCENE04_AV_HARDSEX.ERB',
    labels: [
      'SCENE_CALC_4',
      'SCENE_EXP_4',
      'SCENE_FEE_4',
      'SCENE_INFO_4',
      'SCENE_RESULT_FAILED_4',
      'SCENE_RESULT_PERFECT_4',
      'SCENE_RESULT_START_4',
      'SCENE_RESULT_SUCCESS_4',
      'SCENE_TITLE_4',
      'SCENE_VISIBLE_4',
    ],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE05_AV_HARDANALSEX.ERB',
    sourceFile: 'SCENE05_AV_HARDANALSEX.ERB',
    labels: [
      'SCENE_CALC_5',
      'SCENE_EXP_5',
      'SCENE_FEE_5',
      'SCENE_INFO_5',
      'SCENE_RESULT_FAILED_5',
      'SCENE_RESULT_PERFECT_5',
      'SCENE_RESULT_START_5',
      'SCENE_RESULT_SUCCESS_5',
      'SCENE_TITLE_5',
      'SCENE_VISIBLE_5',
    ],
  },
  {
    sourcePath: 'original-game/ERB/ＡＶ撮影関係/撮影シーン関連/SCENE10_AV_SM.ERB',
    sourceFile: 'SCENE10_AV_SM.ERB',
    labels: [
      'SCENE_CALC_10',
      'SCENE_EXP_10',
      'SCENE_FEE_10',
      'SCENE_INFO_10',
      'SCENE_RESULT_FAILED_10',
      'SCENE_RESULT_PERFECT_10',
      'SCENE_RESULT_START_10',
      'SCENE_RESULT_SUCCESS_10',
      'SCENE_TITLE_10',
      'SCENE_VISIBLE_10',
    ],
  },
];

export const filmingExecutionSourceLabelCount = filmingExecutionSourceGroups.reduce((sum, group) => sum + group.labels.length, 0);
