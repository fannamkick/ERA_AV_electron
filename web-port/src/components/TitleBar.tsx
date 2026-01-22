import React from 'react';
import './TitleBar.css';

interface TitleBarProps {
  title?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title = 'erAV_Ho v0.022' }) => {
  const handleMinimize = () => {
    if (window.electronAPI?.windowMinimize) {
      window.electronAPI.windowMinimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI?.windowMaximize) {
      window.electronAPI.windowMaximize();
    }
  };

  const handleClose = () => {
    if (window.electronAPI?.windowClose) {
      window.electronAPI.windowClose();
    }
  };

  return (
    <div className="titlebar">
      <div className="titlebar-drag-region">
        <div className="titlebar-title">{title}</div>
      </div>
      <div className="titlebar-controls">
        <button className="titlebar-button minimize" onClick={handleMinimize} title="최소화">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="0" y="5" width="12" height="2" fill="currentColor" />
          </svg>
        </button>
        <button className="titlebar-button maximize" onClick={handleMaximize} title="최대화">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="0" y="0" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <button className="titlebar-button close" onClick={handleClose} title="닫기">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M 0,0 L 12,12 M 12,0 L 0,12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
