# 문서 인덱스

## 책임 분리

| 문서 | 책임 | 넣지 않는 내용 |
| --- | --- | --- |
| `agent/README.ko.md` | Codex/서브에이전트 시작 문서의 읽기 순서와 권위 경계 | 완료 판정 |
| `agent/CODEX_BOOTSTRAP.ko.md` | 세션 시작용 절대 규칙과 I/O 누수 방지 규칙 | 마일스톤별 상세 이력 |
| `agent/CURRENT_STATUS.ko.md` | 현재 완료 지점과 다음 마일스톤 dashboard | 완료 근거 원장 |
| `agent/NEXT_MILESTONE.ko.md` | 바로 다음 마일스톤의 압축 시작점 | 전체 실행 계획 |
| `GAME_DOMAIN_SYSTEM.md` | 정의 데이터, 저장 상태, 세션 상태, view 계산 객체의 소유권과 경계 | 진행 체크박스, 구현 일정 |
| `GAME_FLOW_MAP.ko.md` | 원본 게임 기능 흐름과 화면/입력/상태 변화의 의사코드 | 데이터 구조 설계 본문, 진행 상황 |
| `MODULE_SYSTEM.ko.md` | 코드 레이어, import 방향, 모듈 경계 | 기능별 작업 일정 |
| `NEW_PORT_MILESTONES.ko.md` | M0~M52 실행 계획, 체크박스, 완료 조건, 검증 명령 | 장황한 설계 설명, 원본 조사 전문 |
| `milestones/README.ko.md`, `milestones/PHASE_*.ko.md` | 마일스톤 목록을 phase별로 나눈 탐색 시작점 | 완료 판정, scope 축소 근거 |
| `PROGRESS_STATUS.ko.md` | 현재 완료/미완료, 마지막 검증, 바로 다음 작업 | 설계 본문, 긴 과거 설명 |
| `SESSION_HANDOFF.ko.md` | 새 세션에 필요한 최소 요약과 다음 작업 | 전체 설계 반복, 긴 산출물 나열 |
| `IMPLEMENTATION_UNIT_RULES.ko.md` | M18 이후 기능을 한 단위씩 구현할 때 쓰는 구현 전/후 template과 blocker template | 기능별 원본 전수표 본문 |
| `DOMAIN_INVENTORY.ko.md` | 원본 상태가 어느 정의/저장/세션/adapter 경계에 속하는지의 근거 | UI 설계, 구현 일정 |
| `DOMAIN_REINTERPRETATION.ko.md` | 원본 주소를 도메인 구조로 해석하는 원칙 | 진행 상태 |
| `LEGACY_MAPPING_POLICY.ko.md` | 원본 근거, mapping 상태값, 승인/차단 규칙, adapter import 경계 | 대량 확정 변환표 |
| `LEGACY_ROLE_DECISIONS.ko.md` | 원본 변수 묶음 역할 판정과 보류 사유 | 구현 계획 |
| `LEGACY_MAPPING_INVENTORY.ko.md` | 원본 주소 수집 결과와 작업 분류 | 확정 변환표 |
| `CSV_CATALOG_COLLECTION.ko.md` | 원본 CSV/Chara CSV 정의 데이터 수집 결과 | 게임 상태 설계 |
| `ERB_STATE_SCAN.ko.md`, `ERB_STATE_AUDIT.ko.md` | 원본 ERB 조사 보조 로그 | 기준 설계 |

## 운영 규칙

- Codex/서브에이전트는 세션 시작 시 `agent/CODEX_BOOTSTRAP.ko.md`, `agent/CURRENT_STATUS.ko.md`, `agent/NEXT_MILESTONE.ko.md`를 먼저 읽는다.
- 현재 마일스톤의 상세 체크리스트는 `milestones/README.ko.md`에서 해당 phase 문서를 찾아 그 section만 좁게 조회한다. `NEW_PORT_MILESTONES.ko.md`는 공통 규칙과 phase 경계만 본다.
- `agent/*` 문서는 dashboard와 탐색 시작점이다. 완료 판정은 원본 파일, coverage 원장, gate/smoke/build, gap audit, closure JSON이 소유한다.
- 긴 문서와 대형 JSON은 전체 출력하지 않는다. 필요한 section, row, blocking metric, source block만 좁게 조회한다.
- query/검색 결과만으로 완료 상태를 부여하지 않는다. milestone 완료 전에는 원본 row, runtime consumer, verification, closure/gap audit을 직접 확인한다.
- 설계 책임이 생기면 기준 문서에만 기록한다.
- 진행 체크와 다음 작업은 `PROGRESS_STATUS.ko.md`에만 기록한다.
- 실행 순서와 체크박스는 `NEW_PORT_MILESTONES.ko.md`에만 기록한다.
- 세션 재개용 요약은 `SESSION_HANDOFF.ko.md`에만 기록한다.
- `.env.local`은 읽거나 출력하거나 문서화하지 않는다.
- 유료 AI/OpenRouter 호출은 사용자가 명시적으로 승인하기 전까지 실행하지 않는다.
