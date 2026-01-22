import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import './BrothelScreen.css';

interface BrothelScreenProps {
  onBack: () => void;
}

function BrothelScreen({ onBack }: BrothelScreenProps) {
  const { ownedCharacters, money, addMoney, setCurrentCharacter } = useGameStore();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);

  const handleWork = (characterId: number) => {
    // 간단한 창관 업무 로직
    const earnings = Math.floor(Math.random() * 5000) + 3000; // 3000~8000엔
    addMoney(earnings);
  };

  if (ownedCharacters.length === 0) {
    return (
      <div className="brothel-screen">
        <div className="info-bar">
          <h2>창관 관리</h2>
          <div className="money-display">
            <span className="label">소지금:</span>
            <span className="value">₩{money.toLocaleString()}</span>
          </div>
        </div>
        <div className="game-message">
          <p>창관에 배치할 캐릭터가 없습니다.</p>
          <p>노예 시장에서 캐릭터를 구매하세요.</p>
        </div>
        <div className="brothel-actions">
          <button onClick={onBack}>돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="brothel-screen">
      <div className="info-bar">
        <h2>창관 관리</h2>
        <div className="money-display">
          <span className="label">소지금:</span>
          <span className="value">₩{money.toLocaleString()}</span>
        </div>
      </div>

      <div className="brothel-content">
        <div className="character-work-list">
          <h3>캐릭터 배치</h3>
          {ownedCharacters.map((char) => (
            <div key={char.id} className="work-card">
              <div className="char-info-work">
                <div className="char-avatar-small">{char.name[0]}</div>
                <div className="char-name-work">{char.name}</div>
              </div>
              <button
                className="work-button"
                onClick={() => handleWork(char.id)}
              >
                업무 시작
              </button>
            </div>
          ))}
        </div>

        <div className="brothel-info">
          <h3>창관 정보</h3>
          <div className="info-box">
            <p>캐릭터를 창관에 배치하여 수익을 얻을 수 있습니다.</p>
            <p>업무 수익: 3,000 ~ 8,000엔</p>
          </div>
        </div>
      </div>

      <div className="brothel-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default BrothelScreen;
