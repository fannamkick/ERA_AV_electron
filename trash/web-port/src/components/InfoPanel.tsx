import { useGameStore } from '../stores/gameStore';
import './InfoPanel.css';

function InfoPanel() {
  const { day, money, ownedCharacters } = useGameStore();

  // 통계 계산
  const avgAge = ownedCharacters.length > 0
    ? Math.round(ownedCharacters.reduce((sum, c) => sum + (c.cflag[41] || 20), 0) / ownedCharacters.length)
    : 0;

  const avgCharm = ownedCharacters.length > 0
    ? Math.round(ownedCharacters.reduce((sum, c) => sum + (c.base[31] || 0), 0) / ownedCharacters.length)
    : 0;

  const virginCount = ownedCharacters.filter(c => c.talent[0] === 1).length;
  const avActressCount = ownedCharacters.filter(c => c.talent[400] === 1 || c.talent[401] === 1).length;

  return (
    <div className="info-panel">
      <div className="info-section">
        <h3>게임 정보</h3>
        <div className="info-list">
          <div className="info-row">
            <span className="label">경과 일수:</span>
            <span className="value">{day}일</span>
          </div>
          <div className="info-row">
            <span className="label">소지금:</span>
            <span className="value">₩{money.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>보유 캐릭터</h3>
        <div className="character-count">
          <span className="count-value">{ownedCharacters.length}</span>
          <span className="count-label">명</span>
        </div>

        {ownedCharacters.length > 0 && (
          <div className="info-list">
            <div className="info-row">
              <span className="label">평균 나이:</span>
              <span className="value">{avgAge}세</span>
            </div>
            <div className="info-row">
              <span className="label">평균 매력:</span>
              <span className="value">{avgCharm}</span>
            </div>
            <div className="info-row">
              <span className="label">처녀:</span>
              <span className="value">{virginCount}명</span>
            </div>
            <div className="info-row">
              <span className="label">AV배우:</span>
              <span className="value">{avActressCount}명</span>
            </div>
          </div>
        )}

        {ownedCharacters.length > 0 ? (
          <div className="character-list-simple">
            {ownedCharacters.slice(0, 10).map((char) => (
              <div key={char.id} className="char-item">
                {char.name} ({char.cflag[41] || 20}세)
              </div>
            ))}
            {ownedCharacters.length > 10 && (
              <div className="char-item more">외 {ownedCharacters.length - 10}명</div>
            )}
          </div>
        ) : (
          <div className="char-item">보유한 캐릭터가 없습니다</div>
        )}
      </div>
    </div>
  );
}

export default InfoPanel;
