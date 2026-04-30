import type { GameCatalog } from '../catalog/types';
import { isUiRoute } from '../game/routes';
import type { GameState } from '../game/state';
import type { MainMenuView, MenuItemView } from '../game/views';

function routeFromDefinition(routeId: string | undefined): MenuItemView['route'] | undefined {
  if (!routeId || !isUiRoute(routeId)) return undefined;
  return routeId;
}

function conditionDisabledReason(state: GameState, condition: string | undefined): string | undefined {
  const characterCount = Object.keys(state.people.characters).length;
  if (!condition) return undefined;
  if (condition.includes('CHARANUM > 1') && characterCount <= 1) return 'Requires at least two characters.';
  if (condition.includes('CHARANUM > 0') && characterCount === 0) return 'Requires at least one character.';
  if (condition.includes('E >= 1') && characterCount === 0) return 'Requires at least one active character.';
  return undefined;
}

function buildMainMenuItems(state: GameState, catalog: GameCatalog): readonly MenuItemView[] {
  return Object.values(catalog.mainMenuOptions)
    .sort((a, b) => Number(a.menuCode) - Number(b.menuCode))
    .map((option): MenuItemView => {
      const conditionReason = conditionDisabledReason(state, option.actionCondition);
      const disabledReason = option.disabledReason ?? conditionReason;
      return {
        id: option.menuCode,
        label: option.label,
        route: routeFromDefinition(option.routeId),
        actionId: option.actionId,
        sourceId: option.source.originalId,
        sourceEvidenceId: option.sourceEvidenceId,
        ownerMilestone: option.ownerMilestone,
        enabled: option.defaultEnabled && !conditionReason,
        disabledReason,
      };
    });
}

export function buildMainMenuView(state: GameState, catalog: GameCatalog): MainMenuView {
  return {
    kind: 'mainMenu',
    route: 'mainMenu',
    currentMoney: state.economy.account.currentMoney,
    menuItems: buildMainMenuItems(state, catalog),
  };
}
