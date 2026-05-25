import { useState } from 'react';
import { buildRosterView } from '../../features/roster';
import { CharacterStatusDetail } from '../CharacterStatusDetail';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ScreenHeading } from '../ScreenPrimitives';

export function RosterScreen({ catalog, state, onAction }: ScreenProps) {
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
