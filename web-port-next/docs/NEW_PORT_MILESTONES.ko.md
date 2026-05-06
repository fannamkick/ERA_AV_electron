# 신규 포트 마일스톤

## 책임 구조

이 프로젝트의 책임 구조는 세 층뿐이다.

1. 프로젝트: 원본 게임 전체를 web port로 완성한다.
2. 페이즈: 전체 포팅을 작업 단계로 나눈다.
3. 마일스톤: 각 호출에서 끝낼 책임 단위다.

상태값, gate, coverage, 문서 장부는 이 구조를 보조할 뿐 책임 구조를 대체하지 않는다. 전체 책임 지도는 `docs/milestones/PORT_RESPONSIBILITY_MAP.ko.md`에 둔다.

## 현재 closure 기준

- M28은 strict closure 완료 상태다.
- Next call target is M35 closure. M28~M34.5 are strict-closed.
- M35~M41이 source-unit manifest 기준으로 닫히거나 명시적으로 재설계되기 전에는 M42를 재개하지 않는다. M28~M34.5은 strict closure 완료 상태다.
- Current M28~M52 aggregate: total 11,247; implemented-verified 8,820; approved-excluded 359; blocked 2,036; scope-redesign-required 32; completedAllowedNow true 8 / false 18.

## 프로젝트 책임

- 목표: 원본 게임의 기능, 정의 데이터, 저장 상태, 세션/계산 상태, 화면 흐름, 이벤트, 엔딩을 web runtime behavior로 이식한다.
- 완료 위치: M52에서만 전체 완성 여부를 판정한다.
- 금지: 개별 마일스톤이 자기 책임을 줄여서 전체 포팅 목표를 바꾸지 않는다.

## 페이즈 책임

| Phase | 범위 | 책임 |
| --- | --- | --- |
| Phase 1 | M0~M6 | 최소 web runtime과 첫 세로 루프를 만든다. 전체 게임 구현 완료가 아니다. |
| Phase 2 | M7~M16 | 핵심 루프와 저장/검증 골격을 확장한다. 전체 게임 구현 완료가 아니다. |
| Phase 3 | M17~M20 | 원본 근거, 구현 규칙, 기능/정의 coverage를 만든다. 구현 완료가 아니라 이후 구현의 기준이다. |
| Phase 4 | M21~M27 | source/save/session mapping, gap audit, implementation queue를 확정한다. 구현 완료가 아니라 책임 배정이다. |
| Phase 5 | M28~M49 | 기능군별 runtime behavior를 실제 구현한다. 각 마일스톤은 자기 기능군 책임을 끝낸다. |
| Phase 6 | M50~M52 | 전체 저장/로드, 최종 gap audit, 완전 포팅 판정을 닫는다. 남은 구현을 숨기는 단계가 아니다. |

## 마일스톤 책임

- 마일스톤은 호출 단위다.
- 각 마일스톤은 하나의 역할과 하나의 owner 범위를 가진다.
- 마일스톤 책임은 "이 기능군 안에서 무엇을 끝내야 하는가"로 적는다.
- 실행 중 다른 owner 책임이 섞인 것이 발견되면, 그 마일스톤을 완료하지 않고 먼저 책임을 다시 나눈다.
- `[구현]` 마일스톤은 자기 owner 범위 안의 원본 동작을 runtime behavior와 검증으로 끝낸다.
- `[조사]`, `[정책]`, `[계획]`, `[검증]`, `[감사]`, `[판정]` 마일스톤은 구현 완료를 대신하지 않는다.

M30에 대한 현재 판단:
- M30의 올바른 책임은 즉시 사용 아이템 9개의 사용 flow와 효과다.
- M30은 strict closure 기준으로 완료됐다. source 74개 중 M30-owned 37개는 implemented-verified이고, 특수 item 200~214 및 item 22/90/91 plus item 211 계열 37개는 M30 approved-excluded다.
- excluded 37개는 M34-closed plus M41/M42/M43/M44 수신 manifest에 blocked inbound로 명시되어, 해당 owner가 구현/제외/재설계하기 전까지 완료되지 않는다.

## 공통 완료 기준

- [ ] `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md` 기준으로 completed/blocked/scope-redesign-required를 먼저 판정함
- [ ] `npm run build` 통과
- [ ] 저장 상태, 세션 상태, view 계산 객체 경계가 섞이지 않음
- [ ] UI와 flow가 공통 action/result 계약을 사용함
- [ ] 새 소유권이 생기면 기준 문서 갱신
- [ ] 원본 변수명을 앱 모델명으로 직접 복사하지 않음
- [ ] 미정 항목을 기능 완료로 처리하지 않음
- [ ] `[구현]` 마일스톤의 `transferredOut`, file-level `source-file-review`, owner-only `mapped`를 완료 근거로 쓰지 않음
- [ ] 보류 항목은 원본 위치, 보류 사유, 해소 마일스톤을 가진 blocker로 남김
- [ ] 구현 제외는 사용자 승인 없이는 완료 처리하지 않음
- [ ] `.env.local` 접근 없음
- [ ] 유료 AI/OpenRouter 호출 없음
- [ ] 마일스톤 하나를 완료할 때마다 검증 결과를 확인한 뒤 별도 커밋을 남김

## 에이전트 I/O 누수 방지 원칙

- [ ] Codex/서브에이전트는 세션 시작 시 `docs/agent/CODEX_BOOTSTRAP.ko.md`, `docs/agent/CURRENT_STATUS.ko.md`, `docs/agent/NEXT_MILESTONE.ko.md`를 먼저 읽는다.
- [ ] `docs/agent/*`는 dashboard와 탐색 시작점이며 완료 판정 권위가 아니다.
- [ ] query/검색 결과는 읽을 위치를 찾는 도구다. 완료 선언, blocker 해소, transfer, approved-excluded 판정은 원본 row와 full artifact 대조 없이 하지 않는다.
- [ ] 긴 문서와 대형 coverage/audit JSON은 전체 출력하지 않는다. 필요한 section, row, blocking metric, source block만 좁게 조회한다.
- [ ] gate/smoke/build는 전체 검증을 수행한다. 콘솔 출력은 줄일 수 있지만, cap된 실패는 full failure artifact를 남겨야 한다.
- [ ] 새 coverage/gate/smoke script 작성, placeholder 교체, owner 변경, blocker/transfer/approved-excluded 처리, milestone closure 작성, final gap/complete verdict 때는 토큰 절약보다 직접 확인을 우선한다.

## 완전 이식 완료 기준

- [ ] 원본 메인 화면 선택지 전체가 구현 또는 사용자 승인 제외로 분류됨
- [ ] 원본 정의 데이터 전체가 사용 또는 사용자 승인 제외로 분류됨
- [ ] 저장 상태로 판정된 원본 주소가 새 저장 모델 필드로 연결됨
- [ ] 세션/계산 버퍼로 판정된 원본 주소가 새 실행 중 데이터 또는 계산 함수로 연결됨
- [ ] 미해소 blocker 0개
- [ ] `missingMapping`, `needsDecision`, `needs-review` 항목이 기능 완료 상태에 남아 있지 않음
- [ ] 기능별 성공/실패/취소/저장 roundtrip 검증이 있음
- [ ] 최종 coverage 산출물에 미구현 기능 0개, 미분류 원본 주소 0개가 기록됨

## 전체 포팅 완성 불변식

마일스톤 전체를 완료했다고 선언했는데 게임이 완성되지 않는다면 마일스톤 분할 또는 완료 판정이 틀린 것이다. 각 마일스톤은 전체 게임 포팅 목표의 한 책임 단위이며, 자기 책임을 다른 마일스톤으로 넘겨 완료 처리하지 않는다.

- [ ] `[구현]` 마일스톤은 부여받은 원본 기능/데이터/상태 변화를 runtime behavior로 끝낸다.
- [ ] `[구현]` 마일스톤의 `transferredOut`은 완료가 아니다. 발견되면 해당 마일스톤을 blocked로 두거나, 실행 전에 마일스톤 책임을 재설계한다.
- [ ] `[조사]`, `[정책]`, `[계획]`, `[검증]`, `[감사]`, `[판정]` 마일스톤은 구현 완료를 대신하지 않는다.
- [ ] runtime owner가 다른 책임이 한 마일스톤에 섞여 있으면 완료가 아니라 `scope-redesign-required`다.
- [ ] 모든 `[구현]` 마일스톤이 완료되고 M50~M52 최종 검증이 통과하면, 원본 게임 기능이 실제 플레이 가능한 web port behavior로 닫혀야 한다.
- [ ] 이 불변식의 상세 판정 기준은 `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`와 `docs/milestones/PORT_COMPLETION_COVERAGE_REVIEW.ko.md`다.

## blocker 기록 형식

- [ ] 원본 위치: 파일, 라벨, 주소 또는 CSV 행
- [ ] 차단 사유: 의미 불명, 근거 충돌, 구현 범위 밖, 사용자 승인 필요 중 하나
- [ ] 해소 마일스톤: M19~M52 중 하나
- [ ] 완료 차단 범위: 어떤 기능/데이터/주소 완료를 막는지 명시

## 마일스톤별 커밋 의무

각 마일스톤은 검증과 커밋까지 포함해서 닫는다. 구현, 문서, coverage, gate 산출물이 모두 맞더라도 해당 마일스톤 단위의 커밋이 없으면 완료 상태가 아니다.

- [ ] 마일스톤 하나가 끝날 때마다 그 마일스톤의 변경만 포함한 별도 커밋을 남긴다.
- [ ] 커밋 전에는 해당 마일스톤 체크리스트의 검증 명령과 공통 `npm run build`를 통과시킨다.
- [ ] 커밋 메시지는 어떤 마일스톤을 닫았는지 알 수 있게 작성한다. 예: `Complete M21 source evidence ledger`.
- [ ] `data/coverage/milestones/Mxx-closure.json`이 있는 마일스톤은 `commandsRun`과 커밋 근거를 함께 남긴다.
- [ ] 커밋 없이 체크박스만 완료 처리하지 않는다.
- [ ] 여러 마일스톤의 변경을 한 커밋에 섞지 않는다. 단, 이전 마일스톤의 누락 수정이 필요하면 그 누락 수정 커밋을 먼저 남긴 뒤 현재 마일스톤을 진행한다.
- [ ] unrelated dirty files는 커밋에 포함하지 않는다.

## 마일스톤 완료 운영 의무

이 절은 각 마일스톤의 개별 체크리스트보다 우선한다. 아래 항목 중 하나라도 빠지면 그 마일스톤은 완료가 아니다. 코드가 동작해도, gate가 통과해도, 체크박스가 채워져도, 문서와 인수인계와 커밋이 빠지면 완료 처리하지 않는다.

- [ ] `NEW_PORT_MILESTONES.ko.md`의 해당 마일스톤 체크박스, 완료 근거, 검증 명령, 다음 마일스톤 연결을 실제 결과와 맞게 갱신한다.
- [ ] `PROGRESS_STATUS.ko.md`를 갱신한다. 완료 표, 미완료 표, 데이터 완성도 판단, 마지막 검증, 다음 작업이 현재 마일스톤 종료 상태와 일치해야 한다.
- [ ] `SESSION_HANDOFF.ko.md`를 갱신한다. 새 세션이 이 문서만 읽고 바로 다음 마일스톤을 시작할 수 있도록 현재 상태, 완료된 마일스톤, 마지막 검증, 바로 다음 작업을 갱신한다.
- [ ] 새 소유권, 데이터 경계, import 경계, mapping 정책, 구현 단위 규칙이 생겼으면 해당 기준 문서도 갱신한다. 예: `GAME_DOMAIN_SYSTEM.md`, `DOMAIN_INVENTORY.ko.md`, `MODULE_SYSTEM.ko.md`, `LEGACY_MAPPING_POLICY.ko.md`, `IMPLEMENTATION_UNIT_RULES.ko.md`, `README.md`.
- [ ] coverage 산출물과 audit 산출물을 갱신한다. 해당 마일스톤이 요구하는 `*-coverage.json`, `Mxx-gap-audit.json`, `Mxx-closure.json`이 실제 결과와 맞아야 한다.
- [ ] 완료 선언 전에 `원본 단위 매니페스트`를 만들고, "완료로 처리한 것", "안 했거나 넘긴 것", "재확인 필요한 것"을 단위별 사실 장부로 남긴다. 산출물 count만으로 완료를 선언하지 않는다.
- [ ] `Mxx-closure.json`에는 원본 단위 매니페스트 경로, 단위별 상태 요약, `ownedTotal`, `implemented`, `mapped`, `approvedExcluded`, `transferredOut`, `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded`, `commandsRun`, `commitHash` 근거를 남긴다.
- [ ] `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded` 중 하나라도 0이 아니면 완료하지 않는다.
- [ ] 다른 마일스톤으로 넘긴 row는 완료 근거가 아니다. 실행 중 transfer가 필요해지면 현재 마일스톤을 완료하지 말고, 책임 재설계 또는 blocked 판정으로 남긴다.
- [ ] 사용자 승인 제외는 승인 근거 없이 기록하지 않는다. `approvalId`, `approvedBy`, `approvalScope`, `sourceEvidenceId`, `replacementBehavior`가 없으면 완료 근거가 아니다.
- [ ] 마지막 검증 명령을 실제로 실행하고 문서에 남긴다. 실행하지 않은 명령을 통과한 것처럼 적지 않는다.
- [ ] `npm run build`는 모든 마일스톤 완료 전에 필수다. 마일스톤별 gate/smoke가 있으면 build와 함께 실행한다.
- [ ] 문서 갱신까지 포함한 변경 세트를 확인한 뒤 해당 마일스톤 단위 커밋을 남긴다.
- [ ] 커밋 후 `Mxx-closure.json`의 `commitHash` 또는 커밋 근거 문구가 실제 커밋을 가리키도록 갱신한다. 이 갱신이 별도 커밋을 필요로 하면 같은 마일스톤 후속 문서 커밋으로 남긴다.
- [ ] 완료 직후 다음 작업이 무엇인지 `PROGRESS_STATUS.ko.md`와 `SESSION_HANDOFF.ko.md`에 같은 내용으로 남긴다.
- [ ] unrelated dirty files, 기존 `web-port` 산출물, `.env.local`, 유료 AI/OpenRouter 관련 변경이나 호출을 완료 커밋에 섞지 않는다.

## 책임 축소 절대 금지

이 절은 모든 마일스톤에 적용한다. 마일스톤 문서에 적힌 책임과 체크리스트를 구현자가 임의로 낮춰 해석하면 안 된다. 산출물 생성, 원본 라인 인덱싱, 자체 gate 통과, 일부 smoke 성공은 책임 완료가 아니다.

- [ ] 마일스톤 책임 문구의 동사를 그대로 만족해야 한다. `구현한다`, `완성한다`, `계산한다`, `반영한다`, `검증한다`는 문서/coverage 기록이 아니라 runtime behavior와 검증을 뜻한다.
- [ ] 원본 효과/조건/후처리 구현 책임은 원본 라인 존재 확인이나 static profile 생성으로 대체할 수 없다.
- [ ] gate는 자신이 만든 scaffold가 존재하는지만 검사하면 안 된다. 원본 책임 항목이 runtime에서 실제 소비되고, 실패할 수 있는 검증을 가져야 한다.
- [ ] closure는 `responsibilityIntegrity`를 반드시 포함한다. 이 항목이 없거나 `sourceBehaviorImplementedNotJustIndexed`, `gateValidatesResponsibilityNotOwnScaffold`가 참이 아니면 `gate:milestone-scope-closure`는 실패해야 한다.
- [ ] 이전에 완료로 기록된 마일스톤도 재검증 또는 재개 시 이 규칙을 적용한다. 기존 closure에 `responsibilityIntegrity`가 없으면 보강 전에는 재완료 판정하지 않는다.
- [ ] 알려진 한계가 책임 범위 안에 있으면 그 마일스톤은 `completed`가 아니라 `blocked` 또는 미완료다.
- [ ] 체크박스는 산출물이 생겼다는 뜻으로 체크하지 않는다. 해당 책임이 원본 근거, runtime 구현, 검증에서 모두 닫혔을 때만 체크한다.
- [ ] `implemented`, `mapped`, `transferredOut` 숫자는 원본 단위 매니페스트의 어떤 단위를 뜻하는지 자연어로 풀어 적는다. 특히 `mapped`와 `transferredOut`은 하지 않은 일을 숨기는 데 쓰지 않는다.
- [ ] 의심되면 완료하지 않는다. blocker로 남기고 gap audit에 기록한다.

## Phase별 마일스톤 문서

긴 마일스톤 목록은 phase별 문서로 분리한다. `NEW_PORT_MILESTONES.ko.md`는 실행 체크리스트와 현재 상세 기록을 유지하고, phase별 문서는 에이전트가 읽을 마일스톤 목록의 시작점으로 쓴다.

- 마일스톤 제목의 `[기획]`, `[정책]`, `[조사]`, `[조사/분류]`, `[조사/장부]`, `[조사/매핑]`, `[조사/보강]`, `[계획]`, `[구현]`, `[검증]`, `[감사]`, `[판정]` 표기를 완료 유형으로 본다.
- `[구현]`이 아닌 마일스톤은 구현 완료가 아니라 구현을 가능하게 하는 선행 책임이다.
- Phase 1: `docs/milestones/PHASE_1_M0_M6.ko.md`
- Phase 2: `docs/milestones/PHASE_2_M7_M16.ko.md`
- Phase 3: `docs/milestones/PHASE_3_M17_M20.ko.md`
- Phase 4: `docs/milestones/PHASE_4_M21_M27.ko.md`
- Phase 5: `docs/milestones/PHASE_5_M28_M49.ko.md`
- Phase 6: `docs/milestones/PHASE_6_M50_M52.ko.md`

## 페이즈 구분

| Phase | 범위 | 목표 | 완료 기준 |
| --- | --- | --- | --- |
| Phase 1. 최소 세로 루프 | M0~M6 | 공통 실행 계약, 저장/세션/view 경계, 정의 데이터 입력, 새 게임, 메인 화면, 아이템 구매 1차를 연결한다 | 새 게임 -> 메인 화면 -> 아이템 상점 -> 상품 선택/수량 변경 -> 구매 성공/실패/취소 -> 돈/인벤토리 반영 -> `npm run build` 통과 |
| Phase 2. 핵심 골격 확장 | M7~M16 | 주요 기능을 한 단위씩 얇게 붙이고 저장/로드, 턴 진행, 검증 체계를 만든다 | 영입, 턴 종료, 저장/로드, 방문, 미션, 업무, 촬영, 훈련이 각각 최소 성공/실패/취소 또는 예외 경로를 갖고 build가 통과 |
| Phase 3. 원본 대조 체계 | M17~M20 | 완성 여부를 셀 수 있도록 원본 기능과 정의 데이터의 1차 전수표, mapping 정책, 반복 구현 규칙을 고정한다 | feature/definition coverage 산출물의 컬럼과 상태값이 확정되고, 미정 항목을 완료로 처리하지 않는 차단 규칙이 문서화됨 |
| Phase 4. 전수표 보강과 누락 감사 | M21~M27 | 원본 근거, 정의 데이터, 저장 상태, 세션/계산 상태 전수표를 서로 대조하고 구현 전 누락을 찾는다 | source evidence, feature, definition, save mapping, session mapping, blocker 장부가 서로 맞물리고 구현 전 누락 감사가 통과 |
| Phase 5. 기능군별 전수 구현 | M28~M49 | 전수표를 기준으로 기능군별 원본 컨텐츠를 구현, 검증, 사용자 승인 제외로 닫는다. blocker는 완료 상태가 아니라 완료 차단 상태로만 둔다 | 각 기능군 종료 시 미구현 feature, 미소비 definition, 미정 save/session row, 소유 blocker가 해당 기능 범위에 남지 않음 |
| Phase 6. 최종 저장/검증 | M50~M52 | 전체 저장/로드, 최종 누락 감사, 완전 이식 판정을 닫는다 | 미구현 기능 0개, 미분류 정의 0개, 미분류 저장/세션 주소 0개, 미해소 blocker 0개, 전체 smoke flow와 최종 검증 명령 통과 |

## 페이즈 근거

- `GAME_FLOW_MAP.ko.md`의 최상위 흐름은 `새 게임/로드 -> 메인 화면 -> 기능 실행 -> 훈련 또는 턴 종료 -> 메인 화면`이다. Phase 1은 이 중 가장 작은 실행 가능한 세로 절편인 새 게임, 메인 화면, 아이템 상점, 구매 결과 반영까지만 닫는다.
- `GAME_DOMAIN_SYSTEM.md`는 데이터를 `definitions`, `save`, `session`, `views`로 나눈다. Phase 1은 이 경계가 실제 UI/action 흐름에서 지켜지는지 먼저 검증해야 하므로 M0~M6을 한 묶음으로 둔다.
- `DOMAIN_INVENTORY.ko.md`와 `DOMAIN_REINTERPRETATION.ko.md`는 `ITEM`을 `inventory.itemCounts`, `ITEMSALES`를 view/session 판매 목록, `BOUGHT`를 `session.shop` 선택값으로 판정한다. Phase 1의 아이템 구매 루프는 이 핵심 분리를 검증하기에 충분하고, 아이템 사용/의복/시설/영입까지 넓히지 않는다.
- M7~M16은 각 주요 기능을 1차 골격으로 세우는 구간이다. 이 구간의 완료는 완전 이식이 아니라, 기능별 성공/실패/취소 경로와 저장/로드/턴 진행/진단 체계를 갖추는 것을 뜻한다.
- M17~M20은 구현량을 늘리는 구간이 아니라 원본 대조 정책, 반복 구현 규칙, 기능/정의 데이터 1차 전수표를 확정하는 구간이다. `needsDecision`, `missingMapping`, `needs-review`가 남은 항목은 기능 완료로 처리하지 않는다.
- M21~M27은 M19/M20 전수표를 원본 근거와 저장/세션 mapping까지 확장하고, 구현 전 누락을 찾는 구간이다. 이 구간을 통과하지 못하면 M28 이후 구현을 완료 처리하지 않는다.
- M28~M49는 전수표를 기준으로 기능군별 완성도를 닫는 구간이다. 샘플 1개 구현, no-op handler, 표시만 되는 화면은 완료가 아니다.
- M50~M52는 전체 저장/로드와 최종 누락 0 검증을 닫는 구간이다. 완전 이식은 M52의 최종 판정으로만 처리한다.

## 마일스톤 내부 단계

- M0~M3: 구조와 데이터 입력 경계 확정
- M4~M16: 실제로 도는 최소 게임 골격과 검증 체계 작성
- M17~M18: 원본 대조 정책과 반복 구현 규칙 고정
- M19~M20: 원본 기능, 정의 데이터 1차 전수표 작성
- M21~M27: 원본 근거, 저장 상태, 세션/계산 상태 전수표 보강과 구현 전 누락 감사
- M28~M34.5: 전수표를 기준으로 기능군별 구현 완료
- M34.5: M35 이후 누락 방지 gate hardening. M35로 넘어가기 전에 반드시 통과해야 하는 차단 마일스톤
- M35~M49: hardening된 전수표와 gate를 기준으로 기능군별 구현 완료
- M50~M52: 전체 저장/로드, 최종 누락 감사, 완전 이식 판정
- M1~M18 완료는 완전 이식 완료가 아님

## 세부도 기준

- [ ] 각 마일스톤은 생성/수정할 파일 또는 산출물을 가진다.
- [ ] 각 마일스톤은 성공, 실패, 취소 또는 예외 경로 중 해당되는 경로를 검증한다.
- [ ] 각 마일스톤은 저장 상태, 세션 상태, view 계산 객체 중 어느 것을 바꾸는지 명시한다.
- [ ] 각 마일스톤은 “아직 정의하지 않음”을 완료 사유로 쓰지 않는다.
- [ ] 각 마일스톤에서 원본 근거가 필요한 항목은 원본 파일/라벨/주소를 남긴다.
- [ ] 체크박스가 5개 미만이면 구현 가능한 작업 단위인지 재검토한다.

## 마일스톤 책임 폐쇄 원칙

각 마일스톤은 자기 책임 범위를 시작해서 끝까지 닫는 단위다. 다음 마일스톤이 해야 할 일을 미리 구현하지는 않지만, 자기 범위 안의 원본 항목, 정의 데이터, 저장 상태, 세션 상태, 화면 계산, 검증 항목은 누락 없이 처리해야 한다.

- [ ] 마일스톤마다 “내가 소유하는 원본 범위”를 먼저 확정한다.
- [ ] 소유 범위 안의 모든 원본 row, feature, definition, save address, session/calculation address를 구현, mapping, 사용자 승인 제외 중 하나로 닫는다.
- [ ] blocker는 완료 상태가 아니다. 소유 범위 안에 blocker가 1개라도 남으면 그 마일스톤은 완료 체크하지 않는다.
- [ ] 다른 마일스톤으로 넘기는 항목은 “이번 마일스톤의 범위 밖”이라는 근거와 다음 owner 마일스톤을 가져야 한다.
- [ ] 샘플 1개 구현, 표시만 되는 화면, no-op handler, role-only 분류는 완료가 아니다.
- [ ] 기능이 동작해도 coverage와 검증 산출물이 갱신되지 않으면 완료가 아니다.
- [ ] coverage row가 갱신되어도 실제 route/action/handler/view/calculation/save roundtrip에서 소비되지 않으면 완료가 아니다.
- [ ] 완료 체크는 해당 마일스톤의 scope audit에서 누락 0, 미승인 제외 0, 미정 owner 0을 확인한 뒤에만 한다.
- [ ] 각 마일스톤 완료 후 검증 결과와 함께 별도 커밋을 남긴다.

## 책임 소재 강제 규칙

이 절은 각 마일스톤의 세부 체크리스트보다 우선한다. 체크리스트에 `blocker로 분류`, `blocker로 기록`, `blocker로 닫음`이라는 표현이 있더라도, 그것은 미완료 사유를 장부화한다는 뜻이지 완료 상태로 인정한다는 뜻이 아니다.

- [ ] 모든 coverage row는 `ownerMilestone`, `ownerRole`, `sourceEvidenceId`, `runtimeConsumerId`, `verificationId`, `status`를 가진다.
- [ ] `ownerMilestone`은 해당 row를 끝까지 닫을 책임자다. owner가 비어 있거나 `remaining`, `later`, `unknown`이면 완료 상태가 아니다.
- [ ] 구현 마일스톤의 완료 조건은 원본 단위 매니페스트의 모든 단위가 `implemented-verified` 또는 사용자 승인 근거가 있는 `approved-excluded`로 닫히는 것이다. `transferredOut = 0`, `ownedBlocker = 0`, `roleOnlyComplete = 0`, `missingEvidence = 0`, `missingConsumer = 0`, `missingVerification = 0`, `unapprovedExcluded = 0`이어야 한다.
- [ ] `transferredOut`은 책임 재설계 또는 blocked 판정의 근거다. 반드시 `fromMilestone`, `toMilestone`, `transferReason`, `sourceEvidenceId`, `acceptedByOwner`를 기록하되 완료 total에는 넣지 않는다.
- [ ] 사용자 승인 제외는 `approvalId`, `approvedBy`, `approvalScope`, `sourceEvidenceId`, `replacementBehavior`가 없으면 완료 상태가 아니다.
- [ ] `template`, `listing`, `display-only`, `calculation-only`, `role-only`는 구현 완료가 아니라 역할 분류다. 실제 `runtimeConsumerId`와 `verificationId`가 없으면 완료로 세지 않는다.
- [ ] source evidence는 실제 원본 파일/라벨/CSV 행/family/index에 닿아야 한다. 파생 문서만 근거인 row는 완료 상태가 아니다.
- [ ] ERB에서만 드러나는 `trigger`, `condition`, `effect`, `result`, `text`, `postProcess`, `save write`, `session write`는 별도 row로 소유자를 가져야 한다.
- [ ] `CFLAG`, `TFLAG`, `TEQUIP`, `SOURCE`, `UP`, `DOWN`, `LOSEBASE`, `LOCAL`, `ARG`, `RESULT` 계열은 family 이름이 아니라 index/slot 단위로 owner, lifecycle, consumer, verification을 가진다.
- [ ] 기능이 UI에서 보이더라도 route/action/handler/view/calculation/save 또는 session consumer와 테스트 검증이 없으면 완료가 아니다.
- [ ] M21~M27은 장부와 gate를 만드는 책임자다. schema만 적고 실제 산출물과 실패 gate가 없으면 완료가 아니다.
- [ ] M28~M49는 기능군 owner다. 자기 기능군의 owned row를 남김없이 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개를 증명해야 한다.
- [ ] M50~M52는 마지막 정리 책임자이지 미구현 기능을 숨기는 책임자가 아니다. M51에서 새 누락이 나오면 M52로 가지 않고 해당 owner 마일스톤으로 되돌린다.
- [ ] 각 마일스톤은 `data/coverage/milestones/Mxx-closure.json`을 남긴다. 이 파일에는 원본 단위 매니페스트 경로, 단위별 상태 요약, `ownedTotal`, `implemented`, `mapped`, `approvedExcluded`, `transferredOut`, `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded`, `commandsRun`, `commitHash`를 기록한다.
- [ ] `Mxx-closure.json`에서 `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded` 중 하나라도 0이 아니면 해당 마일스톤은 완료하지 않는다.

## M35 진입 전 hardening 차단 규칙

이 절은 M35~M52의 세부 체크리스트보다 우선한다. M34까지의 완료는 유지하지만, 아래 항목이 닫히기 전에는 M35를 시작하지 않는다. 문서상 계획만 있고 실제 `package.json` script, `tools/*` gate, coverage 산출물, 실패 조건이 없으면 완료가 아니다.

- [ ] `npm run gate:source-evidence`가 통과해야 한다. 현재처럼 auxiliary evidence만으로 `used`, `template`, `listing`, `display-only`, `calculation-only`, `mapped`, `non-save`, `session-field`, `calculation-internal`, `script-scratch`, `approved-excluded` 완료성 상태를 부여하면 실패해야 한다.
- [ ] `Ho版資料（作成中途）/source.csv`, `Ho版資料（作成中途）/cflag.csv` 같은 보조 자료는 해석 보조로만 쓴다. primary 원본 근거 없이 완료 처리하지 않는다.
- [ ] `gate:source-evidence`는 `features.json`, `definitions.json`, `blockers.json`뿐 아니라 `save-mapping.json`, `session-mapping.json`, `approved-exclusions.json`, `implementation-queue.json`, 마일스톤별 `*-coverage.json`의 source evidence도 검사해야 한다.
- [ ] `source-file-review`는 완료 상태가 아니다. primary 파일을 실제 라벨, CSV 행, family/index, read/write row로 분해하거나 사용자 승인 제외 근거가 있을 때만 닫는다.
- [ ] M35~M49 각 마일스톤은 시작 전에 전용 `coverage:*`, `gate:*`, `smoke:*` 또는 동등한 검증 script가 `package.json`에 등록되어 있어야 한다.
- [ ] 전용 gate는 해당 마일스톤 coverage row마다 `sourceEvidenceId`, `runtimeConsumerId`, `verificationId`, `ownerMilestone`, `status`를 검사해야 한다.
- [ ] 전용 gate는 placeholder, no-op handler, 표시만 되는 화면, role-only row, consumer 없는 used row, verification 없는 mapped row를 실패시켜야 한다.
- [ ] `gate:milestone-scope-closure`는 closure 숫자만 보지 않는다. 해당 마일스톤의 coverage 파일, gap audit, commandsRun, 전용 gate/smoke 결과, transfer/approval 근거를 함께 검증하도록 강화되어야 한다.
- [ ] `RESPONSIBILITY_SEPARATION_RULES.ko.md`의 의심 신호가 하나라도 남으면 closure status는 `completed`가 아니라 `blocked` 또는 `scope-redesign-required`다.
- [ ] M51/M52에 필요한 `audit:final-gap`, `gate:final-gap-audit`, `gate:final-content-zero-gap`, `coverage:view-text`, `gate:view-and-text-coverage`, `report:full-port`, `gate:complete-port-verdict`, `verify:complete`가 실제 script로 존재해야 한다.
- [ ] `verify:complete`는 전체 coverage 재생성, 모든 gate, 전체 smoke, long-play, failure matrix, 전체 roundtrip, typecheck, build, test를 한 번에 실행해야 한다.
- [ ] 위 항목 중 하나라도 빠지면 다음 작업은 M35가 아니라 M34.5 hardening이다.

## M21~M52 책임 차단 매트릭스

이 표는 M21 이후 체크리스트의 해석 기준이다. 각 마일스톤은 자기 행의 `소유 범위`를 닫아야 하며, `완료 차단`이 하나라도 남으면 체크할 수 없다.

| M | 책임 역할 | 소유 범위 | 필수 산출물/gate | 완료 차단 |
| --- | --- | --- | --- | --- |
| M21 | 원본 근거 관리자 | 원본 파일 manifest, source evidence schema, CSV/ERB/Chara/VariableSize/보조 CSV의 근거 지위 | `source-manifest.json`, `source-evidence.schema.json`, `coverage:source-manifest`, `gate:source-evidence` | 실제 원본 위치 없는 row, 문서만 근거인 완료 row, source conflict 미판정 |
| M22 | 전수표 관계 검증자 | feature/definition/save/session/view/text/blocker/approved-exclusion 사이의 참조 규칙 | `coverage-crosscheck.json`, `gate:coverage-crosscheck`, `gate:approved-exclusions` | orphan row, role-only 완료, consumer 없는 used row, 승인 근거 없는 제외 |
| M23 | ERB 기반 정의 수집자 | ERB 내부 메뉴/장면/이벤트/미션/업무/촬영/훈련/엔딩/텍스트/계산 상수 | `erb-derived-definitions.json`, `gate:erb-definition-coverage` | ERB-only 컨텐츠 coverage 밖 존재, trigger/condition/effect/text 미분해, owner 없는 ERB row |
| M24 | 저장 상태 매핑 관리자 | persistent 후보, CFLAG/FLAG/GLOBAL/PBAND 등 save 후보의 index/slot 단위 mapping | `save-mapping.json`, `gate:save-mapping`, `gate:state-family-index-coverage` | `needsDecision`, `missingMapping`, field path 없는 mapped row, family-level blanket mapping |
| M25 | 세션/계산 매핑 관리자 | TFLAG/TEQUIP/SOURCE/UP/DOWN/LOSEBASE/LOCAL/ARG/RESULT 등 임시값과 계산값 | `session-mapping.json`, `calculation-lifecycle.json`, `gate:session-mapping`, `gate:save-payload` | lifecycle 없는 row, save payload에 남은 session/calculation 값, raw family name runtime 노출 |
| M26 | 구현 전 누락 감사자 | M21~M25 산출물의 gap, orphan, missing evidence, role-only, unknown owner | `pre-implementation-gap-audit.json`, `gate:pre-implementation-audit` | discovered gap, missing evidence, orphan, role-only complete, unknown owner가 1개라도 남음 |
| M27 | 구현 큐 관리자 | M28~M49 구현 단위, ownerMilestone, verificationId, blocker 해소 책임 | `implementation-queue.json`, `blocker-freeze-list.json`, `gate:implementation-queue` | 원본 row 없는 구현 단위, verification 없는 구현 단위, accepted owner 없는 transfer |
| M28 | 메인 route 연결자 | 메인 화면 직속 route/action/menu/view row | `main-route-coverage.json`, `smoke:main-routes`, `gate:milestone-scope-closure -- M28` | action 없는 메뉴, dead-end route, enabled/disabled 근거 없음, owned blocker |
| M29 | 구매 상점 구현자 | 구매형 listing, 가격, 노출/해금, 구매 성공/실패/취소, inventory/shop progress 분리 | `shop-purchase-coverage.json`, `smoke:item-shop`, `gate:milestone-scope-closure -- M29` | 구매형 row 미구현, 돈 부족/취소 미검증, inventory와 shop progress 혼합 |
| M30 | 아이템 사용 구현자 | 사용형/특수 아이템, 시설 해금형, 장비/의복형, 사용 효과와 실패/취소 | `item-use-coverage.json`, `smoke:item-use`, `gate:milestone-scope-closure -- M30` | no-op 효과, 효과 owner 없음, 특수 item 미구현, owned blocker |
| M31 | 영입 구현자 | 영입 listing, 가격/조건, template 연결, 사람 생성 결과 | `recruit-coverage.json`, `smoke:recruit-all`, `gate:milestone-scope-closure -- M31` | listing-template 미연결, 생성 owner 누락, 돈/중복/조건 실패 미검증 |
| M32 | 인물 identity 관리자 | Chara template, 이름/호칭/별명/표시명, 인스턴스 identity 상태 | `character-identity-coverage.json`, `gate:character-identity`, `gate:milestone-scope-closure -- M32` | 정의 문자열과 save 상태 혼합, template 109개 중 미소비 row, 표시 검증 없음 |
| M33 | 신체/능력/소질 관리자 | BASE/ABL/TALENT/EXP/MARK/PALAM 및 body/people 수치와 표시 정의 | `body-stat-coverage.json`, `gate:body-stat-mapping`, `gate:milestone-scope-closure -- M33` | 표시 정의와 저장 수치 혼합, 결과 필드 중복, 값 범위/roundtrip 미검증 |
| M34 | 관계/CFLAG/장비 관리자 | CFLAG index, 관계, 장비/의복/착용/해금 owner | `cflag-owner-coverage.json`, `gate:cflag-owner`, `gate:milestone-scope-closure -- M34` | 의미 불명 CFLAG mapped 처리, raw `CFLAG` runtime 노출, 관계/장비 roundtrip 누락 |
| M34.5 | 전수 gate hardening 관리자 | source evidence, source-file-review, M35~M52 전용 gate, 최종 verify script | `gate:source-evidence`, `gate:coverage-hardening`, `coverage-gate-registry.json`, `gate:milestone-scope-closure -- M34.5` | auxiliary 완료 근거, source-file-review 쉬운 완료, M35~M52 전용 gate 부재, 최종 verify script 부재 |
| M35 | 턴/시간 관리자 | day/week/month/year, phase, hook 순서, 자동 구매/사용, 미션/이벤트 hook | `turn-pipeline-coverage.json`, `smoke:turn-long`, `gate:milestone-scope-closure -- M35` | hook 순서 충돌, session 잔류, 장기 턴 진행/월말 미검증 |
| M36 | 방문/시설 구현자 | 방문 장소, 시설, 장소별 행동, 해금/비용/결과 | `visit-facility-coverage.json`, `smoke:visit-all`, `gate:milestone-scope-closure -- M36` | 장소/행동 미소유 row, 선택 session과 save 혼합, 결과 owner 없음 |
| M37 | 업무/창관 구현자 | 업무/창관/아르바이트/특수 업무의 조건, 계산, 결과, 턴 연결 | `work-coverage.json`, `smoke:work-all`, `gate:milestone-scope-closure -- M37` | 계산값 save 잔류, 결과 owner 분산, 조건 미충족/취소 미검증 |
| M38 | 촬영 정의 관리자 | 촬영 장면 정의, 대상/장면 조건, 표시명/설명/예상 결과 | `filming-scene-coverage.json`, `gate:filming-scene`, `gate:milestone-scope-closure -- M38` | 장면 표시만 있고 조건/근거 없음, 예상 결과 미정, owned blocker |
| M39 | 촬영 실행 관리자 | 촬영량/수익/팬/점수/경험/이력/출시/판매 상태 | `filming-execution-coverage.json`, `smoke:filming-all`, `gate:milestone-scope-closure -- M39` | session 계산값 save 잔류, 판매 상태 owner 없음, 실패/취소 미검증 |
| M40 | 훈련 세션 관리자 | 훈련 대상/실행자/조수/command 선택, 후보 view, session lifecycle | `training-session-coverage.json`, `smoke:training-session`, `gate:milestone-scope-closure -- M40` | 선택값 save 잔류, 후보 계산 상태 변경, 취소/턴 종료 cleanup 누락 |
| M41 | 훈련 가능 조건 구현자 | 105개 command availability, 불가 사유, 대상/자원/장소/상태 조건 | `training-availability-coverage.json`, `gate:training-availability`, `gate:milestone-scope-closure -- M41` | command별 조건 row 누락, 불가 사유 없음, availability가 save 변경 |
| M42 | 훈련 0~34 효과 구현자 | command 0~34 효과, source 계산, 결과 owner, session 폐기 | `training-effect-0-34.json`, `gate:training-effect -- 0-34`, `gate:milestone-scope-closure -- M42` | source evidence 없음, 중간값 save 잔류, command별 성공/불가/취소 미검증 |
| M43 | 훈련 35~69 효과 구현자 | command 35~69 효과, source 계산, 결과 owner, session 폐기 | `training-effect-35-69.json`, `gate:training-effect -- 35-69`, `gate:milestone-scope-closure -- M43` | 결과 owner 없음, command 미구현, 중간값 save 잔류, owned blocker |
| M44 | 훈련 70 이상/후처리 구현자 | command 70 이상 전체, 훈련 후처리, 이벤트/장비/자원 변화, 전체 command 총괄 | `training-effect-70-plus.json`, `gate:training-effect -- all`, `gate:raw-training-names` | 미구현 command, 후처리 미검증, raw COMF/TFLAG/SOURCE/TEQUIP/LOSEBASE |
| M45 | 공통 유지보수 구현자 | 능력 상승, 휴식, 회복, 자동 아이템 사용, 공통 시스템 feature | `common-system-coverage.json`, `smoke:common-system`, `gate:milestone-scope-closure -- M45` | 기능 내부 임시 로직으로 숨어 있는 common feature, 결과 owner 없음 |
| M46 | 미션 구현자 | 미션 정의/수락/진행/보고/완료/실패/만료/보상/패널티 | `mission-coverage.json`, `smoke:mission-all`, `gate:milestone-scope-closure -- M46` | 미션 상태와 선택 session 혼합, 기한/실패/보상 미검증, owned blocker |
| M47 | 세계/이벤트 구현자 | 이벤트 trigger/condition/text/effect, world/story flag, hook | `event-world-coverage.json`, `gate:event-coverage`, `gate:milestone-scope-closure -- M47` | 표시만 있는 이벤트, 상태 변화 없음, 발생 조건 근거 없음, text row 미소비 |
| M48 | 엔딩/meta 구현자 | 엔딩 조건/결과, 계승, global/meta save, 클리어 보너스/전역 해금 | `ending-meta-coverage.json`, `smoke:ending-flow`, `gate:milestone-scope-closure -- M48` | 회차 save와 meta 혼합, 엔딩 승인 없는 제외, 계승/종료 경로 미검증 |
| M49 | 정보/도움말/설정/view/text 정리자 | 정보/도움말/설정/디버그, PRINT/HTML/message/help/status text, 남은 기능 감사 | `view-text-coverage.json`, `remaining-feature-audit.json`, `gate:view-and-text-coverage` | 남은 기능 catch-all 처리, 표시 텍스트 미소비, 설정 owner 없음, owned blocker |
| M50 | 저장/로드 관리자 | 전체 save schema, migration, corrupted/future/old save, 기능 후 roundtrip | `full-roundtrip-report.json`, `gate:save-payload`, `test:roundtrip:all` | definitions/session/views/calculation payload 유입, migration 실패, 기능 후 roundtrip 누락 |
| M51 | 최종 감사자 | 원본 누락, orphan, role-only, blocker, 승인 제외, evidence 충돌 | `final-gap-audit.json`, `gate:final-content-zero-gap`, `gate:coverage-crosscheck` | gap/orphan/role-only/unapproved exclusion/unresolved blocker/source conflict 1개 이상 |
| M52 | 완전 이식 판정자 | 전체 coverage, 전체 UI/action flow, 저장/로드, 엔딩, 최종 보고 | `full-port-report.json`, `verify:complete` | 미구현/미분류/미정/미승인/미해소 row 1개 이상, 전체 smoke/long-play/failure matrix 실패 |

## M0~M20 진행 근거 보강

이 절은 기존 체크리스트를 대체하지 않는다. 이미 진행된 M0~M20의 역할, 책임, 산출물, 완료선, 남은 한계를 한눈에 보기 위한 보강 기록이다.

| 마일스톤 | 역할/책임 | 산출물/검증 근거 | 완료선과 한계 |
| --- | --- | --- | --- |
| M0 | Phase 1의 범위와 제외 범위를 고정한다 | `GAME_FLOW_MAP.ko.md`, `GAME_DOMAIN_SYSTEM.md`, `MODULE_SYSTEM.ko.md`, `PROGRESS_STATUS.ko.md` 대조 | M1~M6만 최소 세로 루프로 닫는다. 이후 기능은 포함하지 않는다 |
| M1 | UI가 직접 상태를 바꾸지 않도록 action/result/effect 계약을 만든다 | `routes`, `actions`, `effects`, `results`, `dispatch`, `npm run build` | 성공/실패/no-op/route 전환 계약을 만든 단계이며, 기능별 상세 로직 완성은 아니다 |
| M2 | 저장 상태, 세션 상태, 화면 계산 객체의 기본 경계를 만든다 | `GameState`, `GameSession`, save payload 경계 helper, `npm run build` | M6까지 필요한 최소 구조만 확정한다. 전수 저장 mapping은 M24에서 닫는다 |
| M3 | 원본 CSV 기반 정의 데이터를 runtime 입력으로 연결한다 | 정의 데이터 bridge, item/recruit/shop listing 분류, `npm run collect:catalog`, `npm run build` | 정의 데이터를 저장 상태에 넣지 않는 경계를 검증한다. 모든 정의의 실제 소비 완료는 M20/M28~M49에서 닫는다 |
| M4 | 새 게임 생성이 저장 상태를 초기화하고 메인 화면으로 이어지게 한다 | `game/new` handler, EASY/NORMAL 입력, 초기 날짜/자금/인물/아이템, `npm run smoke:phase1` | 시작 상태 생성만 닫는다. 캐릭터 seed 전수 연결은 M25에서 닫는다 |
| M5 | 메인 화면을 저장 상태 기반 view로 계산하고 action으로만 이동하게 한다 | `mainMenu` route, menu view, enabled/disabled reason, unknown route/action 처리, `npm run smoke:phase1` | 메인 화면 최소 선택지만 닫는다. 원본 메인 메뉴 전수 구현은 M23에서 닫는다 |
| M6 | 아이템 구매 최소 루프를 성공/실패/취소까지 동작시킨다 | 상점 진입, listing view, 수량 선택, 돈 부족 실패, 구매 성공, 취소, `npm run smoke:phase1` | 구매형 listing 1차 루프만 닫는다. 아이템 사용/특수 효과/전체 상점은 M24에서 닫는다 |
| M7 | 영입 1차 루프를 정의 데이터, 돈, 인물 생성 경계와 연결한다 | `npm run smoke:m7`, 영입 listing, 돈 부족 실패, 영입 성공, 중복 실패, 취소 | 영입 성공 시 `people/body/social/equipment` 생성 경계를 닫는다. 전체 영입 listing 완성은 M24/M25에서 닫는다 |
| M8 | 턴 종료와 시간 진행의 최소 실행 계약을 만든다 | `npm run smoke:m8`, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 폐기 | 턴 종료 골격과 hook 위치를 닫는다. 원본 월말/주말/이벤트 전수 처리는 M27에서 닫는다 |
| M9 | 저장/로드 최소 roundtrip과 오염 payload 차단을 만든다 | `npm run smoke:m9`, schema v1, 직렬화/역직렬화, 손상/future/runtime 오염 실패 | 최소 저장/로드는 닫는다. 전체 기능 후 roundtrip과 migration은 M50에서 닫는다 |
| M10 | 방문/시설 1차 루프를 장소, 행동, 해금 저장 상태와 연결한다 | `npm run smoke:m10`, 방문 view, 기본 방 사용 허가, 돈 부족/중복/취소, `visit` session 폐기 | 장소/행동 1개만 닫는다. 방문/시설 전체는 M26에서 닫는다 |
| M11 | 미션 1차 루프를 정의, 진행 저장 상태, 보상과 연결한다 | `npm run smoke:m11`, 미션 수락/보고, 조건 미충족, 방문 해금 조건, 보상 지급 | 미션 1개만 닫는다. 전체 미션, 기한, 실패, 이벤트 연동은 M27에서 닫는다 |
| M12 | 업무 1차 루프를 결과 계산과 저장 반영으로 분리한다 | `npm run smoke:m12`, 업무/인물 선택, 누락 실패, 돈/경험/피로/이력 반영, 턴 종료 | 업무 1개만 닫는다. 업무/창관/특수 업무 전체는 M26에서 닫는다 |
| M13 | 촬영 1차 루프를 대상/장면 선택, 촬영량 계산, 결과 반영으로 분리한다 | `npm run smoke:m13`, 대상/장면 누락 실패, 취소, 수익/팬/점수/경험/피로/이력 반영 | 촬영 장면 1개만 닫는다. 촬영 장면 전체와 후처리는 M26에서 닫는다 |
| M14 | 훈련 1차 command를 session 계산과 저장 결과 반영으로 분리한다 | `npm run smoke:m14`, 대상/실행자/command 선택, 누락 실패, 계산 버퍼, 결과 반영, session 폐기 | command 1개만 닫는다. 105개 command 전체와 후처리는 M28에서 닫는다 |
| M15 | 화면 렌더링을 route별로 정리하고 진단 패널을 읽기 전용으로 둔다 | `RouteScreens`, `ScreenPrimitives`, `DiagnosticsPanel`, UI 직접 상태 변경 검색, `npm run build` | UI가 상태를 직접 바꾸지 않는 경계를 닫는다. UX 완성이나 전체 화면 구현 완료는 아니다 |
| M16 | smoke/gate 검증 묶음으로 build 단독 완료를 차단한다 | `verify:m16`, `test:roundtrip`, `gate:boundaries`, `gate:raw-names`, `gate:stubs` | M6~M14 최소 루프와 경계 검증을 자동화한다. M21 이후 coverage gate는 별도다 |
| M17 | 원본 근거 대조 정책과 adapter 경계를 확정한다 | `LEGACY_MAPPING_POLICY.ko.md`, `inventory:legacy-mapping`, adapter import 검색, `npm run build` | mapping 상태값과 승인/차단 규칙을 닫는다. 대량 mapping 자체는 M24/M25에서 한다 |
| M18 | 이후 구현을 1개 단위씩 진행하는 규칙과 template을 고정한다 | `IMPLEMENTATION_UNIT_RULES.ko.md`, template 검색, `npm run build`, `npm run test --if-present` | M28~M49의 작업 방식만 닫는다. 기능 구현량을 늘리는 마일스톤이 아니다 |
| M19 | 원본 기능 커버리지 전수표를 만들고 blocker 장부를 시작한다 | `data/coverage/features.json`, `data/coverage/blockers.json`, `coverage:features`, `gate:feature-coverage` | feature row 5,344개와 blocker 5,333개를 장부화한다. 구현 완료가 아니라 구현 대상을 셀 수 있게 만든 단계다 |
| M20 | 원본 정의 데이터와 Chara seed를 역할/소비 책임으로 분류한다 | `data/coverage/definitions.json`, `coverage:definitions`, `gate:definition-consumption`, `npm run build` | definition row 7,840개를 장부화한다. `template/listing/display-only/calculation-only`는 역할 판정이며 실제 소비 완료가 아니다. 실제 소비 검증은 M28~M49에서 닫는다 |

## M21~M52 실행 기준 보강

이 절은 기존 체크리스트를 대체하지 않는다. M21~M52를 진행할 때 각 마일스톤이 무엇을 소유하고, 어디까지 처리해야 완료인지, 어떤 상태가 남으면 완료 차단인지 명확히 하기 위한 기준이다.

| 마일스톤 | 역할 | 책임 범위 | 필수 산출물 | 완료 판정 | 완료 차단 기준 |
| --- | --- | --- | --- | --- | --- |
| M21 | 원본 근거 관리자 | 모든 coverage row가 참조할 원본 근거 형식을 고정하고 문서 해석과 실제 원본을 구분한다 | source evidence schema, source priority rule, source evidence gate 초안 | feature/definition/save/session row가 같은 근거 형식을 쓸 수 있고, 문서만 근거인 row가 완료 상태가 아님 | 원본 파일/라벨/CSV 행/family index가 비어 있거나 근거 충돌이 blocker가 아닌 상태 |
| M22 | 전수표 관계 검증자 | feature, definition, save, session, blocker 장부를 서로 대조하는 gate를 만든다 | coverage crosscheck rule, orphan/role-only detection, approved-excluded registry format | orphan coverage, role-only 완료, source evidence 누락을 gate가 실패로 잡음 | `template`, `listing`, `display-only`, `calculation-only`가 실제 소비 없이 완료로 계산됨 |
| M23 | ERB 기반 정의 데이터 수집자 | CSV 밖에서 ERB가 암묵적으로 정의하는 메뉴, 장면, 이벤트, 계산 상수를 정의 데이터 후보로 만든다 | ERB-derived definition coverage, conflict list, owner candidate list | CSV/ERB 정의 후보가 runtime definition, blocker, approved-excluded 중 하나로 분류됨 | ERB에서만 존재하는 컨텐츠가 coverage 밖에 남거나 CSV와 충돌한 정의가 미판정 상태 |
| M24 | 저장 상태 매핑 관리자 | 원본 persistent 후보를 새 save 도메인 필드 또는 비저장 판정으로 분해한다 | save mapping coverage, domain field path, owner decision, save blocker list | 저장해야 하는 원본 주소가 `field path`, non-save 판정, 사용자 승인 제외 중 하나를 갖고 소유 blocker 0개 | `map-save-state`, `needsDecision`, `missingMapping`, 소유 blocker가 기능 완료 범위에 남음 |
| M25 | 세션/계산 매핑 관리자 | 원본 임시 버퍼와 계산 중간값을 session owner 또는 계산 함수 내부값으로 분리한다 | session/calculation mapping coverage, lifecycle table, raw-name ban check | 각 session/calculation row가 생성, 소비, 폐기 시점을 갖고 save payload에 들어가지 않음 | `TFLAG`, `SOURCE`, `TEQUIP` 등 원본 배열명이 앱 모델명으로 복사되거나 비저장 중간값이 save에 들어감 |
| M26 | 구현 전 누락 감사자 | M28 이후 구현 전에 원본 누락, orphan row, role-only row를 찾아낸다 | `pre-implementation-gap-audit.json`, gap classification, ownerMilestone review | `discovered-gap`, `orphan-coverage`, `role-only`, unknown owner가 0개 | 감사 결과가 남아 있는데 기능군 구현으로 넘어감 |
| M27 | 구현 큐 관리자 | M28~M49의 구현 단위를 coverage row 기준으로 큐화하고 blocker 해소 마일스톤을 고정한다 | implementation queue, blocker freeze list, approved-excluded request list | 모든 구현 단위가 feature/definition/save/session/view row와 검증 요구를 가짐 | 구현 단위가 원본 row 없이 생성되거나 blocker 해소 마일스톤이 비어 있음 |
| M28 | 메인 route 연결자 | 원본 메인 화면에서 직접 도달 가능한 기능 route를 모두 연결한다 | route map, menu enabled/disabled table, main feature status update | 모든 메인 메뉴가 route/action/result 계약 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | 표시만 있고 action이 없거나 route dead-end가 남음 |
| M29 | 구매 상점 구현자 | 구매형 아이템과 상점 노출/해금/구매 결과를 전수 구현한다 | item shop handlers, shop view tests, purchase roundtrip tests | 구매형 listing 전체가 성공/실패/취소와 저장 roundtrip을 통과 | 인벤토리 수량, 상점 진행 상태, 현재 선택 session이 섞임 |
| M30 | 아이템 사용/특수 효과 구현자 | 사용형 아이템과 특수 아이템의 조건, 효과, owner 반영을 닫는다 | item use handlers, special item blocker/implementation list, usage tests | 사용형/특수 item 전체가 실제 효과 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | no-op handler로 특수 아이템을 완료 처리하거나 효과 owner가 불명확함 |
| M31 | 영입 구현자 | 영입 listing 전체를 캐릭터 원형, 비용, 생성 결과와 연결한다 | recruit handlers, listing-to-template map, recruit roundtrip tests | 모든 영입 listing이 생성 결과 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | 영입 후 `people/body/social/equipment` 초기 상태 누락 또는 listing-template 미연결 |
| M32 | 인물 identity 관리자 | Chara template 전체와 이름/호칭/별명/표시 identity를 정의/저장 경계에 맞춘다 | character identity model, template-to-instance conversion, identity view tests | 109개 원형이 인스턴스 생성과 표시, 저장 roundtrip을 통과 | 정의 문자열과 플레이 중 상태가 같은 save 필드에 섞임 |
| M33 | 신체/능력/소질 관리자 | BASE, ABL, TALENT, EXP, MARK, PALAM 계열을 body/people 정의와 저장 수치로 분해한다 | body/ability state model, seed mapping, stat display tests | 초기값, 표시명, 레벨/증감 계산이 owner별로 분리되고 저장 roundtrip이 통과 | 표시 정의와 저장 수치가 섞이거나 업무/촬영/훈련 결과가 서로 다른 중복 필드를 씀 |
| M34 | 관계/CFLAG/장비 owner 관리자 | CFLAG, 관계, 장비, 의복 상태를 의미별 owner로 분해한다 | CFLAG owner table, social/equipment model, raw-name search | CFLAG seed와 정의가 people/body/equipment/social/work/mission/settings/features 등으로 분해됨 | 의미 불명 CFLAG가 mapped로 처리되거나 `CFLAG` raw name이 runtime model에 남음 |
| M34.5 | gate hardening 관리자 | M35 이후 누락 방지 gate를 실제 script와 실패 조건으로 고정한다 | source evidence hard gate, final gate skeleton, per-milestone script registry | M35~M52가 문서 요구가 아니라 실제 gate로 완료 차단됨 | gate가 문서에만 있거나 auxiliary 완료 근거/source-file-review 쉬운 완료가 남음 |
| M35 | 턴 종료/시간 관리자 | 원본 턴 종료, 시간 진행, 월말/주말 hook, 자동 처리 순서를 구현한다 | turn pipeline, hook order table, turn roundtrip tests | 시간 진행과 hook 결과가 save owner에 반영되고 session이 폐기됨 | hook 순서가 원본과 충돌하거나 턴 종료 중 임시 선택값이 저장됨 |
| M36 | 방문/시설 구현자 | 방문 장소, 장소별 행동, 시설 해금과 결과 반영을 전수 구현한다 | visit/facility definitions, visit handlers, visit smoke/roundtrip tests | 장소/행동 전체가 구현 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | 장소 선택 session과 시설 진행 save가 섞이거나 방문 행동 결과 owner가 불명확함 |
| M37 | 업무/창관 구현자 | 업무, 창관, 아르바이트, 특수 업무의 조건과 결과를 전수 구현한다 | work definitions, work handlers, work result tests | 업무 전체가 조건, 성공/실패/취소, 저장 반영, 턴 종료를 검증함 | 업무 계산값이 session이 아닌 save에 남거나 결과가 economy/people/body/work/run 밖으로 흩어짐 |
| M38 | 촬영 정의/조건 관리자 | 촬영 장면 정의, 대상 조건, 장면 조건, 예상 결과를 구현한다 | filming scene definitions, scene condition tests, definition evidence table | 촬영 장면 전체가 정의와 조건 검증 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | 장면이 UI에 표시되지만 원본 근거나 조건 계산이 없음 |
| M39 | 촬영 실행/판매 구현자 | 촬영량, 수익, 팬, 점수, 이력, 출시/판매 상태를 구현한다 | filming execution handlers, release/sales state, filming roundtrip tests | 촬영 성공/실패/취소/턴 종료와 저장 반영이 검증됨 | 촬영 session 계산값이 저장 payload에 남거나 판매 상태 owner가 불명확함 |
| M40 | 훈련 세션 관리자 | 훈련 대상, 실행자, 조수, command 선택과 화면 session lifecycle을 완성한다 | training session model, command candidate view, session cleanup tests | 훈련 화면 진입/취소/완료/턴 종료에서 session 생성과 폐기가 검증됨 | 훈련 선택값이 save에 남거나 command 후보 계산이 상태를 변경함 |
| M41 | 훈련 가능 조건 구현자 | 105개 command의 availability와 불가 사유를 전수 구현한다 | command availability table, unavailable reason tests | 각 command가 가능/불가 조건과 표시 사유를 가짐 | command가 실행 가능하지만 조건 row 또는 불가 사유가 없음 |
| M42 | 훈련 효과 0~34 구현자 | command 0~34의 source 계산, 파라미터 변화, 자원 소모, 결과 반영을 구현한다 | command 0~34 handlers, source calculation tests, coverage updates | command 0~34가 성공/불가/취소/결과 적용/session 폐기를 통과 | 원본 계산 중간값이 save에 들어가거나 source evidence가 없음 |
| M43 | 훈련 효과 35~69 구현자 | command 35~69의 계산과 결과 반영을 구현한다 | command 35~69 handlers, source calculation tests, coverage updates | command 35~69가 성공/불가/취소/결과 적용/session 폐기를 통과 | command 결과 owner가 불명확하거나 blocker 없이 미구현 command가 남음 |
| M44 | 훈련 효과 70 이상/후처리 구현자 | command 70 이상 전체와 훈련 후처리, 이벤트, 장비/자원 변화를 구현한다 | command 70-plus handlers, post-training pipeline, raw-name gate | 전체 command와 후처리가 구현 또는 사용자 승인 제외 상태이고 소유 blocker 0개 | `COMF`, `TFLAG`, `SOURCE`, `TEQUIP`, `LOSEBASE` raw name이 runtime에 남음 |
| M45 | 공통 유지보수 구현자 | 능력 상승, 휴식, 회복, 자동 아이템 사용, 공통 시스템 흐름을 구현한다 | common-system handlers, rest/ability tests, roundtrip tests | 공통 기능이 owner별 결과 반영과 성공/실패/취소를 검증함 | common-system feature가 특정 기능군 내부 임시 로직으로 숨어 있음 |
| M46 | 미션 구현자 | 미션 정의, 수락, 진행, 보고, 완료, 실패, 만료, 보상을 전수 구현한다 | mission definitions, mission lifecycle handlers, mission roundtrip tests | 미션 전체가 조건/기한/보상/패널티와 턴 종료 연동을 검증함 | 미션 상태와 미션 선택 session이 섞이거나 보상 owner가 불명확함 |
| M47 | 세계/이벤트 구현자 | 이벤트 조건, 스토리 진행, 장소/세계 플래그, hook 발생을 구현한다 | event/world handlers, event hook table, world roundtrip tests | 이벤트가 발생 조건, 표시, 상태 변화, 저장 반영을 모두 가짐 | 이벤트 표시만 있고 상태 변화나 발생 조건 근거가 없음 |
| M48 | 엔딩/전역 상태 구현자 | 엔딩 조건, 결과 화면, 계승, 전역 meta save를 구현한다 | ending condition table, global/meta save model, ending flow tests | 엔딩과 계승 새 게임, 전역 상태 roundtrip이 검증됨 | 회차 save와 global/meta save가 섞이거나 승인 없는 엔딩 제외가 있음 |
| M49 | 남은 메뉴/설정 정리자 | 정보, 도움말, 업적, 설정, 디버그, 남은 기능을 구현 또는 승인 제외로 닫는다 | remaining-feature audit, settings model, final feature-group gap audit | M28~M49 기능군 범위에 미구현 feature, 미소비 definition, 미정 mapping이 남지 않음 | 남은 기능을 숨기거나 설명 없이 제외 처리함 |
| M50 | 전체 저장/로드 관리자 | 모든 기능군 후 저장/로드, schema, migration, corrupted/future/old save 처리를 완성한다 | save schema, migration tests, full roundtrip suite | M24/M25 mapping row 전체가 저장 payload 또는 비저장 판정과 일치함 | session/definitions/views/calculation buffer가 save payload에 들어감 |
| M51 | 최종 감사자 | 원본 누락, orphan coverage, role-only 완료, 승인 없는 제외를 최종 감사한다 | `final-gap-audit.json`, unresolved blocker list, final evidence report | final audit에서 gap, orphan, role-only, unapproved exclusion이 0개 | blocker가 남아 있거나 source evidence와 consumer evidence가 충돌함 |
| M52 | 완전 이식 판정자 | 전체 게임이 원본 컨텐츠를 구현, 승인 제외, blocker 0 상태로 닫았는지 판정한다 | final coverage summary, full smoke flow, final verification log | feature/definition/save/session coverage가 모두 완료 상태이고 전체 smoke/build/test가 통과 | 미구현 기능, 미분류 정의, 미정 주소, 미해소 blocker, 승인 없는 제외가 1개라도 남음 |

## M34.5~M52 gate 상세 의무

이 표는 각 마일스톤에서 "무엇을 만들고, 무엇을 하면 안 되고, 어떤 기준으로 넘어가는지"를 강제한다. `package.json` script가 없거나 `tools/*` 구현이 없으면 해당 항목은 존재하지 않는 것으로 본다. 빈 closure JSON, 수동 체크박스, 문서 설명만으로는 다음 마일스톤으로 넘어가지 않는다.

| M | 시작 전 반드시 존재해야 하는 것 | 하면 안 되는 것 | 넘어갈 수 있는 검사 |
| --- | --- | --- | --- |
| M34.5 | `gate:source-evidence`, `gate:coverage-hardening`, `coverage-gate-registry.json`, `audit:final-gap`, `gate:final-gap-audit`, `gate:final-content-zero-gap`, `verify:complete` skeleton | auxiliary evidence를 완료 근거로 유지, source-file-review를 파일명만으로 완료, 문서상 gate만 추가 | `npm run gate:source-evidence`, `npm run gate:coverage-hardening`, `npm run gate:coverage-crosscheck`, `npm run build` |
| M35 | `coverage:turn-pipeline`, `gate:turn-pipeline`, `smoke:turn-long` | M8 최소 턴 smoke를 원본 턴 완료로 재사용, hook 순서 미기록, session cleanup 미검증 | 장기 턴, 월말/주말, 자동 구매/사용, 미션/이벤트 hook, save roundtrip, session cleanup 통과 |
| M36 | `coverage:visit-facility`, `gate:visit-facility`, `smoke:visit-all` | 장소/행동 1개만 구현하고 전체 방문 완료 처리, 장소 선택 session을 save에 저장 | 모든 장소/행동 row가 구현/승인 제외/근거 있는 transfer이고 비용/조건/취소/roundtrip 통과 |
| M37 | `coverage:work`, `gate:work-coverage`, `smoke:work-all` | 업무 결과를 기능 내부 임시 필드에 흩뜨림, 계산값을 save에 저장 | 모든 업무/창관/특수 업무 row가 조건/성공/실패/취소/턴 종료/roundtrip 검증 보유 |
| M38 | `coverage:filming-scene`, `gate:filming-scene`, scene condition table | 장면 이름만 표시하고 조건/예상 결과를 미구현 | 모든 장면 row가 source evidence, 대상 조건, 장면 조건, 불가 사유, verification 보유 |
| M39 | `coverage:filming-execution`, `gate:filming-execution`, `smoke:filming-all` | 촬영량/수익/판매 계산값을 저장 payload에 남김 | 촬영 성공/실패/취소/턴 종료, 출시/판매 상태, save roundtrip, session cleanup 통과 |
| M40 | `coverage:training-session`, `gate:training-session`, `smoke:training-session` | 훈련 후보 계산이 저장 상태를 변경, 선택값 save 잔류 | 진입/대상/실행자/조수/command 선택/취소/완료/턴 종료 session lifecycle 검증 |
| M41 | `coverage:training-availability`, `gate:training-availability`, command별 availability matrix | COMABLE 전체를 한 row로 닫음, 불가 사유 없는 command를 완료 처리 | 105개 command 각각 가능/불가 조건, 불가 사유, source evidence, non-mutating view 계산 검증 |
| M42 | `coverage:training-effect-0-34`, `gate:training-effect -- 0-34`, command별 smoke/table | command 효과 일부만 구현, source 계산 중간값 save 저장 | command 0~34 각각 성공/불가/취소/결과 owner/session cleanup/source evidence 검증 |
| M43 | `coverage:training-effect-35-69`, `gate:training-effect -- 35-69`, command별 smoke/table | 결과 owner 없는 command를 구현 완료 처리 | command 35~69 각각 성공/불가/취소/결과 owner/session cleanup/source evidence 검증 |
| M44 | `coverage:training-effect-70-plus`, `gate:training-effect -- all`, `gate:raw-training-names` | 미구현 command를 후처리로 숨김, raw `COMF/TFLAG/SOURCE` runtime 노출 | command 70 이상 전체, 후처리, 이벤트/장비/자원 변화, 전체 command gap 0 검증 |
| M45 | `coverage:common-system`, `gate:common-system`, `smoke:common-system` | common feature를 특정 기능 내부 임시 로직으로 처리 | 능력 상승/휴식/회복/자동 아이템/공통 hook이 owner와 roundtrip 검증 보유 |
| M46 | `coverage:mission`, `gate:mission-coverage`, `smoke:mission-all` | 미션 상태와 선택 session 혼합, 기한/실패 미구현 | 모든 미션 정의/수락/진행/보고/완료/실패/만료/보상/패널티/턴 hook 검증 |
| M47 | `coverage:event-world`, `gate:event-coverage`, event hook matrix | 표시만 있는 이벤트, 조건 없는 이벤트, 상태 변화 없는 이벤트 완료 처리 | 이벤트별 trigger/condition/text/effect/save owner/hook/roundtrip 검증 |
| M48 | `coverage:ending-meta`, `gate:ending-meta`, `smoke:ending-flow` | 회차 save와 global/meta save 혼합, 엔딩 승인 없는 제외 | 엔딩 조건/결과/계승/global/meta/업적/전역 해금 roundtrip 검증 |
| M49 | `coverage:view-text`, `gate:view-and-text-coverage`, `remaining-feature-audit` | 남은 기능 catch-all 처리, text 수집만 하고 화면 소비 없음 | PRINT/HTML/message/help/status text가 route/view consumer와 verification을 갖고 남은 feature gap 0 |
| M50 | `test:roundtrip:all`, `gate:save-payload`, `full-roundtrip-report.json` | M16 최소 roundtrip을 전체 저장/로드 완료로 재사용 | 모든 주요 기능 후 save/load, corrupted/future/old schema, migration, session/definition/view payload 유입 0 |
| M51 | `audit:final-gap`, `gate:final-gap-audit`, `gate:final-content-zero-gap` | 새 누락을 M52로 넘김, blocker를 최종 보고서에 숨김 | source manifest 미분해 0, orphan 0, role-only complete 0, auxiliary completion 0, unresolved blocker 0 |
| M52 | `report:full-port`, `gate:complete-port-verdict`, `verify:complete` | 일부 기능 미구현 상태에서 완전 이식 선언 | `verify:complete` 전체 통과, `full-port-report.json`에 미구현/미분류/미정/미승인/미해소 0 |

## 상세 마일스톤 본문 위치

상세 마일스톤 본문은 아래 phase 문서로 분리한다. 이 파일에는 공통 규칙, phase 경계, 전체 실행 기준만 둔다.

- M0~M6: `docs/milestones/PHASE_1_M0_M6.ko.md`
- M7~M16: `docs/milestones/PHASE_2_M7_M16.ko.md`
- M17~M20: `docs/milestones/PHASE_3_M17_M20.ko.md`
- M21~M27: `docs/milestones/PHASE_4_M21_M27.ko.md`
- M28~M49: `docs/milestones/PHASE_5_M28_M49.ko.md`
- M50~M52: `docs/milestones/PHASE_6_M50_M52.ko.md`
- 전체 책임 지도: `docs/milestones/PORT_RESPONSIBILITY_MAP.ko.md`

에이전트는 현재 마일스톤의 phase 문서에서 해당 section만 읽는다. 긴 본문 전체 읽기는 금지한다.
