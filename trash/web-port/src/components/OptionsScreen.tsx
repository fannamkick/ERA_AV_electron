import { useState } from 'react';
import './OptionsScreen.css';

interface OptionsScreenProps {
  onBack: () => void;
  onReturnToTitle: () => void;
}

function OptionsScreen({ onBack, onReturnToTitle }: OptionsScreenProps) {
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showTitleConfirm, setShowTitleConfirm] = useState(false);

  const handleQuitGame = () => {
    if (window.electronAPI?.windowClose) {
      window.electronAPI.windowClose();
    } else {
      window.close();
    }
  };

  const handleReturnToTitle = () => {
    setShowTitleConfirm(false);
    onReturnToTitle();
  };

  return (
    <div className="options-screen">
      <h2 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>옵션</h2>

      <div className="action-buttons">
        <button onClick={() => setShowTitleConfirm(true)}>
          타이틀 화면으로
        </button>
        <button onClick={() => setShowQuitConfirm(true)} style={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}>
          게임 종료
        </button>
      </div>

      {showTitleConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-content">
            <h3>타이틀 화면으로 돌아가시겠습니까?</h3>
            <p>저장하지 않은 진행 상황은 사라집니다.</p>
            <div className="confirm-buttons">
              <button onClick={handleReturnToTitle} className="confirm-yes">
                예
              </button>
              <button onClick={() => setShowTitleConfirm(false)} className="confirm-no">
                아니오
              </button>
            </div>
          </div>
        </div>
      )}

      {showQuitConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-content">
            <h3>게임을 종료하시겠습니까?</h3>
            <p>저장하지 않은 진행 상황은 사라집니다.</p>
            <div className="confirm-buttons">
              <button onClick={handleQuitGame} className="confirm-yes">
                예
              </button>
              <button onClick={() => setShowQuitConfirm(false)} className="confirm-no">
                아니오
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="action-buttons" style={{ marginTop: '1rem' }}>
        <button onClick={onBack}>뒤로 가기</button>
      </div>
    </div>
  );
}

export default OptionsScreen;
