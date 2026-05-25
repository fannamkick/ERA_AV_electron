import { buildWorkView } from '../../features/work';
import { money, playerFacingReason } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function WorkScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildWorkView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="파견 및 특별 기획" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="업무 목록">
          {view.visibleWorks.map((work) => (
            <ChoiceButton
              detail={!work.available ? playerFacingReason(work.disabledReason) : undefined}
              key={work.workId}
              label={work.label}
              meta={money(work.rewardMoney)}
              selected={work.workId === view.selectedWorkId}
              onClick={() => onAction({ type: 'work/select', workId: work.workId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedWork ? view.selectedWork.label : '기획 및 파견 지시'}</h2>
          <SummaryList
            items={[
              { label: '배치 여배우', value: view.selectedCharacter?.label ?? '미지정' },
              { label: '지원 조수', value: view.selectedAssistant?.label ?? '없음' },
              { label: '파견 정산금', value: view.selectedWork ? money(view.selectedWork.rewardMoney) : '미지정' },
              { label: '소요 시간', value: view.selectedWork?.completesTimeBlock ? '반나절 소모' : '즉시 완료' },
            ]}
          />
          <div className="section-heading">
            <p>인원 선발</p>
            <h2>담당 여배우 선발</h2>
          </div>
          <div className="selector-select-wrapper" style={{ marginBottom: '12px' }}>
            <select
              className="compact-slot-select"
              value={view.selectedCharacterId ?? ''}
              onChange={(e) => {
                if (e.target.value) {
                  onAction({ type: 'work/selectCharacter', characterId: e.target.value });
                }
              }}
            >
              <option value="" disabled>-- 담당 여배우 지정 --</option>
              {view.eligibleCharacters.map((candidate) => (
                <option key={candidate.characterId} value={candidate.characterId} disabled={!candidate.available}>
                  {candidate.label} {!candidate.available ? '(불가)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="section-heading">
            <p>조수 지정</p>
            <h2>업무 지원 조수 지정</h2>
          </div>
          <div className="selector-select-wrapper" style={{ marginBottom: '18px' }}>
            <select
              className="compact-slot-select"
              value={view.selectedAssistantId ?? ''}
              onChange={(e) => {
                onAction({ type: 'work/selectAssistant', characterId: e.target.value || undefined });
              }}
            >
              <option value="">-- 지원 조수 없음 --</option>
              {view.eligibleCharacters.map((candidate) => (
                <option key={`assistant:${candidate.characterId}`} value={candidate.characterId} disabled={!candidate.available}>
                  {candidate.label} {!candidate.available ? '(불가)' : ''}
                </option>
              ))}
            </select>
          </div>

          <ActionRow compact>
            <button className="primary-glow-btn" type="button" disabled={!view.selectedWork || !view.selectedCharacter} onClick={() => onAction({ type: 'work/execute' })}>
              기획 실행
            </button>
            <button className="danger-glow-btn" type="button" onClick={() => onAction({ type: 'work/cancel' })}>
              사무소 복귀
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}
