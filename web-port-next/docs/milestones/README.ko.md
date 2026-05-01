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

## 공통 금지

- phase 문서는 scope 축소 근거가 아니다.
- `implemented`, `mapped`, `approved-excluded`는 원본 row와 full artifact 대조 없이 부여하지 않는다.
- blocker가 남은 마일스톤은 다음 phase로 넘어가지 않는다.
