import type { ScreenProps } from '../routeScreenTypes';

export function BootScreen({ onAction }: ScreenProps) {
  return (
    <section className="screen-panel boot-screen-panel">
      <div className="game-logo-container">
        <h1 className="game-main-title">erAV : 여배우 조교 시뮬레이션</h1>
        <p className="game-subtitle">새로운 운영 기록을 시작합니다. 난이도를 선택하세요.</p>
      </div>
      <div className="boot-actions">
        <button className="selected" type="button" onClick={() => onAction({ type: 'game/new', input: { modeId: 'normal' } })}>
          일반 모드
        </button>
        <button type="button" onClick={() => onAction({ type: 'game/new', input: { modeId: 'easy' } })}>
          이지 모드
        </button>
      </div>
    </section>
  );
}
