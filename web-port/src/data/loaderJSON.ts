/**
 * JSON Data Loader
 * Loads pre-converted JSON data files
 */

import abilitiesData from './json/abilities.json';
import parametersData from './json/parameters.json';
import talentsData from './json/talents.json';
import charactersData from './json/characters.json';
import expData from './json/exp.json';

export interface AbilityDefinition {
  id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface ParameterDefinition {
  id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface TalentDefinition {
  id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface CharacterData {
  no: number;
  name: string;
  callname: string;
  price: Record<number, number>;
  abilities: Record<number, number>;
  talents: number[];
  experience: Record<number, number>;
  cflags: Record<number, number>;
}

/**
 * Game data repository
 */
export class GameData {
  private static instance: GameData;

  private abilities: Map<number, AbilityDefinition>;
  private parameters: Map<number, ParameterDefinition>;
  private talents: Map<number, TalentDefinition>;
  private characters: Map<number, CharacterData>;
  private experiences: Map<number, string>;

  private constructor() {
    // Load and index all data
    this.abilities = new Map(
      (abilitiesData as AbilityDefinition[]).map(a => [a.id, this.addAbilityCategory(a)])
    );

    this.parameters = new Map(
      (parametersData as ParameterDefinition[]).map(p => [p.id, this.addParameterCategory(p)])
    );

    this.talents = new Map(
      (talentsData as TalentDefinition[]).map(t => [t.id, this.addTalentCategory(t)])
    );

    this.characters = new Map(
      (charactersData as CharacterData[]).map(c => [c.no, c])
    );

    this.experiences = new Map(
      Object.entries(expData as Record<string, string>).map(([id, name]) => [parseInt(id), name])
    );

    console.log(`[GameData] Loaded:`);
    console.log(`  - ${this.abilities.size} abilities`);
    console.log(`  - ${this.parameters.size} parameters`);
    console.log(`  - ${this.talents.size} talents`);
    console.log(`  - ${this.characters.size} characters`);
    console.log(`  - ${this.experiences.size} experiences`);
  }

  static getInstance(): GameData {
    if (!GameData.instance) {
      GameData.instance = new GameData();
    }
    return GameData.instance;
  }

  // Ability queries
  getAbility(id: number): AbilityDefinition | undefined {
    return this.abilities.get(id);
  }

  getAllAbilities(): AbilityDefinition[] {
    return Array.from(this.abilities.values());
  }

  getAbilitiesByCategory(category: string): AbilityDefinition[] {
    return this.getAllAbilities().filter(a => a.category === category);
  }

  // Parameter queries
  getParameter(id: number): ParameterDefinition | undefined {
    return this.parameters.get(id);
  }

  getAllParameters(): ParameterDefinition[] {
    return Array.from(this.parameters.values());
  }

  getParametersByCategory(category: string): ParameterDefinition[] {
    return this.getAllParameters().filter(p => p.category === category);
  }

  // Talent queries
  getTalent(id: number): TalentDefinition | undefined {
    return this.talents.get(id);
  }

  getAllTalents(): TalentDefinition[] {
    return Array.from(this.talents.values());
  }

  getTalentsByCategory(category: string): TalentDefinition[] {
    return this.getAllTalents().filter(t => t.category === category);
  }

  // Character queries
  getCharacter(no: number): CharacterData | undefined {
    return this.characters.get(no);
  }

  getAllCharacters(): CharacterData[] {
    return Array.from(this.characters.values());
  }

  getCharactersByName(namePattern: string): CharacterData[] {
    const pattern = namePattern.toLowerCase();
    return this.getAllCharacters().filter(c =>
      c.name.toLowerCase().includes(pattern) ||
      c.callname.toLowerCase().includes(pattern)
    );
  }

  // Experience queries
  getExperience(id: number): string | undefined {
    return this.experiences.get(id);
  }

  getExperienceName(id: number): string {
    return this.experiences.get(id) || `EXP[${id}]`;
  }

  // Category helpers
  private addAbilityCategory(ability: AbilityDefinition): AbilityDefinition {
    return {
      ...ability,
      category: this.getAbilityCategory(ability.id)
    };
  }

  private addParameterCategory(parameter: ParameterDefinition): ParameterDefinition {
    return {
      ...parameter,
      category: this.getParameterCategory(parameter.id)
    };
  }

  private addTalentCategory(talent: TalentDefinition): TalentDefinition {
    return {
      ...talent,
      category: this.getTalentCategory(talent.id)
    };
  }

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
export const gameData = GameData.getInstance();
