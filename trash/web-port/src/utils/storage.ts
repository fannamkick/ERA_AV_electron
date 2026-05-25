/**
 * 스토리지 추상화 레이어
 * Browser (localStorage) 와 Electron (파일 시스템) 모두 지원
 */

// Electron API 타입 정의 (preload.ts와 일치)
declare global {
  interface Window {
    electronAPI?: {
      saveFileDialog: (options: any) => Promise<string | undefined>;
      openFileDialog: (options: any) => Promise<string | undefined>;
      readFile: (filepath: string) => Promise<string>;
      writeFile: (filepath: string, content: string) => Promise<void>;
      storageGet: (key: string) => Promise<any>;
      storageSet: (key: string, value: any) => Promise<void>;
      storageDelete: (key: string) => Promise<void>;
      storageGetAll: () => Promise<Record<string, any>>;
      storageClear: () => Promise<void>;
      windowMinimize: () => Promise<void>;
      windowMaximize: () => Promise<void>;
      windowClose: () => Promise<void>;
    };
  }
}

/**
 * 스토리지 인터페이스
 */
export interface IStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * Browser localStorage 구현
 */
class LocalStorage implements IStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`[LocalStorage] getItem 실패: ${key}`, error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`[LocalStorage] setItem 실패: ${key}`, error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[LocalStorage] removeItem 실패: ${key}`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('[LocalStorage] clear 실패', error);
      throw error;
    }
  }
}

/**
 * Electron 파일 시스템 구현 (electron-store 사용)
 */
class ElectronStorage implements IStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      const value = await window.electronAPI.storageGet(key);
      // storageGet은 객체를 반환할 수 있으므로 문자열로 변환
      return value !== undefined && value !== null ? String(value) : null;
    } catch (error) {
      console.error(`[ElectronStorage] getItem 실패: ${key}`, error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      await window.electronAPI.storageSet(key, value);
    } catch (error) {
      console.error(`[ElectronStorage] setItem 실패: ${key}`, error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      await window.electronAPI.storageDelete(key);
    } catch (error) {
      console.error(`[ElectronStorage] removeItem 실패: ${key}`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      await window.electronAPI.storageClear();
    } catch (error) {
      console.error('[ElectronStorage] clear 실패', error);
      throw error;
    }
  }
}

/**
 * 환경에 따라 적절한 스토리지 반환
 */
function createStorage(): IStorage {
  // Electron 환경 체크
  if (typeof window !== 'undefined' && window.electronAPI) {
    console.log('[Storage] Electron 환경 감지 → ElectronStorage 사용');
    return new ElectronStorage();
  }

  // Browser 환경
  console.log('[Storage] Browser 환경 감지 → LocalStorage 사용');
  return new LocalStorage();
}

/**
 * 전역 스토리지 인스턴스
 */
export const storage: IStorage = createStorage();

/**
 * 스토리지 타입 확인
 */
export function getStorageType(): 'electron' | 'browser' {
  return typeof window !== 'undefined' && window.electronAPI ? 'electron' : 'browser';
}

/**
 * Electron 사용 가능 여부
 */
export function isElectronAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.electronAPI;
}
