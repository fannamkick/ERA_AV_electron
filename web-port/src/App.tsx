import { useEffect } from 'react';
import './App.css';
import GameLayout from './components/GameLayout';
import TitleBar from './components/TitleBar';

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
