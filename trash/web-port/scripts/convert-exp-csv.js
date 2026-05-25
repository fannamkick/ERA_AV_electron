const fs = require('fs');
const path = require('path');

// CSV 파일 읽기
const csvPath = path.join(__dirname, '../../CSV/exp.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// CSV 파싱
const lines = csvContent.split('\n');
const expData = {};

for (const line of lines) {
  const trimmed = line.trim();

  // 주석이나 빈 줄 스킵
  if (!trimmed || trimmed.startsWith(';') || trimmed === ',') {
    continue;
  }

  // 쉼표로 분리
  const parts = trimmed.split(',');
  if (parts.length >= 2) {
    const id = parts[0].trim();
    const name = parts[1].trim();

    // 숫자 ID만 처리
    if (id && name && !isNaN(id)) {
      expData[id] = name;
    }
  }
}

// JSON 파일로 저장
const outputPath = path.join(__dirname, '../src/data/json/exp.json');
fs.writeFileSync(outputPath, JSON.stringify(expData, null, 2), 'utf-8');

console.log(`✓ Converted ${Object.keys(expData).length} experience types to exp.json`);
