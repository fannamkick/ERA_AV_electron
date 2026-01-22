/**
 * CSV Parser Utility
 * Handles CSV parsing with Shift-JIS encoding support
 */

import Encoding from 'encoding-japanese';

/**
 * Parse CSV content to array of string arrays
 * @param content Raw CSV content (string or buffer)
 * @param options Parsing options
 */
export function parseCSV(
  content: string | Uint8Array,
  options: {
    skipComments?: boolean;
    trimValues?: boolean;
    encoding?: 'sjis' | 'utf8' | 'auto';
  } = {}
): string[][] {
  const {
    skipComments = true,
    trimValues = true,
    encoding = 'auto'
  } = options;

  let text: string;

  // Handle encoding
  if (content instanceof Uint8Array) {
    if (encoding === 'sjis') {
      const unicodeArray = Encoding.convert(content, {
        to: 'UNICODE',
        from: 'SJIS'
      });
      text = Encoding.codeToString(unicodeArray);
    } else if (encoding === 'utf8') {
      text = new TextDecoder('utf-8').decode(content);
    } else {
      // Auto-detect
      const detected = Encoding.detect(content);
      if (detected === 'SJIS' || detected === 'EUCJP') {
        const unicodeArray = Encoding.convert(content, {
          to: 'UNICODE',
          from: detected
        });
        text = Encoding.codeToString(unicodeArray);
      } else {
        text = new TextDecoder('utf-8').decode(content);
      }
    }
  } else {
    text = content;
  }

  // Remove BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.substring(1);
  }

  const lines = text.split(/\r?\n/);
  const result: string[][] = [];

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) {
      continue;
    }

    // Skip comment lines
    if (skipComments && (line.trim().startsWith(';') || line.trim().startsWith('//'))) {
      continue;
    }

    // Parse CSV line
    const fields = parseCSVLine(line, trimValues);
    result.push(fields);
  }

  return result;
}

/**
 * Parse a single CSV line, handling quoted fields
 */
function parseCSVLine(line: string, trim: boolean): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      fields.push(trim ? current.trim() : current);
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  fields.push(trim ? current.trim() : current);

  return fields;
}

/**
 * Parse key-value CSV format (used in Abl.csv, Palam.csv, Talent.csv)
 * Format: number,name,description
 */
export interface KeyValueEntry {
  id: number;
  name: string;
  description?: string;
}

export function parseKeyValueCSV(content: string | Uint8Array): KeyValueEntry[] {
  const rows = parseCSV(content, { skipComments: true, trimValues: true });
  const entries: KeyValueEntry[] = [];

  for (const row of rows) {
    if (row.length < 2) continue;

    const id = parseInt(row[0], 10);
    if (isNaN(id)) continue;

    entries.push({
      id,
      name: row[1],
      description: row[2] || undefined
    });
  }

  return entries;
}

/**
 * Parse character CSV format
 * Format: command,param1,param2,...
 */
export interface CharacterData {
  no: number;
  name: string;
  callname: string;
  price: Record<number, number>;
  abilities: Record<number, number>;
  talents: number[];
  experience: Record<number, number>;
  cflags: Record<number, number>;
  [key: string]: any;
}

export function parseCharacterCSV(content: string | Uint8Array, fileNo: number): CharacterData {
  const rows = parseCSV(content, { skipComments: true, trimValues: true });

  const character: CharacterData = {
    no: fileNo,
    name: '',
    callname: '',
    price: {},
    abilities: {},
    talents: [],
    experience: {},
    cflags: {}
  };

  for (const row of rows) {
    if (row.length < 2) continue;

    const command = row[0];
    const value1 = row[1];
    const value2 = row[2];

    switch (command) {
      case '番号':
      case 'NO':
        character.no = parseInt(value1, 10) || fileNo;
        break;

      case '名前':
      case 'NAME':
        character.name = value1;
        break;

      case '呼び名':
      case 'CALLNAME':
        character.callname = value1;
        break;

      case '相性':
      case 'TALENT':
        const talentId = parseInt(value1, 10);
        if (!isNaN(talentId)) {
          character.talents.push(talentId);
        }
        break;

      case '能力':
      case 'ABL':
        const ablId = parseInt(value1, 10);
        const ablValue = parseInt(value2, 10);
        if (!isNaN(ablId) && !isNaN(ablValue)) {
          character.abilities[ablId] = ablValue;
        }
        break;

      case '経験':
      case 'EXP':
        const expId = parseInt(value1, 10);
        const expValue = parseInt(value2, 10);
        if (!isNaN(expId) && !isNaN(expValue)) {
          character.experience[expId] = expValue;
        }
        break;

      case 'CFLAG':
        const cflagId = parseInt(value1, 10);
        const cflagValue = parseInt(value2, 10);
        if (!isNaN(cflagId) && !isNaN(cflagValue)) {
          character.cflags[cflagId] = cflagValue;
        }
        break;

      case '価格':
      case 'PRICE':
        const priceId = parseInt(value1, 10);
        const priceValue = parseInt(value2, 10);
        if (!isNaN(priceId) && !isNaN(priceValue)) {
          character.price[priceId] = priceValue;
        }
        break;
    }
  }

  return character;
}

/**
 * Load CSV file from filesystem (Node.js)
 */
export async function loadCSVFile(filepath: string): Promise<Uint8Array> {
  if (typeof window !== 'undefined' && window.electronAPI) {
    // Electron: Use IPC to read file as binary
    const content = await window.electronAPI.readFile(filepath);
    return new TextEncoder().encode(content);
  } else {
    // Browser: Use fetch
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }
}
