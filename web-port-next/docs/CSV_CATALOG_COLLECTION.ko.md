# CSV 정의 데이터 수집 결과

## 입력

| 파일 | 원본 묶음 | 정의 데이터 key | 경로 | 인코딩 | 수집 | 중복 | 무효 |
| --- | --- | --- | --- | --- | ---: | ---: | ---: |
| `Item.csv` | `ITEM` | `items` | `original-game/CSV/Item.csv` | `utf-8-sig` | 109 | 0 | 0 |
| `Abl.csv` | `ABL` | `abilities` | `original-game/CSV/Abl.csv` | `utf-16` | 34 | 0 | 0 |
| `BASE.csv` | `BASE` | `baseStats` | `original-game/CSV/BASE.csv` | `utf-16` | 23 | 0 | 0 |
| `Talent.csv` | `TALENT` | `talents` | `original-game/CSV/Talent.csv` | `utf-8-sig` | 261 | 0 | 0 |
| `exp.csv` | `EXP` | `experiences` | `original-game/CSV/exp.csv` | `utf-8-sig` | 82 | 0 | 0 |
| `Mark.csv` | `MARK` | `marks` | `original-game/CSV/Mark.csv` | `utf-8-sig` | 4 | 0 | 0 |
| `Palam.csv` | `PALAM` | `trainingParams` | `original-game/CSV/Palam.csv` | `utf-8-sig` | 17 | 0 | 0 |
| `Train.csv` | `TRAIN` | `trainingCommands` | `original-game/CSV/Train.csv` | `utf-8-sig` | 105 | 0 | 0 |
| `source.csv` | `SOURCE` | `sourceDefinitions` | `Ho版資料（作成中途）/source.csv` | `utf-8-sig` | 18 | 0 | 0 |
| `CSTR.csv` | `CSTR` | `characterTextDefinitions` | `original-game/CSV/CSTR.csv` | `utf-8-sig` | 5 | 0 | 0 |
| `cflag.csv` | `CFLAG` | `legacyCharacterFlagDefinitions` | `Ho版資料（作成中途）/cflag.csv` | `utf-8-sig` | 151 | 0 | 0 |

## 정의 데이터 크기

| 정의 데이터 key | 정의 수 |
| --- | ---: |
| `characters` | 109 |
| `baseStats` | 23 |
| `abilities` | 34 |
| `talents` | 261 |
| `experiences` | 82 |
| `marks` | 4 |
| `trainingParams` | 17 |
| `trainingCommands` | 105 |
| `sourceDefinitions` | 18 |
| `characterTextDefinitions` | 5 |
| `legacyCharacterFlagDefinitions` | 151 |
| `items` | 109 |

## Runtime bridge

`collect:catalog` 산출물은 원본 수집 결과를 보존하므로 `Item.csv` 109개를 `items`에 그대로 두고 `shopListings`는 0개로 기록한다. Runtime에서는 `src/catalog/legacyCatalog.ts`가 게임 구성 역할 기준으로 다시 나눈다.

| runtime 역할 | 수 | 기준 |
| --- | ---: | --- |
| 구매형 item 후보 | 46 | `Item.csv` 0~99. M6/M24 상점 구매 루프에서 사용한다. |
| 영입 listing 후보 | 48 | `Item.csv` 100~199. M7/M24 영입 루프에서 사용한다. |
| 특수 항목 후보 | 15 | `Item.csv` 200~214. M20/M24에서 실제 owner와 handler를 확정한다. |

이 차이는 산출물 누락이 아니라 raw artifact와 runtime bridge의 책임 차이다. 최종 완료는 각 항목이 consuming feature 또는 blocker를 가질 때만 인정한다.

## Chara CSV

- 파일 수: 109
- 캐릭터 템플릿: 109
- 초기값 행: 6922
- 중복 캐릭터 ID: 0
- 무효 Chara 행: 0
- 미분류 Chara 행: 0

## 진단

- 누락 파일: 0
- 인코딩 실패: 0
- 중복 ID: 0
- 무효 행: 0
- 빈 이름: 0
- 무효 가격: 0
- 중복 캐릭터 ID: 0
- 무효 Chara 행: 0
- 미분류 Chara 행: 0
- 중복 캐릭터 초기값: 0

## 산출물

- JSON: `data/catalog/legacy-catalog.json`
- 정의 TSV: `data/catalog/legacy-catalog-definitions.tsv`
- 캐릭터 TSV: `data/catalog/legacy-character-templates.tsv`
- 캐릭터 초기값 TSV: `data/catalog/legacy-character-initial-values.tsv`
- 재생성 명령: `npm run collect:catalog`
