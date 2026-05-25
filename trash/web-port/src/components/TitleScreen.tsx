import { useState, useEffect } from 'react';
import { hasSavedGame, loadGame } from '../utils/saveSystem';
import './TitleScreen.css';

interface TitleScreenProps {
  onNewGame: () => void;
  onLoadGame: () => void;
  onContinue: () => void; // 이어하기 (자동저장 불러오기)
}

function TitleScreen({ onNewGame, onLoadGame, onContinue }: TitleScreenProps) {
  const [hasExistingSave, setHasExistingSave] = useState(false);
  const [hasAutoSave, setHasAutoSave] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSavedGame = async () => {
      const exists = await hasSavedGame();
      setHasExistingSave(exists);

      // 자동저장(슬롯 0) 존재 여부 확인
      const autoSave = await loadGame(0);
      setHasAutoSave(autoSave !== null);

      setIsLoading(false);
    };

    checkSavedGame();
  }, []);

  if (isLoading) {
    return (
      <div className="title-screen">
        <div className="title-loading">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="title-logo">erAV_Ho</h1>
        <p className="title-subtitle">웹 포트 버전 v0.1.0</p>

        <div className="title-menu">
          <button
            className="title-button"
            onClick={onContinue}
            disabled={!hasAutoSave}
          >
            이어하기
          </button>

          <button
            className="title-button"
            onClick={onNewGame}
          >
            새로 시작
          </button>

          <button
            className="title-button"
            onClick={onLoadGame}
            disabled={!hasExistingSave}
          >
            불러오기
          </button>
        </div>

        <div className="title-footer">
          <p>erAV_Ho v0.022 기반 웹 포트</p>
          <p>© Original: erAV_Ho Project</p>
        </div>
      </div>
    </div>
  );
}

export default TitleScreen;
