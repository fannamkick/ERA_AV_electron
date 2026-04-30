import type { UiRoute } from '../../game/routes';

export type { UiRoute };

export type UiChoice = {
  readonly id: string;
  readonly label: string;
  readonly actionType: string;
  readonly disabledReason?: string;
};

export type UiSessionState = {
  readonly route: UiRoute;
  readonly choices: readonly UiChoice[];
  readonly log: readonly string[];
};

export const initialUiSessionState: UiSessionState = {
  route: 'boot',
  choices: [],
  log: [],
};
