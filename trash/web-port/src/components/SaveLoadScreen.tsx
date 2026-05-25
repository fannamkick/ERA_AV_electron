import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import {
  saveGame,
  loadGame,
  deleteSave,
  getAllSaveSlots,
  exportSave,
  importSave,
  type SaveSlotInfo,
} from '../utils/saveSystem';
import './SaveLoadScreen.css';

interface SaveLoadScreenProps {
  onBack: () => void;
}

function SaveLoadScreen({ onBack }: SaveLoadScreenProps) {
  const gameStore = useGameStore();
  const [slots, setSlots] = useState<SaveSlotInfo[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 슬롯 정보 로드
  const refreshSlots = async () => {
    const slotsData = await getAllSaveSlots();
    setSlots(slotsData);
  };

  useEffect(() => {
    refreshSlots();
  }, []);

  // 저장
  const handleSave = async (slotNumber: number) => {
    const gameState = gameStore.getSaveData();
    const metadata = gameStore.getMetadata();

    const success = await saveGame(slotNumber, gameState, metadata);
    if (success) {
      gameStore.incrementSaveCount();
      await refreshSlots();
      alert(`슬롯 ${slotNumber}에 저장되었습니다.`);
    } else {
      alert('저장에 실패했습니다.');
    }
  };

  // 불러오기
  const handleLoad = async (slotNumber: number) => {
    const saveData = await loadGame(slotNumber);
    if (saveData) {
      gameStore.loadSaveData(saveData.gameState);
      // 메타데이터도 복원
      useGameStore.setState({
        playTime: saveData.metadata.playTime,
        saveCount: saveData.metadata.saveCount,
        dayReached: saveData.metadata.dayReached,
      });
      alert(`슬롯 ${slotNumber}에서 불러왔습니다.`);
      onBack();
    } else {
      alert('불러오기에 실패했습니다.');
    }
  };

  // 삭제
  const handleDelete = async (slotNumber: number) => {
    if (!confirm(`슬롯 ${slotNumber}을(를) 삭제하시겠습니까?`)) {
      return;
    }

    const success = await deleteSave(slotNumber);
    if (success) {
      await refreshSlots();
      alert(`슬롯 ${slotNumber}이(가) 삭제되었습니다.`);
    } else {
      alert('삭제에 실패했습니다.');
    }
  };

  // 내보내기
  const handleExport = async (slotNumber: number) => {
    const success = await exportSave(slotNumber);
    if (success) {
      alert('파일로 내보내기 완료!');
    } else {
      alert('내보내기에 실패했습니다.');
    }
  };

  // 가져오기
  const handleImportClick = (slotNumber: number) => {
    setSelectedSlot(slotNumber);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || selectedSlot === null) return;

    const success = await importSave(selectedSlot, file);
    if (success) {
      await refreshSlots();
      alert(`슬롯 ${selectedSlot}에 가져오기 완료!`);
    } else {
      alert('가져오기에 실패했습니다.');
    }

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
      date.getDate()
    ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <div className="save-load-screen">
      <div className="info-bar">
        <h2>저장/불러오기</h2>
      </div>

      <div className="save-content">
        <div className="current-state">
          <h3>현재 상태</h3>
          <div className="state-info">
            <div className="state-item">
              <span className="label">Day:</span>
              <span className="value">{gameStore.day}</span>
            </div>
            <div className="state-item">
              <span className="label">소지금:</span>
              <span className="value">₩{gameStore.money.toLocaleString()}</span>
            </div>
            <div className="state-item">
              <span className="label">캐릭터:</span>
              <span className="value">{gameStore.ownedCharacters.length}명</span>
            </div>
            <div className="state-item">
              <span className="label">플레이 시간:</span>
              <span className="value">{formatPlayTime(gameStore.playTime)}</span>
            </div>
          </div>
        </div>

        <div className="save-slots">
          <h3>저장 슬롯 (10개)</h3>
          <div className="slots-grid">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.slotNumber;

              return (
                <div
                  key={slot.slotNumber}
                  className={`save-slot ${isSelected ? 'selected' : ''} ${
                    slot.exists ? 'has-data' : 'empty'
                  }`}
                  onClick={() => setSelectedSlot(slot.slotNumber)}
                >
                  <div className="slot-header">
                    <span className="slot-number">슬롯 {slot.slotNumber}</span>
                    {slot.exists && slot.timestamp && (
                      <span className="slot-date">{formatDate(slot.timestamp)}</span>
                    )}
                  </div>

                  {slot.exists ? (
                    <div className="slot-info">
                      <div className="slot-detail">
                        <span>Day {slot.day}</span>
                        <span>₩{slot.money?.toLocaleString()}</span>
                      </div>
                      {slot.playTime !== undefined && (
                        <div className="slot-playtime">{formatPlayTime(slot.playTime)}</div>
                      )}
                    </div>
                  ) : (
                    <div className="slot-empty-msg">비어있음</div>
                  )}

                  <div className="slot-actions">
                    <button
                      className="save-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(slot.slotNumber);
                      }}
                    >
                      저장
                    </button>
                    <button
                      className="load-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoad(slot.slotNumber);
                      }}
                      disabled={!slot.exists}
                    >
                      불러오기
                    </button>
                    {slot.exists && (
                      <>
                        <button
                          className="export-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExport(slot.slotNumber);
                          }}
                        >
                          내보내기
                        </button>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(slot.slotNumber);
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )}
                    {!slot.exists && (
                      <button
                        className="import-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImportClick(slot.slotNumber);
                        }}
                      >
                        가져오기
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="save-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>

      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default SaveLoadScreen;
