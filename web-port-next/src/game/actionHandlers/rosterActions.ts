import {
  markCharacterDeleted,
  markCharacterRetired,
  sellCharacterForLifecycle,
  setCharacterAssistantEligible,
} from '../../features/characterLifecycle';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';

export type RosterAction = Extract<GameAction, { readonly type: `roster/${string}` }>;

export function isRosterAction(action: GameAction): action is RosterAction {
  return action.type.startsWith('roster/');
}

export function handleRosterAction(context: GameActionContext, action: RosterAction): GameActionResult {
  switch (action.type) {
    case 'roster/retireCharacter': {
      const lifecycle = markCharacterRetired(context.state, action.characterId);
      if (!lifecycle.ok) {
        return failureResult(context, lifecycle.failure);
      }

      return successResult(context, {
        state: lifecycle.state,
        effects: [logEffect(`Retired ${action.characterId}.`, 'success')],
      });
    }
    case 'roster/deleteCharacter': {
      const lifecycle = markCharacterDeleted(context.state, action.characterId);
      if (!lifecycle.ok) {
        return failureResult(context, lifecycle.failure);
      }

      return successResult(context, {
        state: lifecycle.state,
        effects: [logEffect(`Deleted ${action.characterId}.`, 'success')],
      });
    }
    case 'roster/sellCharacter': {
      const lifecycle = sellCharacterForLifecycle(context.state, action.characterId, action.timeSlot ?? 0);
      if (!lifecycle.ok) {
        return failureResult(context, lifecycle.failure);
      }

      return successResult(context, {
        state: lifecycle.state,
        effects: [logEffect(`Sold ${action.characterId} through lifecycle removal.`, 'success')],
      });
    }
    case 'roster/setAssistantEligible': {
      const lifecycle = setCharacterAssistantEligible(context.state, action.characterId, action.assistantEligible);
      if (!lifecycle.ok) {
        return failureResult(context, lifecycle.failure);
      }

      return successResult(context, {
        state: lifecycle.state,
        effects: [logEffect(`Updated assistant eligibility for ${action.characterId}.`, 'success')],
      });
    }
  }
}
