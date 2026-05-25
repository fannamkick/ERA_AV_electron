import type { GameCatalog } from '../catalog/types';
import { isUiRoute } from '../game/routes';
import type { GameState } from '../game/state';
import type { MainMenuStatusView, MainMenuView, MenuItemView } from '../game/views';

const staminaBaseStatId = '0';
const secretKnowledgeTalentId = '325';

const seasonLabels = ['spring', 'summer', 'autumn', 'winter'] as const;

const guardedMainActionMenuCodes: Partial<Record<string, string>> = {
  'main/openAbilityRoster': '111',
  'main/openTraining': '100',
  'main/openWork': '103',
  'main/openWardrobe': '108',
  'main/openMission': '120',
};

function routeFromDefinition(routeId: string | undefined): MenuItemView['route'] | undefined {
  if (!routeId || !isUiRoute(routeId)) return undefined;
  return routeId;
}

function numericFlag(value: unknown): number {
  if (value === true) return 1;
  if (value === false || value === undefined || value === null) return 0;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function legacyFlagValue(state: GameState, id: string): number {
  const keys = [`flag_${id}`, `FLAG:${id}`, id];
  const stores: readonly Record<string, unknown>[] = [
    state.run.runFlags,
    state.run.progressFlags,
    state.world.eventFlags,
    state.world.storyFlags,
    state.world.legacyWorldFlagsNeedingMapping,
    state.mission.missionFlags,
    state.featureState.eventProgress,
    state.featureState.legacyFeatureFlagsNeedingMapping,
    state.economy.transactionFlags,
    state.shop.progress.facilityFlags,
    state.shop.progress.legacyShopFlagsNeedingMapping,
  ];

  for (const store of stores) {
    for (const key of keys) {
      const value = store[key];
      if (value !== undefined) return numericFlag(value);
    }
  }

  if (id === '4') return numericFlag(state.run.runFlags.targetMoney);
  if (id === '3') return numericFlag(state.run.runFlags.weekLimit);
  if (id === '37') return state.world.unlocks.wardrobe || state.featureState.unlocks.wardrobe ? 1 : 0;
  if (id === '570') return state.world.unlocks.mission || state.featureState.unlocks.mission ? 1 : 0;

  return 0;
}

function isMasterCharacter(character: GameState['people']['characters'][string]): boolean {
  return character.id === '0' || character.id === 'character:0' || character.identity.templateId === '0';
}

function characterIsAlive(character: GameState['people']['characters'][string]): boolean {
  return (character.attributes.baseStats.current[staminaBaseStatId] ?? 0) >= 1;
}

function trainableCharacterCount(state: GameState): number {
  return Object.values(state.people.characters).filter(
    (character) => !isMasterCharacter(character) && characterIsAlive(character),
  ).length;
}

function assistantCounts(state: GameState): {
  readonly assistantCount: number;
  readonly currentAndFormerAssistantCount: number;
} {
  let assistantCount = 0;
  let currentAndFormerAssistantCount = 0;

  for (const character of Object.values(state.people.characters)) {
    if (character.roles.includes('assistant')) assistantCount += 1;
    if (character.roles.includes('assistant') || character.roles.includes('previousAssistant')) {
      currentAndFormerAssistantCount += 1;
    }
  }

  return { assistantCount, currentAndFormerAssistantCount };
}

function hasSecretKnowledge(state: GameState): boolean {
  for (const character of Object.values(state.people.characters)) {
    const isMasterOrAssistant = isMasterCharacter(character) || character.roles.includes('assistant');
    if (isMasterOrAssistant && character.attributes.traits[secretKnowledgeTalentId] === true) return true;
  }

  return false;
}

function conditionDisabledReason(state: GameState, condition: string | undefined, menuCode?: string): string | undefined {
  const characterCount = Object.keys(state.people.characters).length;
  const trainableCount = trainableCharacterCount(state);
  const timeSlot = state.run.clock.currentTimeSlot;
  const targetMoney = legacyFlagValue(state, '4');
  const endingFlag = legacyFlagValue(state, '5');

  if (menuCode === '150' && (endingFlag === 9 || state.economy.account.currentMoney < targetMoney)) {
    return 'Requires ending to be available and current money to meet the target.';
  }

  if (!condition) return undefined;
  if (condition.includes('CHARANUM > 1') && characterCount <= 1) return 'Requires at least two characters.';
  if (condition.includes('CHARANUM > 0') && characterCount === 0) return 'Requires at least one character.';
  if (condition.includes('E >= 1') && trainableCount < 1) return 'Requires at least one trainable non-master character.';
  if (condition.includes('FLAG:37') && legacyFlagValue(state, '37') === 0) return 'Requires stylist access flag 37.';
  if (condition.includes('FLAG:570') && legacyFlagValue(state, '570') !== 1) return 'Requires mission access flag 570.';
  if (condition.includes('FLAG:100') && legacyFlagValue(state, '100') === 0) return 'Requires dormitory access flag 100.';
  if (condition.includes('TIME == 0') && timeSlot !== 0) return 'Requires the first half of the turn.';
  return undefined;
}

function buildMainMenuItems(state: GameState, catalog: GameCatalog): readonly MenuItemView[] {
  return Object.values(catalog.mainMenuOptions)
    .sort((a, b) => Number(a.menuCode) - Number(b.menuCode))
    .map((option): MenuItemView => {
      const conditionReason = conditionDisabledReason(state, option.actionCondition, option.menuCode);
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

function seasonIndexFromMonth(month: number): number {
  if (month >= 3 && month <= 5) return 0;
  if (month >= 6 && month <= 8) return 1;
  if (month >= 9 && month <= 11) return 2;
  return 3;
}

function buildItemSummary(state: GameState): readonly string[] {
  return Object.entries(state.inventory.itemCounts)
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([itemId, count]) => `item:${itemId} x${count}`);
}

function buildOtherSummary(state: GameState): readonly string[] {
  const unlockCount = Object.values(state.world.unlocks).filter(Boolean).length;
  const scheduledEventCount = state.run.scheduledEvents.length;
  const acceptedMissionCount = Object.values(state.mission.byMissionId).filter((mission) => mission.status === 'accepted').length;
  return [
    `characters:${Object.keys(state.people.characters).length}`,
    `unlocks:${unlockCount}`,
    `scheduled-events:${scheduledEventCount}`,
    `accepted-missions:${acceptedMissionCount}`,
  ];
}

function buildTrainerLabel(state: GameState): string | undefined {
  const trainerFlag = legacyFlagValue(state, '201');
  if (trainerFlag > 100) return state.people.characters['0']?.identity.displayName ?? 'MASTER';
  if (trainerFlag >= 1 && trainerFlag <= 20) return `special-master:${trainerFlag}`;
  return undefined;
}

function buildMainMenuStatus(state: GameState): MainMenuStatusView {
  const clock = state.run.clock;
  const weekLimit = legacyFlagValue(state, '3');
  const targetMoney = legacyFlagValue(state, '4');
  const currentMoney = state.economy.account.currentMoney;
  const seasonIndex = seasonIndexFromMonth(clock.month);
  const counts = assistantCounts(state);

  return {
    seasonIndex,
    legacyDay4SeasonIndex: seasonIndex,
    seasonLabel: seasonLabels[seasonIndex],
    dateLabel: clock.month !== 0 && clock.week !== 0 ? `${clock.month} month ${clock.week} week` : '? month ? week',
    yearLabel: `${clock.year} year`,
    timeSlotLabel: clock.currentTimeSlot === 0 ? 'first half' : 'second half',
    startedWeek: clock.day + 1,
    remainingWeeks: weekLimit > 0 ? weekLimit - clock.day - 1 : undefined,
    trainerLabel: buildTrainerLabel(state),
    targetMoney: targetMoney > 0 ? targetMoney : undefined,
    goalProgress:
      targetMoney > 0
        ? {
            current: currentMoney,
            target: targetMoney,
            cappedCurrent: Math.min(currentMoney, targetMoney),
          }
        : undefined,
    itemSummary: buildItemSummary(state),
    otherSummary: buildOtherSummary(state),
    trainableCharacterCount: trainableCharacterCount(state),
    assistantCount: counts.assistantCount,
    currentAndFormerAssistantCount: counts.currentAndFormerAssistantCount,
    hasSecretKnowledge: hasSecretKnowledge(state),
  };
}

export function buildMainMenuView(state: GameState, catalog: GameCatalog): MainMenuView {
  return {
    kind: 'mainMenu',
    route: 'mainMenu',
    currentMoney: state.economy.account.currentMoney,
    status: buildMainMenuStatus(state),
    menuItems: buildMainMenuItems(state, catalog),
  };
}

export function mainMenuActionDisabledReason(state: GameState, catalog: GameCatalog, actionType: string): string | undefined {
  const menuCode = guardedMainActionMenuCodes[actionType];
  if (!menuCode) return undefined;
  const option = catalog.mainMenuOptions[menuCode];
  if (!option) return `Main menu option ${menuCode} is missing.`;
  return conditionDisabledReason(state, option.actionCondition, option.menuCode);
}

export function markMainMenuRestBeforeTurnEnd(state: GameState): GameState {
  return {
    ...state,
    run: {
      ...state.run,
      progressFlags: {
        ...state.run.progressFlags,
        flag_0: 1,
      },
    },
  };
}

export function syncMainMenuRuntimeState(state: GameState): GameState {
  const seasonIndex = seasonIndexFromMonth(state.run.clock.month);
  if (state.run.progressFlags.day_4 === seasonIndex) return state;

  return {
    ...state,
    run: {
      ...state.run,
      progressFlags: {
        ...state.run.progressFlags,
        day_4: seasonIndex,
      },
    },
  };
}
