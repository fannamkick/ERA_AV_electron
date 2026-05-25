/**
 * CSV to JSON Conversion Tool
 * Converts CSV game data to JSON format for faster loading
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Encoding from 'encoding-japanese';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import CSV parser functions
function parseCSV(
  content: Uint8Array,
  options: {
    skipComments?: boolean;
    trimValues?: boolean;
  } = {}
): string[][] {
  const { skipComments = true, trimValues = true } = options;

  let text: string;

  // Check for UTF-16 LE BOM (FF FE)
  if (content[0] === 0xFF && content[1] === 0xFE) {
    text = new TextDecoder('utf-16le').decode(content);
  } else {
    // Auto-detect encoding with encoding-japanese
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

  // Remove BOM
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.substring(1);
  }

  const lines = text.split(/\r?\n/);
  const result: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    if (skipComments && (line.trim().startsWith(';') || line.trim().startsWith('//'))) continue;

    const fields = parseCSVLine(line, trimValues);
    result.push(fields);
  }

  return result;
}

function parseCSVLine(line: string, trim: boolean): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(trim ? current.trim() : current);
      current = '';
    } else {
      current += char;
    }
  }

  fields.push(trim ? current.trim() : current);
  return fields;
}

interface KeyValueEntry {
  id: number;
  name: string;
  description?: string;
}

async function convertKeyValueCSV(csvPath: string, jsonPath: string) {
  console.log(`Converting ${csvPath}...`);

  const content = await fs.readFile(csvPath);
  const rows = parseCSV(new Uint8Array(content));
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

  await fs.writeFile(jsonPath, JSON.stringify(entries, null, 2), 'utf-8');
  console.log(`  ✓ Converted ${entries.length} entries to ${jsonPath}`);
}

interface CharacterData {
  no: number;
  name: string;
  callname: string;
  price: Record<number, number>;
  abilities: Record<number, number>;
  talents: number[];
  experience: Record<number, number>;
  cflags: Record<number, number>;
}

async function convertCharacterCSV(csvPath: string, fileNo: number): Promise<CharacterData | null> {
  try {
    const content = await fs.readFile(csvPath);
    const rows = parseCSV(new Uint8Array(content));

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

    return character.name ? character : null;
  } catch (error) {
    return null;
  }
}

async function convertAllCharacters(csvDir: string, jsonPath: string) {
  console.log('Converting character files...');

  const files = await fs.readdir(csvDir);
  const characters: CharacterData[] = [];

  for (const file of files) {
    const match = file.match(/^Chara(\d+).*\.csv$/i);
    if (!match) continue;

    const no = parseInt(match[1], 10);
    const csvPath = path.join(csvDir, file);
    const character = await convertCharacterCSV(csvPath, no);

    if (character) {
      characters.push(character);
      console.log(`  ✓ Chara${no}: ${character.name}`);
    }
  }

  characters.sort((a, b) => a.no - b.no);
  await fs.writeFile(jsonPath, JSON.stringify(characters, null, 2), 'utf-8');
  console.log(`  ✓ Converted ${characters.length} characters to ${jsonPath}`);
}

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const csvDir = path.resolve(rootDir, '..', 'CSV');
  const dataDir = path.join(rootDir, 'src', 'data');
  const outputDir = path.join(dataDir, 'json');

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  console.log('=== CSV to JSON Conversion ===\n');

  // Convert Abl.csv
  await convertKeyValueCSV(
    path.join(csvDir, 'Abl.csv'),
    path.join(outputDir, 'abilities.json')
  );

  // Convert Palam.csv
  await convertKeyValueCSV(
    path.join(csvDir, 'Palam.csv'),
    path.join(outputDir, 'parameters.json')
  );

  // Convert Talent.csv
  await convertKeyValueCSV(
    path.join(csvDir, 'Talent.csv'),
    path.join(outputDir, 'talents.json')
  );

  // Convert all character files
  await convertAllCharacters(
    csvDir,
    path.join(outputDir, 'characters.json')
  );

  console.log('\n=== Conversion Complete ===');
}

main().catch(console.error);
