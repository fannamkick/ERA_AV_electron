import {
  cancelTraining,
  cancelTrainingSelection,
  executeSelectedTraining,
  selectTrainingAssistant,
  selectTrainingCommand,
  selectTrainingExecutor,
  selectTrainingTarget,
} from '../../features/training';
import { endTurn } from '../../features/turnEnd';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';
import { phaseOneRoutes } from '../routes';

export type TrainingAction = Extract<GameAction, { readonly type: `training/${string}` }>;

export function isTrainingAction(action: GameAction): action is TrainingAction {
  return action.type.startsWith('training/');
}

export function handleTrainingAction(context: GameActionContext, action: TrainingAction): GameActionResult {
  switch (action.type) {
    case 'training/selectTarget': {
      const selection = selectTrainingTarget(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/selectExecutor': {
      const selection = selectTrainingExecutor(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/selectAssistant': {
      const selection = selectTrainingAssistant(context.state, context.session, action.characterId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/selectCommand': {
      const selection = selectTrainingCommand(context.catalog, context.state, context.session, action.commandId);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'training/execute': {
      const training = executeSelectedTraining(context.catalog, context.state, context.session);
      if (!training.ok) {
        return failureResult(context, training.failure);
      }

      return successResult(context, {
        state: training.state,
        session: training.session,
        route: training.session.ui.route,
        effects: training.effects ?? [logEffect(training.message, 'success')],
      });
    }
    case 'training/cancelSelection':
      return successResult(context, {
        session: cancelTrainingSelection(context.session),
        effects: [logEffect('Training selections and calculation buffers cleared.')],
      });
    case 'training/cancel': {
      const didSpendTime = context.session.interaction.commandFlow.timeSpent === true;
      if (didSpendTime) {
        const sessionCleared = cancelTraining(context.session);
        const turn = endTurn(context.state, sessionCleared);
        return successResult(context, {
          state: turn.state,
          session: {
            ...turn.session,
            ui: { ...turn.session.ui, route: 'mainMenu' },
          },
          route: phaseOneRoutes.mainMenu,
          effects: [logEffect('Leaving the training room and ending the turn.', 'success'), ...turn.effects],
        });
      }

      return successResult(context, {
        route: phaseOneRoutes.mainMenu,
        session: cancelTraining(context.session),
        effects: [logEffect('Leaving the training screen.')],
      });
    }
  }
}
