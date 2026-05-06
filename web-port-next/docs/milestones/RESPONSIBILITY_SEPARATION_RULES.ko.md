# 마일스톤 책임/역할 분리 판정 기준

목적: 각 마일스톤이 자기 책임 안에서 끝났는지 판정한다. 기준은 "무엇을 세었는가"가 아니라 "원본 단위 매니페스트의 모든 단위를 어느 runtime owner가 실제로 구현하고 검증했는가"다.

## 책임 명시 우선 원칙

구현 마일스톤은 작업을 시작한 뒤에 책임을 이관하며 완료 범위를 줄이지 않는다. 먼저 전체 원본 단위를 보고, 각 단위의 runtime owner와 호출 책임을 확정한 뒤에만 구현이나 완료 판정을 시작한다.

- 시작 전에는 해당 마일스톤의 owned unit, 승인 제외 후보, 다른 owner 후보를 모두 매니페스트에 적는다.
- phase/마일스톤 상세 문서의 각 체크 항목은 책임 표기를 가진다. 그 항목이 이 호출에서 닫히는지, 다른 마일스톤에서 닫히는지, 승인 제외인지, 완료 금지 상태인지가 줄 단위로 보여야 한다.
- 작업 중 새 owner 후보가 발견되면 그 자리에서 넘기고 계속하지 않는다. 먼저 `scope-redesign-required`로 막고, 책임 지도와 매니페스트를 고친 뒤 다시 시작한다.
- `approved-excluded`는 "이번 마일스톤이 안 해도 된다"는 임시 회피가 아니다. 제외 범위, 제외 이유, 실제 owner, receiver manifest 반영 여부가 모두 있어야 한다.
- 완료 커밋에는 "이번 마일스톤이 한 것", "하지 않은 것", "승인 제외한 것", "blocked/scope-redesign-required로 남긴 것"이 단위별 산출물로 남아야 한다.
- 책임 재분리는 구현 중 편의상 수행하지 않는다. 재분리가 필요하면 구현을 멈추고 책임 명시 작업으로 전환한다.

## OpenRouter Worker MCP 사용 원칙

OpenRouter worker MCP는 책임 분리와 누락 방지를 위한 적극 사용 도구다. Codex 본체가 모든 것을 단독으로 읽다가 누락하거나 토큰을 낭비하지 않도록, 병렬화 가능한 bounded subtask는 worker에 맡긴다.

- 사용 대상: 원본 row와 manifest 대조, owner 후보 분류, blocked/scope-redesign-required 원인 분석, gate 실패 로그 요약, 좁은 범위 patch proposal.
- 금지 대상: 완료 판정 위임, secret/.env 전달, unrelated dirty file 편집, 넓은 glob으로 전체 repo를 읽게 하는 호출.
- worker 결과 반영 조건: Codex 본체가 원본 row, coverage/gap/closure, gate/smoke/build를 직접 확인하고, 책임 원칙과 충돌하지 않는 경우에만 반영한다.
- worker가 제안한 transfer/approved-excluded는 자동 승인하지 않는다. receiver manifest와 runtime owner 증거가 맞는지 재확인해야 한다.

## 항목별 책임 표기 형식

각 마일스톤의 체크 항목 앞에는 아래 표기 중 하나를 붙인다.

| 표기 | 의미 | 완료 판정 |
| --- | --- | --- |
| `[HERE:Mxx]` | 이 항목은 현재 마일스톤 Mxx가 직접 구현/검증한다. | 증거가 있으면 완료 가능 |
| `[LATER:Myy]` | 이 항목은 현재 마일스톤이 아니라 Myy의 책임이다. | 현재 Mxx 완료 근거로 금지 |
| `[EXCLUDED->Myy]` | 사용자 승인 제외이며 Myy receiver manifest에 반영되어야 한다. | 승인/receiver가 있으면 현재 Mxx에서 제외 가능 |
| `[BLOCKED:Mxx]` | 현재 Mxx 책임이지만 아직 미구현/미검증이다. | 완료 금지 |
| `[REDESIGN]` | owner가 섞여 있어 책임 재분리가 필요하다. | 완료 금지 |
| `[VERIFY:Mxx]` | 구현은 존재하나 이 마일스톤에서 검증 증거를 닫아야 한다. | 검증 전 완료 금지 |
| `[DOC-ONLY]` | 조사/정책/문서 산출물이며 runtime 구현 완료가 아니다. | 구현 완료 근거로 금지 |

기존 체크박스가 있어도 이 표기가 없으면 완료 근거로 쓰지 않는다. 표기와 매니페스트 unit 상태가 충돌하면 매니페스트와 runtime evidence를 기준으로 체크박스를 고친다.

## 기본 판정

- `completed`: 마일스톤 제목과 책임 선언에 적힌 원본 동작이 runtime behavior, source evidence, consumer evidence, verification evidence를 모두 가진다. owned blocker, unresolved gap, role-only complete, missing evidence/consumer/verification, unapproved exclusion이 0이어야 한다.
- `blocked`: 원래 책임 안의 동작이 남아 있거나, `transferredOut`/`mapped`/`source-file-review`/placeholder가 구현 완료를 대신하고 있다.
- `scope-redesign-required`: 마일스톤에 서로 다른 runtime owner의 책임이 섞여 있다. 이 경우 먼저 책임을 쪼개고 queue/coverage/문서를 재생성한 뒤 다시 판정한다. 기존 closure를 completed로 유지하지 않는다.

## 절대 규칙

- `[구현]` 마일스톤의 `transferredOut > 0`은 완료가 아니다. transfer는 accounting 기록일 수 있지만 completion evidence가 아니다.
- `[구현]` 마일스톤에서 `transferredOut > 0`이면 builder/gate는 같은 단위를 `blocked` 또는 `scope-redesign-required`로 반영해야 한다. 그렇지 않은 coverage/closure 산출물은 무효다.
- `[구현]` 마일스톤에서 transfer가 필요해 보이면 먼저 책임 범위를 재설계한다. 재설계 전에는 `blocked`다.
- `mapped`는 runtime consumer와 verification이 있을 때만 완료에 가까운 근거다. 단순 owner 확정, source label 연결, field path 기록, 표시 정의 연결은 구현 완료가 아니다.
- 예정 `runtimeConsumerId` 또는 예정 `verificationId`는 완료 근거가 아니다. 실제 route/action/handler/view/calculation/save consumer와 실행된 검증이 있어야 한다.
- `source-file-review`는 구현 완료 상태가 아니다. 파일 단위 row는 원본 라벨, CSV 행, read/write row, command/effect row로 분해해야 한다.
- `implemented`라도 원본 효과가 아니라 seed ingestion, 표시명 연결, index/profile 생성이면 행동 구현 완료로 세지 않는다.
- gate가 자체 산출물 존재만 검사하면 완료 gate가 아니다. source behavior와 runtime consumer를 같이 검사해야 한다.
- 체크박스는 coverage/gap/closure와 runtime 검증이 일치한 뒤에만 체크한다.
- 완료 판정에는 원본 단위 매니페스트가 필요하다. 매니페스트 경로와 단위별 상태(`implemented-verified`, `approved-excluded`, `blocked`, `scope-redesign-required`)를 남기지 않은 마일스톤은 완료가 아니라 미기록 상태다.

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
- 완료 기록에 원본 단위 매니페스트가 없거나, 매니페스트 단위가 coverage/closure/gap audit과 맞지 않는다.

## M28~M41 사전 재판정 기준

| 대상 | 기본 판단 | completed 허용 조건 | blocked 조건 |
| --- | --- | --- | --- |
| M28 | route owner | 메인 메뉴 route/action/view/disabled reason이 모두 있고 event/world row를 완료로 세지 않음 | event-local screen row를 route 완료로 세거나 transfer를 completed total로 사용 |
| M29 | purchase owner | 구매형 listing만 성공/실패/취소/roundtrip을 닫고, 비구매 row는 scope 밖으로 공식 재설계. 단 상점에 노출되는 immediate-use item listing/ITEMSALES는 M29가 닫는다. | 비구매/즉시사용 item 123개를 일괄 transfer로 구매 완료 계산 |
| M30 | immediate item-use owner로 재설계 필요 | 즉시 사용 아이템 9개만 M30으로 재정의하거나, 특수 item 200~214 효과까지 실제 구현 | 특수 item 효과/의복/훈련 availability/effect row를 M30 완료로 계산 |
| M31 | recruit listing/generation owner | listing, 가격/조건, template 연결, 생성 결과, 실패/취소/roundtrip이 모두 있음 | transferredOut 27개 또는 mapped 158개가 생성 결과 누락을 숨김 |
| M33 | seed/stat owner | 초기 seed와 표시 정의는 owner 분해로 닫고, 행동 결과 변화는 해당 기능 owner에서 별도 닫음 | seed ingestion을 업무/촬영/훈련 효과 구현으로 해석 |
| M34 | CFLAG/equipment/social owner | 의미가 확인된 CFLAG/관계/장비/의복 상태만 owner와 lifecycle을 가짐 | 의미 불명 CFLAG나 이벤트/훈련/미션 효과를 mapped로 닫음 |
| M35 | turn pipeline owner | day/week/month/year, hook 순서, 자동 처리, 미션/이벤트 hook, session cleanup, save roundtrip이 각각 검증됨 | save mapping 7개 또는 long smoke 하나만으로 턴 전체 완료 |
| M37 | work execution owner | 업무 dispatch/정의 실행 80개, definition 8개, 업무 결과 write-effect 21개, LUNCH_STALL ABL:74 보상 read 1개, EVENT_WORK_MESSAGE_SP message branch read 7개는 검증됨. 완료 판정은 남은 save/session/calculation/source-address row 140개까지 닫아야 함 | mapped 175개를 완료로 세어 업무 계산/결과 누락을 숨김 |
| M38 | filming scene definition/condition owner | 장면 정의, 대상 조건, 장면 조건, 불가 사유, 예상 결과 근거가 runtime에서 소비됨 | implemented 0/mapped 6만으로 장면 정의 완성 처리 |
| M39 | filming execution/sales owner | 촬영 계산, 출시/판매 상태, session cleanup, roundtrip이 row 수준으로 검증됨 | source-file-review 2개가 파일 단위 mapped로 남음 |
| M40 | training session owner | 대상/실행자/조수/command 선택과 session lifecycle만 닫고 효과/availability를 완료로 세지 않음 | command 효과를 session 완료로 포함 |
| M41 | training availability owner | command별 가능/불가 조건과 불가 사유, non-mutating view 계산을 검증 | `COMORDER.ERB` source-file-review가 파일 단위 mapped로 남거나 효과 계산을 availability 완료로 해석 |

## 이후 적용 규칙

- M42 이후 새 `[구현]` 마일스톤은 시작 전 `owned scope`를 원본 row와 runtime owner 기준으로 다시 확인한다.
- 작업 중 owner가 섞인 row가 발견되면 구현을 계속하기 전에 `scope-redesign-required`로 문서화한다.
- 최종 M52는 각 마일스톤의 completed 선언을 그대로 믿지 않고, 이 문서 기준으로 다시 전체 gap을 계산한다.
