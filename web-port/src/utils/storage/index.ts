/**
 * Storage Factory
 * Automatically selects the appropriate storage implementation
 */

import { IStorage } from './IStorage';
import { ElectronStorage } from './ElectronStorage';
import { BrowserStorage } from './BrowserStorage';

/**
 * Detect if running in Electron environment
 */
function isElectron(): boolean {
  return typeof window !== 'undefined' && window.electronAPI !== undefined;
}

/**
 * Create storage instance based on environment
 */
function createStorage(): IStorage {
  if (isElectron()) {
    console.log('[Storage] Using ElectronStorage');
    return new ElectronStorage();
  } else {
    console.log('[Storage] Using BrowserStorage (fallback)');
    return new BrowserStorage();
  }
}

// Export singleton instance
export const storage = createStorage();

// Export types and classes for testing
export type { IStorage };
export { ElectronStorage, BrowserStorage };
