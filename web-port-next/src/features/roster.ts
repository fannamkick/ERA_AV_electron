import type { GameState } from '../game/state';
import type { RosterView } from '../game/views';

export function buildRosterView(state: GameState): RosterView {
  return {
    kind: 'roster',
    route: 'roster',
    entries: Object.values(state.people.characters)
      .map((character) => ({
        characterId: character.id,
        displayName: character.identity.displayName,
        templateId: character.identity.templateId,
        roleSummary: character.roles.join(', ') || 'owned',
      }))
      .sort((a, b) => a.characterId.localeCompare(b.characterId)),
  };
}
