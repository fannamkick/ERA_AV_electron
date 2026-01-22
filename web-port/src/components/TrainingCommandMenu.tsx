import { useState, useEffect } from 'react';
import { commandRegistry } from '../modules/training/commands';
import './TrainingCommandMenu.css';

interface TrainingCommandMenuProps {
  onBack: () => void;
}

function TrainingCommandMenu({ onBack }: TrainingCommandMenuProps) {
  const [commands, setCommands] = useState<number[]>([]);

  useEffect(() => {
    // 초기 로드만 수행 (턴제 게임이므로 폴링 불필요)
    if ((window as any).getAvailableTrainingCommands) {
      setCommands((window as any).getAvailableTrainingCommands());
    }
  }, []);

  const handleCommand = async (id: number) => {
    if ((window as any).executeTrainingCommand) {
      await (window as any).executeTrainingCommand(id);
      // 커맨드 실행 후 목록 갱신
      if ((window as any).getAvailableTrainingCommands) {
        setCommands((window as any).getAvailableTrainingCommands());
      }
    }
  };

  return (
    <div className="command-menu">
      <h3>조교 커맨드</h3>
      <div
        className="menu-list"
        style={{
          gridTemplateColumns: commands.length > 10 ? 'repeat(2, 1fr)' : '1fr'
        }}
      >
        {commands.map((id) => {
          const cmd = commandRegistry[id];
          if (!cmd) return null;

          return (
            <button
              key={id}
              onClick={() => handleCommand(id)}
            >
              {cmd.name}
            </button>
          );
        })}
        {commands.length === 0 && (
          <div style={{ padding: '1rem', color: '#999', textAlign: 'center', gridColumn: '1 / -1' }}>
            사용 가능한 커맨드가 없습니다
          </div>
        )}

        {/* 항상 마지막에 돌아가기 버튼 */}
        <button
          onClick={onBack}
          className="back-button"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default TrainingCommandMenu;
