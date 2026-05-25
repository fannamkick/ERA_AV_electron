import type { GameCatalog } from '../catalog/types';
import type { GameAction } from '../game/actions';
import type { GameSession, GameState } from '../game/state';

export type RouteScreenProps = {
  readonly catalog: GameCatalog;
  readonly state: GameState;
  readonly session: GameSession;
  readonly onAction: (action: GameAction) => void;
};

export type ScreenProps = RouteScreenProps;
