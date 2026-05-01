# M28~M41 완료/미완료 사실 장부

이 문서는 gate가 아니다. 목적은 각 마일스톤에서 "완료했다고 처리한 것"과 "하지 않았거나 다른 마일스톤으로 넘긴 것"을 사람이 바로 보게 만드는 것이다.

작성 기준:
- `완료로 처리한 것`: runtime consumer와 coverage/gate/smoke 근거가 있는 것.
- `안 했거나 넘긴 것`: `transferredOut`, `mapped` 중 실제 기능 구현이 아닌 분류/owner 확정, 명시적으로 다음 마일스톤 소유로 남긴 것.
- `재확인 필요`: 문서 책임과 산출물 표현이 어긋나거나, 완료 판정이 너무 넓게 보이는 것.

현재 공통 상태:
- M28~M41의 개별 coverage/gate/smoke는 2026-05-01 재실행 기준으로 통과했다.
- M28~M41의 closure는 모두 `responsibilityIntegrity`가 없어 현재 `gate:milestone-scope-closure` 재검증은 실패한다.
- 따라서 이 장부는 "기능 검증 결과가 존재한다"와 "현재 완료 판정은 보강 필요하다"를 분리해서 읽어야 한다.
- 2026-05-02 기준, `[구현]` 마일스톤의 `transferredOut`은 완료가 아니라 미완료 또는 책임 재설계 신호로 본다.

| M | 완료로 처리한 것 | 안 했거나 넘긴 것 | 재확인 필요 |
| --- | --- | --- | --- |
| M28 | 메인 메뉴 route/action/view 24개를 연결하고 `smoke:main-routes`로 확인했다. | BOYFRIEND event-local screen session row 3개는 M47로 넘겼다. | closure에 `responsibilityIntegrity`가 없다. |
| M29 | 구매형 상점 listing 30개, 가격/노출/구매 성공/실패/취소, 돈/인벤토리 반영을 구현했다. coverage 기준 implemented 43, mapped 40. | 123개 row는 구매가 아닌 사용/장비/영입/이벤트 등 다른 owner로 넘겼다. | transferredOut 123개가 실제 수신 마일스톤에서 닫혔는지 추적 필요. |
| M30 | 즉시 사용 아이템 30/31/38/39/40/41/42/43/52의 선택, 대상 지정, 성공/실패/취소, 저장 반영 경로를 구현했다. coverage 기준 implemented 21, mapped 16. | 37개 owned row가 M34/M41/M42/M43/M44 계열로 남아 있으며, 특수 item 200~214의 실제 소비는 M30에서 구현되지 않았다. | M30은 2026-05-02 재판정 기준 `blocked`다. `transferredOut` 37개는 완료 근거가 아니라 `ownedBlocker` 37개로 기록한다. item 213은 `COMF137.ERB`라 기존 M42~M44 range 설계도 재확인해야 한다. |
| M31 | 영입 listing 48개, 반복 영입 제한, 인물 생성 결과를 구현했다. coverage 기준 implemented 52, mapped 158. | 27개 row는 후속 owner로 넘겼다. mapped 158개는 실제 생성 로직이 아니라 identity/정의/owner 확정 성격이 섞여 있다. | mapped와 transferredOut이 실제 미구현을 숨기지 않는지 재확인 필요. |
| M32 | Chara template 109개, CSTR seed, retired/deleted lifecycle, 표시 identity를 연결했다. coverage 기준 implemented 286, mapped 8. | identity 외 효과/상태 변화는 다른 owner가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M33 | BASE/ABL/TALENT/EXP/MARK/PALAM 계열 seed와 body/stat owner를 대량 연결했다. coverage 기준 implemented 4,768, mapped 465. | 67개 row는 후속 owner로 넘겼다. 표시/계산 전용 row는 실제 행동 효과 구현이 아니다. | 대량 implemented row가 "seed 소비"인지 "행동 효과 구현"인지 구분해서 읽어야 한다. |
| M34 | CFLAG, 관계, 장비, 의복 상태를 social/equipment/wardrobe owner로 분해했다. coverage 기준 implemented 1,998, mapped 234. | CFLAG seed 소비와 의복 route 외 이벤트/훈련/미션 효과는 후속 owner가 소유한다. | mapped 234개가 완료성 기능 구현으로 오독되지 않게 해야 한다. |
| M34.5 | hardening용 registry와 final verify skeleton, auxiliary evidence 차단을 추가했다. coverage-hardening gate는 통과한다. | M28~M34 registry contract는 만들지 않았다. M35~M52 중심 hardening이다. | hardening gate 자체가 새 `responsibilityIntegrity` closure 기준을 검증하지 않는다. |
| M35 | 턴 진행, 날짜/주차/월/년 갱신, 장기 턴 smoke를 구현했다. coverage 기준 mapped 7. | coverage에는 implemented 0으로 기록되어 있고, hook/자동 처리 책임이 save field mapping 7개로만 표현된다. | 문서 책임 범위가 넓으므로 실제 hook/자동 구매/미션/이벤트/session cleanup 근거를 별도 사실 장부로 풀어야 한다. |
| M36 | 방문 장소 7개와 방문 action 86개, 비용/해금/진행 row를 구현했다. coverage 기준 implemented 552, mapped 7. | 방문 이후 이벤트/세계 hook은 후속 owner가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M37 | 업무/창관/특수 업무 실행 80개, 조건/결과/턴 종료를 구현했다. coverage 기준 implemented 286, mapped 175. | mapped 175개는 source label/definition/owner 확정 성격이 섞여 있다. | mapped row가 결과 계산 누락을 숨기지 않는지 재확인 필요. |
| M38 | 촬영 장면 정의 6개와 장면 조건 table을 연결했다. coverage 기준 mapped 6. | 실제 촬영 실행/수익/판매는 M39가 소유한다. | implemented 0, mapped 6만으로 "촬영 정의 완성"을 닫았으므로 조건/예상 결과가 runtime에서 충분히 검증되는지 재확인 필요. registry에 smoke 필수도 빠져 있다. |
| M39 | 촬영 실행, 수익, 팬, 점수, 출시/판매 상태를 구현했다. coverage 기준 implemented 135, mapped 39. | source-file-review 2개가 파일 단위 mapped 완료로 남아 있다. | source-file-review는 라벨/row 수준으로 분해됐는지 재감사해야 한다. |
| M40 | 훈련 대상/실행자/조수/command 선택, session lifecycle, 완료 후 cleanup을 구현했다. coverage 기준 implemented 5, mapped 6. | command 효과와 availability는 M41~M44가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M41 | 훈련 command availability 105개와 불가 사유를 구현했다. coverage 기준 implemented 1,371, mapped 254. | command 효과 계산은 M42~M44가 소유한다. `COMORDER.ERB` source-file-review 1개가 mapped 완료로 남아 있다. | registry에 `smoke:training-availability` 필수가 빠져 있고, source-file-review 분해 재감사가 필요하다. |

## 즉시 보강할 항목

- M28~M41 closure에 `responsibilityIntegrity`를 기계적으로 추가하지 않는다. 먼저 이 장부의 `재확인 필요`를 해소하거나 blocked로 적는다.
- M30은 blocked로 재판정했다. 다음 단계는 M30 책임을 "즉시 사용 아이템만"으로 공식 재설계할지, 아니면 특수 item 200~214 효과까지 M30에서 구현할지 결정하는 것이다.
- M35의 넓은 책임을 save field mapping 7개가 아니라 runtime hook/cleanup별 사실로 풀어 적는다.
- M38/M41 registry에 smoke 필수 누락을 기록한다.
- M39/M41의 `source-file-review` mapped 완료 row를 분해하거나 미완료로 되돌릴지 결정한다.
