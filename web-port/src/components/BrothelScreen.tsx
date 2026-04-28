import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { runBrothelShift } from '../gameplay/brothel';
import './BrothelScreen.css';

interface BrothelScreenProps {
  onBack: () => void;
}

function BrothelScreen({ onBack }: BrothelScreenProps) {
  const {
    ownedCharacters,
    money,
    economy,
    addMoney,
    addReputation,
    addWeeklyStat,
    updateCharacter,
    setCurrentCharacter
  } = useGameStore();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(false);

  const handleWork = () => {
    // 실제 brothel.ts 호출
    const result = runBrothelShift(ownedCharacters, economy.reputation);

    // 결과 반영
    addMoney(result.totalIncome);
    addReputation(result.reputationChange);
    addWeeklyStat('brothelCustomers', result.results.length);
    addWeeklyStat('income', result.totalIncome);

    // 각 캐릭터의 condition 업데이트
    result.results.forEach(serviceResult => {
      if (serviceResult.newCondition) {
        updateCharacter(
          serviceResult.match.character.id,
          { condition: serviceResult.newCondition }
        );
      }
    });

    // UI 피드백
    const allMessages = result.results.flatMap(r => r.messages);
    setMessages(allMessages);
    setTotalIncome(result.totalIncome);
    setHasRun(true);

    console.log('[BROTHEL] 영업 완료:', {
      customers: result.results.length,
      income: result.totalIncome,
      reputation: result.reputationChange,
    });
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
                <div className="char-name-work">
                  {char.name}
                  {char.assignment === 'brothel' && (
                    <span style={{ marginLeft: '0.5rem', color: '#4CAF50' }}>●</span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                HP: {char.condition.hp} / MP: {char.condition.mp}
              </div>
            </div>
          ))}
        </div>

        <div className="brothel-info">
          <h3>영업 정보</h3>
          <div className="info-box">
            <p>평판: {economy.reputation}</p>
            <p>창관 배치 캐릭터: {ownedCharacters.filter(c => c.assignment === 'brothel').length}명</p>
            {!hasRun && (
              <p style={{ color: '#888', fontSize: '0.9rem' }}>
                "영업 시작" 버튼을 눌러 손님을 받으세요.
              </p>
            )}
          </div>

          {hasRun && messages.length > 0 && (
            <div className="info-box" style={{ marginTop: '1rem', background: '#1a1a1a' }}>
              <h4 style={{ color: '#4CAF50', marginBottom: '0.5rem' }}>
                영업 결과 (총 수입: ₩{totalIncome.toLocaleString()})
              </h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((msg, idx) => (
                  <p key={idx} style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>{msg}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="brothel-actions">
        <button
          className="work-button"
          onClick={handleWork}
          disabled={ownedCharacters.filter(c => c.assignment === 'brothel').length === 0}
        >
          영업 시작
        </button>
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default BrothelScreen;
