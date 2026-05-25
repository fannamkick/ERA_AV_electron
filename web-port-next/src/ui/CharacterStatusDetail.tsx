import { useState } from 'react';
import type { GameCatalog } from '../catalog/types';
import type { CharacterState } from '../domains/people/types';

type CharacterStatusDetailProps = {
  readonly chara: CharacterState;
  readonly catalog: GameCatalog;
};

export function CharacterStatusDetail({ chara, catalog }: CharacterStatusDetailProps) {
  const [activeTab, setActiveTab] = useState<'abl' | 'talent' | 'exp'>('abl');

  const renderAbl = () => {
    const items = Object.entries(chara.attributes.abilities).map(([key, value]) => {
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
    const badges = Object.entries(chara.attributes.traits)
      .filter(([, val]) => val === true || (typeof val === 'number' && val !== 0))
      .map(([key]) => {
        const label = catalog.talents[key]?.label ?? `소질 ${key}`;
        return (
          <span className="status-talent-badge" key={`talent-${key}`} style={{ display: 'inline-block', backgroundColor: 'rgba(255, 0, 128, 0.15)', border: '1px solid rgba(255, 0, 128, 0.4)', borderRadius: '4px', padding: '3px 8px', margin: '4px', fontSize: '0.85em', color: '#ff0080' }}>
            {label}
          </span>
        );
      });
    return badges.length > 0 ? <div className="status-talent-flex" style={{ display: 'flex', flexWrap: 'wrap', padding: '4px 0' }}>{badges}</div> : <p className="status-empty-text" style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: '20px 0' }}>보유한 소질이 없습니다.</p>;
  };

  const renderExp = () => {
    const items = Object.entries(chara.attributes.experiences)
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
