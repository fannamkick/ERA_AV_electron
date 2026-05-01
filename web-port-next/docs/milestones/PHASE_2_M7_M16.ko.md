# Phase 2. M7~M16 상세 마일스톤

핵심 골격 확장: 주요 기능 1차 루프, 저장/로드, 화면 정리, 검증 체계.

완료 판정은 이 문서만으로 하지 않는다. 원본 파일, coverage/gap/closure JSON, 전용 gate/smoke/build가 최종 권위다.

## 상세 마일스톤

## M7. [구현] 고용/영입 1차

책임 선언:
- 역할: 영입 1차 루프를 돈, listing, 인물 생성 경계까지 닫는다.
- 범위: 영입 후보 view, 가격/조건, 성공, 돈 부족 실패, 중복 실패, 취소, 인물 기본 상태 생성이다.
- 방식: 영입 listing은 정의 데이터로 읽고 성공 결과만 `people/body/social/equipment` save owner에 반영한다.
- 완료 결과: 최소 영입 흐름이 실제 캐릭터 추가와 저장 roundtrip 검증을 갖는다.
- 누락 차단: listing과 캐릭터 원형 연결, 실패/취소, 생성 owner 중 하나라도 빠지면 완료하지 않는다.

- [x] 모집 listing view 계산
- [x] 영입 후보 정의와 캐릭터 원형 연결
- [x] 영입 가격 계산
- [x] 영입 가능 조건 계산
- [x] 영입 action 구현
- [x] 영입 성공 시 자금 감소 처리
- [x] 영입 성공 시 `people`, `body`, `social`, `equipment` 기본 상태 생성
- [x] `people/body/social/equipment` 생성 경계 확인
- [x] 중복 영입 또는 인원 제한 실패 처리
- [x] 실패/취소 처리
- [x] 영입 성공/실패/취소 effect 메시지 분리
- [x] `npm run build` 실행

## M8. [구현] 턴 종료/시간 진행 1차

책임 선언:
- 역할: 턴 종료와 시간 진행의 실행 계약을 만든다.
- 범위: `turn/end`, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 임시 상태 폐기를 포함한다.
- 방식: 턴 종료 전후 hook 위치를 만들고 아직 전수 구현하지 않은 월말/미션 처리는 명시 stub/blocker로 남긴다.
- 완료 결과: 한 턴이 끝나면 시간과 phase가 일관되게 바뀌고 임시 session이 비워진다.
- 누락 차단: 턴 종료 후 session 선택값이 남거나 hook 미구현이 문서화되지 않으면 완료하지 않는다.

- [x] `turn/end` action 구현
- [x] 일/주차/기간 진행 규칙 구현
- [x] 전반/후반 또는 phase 전환 규칙 구현
- [x] 턴 종료 전 실행할 hooks 배열 정의
- [x] 턴 종료 후 실행할 hooks 배열 정의
- [x] session 임시 상태 정리
- [x] 예약 이벤트 최소 처리
- [x] 미션 기한 감소는 stub 또는 명시 blocker로 분리
- [x] 월말/주말 처리는 stub 또는 명시 blocker로 분리
- [x] 턴 종료 후 메인 화면 route 복귀 확인
- [x] `npm run build` 실행

## M9. [구현] 저장/로드 1차

책임 선언:
- 역할: 최소 저장/로드 roundtrip과 오염 payload 차단을 만든다.
- 범위: schema v1, 직렬화/역직렬화, 손상 JSON, future schema, runtime 오염, session 폐기를 포함한다.
- 방식: save payload는 `GameState`와 metadata만 포함하고 definitions/session/views를 거부한다.
- 완료 결과: 저장한 상태를 다시 로드하면 동일 save state가 복원된다.
- 누락 차단: session/views/definitions가 payload에 들어가거나 손상 payload 실패가 없으면 완료하지 않는다.

- [x] 저장 payload 형식 확정
- [x] save schema version 필드 확정
- [x] `GameState`와 metadata만 저장
- [x] `GameSession`과 view 계산 객체가 저장 payload에 섞이지 않도록 검증
- [x] 정의 데이터가 저장 payload에 섞이지 않도록 검증
- [x] 저장 직렬화 함수 작성
- [x] 저장 역직렬화 함수 작성
- [x] 손상 payload 실패 처리 작성
- [x] 저장 roundtrip 확인
- [x] `npm run build` 실행

## M10. [구현] 방문/시설 1차

책임 선언:
- 역할: 방문/시설 1차 루프를 장소 선택, 행동 결과, 시설 해금 save 경계까지 닫는다.
- 범위: 장소 view, 행동 1개, 돈 부족/중복/취소 실패, `world.unlocks`, `featureState.visits`, `visit` session 폐기다.
- 방식: 현재 선택값은 session에 두고 영구 해금/방문 진행만 save에 반영한다.
- 완료 결과: 방문 성공/실패/취소가 실제 돈/해금/진행 상태와 연결된다.
- 누락 차단: 장소 선택 session과 시설 진행 save가 섞이면 완료하지 않는다.

- [x] 방문 가능 장소 view 계산
- [x] 방문 장소 id와 표시 label 분리
- [x] 장소 진입 가능 조건 계산
- [x] 장소 1개와 행동 1개 구현
- [x] 장소 action 성공 결과 반영
- [x] 장소 action 실패 결과 반영
- [x] 장소 action 취소 결과 반영
- [x] 시설 해금/플래그 저장 경계 확인
- [x] 방문 세션 선택값이 저장 상태에 남지 않는지 확인
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M11. [구현] 미션 1차

책임 선언:
- 역할: 미션 1개를 정의, 진행 상태, 조건, 보상까지 닫는다.
- 범위: 미션 목록, 선택, 수락, 보고, 조건 미충족 실패, 방문 해금 조건, 보상 지급, mission session 폐기다.
- 방식: 미션 정의와 미션 진행 save를 분리하고 목록 선택값은 session으로 처리한다.
- 완료 결과: 미션 수락부터 완료 보고까지 하나의 검증 가능한 루프가 된다.
- 누락 차단: 미션 정의와 진행 상태가 섞이거나 보고 실패/보상 경로가 빠지면 완료하지 않는다.

- [x] 미션 정의와 진행 상태 분리
- [x] 미션 목록 view 계산
- [x] 미션 표시 조건 계산
- [x] 미션 1개 시작/완료 처리
- [x] 미션 수락 action 구현
- [x] 미션 보고 action 구현
- [x] 미션 실패 또는 조건 미충족 처리
- [x] 보상 지급 처리
- [x] 미션 진행 상태가 저장 payload에 포함되는지 확인
- [x] 미션 목록 선택 상태가 저장 payload에 들어가지 않는지 확인
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M12. [구현] 업무 1차

책임 선언:
- 역할: 업무 1개를 선택, 계산, 저장 반영, 턴 종료까지 닫는다.
- 범위: 업무 정의, 업무/참여 인물 선택, 조건 실패, 취소, 돈/경험/피로/업무 이력 반영, work session 폐기다.
- 방식: 결과 계산은 session/calculation에서 하고 확정 결과만 save owner에 반영한다.
- 완료 결과: 업무 실행 후 경제, 인물, 신체, 업무 이력, 시간이 일관되게 갱신된다.
- 누락 차단: 계산 중간값이 save에 남거나 참여 인물 누락 실패가 없으면 완료하지 않는다.

- [x] 업무 정의와 배정 상태 분리
- [x] 업무 목록 view 계산
- [x] 업무 참여 조건 계산
- [x] 업무 1개 실행 처리
- [x] 업무 성공 결과 계산
- [x] 업무 실패 또는 조건 미충족 처리
- [x] 결과 계산과 저장 반영 분리
- [x] 돈/경험/피로/시간 진행 반영 지점 분리
- [x] 업무 완료 후 턴 종료 연결
- [x] 실패/취소 처리
- [x] `npm run build` 실행

## M13. [구현] 촬영 1차

책임 선언:
- 역할: 촬영 1개 장면을 대상/장면 선택, 촬영량 계산, 결과 반영까지 닫는다.
- 범위: 촬영 대상 후보, 장면 후보, 대상/장면 누락 실패, 선택/화면 취소, 수익/팬/점수/경험/피로/이력 반영이다.
- 방식: 촬영 중간 계산은 session에 두고 결과만 economy/people/body/feature state에 반영한다.
- 완료 결과: 촬영 확정 후 결과 반영, 턴 종료, session 폐기가 검증된다.
- 누락 차단: 촬영량 session 계산이나 실패/취소 경로가 빠지면 완료하지 않는다.

- [x] 촬영 정의와 session 상태 분리
- [x] 촬영 대상 후보 view 계산
- [x] 촬영 대상 조건 실패 사유 표현
- [x] 촬영 장면 후보 view 계산
- [x] 장면 1개 실행
- [x] 장면 선택/취소/확정 action 구현
- [x] 촬영량 또는 비용 계산
- [x] 촬영 결과 계산
- [x] 결과만 저장 상태에 반영
- [x] 턴 종료와 경계 확인
- [x] 촬영 세션 계산 버퍼가 저장 payload에 들어가지 않는지 확인
- [x] `npm run build` 실행

## M14. [구현] 훈련 1차

책임 선언:
- 역할: 훈련 command 1개를 선택, 가능 조건, 계산 버퍼, 결과 반영까지 닫는다.
- 범위: 대상/실행자/조수 선택, command 후보 view, 불가 사유, 자극/source 계산, 파라미터/자원/피로 반영이다.
- 방식: 훈련 중간값은 interaction/session에 두고 최종 결과만 save owner에 반영한다.
- 완료 결과: command 하나가 성공/불가/취소/턴 종료/session 폐기를 검증한다.
- 누락 차단: 원본명 raw state를 모델명으로 쓰거나 계산 버퍼가 save에 남으면 완료하지 않는다.

- [x] command 1개 availability 계산
- [x] 대상/조수/실행자 선택 상태 정의
- [x] command 후보 view 계산
- [x] command 불가 사유 표현
- [x] 훈련 계산 버퍼를 session에만 유지
- [x] 자극 원천 계산 함수 작성
- [x] 파라미터 증가/감소 계산 함수 작성
- [x] 체력/기력 감소 계산 함수 작성
- [x] 결과만 저장 상태에 반영
- [x] 훈련 종료 후 턴 종료 연결
- [x] 원본 `COMF`, `TFLAG`, `SOURCE` 등 직접 모델명 사용 차단
- [x] `npm run build` 실행

검증:

```bash
npm run build
rg "COMF|TFLAG|SOURCE|TEQUIP|LOSEBASE" src/game src/domains src/ui
```

## M15. [구현] 화면 정리와 진단 패널

책임 선언:
- 역할: 화면 구조를 route별 renderer와 읽기 전용 진단 패널로 정리한다.
- 범위: runtime hook, route screen, 공통 선택지/요약 UI, effect log, diagnostics panel이다.
- 방식: UI는 action dispatch 외에는 상태를 직접 바꾸지 않도록 검색과 구조로 차단한다.
- 완료 결과: 현재 route, state/session 요약, boundary diagnostics를 읽기 전용으로 확인할 수 있다.
- 누락 차단: UI에서 `state`나 `session`을 직접 변경하는 코드가 남으면 완료하지 않는다.

- [x] runtime hook 정리
- [x] UI가 읽는 runtime 값 목록 정리
- [x] route별 화면 렌더러 정리
- [x] 선택지 컴포넌트 정리
- [x] 로그/effect 표시 정리
- [x] 읽기 전용 진단 패널 구현
- [x] 진단 패널에 현재 route, state 요약, session 요약 표시
- [x] 진단 패널이 action dispatch 외 상태 변경을 하지 않도록 확인
- [x] UI가 서비스나 저장 상태를 직접 수정하지 않도록 확인
- [x] `npm run build` 실행

## M16. [검증] 테스트/검증 체계 확장

책임 선언:
- 역할: M6~M14 최소 루프와 경계 검증을 자동 실행 가능한 gate로 묶는다.
- 범위: smoke scripts, roundtrip, boundary gate, raw-name gate, stub gate, `verify:m16`이다.
- 방식: build만 통과하는 상태를 완료로 보지 않고 smoke/gate 묶음을 통과해야 완료로 본다.
- 완료 결과: 최소 게임 골격의 성공/실패/취소/저장 경계가 자동 검증된다.
- 누락 차단: 미등록 stub, raw legacy name, save/session boundary 실패가 있으면 완료하지 않는다.

- [x] 테스트 도구 추가 여부 결정
- [x] 테스트 도구를 추가하면 package script 추가
- [x] 테스트 도구를 추가하지 않으면 shell 기반 smoke 검증만 유지
- [x] M6 최소 루프 성공/실패 테스트 추가
- [x] 새 게임 생성 테스트 추가
- [x] 저장 roundtrip 테스트 추가
- [x] 상태 경계 검증 자동화
- [x] 원본명 차단 검색 추가
- [x] build 외 검증 명령을 `PROGRESS_STATUS.ko.md`에 반영
- [x] `npm run build` 실행
- [x] 테스트 도구가 있으면 `npm run test --if-present` 실행

검증:

```bash
npm run build
npm run test --if-present
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_" src/game src/domains src/ui
```
