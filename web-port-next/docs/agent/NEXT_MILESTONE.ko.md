# Next Milestone

## 2026-05-02 next after M28 closure

M28 is complete under the strict source-unit manifest rule. Continue with M29.

M29 must close only its purchase/listing responsibility. Non-purchase item use, equipment, recruit, event, and downstream owner rows must not be counted as M29 completion unless the manifest records an approved exclusion or the receiving owner owns a matching unit.

Required M29 flow:
1. Re-read `data/coverage/manifests/M29-source-units.json`, `data/coverage/shop-purchase-coverage.json`, and `data/coverage/audits/M29-gap-audit.json`.
2. Convert each remaining `blocked` / `scope-redesign-required` unit only through real evidence, approved exclusion, or explicit owner redesign.
3. Regenerate coverage/closure artifacts.
4. Run `npm run coverage:shop-purchase`, `npm run gate:shop-purchase-coverage`, `npm run gate:milestone-scope-closure -- M29`, `npm run smoke:item-shop`, and `npm run build`.

## 2026-05-02 next work after registry gap closure

Criteria-side baseline and registry enforcement are now complete for M28~M52.

Next work is closure, not criteria invention:
1. Pick an owning milestone or phase slice.
2. For every owned manifest unit, change only through evidence-backed status: `implemented-verified`, `approved-excluded`, `blocked`, or `scope-redesign-required`.
3. Run that milestone's registry contract, closure gate, smoke, and any required build/test checks.
4. Do not move responsibility to another milestone unless the manifest records the transfer reason and the receiving milestone owns a matching unit.

## 2026-05-02 next work after criteria baseline

Criteria-side baseline is complete and registry contracts now cover M28~M52.

Next work is not more criteria discovery. Choose one of these tracks:

1. Start closing manifest `blocked` / `scope-redesign-required` units, beginning with the highest-risk owners such as M41 and M42.
2. Keep `tools/build_coverage_gate_registry.mjs` and `coverage-gate-registry.json` synchronized whenever a contract changes.

Do not mark any milestone complete until its manifest reaches `completedAllowedNow: true` or all remaining non-implemented units are explicitly approved-excluded.

## 2026-05-02 criteria pass progress 3

Criteria call 3 is complete: M50-M52 now have strict verification/verdict manifests.

Next criteria work:
1. Full M28-M52 consistency pass.

Do not treat Phase 6 as implementation. M50-M52 can only verify and route gaps back to owners.

## 2026-05-02 criteria pass progress 2

Criteria call 2 is complete: M45-M49 now have strict skeleton manifests tied to implementation-queue responsibility rows.

Next criteria work:
1. M50-M52 criteria manifests.
2. Full M28-M52 consistency pass.

Do not treat M45-M49 as implemented. The manifests only freeze responsibility and completion requirements before future implementation.

## 2026-05-02 criteria pass progress

Criteria call 1 is complete: M42-M44 now have strict source-unit manifests.

Next criteria work:
1. M45-M49 criteria manifests.
2. M50-M52 criteria manifests.
3. Full M28-M52 consistency pass.

Do not treat M42-M44 as implemented. Current counts are M42 0/35, M43 0/35, and M44 0/61 implemented-verified.

## 2026-05-02 next order reset

M35-M41 source-unit manifest pass 1 is complete. M28 has since been closed under the strict source-unit rule; M29-M41 still need blocked/scope-redesign-required closure before M42 implementation resumes.

Priority:
1. Rewrite M41 COM_ABLE availability into branch/AST/state-reference verifiable units.
2. Re-close mapped-only milestones such as M35 and M38 as real source-unit implementation/verification units.
3. Promote or block remaining mapped rows in M36/M37/M39/M40 with row-level runtime/save/session evidence.

Current implemented-verified counts: M35 0/8, M36 86/93, M37 294/461, M38 0/6, M39 135/174, M40 5/11, M41 4/1625.


## 2026-05-02 다음 처리 순서 보정

M31~M34.5의 source-unit manifest 1차 산출까지 완료했다. 따라서 다음 순서는 M42로 바로 넘어가는 것이 아니라 아래 순서다.

1. M31~M34.5의 blocked/scope-redesign-required unit을 실제 구현 검증 또는 명시적 scope 재설계로 닫는다.
2. M35~M41도 같은 방식으로 source-unit manifest를 만든다.
3. M29~M41 전체에서 `completedAllowedNow: true` 또는 정당한 blocked/scope-redesign-required closure가 확정된 뒤 M42 command effect 구현을 재개한다.

현재 M31~M34.5 판정: M31 52/237, M32 286/294, M33 4768/5300, M34 1998/2235, M34.5 188/189만 `implemented-verified`다. 나머지는 완료로 계산하지 않는다.

## M29~M41 완료 선언 재정렬 후 M42. 훈련 command 효과 0~34 완성

현재 즉시 목표는 M29~M41 완료 선언을 원본 단위 매니페스트 기준으로 보강하거나 blocked/scope-redesign-required로 정정하는 것이다. M28은 strict closure로 완료됐다. 그 다음에야 M42 command 0~34의 원본 효과 계산과 결과 반영을 실제 runtime behavior, source evidence, consumer evidence, 검증으로 닫는다.

M28~M30의 source-unit manifest는 작성됐다. M28은 완료됐고, 다음 작업은 M29 closure를 이 manifest 기준으로 정정하는 것이다.

## 먼저 해야 하는 것

- `../milestones/PORT_COMPLETION_COVERAGE_REVIEW.ko.md`의 즉시 수정 대상 확인
- `../milestones/PORT_RESPONSIBILITY_MAP.ko.md`와 phase 문서의 페이즈/마일스톤 책임 확인
- 시작 전에 원본 단위 매니페스트를 만들고 종료 전에 모든 단위를 `implemented-verified`, `approved-excluded`, `blocked`, `scope-redesign-required` 중 하나로 닫는다.
- `../milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`의 completed/blocked/scope-redesign-required 기준 확인
- `../milestones/M28_M41_DONE_NOT_DONE_LEDGER.ko.md`의 2026-05-02 재판정 표를 기준으로 M29~M41을 순서대로 보강한다. M28은 완료 상태다.
- M29~M30은 `../../data/coverage/manifests/M29-source-units.json`, `M30-source-units.json`을 기준으로 closure를 정정한다.
- M29~M41의 `원본 단위 매니페스트`와 `responsibilityIntegrity` 보강 또는 blocked/scope-redesign-required closure 정정이 끝나기 전에는 M42 구현을 시작하지 않는다.
- `[구현]` 마일스톤의 `mapped`, `source-file-review`, `transferredOut`, 예정 consumer/verification을 완료로 세지 않도록 coverage와 closure를 정리한다.

## 완료해야 하는 것

- command 0~34의 원본 단위 매니페스트 작성: `Train.csv` command row, 연결 `COMF*.ERB` source, 특수 item 소비, read/write 상태 주소
- command 0~34의 원본 `COMF0.ERB`~`COMF34.ERB` 효과 계산을 구현
- `SOURCE`, `LOSEBASE`, `EXP`, `PALAM`, `ABL`, `TALENT`, `TEQUIP`, `TFLAG` 등 조건/배율/분기를 runtime 계산으로 반영
- command별 결과 owner 확정: `people`, `body`, `social`, `inventory`, `economy`, `run`
- 성공, 불가, 취소, 결과 적용, session 폐기 검증
- 계산 중간값이 save payload에 들어가지 않는지 검증
- source evidence와 consumer evidence 연결
- blocked row의 `runtimeConsumerId`/`verificationId` 예정값은 완료 증거로 보지 않는다.
- 관련 blocker 0개 확인
- M20/M24/M25 coverage의 command 0~34 status 갱신
- 전용 coverage/gate/smoke와 `npm run build` 통과

## 절대 금지

- 원본 라인 존재 확인만으로 구현 완료 처리하지 않는다.
- static profile 생성만으로 source 계산 구현을 대체하지 않는다.
- 자체 gate가 scaffold 존재만 검사하게 만들지 않는다.
- 책임 범위 안의 알려진 한계를 closure에서 숨기지 않는다.
- 체크박스는 runtime 구현과 검증이 끝난 뒤에만 체크한다.

## 반드시 직접 확인할 자료

- `../milestones/PHASE_5_M28_M49.ko.md`의 M42 section
- `../NEW_PORT_MILESTONES.ko.md`의 책임 축소 절대 금지 절과 공통 완료 기준
- `../../data/coverage/coverage-gate-registry.json`의 M42 contract
- `original-game/ERB/*/COMF0.ERB` through `COMF34.ERB`
- `../../data/coverage/training-effect-0-34.json`
- `../../data/coverage/audits/M42-gap-audit.json`
- `src/features/training.ts`와 `src/catalog/legacyCatalog.ts`

이 파일은 시작점이다. M42 완료 판정은 coverage/gate/smoke/closure/gap audit로만 한다.
