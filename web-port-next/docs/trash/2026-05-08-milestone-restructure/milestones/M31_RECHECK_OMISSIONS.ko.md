# M31 원본 로직 재검 누락 처리 결과

작성일: 2026-05-08

## 기준

M31 재검 기준은 gate 통과가 아니라 원본 `SHOP_CHARABUY.ERB`, `SHOP_SLAVE2.ERB`, `SHOP_SLAVE3.ERB`, `SHOP_SLAVE4.ERB`, `INTERVIEW.ERB`, `NAME.ERB`, `Item.csv`, Chara CSV의 실제 영입/listing/생성 동작이다.

## 발견했고 수정한 누락

1. `FLAG:23` 기본 고용 가능 인원 제한이 원본 기본 10이 아니라 99로 완화되어 있었다.
2. 영입 성공 후 원본의 `FLAG:1000+n = -1` 구매 완료 플래그가 저장 상태에 남지 않았다.
3. 영입 성공 후 원본의 `GLOBAL:(NO:TARGET + 200) += 1` 명감/전역 카운터가 갱신되지 않았다.
4. 구인광고 `recruit:150`의 `FLAG:90` 반복 횟수와 `FLAG:1050` 재노출/종료 플래그가 저장 상태에 남지 않았다.
5. 구인광고의 `INTERVIEW` draft가 원본 `TFLAG:400..421` 의미를 충분히 반영하지 않았고, 성공 시 `INTERVIEW_ADD`의 persistent 생성 결과를 캐릭터에 적용하지 않았다.
6. 구인광고의 `[8] 다음 사람` 후보 재굴림 흐름이 action으로 존재하지 않았다.
7. `CHARA_BUY_SETTING` 구매 후 설정 중 난이도별 생명, 음모 기본값, 성기 호칭, 의복 초기화, 미모 계산이 영입 성공 결과에 반영되지 않았다.
8. `CHARA_MANUAL` 원본 후보 설명 48개 block, 736 line, `HINT_CHARA` 11개가 listing detail에 연결되지 않았다.
9. `CHARA_BUY_EVENT` 원본 출력 branch 5개, 89 line이 구매 성공 후 effect로 표시되지 않았다.
10. `INTERVIEW` 표시 텍스트와 계약 프롬프트, page 이동, off-page 선택 실패가 원본 `SHOP_CHARABUY/SHOP_SLAVE2/INTERVIEW` 흐름과 맞지 않았다.
11. `INTERVIEW.ERB @INTERVIEW`의 숨은 `RESULT == 1/2` 성별 입력, 남자아이 가슴/애널 분기, 첫 키스 기혼자 no-op 분기, 음모/소질/출연료 난수 소비 순서가 누락되거나 잘못 구현되어 있었다.

## 최종 처리

위 항목은 모두 현재 구현과 `tools/m31_recruit_all_smoke.ts` 검증에 반영했다.

현재 M31-owned source는 237개 중 implemented-verified 153, approved-excluded 84, unresolved 0이다. `approved-excluded`는 M31 생성/listing 책임이 아닌 downstream owner 책임 또는 원본상 출력 없는/comment-only branch로 분리된 항목이며 M31 완료로 세지 않는다.

## 검증

- `npm run coverage:recruit`
- `npm run gate:recruit-coverage`
- `npm run gate:milestone-scope-closure -- M31`
- `npm run smoke:recruit-all`
- `npm run build`
