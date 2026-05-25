// CSV 파서 - 원본 CSV를 JSON으로 변환
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Encoding from 'encoding-japanese';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 원본 게임 경로
const ORIGINAL_CSV_PATH = 'e:\\ERA\\AV간편개조\\erAV_Ho_0.022(간편개조) - 복사본\\CSV';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data');

/**
 * CSV 파일 읽기 (인코딩 자동 감지)
 */
function readCSV(filePath) {
  const buffer = fs.readFileSync(filePath);
  const detectedEncoding = Encoding.detect(buffer) || 'SJIS';

  const unicodeArray = Encoding.convert(buffer, {
    to: 'UNICODE',
    from: detectedEncoding
  });

  return Encoding.codeToString(unicodeArray);
}

/**
 * CSV 텍스트를 파싱
 */
function parseCSVText(text, options = {}) {
  const {
    skipComments = true,
    skipEmpty = true
  } = options;

  const lines = text.split(/\r?\n/);
  const rows = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // 주석 또는 빈 라인 스킵
    if (skipComments && trimmed.startsWith(';')) continue;
    if (skipEmpty && !trimmed) continue;

    // CSV 파싱 (간단한 콤마 분리)
    const values = trimmed.split(',').map(v => v.trim());
    rows.push(values);
  }

  return rows;
}

/**
 * BASE.csv 파싱
 */
function parseBase(filePath) {
  const text = readCSV(filePath);
  const rows = parseCSVText(text);

  const baseMap = {};

  for (const row of rows) {
    const [id, name] = row;
    if (id && name) {
      baseMap[id] = name;
    }
  }

  return baseMap;
}

/**
 * Abl.csv 파싱
 */
function parseAbilities(filePath) {
  const text = readCSV(filePath);
  const rows = parseCSVText(text);

  const ablMap = {};

  for (const row of rows) {
    const [id, name] = row;
    if (id && name) {
      ablMap[id] = name;
    }
  }

  return ablMap;
}

/**
 * Palam.csv 파싱
 */
function parseParameters(filePath) {
  const text = readCSV(filePath);
  const rows = parseCSVText(text);

  const paramMap = {};

  for (const row of rows) {
    const [id, name] = row;
    if (id && name) {
      // BOM 제거
      const cleanName = name.replace(/^\uFEFF/, '');
      paramMap[id] = cleanName;
    }
  }

  return paramMap;
}

/**
 * 캐릭터 CSV 파싱
 */
function parseCharacter(filePath, baseMap, ablMap) {
  const text = readCSV(filePath);
  const rows = parseCSVText(text);

  const character = {
    baseStats: {},
    abilities: {},
    talent: [],
    mark: [],
    exp: [],
    relation: [],
    flags: {}
  };

  for (const row of rows) {
    const [type, key, value, comment] = row;

    switch (type) {
      case '番号':
        character.id = parseInt(key) || 0;
        break;

      case '名前':
        character.name = key;
        break;

      case '呼び名':
        character.callName = key;
        break;

      case 'あだ名':
        character.nickname = key;
        break;

      case '基礎':
        const baseName = baseMap[key];
        if (baseName && value) {
          character.baseStats[baseName] = parseInt(value) || 0;
        }
        break;

      case '能力':
        const ablName = ablMap[key];
        if (ablName && value) {
          character.abilities[ablName] = parseInt(value) || 0;
        }
        break;

      case '素質':
        if (key) {
          character.talent.push(parseInt(key) || 0);
        }
        break;

      case '刻印':
        if (key) {
          character.mark.push(parseInt(key) || 0);
        }
        break;

      case '経験':
        if (key && value) {
          character.exp.push({
            id: parseInt(key) || 0,
            value: parseInt(value) || 0
          });
        }
        break;

      case '相性':
      case '依存':
      case '従属':
        if (key && value) {
          character.relation.push({
            type,
            target: parseInt(key) || 0,
            value: parseInt(value) || 0
          });
        }
        break;
    }
  }

  return character;
}

/**
 * 메인 실행
 */
function main() {
  console.log('🚀 CSV 파싱 시작...\n');

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  // 1. BASE.csv 파싱
  console.log('📋 BASE.csv 파싱 중...');
  const baseMap = parseBase(path.join(ORIGINAL_CSV_PATH, 'BASE.csv'));
  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'base.json'),
    JSON.stringify(baseMap, null, 2),
    'utf-8'
  );
  console.log(`   ✅ ${Object.keys(baseMap).length}개 항목 파싱 완료\n`);

  // 2. Abl.csv 파싱
  console.log('📋 Abl.csv 파싱 중...');
  const ablMap = parseAbilities(path.join(ORIGINAL_CSV_PATH, 'Abl.csv'));
  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'abilities.json'),
    JSON.stringify(ablMap, null, 2),
    'utf-8'
  );
  console.log(`   ✅ ${Object.keys(ablMap).length}개 항목 파싱 완료\n`);

  // 3. Palam.csv 파싱
  console.log('📋 Palam.csv 파싱 중...');
  const paramMap = parseParameters(path.join(ORIGINAL_CSV_PATH, 'Palam.csv'));
  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'parameters.json'),
    JSON.stringify(paramMap, null, 2),
    'utf-8'
  );
  console.log(`   ✅ ${Object.keys(paramMap).length}개 항목 파싱 완료\n`);

  // 4. 캐릭터 파일들 파싱
  console.log('👤 캐릭터 파일 파싱 중...');
  const csvFiles = fs.readdirSync(ORIGINAL_CSV_PATH);
  const characterFiles = csvFiles.filter(f => f.startsWith('Chara') && f.endsWith('.csv'));

  const characters = [];

  for (const filename of characterFiles) {
    try {
      const filePath = path.join(ORIGINAL_CSV_PATH, filename);
      const character = parseCharacter(filePath, baseMap, ablMap);

      if (character.id && character.name) {
        characters.push(character);
        console.log(`   ✅ ${character.name} (ID: ${character.id})`);
      }
    } catch (error) {
      console.error(`   ❌ ${filename} 파싱 실패:`, error.message);
    }
  }

  // 캐릭터 ID 순으로 정렬
  characters.sort((a, b) => a.id - b.id);

  fs.writeFileSync(
    path.join(OUTPUT_PATH, 'characters.json'),
    JSON.stringify(characters, null, 2),
    'utf-8'
  );

  console.log(`\n✨ 파싱 완료!`);
  console.log(`   총 ${characters.length}명의 캐릭터 데이터 생성`);
  console.log(`   출력 경로: ${OUTPUT_PATH}`);
}

main();
