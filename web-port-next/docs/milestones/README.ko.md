# Phase Milestone Index

이 디렉터리는 마일스톤 목록을 phase별로 나눈 탐색용 문서다.

완료 판정 권위는 여전히 다음 산출물에 있다.

- 원본 파일과 source evidence
- coverage/gap/closure JSON
- 전용 gate/smoke/build
- 해당 `docs/milestones/PHASE_*.ko.md`의 마일스톤 상세 체크리스트
- `docs/NEW_PORT_MILESTONES.ko.md`의 공통 완료 기준과 책임 축소 금지 규칙

## Phase 문서

- `PHASE_1_M0_M6.ko.md`: 최소 세로 루프
- `PHASE_2_M7_M16.ko.md`: 핵심 골격 확장
- `PHASE_3_M17_M20.ko.md`: 원본 대조 체계
- `PHASE_4_M21_M27.ko.md`: 전수표 보강과 누락 감사
- `PHASE_5_M28_M49.ko.md`: 기능군별 전수 구현
- `PHASE_6_M50_M52.ko.md`: 최종 저장/검증
- `M28_M41_DONE_NOT_DONE_LEDGER.ko.md`: M28~M41에서 완료로 처리한 것과 하지 않았거나 넘긴 것의 사실 장부
- `PORT_COMPLETION_COVERAGE_REVIEW.ko.md`: 마일스톤 유형 구분이 전체 게임 포팅 완성으로 이어지는지 검토한 문서

## 공통 금지

- phase 문서는 scope 축소 근거가 아니다.
- `implemented`, `mapped`, `approved-excluded`는 원본 row와 full artifact 대조 없이 부여하지 않는다.
- blocker가 남은 마일스톤은 다음 phase로 넘어가지 않는다.
- 완료 선언은 반드시 완료/미완료/이관 사실 장부를 동반한다.
- `[조사]`, `[정책]`, `[계획]`, `[검증]`, `[감사]`, `[판정]` 마일스톤을 `[구현]` 완료로 읽지 않는다.
