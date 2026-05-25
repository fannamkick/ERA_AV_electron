"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require('electron');
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
