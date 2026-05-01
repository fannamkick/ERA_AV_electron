export type UiRoute =
  | 'boot'
  | 'newGame'
  | 'mainMenu'
  | 'itemShop'
  | 'mission'
  | 'recruit'
  | 'visit'
  | 'work'
  | 'shooting'
  | 'roster'
  | 'wardrobe'
  | 'training'
  | 'result'
  | 'saveLoad';

export const phaseOneRoutes = {
  boot: 'boot',
  newGame: 'newGame',
  mainMenu: 'mainMenu',
  itemShop: 'itemShop',
} as const satisfies Record<string, UiRoute>;

export const phaseTwoRoutes = {
  ...phaseOneRoutes,
  mission: 'mission',
  recruit: 'recruit',
  visit: 'visit',
  saveLoad: 'saveLoad',
  work: 'work',
  shooting: 'shooting',
  roster: 'roster',
  wardrobe: 'wardrobe',
  training: 'training',
} as const satisfies Record<string, UiRoute>;

const allRoutes: readonly UiRoute[] = [
  'boot',
  'newGame',
  'mainMenu',
  'itemShop',
  'mission',
  'recruit',
  'visit',
  'work',
  'shooting',
  'roster',
  'wardrobe',
  'training',
  'result',
  'saveLoad',
];

export function isUiRoute(value: string): value is UiRoute {
  return allRoutes.includes(value as UiRoute);
}
