import { useState, useEffect } from 'react'
import { useGameStore } from '../stores/gameStore'
import MainMenu from './MainMenu'
import { TrainingScreen } from './TrainingScreen'
import CharacterSelectScreen from './CharacterSelectScreen'
import CharacterListScreen from './CharacterListScreen'
import SlaveMarketScreen from './SlaveMarketScreen'
import BrothelScreen from './BrothelScreen'
import FilmingScreen from './FilmingScreen'
import ShopScreen from './ShopScreen'
import VisitScreen from './VisitScreen'
import InfoScreen from './InfoScreen'
import SaveLoadScreen from './SaveLoadScreen'
import TipsScreen from './TipsScreen'
import OptionsScreen from './OptionsScreen'
import TitleScreen from './TitleScreen'
import DifficultySelect from './DifficultySelect'
import TrainingCommandMenu from './TrainingCommandMenu'
import DebugMenu from './DebugMenu'
import { CheckpointScreen } from './CheckpointScreen'
import { LeagueScreen } from './LeagueScreen'
import { useGameHandlers } from '../hooks/useGameHandlers'
import { useGameData } from '../hooks/useGameData'
import { getTimeName } from '../utils/timeSystem'
import { getPhaseName } from '../core/time'
import { getDivisionName } from '../gameplay/league'
import './GameLayout.css'

type SceneType = 'title' | 'difficulty' | 'main' | 'character-select' | 'character-list' | 'training' | 'brothel' | 'filming' | 'visit' | 'shop' | 'slave-market' | 'info' | 'save' | 'tips' | 'options' | 'debug' | 'rest' | 'end-turn' | 'checkpoint' | 'league';

function GameLayout() {
  const [currentScene, setCurrentScene] = useState<SceneType>('title')
  const [selectedCharId, setSelectedCharId] = useState<number | null>(null)
  const [selectedListCharId, setSelectedListCharId] = useState<number | null>(null)
  const { day, time, phase, money, economy, league, setCurrentCharacter, ownedCharacters, advancePhase } = useGameStore()
  const { handleNewGame, handleRest } = useGameHandlers()

  // 게임 데이터 로드
  useGameData()

  // 체크포인트 페이즈 자동 트리거
  useEffect(() => {
    const checkpointPhases = ['morning_check', 'midday_check', 'night_check'];
    if (checkpointPhases.includes(phase) && currentScene === 'main') {
      console.log(`[CHECKPOINT] ${phase} 페이즈 진입 → CheckpointScreen 표시`);
      setCurrentScene('checkpoint');
    }
  }, [phase, currentScene]);

  // 새 게임 시작 시 난이도 선택 화면으로
  const onNewGame = () => {
    setCurrentScene('difficulty')
  }

  // 불러오기 화면으로
  const onLoadGame = () => {
    setCurrentScene('save')
  }

  // 이어하기 (자동저장 불러오기)
  const onContinue = async () => {
    const { loadGame } = await import('../utils/saveSystem');
    const { loadSaveData } = useGameStore.getState();

    const autoSave = await loadGame(0);
    if (autoSave) {
      loadSaveData(autoSave.gameState);
      console.log('[CONTINUE] 자동저장 불러오기 완료');
      setCurrentScene('main');
    } else {
      console.error('[CONTINUE] 자동저장 파일이 없습니다');
    }
  }

  // 난이도 선택 완료 후 메인 화면으로
  const onDifficultyComplete = () => {
    setCurrentScene('main')
  }

  // 정보 바 컴포넌트
  const InfoBar = () => {
    const { weekLimit, targetMoney } = useGameStore();
    const currentWeek = day; // day를 week으로 사용
    const progress = (money / targetMoney) * 100;
    const progressClamped = Math.min(progress, 100);

    return (
      <div className="info-bar">
        <div className="info-bar-content">
          {/* 주차 */}
          <div className="info-item-compact">
            <span className="info-label-inline">기간</span>
            <span className="info-value-inline">
              <span className="current-week">{currentWeek}</span>
              <span className="week-separator">/</span>
              <span className="total-weeks">{weekLimit}</span>
              <span className="week-unit">주</span>
            </span>
          </div>

          {/* 시간대 (페이즈) */}
          <div className="info-item-compact">
            <span className="info-label-inline">시간</span>
            <span className="info-value-inline">{getPhaseName(phase)}</span>
          </div>

          {/* 리그 */}
          <div className="info-item-compact">
            <span className="info-label-inline">리그</span>
            <span className="info-value-inline">{getDivisionName(league.division)} {league.rank}위</span>
          </div>

          <div className="info-divider"></div>

          {/* 현재 자금 */}
          <div className="info-item-compact">
            <span className="info-label-inline">자금</span>
            <span className="money-value current">₩{money.toLocaleString()}</span>
          </div>

          {/* 목표 자금 */}
          <div className="info-item-compact">
            <span className="info-label-inline">목표</span>
            <span className="money-value target">₩{targetMoney.toLocaleString()}</span>
          </div>

          {/* 빚 (있을 때만) */}
          {economy.debt > 0 && (
            <div className="info-item-compact">
              <span className="info-label-inline">빚</span>
              <span className="money-value" style={{ color: '#f44336' }}>₩{economy.debt.toLocaleString()}</span>
            </div>
          )}

          {/* 평판 */}
          <div className="info-item-compact">
            <span className="info-label-inline">평판</span>
            <span className="info-value-inline">{economy.reputation}</span>
          </div>

          {/* 진행률 바 */}
          <div className="progress-bar-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressClamped}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 타이틀/난이도 화면은 전체 화면 사용
  if (currentScene === 'title') {
    return <TitleScreen onNewGame={onNewGame} onLoadGame={onLoadGame} onContinue={onContinue} />;
  }

  if (currentScene === 'difficulty') {
    return <DifficultySelect onComplete={onDifficultyComplete} />;
  }

  return (
    <div className="game-layout">
      {/* 헤더 - InfoBar로 대체 */}
      <header className="game-header">
        <InfoBar />
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="game-content">
        {/* 중앙: 메시지/정보 표시 */}
        <main className="main-panel">

          {currentScene === 'main' && (
            <div className="game-message">
              <p>메뉴에서 행동을 선택해주세요.</p>
            </div>
          )}

          {currentScene === 'character-select' && (
            <CharacterSelectScreen
              selectedId={selectedCharId}
              onSelect={(id) => {
                setCurrentCharacter(id);
                setCurrentScene('training');
                setSelectedCharId(null);
              }}
              onBack={() => {
                setCurrentScene('main');
                setSelectedCharId(null);
              }}
            />
          )}

          {currentScene === 'character-list' && (
            <CharacterListScreen
              selectedId={selectedListCharId}
              onBack={() => {
                setCurrentScene('main');
                setSelectedListCharId(null);
              }}
            />
          )}

          {currentScene === 'training' && <TrainingScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'slave-market' && <SlaveMarketScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'brothel' && <BrothelScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'filming' && <FilmingScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'shop' && <ShopScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'visit' && <VisitScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'info' && <InfoScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'save' && <SaveLoadScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'tips' && <TipsScreen onBack={() => setCurrentScene('main')} />}

          {currentScene === 'options' && <OptionsScreen onBack={() => setCurrentScene('main')} onReturnToTitle={() => setCurrentScene('title')} />}

          {currentScene === 'debug' && <DebugMenu onBack={() => setCurrentScene('main')} />}

          {currentScene === 'checkpoint' && (
            <CheckpointScreen onComplete={() => {
              advancePhase();
              setCurrentScene('main');
            }} />
          )}

          {currentScene === 'league' && <LeagueScreen onBack={() => setCurrentScene('main')} />}
        </main>

        {/* 오른쪽: 메뉴 선택지 */}
        <aside className="status-panel">
          {currentScene === 'main' && (
            <MainMenu
              onSelectMenu={(menu) => setCurrentScene(menu as SceneType)}
              onRest={() => {
                handleRest();
                // 휴식 후 메인 메뉴 유지 (턴이 변경되었음을 표시)
              }}
            />
          )}

          {currentScene === 'character-select' && (
            <div className="character-select-panel">
              <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>캐릭터 선택</h3>
              <div className="menu-list">
                {ownedCharacters.map((char) => (
                  <button
                    key={char.id}
                    className={selectedCharId === char.id ? 'selected' : ''}
                    onClick={() => setSelectedCharId(char.id)}
                  >
                    {char.name}
                    {char.isAssistant && <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>👥</span>}
                  </button>
                ))}
              </div>
              <div className="action-buttons" style={{ marginTop: '1rem' }}>
                {selectedCharId && (
                  <button
                    className="start-training-button"
                    onClick={() => {
                      setCurrentCharacter(selectedCharId);
                      setCurrentScene('training');
                      setSelectedCharId(null);
                    }}
                  >
                    조교 시작
                  </button>
                )}
                <button onClick={() => {
                  setCurrentScene('main');
                  setSelectedCharId(null);
                }}>돌아가기</button>
              </div>
            </div>
          )}

          {currentScene === 'training' && <TrainingCommandMenu onBack={() => setCurrentScene('main')} />}

          {currentScene === 'character-list' && (
            <div className="character-select-panel">
              <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>캐릭터 목록</h3>
              <div className="menu-list">
                {ownedCharacters.map((char) => (
                  <button
                    key={char.id}
                    className={selectedListCharId === char.id ? 'selected' : ''}
                    onClick={() => setSelectedListCharId(char.id)}
                  >
                    {char.name}
                    {char.isAssistant && <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>👥</span>}
                  </button>
                ))}
              </div>
              <div className="action-buttons" style={{ marginTop: '1rem' }}>
                <button onClick={() => {
                  setCurrentScene('main');
                  setSelectedListCharId(null);
                }}>돌아가기</button>
              </div>
            </div>
          )}

          {(currentScene === 'brothel' || currentScene === 'filming' ||
            currentScene === 'visit' || currentScene === 'shop' ||
            currentScene === 'slave-market' ||
            currentScene === 'info' || currentScene === 'save' || currentScene === 'tips' || currentScene === 'options' || currentScene === 'debug' || currentScene === 'league') && (
            <div className="action-buttons">
              <button onClick={() => setCurrentScene('main')}>메인 메뉴로</button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default GameLayout
