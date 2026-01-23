# Parsed Data from Original Game CSV

이 폴더는 `../original-game/CSV/` 파일들을 파싱하여 생성된 TypeScript 상수입니다.

## 파일 목록
- abilities.ts - ABL (능력치) - 정본: CSV/Abl.csv
- parameters.ts - PALAM (파라미터) - 정본: CSV/Palam.csv
- talents.ts - TALENT (특성) - 정본: CSV/Talent.csv
- experience.ts - EXP (경험치) - 정본: CSV/Exp.csv
- items.ts - ITEM (아이템) - 정본: CSV/Item.csv
- marks.ts - MARK (각인) - 정본: CSV/Mark.csv

## 재생성 방법
```bash
cd ../scripts
node parse-csv.js
```

## 주요 상수 확인

### ABL (능력치)
- 10 = **신뢰** (順從 아님!)
- types/training.ts에 "순종"으로 잘못 기록되어 있었음

### PALAM (파라미터)
- 3 = **윤활**
- 14 = **쾌B** (3번이 아님!)
- types/training.ts에 잘못된 매핑이 있었음

## 주의사항
- 이 파일들은 CSV에서 자동 생성됩니다.
- **수동으로 수정하지 마세요.**
- 정본은 `../original-game/CSV/`입니다.
- 수정이 필요하면 CSV를 수정하고 재생성하세요.
