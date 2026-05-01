# Current Status

기준 날짜: 2026-05-01

## 현재 위치

- 마지막 완료 마일스톤: M41. 훈련 가능 조건 전수 구현
- 다음 마일스톤: M42. 훈련 command 효과 0~34 완성
- 최종 완전 이식 판정: 아직 아님. M52에서만 판정한다.

## 최근 완료 요약

- M40은 훈련 메뉴와 interaction session lifecycle을 닫았다.
- M41은 105개 훈련 command availability와 불가 사유를 원본 `COMABLE.ERB`, `COMSEQ_REGISTER.ERB`, `COMORDER.ERB` 근거로 닫았다.
- M41 closure 기준: ownedTotal 1,625, implemented 1,371, mapped 254, blocking metrics 0.

## 현재 미완료 초점

- 훈련 command 효과는 아직 완료되지 않았다.
- command 0~34는 M42, 35~69는 M43, 70~104와 후처리는 M44가 소유한다.
- M42~M52 placeholder scripts는 각 마일스톤에서 실제 coverage/gate/smoke로 교체해야 한다.

## 권위 자료

- 상세 진행: `../PROGRESS_STATUS.ko.md`
- 세션 인수인계: `../SESSION_HANDOFF.ko.md`
- 실행 순서와 체크박스: `../NEW_PORT_MILESTONES.ko.md`
- M41 완료 판정: `../../data/coverage/milestones/M41-closure.json`
- M41 gap audit: `../../data/coverage/audits/M41-gap-audit.json`

이 파일은 dashboard다. 완료 판정 근거로 쓰지 않는다.
