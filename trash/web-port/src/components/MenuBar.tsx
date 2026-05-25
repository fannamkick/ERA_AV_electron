import React, { useState } from 'react';
import './MenuBar.css';

interface MenuBarProps {
  onNewGame?: () => void;
  onLoadGame?: () => void;
  onSaveGame?: () => void;
  onSettings?: () => void;
  onExit?: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({
  onNewGame,
  onLoadGame,
  onSaveGame,
  onSettings,
  onExit,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  const handleAction = (action?: () => void) => {
    if (action) action();
    closeMenu();
  };

  return (
    <div className="menubar">
      <div className="menu-item">
        <button className="menu-button" onClick={() => toggleMenu('game')}>
          게임
        </button>
        {openMenu === 'game' && (
          <div className="menu-dropdown">
            <button className="menu-option" onClick={() => handleAction(onNewGame)}>
              새 게임
            </button>
            <button className="menu-option" onClick={() => handleAction(onLoadGame)}>
              불러오기
            </button>
            <button className="menu-option" onClick={() => handleAction(onSaveGame)}>
              저장하기
            </button>
            <div className="menu-divider"></div>
            <button className="menu-option" onClick={() => handleAction(onExit)}>
              종료
            </button>
          </div>
        )}
      </div>

      <div className="menu-item">
        <button className="menu-button" onClick={() => toggleMenu('options')}>
          옵션
        </button>
        {openMenu === 'options' && (
          <div className="menu-dropdown">
            <button className="menu-option" onClick={() => handleAction(onSettings)}>
              환경설정
            </button>
          </div>
        )}
      </div>

      <div className="menu-item">
        <button className="menu-button" onClick={() => toggleMenu('help')}>
          도움말
        </button>
        {openMenu === 'help' && (
          <div className="menu-dropdown">
            <button className="menu-option" onClick={() => handleAction()}>
              게임 가이드
            </button>
            <div className="menu-divider"></div>
            <button className="menu-option" onClick={() => handleAction()}>
              정보
            </button>
          </div>
        )}
      </div>

      {openMenu && <div className="menu-overlay" onClick={closeMenu}></div>}
    </div>
  );
};

export default MenuBar;
