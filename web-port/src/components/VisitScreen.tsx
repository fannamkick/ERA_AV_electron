import { useGameStore } from '../stores/gameStore';
import './VisitScreen.css';

interface VisitScreenProps {
  onBack: () => void;
}

function VisitScreen({ onBack }: VisitScreenProps) {
  const { ownedCharacters } = useGameStore();

  const handleVisit = (characterId: number) => {
    const character = ownedCharacters.find(c => c.id === characterId);
    if (character) {
      // 친밀도 상승 로직 (추후 구현)
    }
  };

  if (ownedCharacters.length === 0) {
    return (
      <div className="visit-screen">
        <div className="info-bar">
          <h2>방문</h2>
        </div>
        <div className="game-message">
          <p>방문할 수 있는 캐릭터가 없습니다.</p>
        </div>
        <div className="visit-actions">
          <button onClick={onBack}>돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="visit-screen">
      <div className="info-bar">
        <h2>방문</h2>
        <p className="info-desc">캐릭터를 선택하여 방문하세요</p>
      </div>

      <div className="visit-grid-container">
        <div className="visit-grid">
          {ownedCharacters.map((char) => (
            <div key={char.id} className="visit-card">
              <div className="char-avatar">{char.name[0]}</div>
              <div className="char-details">
                <div className="char-name">{char.name}</div>
                {char.callName && (
                  <div className="char-callname">{char.callName}</div>
                )}
              </div>
              <button
                className="visit-button"
                onClick={() => handleVisit(char.id)}
              >
                방문하기
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="visit-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default VisitScreen;
