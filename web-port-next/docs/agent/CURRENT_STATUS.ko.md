# Current Status

## 2026-05-06 M34 strict closure complete

M34 is now closed under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M34-source-units.json`
- Closure: `data/coverage/milestones/M34-closure.json`
- Coverage: `data/coverage/social-equipment-cflag-coverage.json`
- Summary: total 2,247, implemented-verified 2,247, approved-excluded 0, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- M34 ownedTotal is 2,247 social/equipment/CFLAG source units: CFLAG definitions, CFLAG/RELATION seeds, equipment/clothing save rows, clothing session view rows, wardrobe route behavior, and item 211 apron costume behavior.
- M33 CFLAG/FLAG/PBAND 79 rows and M30/M29/M31 inbound clothing/equipment rows are no longer blocked inbound; they are accepted and closed by M34 implementation evidence.
- M34 gate forbids `mapped`, `transferred`, and `source-file-review` statuses as completion evidence.
- Next strict target: M34.5, then M35~M41 before M42 resumes.

## 2026-05-02 M30 strict closure complete

- M30 is now closed under the source-unit manifest rule.
- `data/coverage/manifests/M30-source-units.json`: total 74, implemented-verified 37, approved-excluded 37, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- `data/coverage/milestones/M30-closure.json` now includes `responsibilityIntegrity`.
- `npm run gate:item-use-coverage` passes with source 74, M30-owned 37, implemented-verified 37, approved-excluded 37.
- `npm run gate:milestone-scope-closure -- M30` passes with M30 ownedTotal 37.
- The old mixed 74-row blocked closure is corrected: special training, clothing/cosplay, and training availability rows are not counted as M30 implementation.
- All 37 M30 approved exclusions have explicit blocked inbound responsibility in receiving manifests: M34 3, M41 6, M42 18, M43 8, M44 2.
- Next closure target: M34.5.

## 2026-05-02 M29 strict closure complete

- M29 is now closed under the source-unit manifest rule.
- `data/coverage/manifests/M29-source-units.json`: total 206, implemented-verified 83, approved-excluded 123, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- `data/coverage/milestones/M29-closure.json` now includes `responsibilityIntegrity`.
- `npm run gate:shop-purchase-coverage` passes with source 206, M29-owned 83, implemented-verified 83, approved-excluded 123.
- `npm run gate:milestone-scope-closure -- M29` passes with M29 ownedTotal 83.
- The old mixed 206-row closure is corrected: non-purchase item use, equipment/clothing, recruit, event/world, and downstream owner rows are not counted as M29 implementation.
- Next closure target: M34.5.

## 2026-05-02 M28 strict closure complete

- M28 is now closed under the source-unit manifest rule.
- `data/coverage/manifests/M28-source-units.json`: total 27, implemented-verified 24, approved-excluded 3, blocked 0, scope-redesign-required 0, `completedAllowedNow: true`.
- `data/coverage/milestones/M28-closure.json` now includes `responsibilityIntegrity`.
- `npm run gate:milestone-scope-closure -- M28` passes with M28 ownedTotal 24.
- The old mixed 27-row closure is corrected: BOYFRIEND event-local session rows are not counted as M28 implementation and remain M47 responsibility.
- Next closure target: M29.

## 2026-05-02 criteria registry gap closed

- M28~M34 registry contracts were added to `tools/build_coverage_gate_registry.mjs`.
- `npm run coverage:gate-registry` regenerated `data/coverage/coverage-gate-registry.json` with 26 milestone contracts.
- `npm run gate:coverage-hardening` passed with 26 contract(s), 20 coverage file(s), and 9 final script(s).
- `data/coverage/manifests/M28-M52-criteria-consistency.json` now reports `criteriaBaselineComplete: true` and no missing registry contracts.
- Criteria discovery is done for M28~M52. Next work is closing `blocked` and `scope-redesign-required` manifest units through real evidence or explicit redesign.

## 2026-05-02 criteria baseline complete

- M28~M52 criteria consistency pass is complete.
- Report: `data/coverage/manifests/M28-M52-criteria-consistency.json`.
- Summary doc: `docs/milestones/M28_M52_CRITERIA_CONSISTENCY.ko.md`.
- All M28~M52 source-unit manifests exist.
- M28 is closed; 1 manifest has `completedAllowedNow: true` and 25 remain false.
- Aggregate totals: total units 11,226; implemented-verified 8,035; blocked 2,819; scope-redesign-required 99; approved-excluded 273.
- Registry enforcement gap is closed: `coverage-gate-registry.json` has contracts for M28~M52.
- Criteria discovery is done. Next work is closing blocked/scope-redesign-required units through implementation evidence or explicit ownership redesign.

## 2026-05-02 M50-M52 criteria manifest pass 1

- M50-M52 criteria manifests were added.
- New artifacts: `data/coverage/manifests/M50-source-units.json`, `M51-source-units.json`, `M52-source-units.json`.
- Current strict counts:
  - M50: criteria units 9, queue rows 193, blocked 9.
  - M51: criteria units 8, queue rows 1, blocked 7, scope-redesign-required 1.
  - M52: criteria units 10, queue rows 0, blocked 10.
- These are verification/verdict manifests only. M52 has explicit blocked verdict criteria so a missing queue row cannot be misread as completion.

## 2026-05-02 M45-M49 criteria skeleton pass 1

- M45-M49 criteria skeleton manifests were added from `implementation-queue` and `coverage-gate-registry`.
- New artifacts: `data/coverage/manifests/M45-source-units.json` through `M49-source-units.json`.
- Current strict counts:
  - M45: criteria units 2, queue rows 1122, blocked 1, scope-redesign-required 1.
  - M46: criteria units 1, queue rows 432, blocked 1.
  - M47: total 8, queue rows 358, blocked 8.
  - M48: criteria units 2, queue rows 325, blocked 1, scope-redesign-required 1.
  - M49: criteria units 2, queue rows 150, blocked 1, scope-redesign-required 1.
- These are criteria manifests only. No M45-M49 implementation coverage exists yet, so none can be marked complete.

## 2026-05-02 M42-M44 criteria manifest pass 1

- M42-M44 criteria manifests were added.
- New artifacts: `data/coverage/manifests/M42-source-units.json`, `M43-source-units.json`, `M44-source-units.json`.
- Current strict counts:
  - M42: total 35, implemented-verified 0, blocked 35.
  - M43: total 35, implemented-verified 0, blocked 32, scope-redesign-required 3.
  - M44: total 61, implemented-verified 0, blocked 38, scope-redesign-required 23.
- These are criteria manifests only. They do not implement training effects. They prevent M42-M44 from being marked complete through static profiles, line indexes, or unassigned COMF files.

## 2026-05-02 M35-M41 source-unit manifest pass 1

- M35-M41 were all reassessed as `completedAllowedNow: false`.
- New artifacts: `data/coverage/manifests/M35-source-units.json` through `M41-source-units.json`.
- Current strict counts:
  - M35: total 8, implemented-verified 0, blocked 7, scope-redesign-required 1.
  - M36: total 93, implemented-verified 86, blocked 7.
  - M37: total 461, implemented-verified 294, blocked 167.
  - M38: total 6, implemented-verified 0, blocked 6.
  - M39: total 174, implemented-verified 135, blocked 39.
  - M40: total 11, implemented-verified 5, blocked 6.
  - M41: total 1625, implemented-verified 4, blocked 1620, scope-redesign-required 1.
- The old M35-M41 `completed` closures are not completion evidence under the strict rules. Do not resume M42 until M34.5-M41 blocked/scope-redesign-required units are closed or explicitly redesigned.


## 2026-05-02 M31~M34.5 source-unit manifest 1차

- M31~M34.5도 새 기준으로는 `completed` 유지 불가로 재판정했다. 기존 coverage/gate/smoke 통과 기록은 남기되, `mapped`, `transferredOut`, file-level review, 책임 무결성 누락을 완료 근거로 보지 않는다.
- 생성 산출물: `data/coverage/manifests/M31-source-units.json`, `M32-source-units.json`, `M33-source-units.json`, `M34-source-units.json`, `M34.5-source-units.json`.
- 현재 판정:
  - M31: total 237, implemented-verified 127, approved-excluded 110, blocked 0, scope-redesign-required 0, completedAllowedNow true.
  - M32: total 298, implemented-verified 286, blocked 12, completedAllowedNow false.
  - M33: total 5300, implemented-verified 4768, blocked 465, scope-redesign-required 67, completedAllowedNow false.
  - M34: total 2247, implemented-verified 2247, blocked 0, completedAllowedNow true.
  - M34.5: total 189, implemented-verified 188, blocked 1, completedAllowedNow false. `responsibilityIntegrity` 누락을 blocker로 추가했다.
- 다음 즉시 작업은 M34.5의 blocked/scope-redesign-required를 실제 구현 검증 또는 명시적 재설계 범위로 닫는 것이다.

기준 날짜: 2026-05-02

## 현재 위치

- 마지막 완료 마일스톤: M41. 훈련 가능 조건 필수 구현
- 현재 마일스톤: M34.5 closure 정정
- M42 상태: blocked. 이전 M42 커밋은 원본 효과 계산을 구현한 완료 커밋으로 신뢰하지 않는다.
- 최종 완전 이식 판정: 아직 아님. M52에서만 판정한다.

## 최근 완료/차단 요약

- M40은 훈련 메뉴와 interaction session lifecycle을 닫았다.
- M41은 105개 훈련 command availability와 불가 사유를 원본 `COMABLE.ERB`, `COMSEQ_REGISTER.ERB`, `COMORDER.ERB` 근거로 닫았다.
- M42는 원본 `COMF0.ERB`~`COMF34.ERB`의 `SOURCE/LOSEBASE/EXP` 라인을 인덱싱하고 static profile을 만들었지만, 원본 branch/expression/effect behavior를 구현하지 않았으므로 완료가 아니다.
- M42 coverage 기준: ownedTotal 35, implemented 0, ownedBlocker 35, missingVerification 35.
- M30은 strict closure 완료. 즉시 사용 아이템 9개 flow/effect 37개는 implemented-verified이고, M30 approved-excluded 37개는 수신 manifest에 blocked inbound로 명시했다.
- completed/blocked/scope-redesign-required 판정 기준은 `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`에 고정했다.
- M34.5~M41은 여전히 매니페스트 보강 또는 blocked/scope-redesign-required 정정이 필요하다. M28~M34은 2026-05-02 strict closure로 완료됐다.
- M28~M34 source-unit manifest status: M28, M29, M30, M31, M32, M33, and M34 all have completedAllowedNow true.

## 현재 미완료 초점

- 다음은 M34.5 closure를 manifest 기준으로 정정한다.
- 그 다음 command 0~34의 원본 효과 계산을 실제 runtime behavior로 구현해야 한다.
- 원본 효과/조건/후처리 책임은 라인 존재 확인이나 profile 생성으로 대체할 수 없다.
- `npm run gate:training-effect -- 0-34`는 M42가 실제 구현되기 전까지 실패해야 한다.
- command 35~69는 M43, command 70 이상 전체와 후처리는 M44가 소유한다. M30 재판정 중 `COMF137.ERB` 소비가 확인되어 M44의 기존 70~104 범위 표현은 보강 대상이다. M34.5~M41 정정과 M42가 닫히기 전에는 M43로 넘어가지 않는다.

## 권위 자료

- 상세 진행: `../PROGRESS_STATUS.ko.md`
- 세션 인수인계: `../SESSION_HANDOFF.ko.md`
- 실행 순서와 체크박스: `../NEW_PORT_MILESTONES.ko.md`
- M30 strict closure: `../../data/coverage/milestones/M30-closure.json`
- 책임 분리 판정 기준: `../milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`
- M42 blocked 판정: `../../data/coverage/milestones/M42-closure.json`
- M42 gap audit: `../../data/coverage/audits/M42-gap-audit.json`

이 파일은 dashboard다. 완료 판정 근거로 쓰지 않는다.
