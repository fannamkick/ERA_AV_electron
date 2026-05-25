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
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);

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

  const isElectron = typeof window !== 'undefined' && !!(window as any).electronAPI;

  return (
    <div className="app-container">
      {isElectron && (
        <header className="title-bar">
          <div className="title-bar-drag-area">
            <span className="title-bar-logo">💋</span>
            <span className="title-bar-title">erAV Next : 여배우 조교 시뮬레이션</span>
          </div>
          <div className="title-bar-controls">
            <button className="control-btn minimize" onClick={() => (window as any).electronAPI.windowMinimize()} title="최소화" type="button">
              ─
            </button>
            <button className="control-btn maximize" onClick={() => (window as any).electronAPI.windowMaximize()} title="최대화" type="button">
              ⬜
            </button>
            <button className="control-btn close" onClick={() => (window as any).electronAPI.windowClose()} title="닫기" type="button">
              ✕
            </button>
          </div>
        </header>
      )}
      <main className={`app-shell route-${session.ui.route}`}>
        <StatusRail catalog={runtime.initialCatalog} state={state} session={session} />
        <section className="workspace">
          <RouteScreen catalog={runtime.initialCatalog} state={state} session={session} onAction={runAction} />
          {showDiagnostics && (
            <RuntimeDiagnosticsPanel
              boundaryDiagnostics={boundaryDiagnostics}
              effectLog={effectLog}
              runtimeDiagnostics={runtime.diagnostics}
              session={session}
              state={state}
            />
          )}
          <button 
            className={`debug-toggle-btn ${showDiagnostics ? 'active' : ''}`}
            onClick={() => setShowDiagnostics(!showDiagnostics)}
            type="button"
          >
            {showDiagnostics ? '개발자 시스템 로그 접기' : '개발자 시스템 로그'}
          </button>
        </section>
      </main>
    </div>
  );
}
