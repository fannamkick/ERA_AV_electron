import { useGameStore } from '../stores/gameStore';
import talentsData from '../data/talents.json';
import abilitiesData from '../data/abilities.json';
import './CharacterSelectScreen.css';

interface CharacterSelectScreenProps {
  selectedId: number | null;
  onSelect: (characterId: number) => void;
  onBack: () => void;
}

function CharacterSelectScreen({ selectedId, onSelect, onBack }: CharacterSelectScreenProps) {
  const { ownedCharacters } = useGameStore();

  if (ownedCharacters.length === 0) {
    return (
      <div className="character-select-screen">
        <div className="game-message">
          <p>보유한 캐릭터가 없습니다.</p>
          <p>배우 모집에서 캐릭터를 영입하세요.</p>
        </div>
      </div>
    );
  }

  const selectedCharacter = selectedId ? ownedCharacters.find(c => c.id === selectedId) : null;

  return (
    <div className="character-select-screen">
      {selectedCharacter ? (
        <div className="character-info-display">
          <div className="char-header">
            <h2>{selectedCharacter.name}</h2>
            {selectedCharacter.callName && (
              <span className="char-callname">({selectedCharacter.callName})</span>
            )}
          </div>

          <div className="char-info-section">
            <h3>기본 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">나이:</span>
                <span className="value">{selectedCharacter.cflag?.[41] || '??'}세</span>
              </div>
              <div className="info-item">
                <span className="label">호감도:</span>
                <span className="value">{selectedCharacter.cflag?.[16] || 0}</span>
              </div>
              <div className="info-item">
                <span className="label">가슴:</span>
                <span className="value">컵 {selectedCharacter.cflag?.[170] || '?'}</span>
              </div>
              <div className="info-item">
                <span className="label">상태:</span>
                <span className="value">
                  {selectedCharacter.isAssistant ? '조수' : '대기 중'}
                </span>
              </div>
            </div>
          </div>

          <div className="char-info-section">
            <h3>특성</h3>
            <div className="talents-display">
              {Object.keys(selectedCharacter.talent).length > 0 ? (
                Object.keys(selectedCharacter.talent).map((key) => {
                  const talentId = parseInt(key);
                  const talentName = talentsData[talentId as keyof typeof talentsData];
                  return (
                    <span key={talentId} className="talent-tag">
                      {talentName || `특성${talentId}`}
                    </span>
                  );
                })
              ) : (
                <p style={{ color: '#666' }}>특성 없음</p>
              )}
            </div>
          </div>

          <div className="char-info-section">
            <h3>주요 능력치</h3>
            <div className="abilities-display">
              {Object.entries(selectedCharacter.base).slice(0, 6).map(([key, value]) => {
                const abilityId = parseInt(key);
                const abilityName = abilitiesData[abilityId as keyof typeof abilitiesData];
                return (
                  <div key={key} className="ability-row">
                    <span className="ability-name">
                      {abilityName || `능력${key}`}
                    </span>
                    <span className="ability-value">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        <div className="game-message">
          <h3>조교할 캐릭터를 선택하세요</h3>
          <p>오른쪽 패널에서 캐릭터를 선택하세요.</p>
        </div>
      )}
    </div>
  );
}

export { CharacterSelectScreen };
export default CharacterSelectScreen;
