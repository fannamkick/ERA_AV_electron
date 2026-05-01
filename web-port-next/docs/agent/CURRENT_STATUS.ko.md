# Current Status

기준 날짜: 2026-05-02

## 현재 위치

- 마지막 완료 마일스톤: M41. 훈련 가능 조건 필수 구현
- 현재 마일스톤: M28~M41 완료 선언 재정렬 후 M42. 훈련 command 효과 0~34 완성
- M42 상태: blocked. 이전 M42 커밋은 원본 효과 계산을 구현한 완료 커밋으로 신뢰하지 않는다.
- 최종 완전 이식 판정: 아직 아님. M52에서만 판정한다.

## 최근 완료/차단 요약

- M40은 훈련 메뉴와 interaction session lifecycle을 닫았다.
- M41은 105개 훈련 command availability와 불가 사유를 원본 `COMABLE.ERB`, `COMSEQ_REGISTER.ERB`, `COMORDER.ERB` 근거로 닫았다.
- M42는 원본 `COMF0.ERB`~`COMF34.ERB`의 `SOURCE/LOSEBASE/EXP` 라인을 인덱싱하고 static profile을 만들었지만, 원본 branch/expression/effect behavior를 구현하지 않았으므로 완료가 아니다.
- M42 coverage 기준: ownedTotal 35, implemented 0, ownedBlocker 35, missingVerification 35.
- M30은 재판정 완료. 즉시 사용 아이템 9개는 구현됐지만 transfer 37개가 `ownedBlocker`로 남아 `status: blocked`다. `gate:item-use-coverage`와 `gate:milestone-scope-closure -- M30`은 현재 실패해야 정상이다.
- completed/blocked/scope-redesign-required 판정 기준은 `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`에 고정했다.
- M28~M41은 2026-05-02 원본 단위 매니페스트 기준 재판정에서 `completed 유지 가능`이 0개로 판정됐다. 기존 coverage/gate/smoke 통과 기록은 남아 있지만, 모든 M28~M41 closure는 매니페스트 보강 또는 blocked/scope-redesign-required 정정이 필요하다.

## 현재 미완료 초점

- M28~M41의 원본 단위 매니페스트 보강/closure 정정을 먼저 해야 한다.
- 그 다음 command 0~34의 원본 효과 계산을 실제 runtime behavior로 구현해야 한다.
- 원본 효과/조건/후처리 책임은 라인 존재 확인이나 profile 생성으로 대체할 수 없다.
- `npm run gate:training-effect -- 0-34`는 M42가 실제 구현되기 전까지 실패해야 한다.
- command 35~69는 M43, command 70 이상 전체와 후처리는 M44가 소유한다. M30 재판정 중 `COMF137.ERB` 소비가 확인되어 M44의 기존 70~104 범위 표현은 보강 대상이다. M28~M41 정정과 M42가 닫히기 전에는 M43로 넘어가지 않는다.

## 권위 자료

- 상세 진행: `../PROGRESS_STATUS.ko.md`
- 세션 인수인계: `../SESSION_HANDOFF.ko.md`
- 실행 순서와 체크박스: `../NEW_PORT_MILESTONES.ko.md`
- M30 blocked 판정: `../../data/coverage/milestones/M30-closure.json`
- 책임 분리 판정 기준: `../milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`
- M42 blocked 판정: `../../data/coverage/milestones/M42-closure.json`
- M42 gap audit: `../../data/coverage/audits/M42-gap-audit.json`

이 파일은 dashboard다. 완료 판정 근거로 쓰지 않는다.
