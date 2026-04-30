# 원본 근거 대조 정책

이 문서는 M17의 기준 문서다. 목적은 원본 ERB/CSV/Chara 근거를 새 도메인 구조에 연결할 때 어떤 상태값, 근거, 승인 절차를 요구하는지 고정하는 것이다.

M17에서는 대량 변환표를 확정하지 않는다. 의미가 분명한 것처럼 보이더라도 전수표 없이 임의로 `mapped` 처리하지 않는다. 실제 전수표 작성은 M19~M22에서 한다.

## 적용 범위

| 대상 | 산출물 | 담당 마일스톤 |
| --- | --- | --- |
| 기능 흐름 | `data/coverage/features.json` | M19 |
| 정의 데이터 | `data/coverage/definitions.json` | M20 |
| 저장 상태 주소 | `data/coverage/save-mapping.json` | M21 |
| 세션/계산 주소 | `data/coverage/session-mapping.json` | M22 |
| blocker | `data/coverage/blockers.json` | M19~M30 |
| 사용자 승인 제외 | `data/coverage/approved-exclusions.json` | M19~M30 |

## 상태값

| 상태값 | 의미 | M30 허용 | 사용 가능 범위 |
| --- | --- | --- | --- |
| `implemented` | 기능 row가 원본 근거, runtime route/action/view/handler, 성공/실패/취소 또는 예외 검증을 모두 가진다 | 허용 | feature coverage |
| `mapped` | 원본 저장/session 주소가 새 runtime owner와 field path 또는 calculation owner로 확정됐다 | 허용 | save/session mapping |
| `used` | 정의 데이터가 runtime owner와 consuming feature를 가진다 | 허용 | definition coverage |
| `display-only` | 정의 데이터가 계산/저장에는 쓰이지 않고 화면 표시 근거로만 쓰인다 | 허용 | definition coverage |
| `calculation-only` | 정의 데이터가 화면 진입점 없이 계산 규칙으로만 소비된다 | 허용 | definition coverage |
| `template` | 정의 데이터가 인스턴스 생성 seed 또는 원형으로 쓰인다 | 허용 | definition coverage |
| `listing` | 정의 데이터가 상점/영입/선택지 후보로 쓰인다 | 허용 | definition coverage |
| `needsDecision` | 근거는 있으나 owner나 생명주기 판단에 설계 결정이 필요하다 | 차단 | 모든 coverage |
| `missingMapping` | 원본 주소는 확인됐지만 새 도메인 field 또는 calculation owner가 없다 | 차단 | save/session mapping |
| `needs-review` | 자동 분류 결과가 있고 사람이 검토해야 한다 | 차단 | 모든 coverage |
| `blocker` | 구현/분류를 막는 문제가 있으며 해소 마일스톤과 사유가 있다 | 차단 | 모든 coverage |
| `approved-excluded` | 사용자가 명시 승인한 제외 항목이며 손실 범위가 기록됐다 | 조건부 허용 | 모든 coverage |

`approved-excluded`는 편의상 쓰는 제외가 아니다. 사용자 승인 기록, 원본 위치, 제외 사유, 대체 동작 또는 손실 범위를 모두 가져야 한다. 기술적으로 아직 못 한 항목은 `approved-excluded`가 아니라 `blocker`다.

## 근거 요구사항

### CSV 정의

CSV에서 온 정의 데이터는 최소 아래 근거를 가진다.

- source file: 예 `original-game/CSV/Train.csv`
- source id: CSV id 또는 행 key
- source name: 원본 표시명
- runtime owner: 예 `definitions.trainingCommands`
- role: `rule`, `display`, `calculation`, `template`, `listing` 중 하나
- consuming feature 또는 consuming calculation

CSV 행을 JSON에 넣었다는 사실은 완료 근거가 아니다. consuming feature, view, calculation, save init 중 하나가 있어야 한다.

### Chara seed

Chara CSV 초기값은 최소 아래 근거를 가진다.

- character template id
- source file
- source section 또는 row key
- raw value
- runtime owner: `people`, `body`, `social`, `equipment`, `text`, `definition-only`, `blocker` 중 하나
- instance field path 또는 생성 pipeline 이름

초기값을 읽지 못했거나 의미를 모르면 기본값으로 채우고 완료하지 않는다. `blocker`로 남긴다.

### ERB read/write

ERB 주소는 최소 아래 근거를 가진다.

- source file
- label 또는 함수명
- read/write 구분
- family/index 또는 원본 주소 표현
- 호출 흐름에서 어떤 feature에 속하는지
- 저장 상태인지 session/calculation인지 판단한 이유

write 근거가 있는 persistent 주소는 save mapping 후보가 된다. 현재 화면 선택값, 계산 중간값, script scratch는 session/calculation mapping 후보가 된다.

### 흐름 근거

기능 coverage는 최소 아래 근거를 가진다.

- 원본 entry label 또는 메뉴 라벨
- player input 또는 호출 조건
- 종료 route 또는 종료 조건
- 읽는 definition
- 변경하는 save field
- 쓰고 버리는 session/calculation buffer
- 성공/실패/취소 또는 예외 검증 id

## 작성 절차

1. 원본 위치를 먼저 기록한다. 파일, 라벨, family/index, CSV id 중 가능한 모든 근거를 남긴다.
2. 생명주기를 먼저 판정한다. `definitions`, `save`, `session`, `calculation`, `view`, `script-scratch`, `approved-excluded`, `blocker` 중 하나다.
3. owner를 정한다. family 이름이 아니라 의미별 도메인과 field path를 적는다.
4. consuming feature를 연결한다. 소비자가 없으면 `implemented`, `mapped`, `used`로 두지 않는다.
5. 검증 id를 연결한다. 저장 영향이 있으면 roundtrip assertion id가 필요하다.
6. 불명확하면 `needsDecision`, `missingMapping`, `needs-review`, `blocker` 중 하나로 둔다.

## 불명확 주소 처리

| 상황 | 상태값 |
| --- | --- |
| 원본 주소는 있으나 의미를 모름 | `missingMapping` |
| 의미 후보가 둘 이상이고 설계 판단이 필요함 | `needsDecision` |
| 자동 산출물에서 검토가 필요함 | `needs-review` |
| 원본 근거가 충돌하거나 구현을 막음 | `blocker` |
| 사용자가 명시 제외 승인함 | `approved-excluded` |

불명확 주소를 임의로 `featureState`, `settings`, `legacy*NeedingMapping`에 넣고 해당 기능을 완료 처리하지 않는다. `legacy*NeedingMapping`은 완료 상태가 아니라 M21/M22까지 추적할 blocker marker다.

## adapter import 경계

runtime feature와 domain은 원본 adapter를 직접 import하지 않는다.

허용:

- `src/adapters/legacy/*`가 원본 family/index 사전과 검증 함수를 가진다.
- `src/runtime.ts`가 앱 실행용 runtime을 조립하면서 legacy adapter 검증 모듈을 붙인다.
- coverage 산출물이 source evidence를 참조한다.

금지:

- `src/game/`, `src/domains/`, `src/catalog/`에서 `src/adapters/legacy/`를 직접 import한다.
- feature handler가 원본 family/index를 직접 읽고 쓴다.
- 원본 변수명을 앱 모델명으로 복사한다.
- mapping 미정 주소를 런타임 기능 완료 근거로 사용한다.

검증:

```bash
rg "adapters/legacy|legacy/" src/game src/domains src/catalog
```

위 검색은 M17 완료 시 매칭 0개여야 한다.

## 완료 차단 규칙

- `needsDecision`, `missingMapping`, `needs-review`, `blocker`가 남은 row는 완료 기능 범위에 포함할 수 없다.
- `approved-excluded`는 사용자 승인 기록 없이는 차단 상태다.
- `implemented` feature는 route/action/view/handler/smoke id가 없으면 차단 상태다.
- `used` definition은 runtime owner와 consuming feature가 없으면 차단 상태다.
- `mapped` save/session row는 field path 또는 calculation owner와 검증 id가 없으면 차단 상태다.
- M30에서 미등록 placeholder, stub, TODO, `legacy*NeedingMapping`이 runtime 완료 경로에 남으면 차단한다.
