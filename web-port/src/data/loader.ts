/**
 * CSV Data Loader
 * Loads and caches game data from CSV files
 */

import {
  parseKeyValueCSV,
  parseCharacterCSV,
  loadCSVFile,
  KeyValueEntry,
  CharacterData
} from './csvParser';

export interface AbilityDefinition extends KeyValueEntry {
  category?: string;
}

export interface ParameterDefinition extends KeyValueEntry {
  category?: string;
}

export interface TalentDefinition extends KeyValueEntry {
  category?: string;
}

/**
 * Data loader singleton
 */
export class DataLoader {
  private static instance: DataLoader;

  private abilitiesCache: AbilityDefinition[] | null = null;
  private parametersCache: ParameterDefinition[] | null = null;
  private talentsCache: TalentDefinition[] | null = null;
  private charactersCache: Map<number, CharacterData> = new Map();

  private basePath: string;

  private constructor(basePath: string = '/CSV') {
    this.basePath = basePath;
  }

  static getInstance(basePath?: string): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader(basePath);
    }
    return DataLoader.instance;
  }

  /**
   * Load ability definitions from Abl.csv
   */
  async loadAbilities(): Promise<AbilityDefinition[]> {
    if (this.abilitiesCache) {
      return this.abilitiesCache;
    }

    try {
      const csvData = await loadCSVFile(`${this.basePath}/Abl.csv`);
      const entries = parseKeyValueCSV(csvData);

      // Add categories based on ID ranges (from original ERB comments)
      this.abilitiesCache = entries.map(entry => ({
        ...entry,
        category: this.getAbilityCategory(entry.id)
      }));

      console.log(`[DataLoader] Loaded ${this.abilitiesCache.length} abilities`);
      return this.abilitiesCache;
    } catch (error) {
      console.error('[DataLoader] Failed to load abilities:', error);
      return [];
    }
  }

  /**
   * Load parameter definitions from Palam.csv
   */
  async loadParameters(): Promise<ParameterDefinition[]> {
    if (this.parametersCache) {
      return this.parametersCache;
    }

    try {
      const csvData = await loadCSVFile(`${this.basePath}/Palam.csv`);
      const entries = parseKeyValueCSV(csvData);

      this.parametersCache = entries.map(entry => ({
        ...entry,
        category: this.getParameterCategory(entry.id)
      }));

      console.log(`[DataLoader] Loaded ${this.parametersCache.length} parameters`);
      return this.parametersCache;
    } catch (error) {
      console.error('[DataLoader] Failed to load parameters:', error);
      return [];
    }
  }

  /**
   * Load talent definitions from Talent.csv
   */
  async loadTalents(): Promise<TalentDefinition[]> {
    if (this.talentsCache) {
      return this.talentsCache;
    }

    try {
      const csvData = await loadCSVFile(`${this.basePath}/Talent.csv`);
      const entries = parseKeyValueCSV(csvData);

      this.talentsCache = entries.map(entry => ({
        ...entry,
        category: this.getTalentCategory(entry.id)
      }));

      console.log(`[DataLoader] Loaded ${this.talentsCache.length} talents`);
      return this.talentsCache;
    } catch (error) {
      console.error('[DataLoader] Failed to load talents:', error);
      return [];
    }
  }

  /**
   * Load a single character from Chara{no}.csv
   */
  async loadCharacter(no: number): Promise<CharacterData | null> {
    if (this.charactersCache.has(no)) {
      return this.charactersCache.get(no)!;
    }

    try {
      const csvData = await loadCSVFile(`${this.basePath}/Chara${no}.csv`);
      const character = parseCharacterCSV(csvData, no);

      this.charactersCache.set(no, character);
      console.log(`[DataLoader] Loaded character ${no}: ${character.name}`);
      return character;
    } catch (error) {
      console.error(`[DataLoader] Failed to load character ${no}:`, error);
      return null;
    }
  }

  /**
   * Load all characters (Chara0.csv ~ Chara150.csv)
   */
  async loadAllCharacters(maxNo: number = 150): Promise<CharacterData[]> {
    const characters: CharacterData[] = [];

    for (let i = 0; i <= maxNo; i++) {
      const character = await this.loadCharacter(i);
      if (character) {
        characters.push(character);
      }
    }

    console.log(`[DataLoader] Loaded ${characters.length} characters total`);
    return characters;
  }

  /**
   * Get ability by ID
   */
  async getAbility(id: number): Promise<AbilityDefinition | undefined> {
    const abilities = await this.loadAbilities();
    return abilities.find(a => a.id === id);
  }

  /**
   * Get parameter by ID
   */
  async getParameter(id: number): Promise<ParameterDefinition | undefined> {
    const parameters = await this.loadParameters();
    return parameters.find(p => p.id === id);
  }

  /**
   * Get talent by ID
   */
  async getTalent(id: number): Promise<TalentDefinition | undefined> {
    const talents = await this.loadTalents();
    return talents.find(t => t.id === id);
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.abilitiesCache = null;
    this.parametersCache = null;
    this.talentsCache = null;
    this.charactersCache.clear();
    console.log('[DataLoader] Cache cleared');
  }

  // Helper methods for categorization

  private getAbilityCategory(id: number): string {
    if (id >= 0 && id <= 3) return '감각';
    if (id >= 10 && id <= 17) return '기본능력';
    if (id >= 20 && id <= 23) return '성교기술';
    if (id >= 30 && id <= 33) return '요구';
    if (id >= 40 && id <= 43) return '변태';
    return '기타';
  }

  private getParameterCategory(id: number): string {
    if (id >= 0 && id <= 3) return '쾌감';
    if (id >= 4 && id <= 8) return '정신';
    if (id >= 9 && id <= 13) return '고통';
    if (id === 14) return '쾌B';
    if (id === 15) return '향락';
    return '기타';
  }

  private getTalentCategory(id: number): string {
    if (id >= 0 && id <= 9) return '기본소질';
    if (id >= 10 && id <= 19) return '성격';
    if (id >= 20 && id <= 29) return '성에 대한 관심';
    if (id >= 30 && id <= 39) return '체형';
    if (id >= 40 && id <= 49) return '외모';
    if (id >= 50 && id <= 69) return '신체특징';
    if (id >= 70 && id <= 99) return '경험';
    if (id >= 100 && id <= 119) return '기호';
    if (id >= 120 && id <= 149) return '직업';
    if (id >= 150 && id <= 199) return '관계';
    return '기타';
  }
}

// Export singleton instance
export const dataLoader = DataLoader.getInstance();
