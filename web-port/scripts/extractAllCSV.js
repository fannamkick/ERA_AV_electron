/**
 * Complete CSV Data Extraction Script
 * 모든 CSV 파일에서 데이터를 추출하여 TypeScript 상수로 변환
 */

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const CSV_DIR = path.join(__dirname, '..', '..', 'original-game', 'CSV');
const OUTPUT_DIR = path.join(__dirname, '..', 'data');
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// 출력 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

/**
 * CSV 파일 읽기 (인코딩 자동 감지)
 */
function readCSV(filename) {
  const filepath = path.join(CSV_DIR, filename);
  const buffer = fs.readFileSync(filepath);

  // UTF-16LE 체크
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    return iconv.decode(buffer, 'utf16le');
  }

  // UTF-8 BOM 체크
  if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    return iconv.decode(buffer.slice(3), 'utf8');
  }

  // 기본 UTF-8
  return iconv.decode(buffer, 'utf8');
}

/**
 * CSV 파싱 (key-value 형식)
 */
function parseKeyValueCSV(content) {
  const lines = content.split(/\r?\n/);
  const entries = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('//')) {
      continue;
    }

    const fields = trimmed.split(',');
    if (fields.length < 2) continue;

    const id = parseInt(fields[0], 10);
    if (isNaN(id)) continue;

    const name = fields[1].trim();
    const description = fields[2] ? fields[2].trim() : '';

    entries.push({ id, name, description });
  }

  return entries;
}

/**
 * TypeScript 상수 파일 생성
 */
function generateTSFile(filename, entries, mapName, listName, categoriesName, categoryRanges) {
  const outputPath = path.join(OUTPUT_DIR, filename);

  let content = `/**
 * Auto-generated from CSV files
 * DO NOT EDIT MANUALLY
 */

export const ${mapName}: Record<number, string> = {
`;

  entries.forEach(entry => {
    content += `  "${entry.id}": "${entry.name}",\n`;
  });

  content += `};

export const ${listName} = [
`;

  entries.forEach(entry => {
    content += `  {\n`;
    content += `    "id": ${entry.id},\n`;
    content += `    "name": "${entry.name}",\n`;
    content += `    "description": "${entry.description}"\n`;
    content += `  },\n`;
  });

  content += `];
`;

  // 카테고리 생성
  if (categoriesName && categoryRanges) {
    content += `\nexport const ${categoriesName} = {\n`;

    for (const [categoryName, [minId, maxId]] of Object.entries(categoryRanges)) {
      const categoryEntries = entries.filter(e => e.id >= minId && e.id <= maxId);
      if (categoryEntries.length === 0) continue;

      content += `  "${categoryName}": [\n`;
      categoryEntries.forEach(entry => {
        content += `    {\n`;
        content += `      "id": ${entry.id},\n`;
        content += `      "name": "${entry.name}",\n`;
        content += `      "description": "${entry.description}"\n`;
        content += `    },\n`;
      });
      content += `  ],\n`;
    }

    content += `};
`;
  }

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✅ Generated: ${filename} (${entries.length} entries)`);

  return entries.length;
}

/**
 * 데이터 추출 및 생성
 */
function extractAllData() {
  console.log('📊 Starting CSV data extraction...\n');

  const stats = {};

  // 1. Abilities (Abl.csv)
  console.log('🔹 Processing Abl.csv...');
  const ablContent = readCSV('Abl.csv');
  const abilities = parseKeyValueCSV(ablContent);
  stats.abilities = generateTSFile(
    'abilities.ts',
    abilities,
    'ABILITIES_MAP',
    'ABILITIES_LIST',
    'ABILITIES_CATEGORIES',
    {
      '감각 (0-3)': [0, 3],
      '기술 (10-17)': [10, 17],
      '성벽 (20-23)': [20, 23],
      '중독 (30-41)': [30, 41],
      '스펙 (50-52)': [50, 52],
      '특수기능 (70-73)': [70, 73],
      '지식 (80-81)': [80, 81],
    }
  );

  // 2. Parameters (Palam.csv)
  console.log('🔹 Processing Palam.csv...');
  const palamContent = readCSV('Palam.csv');
  const parameters = parseKeyValueCSV(palamContent);
  stats.parameters = generateTSFile(
    'parameters.ts',
    parameters,
    'PARAMETERS_MAP',
    'PARAMETERS_LIST',
    null,
    null
  );

  // 3. Talents (Talent.csv)
  console.log('🔹 Processing Talent.csv...');
  const talentContent = readCSV('Talent.csv');
  const talents = parseKeyValueCSV(talentContent);
  stats.talents = generateTSFile(
    'talents.ts',
    talents,
    'TALENTS_MAP',
    'TALENTS_LIST',
    'TALENTS_CATEGORIES',
    {
      '기본소질 (0-9)': [0, 9],
      '성격 (10-19)': [10, 19],
      '성에 대한 관심 (20-29)': [20, 29],
      '처녀성 (30-39)': [30, 39],
      '체질 (40-49)': [40, 49],
      '기술 (50-59)': [50, 59],
      '결벽도 (60-69)': [60, 69],
      '솔직도 (70-79)': [70, 79],
      '성벽 (80-99)': [80, 99],
      '신체특징 (100-149)': [100, 149],
      '관계 (150-199)': [150, 199],
      '기타 (200+)': [200, 9999],
    }
  );

  // 4. Base (BASE.csv)
  console.log('🔹 Processing BASE.csv...');
  const baseContent = readCSV('BASE.csv');
  const base = parseKeyValueCSV(baseContent);
  stats.base = generateTSFile(
    'base.ts',
    base,
    'BASE_MAP',
    'BASE_LIST',
    null,
    null
  );

  // 5. Experience (exp.csv)
  console.log('🔹 Processing exp.csv...');
  const expContent = readCSV('exp.csv');
  const experience = parseKeyValueCSV(expContent);
  stats.experience = generateTSFile(
    'experience.ts',
    experience,
    'EXPERIENCE_MAP',
    'EXPERIENCE_LIST',
    'EXPERIENCE_CATEGORIES',
    {
      '기본경험 (0-9)': [0, 9],
      '자위/개발 (10-19)': [10, 19],
      '봉사 (20-29)': [20, 29],
      '특수플레이 (30-39)': [30, 39],
      '성벽 (40-49)': [40, 49],
      '이상/확장 (50-60)': [50, 60],
      '특수능력 (61-84)': [61, 84],
      '기타 (90-99)': [90, 99],
      '특별 (100+)': [100, 9999],
    }
  );

  // 6. Training Commands (Train.csv)
  console.log('🔹 Processing Train.csv...');
  const trainContent = readCSV('Train.csv');
  const training = parseKeyValueCSV(trainContent);
  stats.training = generateTSFile(
    'training.ts',
    training,
    'TRAINING_MAP',
    'TRAINING_LIST',
    'TRAINING_CATEGORIES',
    {
      '애무 (0-9)': [0, 9],
      '도구사용 (10-19)': [10, 19],
      '섹스 (20-29)': [20, 29],
      '봉사 (30-39)': [30, 39],
      '특수 (40-49)': [40, 49],
      '레즈 (50-59)': [50, 59],
      '변태플레이 (60-69)': [60, 69],
      '아날 (70-79)': [70, 79],
      '가학 (80-89)': [80, 89],
      '기타 (90+)': [90, 9999],
    }
  );

  // 7. Items (Item.csv)
  console.log('🔹 Processing Item.csv...');
  const itemContent = readCSV('Item.csv');
  const items = parseKeyValueCSV(itemContent);
  stats.items = generateTSFile(
    'items.ts',
    items,
    'ITEMS_MAP',
    'ITEMS_LIST',
    'ITEMS_CATEGORIES',
    {
      '조교도구 (0-23)': [0, 23],
      '소모품 (24-29)': [24, 29],
      '회복/버프 (30-39)': [30, 39],
      '특수아이템 (40-52)': [40, 52],
      '코스프레 (60-79)': [60, 79],
      '기타 (80+)': [80, 9999],
    }
  );

  // 8. Marks (Mark.csv)
  console.log('🔹 Processing Mark.csv...');
  const markContent = readCSV('Mark.csv');
  const marks = parseKeyValueCSV(markContent);
  stats.marks = generateTSFile(
    'marks.ts',
    marks,
    'MARKS_MAP',
    'MARKS_LIST',
    null,
    null
  );

  console.log('\n✅ All CSV files processed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Abilities: ${stats.abilities}`);
  console.log(`   - Parameters: ${stats.parameters}`);
  console.log(`   - Talents: ${stats.talents}`);
  console.log(`   - Base: ${stats.base}`);
  console.log(`   - Experience: ${stats.experience}`);
  console.log(`   - Training: ${stats.training}`);
  console.log(`   - Items: ${stats.items}`);
  console.log(`   - Marks: ${stats.marks}`);
  console.log(`   Total: ${Object.values(stats).reduce((a, b) => a + b, 0)} entries\n`);

  return stats;
}

// 실행
try {
  extractAllData();
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
