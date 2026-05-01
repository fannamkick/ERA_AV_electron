import type { GameDefinitions } from '../catalog/types';
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

function profileTextLabelsFor(
  definitions: GameDefinitions | undefined,
  profileTextSlots: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.keys(profileTextSlots).map((slotId) => [slotId, definitions?.characterTextDefinitions[slotId]?.label ?? `CSTR:${slotId}`]),
  );
}

export function buildRosterView(state: GameState, definitions?: GameDefinitions): RosterView {
  return {
    kind: 'roster',
    route: 'roster',
    entries: Object.values(state.people.characters)
      .map((character) => {
        const body = state.body.byCharacterId[character.id];

        return {
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
          profileTextLabels: profileTextLabelsFor(definitions, character.identity.profileTextSlots),
          peopleBaseStatCount: Object.keys(character.attributes.baseStats.current).length,
          bodyBaseStatCount: Object.keys(body?.baseStats ?? {}).length,
          bodyResultStatCount: Object.keys(body?.bodyStats ?? {}).length,
          abilityCount: Object.keys(character.attributes.abilities).length,
          traitCount: Object.keys(character.attributes.traits).length,
          experienceCount: Object.keys(character.attributes.experiences).length,
          conditionParamCount: Object.keys(body?.conditionParams ?? {}).length,
          trainingResourceCount: Object.keys(body?.trainingResources ?? {}).length,
          imprintCount: Object.keys(body?.imprints ?? {}).length,
          retired: character.flags.lifecycle.retired,
          deleted: character.flags.lifecycle.deleted,
          assistantEligible: character.flags.lifecycle.assistantEligible,
          recruitmentStatus: character.flags.lifecycle.recruitmentStatus,
        };
      })
      .sort((a, b) => a.characterId.localeCompare(b.characterId)),
  };
}
