import type { GameCatalog } from '../catalog/types';
import { buildItemShopView } from '../features/itemShop';
import { buildMainMenuView } from '../features/mainMenu';
import { buildMissionView } from '../features/mission';
import { buildRecruitView } from '../features/recruit';
import { buildRosterView } from '../features/roster';
import { buildSaveLoadView } from '../features/saveLoad';
import { buildShootingView } from '../features/shooting';
import { buildWardrobeView } from '../features/socialEquipmentCflag';
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

function timeSlotText(label: string): string {
  if (label === 'first half') return '낮';
  if (label === 'second half') return '밤';
  return label;
}

function playerFacingReason(reason: string | undefined): string | undefined {
  if (!reason) return undefined;
  if (reason.includes('owner must implement') || reason.includes('remaining-feature') || reason.includes('debug owner')) {
    return '아직 사용할 수 없음';
  }
  if (reason.includes('at least one trainable')) return '조교 가능한 여배우 필요';
  if (reason.includes('at least two characters')) return '소속 인원 2명 이상 필요';
  if (reason.includes('mission access')) return '미션 해금 필요';
  if (reason.includes('stylist access')) return '스타일리스트 해금 필요';
  if (reason.includes('dormitory access')) return '기숙사 해금 필요';
  if (reason.includes('first half')) return '낮 시간에만 가능';
  if (reason.includes('ending')) return '엔딩 조건 필요';
  return reason;
}

function mainMenuAction(itemId: string): GameAction | undefined {
  const actions: Record<string, GameAction> = {
    'main/openItemShop': { type: 'main/openItemShop' },
    'main/openMission': { type: 'main/openMission' },
    'main/openRecruit': { type: 'main/openRecruit' },
    'main/openAbilityRoster': { type: 'main/openAbilityRoster' },
    'main/openActressList': { type: 'main/openActressList' },
    'main/openRoster': { type: 'main/openRoster' },
    'main/openSave': { type: 'main/openSave' },
    'main/openLoad': { type: 'main/openLoad' },
    'main/openShooting': { type: 'main/openShooting' },
    'main/openTraining': { type: 'main/openTraining' },
    'main/openWardrobe': { type: 'main/openWardrobe' },
    'main/openVisit': { type: 'main/openVisit' },
    'main/openWork': { type: 'main/openWork' },
    'turn/end': { type: 'turn/end' },
    itemShop: { type: 'main/openItemShop' },
    mission: { type: 'main/openMission' },
    recruit: { type: 'main/openRecruit' },
    roster: { type: 'main/openRoster' },
    rest: { type: 'turn/end' },
    saveLoad: { type: 'main/openSave' },
    shooting: { type: 'main/openShooting' },
    training: { type: 'main/openTraining' },
    wardrobe: { type: 'main/openWardrobe' },
    visit: { type: 'main/openVisit' },
    work: { type: 'main/openWork' },
  };

  return actions[itemId];
}

function BootScreen({ onAction }: ScreenProps) {
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

function MainMenuScreen({ catalog, state, onAction }: ScreenProps) {
  const view = buildMainMenuView(state, catalog);
  const pregnantActresses = Object.values(state.people.characters).filter(
    (chara) => chara.attributes.traits['130'] === true
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

function ItemShopScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildItemShopView(catalog, state, session);
  const selectedListing = view.visibleListings.find((listing) => listing.listingId === view.selectedListingId);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="사무소 상점" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="판매 상품">
          {view.visibleListings.map((listing) => (
            <ChoiceButton
              detail={!listing.available ? playerFacingReason(listing.disabledReason) : undefined}
              key={listing.listingId}
              label={listing.label}
              meta={money(listing.unitPrice)}
              selected={listing.listingId === view.selectedListingId}
              onClick={() => onAction({ type: 'shop/selectListing', listingId: listing.listingId })}
            />
          ))}
          {view.visibleUseItems.length > 0 && (
            <div className="section-heading">
              <p>소지품 창고</p>
              <h2>보유 약품 복용 및 조교 도구 사용</h2>
            </div>
          )}
          {view.visibleUseItems.map((item) => (
            <ChoiceButton
              detail={!item.available ? playerFacingReason(item.disabledReason) : item.description}
              key={`use:${item.itemId}`}
              label={item.label}
              meta={money(item.unitPrice)}
              selected={item.itemId === view.selectedUseItemId}
              onClick={() => onAction({ type: 'shop/selectUseItem', itemId: item.itemId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{selectedListing ? selectedListing.label : '상점 구매 대행'}</h2>
          <SummaryList
            items={[
              {
                label: '구매 수량',
                value: (
                  <input
                    min={1}
                    type="number"
                    value={view.quantity}
                    onChange={(event) => onAction({ type: 'shop/changeQuantity', quantity: Number(event.target.value) })}
                  />
                ),
              },
              { label: '최종 합계', value: view.totalPrice === undefined ? '-' : money(view.totalPrice) },
            ]}
          />
          <ActionRow compact>
            <button type="button" disabled={!selectedListing} onClick={() => onAction({ type: 'shop/confirmPurchase' })}>
              즉시 구매
            </button>
            <button type="button" onClick={() => onAction({ type: 'shop/cancel' })}>
              상점 퇴장
            </button>
          </ActionRow>
          
          <div className="section-heading">
            <p>도구/약물 조율</p>
            <h2>{view.selectedUseItem ? view.selectedUseItem.label : '도구 및 약품 조율'}</h2>
          </div>
          <SummaryList
            items={[
              { label: '소모 가격', value: view.useTotalPrice === undefined ? '-' : money(view.useTotalPrice) },
              { label: '적용 여배우', value: view.selectedUseTarget?.label ?? '미지정' },
            ]}
          />
          {view.selectedUseItem?.targetRequired && (
            <div className="listing-list compact-list choice-grid" aria-label="아이템 적용 대상">
              {view.eligibleUseTargets.map((target) => (
                <ChoiceButton
                  detail={!target.available ? playerFacingReason(target.disabledReason) : undefined}
                  disabled={!target.available}
                  key={target.characterId}
                  label={target.label}
                  selected={target.characterId === view.selectedUseTargetCharacterId}
                  onClick={() => onAction({ type: 'shop/selectUseTarget', characterId: target.characterId })}
                />
              ))}
            </div>
          )}
          <ActionRow compact>
            <button
              type="button"
              disabled={!view.selectedUseItem || (view.selectedUseItem.targetRequired && !view.selectedUseTarget)}
              onClick={() => onAction({ type: 'shop/confirmUseItem' })}
            >
              사용 적용
            </button>
            <button type="button" disabled={!view.selectedUseItem && !view.selectedUseTarget} onClick={() => onAction({ type: 'shop/cancelUseItem' })}>
              선택 취소
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
      <ScreenHeading eyebrow="스카우트 센터" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="영입 후보">
          {view.visibleListings.map((listing) => (
            <ChoiceButton
              detail={!listing.available ? playerFacingReason(listing.disabledReason) : undefined}
              key={listing.listingId}
              label={listing.label}
              meta={money(listing.price)}
              selected={listing.listingId === view.selectedListingId}
              onClick={() => onAction({ type: 'recruit/selectListing', listingId: listing.listingId })}
            />
          ))}
          <div className="event-log-container">
            <span className="page-indicator">페이지: {view.pageIndex + 1}</span>
            <ActionRow compact>
              <button type="button" onClick={() => onAction({ type: 'recruit/previousPage' })}>
                {view.previousPageLabel === 'previous' ? '이전 페이지' : view.previousPageLabel}
              </button>
              <button type="button" onClick={() => onAction({ type: 'recruit/nextPage' })}>
                {view.nextPageLabel === 'next' ? '다음 페이지' : view.nextPageLabel}
              </button>
            </ActionRow>
            <button style={{ marginTop: '10px', width: '100%' }} type="button" onClick={() => onAction({ type: 'recruit/cancel' })}>
              {view.returnLabel === 'return' ? '사무소 복귀' : view.returnLabel}
            </button>
          </div>
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedListing ? view.selectedListing.label : '스카우트 후보 프로필'}</h2>
          <SummaryList
            items={[
              { label: '영입 계약금', value: view.selectedListing ? money(view.selectedListing.price) : '미지정' },
            ]}
          />
          {view.selectedManual ? (
            <div className="event-log" aria-label="후보 설명">
              {view.selectedManual.lines.map((line, index) => (
                <p key={`manual:${view.selectedManual?.candidateNumber}:${index}`}>{line || '\u00a0'}</p>
              ))}
            </div>
          ) : null}
          {view.interview ? (
            <div className="event-log" aria-label="면접 내용">
              <h3>{view.interview.candidateName}</h3>
              {view.interview.promptLines.map((line) => (
                <p key={`prompt:${line}`}>{line}</p>
              ))}
              {view.interview.descriptionLines.map((line, index) => (
                <p key={`interview:${index}`}>{line}</p>
              ))}
              <p>{view.interview.contractPrompt}</p>
            </div>
          ) : null}
          <ActionRow compact>
            <button type="button" disabled={!view.selectedListing} onClick={() => onAction({ type: 'recruit/confirm' })}>
              {view.interview?.confirmLabel ?? '계약 체결'}
            </button>
            {view.interview?.rerollLabel ? (
              <button type="button" onClick={() => onAction({ type: 'recruit/rerollInterview' })}>
                다른 후보 보기
              </button>
            ) : null}
            <button type="button" onClick={() => onAction({ type: 'recruit/cancel' })}>
              {view.interview?.rejectLabel ?? '생각해본다'}
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

function WorkScreen({ catalog, state, session, onAction }: ScreenProps) {
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
                onAction({ type: 'work/selectAssistant', characterId: e.target.value || undefined as any });
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

function ShootingScreen({ catalog, state, session, onAction }: ScreenProps) {
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

function TrainingScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildTrainingView(catalog, state, session);

  const targetId = view.selectedTargetId;
  const targetDialogue = targetId ? state.text.characterTextEntries[targetId]?.current : undefined;

  const targetBody = targetId ? state.body.byCharacterId[targetId] : undefined;
  const targetChara = targetId ? state.people.characters[targetId] : undefined;

  const staminaCur = targetBody?.bodyStats.stamina ?? 0;
  const staminaMax = targetChara?.attributes.baseStats.maximum['0'] ?? 1000;
  const energyCur = targetBody?.bodyStats.energy ?? 0;
  const energyMax = targetChara?.attributes.baseStats.maximum['1'] ?? 1000;

  const staminaPct = Math.min(100, Math.max(0, (staminaCur / staminaMax) * 100));
  const energyPct = Math.min(100, Math.max(0, (energyCur / energyMax) * 100));

  return (
    <section className="screen-panel training-screen-panel">
      <ScreenHeading eyebrow="특별 조교실" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />

      {targetDialogue && (
        <div className="dialogue-bubble">
          <div className="dialogue-speaker">{view.selectedTarget?.label}</div>
          <div className="dialogue-text">“{targetDialogue}”</div>
        </div>
      )}

      <div className="training-dashboard-layout">
        {/* Column 1: Actress Slots */}
        <div className="training-dashboard-sidebar">
          {/* 슬롯 A: 조교 대상 여배우 */}
          <div className={`slot-card target ${view.selectedTarget ? 'active' : ''}`}>
            <div className="slot-badge">조교 대상 여배우</div>
            {view.selectedTarget ? (
              <div className="slot-details">
                <span className="slot-name">{view.selectedTarget.label}</span>
                <div className="progress-track-wrapper">
                  <div className="progress-label">체력: {staminaCur} / {staminaMax}</div>
                  <div className="progress-track"><div className="progress-fill stamina" style={{ width: `${staminaPct}%` }} /></div>
                </div>
                <div className="progress-track-wrapper" style={{ marginTop: '8px' }}>
                  <div className="progress-label">기력: {energyCur} / {energyMax}</div>
                  <div className="progress-track"><div className="progress-fill energy" style={{ width: `${energyPct}%` }} /></div>
                </div>
              </div>
            ) : (
              <div className="slot-empty">여배우를 지정해 주세요</div>
            )}
            <div className="slot-selector-select-wrapper">
              <select
                className="compact-slot-select"
                value={view.selectedTargetId ?? ''}
                onChange={(e) => {
                  if (e.target.value) {
                    onAction({ type: 'training/selectTarget', characterId: e.target.value });
                  }
                }}
              >
                <option value="" disabled>-- 여배우 지정 --</option>
                {view.participants.map((participant) => (
                  <option key={`target-sel:${participant.characterId}`} value={participant.characterId} disabled={!participant.available}>
                    {participant.label} {!participant.available ? '(불가)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 슬롯 B: 조교 실행자 */}
          <div className={`slot-card executor ${view.selectedExecutor ? 'active' : ''}`}>
            <div className="slot-badge">조교 실행자 (조교사)</div>
            <div className="slot-details">
              <span className="slot-name">{view.selectedExecutor?.label ?? '미지정'}</span>
            </div>
            <div className="slot-selector-select-wrapper">
              <select
                className="compact-slot-select"
                value={view.selectedExecutorId ?? ''}
                onChange={(e) => {
                  if (e.target.value) {
                    onAction({ type: 'training/selectExecutor', characterId: e.target.value });
                  }
                }}
              >
                <option value="" disabled>-- 조교사 지정 --</option>
                {view.participants.map((participant) => (
                  <option key={`exec-sel:${participant.characterId}`} value={participant.characterId}>
                    {participant.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 슬롯 C: 지원 조수 */}
          <div className={`slot-card assistant ${view.selectedAssistant ? 'active' : ''}`}>
            <div className="slot-badge">훈련 지원 조수</div>
            <div className="slot-details">
              <span className="slot-name">{view.selectedAssistant?.label ?? '조수 없음'}</span>
            </div>
            <div className="slot-selector-select-wrapper">
              <select
                className="compact-slot-select"
                value={view.selectedAssistantId ?? ''}
                onChange={(e) => {
                  onAction({ type: 'training/selectAssistant', characterId: e.target.value || undefined });
                }}
              >
                <option value="">-- 조수 없음 --</option>
                {view.participants.map((participant) => (
                  <option key={`asst-sel:${participant.characterId}`} value={participant.characterId} disabled={!participant.available}>
                    {participant.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Column 2: Commands Board */}
        <div className="training-dashboard-commands">
          <div className="section-heading">
            <p>COMMANDS</p>
            <h2>조교 행동 지시 커맨드판</h2>
          </div>
          <div className="listing-list command-choice-grid" aria-label="조교 행동 지시">
            {view.visibleCommands.map((command) => (
              <ChoiceButton
                detail={!command.available ? playerFacingReason(command.disabledReason) : undefined}
                disabled={!command.available}
                key={command.commandId}
                label={command.label}
                meta={command.completesTimeBlock ? '시간 소모' : '즉시'}
                selected={command.commandId === view.selectedCommandId}
                title={playerFacingReason(command.disabledReason)}
                onClick={() => onAction({ type: 'training/selectCommand', commandId: command.commandId })}
              />
            ))}
          </div>
        </div>

        {/* Column 3: Summary Details & Execution */}
        <div className="training-dashboard-summary">
          <div className="detail-panel">
            <h2>{view.selectedCommand ? view.selectedCommand.label : '지시 대기 중'}</h2>
            <SummaryList
              items={[
                { label: '조교 대상', value: view.selectedTarget?.label ?? '미지정' },
                { label: '조교 실행', value: view.selectedExecutor?.label ?? '미지정' },
                { label: '지원 조수', value: view.selectedAssistant?.label ?? '없음' },
                { label: '현재 날짜', value: `${view.statusSummary.month}월 ${view.statusSummary.week}주차 ${view.statusSummary.day}일` },
                { label: '조교 시간', value: timeSlotText(view.statusSummary.timeSlotLabel) },
                { label: '자극 쾌감', value: view.bufferSummary.stimulusTotal || '0' },
                { label: '능력치 획득', value: view.bufferSummary.paramUpTotal || '0' },
                { label: '훈련 소모치', value: view.bufferSummary.formattedBodyCostTotal || '없음' },
              ]}
            />
            <ActionRow compact>
              <button className="success-glow-btn" type="button" disabled={!view.selectedCommand} onClick={() => onAction({ type: 'training/execute' })}>
                조교 집행
              </button>
              <button
                className="warning-glow-btn"
                type="button"
                disabled={!view.selectedTarget && !view.selectedExecutor && !view.selectedAssistant && !view.selectedCommand}
                onClick={() => onAction({ type: 'training/cancelSelection' })}
              >
                선택 초기화
              </button>
              <button className="danger-glow-btn" type="button" disabled={!view.selectedAssistant} onClick={() => onAction({ type: 'training/selectAssistant' })}>
                조수 해제
              </button>
              <button className="danger-glow-btn" type="button" onClick={() => onAction({ type: 'training/cancel' })}>
                사무소 복귀
              </button>
            </ActionRow>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaveLoadScreen({ state, session, onAction }: ScreenProps) {
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


function RosterScreen({ catalog, state, onAction }: ScreenProps) {
  const view = buildRosterView(state, catalog);

  return (
    <section className="screen-panel roster-screen">
      <ScreenHeading eyebrow="사무소 명부" title="소속 여배우 프로필 관리" />
      
      <div className="roster-grid">
        {view.entries.map((entry) => (
          <div className={`roster-card ${entry.assistantEligible ? 'assistant-eligible' : ''} ${entry.retired ? 'retired' : ''} ${entry.deleted ? 'deleted' : ''}`} key={entry.characterId}>
            <div className="roster-card-header">
              <span className="roster-id">#{entry.characterId}</span>
              <h3 className="roster-name">{entry.displayName}</h3>
              <span className={`roster-badge ${entry.retired ? 'badge-retired' : entry.deleted ? 'badge-deleted' : entry.assistantEligible ? 'badge-assistant' : 'badge-normal'}`}>
                {entry.retired ? '은퇴함' : entry.deleted ? '제명됨' : entry.assistantEligible ? '조수 임명됨' : '여배우'}
              </span>
            </div>

            <div className="roster-card-body">
              <div className="roster-stat-row">
                <span className="stat-label">역할/소질</span>
                <span className="stat-value highlight">{entry.roleSummary || '없음'}</span>
              </div>
              <div className="roster-stat-row">
                <span className="stat-label">호칭/별명</span>
                <span className="stat-value">{entry.callName ?? '-'} ({entry.nickname ?? '-'})</span>
              </div>
              <div className="roster-stat-row">
                <span className="stat-label">1인칭 사용</span>
                <span className="stat-value">{entry.firstPerson ?? '-'}</span>
              </div>
              <div className="roster-stat-row">
                <span className="stat-label">활동 상태</span>
                <span className="stat-value">{entry.lifecycleSummary || '활동 대기'}</span>
              </div>
            </div>

            <div className="roster-card-actions">
              <button
                className={`roster-action-btn assistant ${entry.assistantEligible ? 'active' : ''}`}
                disabled={entry.deleted || entry.retired}
                type="button"
                onClick={() =>
                  onAction({
                    type: 'roster/setAssistantEligible',
                    characterId: entry.characterId,
                    assistantEligible: !entry.assistantEligible,
                  })
                }
              >
                {entry.assistantEligible ? '조수 해제' : '조수 지정'}
              </button>
              
              <button 
                className="roster-action-btn retire"
                disabled={entry.retired || entry.deleted} 
                type="button" 
                onClick={() => onAction({ type: 'roster/retireCharacter', characterId: entry.characterId })}
              >
                은퇴
              </button>
              
              <button 
                className="roster-action-btn delete"
                disabled={entry.deleted} 
                type="button" 
                onClick={() => onAction({ type: 'roster/deleteCharacter', characterId: entry.characterId })}
              >
                제명
              </button>
            </div>
          </div>
        ))}
      </div>

      <ActionRow>
        <button className="danger-glow-btn" type="button" onClick={() => onAction({ type: 'route/change', route: 'mainMenu' })}>
          사무소 복귀
        </button>
      </ActionRow>
    </section>
  );
}


function WardrobeScreen({ catalog, state, onAction }: ScreenProps) {
  const view = buildWardrobeView(state, catalog);

  return (
    <section className="screen-panel wardrobe-screen">
      <ScreenHeading eyebrow="사무소 드레스룸" title="의상실 및 코스튬 관리" />
      
      <div className="wardrobe-grid">
        {view.entries.map((entry) => {
          const clothingFlagId = Object.keys(entry.clothing).sort((left, right) => Number(left) - Number(right))[0];
          return (
            <div className="wardrobe-card glass-panel" key={entry.characterId}>
              <div className="wardrobe-card-header">
                <h3 className="wardrobe-name">{entry.label}</h3>
                <span className="wardrobe-info-tag">
                  보유 의상: {entry.clothingFlagCount}벌 | 탈의 활성화: {entry.availabilityFlagCount}개
                </span>
              </div>

              <div className="wardrobe-card-body">
                {clothingFlagId && (
                  <div className="clothing-toggle-section">
                    <button
                      className="clothing-toggle-btn"
                      type="button"
                      onClick={() => onAction({ type: 'wardrobe/toggleClothing', characterId: entry.characterId, flagId: clothingFlagId })}
                    >
                      입히기/벗기: {entry.clothingLabels[clothingFlagId] ?? clothingFlagId}
                    </button>
                  </div>
                )}

                {entry.costumeOptions.length > 0 && (
                  <div className="costumes-section">
                    <span className="section-subtitle">보유 코스튬 리스트</span>
                    <div className="costumes-chips-container">
                      {entry.costumeOptions.map((option) => (
                        <button
                          className="costume-chip-btn"
                          key={option.costumeId}
                          type="button"
                          disabled={!option.available}
                          onClick={() => onAction({ type: 'wardrobe/selectCostume', characterId: entry.characterId, costumeId: option.costumeId })}
                        >
                          {option.label} 착용
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ActionRow>
        <button className="danger-glow-btn" type="button" onClick={() => onAction({ type: 'wardrobe/cancel' })}>
          사무소 복귀
        </button>
      </ActionRow>
    </section>
  );
}


function VisitScreen({ state, session, onAction }: ScreenProps) {
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
  if (route === 'roster') return <RosterScreen {...props} />;
  if (route === 'wardrobe') return <WardrobeScreen {...props} />;
  if (route === 'shooting') return <ShootingScreen {...props} />;
  if (route === 'training') return <TrainingScreen {...props} />;
  if (route === 'visit') return <VisitScreen {...props} />;
  if (route === 'work') return <WorkScreen {...props} />;
  if (route === 'saveLoad') return <SaveLoadScreen {...props} />;
  return <UnknownRouteScreen {...props} />;
}
