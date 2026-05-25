import type { GameAction } from '../game/actions';

const mainMenuActions: Record<string, GameAction> = {
  'main/openItemShop': { type: 'main/openItemShop' },
  'main/openMission': { type: 'main/openMission' },
  'main/openRecruit': { type: 'main/openRecruit' },
  'main/openAbilityRoster': { type: 'main/openAbilityRoster' },
  'main/openActressList': { type: 'main/openActressList' },
  'main/openRoster': { type: 'main/openRoster' },
  'main/openSave': { type: 'main/openSave' },
  'main/openLoad': { type: 'main/openLoad' },
  'main/openShooting': { type: 'main/openShooting' },
  'main/openTraining': { type: 'main/openTraining' },
  'main/openWardrobe': { type: 'main/openWardrobe' },
  'main/openVisit': { type: 'main/openVisit' },
  'main/openWork': { type: 'main/openWork' },
  'turn/end': { type: 'turn/end' },
  itemShop: { type: 'main/openItemShop' },
  mission: { type: 'main/openMission' },
  recruit: { type: 'main/openRecruit' },
  roster: { type: 'main/openRoster' },
  rest: { type: 'turn/end' },
  saveLoad: { type: 'main/openSave' },
  shooting: { type: 'main/openShooting' },
  training: { type: 'main/openTraining' },
  wardrobe: { type: 'main/openWardrobe' },
  visit: { type: 'main/openVisit' },
  work: { type: 'main/openWork' },
};

export function mainMenuAction(itemId: string): GameAction | undefined {
  return mainMenuActions[itemId];
}
