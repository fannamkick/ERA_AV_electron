# Phase 3. M17~M20 상세 마일스톤

원본 대조 체계: mapping 정책, 반복 구현 규칙, 기능/정의 데이터 전수표.

완료 판정은 이 문서만으로 하지 않는다. 원본 파일, coverage/gap/closure JSON, 전용 gate/smoke/build가 최종 권위다.

## 상세 마일스톤

## M17. 원본 근거 대조 정책

책임 선언:
- 역할: 원본 근거 대조 정책과 legacy adapter 경계를 확정한다.
- 범위: mapping 상태값, evidence 요구사항, approved-excluded 조건, adapter import 금지 경계다.
- 방식: core는 legacy adapter를 직접 import하지 않고 runtime 조립 경계에서만 결합한다.
- 완료 결과: 이후 mapping은 상태값과 승인/차단 규칙을 따라 작성된다.
- 누락 차단: 대량 mapping을 근거 없이 확정하거나 core에서 legacy adapter를 import하면 완료하지 않는다.

- [x] M1~M16 완료 여부 확인
- [x] `npm run inventory:legacy-mapping` 실행
- [x] mapping 상태값과 작성 절차 확정
- [x] mapping 상태값 목록 문서화: mapped, needsDecision, missingMapping, blocker, excluded
- [x] mapping 승인 기준 문서화: CSV 이름, Chara seed, ERB read/write, 흐름 근거
- [x] 불명확한 주소를 `needsDecision` 또는 `missingMapping`으로 남기는 규칙 확정
- [x] M17에서 대량 확정 변환표를 작성하지 않음
- [x] 기능 구현 코드가 원본 주소를 직접 참조하지 않도록 경계 확인
- [x] core가 `src/adapters/legacy`를 import하지 않는지 확인
- [x] `npm run build` 실행

검증:

```bash
npm run inventory:legacy-mapping
npm run build
rg "adapters/legacy|legacy/" src/game src/domains src/catalog
```

## M18. 반복 구현 규칙 고정

책임 선언:
- 역할: M28~M49 구현을 한 단위씩 닫는 반복 규칙을 고정한다.
- 범위: 구현 전 template, 구현 후 template, blocker template, 1회 최대 구현 단위다.
- 방식: feature/item/scene/command 등 작은 단위마다 원본 근거, owner, 검증, blocker 갱신을 요구한다.
- 완료 결과: 이후 기능 구현이 성공 경로만 붙이고 넘어가지 못한다.
- 누락 차단: 단위 구현에 원본 근거, 저장/session/view owner, 성공/실패/취소 검증이 없으면 완료하지 않는다.

- [x] 기능 구현은 항상 한 단위씩만 진행하도록 규칙 확정
- [x] 각 단위는 `GAME_FLOW_MAP.ko.md`의 입력/상태 변화/종료 조건을 먼저 가진다고 명시
- [x] 각 단위는 정의/저장/session/view 소유권을 먼저 정한다고 명시
- [x] 각 단위는 성공/실패/취소 검증을 가진다고 명시
- [x] 확정 가능한 원본 주소만 해당 기능 범위 안에서 mapping한다고 명시
- [x] 미정 항목이 있으면 해당 기능을 완료 처리하지 않고 blocker로 기록한다고 명시
- [x] 각 단위의 구현 전 checklist template 확정
- [x] 각 단위의 구현 후 검증 template 확정
- [x] 각 단위의 blocker 기록 template 확정
- [x] 기준 문서가 필요하면 갱신
- [x] `npm run build` 실행
- [x] 테스트 도구가 있으면 `npm run test --if-present` 실행

기능별 최대 단위:

| 기능 | 1회 최대 단위 |
| --- | --- |
| 아이템/상점 | 아이템 1개 또는 listing 1개 |
| 방문/시설 | 장소 1개와 행동 1개 |
| 미션 | 미션 1개 |
| 업무 | 업무 1개 |
| 촬영 | 장면 1개 |
| 훈련 | command 1개 |
| 엔딩 | 조건 1개 또는 결과 화면 1개 |

## M19. 원본 기능 커버리지 전수표

책임 선언:
- 역할: 원본 기능 전체를 셀 수 있는 feature coverage 장부를 만든다.
- 범위: main flow, dynamic call, persistence, exit, pause, engine entry, unreferenced global row다.
- 방식: 기능을 구현하지 않고 feature id, source label/file, group, owner milestone, status/blocker를 기록한다.
- 완료 결과: 무엇을 구현해야 완전 이식인지 수량과 blocker로 보인다.
- 누락 차단: 미분류 feature id가 있거나 원본 라벨/파일 없는 row가 완료 상태면 완료하지 않는다.

- [x] 메인 화면 선택지 전체를 `GAME_FLOW_MAP.ko.md` 기준으로 feature id로 분해
- [x] 각 feature id에 원본 라벨, 원본 파일, 입력, 저장 변경, 종료 조건을 연결
- [x] feature coverage 산출물 경로 확정
- [x] feature id, parent feature, source label, source file, end route, status 컬럼 확정
- [x] 동적 호출 66개를 feature id 또는 blocker로 분류
- [x] persistence 액션 134개를 저장/로드/전역 저장 기능에 연결
- [x] exit 액션 3,536개를 정상 종료, 취소, 오류 종료, 게임 종료 중 하나로 분류
- [x] pause 액션 931개를 입력 화면 또는 대기 화면으로 분류
- [x] 구현 제외가 필요한 항목은 제외 사유와 사용자 승인 필요 여부를 기록
- [x] 메인 화면에서 도달 불가능한 원본 라벨을 별도 분류
- [x] 기능별 구현 순서 후보를 기록하되 실행 일정으로 쓰지 않음
- [x] 미분류 feature id가 0개인지 확인
- [x] `npm run analyze:game-system` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run analyze:game-system
npm run build
```

## M20. 정의 데이터 전수 연결

책임 선언:
- 역할: 원본 정의 데이터와 Chara seed 전체를 역할과 소비 책임으로 분류한다.
- 범위: raw 정의 918개, Chara seed 6,922행, item, Train, source, 능력/기초/소질/경험/각인/파라미터 정의다.
- 방식: runtime owner 후보, source evidence, consumer 후보, status/blocker를 기록한다.
- 완료 결과: 정의 데이터 전체가 실제 소비 검증을 기다리는 장부 상태가 된다.
- 누락 차단: 정의 row가 owner 또는 blocker 없이 unused로 남거나 count가 원본 수량과 다르면 완료하지 않는다.

- [x] CSV/Chara 정의 데이터 918개를 runtime 정의 데이터로 로드
- [x] definition coverage 산출물 경로 확정
- [x] definition key, source file, source id, runtime owner, status 컬럼 확정
- [x] Chara 초기값 6,922행을 캐릭터 원형 또는 blocker로 분류
- [x] `Item.csv` 항목을 아이템, 영입 listing, 시설/해금, 특수 항목으로 분류
- [x] `Item.csv` 분류별 수량을 산출물에 기록
- [x] `Train.csv` 105개를 훈련 command 정의 또는 blocker로 분류
- [x] `source.csv` 항목을 훈련 계산 source 정의로 연결
- [x] `Abl.csv`, `BASE.csv`, `Talent.csv`, `exp.csv`, `Mark.csv`, `Palam.csv`를 표시/계산 정의로 연결
- [x] 정의 데이터 중 앱에서 참조되지 않는 항목을 unused로 남기지 않고 owner 또는 blocker를 부여
- [x] 중복 ID, 인코딩 실패, 무효 행 0개 확인
- [x] `npm run collect:catalog` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run collect:catalog
npm run build
```
