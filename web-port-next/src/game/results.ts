import type { GameCatalog } from '../catalog/types';
import type { GameSession, GameState } from './state';
import { logEffect, warningEffect, type GameEffect } from './effects';
import type { UiRoute } from './routes';

export type GameActionContext = {
  readonly catalog: GameCatalog;
  readonly state: GameState;
  readonly session: GameSession;
  readonly route?: UiRoute;
};

export type GameActionStatus = 'success' | 'failure' | 'noop';

export type GameActionFailure = {
  readonly code: string;
  readonly message: string;
};

export type GameActionResult = {
  readonly status: GameActionStatus;
  readonly state: GameState;
  readonly session: GameSession;
  readonly route: UiRoute;
  readonly effects: readonly GameEffect[];
  readonly failure?: GameActionFailure;
};

type ActionResultOptions = {
  readonly state?: GameState;
  readonly session?: GameSession;
  readonly route?: UiRoute;
  readonly effects?: readonly GameEffect[];
  readonly failure?: GameActionFailure;
};

function currentRoute(context: GameActionContext): UiRoute {
  return context.route ?? context.session.ui.route;
}

function syncSessionRoute(session: GameSession, route: UiRoute): GameSession {
  if (session.ui.route === route) {
    return session;
  }

  return {
    ...session,
    ui: {
      ...session.ui,
      route,
    },
  };
}

function actionResult(context: GameActionContext, status: GameActionStatus, options: ActionResultOptions = {}): GameActionResult {
  const state = options.state ?? context.state;
  const session = options.session ?? context.session;
  const route = options.route ?? session.ui.route ?? currentRoute(context);

  return {
    status,
    state,
    session: syncSessionRoute(session, route),
    route,
    effects: options.effects ?? [],
    failure: options.failure,
  };
}

export function successResult(context: GameActionContext, options: ActionResultOptions = {}): GameActionResult {
  return actionResult(context, 'success', options);
}

export function failureResult(
  context: GameActionContext,
  failure: GameActionFailure,
  options: Omit<ActionResultOptions, 'state' | 'failure'> = {},
): GameActionResult {
  return actionResult(context, 'failure', {
    ...options,
    state: context.state,
    failure,
    effects: options.effects ?? [warningEffect(failure.message)],
  });
}

export function noOpResult(context: GameActionContext, message?: string): GameActionResult {
  return actionResult(context, 'noop', {
    effects: message ? [logEffect(message)] : [],
  });
}

export function routeResult(context: GameActionContext, route: UiRoute, message?: string): GameActionResult {
  return successResult(context, {
    route,
    effects: message ? [logEffect(message)] : [],
  });
}
