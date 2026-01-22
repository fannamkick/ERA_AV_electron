// Electron Preload 스크립트
// 렌더러 프로세스와 메인 프로세스 간의 안전한 통신 브리지

import electron from 'electron';

const { contextBridge, ipcRenderer } = electron;

// window 객체에 안전하게 API 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 스토리지 API (storage.ts 호환)
  storageGet: (key: string) => ipcRenderer.invoke('storage-get', key),
  storageSet: (key: string, value: any) => ipcRenderer.invoke('storage-set', key, value),
  storageDelete: (key: string) => ipcRenderer.invoke('storage-delete', key),
  storageGetAll: () => ipcRenderer.invoke('storage-get-all'),
  storageClear: () => ipcRenderer.invoke('storage-clear'),

  // 파일 대화상자 API (saveSystem.ts 호환)
  saveFileDialog: (options: any) => ipcRenderer.invoke('save-file-dialog', options),
  openFileDialog: (options: any) => ipcRenderer.invoke('open-file-dialog', options),
  readFile: (filepath: string) => ipcRenderer.invoke('read-file', filepath),
  writeFile: (filepath: string, content: string) => ipcRenderer.invoke('write-file', filepath, content),

  // 윈도우 컨트롤 API
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
});

// TypeScript 타입 정의를 위한 글로벌 인터페이스
declare global {
  interface Window {
    electronAPI: {
      // 스토리지
      storageGet: (key: string) => Promise<any>;
      storageSet: (key: string, value: any) => Promise<void>;
      storageDelete: (key: string) => Promise<void>;
      storageGetAll: () => Promise<Record<string, any>>;
      storageClear: () => Promise<void>;

      // 파일 대화상자
      saveFileDialog: (options: any) => Promise<string | undefined>;
      openFileDialog: (options: any) => Promise<string | undefined>;
      readFile: (filepath: string) => Promise<string>;
      writeFile: (filepath: string, content: string) => Promise<void>;

      // 윈도우 컨트롤
      windowMinimize: () => Promise<void>;
      windowMaximize: () => Promise<void>;
      windowClose: () => Promise<void>;
    };
  }
}
