import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import './DebugMenu.css';

interface DebugMenuProps {
  onBack: () => void;
}

function DebugMenu({ onBack }: DebugMenuProps) {
  const {
    day,
    time,
    money,
    ownedCharacters,
    addMoney,
    nextDay,
    setCurrentCharacter,
    updateCharacter,
    flags,
    items,
    buyItem
  } = useGameStore();

  const [selectedCharId, setSelectedCharId] = useState<number | null>(null);
  const [moneyInput, setMoneyInput] = useState('10000');
  const [abilityId, setAbilityId] = useState('0');
  const [abilityValue, setAbilityValue] = useState('1000');
  const [flagId, setFlagId] = useState('0');
  const [flagValue, setFlagValue] = useState('1');

  const selectedChar = selectedCharId ? ownedCharacters.find(c => c.id === selectedCharId) : null;

  // 소지금 조작
  const handleAddMoney = () => {
    const amount = parseInt(moneyInput);
    if (!isNaN(amount)) {
      addMoney(amount);
    }
  };

  // 날짜 조작
  const handleAddDay = (days: number) => {
    for (let i = 0; i < days; i++) {
      nextDay();
    }
  };

  // 캐릭터 능력치 조작
  const handleSetAbility = () => {
    if (!selectedChar) return;

    const id = parseInt(abilityId);
    const value = parseInt(abilityValue);

    if (!isNaN(id) && !isNaN(value)) {
      updateCharacter(selectedChar.id, {
        base: {
          ...selectedChar.base,
          [id]: value
        },
        abl: {
          ...selectedChar.abl,
          [id]: value
        }
      });
    }
  };

  // 호감도 조작
  const handleSetFavorability = (value: number) => {
    if (!selectedChar) return;

    updateCharacter(selectedChar.id, {
      cflag: {
        ...selectedChar.cflag,
        16: value
      }
    });
  };

  // 처녀/동정 상태 변경
  const handleToggleVirginity = () => {
    if (!selectedChar) return;

    const hasVirginity = selectedChar.talent[0] === 1;
    const newTalents = { ...selectedChar.talent };

    if (hasVirginity) {
      delete newTalents[0];
    } else {
      newTalents[0] = 1;
    }

    updateCharacter(selectedChar.id, { talent: newTalents });
  };

  // 특성 추가
  const handleAddTalent = (talentId: number) => {
    if (!selectedChar) return;

    updateCharacter(selectedChar.id, {
      talent: {
        ...selectedChar.talent,
        [talentId]: 1
      }
    });
  };

  // 플래그 설정
  const handleSetFlag = () => {
    const store = useGameStore.getState();
    const id = parseInt(flagId);
    const value = parseInt(flagValue);

    if (!isNaN(id) && !isNaN(value)) {
      store.flags[id] = value;
    }
  };

  return (
    <div className="debug-menu">
      <h2>🛠️ 디버그 메뉴</h2>

      {/* 소지금 조작 */}
      <section className="debug-section">
        <h3>💰 소지금 조작</h3>
        <div className="debug-control">
          <span>현재 소지금: ₩{money.toLocaleString()}</span>
          <div className="input-group">
            <input
              type="number"
              value={moneyInput}
              onChange={(e) => setMoneyInput(e.target.value)}
              placeholder="금액"
            />
            <button onClick={handleAddMoney}>추가</button>
          </div>
          <div className="quick-buttons">
            <button onClick={() => { setMoneyInput('10000'); addMoney(10000); }}>+10,000</button>
            <button onClick={() => { setMoneyInput('100000'); addMoney(100000); }}>+100,000</button>
            <button onClick={() => { setMoneyInput('1000000'); addMoney(1000000); }}>+1,000,000</button>
            <button onClick={() => addMoney(-money)}>소지금 0으로</button>
          </div>
        </div>
      </section>

      {/* 시간/날짜 조작 */}
      <section className="debug-section">
        <h3>📅 시간/날짜 조작</h3>
        <div className="debug-control">
          <span>현재: {day}일차 ({time === 0 ? '오전' : '오후'})</span>
          <div className="quick-buttons">
            <button onClick={() => handleAddDay(1)}>+1일</button>
            <button onClick={() => handleAddDay(7)}>+7일</button>
            <button onClick={() => handleAddDay(30)}>+30일</button>
          </div>
        </div>
      </section>

      {/* 캐릭터 선택 */}
      <section className="debug-section">
        <h3>👤 캐릭터 선택</h3>
        <select
          value={selectedCharId || ''}
          onChange={(e) => setSelectedCharId(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">캐릭터 선택...</option>
          {ownedCharacters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name} (ID: {char.id})
            </option>
          ))}
        </select>
      </section>

      {selectedChar && (
        <>
          {/* 호감도 조작 */}
          <section className="debug-section">
            <h3>💕 호감도 조작</h3>
            <div className="debug-control">
              <span>현재 호감도: {selectedChar.cflag?.[16] || 0}</span>
              <div className="quick-buttons">
                <button onClick={() => handleSetFavorability(0)}>0 (무관심)</button>
                <button onClick={() => handleSetFavorability(500)}>500 (호의)</button>
                <button onClick={() => handleSetFavorability(1000)}>1000 (연애)</button>
                <button onClick={() => handleSetFavorability(2000)}>2000 (애정)</button>
              </div>
            </div>
          </section>

          {/* 능력치 조작 */}
          <section className="debug-section">
            <h3>📊 능력치 조작</h3>
            <div className="debug-control">
              <div className="input-group">
                <select value={abilityId} onChange={(e) => setAbilityId(e.target.value)}>
                  <option value="0">C쾌감 (0)</option>
                  <option value="1">B쾌감 (1)</option>
                  <option value="2">V쾌감 (2)</option>
                  <option value="3">A쾌감 (3)</option>
                  <option value="9">외모 (9)</option>
                  <option value="11">순종 (11)</option>
                  <option value="12">기교 (12)</option>
                  <option value="13">봉사정신 (13)</option>
                  <option value="20">창녀 (20)</option>
                  <option value="21">야외플 (21)</option>
                  <option value="22">마조 (22)</option>
                </select>
                <input
                  type="number"
                  value={abilityValue}
                  onChange={(e) => setAbilityValue(e.target.value)}
                  placeholder="값"
                />
                <button onClick={handleSetAbility}>설정</button>
              </div>
              <div className="quick-buttons">
                <button onClick={() => { setAbilityValue('5000'); handleSetAbility(); }}>MAX (5000)</button>
                <button onClick={() => { setAbilityValue('0'); handleSetAbility(); }}>0으로</button>
              </div>
            </div>
          </section>

          {/* 특성 조작 */}
          <section className="debug-section">
            <h3>✨ 특성 조작</h3>
            <div className="debug-control">
              <div className="quick-buttons">
                <button
                  onClick={handleToggleVirginity}
                  className={selectedChar.talent[0] ? 'active' : ''}
                >
                  처녀 {selectedChar.talent[0] ? '✓' : '✗'}
                </button>
                <button onClick={() => handleAddTalent(10)}>겁쟁이 추가</button>
                <button onClick={() => handleAddTalent(16)}>활발함 추가</button>
                <button onClick={() => handleAddTalent(109)}>빈유 추가</button>
                <button onClick={() => handleAddTalent(110)}>거유 추가</button>
                <button onClick={() => handleAddTalent(50)}>소질있음 추가</button>
              </div>
            </div>
          </section>

          {/* 신체 수치 조작 */}
          <section className="debug-section">
            <h3>🔢 신체 수치</h3>
            <div className="debug-control">
              <div className="quick-buttons">
                <button onClick={() => updateCharacter(selectedChar.id, {
                  cflag: { ...selectedChar.cflag, 41: 18 }
                })}>나이: 18세</button>
                <button onClick={() => updateCharacter(selectedChar.id, {
                  cflag: { ...selectedChar.cflag, 170: 1 }
                })}>가슴: A컵</button>
                <button onClick={() => updateCharacter(selectedChar.id, {
                  cflag: { ...selectedChar.cflag, 170: 5 }
                })}>가슴: E컵</button>
                <button onClick={() => updateCharacter(selectedChar.id, {
                  cflag: { ...selectedChar.cflag, 170: 7 }
                })}>가슴: G컵</button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 플래그 조작 */}
      <section className="debug-section">
        <h3>🚩 플래그 조작</h3>
        <div className="debug-control">
          <div className="input-group">
            <input
              type="number"
              value={flagId}
              onChange={(e) => setFlagId(e.target.value)}
              placeholder="플래그 ID"
            />
            <input
              type="number"
              value={flagValue}
              onChange={(e) => setFlagValue(e.target.value)}
              placeholder="값"
            />
            <button onClick={handleSetFlag}>설정</button>
          </div>
          <div className="current-flags">
            <p>현재 설정된 플래그:</p>
            <div className="flags-list">
              {Object.entries(flags).slice(0, 10).map(([key, value]) => (
                <span key={key} className="flag-item">
                  FLAG[{key}] = {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 전체 초기화 */}
      <section className="debug-section danger">
        <h3>⚠️ 위험 구역</h3>
        <div className="debug-control">
          <button
            className="danger-button"
            onClick={() => {
              if (window.confirm('정말로 게임을 초기화하시겠습니까?')) {
                useGameStore.getState().resetGame();
              }
            }}
          >
            게임 초기화
          </button>
          <button
            className="danger-button"
            onClick={() => {
              if (window.confirm('localStorage를 완전히 삭제하시겠습니까?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            localStorage 삭제
          </button>
        </div>
      </section>

      <div className="debug-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default DebugMenu;
