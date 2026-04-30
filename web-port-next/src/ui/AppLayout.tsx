import { useMemo, useState } from 'react';
import type { GameCatalog } from '../catalog/types';
import type { GameAction } from '../game/actions';
import { validateSavePayloadBoundary, validateStateSessionBoundary } from '../game/boundaries';
import { dispatchGameAction } from '../game/dispatch';
import { createGameSavePayload } from '../game/savePayload';
import type { GameSession, GameState } from '../game/state';
import type { GameRuntime } from '../kernel/runtime';
import { RuntimeDiagnosticsPanel, StatusRail, type EffectLogEntry } from './DiagnosticsPanel';
import { RouteScreen } from './RouteScreens';

type AppLayoutProps = {
  readonly runtime: GameRuntime<GameCatalog, GameState, GameSession>;
};

export function AppLayout({ runtime }: AppLayoutProps) {
  const [state, setState] = useState<GameState>(runtime.initialState);
  const [session, setSession] = useState<GameSession>(runtime.initialSession);
  const [effectLog, setEffectLog] = useState<readonly EffectLogEntry[]>([]);
  const boundaryDiagnostics = useMemo(
    () => [
      ...validateStateSessionBoundary(state, session),
      ...validateSavePayloadBoundary(createGameSavePayload(state)),
    ],
    [state, session],
  );

  function runAction(action: GameAction) {
    const result = dispatchGameAction(
      {
        catalog: runtime.initialCatalog,
        state,
        session,
      },
      action,
    );

    setState(result.state);
    setSession(result.session);

    if (result.effects.length > 0) {
      setEffectLog((current) => [
        ...result.effects.map((effect, index) => ({ id: Date.now() + index, effect })),
        ...current,
      ].slice(0, 12));
    }
  }

  return (
    <main className="app-shell">
      <StatusRail catalog={runtime.initialCatalog} state={state} session={session} />
      <section className="workspace">
        <RouteScreen catalog={runtime.initialCatalog} state={state} session={session} onAction={runAction} />
        <RuntimeDiagnosticsPanel
          boundaryDiagnostics={boundaryDiagnostics}
          effectLog={effectLog}
          runtimeDiagnostics={runtime.diagnostics}
          session={session}
          state={state}
        />
      </section>
    </main>
  );
}
