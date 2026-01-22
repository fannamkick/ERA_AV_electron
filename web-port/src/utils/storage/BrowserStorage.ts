/**
 * Browser Storage Implementation (Fallback)
 * Uses localStorage for browser-based environments
 */

import { IStorage } from './IStorage';

export class BrowserStorage implements IStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('BrowserStorage.getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('BrowserStorage.setItem error:', error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('BrowserStorage.removeItem error:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('BrowserStorage.getAllKeys error:', error);
      return [];
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('BrowserStorage.clear error:', error);
      throw error;
    }
  }
}
