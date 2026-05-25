import { buildSaveLoadView } from '../../features/saveLoad';
import { money } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ScreenHeading } from '../ScreenPrimitives';

export function SaveLoadScreen({ state, session, onAction }: ScreenProps) {
  const view = buildSaveLoadView(state, session);

  return (
    <section className="screen-panel save-screen">
      <ScreenHeading eyebrow="데이터 관리실" title={`M${view.month} W${view.week} T${view.turn} / ${money(view.currentMoney)}`} />

      <div className="save-status-briefing">
        <span className="brief-item"><strong>호환 버전:</strong> v{view.schemaVersion}.0</span>
        <span className="brief-item"><strong>현재 자금:</strong> {money(view.currentMoney)}</span>
        {view.lastSnapshotAt ? <span className="brief-item"><strong>최근 스냅샷:</strong> {view.lastSnapshotAt}</span> : null}
      </div>

      <div className="save-layout">
        <section className="save-column glass-panel">
          <div className="section-heading">
            <p>EXPORT BACKUP</p>
            <h2>내보낼 백업 데이터</h2>
          </div>
          <p className="save-instructions">현재까지의 플레이 데이터를 텍스트 코드로 저장합니다. 아래 상자의 텍스트 전체를 복사하여 백업해 두실 수 있습니다.</p>
          <textarea readOnly rows={10} value={view.snapshotText} aria-label="생성된 백업 코드" />
          <ActionRow compact>
            <button className="primary-glow-btn" type="button" onClick={() => onAction({ type: 'save/createSnapshot' })}>
              최신 백업 코드 생성
            </button>
          </ActionRow>
        </section>

        <section className="save-column glass-panel">
          <div className="section-heading">
            <p>IMPORT BACKUP</p>
            <h2>가져올 백업 데이터</h2>
          </div>
          <p className="save-instructions">복원할 백업 텍스트 코드를 아래 상자에 붙여넣고 실행합니다.</p>
          <textarea
            placeholder="여기에 백업 텍스트 코드를 붙여넣으십시오..."
            rows={10}
            value={view.loadText}
            aria-label="가져올 백업 코드"
            onChange={(event) => onAction({ type: 'save/updateLoadText', text: event.target.value })}
          />
          <ActionRow compact>
            <button
              className="success-glow-btn"
              type="button"
              disabled={view.loadText.trim().length === 0}
              onClick={() => onAction({ type: 'save/loadSnapshot' })}
            >
              백업 코드로 불러오기
            </button>
            <button className="danger-glow-btn" type="button" onClick={() => onAction({ type: 'save/cancel' })}>
              사무소 복귀
            </button>
          </ActionRow>
        </section>
      </div>
    </section>
  );
}
