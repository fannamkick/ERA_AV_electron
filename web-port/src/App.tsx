import { useEffect } from 'react';
import './App.css';
import GameLayout from './components/GameLayout';
import TitleBar from './components/TitleBar';
import { initializeGame } from './init';

// 앱 로드 시 게임 데이터 등록 (React 렌더 전)
initializeGame();

function App() {
  useEffect(() => {
    // Electron 환경 감지
    if (window.electronAPI) {
      document.body.classList.add('electron');
    }
  }, []);

  return (
    <div className="App">
      <TitleBar />
      <GameLayout />
    </div>
  );
}

export default App;
