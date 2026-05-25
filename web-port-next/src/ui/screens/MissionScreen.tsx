import { buildMissionView } from '../../features/mission';
import { money, playerFacingReason } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function MissionScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildMissionView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="협회 의뢰실" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="미션 목록">
          {view.visibleMissions.map((mission) => {
            const displayStatus = mission.status === 'available' ? '수락 가능' :
                                  mission.status === 'accepted' ? '진행 중' :
                                  mission.status === 'failed' ? '실패' : '완수 (보고 대기)';
            return (
                <ChoiceButton
                detail={!mission.available ? playerFacingReason(mission.disabledReason) : undefined}
                key={mission.missionId}
                label={mission.label}
                meta={displayStatus}
                selected={mission.missionId === view.selectedMissionId}
                onClick={() => onAction({ type: 'mission/select', missionId: mission.missionId })}
              />
            );
          })}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedMission ? view.selectedMission.label : '협회 특수 의뢰'}</h2>
          <SummaryList
            items={[
              {
                label: '의뢰 상태',
                value: view.selectedMission?.status === 'available' ? '수락 가능' :
                       view.selectedMission?.status === 'accepted' ? '진행 중' :
                       view.selectedMission?.status === 'failed' ? '실패' :
                       view.selectedMission?.status === 'completed' ? '성공 (보고 대기)' : '미선택'
              },
              { label: '성공 보상금', value: view.selectedMission ? money(view.selectedMission.rewardMoney) : '미지정' },
              {
                label: '제한 기한',
                value: view.selectedMission?.remainingWeeks === undefined ? '기한 없음' : `${view.selectedMission.remainingWeeks}주 남음`,
              },
            ]}
          />
          <ActionRow compact>
            <button
              type="button"
              disabled={!view.selectedMission || view.selectedMission.status !== 'available'}
              onClick={() => onAction({ type: 'mission/accept' })}
            >
              의뢰 수락
            </button>
            <button
              type="button"
              disabled={!view.selectedMission || view.selectedMission.status !== 'completed'}
              onClick={() => onAction({ type: 'mission/report' })}
            >
              의뢰 보고
            </button>
            <button type="button" onClick={() => onAction({ type: 'mission/cancel' })}>
              사무소 복귀
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}
