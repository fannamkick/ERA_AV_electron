import type { GameState } from '../game/state';
import type { RosterView } from '../game/views';

function lifecycleSummary(character: GameState['people']['characters'][string]): string {
  const lifecycle = character.flags.lifecycle;
  const parts = [
    lifecycle.deleted ? 'deleted' : undefined,
    lifecycle.retired ? 'retired' : undefined,
    lifecycle.sellable ? 'sellable' : undefined,
    lifecycle.assistantEligible ? 'assistant eligible' : undefined,
    lifecycle.recruitmentStatus,
  ].filter((part): part is string => Boolean(part));

  return parts.join(', ') || 'active';
}

export function buildRosterView(state: GameState): RosterView {
  return {
    kind: 'roster',
    route: 'roster',
    entries: Object.values(state.people.characters)
      .map((character) => ({
        characterId: character.id,
        displayName: character.identity.displayName,
        callName: character.identity.callName,
        nickname: character.identity.nickname,
        firstPerson: character.identity.firstPerson,
        templateId: character.identity.templateId,
        roleSummary: character.roles.join(', ') || 'owned',
        lifecycleSummary: lifecycleSummary(character),
        profileTextSlotCount: Object.keys(character.identity.profileTextSlots).length,
        profileTextSlots: { ...character.identity.profileTextSlots },
        retired: character.flags.lifecycle.retired,
        deleted: character.flags.lifecycle.deleted,
        assistantEligible: character.flags.lifecycle.assistantEligible,
        recruitmentStatus: character.flags.lifecycle.recruitmentStatus,
      }))
      .sort((a, b) => a.characterId.localeCompare(b.characterId)),
  };
}
