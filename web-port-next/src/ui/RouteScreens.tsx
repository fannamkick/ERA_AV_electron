import type { GameCatalog } from '../catalog/types';
import { useState } from 'react';
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

function CharacterStatusDetail({ chara, catalog }: { chara: any; catalog: any }) {
  const [activeTab, setActiveTab] = useState<'abl' | 'talent' | 'exp'>('abl');

  if (!chara) return <div className="status-empty">캐릭터를 선택해 주세요.</div>;

  const renderAbl = () => {
    const abilities = chara.attributes?.abilities ?? {};
    const items = Object.entries(abilities).map(([key, value]) => {
      const label = catalog.abilities[key]?.label ?? `능력 ${key}`;
      return (
        <div className="status-detail-row" key={`abl-${key}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="status-label" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
          <span className="status-value highlight" style={{ color: '#00f0ff', fontWeight: 'bold' }}>Lv {value}</span>
        </div>
      );
    });
    return items.length > 0 ? <div className="status-tab-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>{items}</div> : <p className="status-empty-text" style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: '20px 0' }}>보유한 능력이 없습니다.</p>;
  };

  const renderTalents = () => {
    const traits = chara.attributes?.traits ?? {};
    const badges = Object.entries(traits)
      .filter(([, val]) => val === true || (typeof val === 'number' && val !== 0))
      .map(([key]) => {
        const label = catalog.traits[key]?.label ?? `소질 ${key}`;
        return (
          <span className="status-talent-badge" key={`talent-${key}`} style={{ display: 'inline-block', backgroundColor: 'rgba(255, 0, 128, 0.15)', border: '1px solid rgba(255, 0, 128, 0.4)', borderRadius: '4px', padding: '3px 8px', margin: '4px', fontSize: '0.85em', color: '#ff0080' }}>
            {label}
          </span>
        );
      });
    return badges.length > 0 ? <div className="status-talent-flex" style={{ display: 'flex', flexWrap: 'wrap', padding: '4px 0' }}>{badges}</div> : <p className="status-empty-text" style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: '20px 0' }}>보유한 소질이 없습니다.</p>;
  };

  const renderExp = () => {
    const experiences = chara.attributes?.experiences ?? {};
    const items = Object.entries(experiences)
      .filter(([, val]) => Number(val) > 0)
      .map(([key, value]) => {
        const label = catalog.experiences[key]?.label ?? `경험 ${key}`;
        return (
          <div className="status-detail-row" key={`exp-${key}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="status-label" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
            <span className="status-value" style={{ color: '#ffb700', fontWeight: 'bold' }}>{value} 회</span>
          </div>
        );
      });
    return items.length > 0 ? <div className="status-tab-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>{items}</div> : <p className="status-empty-text" style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: '20px 0' }}>경험이 전무합니다.</p>;
  };

  return (
    <div className="character-status-detail-card glass-panel" style={{ backgroundColor: 'rgba(20,20,30,0.85)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px', marginTop: '12px' }}>
      <div className="status-detail-header" style={{ marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2em' }}>{chara.identity.displayName} 상세 프로필</h3>
        <p className="call-name-nick" style={{ margin: '4px 0 0 0', fontSize: '0.85em', color: 'rgba(255,255,255,0.5)' }}>
          {chara.identity.callName ? `호칭: ${chara.identity.callName}` : ''} 
          {chara.identity.nickname ? ` / 별명: ${chara.identity.nickname}` : ''}
        </p>
      </div>
      <div className="status-tabs-row" style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        <button
          className={`status-tab-btn ${activeTab === 'abl' ? 'active' : ''}`}
          style={{ flex: 1, padding: '6px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', backgroundColor: activeTab === 'abl' ? '#00f0ff' : 'transparent', color: activeTab === 'abl' ? '#000' : '#fff', fontWeight: 'bold', transition: 'all 0.2s' }}
          type="button"
          onClick={() => setActiveTab('abl')}
        >
          능력 (ABL)
        </button>
        <button
          className={`status-tab-btn ${activeTab === 'talent' ? 'active' : ''}`}
          style={{ flex: 1, padding: '6px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', backgroundColor: activeTab === 'talent' ? '#ff0080' : 'transparent', color: activeTab === 'talent' ? '#000' : '#fff', fontWeight: 'bold', transition: 'all 0.2s' }}
          type="button"
          onClick={() => setActiveTab('talent')}
        >
          소질 (TALENT)
        </button>
        <button
          className={`status-tab-btn ${activeTab === 'exp' ? 'active' : ''}`}
          style={{ flex: 1, padding: '6px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', backgroundColor: activeTab === 'exp' ? '#ffb700' : 'transparent', color: activeTab === 'exp' ? '#000' : '#fff', fontWeight: 'bold', transition: 'all 0.2s' }}
          type="button"
          onClick={() => setActiveTab('exp')}
        >
          경험 (EXP)
        </button>
      </div>
      <div className="status-tab-content" style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
        {activeTab === 'abl' && renderAbl()}
        {activeTab === 'talent' && renderTalents()}
        {activeTab === 'exp' && renderExp()}
      </div>
    </div>
  );
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
  const [roomEntered, setRoomEntered] = useState(false);

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

  // --- 단계 A: 조교 대기실 (Prep Screen - 원작 고증 사전 인물 셋업 단계) ---
  if (!roomEntered) {
    return (
      <section className="screen-panel training-screen-panel">
        <ScreenHeading eyebrow="특별 조교 대기실" title="조교 인원 편성 및 상태 상세 조회" />
        
        <div className="training-dashboard-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
          {/* 좌측: 인원 매칭 및 셋업 */}
          <div className="training-dashboard-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 슬롯 1: 조교 대상 여배우 */}
            <div className={`slot-card target ${view.selectedTarget ? 'active' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px' }}>
              <div className="slot-badge" style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>조교 대상 여배우 지정</div>
              <div className="slot-selector-select-wrapper">
                <select
                  className="compact-slot-select"
                  style={{ width: '100%', padding: '6px', backgroundColor: '#101015', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }}
                  value={view.selectedTargetId ?? ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      onAction({ type: 'training/selectTarget', characterId: e.target.value });
                    }
                  }}
                >
                  <option value="" disabled>-- 여배우 지정 --</option>
                  {view.participants
                    .filter((p) => {
                      const chara = state.people.characters[p.characterId];
                      return chara && !chara.roles.includes('trainer') && p.characterId !== view.selectedAssistantId;
                    })
                    .map((participant) => (
                      <option key={`target-sel:${participant.characterId}`} value={participant.characterId} disabled={!participant.available}>
                        {participant.label} {!participant.available ? '(불가)' : ''}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* 슬롯 2: 조교 실행자 */}
            <div className={`slot-card executor ${view.selectedExecutor ? 'active' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px' }}>
              <div className="slot-badge" style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>조교 실행자 (조교사) 지정</div>
              <div className="slot-selector-select-wrapper">
                <select
                  className="compact-slot-select"
                  style={{ width: '100%', padding: '6px', backgroundColor: '#101015', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }}
                  value={view.selectedExecutorId ?? ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      onAction({ type: 'training/selectExecutor', characterId: e.target.value });
                    }
                  }}
                >
                  <option value="" disabled>-- 조교사 지정 --</option>
                  {view.participants
                    .filter((p) => {
                      const chara = state.people.characters[p.characterId];
                      return chara && (chara.roles.includes('trainer') || chara.roles.includes('assistant'));
                    })
                    .map((participant) => (
                      <option key={`exec-sel:${participant.characterId}`} value={participant.characterId}>
                        {participant.label}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* 슬롯 3: 지원 조수 */}
            <div className={`slot-card assistant ${view.selectedAssistant ? 'active' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px' }}>
              <div className="slot-badge" style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>훈련 지원 조수 지정</div>
              <div className="slot-selector-select-wrapper">
                <select
                  className="compact-slot-select"
                  style={{ width: '100%', padding: '6px', backgroundColor: '#101015', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }}
                  value={view.selectedAssistantId ?? ''}
                  onChange={(e) => {
                    onAction({ type: 'training/selectAssistant', characterId: e.target.value || undefined });
                  }}
                >
                  <option value="">-- 조수 없음 --</option>
                  {view.participants
                    .filter((p) => {
                      const chara = state.people.characters[p.characterId];
                      return chara && 
                        chara.roles.includes('assistant') && 
                        p.characterId !== view.selectedTargetId && 
                        p.characterId !== view.selectedExecutorId &&
                        p.characterId !== 'character:0' && p.characterId !== '0';
                    })
                    .map((participant) => (
                      <option key={`asst-sel:${participant.characterId}`} value={participant.characterId} disabled={!participant.available}>
                        {participant.label}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* 진입 제어 버튼 액션 */}
            <div className="prep-actions" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="success-glow-btn"
                style={{ width: '100%', padding: '12px', fontWeight: 'bold', fontSize: '1.1em', cursor: 'pointer' }}
                disabled={!view.selectedTarget || !view.selectedExecutor}
                type="button"
                onClick={() => setRoomEntered(true)}
              >
                조교실 입장 (EVENTTRAIN 개시)
              </button>
              <button
                className="danger-glow-btn"
                style={{ width: '100%', padding: '8px', cursor: 'pointer' }}
                type="button"
                onClick={() => onAction({ type: 'training/cancel' })}
              >
                사무소 복귀
              </button>
            </div>
          </div>

          {/* 우측: 상세 프로필 상세 보기 */}
          <div className="training-prep-details">
            {targetChara ? (
              <CharacterStatusDetail chara={targetChara} catalog={catalog} />
            ) : (
              <div className="status-empty glass-panel" style={{ backgroundColor: 'rgba(20,20,30,0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '1.1em' }}>
                왼쪽에서 조교 대상 여배우를 선택하시면<br />여배우의 상세 소질과 능력이 이곳에 브리핑됩니다.
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // --- 단계 B: 본격 조교실 (Active Screen - 조교 도중 인물 변경 완전 불가) ---
  return (
    <section className="screen-panel training-screen-panel">
      <ScreenHeading eyebrow="특별 조교실 (집행 중)" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />

      {targetDialogue && (
        <div className="dialogue-bubble">
          <div className="dialogue-speaker">{view.selectedTarget?.label}</div>
          <div className="dialogue-text" style={{ whiteSpace: 'pre-wrap' }}>“{targetDialogue}”</div>
        </div>
      )}

      <div className="training-dashboard-layout">
        {/* Column 1: Actress Slots (인물 고정 상태 - 드롭다운을 원천 삭제하여 조교 중 인물 변경 불가 보장) */}
        <div className="training-dashboard-sidebar">
          {/* 슬롯 A: 조교 대상 여배우 */}
          <div className="slot-card target active" style={{ border: '2px solid #ff0080' }}>
            <div className="slot-badge" style={{ backgroundColor: '#ff0080', color: '#fff' }}>조교 대상 (고정됨)</div>
            <div className="slot-details">
              <span className="slot-name" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{view.selectedTarget?.label}</span>
              <div className="progress-track-wrapper" style={{ marginTop: '8px' }}>
                <div className="progress-label">체력: {staminaCur} / {staminaMax}</div>
                <div className="progress-track" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                  <div className="progress-fill stamina" style={{ width: `${staminaPct}%`, height: '100%', backgroundColor: '#ff0055', borderRadius: '4px' }} />
                </div>
              </div>
              <div className="progress-track-wrapper" style={{ marginTop: '8px' }}>
                <div className="progress-label">기력: {energyCur} / {energyMax}</div>
                <div className="progress-track" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                  <div className="progress-fill energy" style={{ width: `${energyPct}%`, height: '100%', backgroundColor: '#ffb700', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 슬롯 B: 조교 실행자 */}
          <div className="slot-card executor active">
            <div className="slot-badge">조교사 (고정됨)</div>
            <div className="slot-details">
              <span className="slot-name">{view.selectedExecutor?.label}</span>
            </div>
          </div>

          {/* 슬롯 C: 지원 조수 */}
          <div className="slot-card assistant active">
            <div className="slot-badge">지원 조수 (고정됨)</div>
            <div className="slot-details">
              <span className="slot-name">{view.selectedAssistant?.label ?? '조수 없음'}</span>
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
                { label: '조교 실행', value: view.selectedExecutor?.label ?? '미정' },
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
                disabled={!view.selectedCommand}
                onClick={() => onAction({ type: 'training/cancelSelection' })}
              >
                선택 초기화
              </button>
              <button
                className="danger-glow-btn"
                type="button"
                onClick={() => {
                  setRoomEntered(false);
                  onAction({ type: 'training/cancel' });
                }}
              >
                조교 종료 및 퇴실
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
  const [selectedCharaId, setSelectedCharaId] = useState<string | null>(null);

  const selectedChara = selectedCharaId ? state.people.characters[selectedCharaId] : null;

  return (
    <section className="screen-panel roster-screen">
      <ScreenHeading eyebrow="사무소 명부" title="소속 여배우 프로필 관리" />
      
      {selectedChara && (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="modal-content" style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
            <CharacterStatusDetail chara={selectedChara} catalog={catalog} />
            <button 
              className="danger-glow-btn" 
              style={{ position: 'absolute', top: '24px', right: '24px', padding: '4px 10px', cursor: 'pointer', zIndex: 1010 }} 
              onClick={() => setSelectedCharaId(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      
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

            <div className="roster-card-actions" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <button
                className="roster-action-btn status-detail"
                style={{ flex: 1, backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.4)', color: '#00f0ff', borderRadius: '4px', padding: '6px', cursor: 'pointer', fontSize: '0.85em' }}
                onClick={() => setSelectedCharaId(entry.characterId)}
              >
                상세 정보
              </button>
              
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
