import './MainMenu.css';

interface MainMenuProps {
  onSelectMenu: (menu: string) => void;
  onRest?: () => void;
}

function MainMenu({ onSelectMenu, onRest }: MainMenuProps) {
  const handleRest = () => {
    if (onRest) {
      onRest();
    } else {
      onSelectMenu('rest');
    }
  };

  return (
    <div className="main-menu">
      <div className="menu-list">
        <button onClick={() => onSelectMenu('character-select')}>
          조교
        </button>
        <button onClick={() => onSelectMenu('character-list')}>
          캐릭터 목록
        </button>
        <button onClick={() => onSelectMenu('brothel')}>
          창관 관리
        </button>
        <button onClick={() => onSelectMenu('filming')}>
          AV 촬영
        </button>
        <button onClick={() => onSelectMenu('visit')}>
          방문
        </button>
        <button onClick={() => onSelectMenu('shop')}>
          상점
        </button>
        <button onClick={() => onSelectMenu('slave-market')}>
          배우 모집
        </button>
        <button onClick={() => onSelectMenu('league')}>
          리그
        </button>
        <button onClick={() => onSelectMenu('info')}>
          정보
        </button>
        <button onClick={() => onSelectMenu('save')}>
          저장/불러오기
        </button>
        <button onClick={() => onSelectMenu('tips')}>
          TIPS
        </button>
        <button onClick={handleRest}>
          휴식
        </button>
        <button onClick={() => onSelectMenu('options')}>
          옵션
        </button>
        <button onClick={() => onSelectMenu('debug')} style={{ borderColor: '#ff9800', color: '#ff9800' }}>
          디버그 메뉴
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
