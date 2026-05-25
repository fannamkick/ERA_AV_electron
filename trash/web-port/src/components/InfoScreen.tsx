import { useGameStore } from '../stores/gameStore';
import './InfoScreen.css';

interface InfoScreenProps {
  onBack: () => void;
}

function InfoScreen({ onBack }: InfoScreenProps) {
  const { day, money, ownedCharacters, availableCharacters, items } = useGameStore();

  const totalCharacters = availableCharacters.length;
  const ownedCount = ownedCharacters.length;
  const itemCount = Object.keys(items).length;

  return (
    <div className="info-screen">
      <div className="info-bar">
        <h2>게임 정보</h2>
      </div>

      <div className="info-content">
        <div className="info-section">
          <h3>기본 정보</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">경과 일수</span>
              <span className="value">{day}일</span>
            </div>
            <div className="info-item">
              <span className="label">소지금</span>
              <span className="value">₩{money.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <span className="label">보유 캐릭터</span>
              <span className="value">{ownedCount}명</span>
            </div>
            <div className="info-item">
              <span className="label">전체 캐릭터</span>
              <span className="value">{totalCharacters}명</span>
            </div>
            <div className="info-item">
              <span className="label">보유 아이템</span>
              <span className="value">{itemCount}개</span>
            </div>
            <div className="info-item">
              <span className="label">수집률</span>
              <span className="value">
                {totalCharacters > 0
                  ? `${((ownedCount / totalCharacters) * 100).toFixed(1)}%`
                  : '0%'}
              </span>
            </div>
          </div>
        </div>

        {ownedCharacters.length > 0 && (
          <div className="info-section">
            <h3>보유 캐릭터 목록</h3>
            <div className="character-list">
              {ownedCharacters.map((char, idx) => (
                <div key={char.id} className="char-list-item">
                  <span className="char-number">{idx + 1}.</span>
                  <span className="char-name">{char.name}</span>
                  {char.callName && (
                    <span className="char-callname">({char.callName})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>게임 설명</h3>
          <div className="info-description">
            <p>조교사무소를 운영하는 게임입니다.</p>
            <ul>
              <li>노예 시장에서 캐릭터를 구매하세요</li>
              <li>조교를 통해 캐릭터를 육성하세요</li>
              <li>창관이나 AV 촬영으로 수익을 얻으세요</li>
              <li>상점에서 필요한 아이템을 구매하세요</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="info-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default InfoScreen;
