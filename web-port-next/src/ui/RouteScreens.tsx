import type { GameCatalog } from '../catalog/types';
import { buildItemShopView } from '../features/itemShop';
import { buildMainMenuView } from '../features/mainMenu';
import { buildMissionView } from '../features/mission';
import { buildRecruitView } from '../features/recruit';
import { buildSaveLoadView } from '../features/saveLoad';
import { buildShootingView } from '../features/shooting';
import { buildTrainingView } from '../features/training';
import { buildVisitView } from '../features/visit';
import { buildWorkView } from '../features/work';
import type { GameAction } from '../game/actions';
import type { GameSession, GameState } from '../game/state';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from './ScreenPrimitives';

type RouteScreenProps = {
  readonly catalog: GameCatalog;
  readonly state: GameState;
  readonly session: GameSession;
  readonly onAction: (action: GameAction) => void;
};

type ScreenProps = RouteScreenProps;

function money(value: number): string {
  return `${value.toLocaleString()} Pt`;
}

function mainMenuAction(itemId: string): GameAction | undefined {
  const actions: Record<string, GameAction> = {
    itemShop: { type: 'main/openItemShop' },
    mission: { type: 'main/openMission' },
    recruit: { type: 'main/openRecruit' },
    rest: { type: 'turn/end' },
    saveLoad: { type: 'main/openSaveLoad' },
    shooting: { type: 'main/openShooting' },
    training: { type: 'main/openTraining' },
    visit: { type: 'main/openVisit' },
    work: { type: 'main/openWork' },
  };

  return actions[itemId];
}

function BootScreen({ onAction }: ScreenProps) {
  return (
    <section className="screen-panel">
      <ScreenHeading eyebrow="Phase 1" title="새 게임" />
      <ActionRow>
        <button type="button" onClick={() => onAction({ type: 'game/new', input: { modeId: 'normal' } })}>
          NORMAL 시작
        </button>
        <button type="button" onClick={() => onAction({ type: 'game/new', input: { modeId: 'easy' } })}>
          EASY 시작
        </button>
      </ActionRow>
    </section>
  );
}

function MainMenuScreen({ state, onAction }: ScreenProps) {
  const view = buildMainMenuView(state);

  return (
    <section className="screen-panel">
      <ScreenHeading eyebrow="메인 화면" title={`현재 자금 ${money(view.currentMoney)}`} />
      <div className="menu-grid">
        {view.menuItems.map((item) => {
          const action = mainMenuAction(item.id);

          return (
            <ChoiceButton
              detail={!item.enabled ? item.disabledReason : undefined}
              disabled={!item.enabled || action === undefined}
              key={item.id}
              label={item.label}
              title={item.disabledReason}
              onClick={() => {
                if (action !== undefined) onAction(action);
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

function ItemShopScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildItemShopView(catalog, state, session);
  const selectedListing = view.visibleListings.find((listing) => listing.listingId === view.selectedListingId);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="아이템 상점" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="판매 상품">
          {view.visibleListings.map((listing) => (
            <ChoiceButton
              detail={!listing.available ? listing.disabledReason : undefined}
              key={listing.listingId}
              label={listing.label}
              meta={money(listing.unitPrice)}
              selected={listing.listingId === view.selectedListingId}
              onClick={() => onAction({ type: 'shop/selectListing', listingId: listing.listingId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{selectedListing ? selectedListing.label : '상품 선택'}</h2>
          <SummaryList
            items={[
              {
                label: '수량',
                value: (
                  <input
                    min={1}
                    type="number"
                    value={view.quantity}
                    onChange={(event) => onAction({ type: 'shop/changeQuantity', quantity: Number(event.target.value) })}
                  />
                ),
              },
              { label: '합계', value: view.totalPrice === undefined ? '-' : money(view.totalPrice) },
            ]}
          />
          <ActionRow compact>
            <button type="button" disabled={!selectedListing} onClick={() => onAction({ type: 'shop/confirmPurchase' })}>
              구매
            </button>
            <button type="button" onClick={() => onAction({ type: 'shop/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

function RecruitScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildRecruitView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="인물 영입" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="영입 후보">
          {view.visibleListings.map((listing) => (
            <ChoiceButton
              detail={!listing.available ? listing.disabledReason : undefined}
              key={listing.listingId}
              label={listing.label}
              meta={money(listing.price)}
              selected={listing.listingId === view.selectedListingId}
              onClick={() => onAction({ type: 'recruit/selectListing', listingId: listing.listingId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedListing ? view.selectedListing.label : '후보 선택'}</h2>
          <SummaryList
            items={[
              { label: '영입 비용', value: view.selectedListing ? money(view.selectedListing.price) : '-' },
              { label: '연결 원형', value: view.selectedListing?.characterTemplateId ?? '-' },
            ]}
          />
          <ActionRow compact>
            <button type="button" disabled={!view.selectedListing} onClick={() => onAction({ type: 'recruit/confirm' })}>
              영입
            </button>
            <button type="button" onClick={() => onAction({ type: 'recruit/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

function MissionScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildMissionView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="미션" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="미션 목록">
          {view.visibleMissions.map((mission) => (
            <ChoiceButton
              detail={!mission.available ? mission.disabledReason : undefined}
              key={mission.missionId}
              label={mission.label}
              meta={mission.status}
              selected={mission.missionId === view.selectedMissionId}
              onClick={() => onAction({ type: 'mission/select', missionId: mission.missionId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedMission ? view.selectedMission.label : '미션 선택'}</h2>
          <SummaryList
            items={[
              { label: '상태', value: view.selectedMission?.status ?? '-' },
              { label: '보상', value: view.selectedMission ? money(view.selectedMission.rewardMoney) : '-' },
              {
                label: '기한',
                value: view.selectedMission?.remainingWeeks === undefined ? '-' : `${view.selectedMission.remainingWeeks}주`,
              },
            ]}
          />
          <ActionRow compact>
            <button
              type="button"
              disabled={!view.selectedMission || view.selectedMission.status !== 'available'}
              onClick={() => onAction({ type: 'mission/accept' })}
            >
              수락
            </button>
            <button
              type="button"
              disabled={!view.selectedMission || view.selectedMission.status !== 'accepted'}
              onClick={() => onAction({ type: 'mission/report' })}
            >
              보고
            </button>
            <button type="button" onClick={() => onAction({ type: 'mission/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

function WorkScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildWorkView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="창관/업무" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="업무 목록">
          {view.visibleWorks.map((work) => (
            <ChoiceButton
              detail={!work.available ? work.disabledReason : undefined}
              key={work.workId}
              label={work.label}
              meta={money(work.rewardMoney)}
              selected={work.workId === view.selectedWorkId}
              onClick={() => onAction({ type: 'work/select', workId: work.workId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedWork ? view.selectedWork.label : '업무 선택'}</h2>
          <SummaryList
            items={[
              { label: '참여 인물', value: view.selectedCharacter?.label ?? '-' },
              { label: '수익', value: view.selectedWork ? money(view.selectedWork.rewardMoney) : '-' },
              { label: '시간', value: view.selectedWork?.completesTimeBlock ? '턴 종료' : '-' },
            ]}
          />
          <div className="listing-list compact-list" aria-label="업무 참여 인물">
            {view.eligibleCharacters.map((candidate) => (
              <ChoiceButton
                detail={!candidate.available ? candidate.disabledReason : undefined}
                key={candidate.characterId}
                label={candidate.label}
                meta={candidate.available ? '가능' : '불가'}
                selected={candidate.characterId === view.selectedCharacterId}
                onClick={() => onAction({ type: 'work/selectCharacter', characterId: candidate.characterId })}
              />
            ))}
          </div>
          <ActionRow compact>
            <button type="button" disabled={!view.selectedWork || !view.selectedCharacter} onClick={() => onAction({ type: 'work/execute' })}>
              실행
            </button>
            <button type="button" onClick={() => onAction({ type: 'work/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

function ShootingScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildShootingView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="촬영" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="촬영 대상">
          {view.visibleTargets.map((target) => (
            <ChoiceButton
              detail={!target.available ? target.disabledReason : undefined}
              disabled={!target.available}
              key={target.characterId}
              label={target.label}
              meta={target.available ? '가능' : '불가'}
              selected={target.characterId === view.selectedCharacterId}
              title={target.disabledReason}
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
          <div className="listing-list compact-list" aria-label="촬영 장면">
            {view.visibleScenes.map((scene) => (
              <ChoiceButton
                detail={!scene.available ? scene.disabledReason : undefined}
                disabled={!scene.available}
                key={scene.sceneId}
                label={scene.label}
                meta={money(scene.revenueMoney)}
                selected={scene.sceneId === view.selectedSceneId}
                title={scene.disabledReason}
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

function TrainingScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildTrainingView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="훈련" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="훈련 대상">
          {view.participants.map((participant) => (
            <ChoiceButton
              detail={!participant.available ? participant.disabledReason : undefined}
              disabled={!participant.available}
              key={`target:${participant.characterId}`}
              label={participant.label}
              meta="대상"
              selected={participant.characterId === view.selectedTargetId}
              title={participant.disabledReason}
              onClick={() => onAction({ type: 'training/selectTarget', characterId: participant.characterId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedCommand ? view.selectedCommand.label : '커맨드 선택'}</h2>
          <SummaryList
            items={[
              { label: '대상', value: view.selectedTarget?.label ?? '-' },
              { label: '실행자', value: view.selectedExecutor?.label ?? '-' },
              { label: '자극', value: view.bufferSummary.stimulusTotal || '-' },
              { label: 'Param Up', value: view.bufferSummary.paramUpTotal || '-' },
            ]}
          />
          <div className="listing-list compact-list" aria-label="훈련 실행자">
            {view.participants.map((participant) => (
              <ChoiceButton
                detail={!participant.available ? participant.disabledReason : undefined}
                disabled={!participant.available}
                key={`executor:${participant.characterId}`}
                label={participant.label}
                meta="실행자"
                selected={participant.characterId === view.selectedExecutorId}
                title={participant.disabledReason}
                onClick={() => onAction({ type: 'training/selectExecutor', characterId: participant.characterId })}
              />
            ))}
          </div>
          <div className="listing-list compact-list" aria-label="훈련 커맨드">
            {view.visibleCommands.map((command) => (
              <ChoiceButton
                detail={!command.available ? command.disabledReason : undefined}
                disabled={!command.available}
                key={command.commandId}
                label={command.label}
                meta={command.completesTimeBlock ? '턴' : '즉시'}
                selected={command.commandId === view.selectedCommandId}
                title={command.disabledReason}
                onClick={() => onAction({ type: 'training/selectCommand', commandId: command.commandId })}
              />
            ))}
          </div>
          <ActionRow compact>
            <button type="button" disabled={!view.selectedCommand} onClick={() => onAction({ type: 'training/execute' })}>
              실행
            </button>
            <button
              type="button"
              disabled={!view.selectedTarget && !view.selectedExecutor && !view.selectedCommand}
              onClick={() => onAction({ type: 'training/cancelSelection' })}
            >
              선택 해제
            </button>
            <button type="button" onClick={() => onAction({ type: 'training/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

function SaveLoadScreen({ state, session, onAction }: ScreenProps) {
  const view = buildSaveLoadView(state, session);

  return (
    <section className="screen-panel save-screen">
      <ScreenHeading eyebrow="저장/로드" title={`M${view.month} W${view.week} T${view.turn} / ${money(view.currentMoney)}`} />
      <div className="save-layout">
        <section className="save-column">
          <div className="section-heading">
            <p>Schema {view.schemaVersion}</p>
            <h2>저장 스냅샷</h2>
          </div>
          <textarea readOnly rows={12} value={view.snapshotText} aria-label="생성된 저장 데이터" />
          <ActionRow compact>
            <button type="button" onClick={() => onAction({ type: 'save/createSnapshot' })}>
              생성
            </button>
          </ActionRow>
        </section>

        <section className="save-column">
          <div className="section-heading">
            <p>{view.lastSnapshotAt ?? 'No Snapshot'}</p>
            <h2>불러올 데이터</h2>
          </div>
          <textarea
            rows={12}
            value={view.loadText}
            aria-label="불러올 저장 데이터"
            onChange={(event) => onAction({ type: 'save/updateLoadText', text: event.target.value })}
          />
          <ActionRow compact>
            <button type="button" disabled={view.loadText.trim().length === 0} onClick={() => onAction({ type: 'save/loadSnapshot' })}>
              불러오기
            </button>
            <button type="button" onClick={() => onAction({ type: 'save/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </section>
      </div>
    </section>
  );
}

function VisitScreen({ state, session, onAction }: ScreenProps) {
  const view = buildVisitView(state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="방문" title={money(view.currentMoney)} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="방문 장소">
          {view.visiblePlaces.map((place) => (
            <ChoiceButton
              detail={!place.available ? place.disabledReason : undefined}
              key={place.placeId}
              label={place.label}
              meta={place.available ? '입장' : '불가'}
              selected={place.placeId === view.selectedPlaceId}
              onClick={() => onAction({ type: 'visit/selectPlace', placeId: place.placeId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedPlace ? view.selectedPlace.label : '장소 선택'}</h2>
          <SummaryList
            items={[
              { label: '행동', value: view.selectedAction ? view.selectedAction.label : '-' },
              { label: '비용', value: view.selectedAction ? money(view.selectedAction.cost) : '-' },
            ]}
          />
          <div className="listing-list compact-list" aria-label="장소 행동">
            {view.visibleActions.map((action) => (
              <ChoiceButton
                detail={!action.available ? action.disabledReason : undefined}
                key={action.actionId}
                label={action.label}
                meta={action.completed ? '완료' : money(action.cost)}
                selected={action.actionId === view.selectedActionId}
                onClick={() => onAction({ type: 'visit/selectAction', actionId: action.actionId })}
              />
            ))}
            {view.selectedPlace && view.visibleActions.length === 0 && <p className="empty-state">실행 가능한 행동이 없습니다.</p>}
          </div>
          <ActionRow compact>
            <button type="button" disabled={!view.selectedAction} onClick={() => onAction({ type: 'visit/confirmAction' })}>
              실행
            </button>
            <button type="button" disabled={!view.selectedPlace} onClick={() => onAction({ type: 'visit/cancelSelection' })}>
              장소 목록
            </button>
            <button type="button" onClick={() => onAction({ type: 'visit/cancel' })}>
              돌아가기
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

function UnknownRouteScreen({ session, onAction }: ScreenProps) {
  return (
    <section className="screen-panel">
      <ScreenHeading eyebrow="알 수 없는 화면" title={session.ui.route} />
      <button type="button" onClick={() => onAction({ type: 'route/change', route: 'boot' })}>
        시작 화면으로
      </button>
    </section>
  );
}

export function RouteScreen(props: RouteScreenProps) {
  const route = props.session.ui.route;

  if (route === 'boot' || route === 'newGame') return <BootScreen {...props} />;
  if (route === 'mainMenu') return <MainMenuScreen {...props} />;
  if (route === 'itemShop') return <ItemShopScreen {...props} />;
  if (route === 'mission') return <MissionScreen {...props} />;
  if (route === 'recruit') return <RecruitScreen {...props} />;
  if (route === 'shooting') return <ShootingScreen {...props} />;
  if (route === 'training') return <TrainingScreen {...props} />;
  if (route === 'visit') return <VisitScreen {...props} />;
  if (route === 'work') return <WorkScreen {...props} />;
  if (route === 'saveLoad') return <SaveLoadScreen {...props} />;
  return <UnknownRouteScreen {...props} />;
}
