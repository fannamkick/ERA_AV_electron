import { useState, useEffect, useRef } from 'react';
import './TrainingScreen.css';
import { useGameStore } from '../stores/gameStore';
import { useTrainingStore } from '../modules/training/stores/trainingStore';
import { ImprovedTrainingModule } from '../modules/training/ImprovedTrainingModule';

interface TrainingScreenProps {
  onBack: () => void;
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({ onBack }) => {
  const { currentCharacter, ownedCharacters } = useGameStore();
  const { isTraining, parameters } = useTrainingStore();
  const [messages, setMessages] = useState<string[]>([]);
  const [availableCommands, setAvailableCommands] = useState<number[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const character = ownedCharacters.find((c) => c.id === currentCharacter);

  // 메시지가 추가될 때마다 자동 스크롤
  useEffect(() => {
    if (messageEndRef.current) {
      const container = messageEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  // 커맨드 실행 함수 - window에 등록하여 GameLayout에서 호출 가능
  useEffect(() => {
    (window as any).executeTrainingCommand = async (commandId: number) => {
      const result = await ImprovedTrainingModule.executeCommand(commandId);
      if (result) {
        setMessages((prev) => [...prev, ...result.messages]);
      }
      // 커맨드 목록 갱신
      setAvailableCommands(ImprovedTrainingModule.getAvailableCommands());
    };

    return () => {
      delete (window as any).executeTrainingCommand;
    };
  }, []);

  // 조교 시작
  useEffect(() => {
    if (currentCharacter && !isTraining) {
      const success = ImprovedTrainingModule.startTraining(currentCharacter);
      if (success) {
        setMessages(['조교를 시작합니다.']);
        // 초기 커맨드 목록 로드
        setAvailableCommands(ImprovedTrainingModule.getAvailableCommands());
        // window에 커맨드 목록도 등록
        (window as any).getAvailableTrainingCommands = () => ImprovedTrainingModule.getAvailableCommands();
      }
    }

    // 클린업: 조교 종료
    return () => {
      if (isTraining) {
        try {
          ImprovedTrainingModule.endTraining();
        } catch (e) {
          // 이미 종료된 경우 무시
        }
      }
      delete (window as any).getAvailableTrainingCommands;
    };
  }, []);

  if (!character) {
    return (
      <div className="training-screen">
        <div className="training-empty">조교할 캐릭터를 선택하세요</div>
      </div>
    );
  }

  // 조교 종료
  const handleEndTraining = () => {
    const result = ImprovedTrainingModule.endTraining();

    // 결과 메시지
    const summaryMsg = `\n=== 조교 종료 ===\n획득 구슬: ${result.totalJuel}개\n부정의 구슬 상쇄: ${result.negativeOffset}개`;
    setMessages((prev) => [...prev, summaryMsg]);

    // 잠시 후 메인으로
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
    <div className="training-screen">
      {/* 헤더: 캐릭터 정보 */}
      <div className="training-header">
        <div className="training-character">
          <span className="character-avatar">{character.name[0]}</span>
          <div className="character-info">
            <h2>{character.name}</h2>
            <p className="character-subtitle">{character.callName || character.name}</p>
          </div>
        </div>

        {/* 파라미터 표시 */}
        <div className="training-stats">
          <div className="stat-compact">
            <span className="stat-label">쾌C</span>
            <span className="stat-value">{Math.floor(parameters.쾌C)}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-label">쾌V</span>
            <span className="stat-value">{Math.floor(parameters.쾌V)}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-label">욕정</span>
            <span className="stat-value">{Math.floor(parameters.욕정)}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-label">굴종</span>
            <span className="stat-value">{Math.floor(parameters.굴종)}</span>
          </div>
        </div>
      </div>

      {/* 메시지 표시 */}
      <div className="message-display">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* 파라미터 상세 */}
      <div className="parameter-details">
        <h3>파라미터</h3>
        <div className="parameter-grid">
          {Object.entries(parameters).map(([key, value]) => (
            <div key={key} className="parameter-item">
              <span className="param-name">{key}</span>
              <span className="param-value">{Math.floor(value).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="control-buttons">
        <button onClick={onBack}>돌아가기</button>
        <button className="end-button" onClick={handleEndTraining}>
          조교 종료
        </button>
      </div>
    </div>
  );
};

// 커맨드 실행 함수 export - GameLayout에서 사용
export const executeTrainingCommand = async (commandId: number, setMessages: React.Dispatch<React.SetStateAction<string[]>>) => {
  const result = await ImprovedTrainingModule.executeCommand(commandId);
  if (result) {
    setMessages((prev) => [...prev, ...result.messages]);
  }
};
