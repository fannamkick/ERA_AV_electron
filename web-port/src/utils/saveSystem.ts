/**
 * 저장/불러오기 시스템
 *
 * IStorage 추상화 기반으로 동작 (Electron/Browser 자동 선택)
 * 클라우드 동기화 추가 가능한 구조
 */

import { Character } from '../types/game';
import { storage } from './storage';

export interface SaveData {
  version: string;
  timestamp: number;
  slotNumber: number;

  gameState: {
    day: number;
    money: number;
    ownedCharacters: Character[];
    availableCharacters: Character[];
    currentCharacter: number | null;

    // 글로벌 플래그
    globalFlags: Record<number, number>;

    // 아이템
    items: Record<number, number>;

    // 기타 상태
    achievements: number[];
    clearedEndings: number[];
  };

  // 메타데이터
  metadata: {
    playTime: number; // 총 플레이 시간 (초)
    saveCount: number; // 저장 횟수
    dayReached: number; // 최대 도달 일수
  };
}

export interface SaveSlotInfo {
  exists: boolean;
  slotNumber: number;
  timestamp?: number;
  day?: number;
  money?: number;
  playTime?: number;
}

const SAVE_KEY_PREFIX = 'erAV_save_';
const SAVE_VERSION = '0.1.0';
const MAX_SLOTS = 10;

/**
 * 게임 저장
 * 슬롯 0: 자동저장 전용
 * 슬롯 1-10: 수동저장
 */
export async function saveGame(slotNumber: number, gameState: SaveData['gameState'], metadata: SaveData['metadata']): Promise<boolean> {
  try {
    if (slotNumber < 0 || slotNumber > MAX_SLOTS) {
      throw new Error(`잘못된 슬롯 번호: ${slotNumber}`);
    }

    const saveData: SaveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      slotNumber,
      gameState,
      metadata,
    };

    const json = JSON.stringify(saveData);
    await storage.setItem(`${SAVE_KEY_PREFIX}${slotNumber}`, json);

    console.log(`게임 저장 완료 (슬롯 ${slotNumber})`);
    return true;
  } catch (error) {
    console.error('게임 저장 실패:', error);
    return false;
  }
}

/**
 * 게임 불러오기
 */
export async function loadGame(slotNumber: number): Promise<SaveData | null> {
  try {
    if (slotNumber < 0 || slotNumber > MAX_SLOTS) {
      throw new Error(`잘못된 슬롯 번호: ${slotNumber}`);
    }

    const json = await storage.getItem(`${SAVE_KEY_PREFIX}${slotNumber}`);
    if (!json) {
      return null;
    }

    const saveData: SaveData = JSON.parse(json);

    // 버전 체크 (향후 마이그레이션 로직 추가 가능)
    if (saveData.version !== SAVE_VERSION) {
      console.warn(`저장 데이터 버전 불일치: ${saveData.version} vs ${SAVE_VERSION}`);
      // TODO: 버전 마이그레이션 로직
    }

    console.log(`게임 불러오기 완료 (슬롯 ${slotNumber})`);
    return saveData;
  } catch (error) {
    console.error('게임 불러오기 실패:', error);
    return null;
  }
}

/**
 * 저장 슬롯 삭제
 */
export async function deleteSave(slotNumber: number): Promise<boolean> {
  try {
    if (slotNumber < 0 || slotNumber > MAX_SLOTS) {
      throw new Error(`잘못된 슬롯 번호: ${slotNumber}`);
    }

    await storage.removeItem(`${SAVE_KEY_PREFIX}${slotNumber}`);
    console.log(`저장 데이터 삭제 완료 (슬롯 ${slotNumber})`);
    return true;
  } catch (error) {
    console.error('저장 데이터 삭제 실패:', error);
    return false;
  }
}

/**
 * 저장된 파일이 하나라도 있는지 확인
 */
export async function hasSavedGame(): Promise<boolean> {
  for (let i = 1; i <= MAX_SLOTS; i++) {
    const json = await storage.getItem(`${SAVE_KEY_PREFIX}${i}`);
    if (json) {
      return true;
    }
  }
  return false;
}

/**
 * 모든 슬롯 정보 조회
 * 슬롯 0: 자동저장
 * 슬롯 1-10: 수동저장
 */
export async function getAllSaveSlots(): Promise<SaveSlotInfo[]> {
  const slots: SaveSlotInfo[] = [];

  for (let i = 0; i <= MAX_SLOTS; i++) {
    const json = await storage.getItem(`${SAVE_KEY_PREFIX}${i}`);

    if (json) {
      try {
        const saveData: SaveData = JSON.parse(json);
        slots.push({
          exists: true,
          slotNumber: i,
          timestamp: saveData.timestamp,
          day: saveData.gameState.day,
          money: saveData.gameState.money,
          playTime: saveData.metadata.playTime,
        });
      } catch (error) {
        console.error(`슬롯 ${i} 파싱 실패:`, error);
        slots.push({
          exists: false,
          slotNumber: i,
        });
      }
    } else {
      slots.push({
        exists: false,
        slotNumber: i,
      });
    }
  }

  return slots;
}

/**
 * 저장 데이터 내보내기 (JSON 파일 다운로드)
 * Electron: 파일 저장 대화상자 사용
 * Browser: Blob 다운로드 사용
 */
export async function exportSave(slotNumber: number): Promise<boolean> {
  try {
    const json = await storage.getItem(`${SAVE_KEY_PREFIX}${slotNumber}`);
    if (!json) {
      throw new Error('저장 데이터가 없습니다.');
    }

    // Check if running in Electron
    if (typeof window !== 'undefined' && window.electronAPI) {
      // Electron: Use file dialog
      const filepath = await window.electronAPI.saveFileDialog({
        defaultPath: `erAV_save_${slotNumber}_${Date.now()}.json`,
        filters: [
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (filepath) {
        await window.electronAPI.writeFile(filepath, json);
        console.log(`저장 데이터 내보내기 완료 (슬롯 ${slotNumber}): ${filepath}`);
        return true;
      } else {
        console.log('파일 저장 취소됨');
        return false;
      }
    } else {
      // Browser: Use blob download
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `erAV_save_${slotNumber}_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log(`저장 데이터 내보내기 완료 (슬롯 ${slotNumber})`);
      return true;
    }
  } catch (error) {
    console.error('저장 데이터 내보내기 실패:', error);
    return false;
  }
}

/**
 * 저장 데이터 가져오기 (JSON 파일 업로드)
 * Electron: 파일 열기 대화상자 사용
 * Browser: FileReader 사용
 */
export async function importSave(slotNumber: number, file?: File): Promise<boolean> {
  try {
    let json: string;

    // Check if running in Electron
    if (typeof window !== 'undefined' && window.electronAPI && !file) {
      // Electron: Use file dialog
      const filepath = await window.electronAPI.openFileDialog({
        filters: [
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (!filepath) {
        console.log('파일 선택 취소됨');
        return false;
      }

      json = await window.electronAPI.readFile(filepath);
    } else if (file) {
      // Browser or Electron with File object: Use FileReader
      json = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('파일 읽기 실패'));
        reader.readAsText(file);
      });
    } else {
      throw new Error('파일이 제공되지 않았습니다.');
    }

    const saveData: SaveData = JSON.parse(json);

    // 유효성 검사
    if (!saveData.version || !saveData.gameState) {
      throw new Error('잘못된 저장 데이터 형식입니다.');
    }

    // 슬롯 번호 업데이트
    saveData.slotNumber = slotNumber;
    saveData.timestamp = Date.now();

    await storage.setItem(`${SAVE_KEY_PREFIX}${slotNumber}`, JSON.stringify(saveData));
    console.log(`저장 데이터 가져오기 완료 (슬롯 ${slotNumber})`);
    return true;
  } catch (error) {
    console.error('저장 데이터 가져오기 실패:', error);
    return false;
  }
}

/**
 * 클라우드 동기화 인터페이스 (향후 구현)
 */
export interface CloudSyncAdapter {
  upload(saveData: SaveData): Promise<boolean>;
  download(slotNumber: number): Promise<SaveData | null>;
  list(): Promise<SaveSlotInfo[]>;
  delete(slotNumber: number): Promise<boolean>;
}

/**
 * 클라우드 동기화 (향후 구현)
 */
export async function syncToCloud(adapter: CloudSyncAdapter, slotNumber: number): Promise<boolean> {
  try {
    const saveData = loadGame(slotNumber);
    if (!saveData) {
      throw new Error('저장 데이터가 없습니다.');
    }

    const success = await adapter.upload(saveData);
    if (success) {
      console.log(`클라우드 동기화 완료 (슬롯 ${slotNumber})`);
    }
    return success;
  } catch (error) {
    console.error('클라우드 동기화 실패:', error);
    return false;
  }
}

/**
 * 클라우드에서 다운로드 (향후 구현)
 */
export async function downloadFromCloud(adapter: CloudSyncAdapter, slotNumber: number): Promise<boolean> {
  try {
    const saveData = await adapter.download(slotNumber);
    if (!saveData) {
      throw new Error('클라우드에 저장 데이터가 없습니다.');
    }

    const json = JSON.stringify(saveData);
    await storage.setItem(`${SAVE_KEY_PREFIX}${slotNumber}`, json);
    console.log(`클라우드에서 다운로드 완료 (슬롯 ${slotNumber})`);
    return true;
  } catch (error) {
    console.error('클라우드 다운로드 실패:', error);
    return false;
  }
}
