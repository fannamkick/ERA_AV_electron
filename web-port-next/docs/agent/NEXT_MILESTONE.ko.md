# Next Milestone

## 2026-05-02 criteria pass progress

Criteria call 1 is complete: M42-M44 now have strict source-unit manifests.

Next criteria work:
1. M45-M49 criteria manifests.
2. M50-M52 criteria manifests.
3. Full M28-M52 consistency pass.

Do not treat M42-M44 as implemented. Current counts are M42 0/35, M43 0/35, and M44 0/61 implemented-verified.

## 2026-05-02 next order reset

M35-M41 source-unit manifest pass 1 is complete. Since every M28-M41 manifest is currently `completedAllowedNow: false`, the next task is not M42 implementation. The next task is closing M28-M41 blocked/scope-redesign-required units.

Priority:
1. Rewrite M41 COM_ABLE availability into branch/AST/state-reference verifiable units.
2. Re-close mapped-only milestones such as M35 and M38 as real source-unit implementation/verification units.
3. Promote or block remaining mapped rows in M36/M37/M39/M40 with row-level runtime/save/session evidence.

Current implemented-verified counts: M35 0/8, M36 86/93, M37 294/461, M38 0/6, M39 135/174, M40 5/11, M41 4/1625.


## 2026-05-02 다음 처리 순서 보정

M31~M34.5의 source-unit manifest 1차 산출까지 완료했다. 따라서 다음 순서는 M42로 바로 넘어가는 것이 아니라 아래 순서다.

1. M31~M34.5의 blocked/scope-redesign-required unit을 실제 구현 검증 또는 명시적 scope 재설계로 닫는다.
2. M35~M41도 같은 방식으로 source-unit manifest를 만든다.
3. M28~M41 전체에서 `completedAllowedNow: true` 또는 정당한 blocked/scope-redesign-required closure가 확정된 뒤 M42 command effect 구현을 재개한다.

현재 M31~M34.5 판정: M31 52/237, M32 286/294, M33 4768/5300, M34 1998/2235, M34.5 188/189만 `implemented-verified`다. 나머지는 완료로 계산하지 않는다.

## M28~M41 완료 선언 재정렬 후 M42. 훈련 command 효과 0~34 완성

현재 즉시 목표는 M28~M41 완료 선언을 원본 단위 매니페스트 기준으로 보강하거나 blocked/scope-redesign-required로 정정하는 것이다. 2026-05-02 재판정 결과, M28~M41 중 새 기준으로 `completed`를 유지할 수 있는 마일스톤은 없다. 그 다음에야 M42 command 0~34의 원본 효과 계산과 결과 반영을 실제 runtime behavior, source evidence, consumer evidence, 검증으로 닫는다.

M28~M30의 1차 source-unit manifest는 작성됐다. 다음 작업은 M28~M30 closure를 이 manifest 기준으로 정정하거나, 같은 방식으로 M31~M34.5 manifest를 만드는 것이다.

## 먼저 해야 하는 것

- `../milestones/PORT_COMPLETION_COVERAGE_REVIEW.ko.md`의 즉시 수정 대상 확인
- `../milestones/PORT_RESPONSIBILITY_MAP.ko.md`와 phase 문서의 페이즈/마일스톤 책임 확인
- 시작 전에 원본 단위 매니페스트를 만들고 종료 전에 모든 단위를 `implemented-verified`, `approved-excluded`, `blocked`, `scope-redesign-required` 중 하나로 닫는다.
- `../milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`의 completed/blocked/scope-redesign-required 기준 확인
- `../milestones/M28_M41_DONE_NOT_DONE_LEDGER.ko.md`의 2026-05-02 재판정 표를 기준으로 M28~M41을 순서대로 보강한다.
- M28~M30은 `../../data/coverage/manifests/M28-source-units.json`, `M29-source-units.json`, `M30-source-units.json`을 기준으로 closure를 정정한다.
- M28~M41의 `원본 단위 매니페스트`와 `responsibilityIntegrity` 보강 또는 blocked/scope-redesign-required closure 정정이 끝나기 전에는 M42 구현을 시작하지 않는다.
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
