// Electron 메인 프로세스
import electron from 'electron';
import type { BrowserWindow as BrowserWindowType, IpcMainInvokeEvent, SaveDialogOptions, OpenDialogOptions } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';

const { app, BrowserWindow, ipcMain, dialog } = electron;

let mainWindow: BrowserWindowType | null = null;
let storageCache: Record<string, any> = {};

// 세이브 파일 경로 (app.whenReady() 이후 초기화됨)
let SAVE_DIR: string;
let STORAGE_FILE: string;

// 세이브 디렉토리 생성
async function ensureSaveDir() {
  try {
    await fs.mkdir(SAVE_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create save directory:', error);
  }
}

// 스토리지 파일 로드
async function loadStorage() {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    storageCache = JSON.parse(data);
    console.log('[Storage] Loaded from file:', STORAGE_FILE);
  } catch (error) {
    // 파일이 없으면 빈 객체로 시작
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      storageCache = {};
      console.log('[Storage] No existing storage file, starting fresh');
    } else {
      console.error('[Storage] Failed to load:', error);
      storageCache = {};
    }
  }
}

// 스토리지 파일 저장
async function saveStorage() {
  try {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(storageCache, null, 2), 'utf-8');
    console.log('[Storage] Saved to file:', STORAGE_FILE);
  } catch (error) {
    console.error('[Storage] Failed to save:', error);
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#000000',
    frame: false, // 기본 윈도우 프레임 제거
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow = win;

  // 개발 모드에서는 Vite 개발 서버 URL 사용
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    // 프로덕션에서는 빌드된 파일 로드
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  win.on('closed', () => {
    mainWindow = null;
  });
}

// 앱 준비 완료
app.whenReady().then(async () => {
  // 경로 초기화 (app.whenReady() 이후에만 가능)
  SAVE_DIR = path.join(app.getPath('userData'), 'saves');
  STORAGE_FILE = path.join(app.getPath('userData'), 'storage.json');

  await ensureSaveDir();
  await loadStorage();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 앱 종료 전에 스토리지 저장
app.on('before-quit', async () => {
  await saveStorage();
});

// 모든 윈도우 닫힘
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ========== 스토리지 IPC 핸들러 ==========

ipcMain.handle('storage-get', async (_event: IpcMainInvokeEvent, key: string) => {
  return storageCache[key] ?? null;
});

ipcMain.handle('storage-set', async (_event: IpcMainInvokeEvent, key: string, value: any) => {
  storageCache[key] = value;
  await saveStorage(); // 즉시 저장
});

ipcMain.handle('storage-delete', async (_event: IpcMainInvokeEvent, key: string) => {
  delete storageCache[key];
  await saveStorage();
});

ipcMain.handle('storage-get-all', async () => {
  return storageCache;
});

ipcMain.handle('storage-clear', async () => {
  storageCache = {};
  await saveStorage();
});

// ========== 파일 대화상자 IPC 핸들러 ==========

ipcMain.handle('save-file-dialog', async (_event: IpcMainInvokeEvent, options: SaveDialogOptions) => {
  const result = await dialog.showSaveDialog(mainWindow!, options);
  return result.filePath; // canceled이면 undefined 반환
});

ipcMain.handle('open-file-dialog', async (_event: IpcMainInvokeEvent, options: OpenDialogOptions) => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    ...options,
    properties: ['openFile'], // 단일 파일 선택
  });
  return result.filePaths[0]; // canceled이면 undefined 반환
});

ipcMain.handle('read-file', async (_event: IpcMainInvokeEvent, filepath: string) => {
  try {
    return await fs.readFile(filepath, 'utf-8');
  } catch (error) {
    console.error('Failed to read file:', error);
    throw error;
  }
});

ipcMain.handle('write-file', async (_event: IpcMainInvokeEvent, filepath: string, content: string) => {
  try {
    await fs.writeFile(filepath, content, 'utf-8');
  } catch (error) {
    console.error('Failed to write file:', error);
    throw error;
  }
});

// ========== 윈도우 컨트롤 IPC 핸들러 ==========

ipcMain.handle('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});
