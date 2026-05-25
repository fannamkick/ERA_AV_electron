import { changeRecruitPage, recruitSelectedCharacter, rerollRecruitInterview, selectRecruitListing } from '../../features/recruit';
import type { GameAction } from '../actions';
import { logEffect } from '../effects';
import { cancelRecruit } from '../navigation';
import { failureResult, successResult, type GameActionContext, type GameActionResult } from '../results';

export type RecruitAction = Extract<GameAction, { readonly type: `recruit/${string}` }>;

export function isRecruitAction(action: GameAction): action is RecruitAction {
  return action.type.startsWith('recruit/');
}

export function handleRecruitAction(context: GameActionContext, action: RecruitAction): GameActionResult {
  switch (action.type) {
    case 'recruit/selectListing': {
      const selection = selectRecruitListing(context.catalog, context.state, context.session, action.listingId, action.interviewGender);
      if (!selection.ok) {
        return failureResult(context, selection.failure);
      }

      return successResult(context, {
        state: selection.state,
        session: selection.session,
        effects: [logEffect(selection.message)],
      });
    }
    case 'recruit/previousPage': {
      const page = changeRecruitPage(context.catalog, context.state, context.session, 'previous');
      if (!page.ok) {
        return failureResult(context, page.failure);
      }

      return successResult(context, {
        state: page.state,
        session: page.session,
        effects: [logEffect(page.message)],
      });
    }
    case 'recruit/nextPage': {
      const page = changeRecruitPage(context.catalog, context.state, context.session, 'next');
      if (!page.ok) {
        return failureResult(context, page.failure);
      }

      return successResult(context, {
        state: page.state,
        session: page.session,
        effects: [logEffect(page.message)],
      });
    }
    case 'recruit/rerollInterview': {
      const reroll = rerollRecruitInterview(context.catalog, context.state, context.session);
      if (!reroll.ok) {
        return failureResult(context, reroll.failure);
      }

      return successResult(context, {
        state: reroll.state,
        session: reroll.session,
        effects: [logEffect(reroll.message)],
      });
    }
    case 'recruit/confirm': {
      const recruit = recruitSelectedCharacter(context.catalog, context.state, context.session);
      if (!recruit.ok) {
        return failureResult(context, recruit.failure);
      }

      return successResult(context, {
        state: recruit.state,
        session: recruit.session,
        effects: [
          logEffect(recruit.message, 'success'),
          ...(recruit.eventLines && recruit.eventLines.length > 0
            ? [logEffect(recruit.eventLines.join('\n'), 'success')]
            : []),
        ],
      });
    }
    case 'recruit/cancel':
      return cancelRecruit(context);
  }
}
