"use strict";
// Electron Preload 스크립트
// 렌더러 프로세스와 메인 프로세스 간의 안전한 통신 브리지
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const { contextBridge, ipcRenderer } = electron_1.default;
// window 객체에 안전하게 API 노출
contextBridge.exposeInMainWorld('electronAPI', {
    // 스토리지 API (storage.ts 호환)
    storageGet: (key) => ipcRenderer.invoke('storage-get', key),
    storageSet: (key, value) => ipcRenderer.invoke('storage-set', key, value),
    storageDelete: (key) => ipcRenderer.invoke('storage-delete', key),
    storageGetAll: () => ipcRenderer.invoke('storage-get-all'),
    storageClear: () => ipcRenderer.invoke('storage-clear'),
    // 파일 대화상자 API (saveSystem.ts 호환)
    saveFileDialog: (options) => ipcRenderer.invoke('save-file-dialog', options),
    openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options),
    readFile: (filepath) => ipcRenderer.invoke('read-file', filepath),
    writeFile: (filepath, content) => ipcRenderer.invoke('write-file', filepath, content),
    // 윈도우 컨트롤 API
    windowMinimize: () => ipcRenderer.invoke('window-minimize'),
    windowMaximize: () => ipcRenderer.invoke('window-maximize'),
    windowClose: () => ipcRenderer.invoke('window-close'),
});
