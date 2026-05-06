# 전체 포팅 완성성 검토

목표: 모든 마일스톤이 자기 유형과 책임을 끝냈을 때 실제 전체 게임 포팅이 완성되는지 검토한다.

책임/역할 분리의 세부 판정 기준은 `RESPONSIBILITY_SEPARATION_RULES.ko.md`를 따른다. 이 문서와 충돌하면 `RESPONSIBILITY_SEPARATION_RULES.ko.md`가 우선한다.

## 유형 정의

- `[기획]`: 구현 전 범위와 제외선을 고정한다. 이 자체로 게임 기능이 완성되지는 않는다.
- `[정책]`: 이후 작업의 판정 규칙을 만든다. 이 자체로 기능 구현이 아니다.
- `[조사]`, `[조사/분류]`, `[조사/장부]`, `[조사/매핑]`, `[조사/보강]`: 원본을 세고 owner를 배정한다. 구현 완료가 아니다.
- `[계획]`: 구현 단위와 순서를 만든다. 구현 완료가 아니다.
- `[구현]`: 부여받은 원본 기능/데이터/상태 변화를 runtime behavior로 끝낸다.
- `[검증]`, `[감사]`, `[판정]`: 구현이 실제로 닫혔는지 확인한다. 검증만으로 미구현을 완료 처리하지 않는다.

## 현재 구조가 전체 완성으로 이어지는 조건

전체 게임 포팅은 아래가 모두 참일 때만 완성된다.

1. `[조사]` 계열 마일스톤이 원본 기능, 정의 데이터, 저장 주소, 세션/계산 주소를 빠짐없이 세고 owner를 배정한다.
2. `[구현]` 마일스톤이 배정받은 owner 범위 안에서 다른 마일스톤으로 책임을 넘기지 않고 runtime behavior를 끝낸다.
3. `[검증]`/`[감사]`/`[판정]` 마일스톤이 미구현, 미분류, 미정 주소, 승인 없는 제외, 미해소 blocker가 0인지 확인한다.
4. 어떤 마일스톤도 `mapped` 또는 `transferredOut`을 기능 구현 완료처럼 쓰지 않는다.
5. `[구현]` 마일스톤에서 실행 중 transfer가 생기면 완료가 아니라 blocked 또는 책임 재설계 상태로 남긴다.
6. runtime owner가 다른 책임이 한 마일스톤에 섞여 있으면 완료가 아니라 `scope-redesign-required`다.
7. `source-file-review`, `mapped`, `implemented` 숫자는 원본 behavior 구현 여부보다 우선하지 않는다.

## 전체 도메인 커버리지 검토

| 도메인 | 닫는 마일스톤 | 현재 판정 |
| --- | --- | --- |
| 실행 계약, 저장/session/view 경계 | M1~M3, M9, M16, M50 | 구조는 있다. 전체 기능 후 roundtrip은 M50 전까지 완성 아님. |
| 메인 route와 기능 진입 | M5, M28 | M28 strict closure 완료. M47 event-local row 3개는 M28 approved-excluded 및 M47 책임으로 분리됨. |
| 아이템 구매 | M6, M29 | M29 strict closure blocked. listing/flow/result 83개만 implemented-verified이고, 105개는 approved-excluded, 18개 immediate-use purchasable listing/ITEMSALES row는 M29-owned blocked다. 효과가 M30 소유라는 이유만으로 상점 listing/구매 선택을 M30에 넘길 수 없다. |
| 아이템 사용/특수 아이템 | M30 | M30 strict closure 완료. 즉시 사용 아이템 9개 flow/effect 37개만 M30 완료로 세고, 특수 훈련 item 200~214 및 item 22/90/91 plus item 211 계열 37개는 M30 approved-excluded로 수신 manifest blocked inbound에 남겼다. |
| 영입과 인물 생성 | M7, M31, M32 | M31 strict closure blocked. recruit listing/session 127개는 implemented-verified이나, recruit creation result integration/source-review 91개는 M31-owned blocked다. 필드 의미는 M32/M33/M34/M35일 수 있어도 생성 결과에 초기값이 적용되는지 검증하는 책임은 M31이다. |
| 신체/능력/소질/경험 | M14, M33, M42~M44 | seed/owner는 대량 연결됐지만 훈련 효과 계산은 M42~M44 미완료. |
| 관계/CFLAG/장비/의복 | M34 | owner 분해와 wardrobe route는 있으나 mapped 234개가 기능 효과를 대신하지 않는지 재확인 필요. |
| 턴/시간/hook | M8, M35, M45, M47, M50 | M35는 mapped 7개만으로 넓은 hook 책임을 닫아 재검토 필요. |
| 방문/시설 | M10, M36 | 방문 장소/행동 구현 근거는 강함. 세계 이벤트 hook은 M47까지 봐야 완성. |
| 업무/창관/특수 업무 | M12, M37 | strict 재판정 결과 M37은 total 463, implemented-verified 323, blocked 140이다. 남은 save/session/calculation/source-address row를 닫기 전까지 업무 기능군 완료가 아니다. |
| 촬영 정의/실행/판매 | M13, M38, M39 | M38은 implemented 0/mapped 6, M39에는 source-file-review mapped row가 있어 재검토 필요. |
| 훈련 메뉴/가능 조건/효과 | M14, M40~M44 | M40/M41 일부 구현. M42 blocked라 훈련 효과 전체는 현재 미완성. M30 재판정 중 `COMF137.ERB` 소비가 확인되어 M44는 70~104가 아니라 70 이상 전체로 보강해야 한다. |
| 공통 유지보수/회복/자동 처리 | M45 | 아직 미진행. |
| 미션 전체 | M11, M46 | M11은 1차 루프만. 전체 미션은 아직 미진행. |
| 세계/이벤트/스토리 | M47 | 아직 미진행. M28/M36/M50과 연결 확인 필요. |
| 엔딩/meta/global save | M48, M50 | 아직 미진행. |
| 정보/도움말/설정/view/text | M49 | 아직 미진행. |
| 최종 누락 감사와 완전 판정 | M51~M52 | 아직 미진행. 여기서 0 gap이 확인되어야 완전 포팅. |

## 현재 불안정한 부분

- M21~M27은 조사/장부/매핑/감사/계획 성격이다. 이 구간이 완료되어도 게임 기능이 완성되는 것은 아니다.
- M35~M41은 구현 성격이지만, 일부 closure가 `mapped`와 `transferredOut`을 완료 totals에 포함한다. 이 경우 "책임을 끝냈다"가 아니라 "분류하거나 넘겼다"일 수 있다. M28~M34.5은 strict closure로 보정됐다.
- M30은 즉시 사용 item owner로 재설계한 뒤 완료했다. 특수 item 효과는 M30 완료가 아니며 M34-closed plus M41/M42/M43/M44 수신 owner의 blocked inbound로 남아 있다.
- M35와 M38은 `implemented`가 0이고 `mapped`만으로 완료 처리되어 있어, runtime 구현 근거를 자연어로 풀어 재확인해야 한다.
- M39/M41에는 `source-file-review`가 파일 단위 mapped 완료로 남아 있어 원본 라벨/row 수준 분해가 필요하다.
- M42는 blocked다. command 0~34 효과 계산이 구현되지 않았으므로 M43 이후로 넘어가면 안 된다.
- 기존 M44의 "70~104" 표현은 전체 훈련 command를 닫지 못한다. `Train.csv`와 `COMF*.ERB`에는 105 이상 command가 있으므로 M44는 70 이상 전체 및 후처리로 보강해야 한다.

## 판정

현재 마일스톤 목록은 큰 방향으로는 전체 게임 포팅을 닫을 수 있는 구조다. 하지만 현재 완료 기록과 일부 마일스톤 책임 문구로는 완벽 구현을 보장하지 못한다.

현재 그대로 M42 이후를 진행하면 놓칠 수 있는 부분이 있다. 2026-05-02 재판정 이후 M28~M34.5은 strict closure로 보정됐지만, M35~M41은 M42 전에 원본 단위 매니페스트 기준으로 보강하거나 blocked/scope-redesign-required로 정정해야 한다.

필요한 정정:

- 모든 마일스톤 제목에 유형을 유지한다.
- `[구현]` 마일스톤은 완료 전에 원본 단위 매니페스트와 "완료로 처리한 것 / 안 했거나 넘긴 것 / 재확인 필요한 것"을 남긴다.
- `[구현]` 마일스톤의 `transferredOut`은 완료가 아니라 미완료 또는 마일스톤 재설계 신호로 본다. 책임을 넘겨야 한다면 마일스톤을 완료하지 않는다.
- M35~M41은 `M28_M41_DONE_NOT_DONE_LEDGER.ko.md`의 2026-05-02 원본 단위 매니페스트 기준 재판정 표를 따른다. M28~M34.5은 strict closure 완료 상태다.
- M42부터는 구현 책임을 다른 곳으로 넘기지 않는다.
- 의심 신호 판정은 `RESPONSIBILITY_SEPARATION_RULES.ko.md`의 `의심 신호`와 `M28~M41 사전 재판정 기준`을 따른다.

## 즉시 수정 대상

| 우선순위 | 대상 | 해야 할 일 |
| --- | --- | --- |
| 1 | M35~M41 전체 | 기존 `completed`를 유지하지 않는다. 각 마일스톤은 원본 단위 매니페스트를 만들고 단위별 `implemented-verified`/`approved-excluded`/`blocked`/`scope-redesign-required`로 닫는다. |
| 2 | M29/M31/M33/M37/M38 | M29와 M31은 source-owner reclaim blocker가 확인됐고, 이후 correction에서 M29 101개와 M31 153개를 implemented-verified로 닫았다. M37/M38은 같은 source-owner 기준으로 실제 기능 closure가 남아 있다. |
| 3 | M30 수신 owner | M30은 완료. M30에서 excluded한 특수 item 200~214 및 item 22/90/91 plus item 211 계열은 M34-closed plus M41/M42/M43/M44에서 닫는다. |
| 4 | M32/M34/M35/M39/M41 | mapped-only 또는 source-file-review 완료를 금지하고, 원본 label/read/write/command 단위로 분해한다. |
| 5 | M34.5/M36/M40 | manifest-needed. 기존 구현 근거를 원본 단위 매니페스트로 재증명하거나 blocked로 되돌린다. |
| 6 | M42 | M35~M41 보강/정정 전에는 시작하지 않는다. |
