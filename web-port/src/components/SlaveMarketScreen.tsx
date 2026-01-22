import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { createRandomCharacter } from '../utils/characterFactory';
import type { Character } from '../types/character';
import { GameData } from '../constants';
import './SlaveMarketScreen.css';

interface SlaveMarketScreenProps {
  onBack: () => void;
}

function SlaveMarketScreen({ onBack }: SlaveMarketScreenProps) {
  const { ownedCharacters, money, flags, addCharacter, addMoney, getNextCharacterId } = useGameStore();

  const [candidates, setCandidates] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const maxCharacters = flags[23] || 10;

  const handleRecruit = () => {
    if (ownedCharacters.length >= maxCharacters) {
      return;
    }

    // 3명 생성
    const newCandidates = [
      createRandomCharacter(0),
      createRandomCharacter(0),
      createRandomCharacter(0),
    ];

    setCandidates(newCandidates);
    setCurrentIndex(0);
    setShowModal(true);
  };

  const handleContract = () => {
    const candidate = candidates[currentIndex];
    if (!candidate) return;

    const price = candidate.cflag[620] || 50000;
    if (money < price) {
      return;
    }

    const newId = getNextCharacterId();
    const contractedChar: Character = {
      ...candidate,
      id: newId,
      isOwned: true,
    };

    addMoney(-price);
    addCharacter(contractedChar);

    // 계약 후 모달 닫기
    setShowModal(false);
    setCandidates([]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCandidates([]);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentCandidate = candidates[currentIndex];

  return (
    <div className="slave-market-screen">
      <div className="market-header">
        <h2>배우 모집</h2>
        <div className="market-info">
          <span className="char-count">보유: {ownedCharacters.length}/{maxCharacters}명</span>
          <span className="money-display">소지금: ₩{money.toLocaleString()}</span>
        </div>
      </div>

      <div className="market-content">
        <button
          className="recruit-button"
          onClick={handleRecruit}
          disabled={ownedCharacters.length >= maxCharacters}
        >
          {ownedCharacters.length >= maxCharacters
            ? `계약 한도 도달 (${maxCharacters}명)`
            : '랜덤 모집 (3명)'}
        </button>

        <button className="back-button" onClick={onBack}>
          돌아가기
        </button>
      </div>

      {/* 모달 */}
      {showModal && currentCandidate && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* 제목 */}
            <div className="modal-title">
              <span className="char-name">{currentCandidate.name}</span>
              <span className="page-counter">{currentIndex + 1}/{candidates.length}</span>
            </div>

            {/* 스크롤 가능한 내용 */}
            <div className="modal-scroll">
              {/* 기본 정보 */}
              <div className="basic-info">
                <div className="info-card">
                  <div className="info-label">나이</div>
                  <div className="info-value">{currentCandidate.base[9]}세</div>
                </div>
                <div className="info-card">
                  <div className="info-label">키</div>
                  <div className="info-value">{currentCandidate.base[20]}cm</div>
                </div>
                <div className="info-card">
                  <div className="info-label">체중</div>
                  <div className="info-value">{currentCandidate.base[21]}kg</div>
                </div>
                <div className="info-card">
                  <div className="info-label">B</div>
                  <div className="info-value">{currentCandidate.base[22]}</div>
                </div>
                <div className="info-card">
                  <div className="info-label">W</div>
                  <div className="info-value">{currentCandidate.base[23]}</div>
                </div>
                <div className="info-card">
                  <div className="info-label">H</div>
                  <div className="info-value">{currentCandidate.base[24]}</div>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="extra-info">
                {currentCandidate.cstr[9] && <span>혈액형 {currentCandidate.cstr[9]}형</span>}
                {currentCandidate.talent[0] === 1 && <span className="highlight">처녀</span>}
                {currentCandidate.talent[184] === 1 && currentCandidate.cstr[7] && currentCandidate.cstr[8] && (
                  <span>남자친구: {currentCandidate.cstr[7]} {currentCandidate.cstr[8]}</span>
                )}
              </div>

              {/* 특성 */}
              <div className="talents-section">
                <h4>특성</h4>
                <div className="talent-tags">
                  {Object.keys(currentCandidate.talent)
                    .map(Number)
                    .filter(id => currentCandidate.talent[id] === 1)
                    .map(id => {
                      const name = GameData.talents.getName(Number(id));
                      if (name === '알 수 없음') return null;
                      return (
                        <span key={id} className="talent-tag">{name}</span>
                      );
                    })
                    .filter(Boolean)}
                </div>
              </div>

            </div>

            {/* 하단 컨트롤 */}
            <div className="modal-footer">
              <div className="price-info">₩{(currentCandidate.cflag[620] || 50000).toLocaleString()}</div>
              <div className="modal-buttons">
                <button className="btn-nav" onClick={handlePrev} disabled={currentIndex === 0}>◀</button>
                <button className="btn-contract" onClick={handleContract} disabled={money < (currentCandidate.cflag[620] || 50000)}>
                  {money < (currentCandidate.cflag[620] || 50000) ? '자금부족' : '계약'}
                </button>
                <button className="btn-nav" onClick={handleNext} disabled={currentIndex === candidates.length - 1}>▶</button>
                <button className="btn-close" onClick={handleCloseModal}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlaveMarketScreen;
