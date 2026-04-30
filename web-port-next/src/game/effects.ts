export type GameEffect =
  | {
      readonly type: 'ui/log';
      readonly severity: 'info' | 'success' | 'warning' | 'error';
      readonly message: string;
    }
  | {
      readonly type: 'ui/warning';
      readonly message: string;
    }
  | {
      readonly type: 'save/request';
      readonly reason: string;
    };

export function logEffect(message: string, severity: 'info' | 'success' | 'warning' | 'error' = 'info'): GameEffect {
  return {
    type: 'ui/log',
    severity,
    message,
  };
}

export function warningEffect(message: string): GameEffect {
  return {
    type: 'ui/warning',
    message,
  };
}

export function saveRequestEffect(reason: string): GameEffect {
  return {
    type: 'save/request',
    reason,
  };
}
