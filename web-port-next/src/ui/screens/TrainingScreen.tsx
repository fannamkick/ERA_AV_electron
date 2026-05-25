import { useState } from 'react';
import { buildTrainingView } from '../../features/training';
import { CharacterStatusDetail } from '../CharacterStatusDetail';
import { money, playerFacingReason, timeSlotText } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function TrainingScreen({ catalog, state, session, onAction }: ScreenProps) {
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
