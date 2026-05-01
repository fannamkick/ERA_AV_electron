# 마일스톤 책임/역할 분리 판정 기준

목적: 각 마일스톤이 자기 책임 안에서 끝났는지 판정한다. 기준은 "무엇을 세었는가"가 아니라 "원본 동작을 어느 runtime owner가 실제로 구현하고 검증했는가"다.

## 기본 판정

- `completed`: 마일스톤 제목과 책임 선언에 적힌 원본 동작이 runtime behavior, source evidence, consumer evidence, verification evidence를 모두 가진다. owned blocker, unresolved gap, role-only complete, missing evidence/consumer/verification, unapproved exclusion이 0이어야 한다.
- `blocked`: 원래 책임 안의 동작이 남아 있거나, `transferredOut`/`mapped`/`source-file-review`/placeholder가 구현 완료를 대신하고 있다.
- `scope-redesign-required`: 마일스톤에 서로 다른 runtime owner의 책임이 섞여 있다. 이 경우 먼저 책임을 쪼개고 queue/coverage/문서를 재생성한 뒤 다시 판정한다. 기존 closure를 completed로 유지하지 않는다.

## 절대 규칙

- `[구현]` 마일스톤의 `transferredOut > 0`은 완료가 아니다. transfer는 accounting 기록일 수 있지만 completion evidence가 아니다.
- `[구현]` 마일스톤에서 transfer가 필요해 보이면 먼저 책임 범위를 재설계한다. 재설계 전에는 `blocked`다.
- `mapped`는 runtime consumer와 verification이 있을 때만 완료에 가까운 근거다. 단순 owner 확정, source label 연결, field path 기록, 표시 정의 연결은 구현 완료가 아니다.
- `source-file-review`는 구현 완료 상태가 아니다. 파일 단위 row는 원본 라벨, CSV 행, read/write row, command/effect row로 분해해야 한다.
- `implemented`라도 원본 효과가 아니라 seed ingestion, 표시명 연결, index/profile 생성이면 행동 구현 완료로 세지 않는다.
- gate가 자체 산출물 존재만 검사하면 완료 gate가 아니다. source behavior와 runtime consumer를 같이 검사해야 한다.
- 체크박스는 coverage/gap/closure와 runtime 검증이 일치한 뒤에만 체크한다.

## Runtime Owner 분리 기준

한 row의 owner는 아래 질문으로 결정한다.

1. 이 row가 저장 상태를 바꾸는가? 바꾼다면 최종 save field owner가 구현 책임자다.
2. 이 row가 화면 선택/임시 계산만 나타내는가? 그렇다면 session/calculation owner가 구현 책임자이며 save에 남으면 안 된다.
3. 이 row가 command 가능 여부만 결정하는가? 그렇다면 availability owner가 책임자다. 효과 계산 owner가 아니다.
4. 이 row가 command 실행 결과를 만든는가? 그렇다면 effect owner가 책임자다. availability나 menu owner가 대신 닫을 수 없다.
5. 이 row가 정의/표시명/목록 entry인가? runtime에서 실제 소비되는 view/action/calculation이 있어야 완료다.
6. 이 row가 이벤트 trigger, event text, world flag, hook이면 event/world owner가 책임자다. route owner나 visit owner가 표시만으로 닫을 수 없다.

## 의심 신호

아래 중 하나라도 있으면 completed를 금지하고 재판정한다.

- `[구현]`인데 `implemented = 0`이고 `mapped`만 있다.
- `transferredOut`이 있는데 closure status가 `completed`다.
- `mapped` row가 source label, owner, field path만 있고 runtimeConsumerId 또는 verificationId가 없다.
- `source-file-review`가 mapped/implemented로 남아 있다.
- smoke가 성공 경로 하나만 보고 실패/취소/roundtrip/session cleanup을 보지 않는다.
- 원본 family 이름이 runtime 모델명으로 남아 있다: `CFLAG`, `TFLAG`, `SOURCE`, `TEQUIP`, `ITEMSALES`, `BOUGHT`, `COMF`, `LOSEBASE`.
- 원본 command/file 범위가 숫자 구간으로 잘렸는데 실제 `Train.csv`/`COMF*.ERB`에 그 밖의 활성 command가 있다.
- 문서 제목은 "완성"인데 closure/gap audit에는 미구현, transfer, missing verification, role-only가 있다.

## M28~M41 사전 재판정 기준

| 대상 | 기본 판단 | completed 허용 조건 | blocked 조건 |
| --- | --- | --- | --- |
| M28 | route owner | 메인 메뉴 route/action/view/disabled reason이 모두 있고 event/world row를 완료로 세지 않음 | event-local screen row를 route 완료로 세거나 transfer를 completed total로 사용 |
| M29 | purchase owner | 구매형 listing만 성공/실패/취소/roundtrip을 닫고, 비구매 row는 scope 밖으로 공식 재설계 | 비구매 item 123개 transfer를 구매 완료로 계산 |
| M30 | immediate item-use owner로 재설계 필요 | 즉시 사용 아이템 9개만 M30으로 재정의하거나, 특수 item 200~214 효과까지 실제 구현 | 특수 item 효과/의복/훈련 availability/effect row를 M30 완료로 계산 |
| M31 | recruit listing/generation owner | listing, 가격/조건, template 연결, 생성 결과, 실패/취소/roundtrip이 모두 있음 | transferredOut 27개 또는 mapped 158개가 생성 결과 누락을 숨김 |
| M33 | seed/stat owner | 초기 seed와 표시 정의는 owner 분해로 닫고, 행동 결과 변화는 해당 기능 owner에서 별도 닫음 | seed ingestion을 업무/촬영/훈련 효과 구현으로 해석 |
| M34 | CFLAG/equipment/social owner | 의미가 확인된 CFLAG/관계/장비/의복 상태만 owner와 lifecycle을 가짐 | 의미 불명 CFLAG나 이벤트/훈련/미션 효과를 mapped로 닫음 |
| M35 | turn pipeline owner | day/week/month/year, hook 순서, 자동 처리, 미션/이벤트 hook, session cleanup, save roundtrip이 각각 검증됨 | save mapping 7개 또는 long smoke 하나만으로 턴 전체 완료 |
| M37 | work execution owner | 업무별 조건, 결과 owner, 실패/취소, 턴 종료, roundtrip이 row 수준으로 검증됨 | mapped 175개가 업무 계산/결과 누락을 숨김 |
| M38 | filming scene definition/condition owner | 장면 정의, 대상 조건, 장면 조건, 불가 사유, 예상 결과 근거가 runtime에서 소비됨 | implemented 0/mapped 6만으로 장면 정의 완성 처리 |
| M39 | filming execution/sales owner | 촬영 계산, 출시/판매 상태, session cleanup, roundtrip이 row 수준으로 검증됨 | source-file-review 2개가 파일 단위 mapped로 남음 |
| M40 | training session owner | 대상/실행자/조수/command 선택과 session lifecycle만 닫고 효과/availability를 완료로 세지 않음 | command 효과를 session 완료로 포함 |
| M41 | training availability owner | command별 가능/불가 조건과 불가 사유, non-mutating view 계산을 검증 | `COMORDER.ERB` source-file-review가 파일 단위 mapped로 남거나 효과 계산을 availability 완료로 해석 |

## 이후 적용 규칙

- M42 이후 새 `[구현]` 마일스톤은 시작 전 `owned scope`를 원본 row와 runtime owner 기준으로 다시 확인한다.
- 작업 중 owner가 섞인 row가 발견되면 구현을 계속하기 전에 `scope-redesign-required`로 문서화한다.
- 최종 M52는 각 마일스톤의 completed 선언을 그대로 믿지 않고, 이 문서 기준으로 다시 전체 gap을 계산한다.
