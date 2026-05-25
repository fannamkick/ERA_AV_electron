import { buildShootingView } from '../../features/shooting';
import { money, playerFacingReason } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function ShootingScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildShootingView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="촬영" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="촬영 대상">
          {view.visibleTargets.map((target) => (
            <ChoiceButton
              detail={!target.available ? playerFacingReason(target.disabledReason) : undefined}
              disabled={!target.available}
              key={target.characterId}
              label={target.label}
              meta={target.available ? '가능' : '불가'}
              selected={target.characterId === view.selectedCharacterId}
              title={playerFacingReason(target.disabledReason)}
              onClick={() => onAction({ type: 'shooting/selectTarget', characterId: target.characterId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedScene ? view.selectedScene.label : '장면 선택'}</h2>
          <SummaryList
            items={[
              { label: '대상', value: view.selectedTarget?.label ?? '-' },
              { label: '수익', value: view.selectedScene ? money(view.selectedScene.revenueMoney) : '-' },
              { label: '촬영량', value: view.filmingAmount > 0 ? view.filmingAmount : '-' },
              { label: '점수', value: view.selectedScene?.score ?? '-' },
            ]}
          />
          <div className="listing-list compact-list choice-grid" aria-label="촬영 장면">
            {view.visibleScenes.map((scene) => (
              <ChoiceButton
                detail={!scene.available ? playerFacingReason(scene.disabledReason) : undefined}
                disabled={!scene.available}
                key={scene.sceneId}
                label={scene.label}
                meta={money(scene.revenueMoney)}
                selected={scene.sceneId === view.selectedSceneId}
                title={playerFacingReason(scene.disabledReason)}
                onClick={() => onAction({ type: 'shooting/selectScene', sceneId: scene.sceneId })}
              />
            ))}
          </div>
          <ActionRow compact>
            <button
              type="button"
              disabled={!view.selectedTarget || !view.selectedScene}
              onClick={() => onAction({ type: 'shooting/confirmScene' })}
            >
              확정
            </button>
            <button
              type="button"
              disabled={!view.selectedTarget && !view.selectedScene}
              onClick={() => onAction({ type: 'shooting/cancelSelection' })}
            >
              선택 해제
            </button>
            <button type="button" onClick={() => onAction({ type: 'shooting/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}
