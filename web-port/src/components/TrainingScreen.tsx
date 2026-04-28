import { useEffect, useMemo, useRef, useState } from 'react';
import './TrainingScreen.css';
import { createBaseTrainingEngine } from '../content/training';
import { createStoreTrainingContext } from '../domain/adapters';
import { useTrainingStore } from '../legacy/training/stores/trainingStore';
import { ImprovedTrainingModule } from '../legacy/training/ImprovedTrainingModule';
import { useGameStore } from '../stores/gameStore';
import type { Character } from '../types/character';

interface TrainingScreenProps {
  onBack: () => void;
}

type TrainingWindow = Window & {
  __USE_MODULAR_TRAINING_ENGINE__?: boolean;
  executeTrainingCommand?: (commandId: number) => Promise<void>;
  getAvailableTrainingCommands?: () => number[];
  getTrainingCommandName?: (commandId: number) => string | undefined;
};

const USE_MODULAR_TRAINING_ENGINE =
  ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_USE_MODULAR_TRAINING_ENGINE === '1');

function shouldUseModularTrainingEngine(): boolean {
  return USE_MODULAR_TRAINING_ENGINE ||
    (typeof window !== 'undefined' && Boolean((window as TrainingWindow).__USE_MODULAR_TRAINING_ENGINE__));
}

function cloneCharacter(character: Character): Character {
  if (typeof structuredClone === 'function') {
    return structuredClone(character);
  }

  return JSON.parse(JSON.stringify(character)) as Character;
}

function cloneCharacters(characters: readonly Character[]): Character[] {
  return characters.map((character) => cloneCharacter(character));
}

function palamEntries(character: Character | undefined): Array<[string, number]> {
  if (!character?.palam) return [];

  return Object.entries(character.palam)
    .filter(([, value]) => typeof value === 'number' && value !== 0)
    .sort(([left], [right]) => Number(left) - Number(right))
    .map(([key, value]) => [`PALAM:${key}`, value as number]);
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({ onBack }) => {
  const {
    currentCharacter,
    ownedCharacters,
    flags,
    items,
    assistantIds,
    updateCharacter,
  } = useGameStore();
  const { isTraining, parameters } = useTrainingStore();
  const [messages, setMessages] = useState<string[]>([]);
  const [availableCommands, setAvailableCommands] = useState<number[]>([]);
  const [useModularEngine] = useState(() => shouldUseModularTrainingEngine());
  const messageEndRef = useRef<HTMLDivElement>(null);

  const character = ownedCharacters.find((item) => item.id === currentCharacter);
  const modularEngine = useMemo(() => createBaseTrainingEngine({
    convertSourceToPalamAfterEffects: true,
  }), []);

  const getModularAvailableCommands = () => {
    if (!character) return [];

    const draftCharacters = cloneCharacters(ownedCharacters);
    const context = createStoreTrainingContext({
      flags: { ...flags },
      items: { ...items },
      characters: draftCharacters,
      actorIds: {
        target: character.id,
        trainer: character.id,
        assistant: assistantIds[0],
      },
    }, character.id);

    return modularEngine.getAvailableCommands(context)
      .map((command) => command.originalId)
      .filter((originalId): originalId is number => originalId !== undefined);
  };

  const refreshAvailableCommands = () => {
    setAvailableCommands(useModularEngine
      ? getModularAvailableCommands()
      : ImprovedTrainingModule.getAvailableCommands());
  };

  useEffect(() => {
    if (!messageEndRef.current) return;

    const container = messageEndRef.current.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const trainingWindow = window as TrainingWindow;

    trainingWindow.executeTrainingCommand = async (commandId: number) => {
      if (!useModularEngine) {
        const result = await ImprovedTrainingModule.executeCommand(commandId);
        if (result) {
          setMessages((prev) => [...prev, ...result.messages]);
        }
        setAvailableCommands(ImprovedTrainingModule.getAvailableCommands());
        return;
      }

      if (!character) return;

      const command = modularEngine.getCommandByOriginalId(commandId);
      if (!command) {
        setMessages((prev) => [...prev, `Unknown modular training command: COMF${commandId}`]);
        return;
      }

      const draftCharacters = cloneCharacters(ownedCharacters);
      const draftTarget = draftCharacters.find((item) => item.id === character.id);
      if (!draftTarget) return;

      const context = createStoreTrainingContext({
        flags: { ...flags },
        items: { ...items },
        characters: draftCharacters,
        actorIds: {
          target: character.id,
          trainer: character.id,
          assistant: assistantIds[0],
        },
      }, character.id);
      context.requestTrainingDecision = (request) => window.confirm(request.prompt);
      const result = modularEngine.execute(command.id, context);

      if (result.success) {
        updateCharacter(draftTarget.id, draftTarget);
      }

      setMessages((prev) => [
        ...prev,
        ...result.messages,
        ...result.warnings.map((warning) => `Warning: ${warning}`),
      ]);
      setAvailableCommands(getModularAvailableCommands());
    };

    trainingWindow.getAvailableTrainingCommands = () => useModularEngine
      ? getModularAvailableCommands()
      : ImprovedTrainingModule.getAvailableCommands();
    trainingWindow.getTrainingCommandName = (commandId: number) => {
      if (!useModularEngine) return undefined;
      return modularEngine.getCommandByOriginalId(commandId)?.name;
    };

    return () => {
      delete trainingWindow.executeTrainingCommand;
      delete trainingWindow.getAvailableTrainingCommands;
      delete trainingWindow.getTrainingCommandName;
    };
  }, [assistantIds, character, flags, items, modularEngine, ownedCharacters, updateCharacter, useModularEngine]);

  useEffect(() => {
    if (!currentCharacter) return;

    if (useModularEngine) {
      setMessages(['Modular training engine started behind feature flag.']);
      setAvailableCommands(getModularAvailableCommands());
      return;
    }

    if (!isTraining) {
      const success = ImprovedTrainingModule.startTraining(currentCharacter);
      if (success) {
        setMessages(['Training started.']);
        setAvailableCommands(ImprovedTrainingModule.getAvailableCommands());
      }
    }

    return () => {
      if (isTraining) {
        try {
          ImprovedTrainingModule.endTraining();
        } catch {
          // Legacy training can already be ended by the command menu path.
        }
      }
    };
  }, []);

  if (!character) {
    return (
      <div className="training-screen">
        <div className="training-empty">Select a character to train.</div>
      </div>
    );
  }

  const handleEndTraining = () => {
    if (useModularEngine) {
      setMessages((prev) => [...prev, '\n=== Training ended ===\nModular pilot results were applied to the selected character.']);
      setTimeout(() => onBack(), 800);
      return;
    }

    const result = ImprovedTrainingModule.endTraining();
    const summaryMsg = `\n=== Training ended ===\nJuel gained: ${result.totalJuel}\nNegative offset: ${result.negativeOffset}`;
    setMessages((prev) => [...prev, summaryMsg]);
    setTimeout(() => onBack(), 2000);
  };

  const compactStats: Array<[string, number]> = useModularEngine
    ? palamEntries(character).slice(0, 4)
    : Object.entries(parameters).slice(0, 4).map(([key, value]) => [key, value as number]);
  const detailStats: Array<[string, number]> = useModularEngine
    ? palamEntries(character)
    : Object.entries(parameters).map(([key, value]) => [key, value as number]);

  return (
    <div className="training-screen">
      <div className="training-header">
        <div className="training-character">
          <span className="character-avatar">{character.name[0]}</span>
          <div className="character-info">
            <h2>{character.name}</h2>
            <p className="character-subtitle">
              {character.callName || character.name}
              {useModularEngine ? ' / modular pilot' : ''}
            </p>
          </div>
        </div>

        <div className="training-stats">
          {compactStats.length === 0 ? (
            <div className="stat-compact">
              <span className="stat-label">PALAM</span>
              <span className="stat-value">0</span>
            </div>
          ) : compactStats.map(([key, value]) => (
            <div className="stat-compact" key={key}>
              <span className="stat-label">{key}</span>
              <span className="stat-value">{Math.floor(value).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="message-display">
        {messages.map((message, index) => (
          <p key={`${index}-${message}`}>{message}</p>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="parameter-details">
        <h3>{useModularEngine ? 'PALAM' : 'Parameters'}</h3>
        <div className="parameter-grid">
          {detailStats.length === 0 ? (
            <div className="parameter-item">
              <span className="param-name">No values yet</span>
              <span className="param-value">0</span>
            </div>
          ) : detailStats.map(([key, value]) => (
            <div key={key} className="parameter-item">
              <span className="param-name">{key}</span>
              <span className="param-value">{Math.floor(value).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="control-buttons">
        <button onClick={onBack}>Back</button>
        <button className="end-button" onClick={handleEndTraining}>
          End Training
        </button>
      </div>

      {useModularEngine && (
        <div className="parameter-details">
          <h3>Modular Pilot Commands</h3>
          <div className="parameter-grid">
            {availableCommands.map((commandId) => (
              <div key={commandId} className="parameter-item">
                <span className="param-name">COMF{commandId}</span>
                <span className="param-value">{modularEngine.getCommandByOriginalId(commandId)?.name ?? 'Unknown'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const executeTrainingCommand = async (
  commandId: number,
  setMessages: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const result = await ImprovedTrainingModule.executeCommand(commandId);
  if (result) {
    setMessages((prev) => [...prev, ...result.messages]);
  }
};
