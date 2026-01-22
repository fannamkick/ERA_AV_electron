/**
 * Storage Interface
 * Abstract storage layer for cross-platform compatibility
 */

export interface IStorage {
  /**
   * Get an item from storage
   * @param key Storage key
   * @returns Promise resolving to the stored value, or null if not found
   */
  getItem(key: string): Promise<string | null>;

  /**
   * Set an item in storage
   * @param key Storage key
   * @param value Value to store (will be stringified if necessary)
   */
  setItem(key: string, value: string): Promise<void>;

  /**
   * Remove an item from storage
   * @param key Storage key to remove
   */
  removeItem(key: string): Promise<void>;

  /**
   * Get all storage keys
   * @returns Promise resolving to array of all keys
   */
  getAllKeys(): Promise<string[]>;

  /**
   * Clear all storage
   */
  clear(): Promise<void>;
}
