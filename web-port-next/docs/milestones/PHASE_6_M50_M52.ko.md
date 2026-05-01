# Phase 6. M50~M52 상세 마일스톤

최종 저장/검증: 전체 저장/로드, 최종 누락 감사, 완전 이식 판정.

완료 판정은 이 문서만으로 하지 않는다. 원본 파일, coverage/gap/closure JSON, 전용 gate/smoke/build가 최종 권위다.

## 상세 마일스톤

## M50. [구현/검증] 전체 저장/로드/마이그레이션 완성

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

## M51. [감사] 최종 누락 감사

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

## M52. [판정] 최종 완전 이식 판정

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
