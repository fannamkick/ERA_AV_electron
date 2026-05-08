# M31 재검 최종 잔여 판정

작성일: 2026-05-08

기준은 gate가 아니라 원본 `SHOP_CHARABUY.ERB`, `SHOP_SLAVE2.ERB`, `SHOP_SLAVE3.ERB`, `SHOP_SLAVE4.ERB`, `INTERVIEW.ERB`, `NAME.ERB`, `Item.csv`의 실제 영입/listing/생성 로직이다.

## 닫은 보정 항목

1. `INTERVIEW_ADD` 체형 공식
   - 원본 `INTERVIEW.ERB @INTERVIEW_ADD`의 성별/나이별 평균신장, 체구 보정, 체지방 `F`, 성숙도 `X/E`, 근육도 `M`, 체중, 허리, 가슴, 엉덩이 계산을 `applyInterviewPhysicalState`에 반영했다.

2. 원본 flag family 미러
   - 원본 `FLAG:23`, `FLAG:90`, `FLAG:1000+n`, `FLAG:1050`, `GLOBAL:200+NO`를 web save 상태와 legacy mirror에 남기도록 수정했다.

3. `INTERVIEW_ADD` CSTR/EXP 관계 범위
   - `CSTR:0/1/2/3` 원본 label 73개를 보존하고, `CFLAG:15/16`, `TALENT:0/1/2`, `EXP:0/1/2/56`, 미경험 rollback을 생성 결과에 반영했다.

4. `CHARA_MANUAL`
   - 원본 후보 설명 48개 block, 736 line, `HINT_CHARA` 11개를 `src/catalog/recruitManuals.ts`로 구조화하고 recruit detail view에 연결했다.

5. `CHARA_BUY_EVENT`
   - 원본 출력 branch 5개, 89 line을 `src/catalog/recruitBuyEvents.ts`로 구조화하고 구매 성공 effect로 연결했다. 원본상 empty/comment-only branch는 출력 없음으로 유지한다.

6. `INTERVIEW` 표시 텍스트와 pagination
   - 원본 `TFLAG:100` page, 60개 page size, page 3 clamp, `[1] 이전`, `[9] 다음`, `[999] 돌아간다`, `[8] 다음 사람`, 계약 prompt를 view/action/dispatch/UI에 연결했다.

7. `INTERVIEW @INTERVIEW/@INTERVIEW_2nd` 난수/성별 생성
   - 숨은 `RESULT 1/2` 성별 입력, `TFLAG:408/411/413/415/416/420/421` 분기와 난수 소비 순서를 원본 기준으로 보정했다.

## 최종 잔여

- M31-owned blocker: 0
- M31-owned unresolved omission: 0
- M31-owned implemented-verified: 153
- approved-excluded: 84

`approved-excluded`는 M31 완료 근거가 아니라 M31 범위 밖으로 분리된 원본 책임이다. M31은 영입 listing, 영입 선택/실패/취소, 구인광고 반복 영입, 인물 생성 결과의 initial identity/body/social/equipment/session 적용까지 닫는다.

## 검증

- `npm run coverage:recruit`: 237 source row, strict-owned 153, approved-excluded 84, unresolved 0
- `npm run gate:recruit-coverage`: 통과
- `npm run gate:milestone-scope-closure -- M31`: 통과
- `npm run smoke:recruit-all`: 통과
- `npm run smoke:m7`: 통과
- `npm run smoke:main-routes`: 통과
- `npm run build`: 통과
