# 신규 포트 마일스톤

## 공통 완료 기준

- [ ] `npm run build` 통과
- [ ] 저장 상태, 세션 상태, view 계산 객체 경계가 섞이지 않음
- [ ] UI와 flow가 공통 action/result 계약을 사용함
- [ ] 새 소유권이 생기면 기준 문서 갱신
- [ ] 원본 변수명을 앱 모델명으로 직접 복사하지 않음
- [ ] 미정 항목을 기능 완료로 처리하지 않음
- [ ] 보류 항목은 원본 위치, 보류 사유, 해소 마일스톤을 가진 blocker로 남김
- [ ] 구현 제외는 사용자 승인 없이는 완료 처리하지 않음
- [ ] `.env.local` 접근 없음
- [ ] 유료 AI/OpenRouter 호출 없음
- [ ] 마일스톤 하나를 완료할 때마다 검증 결과를 확인한 뒤 별도 커밋을 남김

## 완전 이식 완료 기준

- [ ] 원본 메인 화면 선택지 전체가 구현 또는 사용자 승인 제외로 분류됨
- [ ] 원본 정의 데이터 전체가 사용 또는 사용자 승인 제외로 분류됨
- [ ] 저장 상태로 판정된 원본 주소가 새 저장 모델 필드로 연결됨
- [ ] 세션/계산 버퍼로 판정된 원본 주소가 새 실행 중 데이터 또는 계산 함수로 연결됨
- [ ] 미해소 blocker 0개
- [ ] `missingMapping`, `needsDecision`, `needs-review` 항목이 기능 완료 상태에 남아 있지 않음
- [ ] 기능별 성공/실패/취소/저장 roundtrip 검증이 있음
- [ ] 최종 coverage 산출물에 미구현 기능 0개, 미분류 원본 주소 0개가 기록됨

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
- M28~M49: 전수표를 기준으로 기능군별 구현 완료
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
- [ ] 구현 마일스톤의 완료 조건은 `ownedTotal = implemented + approvedExcluded + transferredOut`이고, `ownedBlocker = 0`, `roleOnlyComplete = 0`, `missingEvidence = 0`, `missingConsumer = 0`, `missingVerification = 0`, `unapprovedExcluded = 0`이어야 한다.
- [ ] `transferredOut`은 이번 마일스톤이 소유하지 않는다고 입증된 row에만 허용한다. 반드시 `fromMilestone`, `toMilestone`, `transferReason`, `sourceEvidenceId`, `acceptedByOwner`를 기록한다.
- [ ] 사용자 승인 제외는 `approvalId`, `approvedBy`, `approvalScope`, `sourceEvidenceId`, `replacementBehavior`가 없으면 완료 상태가 아니다.
- [ ] `template`, `listing`, `display-only`, `calculation-only`, `role-only`는 구현 완료가 아니라 역할 분류다. 실제 `runtimeConsumerId`와 `verificationId`가 없으면 완료로 세지 않는다.
- [ ] source evidence는 실제 원본 파일/라벨/CSV 행/family/index에 닿아야 한다. 파생 문서만 근거인 row는 완료 상태가 아니다.
- [ ] ERB에서만 드러나는 `trigger`, `condition`, `effect`, `result`, `text`, `postProcess`, `save write`, `session write`는 별도 row로 소유자를 가져야 한다.
- [ ] `CFLAG`, `TFLAG`, `TEQUIP`, `SOURCE`, `UP`, `DOWN`, `LOSEBASE`, `LOCAL`, `ARG`, `RESULT` 계열은 family 이름이 아니라 index/slot 단위로 owner, lifecycle, consumer, verification을 가진다.
- [ ] 기능이 UI에서 보이더라도 route/action/handler/view/calculation/save 또는 session consumer와 테스트 검증이 없으면 완료가 아니다.
- [ ] M21~M27은 장부와 gate를 만드는 책임자다. schema만 적고 실제 산출물과 실패 gate가 없으면 완료가 아니다.
- [ ] M28~M49는 기능군 owner다. 자기 기능군의 owned row를 남김없이 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개를 증명해야 한다.
- [ ] M50~M52는 마지막 정리 책임자이지 미구현 기능을 숨기는 책임자가 아니다. M51에서 새 누락이 나오면 M52로 가지 않고 해당 owner 마일스톤으로 되돌린다.
- [ ] 각 마일스톤은 `data/coverage/milestones/Mxx-closure.json`을 남긴다. 이 파일에는 `ownedTotal`, `implemented`, `mapped`, `approvedExcluded`, `transferredOut`, `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded`, `commandsRun`, `commitHash`를 기록한다.
- [ ] `Mxx-closure.json`에서 `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded` 중 하나라도 0이 아니면 해당 마일스톤은 완료하지 않는다.

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
| M35 | 턴/시간 관리자 | day/week/month/year, phase, hook 순서, 자동 구매/사용, 미션/이벤트 hook | `turn-pipeline-coverage.json`, `smoke:turn-long`, `gate:milestone-scope-closure -- M35` | hook 순서 충돌, session 잔류, 장기 턴 진행/월말 미검증 |
| M36 | 방문/시설 구현자 | 방문 장소, 시설, 장소별 행동, 해금/비용/결과 | `visit-facility-coverage.json`, `smoke:visit-all`, `gate:milestone-scope-closure -- M36` | 장소/행동 미소유 row, 선택 session과 save 혼합, 결과 owner 없음 |
| M37 | 업무/창관 구현자 | 업무/창관/아르바이트/특수 업무의 조건, 계산, 결과, 턴 연결 | `work-coverage.json`, `smoke:work-all`, `gate:milestone-scope-closure -- M37` | 계산값 save 잔류, 결과 owner 분산, 조건 미충족/취소 미검증 |
| M38 | 촬영 정의 관리자 | 촬영 장면 정의, 대상/장면 조건, 표시명/설명/예상 결과 | `filming-scene-coverage.json`, `gate:filming-scene`, `gate:milestone-scope-closure -- M38` | 장면 표시만 있고 조건/근거 없음, 예상 결과 미정, owned blocker |
| M39 | 촬영 실행 관리자 | 촬영량/수익/팬/점수/경험/이력/출시/판매 상태 | `filming-execution-coverage.json`, `smoke:filming-all`, `gate:milestone-scope-closure -- M39` | session 계산값 save 잔류, 판매 상태 owner 없음, 실패/취소 미검증 |
| M40 | 훈련 세션 관리자 | 훈련 대상/실행자/조수/command 선택, 후보 view, session lifecycle | `training-session-coverage.json`, `smoke:training-session`, `gate:milestone-scope-closure -- M40` | 선택값 save 잔류, 후보 계산 상태 변경, 취소/턴 종료 cleanup 누락 |
| M41 | 훈련 가능 조건 구현자 | 105개 command availability, 불가 사유, 대상/자원/장소/상태 조건 | `training-availability-coverage.json`, `gate:training-availability`, `gate:milestone-scope-closure -- M41` | command별 조건 row 누락, 불가 사유 없음, availability가 save 변경 |
| M42 | 훈련 0~34 효과 구현자 | command 0~34 효과, source 계산, 결과 owner, session 폐기 | `training-effect-0-34.json`, `gate:training-effect -- 0-34`, `gate:milestone-scope-closure -- M42` | source evidence 없음, 중간값 save 잔류, command별 성공/불가/취소 미검증 |
| M43 | 훈련 35~69 효과 구현자 | command 35~69 효과, source 계산, 결과 owner, session 폐기 | `training-effect-35-69.json`, `gate:training-effect -- 35-69`, `gate:milestone-scope-closure -- M43` | 결과 owner 없음, command 미구현, 중간값 save 잔류, owned blocker |
| M44 | 훈련 70~104/후처리 구현자 | command 70~104, 훈련 후처리, 이벤트/장비/자원 변화, 105개 총괄 | `training-effect-70-104.json`, `gate:training-effect -- all`, `gate:raw-training-names` | 105개 중 미구현 command, 후처리 미검증, raw COMF/TFLAG/SOURCE/TEQUIP/LOSEBASE |
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
| M9 | 저장/로드 최소 roundtrip과 오염 payload 차단을 만든다 | `npm run smoke:m9`, schema v1, 직렬화/역직렬화, 손상/future/runtime 오염 실패 | 최소 저장/로드는 닫는다. 전체 기능 후 roundtrip과 migration은 M29에서 닫는다 |
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
| M35 | 턴 종료/시간 관리자 | 원본 턴 종료, 시간 진행, 월말/주말 hook, 자동 처리 순서를 구현한다 | turn pipeline, hook order table, turn roundtrip tests | 시간 진행과 hook 결과가 save owner에 반영되고 session이 폐기됨 | hook 순서가 원본과 충돌하거나 턴 종료 중 임시 선택값이 저장됨 |
| M36 | 방문/시설 구현자 | 방문 장소, 장소별 행동, 시설 해금과 결과 반영을 전수 구현한다 | visit/facility definitions, visit handlers, visit smoke/roundtrip tests | 장소/행동 전체가 구현 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | 장소 선택 session과 시설 진행 save가 섞이거나 방문 행동 결과 owner가 불명확함 |
| M37 | 업무/창관 구현자 | 업무, 창관, 아르바이트, 특수 업무의 조건과 결과를 전수 구현한다 | work definitions, work handlers, work result tests | 업무 전체가 조건, 성공/실패/취소, 저장 반영, 턴 종료를 검증함 | 업무 계산값이 session이 아닌 save에 남거나 결과가 economy/people/body/work/run 밖으로 흩어짐 |
| M38 | 촬영 정의/조건 관리자 | 촬영 장면 정의, 대상 조건, 장면 조건, 예상 결과를 구현한다 | filming scene definitions, scene condition tests, definition evidence table | 촬영 장면 전체가 정의와 조건 검증 또는 사용자 승인 제외를 갖고 소유 blocker 0개 | 장면이 UI에 표시되지만 원본 근거나 조건 계산이 없음 |
| M39 | 촬영 실행/판매 구현자 | 촬영량, 수익, 팬, 점수, 이력, 출시/판매 상태를 구현한다 | filming execution handlers, release/sales state, filming roundtrip tests | 촬영 성공/실패/취소/턴 종료와 저장 반영이 검증됨 | 촬영 session 계산값이 저장 payload에 남거나 판매 상태 owner가 불명확함 |
| M40 | 훈련 세션 관리자 | 훈련 대상, 실행자, 조수, command 선택과 화면 session lifecycle을 완성한다 | training session model, command candidate view, session cleanup tests | 훈련 화면 진입/취소/완료/턴 종료에서 session 생성과 폐기가 검증됨 | 훈련 선택값이 save에 남거나 command 후보 계산이 상태를 변경함 |
| M41 | 훈련 가능 조건 구현자 | 105개 command의 availability와 불가 사유를 전수 구현한다 | command availability table, unavailable reason tests | 각 command가 가능/불가 조건과 표시 사유를 가짐 | command가 실행 가능하지만 조건 row 또는 불가 사유가 없음 |
| M42 | 훈련 효과 0~34 구현자 | command 0~34의 source 계산, 파라미터 변화, 자원 소모, 결과 반영을 구현한다 | command 0~34 handlers, source calculation tests, coverage updates | command 0~34가 성공/불가/취소/결과 적용/session 폐기를 통과 | 원본 계산 중간값이 save에 들어가거나 source evidence가 없음 |
| M43 | 훈련 효과 35~69 구현자 | command 35~69의 계산과 결과 반영을 구현한다 | command 35~69 handlers, source calculation tests, coverage updates | command 35~69가 성공/불가/취소/결과 적용/session 폐기를 통과 | command 결과 owner가 불명확하거나 blocker 없이 미구현 command가 남음 |
| M44 | 훈련 효과 70~104/후처리 구현자 | command 70~104와 훈련 후처리, 이벤트, 장비/자원 변화를 구현한다 | command 70~104 handlers, post-training pipeline, raw-name gate | 105개 command 전체와 후처리가 구현 또는 사용자 승인 제외 상태이고 소유 blocker 0개 | `COMF`, `TFLAG`, `SOURCE`, `TEQUIP`, `LOSEBASE` raw name이 runtime에 남음 |
| M45 | 공통 유지보수 구현자 | 능력 상승, 휴식, 회복, 자동 아이템 사용, 공통 시스템 흐름을 구현한다 | common-system handlers, rest/ability tests, roundtrip tests | 공통 기능이 owner별 결과 반영과 성공/실패/취소를 검증함 | common-system feature가 특정 기능군 내부 임시 로직으로 숨어 있음 |
| M46 | 미션 구현자 | 미션 정의, 수락, 진행, 보고, 완료, 실패, 만료, 보상을 전수 구현한다 | mission definitions, mission lifecycle handlers, mission roundtrip tests | 미션 전체가 조건/기한/보상/패널티와 턴 종료 연동을 검증함 | 미션 상태와 미션 선택 session이 섞이거나 보상 owner가 불명확함 |
| M47 | 세계/이벤트 구현자 | 이벤트 조건, 스토리 진행, 장소/세계 플래그, hook 발생을 구현한다 | event/world handlers, event hook table, world roundtrip tests | 이벤트가 발생 조건, 표시, 상태 변화, 저장 반영을 모두 가짐 | 이벤트 표시만 있고 상태 변화나 발생 조건 근거가 없음 |
| M48 | 엔딩/전역 상태 구현자 | 엔딩 조건, 결과 화면, 계승, 전역 meta save를 구현한다 | ending condition table, global/meta save model, ending flow tests | 엔딩과 계승 새 게임, 전역 상태 roundtrip이 검증됨 | 회차 save와 global/meta save가 섞이거나 승인 없는 엔딩 제외가 있음 |
| M49 | 남은 메뉴/설정 정리자 | 정보, 도움말, 업적, 설정, 디버그, 남은 기능을 구현 또는 승인 제외로 닫는다 | remaining-feature audit, settings model, final feature-group gap audit | M28~M49 기능군 범위에 미구현 feature, 미소비 definition, 미정 mapping이 남지 않음 | 남은 기능을 숨기거나 설명 없이 제외 처리함 |
| M50 | 전체 저장/로드 관리자 | 모든 기능군 후 저장/로드, schema, migration, corrupted/future/old save 처리를 완성한다 | save schema, migration tests, full roundtrip suite | M24/M25 mapping row 전체가 저장 payload 또는 비저장 판정과 일치함 | session/definitions/views/calculation buffer가 save payload에 들어감 |
| M51 | 최종 감사자 | 원본 누락, orphan coverage, role-only 완료, 승인 없는 제외를 최종 감사한다 | `final-gap-audit.json`, unresolved blocker list, final evidence report | final audit에서 gap, orphan, role-only, unapproved exclusion이 0개 | blocker가 남아 있거나 source evidence와 consumer evidence가 충돌함 |
| M52 | 완전 이식 판정자 | 전체 게임이 원본 컨텐츠를 구현, 승인 제외, blocker 0 상태로 닫았는지 판정한다 | final coverage summary, full smoke flow, final verification log | feature/definition/save/session coverage가 모두 완료 상태이고 전체 smoke/build/test가 통과 | 미구현 기능, 미분류 정의, 미정 주소, 미해소 blocker, 승인 없는 제외가 1개라도 남음 |

## M0. 기준 동결

책임 선언:
- 역할: 신규 포트 작업의 첫 실행 범위를 동결한다.
- 범위: M1~M6에 필요한 원본 흐름, 데이터 경계, 모듈 경계, 제외 기능만 다룬다.
- 방식: 기준 문서와 현재 진행 상태를 대조해 Phase 1의 포함/제외와 blocker 가능 지점을 확정한다.
- 완료 결과: M1이 바로 실행 가능한 상태가 되고, Phase 1 밖 기능은 완료로 착각되지 않는다.
- 누락 차단: M1~M6 범위, 제외 기능, blocker 지점 중 하나라도 비어 있으면 완료하지 않는다.

- [x] `GAME_FLOW_MAP.ko.md`에서 M1~M6에 필요한 기능 흐름만 확인
- [x] `GAME_DOMAIN_SYSTEM.md`에서 `definitions/save/session/views` 경계 확인
- [x] `MODULE_SYSTEM.ko.md`에서 import 방향 확인
- [x] M1~M6 포함/제외 범위 확정
- [x] M1~M6에서 만들 파일 목록 확정
- [x] M1~M6에서 의도적으로 만들지 않을 기능 목록 확정
- [x] M1~M6 중 blocker가 생길 수 있는 지점 표시
- [x] `PROGRESS_STATUS.ko.md`의 다음 작업이 M1과 일치하는지 확인

검증:

```bash
rg "^## M[0-9]+" docs/NEW_PORT_MILESTONES.ko.md
```

## M1. 공통 실행 계약

책임 선언:
- 역할: 게임 실행을 UI 직접 조작이 아니라 action/result/effect 계약으로 통일한다.
- 범위: route, action, effect, result, dispatch의 최소 공통 계약과 M6까지 필요한 action만 포함한다.
- 방식: 성공, 실패, no-op, route 전환을 result로 표현하고 UI는 dispatch만 호출하게 한다.
- 완료 결과: 이후 모든 기능이 같은 실행 계약 위에서 구현될 수 있다.
- 누락 차단: 실패 action이 저장 상태를 바꾸거나 UI에 기능 로직이 남으면 완료하지 않는다.

- [x] `src/game/routes.ts`에 `UiRoute` 정의
- [x] `src/game/effects.ts`에 `GameEffect` 정의
- [x] `src/game/results.ts`에 `GameActionContext`, `GameActionResult`, result helper 정의
- [x] `src/game/actions.ts`에 M6까지 필요한 action 정의
- [x] `src/game/dispatch.ts`에 `dispatchGameAction(context, action)` 골격 작성
- [x] `GameAction`이 route 변경, 새 게임, 상점 진입, 선택 변경, 구매, 취소를 표현할 수 있음
- [x] `GameActionResult`가 다음 state, 다음 session, effects, route를 분리해서 반환함
- [x] result helper가 성공, 실패, no-op, route 전환을 구분함
- [x] `GameEffect`가 UI 로그, 경고, 저장 요청 같은 부수효과를 상태 변경과 분리함
- [x] dispatch가 action별 handler로 분기하되 UI 컴포넌트에 구현 로직을 두지 않음
- [x] 실패 action이 저장 상태를 바꾸지 않도록 처리
- [x] 실패 action이 세션 상태를 바꾸는 경우와 바꾸지 않는 경우를 구분
- [x] M1 범위 밖 기능 action은 타입만 만들거나 blocker로 남기지 않음
- [x] 기존 UI/runtime import 영향 확인
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M2. 데이터 구조 v1

책임 선언:
- 역할: 새 게임과 상점 1차 루프에 필요한 저장 상태, 세션 상태, 화면 계산 객체의 경계를 세운다.
- 범위: `run`, `economy`, `people`, `inventory`, `shop`, `session.shop`, `views`, save payload helper의 최소 구조다.
- 방식: 저장할 데이터와 화면/행동 중에만 필요한 데이터를 타입과 helper로 분리한다.
- 완료 결과: M4~M6이 같은 상태 구조를 쓰며 save payload에 session/views가 들어가지 않는다.
- 누락 차단: 저장, 세션, view 계산값 중 하나라도 owner가 불명확하면 완료하지 않는다.

- [x] `GameState`와 `GameSession` 경계 정리
- [x] `run`, `economy`, `people`, `inventory`, `shop`의 최소 저장 상태 확정
- [x] `session.shop`, `session.ui` 등 실행 중 상태 확정
- [x] `views`는 저장 구조가 아니라 계산 결과라는 경계 확인
- [x] `GameState` 초기값 생성 함수 또는 상수 정리
- [x] `GameSession` 초기값 생성 함수 또는 상수 정리
- [x] `run.clock`에 새 게임 직후 필요한 날짜/시간대 필드 확정
- [x] `economy.account.currentMoney` 초기값 필드 확정
- [x] `inventory.itemCounts`를 `itemId -> count` 구조로 확정
- [x] `shop.progress`에는 영구 해금/숨김/시설 진행만 둠
- [x] `session.shop`에는 선택 상품, 수량, 현재 표시 목록만 둠
- [x] M6 이전 불필요 도메인은 빈 상태 또는 최소 계약만 유지
- [x] 상태 경계 검증 helper 초안 작성
- [x] action result 검증 helper 초안 작성
- [x] save payload 검증 helper 초안 작성
- [x] 저장 payload에 `GameSession`과 view 계산 객체가 들어가지 않는 검증 추가
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M3. 정의 데이터 연결

책임 선언:
- 역할: 원본 CSV 기반 정의 데이터를 runtime 입력으로 연결하되 저장 상태와 분리한다.
- 범위: M6까지 필요한 item, shop listing, recruit listing, character template 조회와 실패 처리를 포함한다.
- 방식: 원본 정의를 앱에서 조회 가능한 `GameDefinitions` 경계로 변환하고 기능 로직에 직접 CSV 구조를 노출하지 않는다.
- 완료 결과: 정의 데이터는 runtime에서 읽히지만 `GameState`에는 저장되지 않는다.
- 누락 차단: 정의 조회 실패 처리, item/listing 분류, 저장 상태 분리 중 하나라도 빠지면 완료하지 않는다.

- [x] 생성된 정의 데이터 산출물을 runtime 정의 데이터 입력으로 연결
- [x] 아이템 정의와 모집 listing 정의를 구분
- [x] 정의 데이터 JSON schema 또는 타입 변환 경계 확정
- [x] `GameDefinitions.items`와 현재 코드의 `GameCatalog.items` 명칭 차이를 정리 또는 bridge 추가
- [x] `Item.csv` 0~99, 100~199, 200~214 분류를 코드에서 표현할 방법 확정
- [x] `CharacterTemplate` 109개를 runtime에서 조회할 수 있게 연결
- [x] 정의 데이터 id는 원본 index 문자열을 그대로 노출할지 앱 id로 변환할지 결정
- [x] 정의 데이터가 `GameState`에 저장되지 않도록 확인
- [x] 정의 데이터 조회 실패 처리 추가
- [x] M6에 필요한 최소 정의 데이터만 연결
- [x] M6에 쓰지 않는 정의 데이터는 로드만 하고 기능 로직에 섞지 않음
- [x] `npm run collect:catalog` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run collect:catalog
npm run build
```

## M4. 새 게임 생성

책임 선언:
- 역할: 새 게임을 시작 가능한 저장 상태와 첫 route로 초기화한다.
- 범위: 난이도 입력, 초기 날짜/목표/자금/시작 인물/시작 아이템, 실패 불변 처리를 포함한다.
- 방식: 캐릭터 원형에서 시작 인스턴스를 만들고 신체/관계/장비 기본값 생성 지점을 분리한다.
- 완료 결과: 새 게임 성공 후 메인 화면으로 이동하며 실패 시 저장 상태가 남지 않는다.
- 누락 차단: 초기 상태 owner가 불명확하거나 실패 경로가 상태를 오염시키면 완료하지 않는다.

- [x] 새 게임 action 구현
- [x] 새 게임 action 입력값 타입 정의
- [x] 새 게임 전용 handler 작성
- [x] 초기 날짜/주차/목표 상태 생성
- [x] 초기 자금 생성
- [x] 시작 인물/보유 아이템 생성
- [x] 캐릭터 원형에서 시작 인물 인스턴스를 만드는 최소 변환 작성
- [x] 신체/관계/장비 기본값 생성 지점 분리
- [x] 초기 session route 설정
- [x] 새 게임 성공 effect 작성
- [x] 새 게임 실패 effect 작성
- [x] 생성 실패가 저장 상태를 남기지 않도록 처리
- [x] 새 게임 직후 메인 화면으로 이동하는 smoke 경로 확인
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M5. 메인 화면 view

책임 선언:
- 역할: 메인 화면을 저장 상태에서 계산되는 view와 action 진입점으로 만든다.
- 범위: 메인 route, 메뉴 view model, enabled/disabled 사유, 로그/effect, unknown route/action 처리다.
- 방식: UI는 저장 상태를 직접 수정하지 않고 action만 dispatch한다.
- 완료 결과: 새 게임 직후 사용자가 메인 화면에서 다음 기능으로 이동할 수 있다.
- 누락 차단: 메뉴가 표시만 되고 action이 없거나 UI 직접 상태 변경이 남으면 완료하지 않는다.

- [x] 메인 화면 route 구현
- [x] 저장 상태를 읽어 선택지 view 계산
- [x] 메인 화면 view model 타입 정의
- [x] 메뉴 항목 id와 표시 label 분리
- [x] 메뉴 항목의 enabled/disabled 사유 표현
- [x] `GAME_FLOW_MAP.ko.md`의 메인 화면 기능 목록과 메뉴 id 대조
- [x] UI가 저장 상태를 직접 수정하지 않도록 action만 dispatch
- [x] 로그/effect 표시 최소 구현
- [x] route 전환이 저장 상태 변경 없이 동작하는지 확인
- [x] 알 수 없는 route/action 처리 경로 작성
- [x] 새 게임에서 메인 화면까지 smoke 확인
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M6. 아이템 구매 1차

책임 선언:
- 역할: 아이템 구매의 최소 세로 루프를 실제 상태 변화까지 닫는다.
- 범위: 상점 진입, 판매 listing 계산, 상품 선택, 수량 변경, 구매 성공/실패/취소, 돈/인벤토리 반영이다.
- 방식: 판매 목록과 선택값은 session/view로 두고 보유 수량과 돈만 save에 반영한다.
- 완료 결과: 구매 성공, 돈 부족 실패, 취소가 모두 동작하고 save payload 경계가 유지된다.
- 누락 차단: 현재 선택값이 저장되거나 구매 실패가 돈/인벤토리를 바꾸면 완료하지 않는다.

- [x] 상점 진입 action 구현
- [x] 판매 가능 listing view 계산
- [x] `ShopView.visibleListings` 계산 함수 작성
- [x] `GameSession.shop.visibleListingIds`를 저장 payload에서 제외
- [x] 상품 상세 view 계산 작성
- [x] 상품 선택/수량 변경 action 구현
- [x] 수량 0, 음수, 재고/제한 초과 입력 처리
- [x] 구매 성공 시 자금 감소와 아이템 증가 처리
- [x] 구매 실패 시 저장 상태 불변 확인
- [x] 돈 부족 실패 처리
- [x] 정의 데이터에 없는 item/listing 실패 처리
- [x] 취소/메인 복귀 처리
- [x] 구매 성공/실패/취소 effect 메시지 분리
- [x] M6 범위 밖 기능을 붙이지 않음
- [x] `npm run build` 실행

검증:

```bash
npm run build
```

## M7. 고용/영입 1차

책임 선언:
- 역할: 영입 1차 루프를 돈, listing, 인물 생성 경계까지 닫는다.
- 범위: 영입 후보 view, 가격/조건, 성공, 돈 부족 실패, 중복 실패, 취소, 인물 기본 상태 생성이다.
- 방식: 영입 listing은 정의 데이터로 읽고 성공 결과만 `people/body/social/equipment` save owner에 반영한다.
- 완료 결과: 최소 영입 흐름이 실제 캐릭터 추가와 저장 roundtrip 검증을 갖는다.
- 누락 차단: listing과 캐릭터 원형 연결, 실패/취소, 생성 owner 중 하나라도 빠지면 완료하지 않는다.

- [x] 모집 listing view 계산
- [x] 영입 후보 정의와 캐릭터 원형 연결
- [x] 영입 가격 계산
- [x] 영입 가능 조건 계산
- [x] 영입 action 구현
- [x] 영입 성공 시 자금 감소 처리
- [x] 영입 성공 시 `people`, `body`, `social`, `equipment` 기본 상태 생성
- [x] `people/body/social/equipment` 생성 경계 확인
- [x] 중복 영입 또는 인원 제한 실패 처리
- [x] 실패/취소 처리
- [x] 영입 성공/실패/취소 effect 메시지 분리
- [x] `npm run build` 실행

## M8. 턴 종료/시간 진행

책임 선언:
- 역할: 턴 종료와 시간 진행의 실행 계약을 만든다.
- 범위: `turn/end`, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 임시 상태 폐기를 포함한다.
- 방식: 턴 종료 전후 hook 위치를 만들고 아직 전수 구현하지 않은 월말/미션 처리는 명시 stub/blocker로 남긴다.
- 완료 결과: 한 턴이 끝나면 시간과 phase가 일관되게 바뀌고 임시 session이 비워진다.
- 누락 차단: 턴 종료 후 session 선택값이 남거나 hook 미구현이 문서화되지 않으면 완료하지 않는다.

- [x] `turn/end` action 구현
- [x] 일/주차/기간 진행 규칙 구현
- [x] 전반/후반 또는 phase 전환 규칙 구현
- [x] 턴 종료 전 실행할 hooks 배열 정의
- [x] 턴 종료 후 실행할 hooks 배열 정의
- [x] session 임시 상태 정리
- [x] 예약 이벤트 최소 처리
- [x] 미션 기한 감소는 stub 또는 명시 blocker로 분리
- [x] 월말/주말 처리는 stub 또는 명시 blocker로 분리
- [x] 턴 종료 후 메인 화면 route 복귀 확인
- [x] `npm run build` 실행

## M9. 저장/로드

책임 선언:
- 역할: 최소 저장/로드 roundtrip과 오염 payload 차단을 만든다.
- 범위: schema v1, 직렬화/역직렬화, 손상 JSON, future schema, runtime 오염, session 폐기를 포함한다.
- 방식: save payload는 `GameState`와 metadata만 포함하고 definitions/session/views를 거부한다.
- 완료 결과: 저장한 상태를 다시 로드하면 동일 save state가 복원된다.
- 누락 차단: session/views/definitions가 payload에 들어가거나 손상 payload 실패가 없으면 완료하지 않는다.

- [x] 저장 payload 형식 확정
- [x] save schema version 필드 확정
- [x] `GameState`와 metadata만 저장
- [x] `GameSession`과 view 계산 객체가 저장 payload에 섞이지 않도록 검증
- [x] 정의 데이터가 저장 payload에 섞이지 않도록 검증
- [x] 저장 직렬화 함수 작성
- [x] 저장 역직렬화 함수 작성
- [x] 손상 payload 실패 처리 작성
- [x] 저장 roundtrip 확인
- [x] `npm run build` 실행

## M10. 방문/시설 1차

책임 선언:
- 역할: 방문/시설 1차 루프를 장소 선택, 행동 결과, 시설 해금 save 경계까지 닫는다.
- 범위: 장소 view, 행동 1개, 돈 부족/중복/취소 실패, `world.unlocks`, `featureState.visits`, `visit` session 폐기다.
- 방식: 현재 선택값은 session에 두고 영구 해금/방문 진행만 save에 반영한다.
- 완료 결과: 방문 성공/실패/취소가 실제 돈/해금/진행 상태와 연결된다.
- 누락 차단: 장소 선택 session과 시설 진행 save가 섞이면 완료하지 않는다.

- [x] 방문 가능 장소 view 계산
- [x] 방문 장소 id와 표시 label 분리
- [x] 장소 진입 가능 조건 계산
- [x] 장소 1개와 행동 1개 구현
- [x] 장소 action 성공 결과 반영
- [x] 장소 action 실패 결과 반영
- [x] 장소 action 취소 결과 반영
- [x] 시설 해금/플래그 저장 경계 확인
- [x] 방문 세션 선택값이 저장 상태에 남지 않는지 확인
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M11. 미션 1차

책임 선언:
- 역할: 미션 1개를 정의, 진행 상태, 조건, 보상까지 닫는다.
- 범위: 미션 목록, 선택, 수락, 보고, 조건 미충족 실패, 방문 해금 조건, 보상 지급, mission session 폐기다.
- 방식: 미션 정의와 미션 진행 save를 분리하고 목록 선택값은 session으로 처리한다.
- 완료 결과: 미션 수락부터 완료 보고까지 하나의 검증 가능한 루프가 된다.
- 누락 차단: 미션 정의와 진행 상태가 섞이거나 보고 실패/보상 경로가 빠지면 완료하지 않는다.

- [x] 미션 정의와 진행 상태 분리
- [x] 미션 목록 view 계산
- [x] 미션 표시 조건 계산
- [x] 미션 1개 시작/완료 처리
- [x] 미션 수락 action 구현
- [x] 미션 보고 action 구현
- [x] 미션 실패 또는 조건 미충족 처리
- [x] 보상 지급 처리
- [x] 미션 진행 상태가 저장 payload에 포함되는지 확인
- [x] 미션 목록 선택 상태가 저장 payload에 들어가지 않는지 확인
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M12. 업무 1차

책임 선언:
- 역할: 업무 1개를 선택, 계산, 저장 반영, 턴 종료까지 닫는다.
- 범위: 업무 정의, 업무/참여 인물 선택, 조건 실패, 취소, 돈/경험/피로/업무 이력 반영, work session 폐기다.
- 방식: 결과 계산은 session/calculation에서 하고 확정 결과만 save owner에 반영한다.
- 완료 결과: 업무 실행 후 경제, 인물, 신체, 업무 이력, 시간이 일관되게 갱신된다.
- 누락 차단: 계산 중간값이 save에 남거나 참여 인물 누락 실패가 없으면 완료하지 않는다.

- [x] 업무 정의와 배정 상태 분리
- [x] 업무 목록 view 계산
- [x] 업무 참여 조건 계산
- [x] 업무 1개 실행 처리
- [x] 업무 성공 결과 계산
- [x] 업무 실패 또는 조건 미충족 처리
- [x] 결과 계산과 저장 반영 분리
- [x] 돈/경험/피로/시간 진행 반영 지점 분리
- [x] 업무 완료 후 턴 종료 연결
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M13. 촬영 1차

책임 선언:
- 역할: 촬영 1개 장면을 대상/장면 선택, 촬영량 계산, 결과 반영까지 닫는다.
- 범위: 촬영 대상 후보, 장면 후보, 대상/장면 누락 실패, 선택/화면 취소, 수익/팬/점수/경험/피로/이력 반영이다.
- 방식: 촬영 중간 계산은 session에 두고 결과만 economy/people/body/feature state에 반영한다.
- 완료 결과: 촬영 확정 후 결과 반영, 턴 종료, session 폐기가 검증된다.
- 누락 차단: 촬영량 session 계산이나 실패/취소 경로가 빠지면 완료하지 않는다.

- [x] 촬영 정의와 session 상태 분리
- [x] 촬영 대상 후보 view 계산
- [x] 촬영 대상 조건 실패 사유 표현
- [x] 촬영 장면 후보 view 계산
- [x] 장면 1개 실행
- [x] 장면 선택/취소/확정 action 구현
- [x] 촬영량 또는 비용 계산
- [x] 촬영 결과 계산
- [x] 결과만 저장 상태에 반영
- [x] 턴 종료와 경계 확인
- [x] 촬영 세션 계산 버퍼가 저장 payload에 들어가지 않는지 확인
- [x] `npm run build` 실행

## M14. 훈련 1차

책임 선언:
- 역할: 훈련 command 1개를 선택, 가능 조건, 계산 버퍼, 결과 반영까지 닫는다.
- 범위: 대상/실행자/조수 선택, command 후보 view, 불가 사유, 자극/source 계산, 파라미터/자원/피로 반영이다.
- 방식: 훈련 중간값은 interaction/session에 두고 최종 결과만 save owner에 반영한다.
- 완료 결과: command 하나가 성공/불가/취소/턴 종료/session 폐기를 검증한다.
- 누락 차단: 원본명 raw state를 모델명으로 쓰거나 계산 버퍼가 save에 남으면 완료하지 않는다.

- [x] command 1개 availability 계산
- [x] 대상/조수/실행자 선택 상태 정의
- [x] command 후보 view 계산
- [x] command 불가 사유 표현
- [x] 훈련 계산 버퍼를 session에만 유지
- [x] 자극 원천 계산 함수 작성
- [x] 파라미터 증가/감소 계산 함수 작성
- [x] 체력/기력 감소 계산 함수 작성
- [x] 결과만 저장 상태에 반영
- [x] 훈련 종료 후 턴 종료 연결
- [x] 원본 `COMF`, `TFLAG`, `SOURCE` 등 직접 모델명 사용 차단
- [x] `npm run build` 실행

검증:

```bash
npm run build
rg "COMF|TFLAG|SOURCE|TEQUIP|LOSEBASE" src/game src/domains src/ui
```

## M15. 화면 정리와 진단 패널

책임 선언:
- 역할: 화면 구조를 route별 renderer와 읽기 전용 진단 패널로 정리한다.
- 범위: runtime hook, route screen, 공통 선택지/요약 UI, effect log, diagnostics panel이다.
- 방식: UI는 action dispatch 외에는 상태를 직접 바꾸지 않도록 검색과 구조로 차단한다.
- 완료 결과: 현재 route, state/session 요약, boundary diagnostics를 읽기 전용으로 확인할 수 있다.
- 누락 차단: UI에서 `state`나 `session`을 직접 변경하는 코드가 남으면 완료하지 않는다.

- [x] runtime hook 정리
- [x] UI가 읽는 runtime 값 목록 정리
- [x] route별 화면 렌더러 정리
- [x] 선택지 컴포넌트 정리
- [x] 로그/effect 표시 정리
- [x] 읽기 전용 진단 패널 구현
- [x] 진단 패널에 현재 route, state 요약, session 요약 표시
- [x] 진단 패널이 action dispatch 외 상태 변경을 하지 않도록 확인
- [x] UI가 서비스나 저장 상태를 직접 수정하지 않도록 확인
- [x] `npm run build` 실행

## M16. 테스트/검증 체계 확장

책임 선언:
- 역할: M6~M14 최소 루프와 경계 검증을 자동 실행 가능한 gate로 묶는다.
- 범위: smoke scripts, roundtrip, boundary gate, raw-name gate, stub gate, `verify:m16`이다.
- 방식: build만 통과하는 상태를 완료로 보지 않고 smoke/gate 묶음을 통과해야 완료로 본다.
- 완료 결과: 최소 게임 골격의 성공/실패/취소/저장 경계가 자동 검증된다.
- 누락 차단: 미등록 stub, raw legacy name, save/session boundary 실패가 있으면 완료하지 않는다.

- [x] 테스트 도구 추가 여부 결정
- [x] 테스트 도구를 추가하면 package script 추가
- [x] 테스트 도구를 추가하지 않으면 shell 기반 smoke 검증만 유지
- [x] M6 최소 루프 성공/실패 테스트 추가
- [x] 새 게임 생성 테스트 추가
- [x] 저장 roundtrip 테스트 추가
- [x] 상태 경계 검증 자동화
- [x] 원본명 차단 검색 추가
- [x] build 외 검증 명령을 `PROGRESS_STATUS.ko.md`에 반영
- [x] `npm run build` 실행
- [x] 테스트 도구가 있으면 `npm run test --if-present` 실행

검증:

```bash
npm run build
npm run test --if-present
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_" src/game src/domains src/ui
```

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

## M21. 원본 근거 장부 확정

책임 선언:
- 역할: 이후 모든 전수표가 믿고 참조할 원본 근거 장부를 확정한다.
- 범위: CSV, ERB, Chara CSV, VariableSize CSV, 보조 CSV, 파생 문서의 근거 지위를 구분하는 일이다.
- 방식: 공통 `sourceEvidence` 형식과 파일/라벨/행/family/index/read-write 기록 방식을 만든다.
- 완료 결과: feature, definition, save, session row가 같은 근거 규격을 공유한다.
- 누락 차단: 문서만 근거인 row, 원본 위치 없는 row, 근거 충돌 row가 완료 상태에 있으면 완료하지 않는다.

- [x] 원본 근거의 1차 위치를 `original-game/CSV`, `original-game/ERB`, `original-game/CSV/Chara*.csv`, `original-game/CSV/VariableSize.CSV`로 고정
- [x] 보조 CSV와 파생 문서가 원본 근거인지 해석 보조 자료인지 구분
- [x] feature row, definition row, save row, session row가 공통으로 쓰는 `sourceEvidence` 형식 확정
- [x] evidence에 파일 경로, 라벨, CSV 행, family/index, read/write 방향을 기록
- [x] 문서만 보고 `implemented`, `used`, `mapped`를 부여하지 못하게 차단
- [x] 원본 파일이 없거나 근거가 충돌하는 항목은 blocker로 기록
- [x] source evidence가 실제 파일에 존재하는지 확인하는 gate 구현
- [x] `data/coverage/source-evidence.schema.json` 작성
- [x] `data/coverage/source-manifest.json` 생성
- [x] feature/definition/blocker row에 `sourceEvidenceId`와 `sourceEvidence` 추가
- [x] 보조 CSV `Ho版資料（作成中途）/source.csv`, `Ho版資料（作成中途）/cflag.csv`를 auxiliary evidence로 분리
- [x] auxiliary evidence가 `implemented`, `used`, `template`, `listing`, `approved-excluded` 완료 근거가 되지 않도록 차단
- [x] `npm run coverage:source-manifest` 실행
- [x] `npm run coverage:features` 실행
- [x] `npm run coverage:definitions` 실행
- [x] `npm run gate:source-evidence` 실행
- [x] `npm run inventory:legacy-mapping` 실행
- [x] `npm run build` 실행

검증:

```bash
npm run coverage:source-manifest
npm run coverage:features
npm run coverage:definitions
npm run gate:feature-coverage
npm run gate:definition-consumption
npm run gate:source-evidence
npm run inventory:legacy-mapping
npm run build
```

## M22. 전수표 교차 대조 gate

책임 선언:
- 역할: 기능/정의/save/session 장부가 서로 맞물리는지 검증하는 gate를 만든다.
- 범위: orphan coverage, role-only 완료, source evidence 누락, approved-excluded 근거 형식이다.
- 방식: feature가 읽는 definition/save/session/view owner와 definition의 실제 consumer를 서로 대조한다.
- 완료 결과: 장부에만 있고 실제 소비가 없는 항목이 gate에서 실패한다.
- 누락 차단: `template`, `listing`, `display-only`, `calculation-only`가 실제 소비 없이 완료로 잡히면 완료하지 않는다.

- [x] M19 feature coverage와 M20 definition coverage를 서로 연결하는 교차 대조 규칙 작성
- [x] feature가 읽는 definition/save/session/view owner를 기록하는 컬럼 확정
- [x] definition row가 실제 handler, view, calculation, save init 중 어디서 소비되는지 기록
- [x] save mapping과 session mapping이 feature/definition row에 연결되지 않으면 orphan으로 잡는 규칙을 기록하고, 실제 mapping row가 생기는 M24/M25에서 strict gate로 전환
- [x] blocker와 approved-excluded의 승인 근거 형식 확정
- [x] `template`, `listing`, `display-only`, `calculation-only`를 구현 완료로 세지 않도록 gate 작성
- [x] orphan coverage, role-only 완료, source evidence 누락을 실패로 처리
- [x] `data/coverage/coverage-crosscheck.json` 산출
- [x] `data/coverage/approved-exclusions.json` 형식 확정
- [x] `data/coverage/milestones/M22-closure.json` 작성
- [x] `npm run coverage:source-manifest` 실행
- [x] `npm run coverage:features` 실행
- [x] `npm run coverage:definitions` 실행
- [x] `npm run coverage:crosscheck` 실행
- [x] `npm run gate:feature-coverage` 실행
- [x] `npm run gate:definition-consumption` 실행
- [x] `npm run gate:source-evidence` 실행
- [x] `npm run gate:coverage-crosscheck` 실행
- [x] `npm run gate:approved-exclusions` 실행
- [x] `npm run build` 실행

## M23. ERB 기반 정의 데이터 보강

책임 선언:
- 역할: CSV에 없고 ERB에서 암묵적으로 정의된 컨텐츠를 정의 데이터 후보로 끌어올린다.
- 범위: 메뉴 선택지, 장면, 이벤트, 미션/업무/촬영/방문/엔딩 정의, 계산 상수다.
- 방식: ERB 근거와 CSV 근거의 충돌을 기록하고 runtime definition, blocker, approved-excluded 중 하나로 분류한다.
- 완료 결과: ERB 기반 정의가 M28~M49에서 실제 소비 검증 가능한 row가 된다.
- 누락 차단: ERB에만 있는 컨텐츠가 coverage 밖에 남거나 충돌 정의가 미판정이면 완료하지 않는다.

- [x] CSV에 없고 ERB에서만 정의되는 선택지, 장면, 이벤트, 계산 상수를 수집
- [x] 미션, 업무, 촬영, 방문, 이벤트, 엔딩의 ERB 기반 정의 후보를 분류
- [x] ERB 기반 정의와 CSV 정의가 충돌하면 source evidence 우선순위 기록
- [x] ERB 기반 정의 데이터 산출물 경로를 `data/coverage/erb-derived-definitions.json`으로 확정
- [x] ERB 기반 정의도 runtime 정의 데이터, blocker, approved-excluded 중 하나로 분류
- [x] 표시 전용 정의와 계산 입력 정의를 구분
- [x] M20 definition coverage에 ERB 기반 정의 보강 row를 연결
- [x] `data/coverage/erb-derived-definitions.json`에 ERB-only 정의 160행과 component label 302개 산출
- [x] `data/coverage/definitions.json`에 `erb-derived-definition` 160행 병합
- [x] M22에서 남긴 `visitPlaces`, `missionDefinitions`, `workDefinitions`, `filmingSceneDefinitions` read gap 0개 확인
- [x] `data/coverage/milestones/M23-closure.json` 작성
- [x] `npm run analyze:game-system` 실행
- [x] `npm run coverage:source-manifest` 실행
- [x] `npm run coverage:features` 실행
- [x] `npm run coverage:erb-definitions` 실행
- [x] `npm run coverage:definitions` 실행
- [x] `npm run coverage:crosscheck` 실행
- [x] `npm run gate:feature-coverage` 실행
- [x] `npm run gate:definition-consumption` 실행
- [x] `npm run gate:source-evidence` 실행
- [x] `npm run gate:erb-definition-coverage` 실행
- [x] `npm run gate:coverage-crosscheck` 실행
- [x] `npm run gate:approved-exclusions` 실행
- [x] `npm run build` 실행

## M24. 저장 상태 원본 주소 전수 매핑

책임 선언:
- 역할: 저장해야 하는 원본 주소를 새 save 도메인 필드 또는 비저장 판정으로 닫는다.
- 범위: `map-save-state` 대상, persistent 후보, CFLAG/FLAG/GLOBAL/PBAND 의미 단위 분해다.
- 방식: family/index별 source evidence, runtime owner, field path, status를 작성한다.
- 완료 결과: 기능 구현 범위의 저장 주소가 모두 mapped, non-save, blocker, approved-excluded 중 하나가 된다.
- 누락 차단: `needsDecision`, `missingMapping`, field path 없는 mapped row가 남으면 완료하지 않는다.

- [x] `map-save-state` 대상 1,215개를 도메인 필드, 비저장 판정, 사용자 승인 제외 중 하나로 분류하고 소유 blocker 0개 확인
- [x] save mapping coverage 산출물 경로를 `data/coverage/save-mapping.json`으로 확정
- [x] family, index, source evidence, runtime owner, field path, status 컬럼 확정
- [x] persistent 후보 1,016개 숫자 슬롯을 저장 필드, 정의 데이터, 세션, script scratch, 사용자 승인 제외 중 하나로 재판정하고 소유 blocker 0개 확인
- [x] `CFLAG`, `FLAG`, `GLOBAL`, `PBAND`를 family 단위가 아니라 index 의미 단위로 분해
- [x] 캐릭터 seed 근거가 있는 주소는 캐릭터 원형 초기값과 저장 인스턴스 필드를 구분
- [x] write-only 주소는 실제 쓰기 위치를 근거로 소유 도메인을 확정
- [x] read-only 주소는 실제 사용 기능과 기본값 근거를 확인
- [x] 저장 roundtrip에서 사라지는 필드가 없는지 `roundtripRequirement`와 save mapping gate로 검증
- [x] `needsDecision`, `missingMapping` 저장 주소가 기능 완료 상태에 남지 않도록 차단
- [x] `data/coverage/save-mapping.json`에 source row 1,215개, persistent candidate row 1,016개 산출
- [x] source row 989개를 save field로 매핑하고 226개를 비저장으로 판정
- [x] persistent candidate 985개를 save field로 판정하고 31개를 M25 session-state로 이관
- [x] M24 전 `missingMapping` domain이 붙은 persistent 후보 724개가 M24 후 미판정 0개인지 확인
- [x] `ITEMSALES`, `EX`, `GOTJUEL`은 save가 아니라 M25 session mapping 대상으로 이관
- [x] `data/coverage/milestones/M24-closure.json` 작성
- [x] `npm run inventory:legacy-mapping` 실행
- [x] `npm run audit:erb-states` 실행
- [x] `npm run coverage:save-mapping` 실행
- [x] `npm run coverage:crosscheck` 실행
- [x] `npm run gate:save-mapping` 실행
- [x] `npm run gate:state-family-index-coverage` 실행
- [x] `npm run gate:coverage-crosscheck` 실행
- [x] `npm run build` 실행

## M25. 세션/계산 원본 주소 전수 매핑

책임 선언:
- 역할: 원본 임시 버퍼와 계산 중간값을 session owner 또는 계산 함수 내부값으로 분리한다.
- 범위: `map-session-state` 대상, TFLAG/TEQUIP/SOURCE/UP/DOWN/LOSEBASE/NOWEX/EJAC 의미 분해다.
- 방식: 각 row의 생성 시점, 소비 시점, 폐기 시점, calculation owner를 기록한다.
- 완료 결과: 세션/계산 값이 저장 payload에 들어가지 않고 기능 lifecycle에서 폐기된다.
- 누락 차단: 원본 배열명이 앱 모델명으로 복사되거나 중간값이 save에 들어가면 완료하지 않는다.

- [x] `map-session-state` 대상 365개를 session 필드 또는 계산 함수 내부값으로 분류
- [x] session mapping coverage 산출물 경로를 `data/coverage/session-mapping.json`으로 확정
- [x] family, index, source evidence, session owner, calculation owner, status 컬럼 확정
- [x] session/runtime buffer 후보 234개를 화면 세션, 훈련 세션, 촬영 세션, 업무 세션, script scratch, 사용자 승인 제외 중 하나로 분류하고 소유 blocker 0개 확인
- [x] `TFLAG`, `TEQUIP`, `SOURCE`, `UP`, `DOWN`, `LOSEBASE`, `NOWEX`, `EJAC`를 의미 단위로 재명명
- [x] 각 계산 버퍼의 생성 시점, 소비 시점, 폐기 시점 작성
- [x] 저장해야 하는 결과와 버려야 하는 중간값을 테스트로 분리
- [x] 각 계산 버퍼가 기능 종료 후 저장 상태에 직접 남지 않는지 검증
- [x] `data/coverage/session-mapping.json`에 source row 365개와 runtime session candidate row 234개 산출
- [x] source row 298개를 session-field로, 67개를 calculation-internal로 분류
- [x] M24에서 session-state로 이관한 `ITEMSALES`, `EX`, `GOTJUEL` 31개가 M25 session mapping에 포함되는지 확인
- [x] M25 전 `missingMapping` domain이 붙은 session 후보 164개가 M25 후 미판정 0개인지 확인
- [x] session/calculation runtime path에 원본 배열명을 복사하지 않았는지 gate로 확인
- [x] `data/coverage/milestones/M25-closure.json` 작성
- [x] `npm run audit:erb-states` 실행
- [x] `npm run coverage:session-mapping` 실행
- [x] `npm run coverage:crosscheck` 실행
- [x] `npm run gate:session-mapping` 실행
- [x] `npm run gate:session-save-boundary` 실행
- [x] `npm run gate:coverage-crosscheck` 실행
- [x] `npm run build` 실행
- [x] `rg "TFLAG|TEQUIP|SOURCE|LOSEBASE|NOWEX|EJAC" src/game src/domains src/features src/ui` 실행

## M26. 구현 전 누락 감사

책임 선언:
- 역할: 기능군 구현을 시작하기 전에 원본/coverage/consumer 누락을 전수 감사한다.
- 범위: discovered gap, missing evidence, orphan coverage, role-only row, 미승인 제외 항목이다.
- 방식: `pre-implementation-gap-audit.json`을 만들고 M28~M49 owner milestone 배정을 재확인한다.
- 완료 결과: 구현 전에 발견 가능한 누락이 blocker 또는 수정 대상으로 전부 드러난다.
- 누락 차단: 감사 결과에 gap/orphan/role-only가 남으면 M28로 넘어가지 않는다.

- [x] `data/coverage/audits/pre-implementation-gap-audit.json` 산출물 형식 확정
- [x] 원본 CSV/ERB 항목 중 coverage row가 없는 항목 14개를 source-file-review row로 기록하고 M27 또는 구현 owner에 배정
- [x] coverage row는 있지만 source evidence가 없는 항목을 `missing-evidence`로 기록. M26 결과 0개
- [x] source evidence는 있지만 consumer가 없는 항목을 `orphan-coverage`로 기록. M26 결과 0개
- [x] 역할 판정만 있고 구현 소비가 없는 항목을 implementation review row로 기록하고 owner/closureRule/verificationCommand를 부여
- [x] 승인 없는 제외 항목을 실패로 처리. M26 결과 승인 제외 0개, 미승인 제외 0개
- [x] M28~M49 및 M50 owner 배정을 재확인. implementation review 14,700행 모두 owner와 verificationCommand 보유
- [x] `discovered-gap`, `orphan-coverage`, `role-only`, `unknownOwner` 미해소 항목 0개 확인
- [x] `npm run audit:pre-implementation` 실행
- [x] `npm run gate:pre-implementation-audit` 실행
- [x] `npm run build` 실행

## M27. 구현 단위 큐와 blocker 동결

책임 선언:
- 역할: M28~M49 구현 단위를 실제 작업 큐로 동결한다.
- 범위: feature/definition/save/session/view row 묶음, blocker 해소 마일스톤, 승인 제외 요청 목록이다.
- 방식: 각 단위가 원본 근거, owner, 성공/실패/취소/roundtrip 검증 요구를 갖도록 template화한다.
- 완료 결과: 이후 구현자가 어떤 row 묶음을 닫아야 하는지 단위별로 알 수 있다.
- 누락 차단: 구현 단위가 원본 row 없이 생기거나 blocker owner가 비어 있으면 완료하지 않는다.

- [ ] M28~M49의 기능군별 구현 큐를 coverage row 기준으로 생성
- [ ] 각 구현 단위가 feature, definition, save, session, view row를 함께 참조하도록 template 보강
- [ ] 각 단위가 성공, 실패, 취소, 저장 roundtrip 중 필요한 검증을 갖도록 규칙 보강
- [ ] blocker row의 해소 마일스톤을 M28~M52 중 하나로 재배정
- [ ] 사용자 승인 제외가 필요한 항목 목록을 별도 장부로 분리
- [ ] 동일 원본 row를 여러 기능군이 소비할 때 주 owner와 참조 owner를 구분
- [ ] M28 이후 새로 발견한 원본 항목을 즉시 coverage에 추가하는 절차 작성
- [ ] `npm run build` 실행
- [ ] 테스트 도구가 있으면 `npm run test --if-present` 실행

## M28. 메인 화면과 route 전수 연결

책임 선언:
- 역할: 원본 메인 화면에서 직접 도달 가능한 기능 route를 전수 연결한다.
- 범위: 훈련, 영입, 아이템, 업무, 촬영, 방문, 능력 상승, 미션, 저장/로드, 설정/정보/엔딩 route다.
- 방식: 각 메뉴의 표시, enabled/disabled, action, route 전환, 종료 지점을 구현하거나 사용자 승인 제외로 닫는다. blocker는 완료 차단 상태로만 기록한다.
- 완료 결과: 메인 화면에서 기능군 진입 경로가 누락 없이 정리된다.
- 누락 차단: 표시만 있고 action 없는 메뉴, dead-end route, coverage 미갱신 메뉴가 남으면 완료하지 않는다.

- [ ] M19 feature coverage에서 메인 화면 직속 feature 목록을 읽음
- [ ] 원본 메인 화면에서 직접 도달 가능한 선택지 전체를 route 또는 approved-excluded로 분류
- [ ] 훈련, 영입, 아이템, 업무, 촬영, 방문, 능력 상승, 미션, 저장/로드, 설정/정보/엔딩 route를 연결
- [ ] 각 메뉴의 enabled/disabled 조건을 view 계산으로 구현
- [ ] 각 메뉴의 표시 이름과 설명을 정의 데이터 또는 화면 정의에 연결
- [ ] route 전환이 저장 상태를 직접 바꾸지 않는지 검증
- [ ] 모든 메뉴가 성공/취소 후 지정된 끝점으로 돌아가는지 검증
- [ ] M19 coverage의 메인 화면 feature status 갱신
- [ ] 기능군별 `Mxx-gap-audit.json` 첫 산출물 생성
- [ ] `npm run build` 실행

## M29. 아이템 상점과 구매 완성

책임 선언:
- 역할: 구매형 아이템과 상점 구매 흐름을 전수 구현한다.
- 범위: 모든 구매형 listing, 가격, 표시명, 구매 조건, 수량 제한, 돈 부족, 취소, 자동 구매 후보 포함이다.
- 방식: 상점 노출/해금은 shop progress와 view 계산으로, 보유 수량은 inventory로 분리한다.
- 완료 결과: 구매형 item 전체가 성공/실패/취소와 저장 roundtrip을 통과한다.
- 누락 차단: 인벤토리 수량, 상점 진행 상태, 현재 선택 session이 섞이면 완료하지 않는다.

- [ ] M20 definition coverage에서 item/listing 전체 목록을 읽음
- [ ] 모든 구매형 아이템의 표시 이름, 가격, 분류를 연결
- [ ] 모든 구매형 아이템의 구매 성공, 돈 부족 실패, 수량 제한 실패, 취소를 구현
- [ ] 상점 노출 조건, 해금 조건, 숨김 조건을 `shop.progress`와 view 계산으로 분리
- [ ] 인벤토리 수량과 상점 진행 상태를 분리 검증
- [ ] 자동 구매 대상 아이템이 있으면 턴 종료와 연결하거나 blocker로 기록
- [ ] 구매 결과 저장 roundtrip을 검증
- [ ] M20/M24 coverage의 상점 관련 status 갱신
- [ ] `npm run build` 실행

## M30. 아이템 사용과 특수 아이템 완성

책임 선언:
- 역할: 사용형 아이템과 특수 아이템의 조건과 효과를 전수 구현한다.
- 범위: 사용 조건, 사용 효과, 시설 해금형, 의복/장비형, 특수 item 15개, 실패/취소 경로다.
- 방식: 효과는 inventory/people/body/world/mission/settings/equipment 등 정확한 owner에만 반영한다.
- 완료 결과: 사용형/특수 item이 실제 효과 또는 사용자 승인 제외를 갖고 소유 blocker 0개 상태가 된다.
- 누락 차단: no-op handler로 완료 처리하거나 효과 owner가 불명확하면 완료하지 않는다.

- [ ] 모든 사용형 아이템의 사용 조건을 구현하거나 사용자 승인 제외로 분류하고, 미구현 조건은 blocker로 남겨 완료 차단
- [ ] 아이템 사용 효과가 `inventory`, `people`, `body`, `world`, `mission`, `settings` 중 정확한 owner에 반영되는지 검증
- [ ] 특수 item 15개를 실제 효과 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 시설 해금형 item과 방문/시설 기능의 소비 관계를 연결
- [ ] 의복/장비형 item과 equipment/clothing owner를 연결
- [ ] 사용 실패, 중복 사용, 조건 미충족, 취소 경로를 검증
- [ ] 아이템 사용 후 저장 roundtrip을 검증
- [ ] M20/M24/M26/M34 coverage의 관련 status 갱신
- [ ] `npm run build` 실행

## M31. 영입 listing과 인물 생성 완성

책임 선언:
- 역할: 영입 listing 전체를 인물 원형과 생성 결과로 연결한다.
- 범위: 모든 영입 listing, 가격, 표시 조건, 중복/인원/돈/조건 실패, 취소, 생성 결과다.
- 방식: 성공 시 people/body/social/equipment 초기 상태를 만들고 listing-template 연결을 검증한다.
- 완료 결과: 영입 가능한 항목 전체가 생성 결과 또는 사용자 승인 제외를 갖고 소유 blocker 0개 상태가 된다.
- 누락 차단: listing과 캐릭터 원형 연결 누락 또는 생성 owner 누락이 있으면 완료하지 않는다.

- [ ] 모든 영입 listing의 표시 조건, 가격, 생성 결과를 구현
- [ ] 영입 listing과 캐릭터 원형 연결 누락 0개 확인
- [ ] 중복 영입, 인원 제한, 돈 부족, 조건 미충족, 취소를 검증
- [ ] 영입 성공 시 `people`, `body`, `social`, `equipment` 초기 상태를 생성
- [ ] 영입 후 메인 화면, 정보 화면, 저장 roundtrip을 검증
- [ ] 영입 불가 또는 제외 항목은 사용자 승인 근거를 남기고, 미승인 blocker가 있으면 완료하지 않음
- [ ] M20/M24/M25 coverage의 영입 관련 status 갱신
- [ ] `npm run build` 실행

## M32. 인물 원형과 identity 완성

책임 선언:
- 역할: 인물 원형과 identity 정보를 정의/저장 경계에 맞게 완성한다.
- 범위: 109개 Chara template, 이름, 호칭, 별명, 표시명, 삭제/은퇴/조수/영입 가능 상태다.
- 방식: 변하지 않는 정의와 플레이 중 변하는 인스턴스 상태를 분리한다.
- 완료 결과: 원형에서 인스턴스를 생성하고 정보 표시와 저장 roundtrip이 통과한다.
- 누락 차단: 정의 문자열과 플레이 상태가 같은 save 필드에 섞이면 완료하지 않는다.

- [ ] M20 Chara template 109개 전체를 생성 가능한 캐릭터 원형으로 연결
- [ ] 이름, 호칭, 별명, 표시 이름을 정의 데이터와 저장 상태 경계에 맞게 분리
- [ ] 원형 정의와 플레이 중 인물 인스턴스를 구분
- [ ] 삭제, 은퇴, 조수 가능, 영입 가능 상태를 저장 필드로 분리
- [ ] 캐릭터 정보 화면에서 identity 값 표시를 검증
- [ ] 원형에서 인스턴스 생성 후 저장 roundtrip을 검증
- [ ] Chara seed 중 identity 관련 row의 coverage status 갱신
- [ ] `npm run build` 실행

## M33. 신체/능력/소질/경험 완성

책임 선언:
- 역할: 신체, 능력, 소질, 경험, 각인, 파라미터 초기값과 변화 owner를 완성한다.
- 범위: BASE, ABL, TALENT, EXP, MARK, PALAM 계열과 표시/계산 정의다.
- 방식: 표시 정의와 저장 수치를 분리하고 업무/촬영/훈련 결과가 같은 body/people 필드를 쓰게 한다.
- 완료 결과: 초기값과 증가/감소 계산, 정보 화면, 저장 roundtrip이 일관된다.
- 누락 차단: 표시 정의와 저장 수치가 섞이거나 중복 필드로 결과가 흩어지면 완료하지 않는다.

- [ ] Chara seed의 `BASE`, `ABL`, `TALENT`, `EXP`, `MARK`, `PALAM` 계열을 owner별로 연결
- [ ] 능력, 기초치, 소질, 경험, 각인, 파라미터 초기값을 표시 정의와 저장 수치로 분리
- [ ] 신체/생식/성적 이력/오염/자원 상태를 `body` 하위 객체로 분리
- [ ] 업무, 촬영, 훈련 결과가 같은 신체 필드를 공유하는지 검증
- [ ] 값 범위, 레벨 표시, 증가/감소 계산 기준을 정의 데이터와 연결
- [ ] 인물 정보 화면과 저장 roundtrip을 검증
- [ ] M20/M24 coverage의 body 관련 status 갱신
- [ ] `npm run build` 실행

## M34. 관계/CFLAG/장비/의복 owner 완성

책임 선언:
- 역할: CFLAG, 관계, 장비, 의복 상태를 의미별 owner로 분해한다.
- 범위: CFLAG 정의 151개, Chara CFLAG seed 1,465개, 관계값, 장비/의복/착용/해금 상태다.
- 방식: people/body/equipment/social/work/mission/settings/features 등 실제 owner에 배정한다.
- 완료 결과: 의미가 확인된 CFLAG는 owner와 lifecycle을 갖고, 의미 불명은 blocker로 남는다.
- 누락 차단: 의미 불명 CFLAG를 mapped 처리하거나 raw `CFLAG` 모델명이 runtime에 남으면 완료하지 않는다.

- [ ] CFLAG 정의 151개와 Chara CFLAG seed 1,465개를 의미별 owner로 분해
- [ ] 관계값과 방향성 관계를 `social`에 연결
- [ ] 장비, 의복, 착용 상태, 해금 상태를 `equipment`와 `inventory/shop/world` 경계에 맞게 분리
- [ ] CFLAG 중 people/body/equipment/social/work/mission/settings/features owner를 구분
- [ ] 의미 불명 CFLAG는 완료 처리하지 않고 blocker로 남김
- [ ] 관계/장비/의복 변화가 저장 roundtrip에 남는지 검증
- [ ] 원본명 `CFLAG`를 앱 모델명으로 직접 사용하지 않도록 검색
- [ ] M20/M24/M25 coverage의 관련 status 갱신
- [ ] `npm run build` 실행

## M35. 턴 종료와 시간 진행 완성

책임 선언:
- 역할: 원본 턴 종료와 시간 진행, 월말/주말/자동 처리 순서를 완성한다.
- 범위: day/week/month/year 진행, phase 전환, 턴 전후 hook, 월말 hook, 자동 구매/사용, 미션/이벤트 hook이다.
- 방식: hook 순서를 명시하고 결과는 economy/run/world 등 save owner에만 반영한다.
- 완료 결과: 턴 종료 후 시간, 이벤트, 비용/보상, session 폐기, 저장 roundtrip이 검증된다.
- 누락 차단: hook 순서가 불명확하거나 턴 종료 중 임시 선택값이 저장되면 완료하지 않는다.

- [ ] 원본 턴 종료 흐름의 day/week/month/year 진행 규칙을 구현
- [ ] 전반/후반 또는 phase 전환 규칙을 저장 상태와 session 폐기로 분리
- [ ] 턴 종료 전 hook, 턴 종료 후 hook, 월말 hook, 새 주 hook을 정의
- [ ] 자동 구매, 자동 아이템 사용, 업무 결과, 미션 기한, 이벤트 발생 순서를 연결
- [ ] 월말 비용, 판매, 보상, 패널티가 `economy/run/world` owner에 반영되는지 검증
- [ ] 턴 종료 중 session 선택값이 남지 않는지 검증
- [ ] 턴 종료 후 저장 roundtrip을 검증
- [ ] M19/M24/M25 coverage의 turn-end 관련 status 갱신
- [ ] `npm run build` 실행

## M36. 방문/시설 완성

책임 선언:
- 역할: 방문 장소, 시설, 장소별 행동을 전수 구현한다.
- 범위: 모든 방문 장소, 행동, 해금 조건, 비용/조건/중복 실패, 취소, 결과 반영이다.
- 방식: 장소 선택 session과 시설/세계 진행 save를 분리하고 결과 owner를 명시한다.
- 완료 결과: 방문/시설 feature 전체가 구현 또는 사용자 승인 제외 상태이고 소유 blocker 0개가 된다.
- 누락 차단: 장소 선택값과 시설 진행 상태가 섞이거나 행동 결과 owner가 불명확하면 완료하지 않는다.

- [ ] 방문 장소 전체를 장소 정의 또는 사용자 승인 제외로 분류하고, 미판정 blocker가 있으면 완료하지 않음
- [ ] 장소별 행동 전체를 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 장소 해금 조건과 현재 선택 session을 분리
- [ ] 비용 부족, 조건 미충족, 중복 실행, 취소를 검증
- [ ] 시설 해금과 세계 진행 상태를 `world` 또는 `featureState`에 연결
- [ ] 방문 행동 결과가 인물, 신체, 돈, 시간 진행에 반영되는 경우 owner를 명시
- [ ] 방문 후 저장 roundtrip을 검증
- [ ] M19/M21/M24/M25 coverage의 방문 관련 status 갱신
- [ ] `npm run build` 실행

## M37. 업무/창관/특수 업무 완성

책임 선언:
- 역할: 업무, 창관, 아르바이트, 특수 업무를 전수 구현한다.
- 범위: 업무 정의 전체, 참여 조건, 대상/시설/시간 조건, 결과 계산, 턴 종료다.
- 방식: 실행 중 선택값/계산값은 session/calculation에 두고 결과만 economy/people/body/work/run에 반영한다.
- 완료 결과: 업무 전체가 성공/실패/취소/저장 roundtrip과 coverage 갱신을 갖는다.
- 누락 차단: 계산값이 save에 남거나 업무 결과가 책임 owner 밖으로 흩어지면 완료하지 않는다.

- [ ] 업무 정의 전체를 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 창관, 아르바이트, 일반 업무, 특수 업무를 정의 데이터와 handler owner로 분리
- [ ] 업무 참여 조건, 대상 조건, 시설 조건, 시간 조건을 view 계산으로 구현
- [ ] 업무 결과가 돈, 인물, 신체, 경험, 업무 이력, 시간 진행에 반영되는지 검증
- [ ] 업무 실행 중 선택값과 계산값은 session/calculation에만 둠
- [ ] 성공, 조건 미충족, 대상 누락, 취소, 턴 종료를 검증
- [ ] 업무 후 저장 roundtrip을 검증
- [ ] M19/M20/M24/M25 coverage의 업무 관련 status 갱신
- [ ] `npm run build` 실행

## M38. 촬영 정의와 장면 조건 완성

책임 선언:
- 역할: 촬영 장면 정의와 촬영 가능 조건을 전수 구현한다.
- 범위: 촬영 장면 전체, 대상 후보 조건, 장면 후보 조건, 표시명/설명/요구 상태/예상 결과다.
- 방식: 장면 정의는 source evidence를 갖고 조건은 view 계산으로 구현한다.
- 완료 결과: 촬영 장면 전체가 선택 가능/불가 사유와 원본 근거를 갖는다.
- 누락 차단: 장면이 표시되지만 원본 근거나 조건 계산이 없으면 완료하지 않는다.

- [ ] 촬영 장면 전체를 장면 정의 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 촬영 대상 후보 조건과 장면 후보 조건을 view 계산으로 구현
- [ ] 장면별 표시 이름, 설명, 요구 상태, 예상 결과를 정의 데이터로 연결
- [ ] 장면 선택, 대상 선택, 조건 실패, 취소를 검증
- [ ] 촬영 중간 계산값은 session/calculation에만 둠
- [ ] 장면 정의가 CSV/ERB 근거를 갖는지 확인
- [ ] M20/M23/M25 coverage의 촬영 정의 관련 status 갱신
- [ ] `npm run build` 실행

## M39. 촬영 실행/결과/판매 완성

책임 선언:
- 역할: 촬영 실행, 결과 반영, 출시/판매 상태를 전수 구현한다.
- 범위: 촬영량, 수익, 팬, 점수, 경험, 피로, 이력, 출시/판매, 턴 종료다.
- 방식: 촬영 계산값은 session/calculation에 두고 결과만 economy/people/body/world/featureState에 반영한다.
- 완료 결과: 촬영 성공/실패/취소/저장 roundtrip이 전체 장면에 대해 검증된다.
- 누락 차단: 촬영 session 계산값이 save에 남거나 판매 상태 owner가 불명확하면 완료하지 않는다.

- [ ] 촬영량, 수익, 팬, 점수, 경험, 신체 피로 계산을 구현
- [ ] 촬영 결과가 `economy`, `people`, `body`, `world`, `featureState` 중 필요한 owner에만 반영되는지 검증
- [ ] 촬영 이력과 출시/판매 상태를 저장 상태에 연결
- [ ] 촬영 실패, 조건 미충족, 장면 누락, 대상 누락, 취소를 검증
- [ ] 촬영 완료 후 턴 종료와 session 폐기를 검증
- [ ] 촬영 후 저장 roundtrip을 검증
- [ ] M19/M20/M24/M25 coverage의 촬영 실행 관련 status 갱신
- [ ] `npm run build` 실행

## M40. 훈련 메뉴와 세션 완성

책임 선언:
- 역할: 훈련 화면과 선택 session lifecycle을 완성한다.
- 범위: 대상, 실행자, 조수, command 선택, command 후보 view, 누락/불가/취소, session 폐기다.
- 방식: 화면 선택값과 임시 모드는 session에 두고 저장 상태를 직접 바꾸지 않는다.
- 완료 결과: 훈련 진입, 선택, 취소, 완료, 턴 종료에서 session lifecycle이 검증된다.
- 누락 차단: 훈련 선택값이 save에 남거나 command 후보 계산이 상태를 바꾸면 완료하지 않는다.

- [ ] 훈련 대상, 실행자, 조수, command 선택 상태를 session owner에 연결
- [ ] 훈련 command 후보 view를 전체 command 기준으로 계산
- [ ] 대상/실행자/조수 누락, 불가 조건, 취소를 검증
- [ ] 훈련 장비/임시 모드/선택값은 session에만 둠
- [ ] 훈련 화면 진입과 복귀가 저장 상태를 직접 바꾸지 않도록 검증
- [ ] 훈련 session이 완료/취소/턴 종료 시 폐기되는지 검증
- [ ] M19/M20/M25 coverage의 훈련 메뉴 관련 status 갱신
- [ ] `npm run build` 실행

## M41. 훈련 가능 조건 전수 구현

책임 선언:
- 역할: 105개 훈련 command의 가능 조건과 불가 사유를 전수 구현한다.
- 범위: 대상/실행자/조수 역할 조건, 장비/상태/자원/장소/이벤트 조건이다.
- 방식: availability는 view 계산으로 만들고 저장 상태 변경 없이 불가 사유를 표시한다.
- 완료 결과: 각 command가 가능/불가 판정과 불가 사유 검증을 갖는다.
- 누락 차단: 실행 가능한 command에 조건 row나 불가 사유가 없으면 완료하지 않는다.

- [ ] `Train.csv` 105개 command별 가능 조건을 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] command별 대상, 실행자, 조수 역할 조건을 구현
- [ ] command별 장비, 상태, 자원, 장소, 이벤트 조건을 구현
- [ ] 불가 사유를 view 계산 결과로 표시
- [ ] availability 계산이 저장 상태를 바꾸지 않는지 검증
- [ ] command별 가능/불가 smoke 또는 table 검증을 추가
- [ ] M20/M25 coverage의 훈련 가능 조건 status 갱신
- [ ] `npm run build` 실행

## M42. 훈련 command 효과 0~34 완성

책임 선언:
- 역할: 훈련 command 0~34의 효과 계산과 결과 반영을 완성한다.
- 범위: source 계산, 파라미터 증감, 체력/기력 감소, 결과 owner, 성공/불가/취소/session 폐기다.
- 방식: 원본 계산 중간값은 calculation/session에서 처리하고 최종 결과만 save owner에 반영한다.
- 완료 결과: command 0~34가 source evidence와 consumer evidence를 갖고 검증된다.
- 누락 차단: source evidence 없거나 계산 중간값이 save에 들어가면 완료하지 않는다.

- [ ] command 0~34의 source 계산, 파라미터 증감, 체력/기력 감소를 구현
- [ ] command별 결과 owner를 `people`, `body`, `social`, `inventory`, `economy`, `run` 중 하나로 확정
- [ ] command별 성공, 불가, 취소, 결과 적용, session 폐기를 검증
- [ ] 원본 계산 중간값을 저장 payload에 넣지 않도록 검증
- [ ] command 0~34의 source evidence와 consumer evidence를 연결
- [ ] 관련 blocker 0개 확인. 해소 불가 항목은 사용자 승인 제외 근거가 있을 때만 완료 처리
- [ ] M20/M24/M25 coverage의 command 0~34 status 갱신
- [ ] `npm run build` 실행

## M43. 훈련 command 효과 35~69 완성

책임 선언:
- 역할: 훈련 command 35~69의 효과 계산과 결과 반영을 완성한다.
- 범위: source 계산, 파라미터 증감, 체력/기력 감소, 결과 owner, 성공/불가/취소/session 폐기다.
- 방식: 각 command를 독립 단위로 구현하고 coverage를 command별로 닫는다. blocker는 완료 차단 상태로 남긴다.
- 완료 결과: command 35~69가 구현 또는 사용자 승인 제외 상태이고 소유 blocker 0개가 된다.
- 누락 차단: 결과 owner가 불명확하거나 미구현 command가 blocker 없이 남으면 완료하지 않는다.

- [ ] command 35~69의 source 계산, 파라미터 증감, 체력/기력 감소를 구현
- [ ] command별 결과 owner를 `people`, `body`, `social`, `inventory`, `economy`, `run` 중 하나로 확정
- [ ] command별 성공, 불가, 취소, 결과 적용, session 폐기를 검증
- [ ] 원본 계산 중간값을 저장 payload에 넣지 않도록 검증
- [ ] command 35~69의 source evidence와 consumer evidence를 연결
- [ ] 관련 blocker 0개 확인. 해소 불가 항목은 사용자 승인 제외 근거가 있을 때만 완료 처리
- [ ] M20/M24/M25 coverage의 command 35~69 status 갱신
- [ ] `npm run build` 실행

## M44. 훈련 command 효과 70~104와 후처리 완성

책임 선언:
- 역할: 훈련 command 70~104와 훈련 후처리를 완성한다.
- 범위: command 효과, 후처리, 이벤트, 장비 변화, 자원 변화, raw-name gate다.
- 방식: 105개 command 전체 상태를 집계하고 남은 command를 구현 또는 사용자 승인 제외로 닫는다. blocker가 남으면 완료하지 않는다.
- 완료 결과: 전체 훈련 command coverage에 미구현 row가 남지 않는다.
- 누락 차단: `COMF`, `TFLAG`, `SOURCE`, `TEQUIP`, `LOSEBASE` raw name이 runtime에 남으면 완료하지 않는다.

- [ ] command 70~104의 source 계산, 파라미터 증감, 체력/기력 감소를 구현
- [ ] 훈련 후처리, 이벤트, 장비 변화, 자원 변화가 올바른 owner에 반영되는지 검증
- [ ] command별 성공, 불가, 취소, 결과 적용, session 폐기를 검증
- [ ] 원본 계산 중간값을 저장 payload에 넣지 않도록 검증
- [ ] 전체 105개 command coverage에 미구현 row가 남지 않는지 확인
- [ ] 원본명 `COMF`, `TFLAG`, `SOURCE`, `TEQUIP`, `LOSEBASE` 직접 사용 검색 통과
- [ ] M20/M24/M25 coverage의 command 70~104 및 후처리 status 갱신
- [ ] `npm run build` 실행

## M45. 능력 상승/휴식/공통 유지보수 완성

책임 선언:
- 역할: 능력 상승, 휴식, 회복, 자동 아이템 사용, 공통 유지보수 기능을 닫는다.
- 범위: common-system feature, 결과 owner, 성공/조건 미충족/취소/턴 종료 연결이다.
- 방식: 공통 기능을 특정 기능 내부 임시 로직이 아니라 별도 owner와 handler로 분리한다.
- 완료 결과: 공통 유지보수 흐름이 저장 roundtrip과 coverage 갱신을 갖는다.
- 누락 차단: common-system feature가 숨은 임시 코드로 남거나 owner가 불명확하면 완료하지 않는다.

- [ ] 능력 상승 메뉴와 조건을 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 휴식, 회복, 자동 아이템 사용, 공통 유지보수 흐름을 구현
- [ ] 공통 시스템 feature가 특정 기능 owner에 잘못 섞이지 않도록 분리
- [ ] 성공, 조건 미충족, 취소, 턴 종료 연결을 검증
- [ ] 결과가 `people`, `body`, `inventory`, `run`, `economy` owner에만 반영되는지 검증
- [ ] 저장 roundtrip을 검증
- [ ] M19/M20/M24/M25 coverage의 common-system 관련 status 갱신
- [ ] `npm run build` 실행

## M46. 미션 완성

책임 선언:
- 역할: 미션 전체 lifecycle을 완성한다.
- 범위: 미션 정의, 수락, 진행, 보고, 완료, 실패, 만료, 보상/패널티, 턴 종료 연동이다.
- 방식: 미션 진행 save와 목록/보고 선택 session을 분리한다.
- 완료 결과: 모든 미션이 조건/기한/보상/실패와 저장 roundtrip을 갖는다.
- 누락 차단: 미션 상태와 선택 session이 섞이거나 보상 owner가 불명확하면 완료하지 않는다.

- [ ] 미션 전체를 정의, 진행 상태, 보상, 실패 조건으로 분리
- [ ] 미션 수락, 진행, 보고, 완료, 실패, 만료를 구현
- [ ] 미션 기한과 턴 종료 처리를 연결
- [ ] 미션 보상과 패널티가 `economy`, `world`, `people`, `body`, `featureState`에 반영되는지 검증
- [ ] 미션 목록 선택 session이 저장 payload에 남지 않는지 검증
- [ ] 미션 후 저장 roundtrip을 검증
- [ ] M19/M20/M24/M25 coverage의 미션 관련 status 갱신
- [ ] `npm run build` 실행

## M47. 세계/이벤트/스토리 진행 완성

책임 선언:
- 역할: 세계 진행, 이벤트, 스토리 플래그와 이벤트 hook을 완성한다.
- 범위: 이벤트 발생 조건, 1회성/반복성, 결과 상태 변화, 표시 화면, hook 연결이다.
- 방식: 이벤트 표시와 상태 변경을 분리하고 결과는 world/meta/featureState 등 owner에 반영한다.
- 완료 결과: 이벤트가 발생 조건, 표시, 결과, 저장 roundtrip을 모두 갖는다.
- 누락 차단: 표시만 있고 상태 변화나 발생 조건 근거가 없는 이벤트가 남으면 완료하지 않는다.

- [ ] 이벤트 발생 조건, 1회성/반복성, 결과 상태 변화를 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 세계/장소/스토리 진행 플래그를 `world`에 연결
- [ ] 이벤트 표시 화면과 상태 변경을 분리
- [ ] 턴 종료, 방문, 미션, 훈련, 촬영에서 발생하는 이벤트 hook을 연결
- [ ] 이벤트 결과가 저장 상태와 session에 섞이지 않도록 검증
- [ ] 이벤트 후 저장 roundtrip을 검증
- [ ] M19/M23/M24/M25 coverage의 event-world 관련 status 갱신
- [ ] `npm run build` 실행

## M48. 엔딩/계승/전역 상태 완성

책임 선언:
- 역할: 엔딩, 계승, 전역 meta 상태를 완성한다.
- 범위: 엔딩 조건, 결과 화면, 계승 새 게임, 게임 종료, 업적/클리어 보너스/전역 해금이다.
- 방식: 회차 save와 global/meta save를 분리하고 엔딩 조건은 view/calculation으로 구현한다.
- 완료 결과: 엔딩과 계승 흐름이 실제 UI/action 경로와 저장/로드 검증을 갖는다.
- 누락 차단: 회차 save와 전역 save가 섞이거나 승인 없는 엔딩 제외가 있으면 완료하지 않는다.

- [ ] 엔딩 조건 전체를 조건 id와 결과 화면으로 분류
- [ ] 엔딩 조건 계산을 view/calculation으로 구현
- [ ] 엔딩 결과, 계승 새 게임, 게임 종료 흐름을 구현
- [ ] 회차 밖 업적, 클리어 보너스, 전역 해금을 `meta`에 연결
- [ ] LOADGLOBAL/SAVEGLOBAL 성격의 상태와 회차 save 상태를 분리 검증
- [ ] 엔딩 후 저장/로드 또는 새 게임 흐름을 검증
- [ ] M19/M24/M25 coverage의 ending-event-meta 관련 status 갱신
- [ ] `npm run build` 실행

## M49. 정보/도움말/설정/남은 기능 닫기

책임 선언:
- 역할: 정보/도움말/설정/디버그/남은 기능을 최종 정리한다.
- 범위: 정보, 도움말, 업적, 설정, 디버그 메뉴, PRINT/HTML/message/help/status text, M28~M49 기능군 gap audit이다.
- 방식: 구현하지 않는 기능은 숨기지 않고 사용자 승인 제외로 닫는다. blocker는 완료 차단 상태이며 M49 catch-all로 숨기지 않는다.
- 완료 결과: 기능군별 미구현 feature, 미소비 definition, 미정 mapping이 남지 않는다.
- 누락 차단: 남은 기능을 설명 없이 제외하거나 디버그 기능의 범위가 불명확하면 완료하지 않는다.

- [ ] 정보, 도움말, 업적, 설정, 디버그 메뉴를 구현 또는 사용자 승인 제외로 분류
- [ ] PRINT/HTML/message/help/status text를 view/text coverage로 분류하고 실제 소비 화면을 연결
- [ ] 설정 상태를 `settings`와 `meta` owner로 분리
- [ ] 정보 화면이 정의 데이터와 저장 상태를 읽기 전용으로 표시하는지 검증
- [ ] 디버그 기능은 개발 전용 또는 사용자 승인 제외로 분류하고, 미승인 blocker가 있으면 완료하지 않음
- [ ] M28~M49 전체 기능군의 gap audit을 취합
- [ ] 기능군별 미구현 feature, 미소비 definition, 미정 save/session row가 남지 않는지 확인
- [ ] `npm run build` 실행
- [ ] 테스트 도구가 있으면 `npm run test --if-present` 실행

## M50. 전체 저장/로드/마이그레이션 완성

책임 선언:
- 역할: 전체 기능군 후 저장/로드와 schema/migration 처리를 완성한다.
- 범위: 모든 주요 기능 후 roundtrip, 전역 meta save, corrupted/future/old schema, migration, 실패 effect다.
- 방식: save payload에 definitions/views/session/calculation buffer가 들어가지 않도록 검증한다.
- 완료 결과: M24/M25 mapping row 전체가 저장 payload 또는 비저장 판정과 일치한다.
- 누락 차단: session/definitions/views/calculation buffer가 save payload에 들어가면 완료하지 않는다.

- [ ] 저장 payload schema 확정
- [ ] 저장 파일에 정의 데이터, view 계산 객체, session 계산 버퍼가 들어가지 않도록 검증
- [ ] 새 게임, 상점, 영입, 방문, 업무, 촬영, 훈련, 미션, 이벤트, 엔딩 후 저장 roundtrip 검증
- [ ] 전역 meta save와 회차 save를 분리 검증
- [ ] corrupted save 처리 검증
- [ ] unknown future schema 처리 검증
- [ ] old schema migration 검증
- [ ] schema version 변경 시 마이그레이션 경로 구현
- [ ] 저장/로드 실패 effect와 UI route 처리 검증
- [ ] M24/M25 mapping row 전체가 저장 payload 또는 비저장 판정과 일치하는지 확인
- [ ] `npm run build` 실행

## M51. 최종 누락 감사

책임 선언:
- 역할: 최종 완전 이식 판정 전에 원본 누락과 장부 허위를 감사한다.
- 범위: final gap, orphan coverage, role-only 완료, approved-excluded 근거, blocker, evidence 충돌이다.
- 방식: `final-gap-audit.json`을 생성하고 source evidence와 runtime consumer evidence를 대조한다.
- 완료 결과: final audit에서 gap, orphan, role-only, unapproved exclusion, unresolved blocker가 0개다.
- 누락 차단: blocker가 남거나 source evidence와 consumer evidence가 충돌하면 M52로 넘어가지 않는다.

- [ ] `data/coverage/audits/final-gap-audit.json` 산출물 생성
- [ ] 원본 CSV/ERB에서 coverage로 들어오지 않은 feature, definition, save address, session/calculation address가 0개인지 확인
- [ ] coverage에는 있지만 실제 route/action/handler/view/calculation/save roundtrip에서 소비되지 않는 orphan row가 0개인지 확인
- [ ] 역할만 있는 상태로 완료 처리된 row가 0개인지 확인
- [ ] approved-excluded row가 사용자 승인 근거와 제외 범위를 갖는지 확인
- [ ] blocker row가 남아 있으면 M52로 넘어가지 않음
- [ ] source evidence와 runtime consumer evidence가 충돌하는 항목을 `needs-review`로 되돌림
- [ ] `npm run collect:catalog` 실행
- [ ] `npm run analyze:game-system` 실행
- [ ] `npm run inventory:legacy-mapping` 실행
- [ ] `npm run audit:erb-states` 실행
- [ ] `npm run build` 실행

## M52. 최종 완전 이식 판정

책임 선언:
- 역할: 게임이 원본 컨텐츠를 구현, 승인 제외, blocker 0 상태로 닫았는지 최종 판정한다.
- 범위: feature, definition, save mapping, session mapping, 전체 smoke flow, build/test, raw-name gate다.
- 방식: 모든 coverage 상태와 전체 UI/action 흐름, 저장/로드, 엔딩까지 최종 검증한다.
- 완료 결과: 미구현 기능 0, 미분류 정의 0, 미정 주소 0, 미해소 blocker 0, 미승인 제외 0 상태가 된다.
- 누락 차단: 어떤 row라도 미구현/미분류/미정/미승인/미해소 상태면 완전 이식 완료가 아니다.

- [ ] 기능 커버리지 전수표에서 미구현 기능 0개 확인
- [ ] 정의 데이터 전수표에서 미분류 정의 0개 확인
- [ ] 원본 주소 inventory에서 완료 기능 범위의 `needs-review`, `needsDecision`, `missingMapping` 0개 확인
- [ ] 미해소 blocker 0개 확인
- [ ] 사용자 승인 제외 항목은 승인 근거와 제외 범위를 확인
- [ ] feature coverage 상태값이 모두 implemented 또는 approved-excluded인지 확인
- [ ] definition coverage 상태값이 모두 used 또는 approved-excluded인지 확인
- [ ] save mapping coverage 상태값이 모두 mapped, non-save, script-scratch, approved-excluded 중 하나인지 확인
- [ ] session mapping coverage 상태값이 모두 mapped, calculation-only, script-scratch, approved-excluded 중 하나인지 확인
- [ ] 저장 상태와 세션 상태 경계 검사 통과
- [ ] 원본명 직접 사용 차단 검색 통과
- [ ] 전체 smoke flow 통과: 새 게임, 메인, 구매, 사용, 영입, 방문, 업무, 촬영, 훈련, 턴 종료, 미션, 이벤트, 엔딩, 저장, 로드
- [ ] long-play 검증 통과: 여러 턴, 월말/주말 hook, 자동 처리, 저장/로드 반복
- [ ] failure matrix 검증 통과: 돈 부족, 조건 미달, 빈 목록, 취소, 잘못된 선택, 손상 save, migration 실패
- [ ] `gate:source-evidence`, `gate:coverage-crosscheck`, `gate:state-family-index-coverage`, `gate:view-and-text-coverage`, `gate:final-content-zero-gap`가 모두 통과
- [ ] `verify:complete`가 전체 coverage 재생성, 모든 gate, full smoke, long-play, failure matrix, 저장/로드, build/test를 한 번에 실행
- [ ] `full-port-report.json`에 미구현/미분류/미정/미승인/미해소 항목 0개가 기록됨
- [ ] M52 완료 커밋에는 `verify:complete` 로그와 `full-port-report.json` 경로를 남김
- [ ] `npm run verify:complete` 실행
- [ ] `npm run verify:m16` 실행
- [ ] `npm run collect:catalog` 실행
- [ ] `npm run analyze:game-system` 실행
- [ ] `npm run inventory:legacy-mapping` 실행
- [ ] `npm run audit:erb-states` 실행
- [ ] `npm run build` 실행
- [ ] 테스트 도구가 있으면 `npm run test --if-present` 실행

검증:

```bash
npm run verify:complete
npm run verify:m16
npm run collect:catalog
npm run analyze:game-system
npm run inventory:legacy-mapping
npm run audit:erb-states
npm run build
npm run test --if-present
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_" src/game src/domains src/features src/ui
```


