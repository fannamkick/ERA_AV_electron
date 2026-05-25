/**
 * Item.csv를 JSON으로 변환
 */

import * as fs from 'fs';
import * as path from 'path';
import * as Encoding from 'encoding-japanese';

interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: 'tool' | 'consumable' | 'costume' | 'special' | 'character' | 'magic';
}

function detectCategory(id: number, name: string): Item['category'] {
  if (id >= 200) return 'magic';
  if (id >= 100 && id < 150) return 'character';
  if (id === 150) return 'special';

  // 0-99: 일반 아이템
  if (name.includes('의상') || name.includes('코스프레')) return 'costume';
  if (name.includes('제') || name.includes('약') || name.includes('콘돔') || name.includes('테이프')) return 'consumable';
  if (name.includes('지식') || name.includes('Lv') || name.includes('광고')) return 'special';

  return 'tool';
}

function convertItemCSV() {
  const csvPath = path.join(__dirname, '../../CSV/Item.csv');
  const outputPath = path.join(__dirname, '../public/data/items.json');

  // CSV 파일 읽기 (Shift-JIS)
  const buffer = fs.readFileSync(csvPath);
  const detectedEncoding = Encoding.detect(buffer);
  const unicodeArray = Encoding.convert(buffer, {
    to: 'UNICODE',
    from: detectedEncoding || 'SJIS',
    type: 'string'
  });

  const content = unicodeArray as string;
  const lines = content.split(/\r?\n/);

  const items: Item[] = [];

  for (const line of lines) {
    // 빈 줄 또는 주석 건너뛰기
    if (!line.trim() || line.trim().startsWith(';')) continue;

    // CSV 파싱 (간단하게)
    const parts = line.split(',');
    if (parts.length < 3) continue;

    const id = parseInt(parts[0]);
    const name = parts[1].trim();
    const price = parseInt(parts[2]);
    const description = parts[3] ? parts[3].replace(/;/g, '').trim() : undefined;

    if (isNaN(id) || !name || isNaN(price)) continue;

    const category = detectCategory(id, name);

    items.push({
      id,
      name,
      price,
      description,
      category
    });
  }

  // 출력 디렉토리 생성
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // JSON 저장
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');

  console.log(`✓ Converted ${items.length} items to ${outputPath}`);

  // 카테고리별 통계
  const stats: Record<string, number> = {};
  items.forEach(item => {
    stats[item.category] = (stats[item.category] || 0) + 1;
  });

  console.log('\n카테고리별 아이템 수:');
  Object.entries(stats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}개`);
  });
}

convertItemCSV();
