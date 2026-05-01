# Next Milestone

## M43. 훈련 command 효과 35~69 완성

목표는 command 35~69의 효과 계산과 결과 반영을 원본 근거, runtime consumer, 검증과 함께 닫는 것이다.

## 완료해야 하는 것

- command 35~69의 source 계산, 파라미터 증감, 체력/기력 감소 구현
- command별 결과 owner 확정: `people`, `body`, `social`, `inventory`, `economy`, `run`
- 성공, 불가, 취소, 결과 적용, session 폐기 검증
- 계산 중간값이 save payload에 들어가지 않는지 검증
- source evidence와 consumer evidence 연결
- 관련 blocker 0개 확인
- M20/M24/M25 coverage의 command 35~69 status 갱신
- 전용 coverage/gate/smoke와 `npm run build` 통과

## 특히 위험한 지점

- M42의 profile/gate 구조를 복사하더라도 command 35~69의 원본 `COMF35.ERB`~`COMF69.ERB` 증거를 새로 확인해야 한다.
- query 결과만으로 효과 구현을 완료 처리하지 않는다.
- `SOURCE`, `TFLAG`, `TEQUIP`, `COMF`, `LOSEBASE` 같은 원본명을 runtime 모델명으로 복사하지 않는다.
- source 계산 buffer는 session/calculation에만 남고 save payload에는 들어가면 안 된다.

## 반드시 직접 확인할 자료

- `../NEW_PORT_MILESTONES.ko.md`의 M43 section
- `../../data/coverage/coverage-gate-registry.json`의 M43 contract
- `original-game/ERB/*/COMF35.ERB` through `COMF69.ERB`
- M43 전용 coverage/gate builder
- `src/features/training.ts`와 `src/catalog/legacyCatalog.ts`
- M42 coverage/gate/smoke 구조: 참고용이며 완료 근거는 아니다.

이 파일은 시작점이다. M43 완료 판정은 coverage/gate/smoke/closure/gap audit로만 한다.
