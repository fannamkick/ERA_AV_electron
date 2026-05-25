import { buildVisitView } from '../../features/visit';
import { money, playerFacingReason } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function VisitScreen({ state, session, onAction }: ScreenProps) {
  const view = buildVisitView(state, session);

  return (
    <section className="screen-panel shop-screen visit-screen">
      <ScreenHeading eyebrow="외출 관리국" title="사무실 외부 활동 및 시설 방문" />
      <div className="shop-layout">
        <div className="listing-list" aria-label="방문 장소">
          <div className="section-heading">
            <p>LOCATIONS</p>
            <h2>방문 가능 지역 선택</h2>
          </div>
          {view.visiblePlaces.map((place) => (
            <ChoiceButton
              detail={!place.available ? playerFacingReason(place.disabledReason) : undefined}
              key={place.placeId}
              label={place.label}
              meta={place.available ? '입장 가능' : '입장 불가'}
              selected={place.placeId === view.selectedPlaceId}
              onClick={() => onAction({ type: 'visit/selectPlace', placeId: place.placeId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedPlace ? view.selectedPlace.label : '장소를 선택해 주세요'}</h2>
          <SummaryList
            items={[
              { label: '선택된 상호작용', value: view.selectedAction ? view.selectedAction.label : '-' },
              { label: '필요 소모 비용', value: view.selectedAction ? money(view.selectedAction.cost) : '-' },
            ]}
          />
          
          <div className="listing-list compact-list choice-grid" aria-label="장소 행동">
            <div className="section-heading">
              <p>ACTIONS</p>
              <h2>수행 가능 상호작용</h2>
            </div>
            {view.visibleActions.map((action) => (
              <ChoiceButton
                detail={!action.available ? playerFacingReason(action.disabledReason) : undefined}
                key={action.actionId}
                label={action.label}
                meta={action.completed ? '완수함' : money(action.cost)}
                selected={action.actionId === view.selectedActionId}
                onClick={() => onAction({ type: 'visit/selectAction', actionId: action.actionId })}
              />
            ))}
            {view.selectedPlace && view.visibleActions.length === 0 && <p className="empty-state">실행 가능한 행동이 없습니다.</p>}
          </div>
          
          <ActionRow compact>
            <button 
              className="primary-glow-btn" 
              type="button" 
              disabled={!view.selectedAction} 
              onClick={() => onAction({ type: 'visit/confirmAction' })}
            >
              선택 행동 실행
            </button>
            <button 
              className="warning-glow-btn" 
              type="button" 
              disabled={!view.selectedPlace} 
              onClick={() => onAction({ type: 'visit/cancelSelection' })}
            >
              장소 목록
            </button>
            <button 
              className="danger-glow-btn" 
              type="button" 
              onClick={() => onAction({ type: 'visit/cancel' })}
            >
              사무소 복귀
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}
