# Next Milestone

## M42. 훈련 command 효과 0~34 완성

목표는 command 0~34의 효과 계산과 결과 반영을 원본 근거, runtime consumer, 검증과 함께 닫는 것이다.

## 완료해야 하는 것

- command 0~34의 source 계산, 파라미터 증감, 체력/기력 감소 구현
- command별 결과 owner 확정: `people`, `body`, `social`, `inventory`, `economy`, `run`
- 성공, 불가, 취소, 결과 적용, session 폐기 검증
- 계산 중간값이 save payload에 들어가지 않는지 검증
- source evidence와 consumer evidence 연결
- 관련 blocker 0개 확인
- M20/M24/M25 coverage의 command 0~34 status 갱신
- 전용 coverage/gate/smoke와 `npm run build` 통과

## 특히 위험한 지점

- `SOURCE`, `TFLAG`, `TEQUIP`, `COMF`, `LOSEBASE` 같은 원본명을 runtime 모델명으로 복사하면 안 된다.
- M41 availability 구현은 효과 계산 완료가 아니다.
- 기존 static delta가 있다고 해서 원본 효과 계산이 닫힌 것이 아니다.
- query 결과만으로 command 효과 의미를 판정하지 않는다. 원본 block과 호출 흐름을 직접 확인한다.
- 실패 출력 cap을 쓰더라도 full failure artifact를 남긴다.

## 반드시 직접 확인할 자료

- `../NEW_PORT_MILESTONES.ko.md`의 M42 section
- `../../data/coverage/coverage-gate-registry.json`의 M42 contract
- M42 소유 row를 산출하는 coverage/gate builder
- 원본 훈련 효과 관련 ERB block과 호출 흐름
- `src/features/training.ts` 및 관련 domain/session/save owner
- M40/M41 coverage에서 정한 session lifecycle과 availability 경계

이 파일은 시작점이다. M42 완료 판정은 coverage/gate/smoke/closure/gap audit으로만 한다.
