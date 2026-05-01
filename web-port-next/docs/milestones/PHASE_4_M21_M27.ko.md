# Phase 4. M21~M27 상세 마일스톤

전수표 보강과 누락 감사: source evidence, 교차 대조, 저장/session mapping, 구현 큐.

완료 판정은 이 문서만으로 하지 않는다. 원본 파일, coverage/gap/closure JSON, 전용 gate/smoke/build가 최종 권위다.

## 상세 마일스톤

## M21. [조사/장부] 원본 근거 장부 확정

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

## M22. [검증] 전수표 교차 대조 gate

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

## M23. [조사/보강] ERB 기반 정의 데이터 보강

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

## M24. [조사/매핑] 저장 상태 원본 주소 전수 매핑

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

## M25. [조사/매핑] 세션/계산 원본 주소 전수 매핑

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

## M26. [감사] 구현 전 누락 감사

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
- [x] M28~M49 및 M50 owner 배정을 재확인. implementation review 14,546행 모두 owner와 verificationCommand 보유
- [x] `discovered-gap`, `orphan-coverage`, `role-only`, `unknownOwner` 미해소 항목 0개 확인
- [x] `npm run audit:pre-implementation` 실행
- [x] `npm run gate:pre-implementation-audit` 실행
- [x] `npm run build` 실행

## M27. [계획] 구현 단위 큐와 blocker 동결

책임 선언:
- 역할: M28~M49 구현 단위를 실제 작업 큐로 동결한다.
- 범위: feature/definition/save/session/view row 묶음, blocker 해소 마일스톤, 승인 제외 요청 목록이다.
- 방식: 각 단위가 원본 근거, owner, 성공/실패/취소/roundtrip 검증 요구를 갖도록 template화한다.
- 완료 결과: 이후 구현자가 어떤 row 묶음을 닫아야 하는지 단위별로 알 수 있다.
- 누락 차단: 구현 단위가 원본 row 없이 생기거나 blocker owner가 비어 있으면 완료하지 않는다.

- [x] M28~M49 및 M50~M51의 기능군별 구현 큐를 M26 review row 기준으로 생성. queue unit 36개, queued review row 14,546개
- [x] 각 구현 단위가 feature, definition, save, session, view evidence template을 함께 갖도록 `implementation-queue.json`에 보강
- [x] 각 단위가 성공, 실패, 취소, 저장 roundtrip, session cleanup 중 필요한 검증을 갖도록 verification template 보강
- [x] blocker row 59개의 해소 마일스톤을 M28~M52 중 하나로 동결
- [x] 사용자 승인 제외가 필요한 항목 59개를 `approved-exclusion-requests.json` 장부로 분리
- [x] 동일 원본 row를 여러 기능군이 소비할 때 주 owner와 참조 owner를 구분하는 `sharedSourceOwnership` 규칙 추가
- [x] M28 이후 새로 발견한 원본 항목을 즉시 coverage에 추가하는 gap intake 절차 작성
- [x] M27이 구현 owner로 남은 source-file-review 2개를 M51 최종 누락 감사 owner로 이관
- [x] `npm run coverage:implementation-queue` 실행
- [x] `npm run gate:implementation-queue` 실행
- [x] `npm run build` 실행
- [x] 테스트 도구가 있으면 `npm run test --if-present` 실행
