# M31 재검 7번 호출 기록

작성일: 2026-05-08

목표는 gate 통과가 아니라 원본 `INTERVIEW.ERB`, `SHOP_SLAVE2.ERB`, `SHOP_CHARABUY.ERB`, `SHOP_SLAVE4.ERB`, `NAME.ERB` 기준의 영입 생성 로직 누락 제거다.

## 이번 호출에서 확인한 실제 누락

1. `INTERVIEW.ERB @INTERVIEW`의 숨은 입력 분기 누락
   - 원본은 화면에는 `[0] - 여자`만 출력하지만 `RESULT == 1`, `RESULT == 2`도 받아 `TFLAG:400`에 저장한다.
   - 조치: `recruit/selectListing` action에 `interviewGender`를 추가해 `0/1/2`만 허용하고, `TFLAG:400`과 draft/session flag에 반영했다. UI 출력은 원본처럼 `[0] - 여자`만 유지한다.

2. `TFLAG:408` 가슴 크기 생성 분기 축소
   - 원본은 여자(`0`)는 `RAND:51 + RAND:51`, 남자(`1`)는 0, 남자아이(`2`)는 `RAND:3 == 0`일 때 `RAND:101 - RAND:101` 보정 분기를 탄다.
   - 조치: 성별별 난수 소비와 보정을 원본 순서로 복원했다.

3. `TFLAG:411` 첫 키스 분기 오역
   - 원본의 기혼자(`TFLAG:405 == 7`) `ELSEIF ... RAND:10 > 0` 분기는 주석만 있고 대입이 없다. 즉 `TFLAG:411`은 초기값 0으로 남되 `RAND:10`만 소비한다.
   - 기존 구현은 이 분기를 경험 있음 `1`로 처리했다.
   - 조치: 실패한 첫 roll 뒤 기혼자면 `RAND:10`만 소비하고 값을 0으로 유지하도록 수정했다.

4. `TFLAG:413` 애널 경험 남자아이 분기 누락
   - 원본은 연인 있음/기혼 분기에서 남자아이(`TFLAG:400 == 2`)일 때 같은 `LOCAL:0` roll로 `LOCAL:0 >= TFLAG:401 * 3`이면 경험 있음으로 처리한다.
   - 조치: 같은 roll을 재사용하는 원본 분기로 수정했다.

5. `TFLAG:415` 음모 상태 난수 소비 순서 불일치
   - 원본은 `IF TFLAG:400 < 16 && TFLAG:400 >= RAND:7 + 9`를 먼저 평가하고, 실패 시 `RAND:20`을 소비한다.
   - 기존 구현은 `RAND:7` 소비를 생략해 이후 `TFLAG:416+` 난수열이 원본과 밀렸다.
   - 조치: `RAND:7` 조건 평가 후 `RAND:20` fallback으로 맞췄다.

6. `TFLAG:416` 성별별 소질 roll 축소
   - 원본은 여자/남자아이(`0/2`)는 `23 + RAND:15`, 남자(`1`)는 `20 + RAND:11`이다.
   - 조치: 성별별 분기를 복원했다.

7. `TFLAG:420/421` 생성 순서 불일치
   - 원본은 체형 rank `TFLAG:421 = RAND:6 - RAND:6`을 먼저 만들고, 출연료 `TFLAG:420 = (RAND:10 + 1) * 100`을 나중에 만든다.
   - 기존 구현은 순서가 반대였다.
   - 조치: 원본 순서로 난수 소비를 복원했다.

## 검증

- `npm run smoke:recruit-all` 통과
- `npm run build` 통과

추가된 smoke 검증:
- `RESULT 3`에 해당하는 잘못된 성별 입력은 실패하고 save state reference를 보존한다.
- 숨은 `RESULT 2` 입력은 `TFLAG:400 == 2`로 draft/session에 저장된다.
- reroll 후에도 `TFLAG:400 == 2`가 유지된다.
