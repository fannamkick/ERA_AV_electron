# Next Milestone

## M28~M41 완료 선언 재정렬 후 M42. 훈련 command 효과 0~34 완성

현재 즉시 목표는 M28~M41 완료 선언이 전체 포팅 완성 불변식과 충돌하지 않게 정렬하는 것이다. 그 다음 M42 command 0~34의 원본 효과 계산과 결과 반영을 실제 runtime behavior, source evidence, consumer evidence, 검증으로 닫는다.

## 먼저 해야 하는 것

- `../milestones/PORT_COMPLETION_COVERAGE_REVIEW.ko.md`의 즉시 수정 대상 확인
- `../milestones/M28_M41_DONE_NOT_DONE_LEDGER.ko.md`의 재확인 필요 항목 정리
- M30은 blocked로 재판정 완료. 다음은 M35, M38, M39, M41을 completed/blocked 중 하나로 재판정
- `[구현]` 마일스톤의 `transferredOut`을 완료로 세지 않도록 문서와 closure 정리

## 완료해야 하는 것

- command 0~34의 원본 `COMF0.ERB`~`COMF34.ERB` 효과 계산을 구현
- `SOURCE`, `LOSEBASE`, `EXP`, `PALAM`, `ABL`, `TALENT`, `TEQUIP`, `TFLAG` 등 조건/배율/분기를 runtime 계산으로 반영
- command별 결과 owner 확정: `people`, `body`, `social`, `inventory`, `economy`, `run`
- 성공, 불가, 취소, 결과 적용, session 폐기 검증
- 계산 중간값이 save payload에 들어가지 않는지 검증
- source evidence와 consumer evidence 연결
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
