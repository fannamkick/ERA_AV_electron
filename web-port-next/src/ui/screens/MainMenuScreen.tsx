import { buildMainMenuView } from '../../features/mainMenu';
import { mainMenuAction } from '../mainMenuActions';
import { money, playerFacingReason, timeSlotText } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function MainMenuScreen({ catalog, state, onAction }: ScreenProps) {
  const view = buildMainMenuView(state, catalog);
  const pregnantActresses = Object.values(state.people.characters).filter(
    (chara) => chara.attributes.traits['130'] === true,
  );

  return (
    <section className="screen-panel menu-screen-panel">
      <ScreenHeading eyebrow="메인 사무실" title="오늘의 지시 선택" />

      {pregnantActresses.map((actress) => (
        <div key={`preg-alert-${actress.id}`} className="event-alert-card warning">
          <div className="alert-content">
            <strong>{actress.identity.displayName} 여배우 임신 소식</strong>
            <p>조교사와의 성교 중 정액 오염 누적으로 임신에 성공하였습니다. 소질 [임신] 상태입니다.</p>
          </div>
        </div>
      ))}

      <div className="dashboard-grid">
        <article className="dashboard-card status-card">
          <div className="section-heading">
            <p>STATUS</p>
            <h2>사무소 현황</h2>
          </div>
          <SummaryList
            items={[
              { label: '현재 계절', value: view.status.seasonLabel },
              { label: '날짜', value: `${view.status.dateLabel} / ${view.status.yearLabel}` },
              { label: '시간', value: timeSlotText(view.status.timeSlotLabel) },
              { label: '시작 주차', value: view.status.startedWeek },
              { label: '남은 주차', value: view.status.remainingWeeks ?? '기한 없음' },
              { label: '목표 자금', value: view.status.targetMoney === undefined ? '-' : money(view.status.targetMoney) },
              { label: '조교 가능', value: `${view.status.trainableCharacterCount}명` },
              { label: '조수', value: `${view.status.assistantCount}명` },
              { label: '소지품', value: view.status.itemSummary.length > 0 ? view.status.itemSummary.slice(0, 3).join(', ') : '없음' },
            ]}
          />
        </article>

        <article className="dashboard-card action-card">
          <div className="section-heading">
            <p>COMMAND</p>
            <h2>실행할 업무</h2>
          </div>
          <div className="menu-grid">
            {view.menuItems.map((item) => {
              const action = mainMenuAction(item.actionId ?? item.id);

              return (
                <ChoiceButton
                  detail={!item.enabled ? playerFacingReason(item.disabledReason) : undefined}
                  disabled={!item.enabled || action === undefined}
                  key={item.id}
                  label={item.label}
                  title={playerFacingReason(item.disabledReason)}
                  onClick={() => {
                    if (action !== undefined) onAction(action);
                  }}
                />
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
