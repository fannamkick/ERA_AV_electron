import { useEffect, useState } from 'react';
import { commandRegistry } from '../legacy/training/commands';
import './TrainingCommandMenu.css';

interface TrainingCommandMenuProps {
  onBack: () => void;
}

type TrainingWindow = Window & {
  executeTrainingCommand?: (commandId: number) => Promise<void>;
  getAvailableTrainingCommands?: () => number[];
  getTrainingCommandName?: (commandId: number) => string | undefined;
};

function TrainingCommandMenu({ onBack }: TrainingCommandMenuProps) {
  const [commands, setCommands] = useState<number[]>([]);

  const refreshCommands = () => {
    const trainingWindow = window as TrainingWindow;
    if (trainingWindow.getAvailableTrainingCommands) {
      setCommands(trainingWindow.getAvailableTrainingCommands());
    }
  };

  useEffect(() => {
    refreshCommands();
  }, []);

  const handleCommand = async (id: number) => {
    const trainingWindow = window as TrainingWindow;
    if (trainingWindow.executeTrainingCommand) {
      await trainingWindow.executeTrainingCommand(id);
      refreshCommands();
    }
  };

  return (
    <div className="command-menu">
      <h3>Training Commands</h3>
      <div
        className="menu-list"
        style={{
          gridTemplateColumns: commands.length > 10 ? 'repeat(2, 1fr)' : '1fr',
        }}
      >
        {commands.map((id) => {
          const cmd = commandRegistry[id];
          const modularName = (window as TrainingWindow).getTrainingCommandName?.(id);
          if (!cmd && !modularName) return null;

          return (
            <button
              key={id}
              onClick={() => handleCommand(id)}
            >
              {modularName ?? cmd.name}
            </button>
          );
        })}
        {commands.length === 0 && (
          <div style={{ padding: '1rem', color: '#999', textAlign: 'center', gridColumn: '1 / -1' }}>
            No available commands.
          </div>
        )}

        <button
          onClick={onBack}
          className="back-button"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TrainingCommandMenu;
