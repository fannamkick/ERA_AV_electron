# M28~M41 완료/미완료 사실 장부

## 2026-05-02 M29 strict closure update

M29 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M29-source-units.json`
- Closure: `data/coverage/milestones/M29-closure.json`
- Summary: total 206, implemented-verified 83, approved-excluded 123, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M29 ownedTotal is 83 purchase/listing/result rows, not the old mixed 206-row queue total.
- The 123 non-purchase/use/equipment/recruit/event/downstream rows are excluded from M29 ownership and remain assigned to receiving owner milestones.
- All 123 excluded rows now have explicit inbound responsibility in receiver manifests: M30 49, M31 48, M34 12, M35 2, M32 4, M37 2, M47 4, M48 1, M49 1.
- Newly added receiver rows are blocked, not completed: M32 +4, M37 +2, M47 +4, M48 +1, M49 +1.
- `npm run gate:shop-purchase-coverage` passes with source 206, M29-owned 83, implemented-verified 83, approved-excluded 123.
- `npm run gate:shop-purchase-coverage` now fails if an M29 transfer row is missing from the receiver manifest.
- `npm run gate:milestone-scope-closure -- M29` passes with `responsibilityIntegrity`.

## 2026-05-02 M28 strict closure update

M28 is now complete under the strict source-unit manifest rule.

- Manifest: `data/coverage/manifests/M28-source-units.json`
- Closure: `data/coverage/milestones/M28-closure.json`
- Summary: total 27, implemented-verified 24, approved-excluded 3, blocked 0, scope-redesign-required 0, completedAllowedNow true.
- M28 ownedTotal is 24 route contract rows, not the old mixed 27-row queue total.
- BOYFRIEND event-local session rows are excluded from M28 ownership and remain M47 responsibility.
- `npm run gate:milestone-scope-closure -- M28` passes with `responsibilityIntegrity`.

## 2026-05-02 M35-M41 source-unit manifest pass 1

Artifacts:
- `data/coverage/manifests/M35-source-units.json`
- `data/coverage/manifests/M36-source-units.json`
- `data/coverage/manifests/M37-source-units.json`
- `data/coverage/manifests/M38-source-units.json`
- `data/coverage/manifests/M39-source-units.json`
- `data/coverage/manifests/M40-source-units.json`
- `data/coverage/manifests/M41-source-units.json`

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | completable now | strict finding |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M35 | 8 | 0 | 7 | 1 | no | The old 7 save-field mapped rows are not completion evidence. Clock/hook/deadline/session cleanup units need direct source evidence or responsibility redesign. |
| M36 | 93 | 86 | 7 | 0 | no | The old 552 line rows are source evidence for 86 visit actions, not 552 completed units. Seven visit place definitions remain blocked. |
| M37 | 461 | 294 | 167 | 0 | no | 286 work feature rows and 8 work definitions are completion candidates. Save/session/calculation mapped rows remain blocked. |
| M38 | 6 | 0 | 6 | 0 | no | All six filming scene definitions are mapped-only, so none are completed under the strict rule. |
| M39 | 174 | 135 | 39 | 0 | no | 135 filming execution feature rows are completion candidates. Save/session/calculation/source-file-review mapped rows remain blocked. |
| M40 | 11 | 5 | 6 | 0 | no | Five training session lifecycle rows are completion candidates. Six wait/format/status mapped rows remain blocked. |
| M41 | 1,625 | 4 | 1,620 | 1 | no | Only four COMSEQ dynamic-call rows are completion candidates. COM_ABLE branch conditions, success returns, source programs, and COMORDER review remain unresolved. |

Next actions:
- M35: split `turn/end` into clock advance, mission deadline, scheduled event, weekly/monthly hook, world hook, and save boundary source units.
- M36: promote or block the seven visit place definitions with row-level runtime-consumed definition evidence.
- M37: promote or block 167 mapped save/session/calculation rows with owner-specific runtime/save verification.
- M38: re-verify the six scene definitions as source-unit definitions, not mapped rows.
- M39: decompose two source-file-review rows and verify 37 save/session/calculation mapped rows row-by-row.
- M40: close six mapped wait/format/status rows with source-unit evidence and responsibilityIntegrity.
- M41: do not complete COM_ABLE availability until branch/AST/state-reference verification exists.


이 문서는 gate가 아니다. 목적은 각 마일스톤에서 "완료했다고 처리한 것"과 "하지 않았거나 다른 마일스톤으로 넘긴 것"을 사람이 바로 보게 만드는 것이다.

완료/차단/책임 재설계 판정은 `RESPONSIBILITY_SEPARATION_RULES.ko.md`를 따른다.

작성 기준:
- `완료로 처리한 것`: runtime consumer와 coverage/gate/smoke 근거가 있는 것.
- `안 했거나 넘긴 것`: `transferredOut`, `mapped` 중 실제 기능 구현이 아닌 분류/owner 확정, 명시적으로 다음 마일스톤 소유로 남긴 것.
- `재확인 필요`: 문서 책임과 산출물 표현이 어긋나거나, 완료 판정이 너무 넓게 보이는 것.

현재 공통 상태:
- M28은 2026-05-02 strict closure 재검증 기준으로 통과했다.
- M30~M41? ?? coverage/gate/smoke? ?? ?? ??? ??? strict completion evidence? ????? ??. M29? strict closure? ?? manifest inbound ???? ????.
- M29~M41의 closure는 `responsibilityIntegrity` 보강 또는 blocked/scope-redesign-required 정정이 필요하다.
- 따라서 이 장부는 "기능 검증 결과가 존재한다"와 "현재 완료 판정은 보강 필요하다"를 분리해서 읽어야 한다.
- 2026-05-02 기준, `[구현]` 마일스톤의 `transferredOut`은 완료가 아니라 미완료 또는 책임 재설계 신호로 본다.

## 2026-05-02 원본 단위 매니페스트 기준 재판정

재판정 기준:
- `PORT_RESPONSIBILITY_MAP.ko.md`의 `스킵 방지 계약`에 따라 원본 단위 매니페스트가 없으면 완료 유지가 불가능하다.
- `[구현]` 마일스톤의 `mapped`, `source-file-review`, `transferredOut`, 예정 consumer/verification은 완료 근거가 아니다.
- 아래 판정은 "기존 구현이 모두 무효"라는 뜻이 아니라, "새 완료 기준으로 completed를 유지할 수 없음"을 뜻한다.

| M | 기존 closure 상태 | 새 판정 | M42 전 차단 | 핵심 사유 | 다음 조치 |
| --- | --- | --- | --- | --- | --- |
| M28 | completed, implemented 24, approved-excluded 3 | completed | 아니오 | strict closure 완료. `responsibilityIntegrity` 있음 | route/action/view 24개는 M28 소유 완료, event-local row 3개는 M47 책임으로 M28에서 approved-excluded |
| M29 | completed, implemented 83, approved-excluded 123 | completed | 아니오 | strict closure 완료. 수신 manifest inbound도 명시됨 | 구매형 listing/구매 결과 83개만 M29 완료로 세고 123개 비구매 row는 실제 owner manifest에서 blocked inbound로 추적 |
| M30 | blocked, ownedBlocker 37 | scope-redesign-required 유지 | 예 | 즉시 사용 item과 특수 item 200~214 훈련/의복 효과가 섞임 | M30은 즉시 사용 item 9개 owner로 좁히고 특수 item은 M34/M42/M43/M44에서 닫음 |
| M31 | completed, implemented 52, mapped 158, transferredOut 27 | scope-redesign-required | 예 | 영입 listing/생성 결과와 identity/lifecycle/event row가 섞임 | listing/가격/조건/생성 결과만 M31 매니페스트에 남기고 identity/CFLAG/hook/event row를 수신 owner로 재분리 |
| M32 | completed, implemented 286, mapped 8 | blocked | 예 | `source-file-review`와 mapped source contract가 완료를 대신함 | `zname.erb`, `c_club_girlname.erb`, `boyfriendname_calc.erb`를 label/동작 단위로 분해 |
| M33 | completed, implemented 4,768, mapped 465, transferredOut 67 | scope-redesign-required | 예 | seed/stat owner와 CFLAG/FLAG/PBAND 후속 owner가 섞임 | seed ingestion, 표시 정의, save field, 행동 결과 변화, CFLAG/FLAG/PBAND를 매니페스트에서 분리 |
| M34 | completed, implemented 1,998, mapped 234 | blocked | 예 | CFLAG/장비/의복 mapped row가 완료 근거로 남음 | CFLAG/관계/장비/의복 단위를 `implemented-verified` 또는 blocked로 재분류 |
| M34.5 | completed, implemented 188 | manifest-needed | 예 | gate hardening 자체의 원본 단위 매니페스트와 `responsibilityIntegrity` 없음 | 188개 hardening 단위가 어떤 gate/registry/evidence correction을 닫는지 매니페스트 작성 |
| M35 | completed, implemented 0, mapped 7 | blocked | 예 | `[구현]`인데 mapped-only 완료. turn hook/cleanup이 save field mapping으로만 표현됨 | `EVENT_TURNEND`, `EVENT_NEXTDAY`, `EVENT_AFTERTRAIN` 등 hook/order/effect 단위 매니페스트 작성 |
| M36 | completed, implemented 552, mapped 7 | manifest-needed | 예 | 방문 장소 definition mapped 7개와 원본 단위 매니페스트 없음 | 방문 장소 7개와 visit action 86개를 매니페스트로 재작성하고 mapped definition을 재증명 |
| M37 | completed, implemented 286, mapped 175 | scope-redesign-required | 예 | 업무 실행, 업무 정의, save-field owner, session/calculation owner가 섞임 | M37이 닫을 업무 실행 단위와 다른 owner 단위를 매니페스트에서 분리 |
| M38 | completed, implemented 0, mapped 6 | scope-redesign-required | 예 | 촬영 장면 정의만 mapped이고 대상/장면 조건/불가 사유/예상 결과 책임이 분리되지 않음 | 장면 정의와 조건/불가 사유/예상 결과 단위를 분리한 매니페스트 작성 |
| M39 | completed, implemented 135, mapped 39 | blocked | 예 | `AV_POINTCALC.ERB`, `VIDEO.ERH` source-file-review 2개가 파일 단위 mapped로 남음 | 파일 단위 row를 label/read/write/계산 단위로 분해 |
| M40 | completed, implemented 5, mapped 6 | manifest-needed | 예 | training session mapped 6개와 원본 단위 매니페스트 없음 | `EVENTTRAIN`, `EVENTCOM`, `EVENTCOMEND`, `EVENTEND`, `JUEL_CHECK`, 표시 helper 단위를 재증명 |
| M41 | completed, implemented 1,371, mapped 254 | blocked | 예 | `COMORDER.ERB` source-file-review와 mapped availability row가 완료 근거로 남음 | `COMORDER.ERB`를 command/order 단위로 분해하고 254 mapped row를 재분류 |

재판정 결론:
- M28은 strict closure 완료 상태다.
- M42는 아직 시작하면 안 된다.
- 다음 작업은 M29부터 순서대로 매니페스트 보강/책임 재설계/blocked closure 정정을 수행하거나, M42에 직접 영향을 주는 M40~M41을 먼저 보강하는 별도 순서를 명시적으로 선택하는 것이다.

## 2026-05-02 M28~M30 source-unit manifest 1차 산출

산출물:
- `data/coverage/manifests/M28-source-units.json`
- `data/coverage/manifests/M29-source-units.json`
- `data/coverage/manifests/M30-source-units.json`

이 산출물은 완료 선언이 아니라 완료용 기준이다. 기존 coverage row를 원본 단위 후보로 옮기되, `mapped`, `transferred-out`, disabled route contract, 예정 verification은 완료 상태로 세지 않았다.

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | 현재 완료 가능 | 핵심 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M28 | 27 | 24 | 0 | 0 | 예 | strict closure 완료. SHOP_MAIN menu row 24개는 route contract로 구현 검증했고, BOYFRIEND session row 3개는 M28 approved-excluded 및 M47 책임으로 기록했다. |
| M29 | 206 | 83 | 0 | 123 | 예 | 구매형 listing/flow/result 83개는 implemented-verified. 비구매/사용/장비/영입/이벤트 123개는 M29 approved-excluded이며 수신 manifest에 blocked inbound로 명시됐다. |
| M30 | 74 | 21 | 16 | 37 | 아니오 | 즉시 사용 item flow/effect 21개만 완료 후보. mapped 16개는 직접 검증 단위로 승격해야 하고, 특수 item 200~214 및 item 22/90/91 계열 37개는 실제 owner에서 닫아야 한다. |

다음 조치:
- M28: 완료. closure에 `responsibilityIntegrity`를 추가했고, M28 ownedTotal은 main route contract 24개로 고정했다. BOYFRIEND session row 3개는 M47 책임으로 남긴다.
- M29: 구매형 listing/flow manifest로 closure를 재작성한다. mapped 40개는 listing/flow의 하위 검증으로 승격하거나 blocked로 둔다.
- M30: 즉시 사용 item 9개 owner로 scope를 좁히고, 특수 item 200~214 및 item 22/90/91은 M34/M41/M42/M43/M44 manifest에서 닫는다.

## 2026-05-02 M31~M34.5 source-unit manifest 1차 산출

산출물:
- `data/coverage/manifests/M31-source-units.json`
- `data/coverage/manifests/M32-source-units.json`
- `data/coverage/manifests/M33-source-units.json`
- `data/coverage/manifests/M34-source-units.json`
- `data/coverage/manifests/M34.5-source-units.json`

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | 현재 완료 가능 | 핵심 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M31 | 237 | 52 | 158 | 27 | 아니오 | 영입 listing/flow 52개만 완료 후보. session buffer/visible listing/source contract/template seed 158개는 직접 검증 단위로 승격해야 하고, lifecycle/CFLAG/event/time 27개는 실제 owner로 이동해야 한다. |
| M32 | 294 | 286 | 8 | 0 | 아니오 | Chara identity/lifecycle 286개는 완료 후보. CSTR label 5개와 `ZNAME.ERB`/`C_CLUB_GIRLNAME.ERB`/`BOYFRIENDNAME_CALC.ERB` source-file-review 3개는 blocked다. |
| M33 | 5,300 | 4,768 | 465 | 67 | 아니오 | Chara `BASE/ABL/TALENT/EXP` seed 4,768개는 완료 후보. 표시 정의/save field 465개는 직접 검증으로 승격해야 하고, CFLAG/FLAG/PBAND 67개는 M34 scope로 이동해야 한다. |
| M34 | 2,235 | 1,998 | 237 | 0 | 아니오 | CFLAG/RELATION seed와 wardrobe route 1,998개는 완료 후보. mapped 234개와 M30에서 넘어온 item 211 definition/save/session 3개가 blocked다. |
| M34.5 | 189 | 188 | 1 | 0 | 아니오 | evidence correction 169개와 registry contract 19개는 hardening 완료 후보. 새 기준상 M34.5 closure의 `responsibilityIntegrity`가 없어 1개 blocked다. |

다음 조치:
- M31: listing/가격/조건/생성 결과만 M31 완료 단위로 남기고 template seed, source-file-review, 후속 lifecycle/event row를 분리한다.
- M32: source-file-review 3개를 label/동작 단위로 분해하고, event random-name logic은 M47로 이동한다.
- M33: seed owner와 표시/save-field owner를 직접 검증 단위로 승격하고, CFLAG/FLAG/PBAND는 M34 manifest에서 닫는다.
- M34: item 211 누락 3개와 mapped 234개를 구현/검증하거나 blocked로 유지한다.
- M34.5: hardening closure에 `responsibilityIntegrity`를 추가하거나 새 기준으로 blocked를 유지한다.

| M | 완료로 처리한 것 | 안 했거나 넘긴 것 | 재확인 필요 |
| --- | --- | --- | --- |
| M28 | 메인 메뉴 route/action/view 24개를 연결하고 `smoke:main-routes`로 확인했다. | BOYFRIEND event-local screen session row 3개는 M47로 넘겼고 M28에서는 approved-excluded로 닫았다. | strict closure 완료. `responsibilityIntegrity` 포함. |
| M29 | 구매형 상점 listing 30개, 가격/노출/구매 성공/실패/취소, 돈/인벤토리 반영을 구현했다. strict 기준 implemented-verified 83. | 123개 row는 구매가 아닌 사용/장비/영입/이벤트 등 다른 owner로 넘겼고, 전부 수신 manifest에 blocked inbound로 명시했다. | 수신 owner가 각 row를 구현/제외/재설계하기 전까지 해당 milestone은 완료되지 않는다. |
| M30 | 즉시 사용 아이템 30/31/38/39/40/41/42/43/52의 선택, 대상 지정, 성공/실패/취소, 저장 반영 경로를 구현했다. coverage 기준 implemented 21, mapped 16. | 37개 owned row가 M34/M41/M42/M43/M44 계열로 남아 있으며, 특수 item 200~214의 실제 소비는 M30에서 구현되지 않았다. | M30은 2026-05-02 재판정 기준 `blocked`다. `transferredOut` 37개는 완료 근거가 아니라 `ownedBlocker` 37개로 기록한다. item 213은 `COMF137.ERB`라 기존 M42~M44 range 설계도 재확인해야 한다. |
| M31 | 영입 listing 48개, 반복 영입 제한, 인물 생성 결과를 구현했다. coverage 기준 implemented 52, mapped 158. | 27개 row는 후속 owner로 넘겼다. mapped 158개는 실제 생성 로직이 아니라 identity/정의/owner 확정 성격이 섞여 있다. | mapped와 transferredOut이 실제 미구현을 숨기지 않는지 재확인 필요. |
| M32 | Chara template 109개, CSTR seed, retired/deleted lifecycle, 표시 identity를 연결했다. coverage 기준 implemented 286, mapped 8. | identity 외 효과/상태 변화는 다른 owner가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M33 | BASE/ABL/TALENT/EXP/MARK/PALAM 계열 seed와 body/stat owner를 대량 연결했다. coverage 기준 implemented 4,768, mapped 465. | 67개 row는 후속 owner로 넘겼다. 표시/계산 전용 row는 실제 행동 효과 구현이 아니다. | 대량 implemented row가 "seed 소비"인지 "행동 효과 구현"인지 구분해서 읽어야 한다. |
| M34 | CFLAG, 관계, 장비, 의복 상태를 social/equipment/wardrobe owner로 분해했다. coverage 기준 implemented 1,998, mapped 234. | CFLAG seed 소비와 의복 route 외 이벤트/훈련/미션 효과는 후속 owner가 소유한다. | mapped 234개가 완료성 기능 구현으로 오독되지 않게 해야 한다. |
| M34.5 | hardening용 registry와 final verify skeleton, auxiliary evidence 차단을 추가했다. coverage-hardening gate는 통과한다. 이후 M28~M34 registry contract도 추가되어 M28~M52 registry enforcement gap은 해소되었다. | 당시에는 M28~M34 registry contract가 없었지만 현재 기준에서는 해소됨. | hardening gate 자체가 새 `responsibilityIntegrity` closure 기준을 검증하지 않는다. |
| M35 | 턴 진행, 날짜/주차/월/년 갱신, 장기 턴 smoke를 구현했다. coverage 기준 mapped 7. | coverage에는 implemented 0으로 기록되어 있고, hook/자동 처리 책임이 save field mapping 7개로만 표현된다. | 문서 책임 범위가 넓으므로 실제 hook/자동 구매/미션/이벤트/session cleanup 근거를 별도 사실 장부로 풀어야 한다. |
| M36 | 방문 장소 7개와 방문 action 86개, 비용/해금/진행 row를 구현했다. coverage 기준 implemented 552, mapped 7. | 방문 이후 이벤트/세계 hook은 후속 owner가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M37 | 업무/창관/특수 업무 실행 80개, 조건/결과/턴 종료를 구현했다. coverage 기준 implemented 286, mapped 175. | mapped 175개는 source label/definition/owner 확정 성격이 섞여 있다. | mapped row가 결과 계산 누락을 숨기지 않는지 재확인 필요. |
| M38 | 촬영 장면 정의 6개와 장면 조건 table을 연결했다. coverage 기준 mapped 6. | 실제 촬영 실행/수익/판매는 M39가 소유한다. | implemented 0, mapped 6만으로 "촬영 정의 완성"을 닫았으므로 조건/예상 결과가 runtime에서 충분히 검증되는지 재확인 필요. registry에 smoke 필수도 빠져 있다. |
| M39 | 촬영 실행, 수익, 팬, 점수, 출시/판매 상태를 구현했다. coverage 기준 implemented 135, mapped 39. | source-file-review 2개가 파일 단위 mapped 완료로 남아 있다. | source-file-review는 라벨/row 수준으로 분해됐는지 재감사해야 한다. |
| M40 | 훈련 대상/실행자/조수/command 선택, session lifecycle, 완료 후 cleanup을 구현했다. coverage 기준 implemented 5, mapped 6. | command 효과와 availability는 M41~M44가 소유한다. | closure에 `responsibilityIntegrity`가 없다. |
| M41 | 훈련 command availability 105개와 불가 사유를 구현했다. coverage 기준 implemented 1,371, mapped 254. | command 효과 계산은 M42~M44가 소유한다. `COMORDER.ERB` source-file-review 1개가 mapped 완료로 남아 있다. | registry에 `smoke:training-availability` 필수가 빠져 있고, source-file-review 분해 재감사가 필요하다. |

## 즉시 보강할 항목

- M29~M41 closure에 `responsibilityIntegrity`를 기계적으로 추가하지 않는다. 먼저 이 장부의 `재확인 필요`를 해소하거나 blocked로 적는다. M28은 strict closure 완료 상태다.
- M30은 blocked로 재판정했다. 책임 분리 기준상 맞는 방향은 M30을 "즉시 사용 아이템 9개" owner로 공식 재설계하고, 특수 item 200~214는 M34/M42/M43/M44 계열 실제 소비 owner에서 닫는 것이다.
- M35의 넓은 책임을 save field mapping 7개가 아니라 runtime hook/cleanup별 사실로 풀어 적는다.
- M38/M41 registry에 smoke 필수 누락을 기록한다.
- M39/M41의 `source-file-review` mapped 완료 row를 분해하거나 미완료로 되돌릴지 결정한다.
