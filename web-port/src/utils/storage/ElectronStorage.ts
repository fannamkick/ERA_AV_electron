/**
 * Electron Storage Implementation
 * Uses electron-store via IPC for persistent storage
 */

import { IStorage } from './IStorage';

export class ElectronStorage implements IStorage {
  private get electronAPI() {
    if (typeof window !== 'undefined' && window.electronAPI) {
      return window.electronAPI;
    }
    throw new Error('Electron API not available');
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const value = await this.electronAPI.storageGet(key);
      return value !== undefined ? String(value) : null;
    } catch (error) {
      console.error('ElectronStorage.getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await this.electronAPI.storageSet(key, value);
    } catch (error) {
      console.error('ElectronStorage.setItem error:', error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.electronAPI.storageDelete(key);
    } catch (error) {
      console.error('ElectronStorage.removeItem error:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const store = await this.electronAPI.storageGetAll();
      return Object.keys(store);
    } catch (error) {
      console.error('ElectronStorage.getAllKeys error:', error);
      return [];
    }
  }

  async clear(): Promise<void> {
    try {
      await this.electronAPI.storageClear();
    } catch (error) {
      console.error('ElectronStorage.clear error:', error);
      throw error;
    }
  }
}
