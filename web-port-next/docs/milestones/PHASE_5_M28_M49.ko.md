# Phase 5. M28~M49 상세 마일스톤

기능군별 전수 구현: route, 상점, 아이템, 영입, 인물, 상태, 턴, 방문, 업무, 촬영, 훈련, 미션, 이벤트, 엔딩, 정보.

완료 판정은 이 문서만으로 하지 않는다. 원본 파일, coverage/gap/closure JSON, 전용 gate/smoke/build가 최종 권위다.

## 페이즈 책임

Phase 5는 기능군별 runtime behavior를 실제 구현한다. 각 마일스톤은 자기 기능군의 원본 동작을 source evidence, runtime consumer, verification으로 끝내야 하며, 다른 owner 책임을 완료로 가져오지 않는다.

| M | 호출 책임 | 이 마일스톤이 끝내지 않는 것 |
| --- | --- | --- |
| M28 | 원본 메인 화면 route/action/view를 전수 연결한다. | 이벤트/세계 진행 결과 |
| M29 | 구매형 상점 listing과 구매 결과를 전수 구현한다. | 즉시 사용/장비/이벤트 item 효과 |
| M30 | 즉시 사용 아이템 9개의 사용 flow와 효과를 구현한다. | 특수 item 200~214 의복/훈련 효과 |
| M31 | 영입 listing 전체와 인물 생성 결과를 구현한다. | 인물 identity 세부 표시와 후속 이벤트 |
| M32 | 인물 원형과 identity/lifecycle을 구현한다. | 행동 결과로 변하는 능력/상태 |
| M33 | 신체/능력/소질/경험 seed와 표시/저장 owner를 구현한다. | 훈련/업무/촬영 효과 계산 전체 |
| M34 | 관계/CFLAG/장비/의복 owner를 구현한다. | 이벤트/훈련/미션 효과 전체 |
| M34.5 | M35 이후 완료 차단 gate를 실제 script로 강화한다. | 기능군 구현 |
| M35 | 턴 종료, 시간 진행, hook 순서, session cleanup을 구현한다. | hook이 호출하는 각 기능군 내부 효과 |
| M36 | 방문 장소, 시설, 장소별 행동, 해금/비용/결과를 구현한다. | 세계 이벤트 전체 |
| M37 | 업무/창관/특수 업무 조건과 결과를 구현한다. | 이벤트/미션 전체 |
| M38 | 촬영 장면 정의, 대상 조건, 장면 조건을 구현한다. | 촬영 실행/판매 결과 |
| M39 | 촬영 실행, 수익, 팬, 점수, 출시/판매 상태를 구현한다. | 세계 이벤트/엔딩 영향 전체 |
| M40 | 훈련 대상/실행자/조수/command 선택 session lifecycle을 구현한다. | availability와 command 효과 |
| M41 | 훈련 command availability와 불가 사유를 구현한다. | command 효과 계산 |
| M42 | `Train.csv` command 0~34에 연결된 `COMF*.ERB` 효과 source, 특수 item 소비, 결과 반영을 구현한다. | command 35 이상과 전체 후처리 |
| M43 | `Train.csv` command 35~69에 연결된 `COMF*.ERB` 효과 source, 특수 item 소비, 결과 반영을 구현한다. | command 70 이상과 전체 후처리 |
| M44 | command 70 이상과 번호 범위 밖에서 소비되는 훈련 효과 source 전체, 공통 후처리를 구현한다. | 훈련 외 이벤트/엔딩 전체 |
| M45 | 능력 상승, 휴식, 회복, 자동 아이템, 공통 유지보수를 구현한다. | 미션/이벤트/엔딩 |
| M46 | 미션 전체 lifecycle을 구현한다. | 세계 이벤트 전체와 엔딩 판정 |
| M47 | 세계/이벤트/스토리 trigger, condition, effect, hook을 구현한다. | 엔딩/meta 저장 전체 |
| M48 | 엔딩, 계승, global/meta 상태를 구현한다. | 정보/도움말/설정 UI 전체 |
| M49 | 정보/도움말/설정/view/text와 명시적으로 M49 intake된 잔여 기능만 닫는다. | 전체 저장/로드와 최종 판정, owner 불명 기능의 은폐 |

## 스킵 방지 규칙

각 마일스톤은 시작 전에 `원본 단위 매니페스트`를 만든다. 매니페스트에는 해당 호출이 닫아야 하는 원본 파일/라벨/CSV row/상태 주소/route/action/view/검증 단위를 적는다.

- 매니페스트에 없는 단위는 완료했다고 말할 수 없다.
- 매니페스트의 모든 단위는 `implemented-verified`, `approved-excluded`, `blocked`, `scope-redesign-required` 중 하나로 닫는다.
- `[구현]` 마일스톤은 `mapped`, `source-file-review`, `transferredOut`, 예정 consumer/verification만으로 완료할 수 없다.
- 다른 owner 책임이 발견되면 먼저 매니페스트와 책임 범위를 다시 나누고, 기존 체크박스는 완료 근거로 쓰지 않는다.
- closure/gap/progress에는 매니페스트 경로, 단위별 상태, blocked/scope-redesign-required 목록, 실행한 gate/smoke/build를 남긴다.

## 상세 마일스톤

## M28. [구현] 메인 화면과 route 전수 연결

책임 선언:
- 역할: 원본 메인 화면에서 직접 도달 가능한 기능 route를 전수 연결한다.
- 범위: 훈련, 영입, 아이템, 업무, 촬영, 방문, 능력 상승, 미션, 저장/로드, 설정/정보/엔딩 route다.
- 방식: 각 메뉴의 표시, enabled/disabled, action, route 전환, 종료 지점을 구현하거나 사용자 승인 제외로 닫는다. blocker는 완료 차단 상태로만 기록한다.
- 완료 결과: 메인 화면에서 기능군 진입 경로가 누락 없이 정리된다.
- 누락 차단: 표시만 있고 action 없는 메뉴, dead-end route, coverage 미갱신 메뉴가 남으면 완료하지 않는다.

- [x] M27 implementation queue의 `unit:M28:main-route`를 기준으로 M28 소유 row 27개를 읽음
- [x] 원본 메인 화면 선택지 24개를 `definitions.mainMenuOptions`로 연결하고 `main-route-coverage.json`에 모두 기록
- [x] 12개 enabled 메뉴를 actionId, routeId, view consumer, dispatch consumer, smoke 검증과 연결
- [x] 12개 disabled 메뉴를 disabledReason과 향후 owner milestone로 고정
- [x] 훈련, 영입, 아이템, 업무, 촬영, 방문, 미션, 저장/로드, 인물 목록, 턴 종료 route를 실제 dispatch로 연결
- [x] 능력 상승, 정렬, 설정/정보/엔딩/디버그 계열은 M32/M34/M45/M47/M48/M49 owner를 가진 disabled route contract로 기록
- [x] 각 메뉴의 enabled/disabled 조건을 `buildMainMenuView`의 view 계산으로 구현
- [x] 각 메뉴의 표시 이름과 원본 근거를 ERB 기반 정의 데이터와 sourceEvidenceId에 연결
- [x] route 진입 action이 저장 상태를 직접 바꾸지 않는지 검증. 단 `turn/end`는 M35 owner의 의도된 저장 변경으로 분리
- [x] enabled 메뉴 12개가 성공/취소 후 지정된 끝점으로 돌아가는지 `smoke:main-routes`로 검증
- [x] M28 범위 밖 BOYFRIEND NTR event-local screen session row 3개를 M47로 책임 이관하고 transferReason을 기록
- [x] 기능군별 `data/coverage/audits/M28-gap-audit.json` 산출물 생성
- [x] `data/coverage/milestones/M28-closure.json` strict closure 갱신. ownedTotal 24, implemented 24, transferredOut 0, blocker/missing/unapproved 0, `responsibilityIntegrity` 포함
- [x] `data/coverage/manifests/M28-source-units.json` strict closure 갱신. total 27, implemented-verified 24, approved-excluded 3, blocked 0, scope-redesign-required 0, completedAllowedNow true
- [x] `npm run coverage:main-routes` 실행
- [x] `npm run gate:main-route-coverage` 실행
- [x] `npm run gate:milestone-scope-closure -- M28` 실행
- [x] `npm run smoke:main-routes` 실행
- [x] `npm run build` 실행

## M29. [구현] 아이템 상점과 구매 완성

현재 strict 기준:
- 이 섹션의 기존 체크는 legacy coverage/gate/smoke 통과 기록이다.
- M29는 아직 strict closure 완료가 아니다.
- 다음 작업은 `data/coverage/manifests/M29-source-units.json` 기준으로 구매형 listing/flow만 M29 소유로 남기고, 비구매/사용/장비/영입/이벤트 row를 approved-excluded, blocked, 또는 수신 owner 책임으로 재정리하는 것이다.
- strict 완료 전에는 `data/coverage/milestones/M29-closure.json`의 old ownedTotal 206 / transferredOut 123 기록을 완료 근거로 쓰지 않는다.

책임 선언:
- 역할: 구매형 아이템과 상점 구매 흐름을 전수 구현한다.
- 범위: 모든 구매형 listing, 가격, 표시명, 구매 조건, 수량 제한, 돈 부족, 취소, 자동 구매 후보 포함이다.
- 방식: 상점 노출/해금은 shop progress와 view 계산으로, 보유 수량은 inventory로 분리한다.
- 완료 결과: 구매형 item 전체가 성공/실패/취소와 저장 roundtrip을 통과한다.
- 누락 차단: 인벤토리 수량, 상점 진행 상태, 현재 선택 session이 섞이면 완료하지 않는다.

- [x] M27 implementation queue의 `unit:M29:shop-purchase`를 기준으로 M29 소유 row 206개를 읽음
- [x] `SHOP_ITEM.ERB`에서 실제 구매형 listing으로 닫을 item 30개를 확정하고 `definitions.shopListings`로 연결
- [x] M20에서 구매형으로 과분류된 즉시 사용/특수 item, 코스프레 pack, 방문/이벤트 특수 item을 M30/M34/M36/M49 owner로 책임 이관
- [x] 모든 M29 구매형 아이템의 표시 이름, 가격, 분류를 정의 데이터와 연결
- [x] 모든 M29 구매형 아이템의 구매 성공, 돈 부족 실패, 수량 제한 실패, 숨김 listing 선택 실패, 취소를 구현
- [x] `SALEITEM_CHECK`의 핵심 노출 조건을 view/session 계산으로 구현. 단일 보유품 숨김, trait 93 조건, 조합지식 조건, 복수 구매 최대 보유 수량을 검증
- [x] `ITEMSALES`는 저장 상태가 아니라 `session.shop.visibleListingIds` 계산값으로 처리하고, 구매 성공 후 새 save 기준으로 재계산
- [x] `BOUGHT`는 저장 상태가 아니라 `session.shop.selectedItemId` 선택값으로 처리하고, 구매 성공/취소 시 폐기
- [x] 인벤토리 수량, 상점 노출/진행 상태, 현재 선택 session을 분리 검증
- [x] 자동 구매/즉시 사용/특수 효과 대상은 M30/M34/M36/M49로 이관하고 transferReason을 기록
- [x] 구매 결과 저장 roundtrip을 검증하고 save payload에 `BOUGHT`, `ITEMSALES`, `selectedItemId`, `visibleListingIds`가 들어가지 않음을 확인
- [x] `data/coverage/shop-purchase-coverage.json` 생성. M29 queue 206행 전부 구현/소비/이관으로 닫음
- [x] `data/coverage/audits/M29-gap-audit.json` 생성. unresolved gap 0, owned blocker 0
- [x] `data/coverage/milestones/M29-closure.json` 생성. ownedTotal 206, implemented 43, mapped 40, transferredOut 123, blocker/missing/unapproved 0
- [x] `npm run coverage:shop-purchase` 실행
- [x] `npm run gate:shop-purchase-coverage` 실행
- [x] `npm run gate:milestone-scope-closure -- M29` 실행
- [x] `npm run smoke:item-shop` 실행
- [x] `npm run smoke:phase1` 실행
- [x] `npm run build` 실행

## M30. [구현/차단] 즉시 사용 아이템 구현과 특수 훈련 아이템 책임 재판정

책임 선언:
- 역할: 즉시 사용 아이템의 조건과 효과를 구현한다. 기존 M30 accounting에 들어온 특수 훈련 아이템 200~214는 현재 책임 충돌로 차단한다.
- 범위: 즉시 사용 조건, 사용 효과, 실패/취소 경로다. 특수 item 200~214의 훈련 효과는 원본 COMF 훈련 command에서 `ITEM:200`~`ITEM:214` 조건으로 소비되므로 M30 완료로 계산하지 않는다.
- 방식: 효과는 inventory/people/body/world/mission/settings/equipment 등 정확한 owner에만 반영한다.
- 완료 결과: 현재 완료 아님. `transferredOut` 37개를 `ownedBlocker`로 기록했으므로 M30 closure/gate는 실패해야 한다.
- 누락 차단: no-op handler, owner transfer, 효과 owner 불명확, 특수 훈련 item 효과 미구현이 남으면 완료하지 않는다.

- [x] 즉시 사용 아이템 30/31/38/39/40/41/42/43/52의 사용 조건과 효과를 구현
- [x] 즉시 사용 아이템 효과가 `inventory`, `people`, `body`, `run`, `featureState` 등 정확한 owner에 반영되는지 검증
- [ ] 특수 item 200~214의 실제 소비를 구현하거나 M30 책임에서 제거하는 공식 재설계를 완료
- [ ] item 22/90/91 및 특수 item 200~214 transfer 37개를 완료 근거가 아닌 blocker로 해소
- [x] 즉시 사용 아이템의 사용 실패, 중복 사용, 조건 미충족, 취소 경로를 검증
- [x] 즉시 사용 아이템 사용 후 저장 roundtrip을 검증
- [x] M30 coverage를 재생성해 `ownedBlocker: 37`, `status: blocked`로 기록
- [ ] M30 완료 gate 통과
- [ ] `npm run build` 실행

M30 재판정 기록:
- M30 owned scope는 현재 closure 기준 `unit:M30:item-use`와 M29 inbound transfer를 합쳐 ownedTotal 74행이다.
- 즉시 사용 아이템 30/31/38/39/40/41/42/43/52는 `session.shop.visibleUseItemIds`, `shop/selectUseItem`, `shop/selectUseTarget`, `shop/confirmUseItem`, `shop/cancelUseItem`으로 실제 소비된다.
- 특수 item 200~214는 구매 listing이나 `ITEMSALES`가 아니라 `specialTrainingItemIds`와 `inventory.itemCounts` 기반 특수 장비/해금 상태로 분류했다. 이것은 효과 구현 완료가 아니다.
- 원본 대조 결과 특수 item 200~210/212~214 대부분은 `COMFxx.ERB` 훈련 효과 스크립트에서 소비되고, item 211은 `COSPLAY.ERB` 의복 흐름에서 소비된다. 현재 transfer target은 M34/M42/M43/M44 계열로 다시 분해했다.
- item 213은 `COMF137.ERB`에서 소비된다. 따라서 기존 M42~M44의 "0~104 command" 범위만으로는 전체 훈련 효과 포팅이 닫히지 않는다.
- item 22/90/91은 M30 사용형 아이템이 아니라 훈련 가능 조건을 여는 아이템이므로 M41로 남겼다.
- cosplay/clothing pack은 M29에서 M34로 이관되어 M30 소유 범위가 아니다.
- 2026-05-02 재판정에서 M30 closure는 `status: blocked`, `ownedBlocker: 37`로 바뀌었다. 기존 "특수 아이템 완성" 완료 선언은 무효다.
- `npm run gate:item-use-coverage`와 `npm run gate:milestone-scope-closure -- M30`은 이 blocker가 해소될 때까지 실패해야 한다.

검증:

```bash
npm run coverage:item-use
npm run gate:item-use-coverage
npm run gate:milestone-scope-closure -- M30
npm run smoke:item-use
npm run smoke:item-shop
npm run build
npm run test --if-present
```

## M31. [구현] 영입 listing과 인물 생성 완성

책임 선언:
- 역할: 영입 listing 전체를 인물 원형과 생성 결과로 연결한다.
- 범위: 모든 영입 listing, 가격, 표시 조건, 중복/인원/돈/조건 실패, 취소, 생성 결과다.
- 방식: 성공 시 people/body/social/equipment 초기 상태를 만들고 listing-template 연결을 검증한다.
- 완료 결과: 영입 가능한 항목 전체가 생성 결과 또는 사용자 승인 제외를 갖고 소유 blocker 0개 상태가 된다.
- 누락 차단: listing과 캐릭터 원형 연결 누락 또는 생성 owner 누락이 있으면 완료하지 않는다.

- [x] 모든 영입 listing의 표시 조건, 가격, 생성 결과를 구현
- [x] 영입 listing과 캐릭터 원형 연결 누락 0개 확인
- [x] 중복 영입, 인원 제한, 돈 부족, 조건 미충족, 취소를 검증
- [x] 영입 성공 시 `people`, `body`, `social`, `equipment` 초기 상태를 생성
- [x] 영입 후 메인 화면, 정보 화면, 저장 roundtrip을 검증
- [x] 영입 불가 또는 제외 항목은 사용자 승인 근거를 남기고, 미승인 blocker가 있으면 완료하지 않음
- [x] M20/M24/M25 coverage의 영입 관련 status 갱신
- [x] `npm run build` 실행

M31 완료 근거:
- `Item.csv` 영입 listing 48개를 전수 확인했다. `100~146`은 `Chara 1~47`, `150`은 `Chara 51`로 연결한다.
- `recruit:150` 구인광고는 원본 `FLAG:90 < 5` 흐름에 맞춰 5회 반복 영입으로 닫고, 각 인스턴스는 `character:51:n`으로 저장한다.
- `SELL_CHARA.ERB` 은퇴/매각 및 `CSTR` save row 중 M32 owner 20개는 인물 생명주기/identity owner로 이관했다. 나머지 transfer는 M34/M35/M47 owner로 남긴다.
- `TFLAG:100`, `TFLAG:400~421`, `TFLAG:430~431`, `TSTR:50~51`은 save가 아니라 `session.recruit` 버퍼로 소비한다.

검증:
```bash
npm run coverage:recruit
npm run gate:recruit-coverage
npm run gate:milestone-scope-closure -- M31
npm run smoke:recruit-all
npm run smoke:m7
npm run smoke:main-routes
npm run typecheck
npm run build
npm run test --if-present
```

## M32. [구현] 인물 원형과 identity 완성

책임 선언:
- 역할: 인물 원형과 identity 정보를 정의/저장 경계에 맞게 완성한다.
- 범위: 109개 Chara template, 이름, 호칭, 별명, 표시명, 삭제/은퇴/조수/영입 가능 상태다.
- 방식: 변하지 않는 정의와 플레이 중 변하는 인스턴스 상태를 분리한다.
- 완료 결과: 원형에서 인스턴스를 생성하고 정보 표시와 저장 roundtrip이 통과한다.
- 누락 차단: 정의 문자열과 플레이 상태가 같은 save 필드에 섞이면 완료하지 않는다.

- [x] M20 Chara template 109개 전체를 생성 가능한 캐릭터 원형으로 연결
- [x] 이름, 호칭, 별명, 표시 이름을 정의 데이터와 저장 상태 경계에 맞게 분리
- [x] 원형 정의와 플레이 중 인물 인스턴스를 구분
- [x] 삭제, 은퇴, 조수 가능, 영입 가능 상태를 저장 필드로 분리
- [x] 캐릭터 정보 화면에서 identity 값 표시를 검증
- [x] 원형에서 인스턴스 생성 후 저장 roundtrip을 검증
- [x] Chara seed 중 identity 관련 row의 coverage status 갱신
- [x] `npm run build` 실행

M32 완료 근거:
- M32 scope는 implementation queue 274개와 M31 inbound transfer 20개를 합친 294개 row다.
- Chara template 109개는 `definitions.characters` 원형에서 `createCharacterBundleFromSpecs`를 통해 `people.characters.*.identity` 인스턴스로 생성된다.
- `CSTR` seed 157개는 원형의 `initialState.characterTexts`에 남고, 생성 시 save 상태의 `identity.profileTextSlots`로 복사된다. `CSTR:9`는 `firstPerson`으로도 노출한다.
- `NAME/CALLNAME/NICKNAME` 계열은 정의 문자열과 인스턴스 identity를 분리하고, roster view에서 표시를 검증한다.
- 삭제/은퇴/조수 가능/영입 상태는 `CharacterLifecycleState`의 `deleted`, `retired`, `assistantEligible`, `recruitmentStatus`로 분리했다.
- `SELL_CHARA.ERB`에서 넘어온 M32 lifecycle row는 `characterLifecycle` helper와 roster/work/shooting/training active 판정으로 소비한다.

검증:
```bash
npm run coverage:character-identity
npm run gate:character-identity
npm run gate:milestone-scope-closure -- M32
npm run smoke:character-identity
npm run smoke:recruit-all
npm run typecheck
npm run build
npm run test --if-present
```

## M33. [구현] 신체/능력/소질/경험 완성

책임 선언:
- 역할: 신체, 능력, 소질, 경험, 각인, 파라미터 초기값과 변화 owner를 완성한다.
- 범위: BASE, ABL, TALENT, EXP, MARK, PALAM 계열과 표시/계산 정의다.
- 방식: 표시 정의와 저장 수치를 분리하고 업무/촬영/훈련 결과가 같은 body/people 필드를 쓰게 한다.
- 완료 결과: 초기값과 증가/감소 계산, 정보 화면, 저장 roundtrip이 일관된다.
- 누락 차단: 표시 정의와 저장 수치가 섞이거나 중복 필드로 결과가 흩어지면 완료하지 않는다.

- [x] Chara seed의 `BASE`, `ABL`, `TALENT`, `EXP`, `MARK`, `PALAM` 계열을 owner별로 연결
- [x] 능력, 기초치, 소질, 경험, 각인, 파라미터 초기값을 표시 정의와 저장 수치로 분리
- [x] 신체/생식/성적 이력/오염/자원 상태를 `body` 하위 객체로 분리
- [x] 업무, 촬영, 훈련 결과가 같은 신체 필드를 공유하는지 검증
- [x] 값 범위, 레벨 표시, 증가/감소 계산 기준을 정의 데이터와 연결
- [x] 인물 정보 화면과 저장 roundtrip을 검증
- [x] M20/M24 coverage의 body 관련 status 갱신
- [x] `npm run build` 실행

M33 완료 근거:
- M33 scope는 M27 implementation queue의 `unit:M33:body-stat` 5,283행과 M33 본문 필수 범위인 `Palam.csv` training param 정의 17행을 합쳐 총 5,300행이다.
- `BASE` Chara seed 1,408행은 `createPeopleBaseStatsFromTemplate`와 `createBodyStateFromTemplate`에서 people 일반 base stat과 body base/body result stat으로 분리된다.
- `ABL` seed 660행, `TALENT` seed 2,435행, `EXP` seed 265행은 `createCharacterBundleFromSpecs`를 통해 `people.characters.*.attributes`의 abilities, traits, experiences로 연결된다.
- `BASE.csv` 23개, `Abl.csv` 34개, `Talent.csv` 261개, `exp.csv` 82개, `Mark.csv` 4개, `Palam.csv` 17개 정의는 표시 정의와 runtime consumer 근거를 가진다.
- M24 save mapping 중 `BASE/MAXBASE/EXP/MARK` 44행은 body/people save field로 소비된다.
- M33 queue에 섞여 있던 `CFLAG/FLAG/PBAND` 67행은 M34 관계/CFLAG/장비 owner 범위이므로 `fromMilestone=M33`, `toMilestone=M34`, `transferReason`, `sourceEvidenceId`, `acceptedByOwner`를 가진 transfer로 이관했다.
- 업무, 촬영, 훈련 결과 반영은 `src/features/bodyStats.ts`의 공통 helper를 사용한다. 업무/촬영의 `bodyStatDeltas`, 훈련의 `bodyStatDeltas`, `paramDeltas`, `resourceDeltas`가 같은 `body.byCharacterId.*` 필드를 갱신한다.
- roster view는 인물별 ability/trait/experience/body stat/condition param/resource/imprint count를 읽기 전용 summary로 노출한다.
- `data/coverage/body-stat-coverage.json`, `data/coverage/audits/M33-gap-audit.json`, `data/coverage/milestones/M33-closure.json`을 생성했다. closure는 ownedTotal 5,300, implemented 4,768, mapped 465, transferredOut 67, blocker/missing/unapproved 0이다.

검증:

```bash
npm run coverage:body-stat
npm run gate:body-stat-mapping
npm run gate:milestone-scope-closure -- M33
npm run smoke:body-stat
npm run smoke:character-identity
npm run typecheck
npm run build
npm run test --if-present
```

## M34. [구현] 관계/CFLAG/장비/의복 owner 완성

책임 선언:
- 역할: CFLAG, 관계, 장비, 의복 상태를 의미별 owner로 분해한다.
- 범위: CFLAG 정의 151개, Chara CFLAG seed 1,465개, 관계값, 장비/의복/착용/해금 상태다.
- 방식: people/body/equipment/social/work/mission/settings/features 등 실제 owner에 배정한다.
- 완료 결과: 의미가 확인된 CFLAG는 owner와 lifecycle을 갖고, 의미 불명은 blocker로 남는다.
- 누락 차단: 의미 불명 CFLAG를 mapped 처리하거나 raw `CFLAG` 모델명이 runtime에 남으면 완료하지 않는다.

- [x] CFLAG 정의 151개와 Chara CFLAG seed 1,465개를 의미별 owner로 분해
- [x] 관계값과 방향성 관계를 `social`에 연결
- [x] 장비, 의복, 착용 상태, 해금 상태를 `equipment`와 `inventory/shop/world` 경계에 맞게 분리
- [x] CFLAG 중 people/body/equipment/social/work/mission/settings/features owner를 구분
- [x] 의미 불명 CFLAG는 완료 처리하지 않고 blocker로 남김
- [x] 관계/장비/의복 변화가 저장 roundtrip에 남는지 검증
- [x] 원본명 `CFLAG`를 앱 모델명으로 직접 사용하지 않도록 검색
- [x] M20/M24/M25 coverage의 관련 status 갱신
- [x] `npm run build` 실행

M34 완료 근거:
- M34 scope는 implementation queue 2,149행과 M29/M31/M33 inbound transfer 83행을 합친 총 2,232행이다.
- `legacyCharacterFlagDefinitions` 151행은 `definitions.legacyCharacterFlagDefinitions -> splitLegacyCharacterFlags -> buildWardrobeView`로 실제 소비된다.
- Chara `CFLAG` seed 1,465행은 `splitLegacyCharacterFlags`에서 `body.conditionFlags`, `equipment.availabilityFlags`, `equipment.clothing`, `people.flags.affection/family/settings/featureProgress`, `social` 진행 근거로 분해된다.
- Chara `RELATION` seed 532행은 `createCharacterBundleFromSpecs`에서 `social.relationships`로 생성되고 원본 relation index 근거를 보존한다.
- M29에서 넘어온 cosplay/clothing pack item 60~64, `ITEMSALES` session row, inventory save row는 M34 clothing/equipment owner로 닫았다.
- M31/M33에서 넘어온 CFLAG/FLAG/PBAND save row는 source evidence, runtime consumer, verification을 가진 mapped row로 닫았다.
- 메인 메뉴 108은 `main/openWardrobe -> wardrobe` route로 활성화했고, `wardrobe/toggleClothing`과 `wardrobe/cancel` action을 추가했다.
- raw `CFLAG`는 runtime 모델명으로 쓰지 않고 source evidence 및 문서/coverage 용어로만 남긴다.
- `data/coverage/social-equipment-cflag-coverage.json`, `data/coverage/audits/M34-gap-audit.json`, `data/coverage/milestones/M34-closure.json`을 생성했다. closure counts는 ownedTotal 2,232, implemented 1,998, mapped 234, blocker/missing/unapproved 0이다.

검증:
```bash
npm run coverage:features
npm run coverage:definitions
npm run gate:definition-consumption
npm run coverage:social-equipment-cflag
npm run gate:social-equipment-cflag
npm run gate:milestone-scope-closure -- M34
npm run smoke:social-equipment-cflag
npm run smoke:main-routes
npm run typecheck
npm run build
npm run test --if-present
rg "CFLAG" src/game src/domains src/features src/ui
```

비고:
- M34 closure gate와 M34 전용 coverage gate에는 unresolved issue가 없다.
- 단, M34 이후 전수 검토에서 `npm run gate:source-evidence` 현재 실패가 확인되었다. auxiliary evidence 완료 근거와 M35~M52 gate 부재는 M34.5가 소유하는 차단 사항이며, M35로 넘어가기 전에 반드시 해소해야 한다.

## M34.5. [검증] 전수 이식 gate hardening

책임 선언:
- 역할: M35 이후 기능군 구현이 누락을 숫자나 문서로 숨기지 못하게 gate를 실제 script와 실패 조건으로 고정한다.
- 범위: source evidence, auxiliary evidence 차단, source-file-review 폐쇄 규칙, M35~M52 전용 coverage/gate/smoke script registry, 최종 audit/verify skeleton이다.
- 방식: 지금 발견된 gate 구멍을 먼저 실패 상태로 드러내고, 각 마일스톤이 자기 전용 gate 없이는 완료될 수 없게 만든다.
- 완료 결과: M35는 `coverage:turn-pipeline`, `gate:turn-pipeline`, `smoke:turn-long`이 실제로 존재하고 실패 조건을 가진 상태에서만 시작된다.
- 누락 차단: auxiliary 완료 근거 1개, source-file-review 미분해 1개, M35~M52 필수 script 누락 1개, 최종 gate skeleton 누락 1개라도 있으면 완료하지 않는다.

처리 결과:
- `definition:cflag:*` 151개와 `definition:source:*` 18개는 auxiliary `Ho版資料（作成中途）` 파일을 해석 보조로만 남기고, 완료 근거는 primary `original-game/CSV/VariableSize.CSV`의 `CFLAGNAME`/`SOURCENAME` family로 고정했다.
- `gate:source-evidence`는 feature, definition, blocker, save/session mapping, approved exclusion, 마일스톤별 coverage row까지 검사한다.
- M35~M52의 전용 script 이름과 필수 gate는 `coverage-gate-registry.json`에 등록했다. 아직 실제 구현이 없는 script는 실행 시 실패하는 placeholder라서 빈 통과가 불가능하다.

- [x] `gate:source-evidence`의 완료성 상태 차단 목록을 확장한다. `implemented`, `used`, `template`, `listing`, `display-only`, `calculation-only`, `mapped`, `non-save`, `session-field`, `calculation-internal`, `script-scratch`, `approved-excluded`는 auxiliary evidence만으로 완료될 수 없다.
- [x] `gate:source-evidence`가 `features.json`, `definitions.json`, `blockers.json`, `save-mapping.json`, `session-mapping.json`, `approved-exclusions.json`, `implementation-queue.json`, 마일스톤별 `*-coverage.json`을 모두 검사하게 한다.
- [x] auxiliary source row 169개를 primary source evidence에 연결하거나 완료성 상태에서 빼고 blocker/owner review로 되돌린다.
- [x] `source-file-review` row는 파일명 단위 계약만으로 완료 처리하지 못하게 한다. 완료하려면 라벨, CSV 행, family/index, read/write 방향 중 하나 이상의 primary row로 분해해야 한다.
- [x] `coverage-gate-registry.json`을 만든다. M35~M52 각 마일스톤의 coverage file, gate command, smoke command, closure file, gap audit file, 필수 row field를 기록한다.
- [x] `gate:coverage-hardening`을 만든다. registry에 등록된 모든 script가 `package.json`에 있고, 각 gate가 존재하며, 완료성 row의 `sourceEvidenceId`, `runtimeConsumerId`, `verificationId` 누락을 실패시켜야 한다.
- [x] M35~M49 전용 coverage/gate/smoke skeleton을 추가한다. skeleton은 아직 구현 row가 없으면 성공하지 말고, 해당 owner row가 미구현임을 실패 또는 blocker로 드러내야 한다.
- [x] `audit:final-gap`, `gate:final-gap-audit`, `gate:final-content-zero-gap` skeleton을 추가한다.
- [x] `coverage:view-text`, `gate:view-and-text-coverage` skeleton을 추가한다.
- [x] `test:roundtrip:all`, `report:full-port`, `gate:complete-port-verdict`, `verify:complete` skeleton을 추가한다.
- [x] `gate:milestone-scope-closure`가 registry를 읽어 해당 Mxx의 coverage/gate/smoke/audit/closure 연결을 검사하게 강화한다.
- [x] `PROGRESS_STATUS.ko.md`와 `SESSION_HANDOFF.ko.md`의 다음 작업을 M35가 아니라 M34.5로 갱신한다.
- [x] M34.5 closure를 `data/coverage/milestones/M34.5-closure.json`에 남긴다. `ownedBlocker`, `missingEvidence`, `missingConsumer`, `missingVerification`, `roleOnlyComplete`, `unapprovedExcluded`, `missingRequiredScript`, `auxiliaryCompletionEvidence`, `undigestedSourceFileReview`가 모두 0이어야 한다.
- [x] `npm run gate:source-evidence` 실행
- [x] `npm run gate:coverage-hardening` 실행
- [x] `npm run gate:coverage-crosscheck` 실행
- [x] `npm run gate:pre-implementation-audit` 실행
- [x] `npm run gate:implementation-queue` 실행
- [x] `npm run build` 실행
- [x] `npm run test --if-present` 실행

검증:

```bash
npm run gate:source-evidence
npm run gate:coverage-hardening
npm run gate:coverage-crosscheck
npm run gate:pre-implementation-audit
npm run gate:implementation-queue
npm run build
npm run test --if-present
```

## M35. [구현] 턴 종료와 시간 진행 완성

책임 선언:
- 역할: 원본 턴 종료와 시간 진행, 월말/주말/자동 처리 순서를 완성한다.
- 범위: day/week/month/year 진행, phase 전환, 턴 전후 hook, 월말 hook, 자동 구매/사용, 미션/이벤트 hook이다.
- 방식: hook 순서를 명시하고 결과는 economy/run/world 등 save owner에만 반영한다.
- 완료 결과: 턴 종료 후 시간, 이벤트, 비용/보상, session 폐기, 저장 roundtrip이 검증된다.
- 누락 차단: hook 순서가 불명확하거나 턴 종료 중 임시 선택값이 저장되면 완료하지 않는다.

- [x] M34.5가 완료되지 않았으면 M35를 시작하지 않음
- [x] `coverage:turn-pipeline`, `gate:turn-pipeline`, `smoke:turn-long`이 실제 script로 존재하고 실패 조건을 가짐
- [x] 원본 턴 종료 흐름의 day/week/month/year 진행 규칙을 구현
- [x] 전반/후반 또는 phase 전환 규칙을 저장 상태와 session 폐기로 분리
- [x] 턴 종료 전 hook, 턴 종료 후 hook, 월말 hook, 새 주 hook을 정의
- [x] 자동 구매, 자동 아이템 사용, 업무 결과, 미션 기한, 이벤트 발생 순서를 연결
- [x] 월말 비용, 판매, 보상, 패널티가 `economy/run/world` owner에 반영되는지 검증
- [x] 턴 종료 중 session 선택값이 남지 않는지 검증
- [x] 턴 종료 후 저장 roundtrip을 검증
- [x] M19/M24/M25 coverage의 turn-end 관련 status 갱신
- [x] `npm run build` 실행

M35 완료 근거:
- M35 owned scope는 implementation queue 4행과 M29/M31 inbound transfer 3행을 합친 7행이다.
- `DAY:0`, `DAY:3`, `DAY:4`, `TIME`, `TIME:0`은 `run.clock.dayCounters`, `run.clock.currentTimeSlot`, `run.clock.timeCounters`로 소비한다.
- M29/M31에서 이관된 `CFLAG:34`, `FLAG:61` save row는 원본명 runtime 모델이 아니라 `run.progressFlags.flag_34`, `run.progressFlags.flag_61`로 소비한다.
- `turnEndBeforeHooks`와 `turnEndAfterHooks`는 scheduled event, mission deadline, clock advance, weekly/monthly automatic hook, world event hook, session cleanup 순서를 가진다.
- `smoke:turn-long`은 장기 턴, 월/년 rollover, 미션 기한 실패, weekly/monthly scheduled event, 월말 비용, session cleanup, save roundtrip을 검증한다.
- `data/coverage/turn-pipeline-coverage.json`, `data/coverage/audits/M35-gap-audit.json`, `data/coverage/milestones/M35-closure.json`을 생성했다. ownedTotal 7, mapped 7, blocker/missing/unapproved 0.

검증:
```bash
npm run coverage:turn-pipeline
npm run gate:turn-pipeline
npm run gate:milestone-scope-closure -- M35
npm run smoke:turn-long
npm run smoke:m8
npm run verify:m16
npm run typecheck
npm run build
npm run test --if-present
```

## M36. [구현] 방문/시설 완성

책임 선언:
- 역할: 방문 장소, 시설, 장소별 행동을 전수 구현한다.
- 범위: 모든 방문 장소, 행동, 해금 조건, 비용/조건/중복 실패, 취소, 결과 반영이다.
- 방식: 장소 선택 session과 시설/세계 진행 save를 분리하고 결과 owner를 명시한다.
- 완료 결과: 방문/시설 feature 전체가 구현 또는 사용자 승인 제외 상태이고 소유 blocker 0개가 된다.
- 누락 차단: 장소 선택값과 시설 진행 상태가 섞이거나 행동 결과 owner가 불명확하면 완료하지 않는다.

- [x] 방문 장소 전체를 장소 정의 또는 사용자 승인 제외로 분류하고, 미판정 blocker가 있으면 완료하지 않음
- [x] 장소별 행동 전체를 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [x] 장소 해금 조건과 현재 선택 session을 분리
- [x] 비용 부족, 조건 미충족, 중복 실행, 취소를 검증
- [x] 시설 해금과 세계 진행 상태를 `world` 또는 `featureState`에 연결
- [x] 방문 행동 결과가 인물, 신체, 돈, 시간 진행에 반영되는 경우 owner를 명시
- [x] 방문 후 저장 roundtrip을 검증
- [x] M19/M21/M24/M25 coverage의 방문 관련 status 갱신
- [x] `npm run build` 실행

M36 완료 근거:
- M36 owned scope는 `unit:M36:visit-facility` 559행이다. visit place definition 7행은 `visitPlaceDefinitions -> createVisitSession/buildVisitView`로 소비하고, visit feature 552행은 source file + source label 기준 86개 `visitActionDefinitions` action으로 소비한다.
- 7개 방문 장소는 `organizationOffice`, `secretLaboratory`, `rachelWorkshop`, `ikumiLaboratory`, `sakuraHideout`, `miyakoHouse`, `akashaHeadquarters`로 runtime view에 노출된다.
- 방문 선택값은 `GameSession.visit`에만 남고, 완료 결과는 `featureState.visits`, `world.eventFlags`, `world.unlocks`, `economy.account/accountingEntries` owner에만 반영된다.
- `organizationOffice.basicRoomPermit`은 M10 최소 루프와 호환되게 유지했고, 나머지 원본 방문 라벨은 source label별 action으로 닫았다.
- `data/coverage/visit-facility-coverage.json`, `data/coverage/audits/M36-gap-audit.json`, `data/coverage/milestones/M36-closure.json`을 생성했다. ownedTotal 559, implemented 552, mapped 7, blocker/missing/unapproved 0.

검증:
```bash
npm run coverage:visit-facility
npm run gate:visit-facility
npm run gate:milestone-scope-closure -- M36
npm run smoke:visit-all
npm run smoke:m10
npm run verify:m16
npm run typecheck
npm run build
npm run test --if-present
```

## M37. [구현] 업무/창관/특수 업무 완성

책임 선언:
- 역할: 업무, 창관, 아르바이트, 특수 업무를 전수 구현한다.
- 범위: 업무 정의 전체, 참여 조건, 대상/시설/시간 조건, 결과 계산, 턴 종료다.
- 방식: 실행 중 선택값/계산값은 session/calculation에 두고 결과만 economy/people/body/work/run에 반영한다.
- 완료 결과: 업무 전체가 성공/실패/취소/저장 roundtrip과 coverage 갱신을 갖는다.
- 누락 차단: 계산값이 save에 남거나 업무 결과가 책임 owner 밖으로 흩어지면 완료하지 않는다.

- [x] 업무 정의 전체를 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [x] 창관, 아르바이트, 일반 업무, 특수 업무를 정의 데이터와 handler owner로 분리
- [x] 업무 참여 조건, 대상 조건, 시설 조건, 시간 조건을 view 계산으로 구현
- [x] 업무 결과가 돈, 인물, 신체, 경험, 업무 이력, 시간 진행에 반영되는지 검증
- [x] 업무 실행 중 선택값과 계산값은 session/calculation에만 둠
- [x] 성공, 조건 미충족, 대상 누락, 취소, 턴 종료를 검증
- [x] 업무 후 저장 roundtrip을 검증
- [x] M19/M20/M24/M25 coverage의 업무 관련 status 갱신
- [x] `npm run build` 실행

M37 완료 근거:
- M37 owned scope는 `unit:M37:work` 461행이다. definition 8행, feature 286행, save mapping 161행, session/calculation mapping 6행을 모두 `data/coverage/work-coverage.json`에 기록했다.
- ERB-derived 업무 listing 8개는 `definitions.workDefinitions[work:arbeit:*]`로 연결했다.
- 원본 업무/창관/특수 업무 source file + source label 72개는 `workSourceGroups`와 `createSourceLabelWorkDefinitions`를 통해 `definitions.workDefinitions`에 연결했다.
- `work/select`, `work/selectCharacter`, `work/execute`, `work/cancel`이 업무 선택값을 `GameSession.work`에만 두고, 실행 결과만 `economy`, `people.attributes.experiences`, `body.byCharacterId`, `work.assignments`, `work.careerFlagsByCharacterId`, `run.clock` owner에 반영한다.
- `smoke:work-all`은 M37 source-backed 업무 정의 80개를 모두 실제 dispatch로 실행하고, 실패/대상 누락/취소/session cleanup/save roundtrip을 검증한다.
- `data/coverage/audits/M37-gap-audit.json`과 `data/coverage/milestones/M37-closure.json`을 생성했다. ownedTotal 461, implemented 286, mapped 175, blocker/missing/unapproved 0.

검증:
```bash
npm run coverage:work
npm run gate:work-coverage
npm run gate:milestone-scope-closure -- M37
npm run smoke:work-all
npm run smoke:m12
npm run verify:m16
npm run typecheck
npm run build
npm run test --if-present
```

## M38. [구현] 촬영 정의와 장면 조건 완성

책임 선언:
- 역할: 촬영 장면 정의와 촬영 가능 조건을 전수 구현한다.
- 범위: 촬영 장면 전체, 대상 후보 조건, 장면 후보 조건, 표시명/설명/요구 상태/예상 결과다.
- 방식: 장면 정의는 source evidence를 갖고 조건은 view 계산으로 구현한다.
- 완료 결과: 촬영 장면 전체가 선택 가능/불가 사유와 원본 근거를 갖는다.
- 누락 차단: 장면이 표시되지만 원본 근거나 조건 계산이 없으면 완료하지 않는다.

- [x] 촬영 장면 전체를 장면 정의 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [x] 촬영 대상 후보 조건과 장면 후보 조건을 view 계산으로 구현
- [x] 장면별 표시 이름, 설명, 요구 상태, 예상 결과를 정의 데이터로 연결
- [x] 장면 선택, 대상 선택, 조건 실패, 취소를 검증
- [x] 촬영 중간 계산값은 session/calculation에만 둠
- [x] 장면 정의가 CSV/ERB 근거를 갖는지 확인
- [x] M20/M23/M25 coverage의 촬영 정의 관련 status 갱신
- [x] `npm run build` 실행

M38 완료 근거:
- M38 owned scope는 `unit:M38:filming-definition` 6행이다. 모두 `filmingSceneDefinitions` ERB-derived definition row이며 `data/coverage/filming-scene-coverage.json`에 기록했다.
- 촬영 장면 6개 `filming-scene:1`, `2`, `3`, `4`, `5`, `10`을 runtime `definitions.filmingSceneDefinitions`에 연결했다.
- `buildShootingView`, `computeVisibleFilmingSceneIds`, `selectShootingTarget`, `selectShootingScene`, `cancelShootingSelection`이 장면 표시, 대상 조건, 장면 선택, session 계산 버퍼를 소비한다.
- M38은 촬영 실행/결과/판매 저장 owner가 아니다. 촬영 결과, 출시/판매 상태, 실행 후 저장 반영은 M39가 소유한다.
- `data/coverage/audits/M38-gap-audit.json`과 `data/coverage/milestones/M38-closure.json`을 생성했다. ownedTotal 6, mapped 6, blocker/missing/unapproved 0.

검증:
```bash
npm run coverage:filming-scene
npm run gate:filming-scene
npm run gate:milestone-scope-closure -- M38
npm run smoke:filming-scenes
npm run smoke:m13
npm run verify:m16
npm run typecheck
npm run build
npm run test --if-present
```

## M39. [구현] 촬영 실행/결과/판매 완성

책임 선언:
- 역할: 촬영 실행, 결과 반영, 출시/판매 상태를 전수 구현한다.
- 범위: 촬영량, 수익, 팬, 점수, 경험, 피로, 이력, 출시/판매, 턴 종료다.
- 방식: 촬영 계산값은 session/calculation에 두고 결과만 economy/people/body/world/featureState에 반영한다.
- 완료 결과: 촬영 성공/실패/취소/저장 roundtrip이 전체 장면에 대해 검증된다.
- 누락 차단: 촬영 session 계산값이 save에 남거나 판매 상태 owner가 불명확하면 완료하지 않는다.

- [x] 촬영량, 수익, 팬, 점수, 경험, 신체 피로 계산을 구현
- [x] 촬영 결과가 `economy`, `people`, `body`, `work` owner에만 반영되는지 검증
- [x] 촬영 이력과 출시/판매 상태를 저장 상태에 연결
- [x] 촬영 실패, 조건 미충족, 장면 누락, 대상 누락, 취소를 검증
- [x] 촬영 완료 후 턴 종료와 session 폐기를 검증
- [x] 촬영 후 저장 roundtrip을 검증
- [x] M19/M24/M25 coverage의 촬영 실행 관련 status 갱신
- [x] `npm run build` 실행

M39 완료 근거:
- M39 owned scope는 `unit:M39:filming-execution` 172행과 source-file-review 2행을 합쳐 총 174행이다.
- feature row 135개는 `main/openShooting`, `shooting/selectTarget`, `shooting/selectScene`, `shooting/confirmScene`, `calculateShootingResult`, `applyShootingResult`, `endTurn` 소비 경로로 닫았다.
- save mapping row 16개는 `economy.videoSalesTotal`, `work.filmingProgressFlags`, `work.filmingByCharacterId`, `work.careerFlagsByCharacterId` 저장 owner로 소비한다.
- session/calculation mapping row 21개는 `session.shooting.sceneTemporaryValues`, `session.shooting.sceneFlags`, `session.interaction.participants.assistantId`, `calculateShootingResult` lifecycle로 소비하고, 완료/취소 후 save payload에 남지 않는다.
- `AV_POINTCALC.ERB`와 `VIDEO.ERH` source-file-review 2행은 촬영 계산 helper와 비디오 판매/출시 저장 owner로 소비 근거를 남겼다.
- `data/coverage/filming-execution-coverage.json`, `data/coverage/audits/M39-gap-audit.json`, `data/coverage/milestones/M39-closure.json`을 생성했다. closure 기준은 ownedTotal 174, implemented 135, mapped 39, blocker/missing/unapproved 0이다.

검증:

```bash
npm run coverage:filming-execution
npm run gate:filming-execution
npm run gate:milestone-scope-closure -- M39
npm run smoke:filming-all
npm run smoke:m13
npm run verify:m16
npm run typecheck
npm run build
npm run test --if-present
```

## M40. [구현] 훈련 메뉴와 세션 완성

책임 선언:
- 역할: 훈련 화면과 선택 session lifecycle을 완성한다.
- 범위: 대상, 실행자, 조수, command 선택, command 후보 view, 누락/불가/취소, session 폐기다.
- 방식: 화면 선택값과 임시 모드는 session에 두고 저장 상태를 직접 바꾸지 않는다.
- 완료 결과: 훈련 진입, 선택, 취소, 완료, 턴 종료에서 session lifecycle이 검증된다.
- 누락 차단: 훈련 선택값이 save에 남거나 command 후보 계산이 상태를 바꾸면 완료하지 않는다.

- [x] 훈련 대상, 실행자, 조수, command 선택 상태를 session owner에 연결
- [x] 훈련 command 후보 view를 전체 command 기준으로 계산
- [x] 대상/실행자/조수 누락, 불가 조건, 취소를 검증
- [x] 훈련 장비/임시 모드/선택값은 session에만 둠
- [x] 훈련 화면 진입과 복귀가 저장 상태를 직접 바꾸지 않도록 검증
- [x] 훈련 session이 완료/취소/턴 종료 시 폐기되는지 검증
- [x] M19/M20/M25 coverage의 훈련 메뉴 관련 status 갱신
- [x] `npm run build` 실행

M40 완료 근거:
- M40 owned scope는 `unit:M40:training-session` 11행이며 전부 `original-game/ERB/指導関係/TRAIN_MAIN.ERB`의 `EVENTTRAIN`, `EVENTCOM`, `EVENTCOMEND`, `EVENTEND`, `JUEL_CHECK`, `SHOW_STATUS`, `FIGURE_INDENT`, `FIGURE_INDENT_SLASH` 근거다.
- `coverage:training-session`, `gate:training-session`, `smoke:training-session`을 placeholder가 아닌 실제 script로 교체했다.
- 105개 훈련 command 후보 전체를 view에 노출하고, M41 소유 가능 조건은 disabled reason으로 남긴다. M40은 command 효과 전체가 아니라 세션 진입/선택/취소/완료 lifecycle만 닫는다.
- 대상/실행자/조수 선택, 조수 해제, command 선택 시 TFLAG/SOURCE/PALAM/result preview reset, 선택 취소, 화면 취소, 실행 후 턴 종료와 interaction session 폐기를 검증했다.
- `SHOW_STATUS`는 훈련 view의 대상/실행자/조수/일자/시간대 요약으로 소비하고, `FIGURE_INDENT`/`FIGURE_INDENT_SLASH`는 8칸 폭 숫자 포맷으로 소비한다.
- `data/coverage/training-session-coverage.json`, `data/coverage/audits/M40-gap-audit.json`, `data/coverage/milestones/M40-closure.json`을 생성했다. ownedTotal 11, implemented 5, mapped 6, blocker/missing/unapproved 0.

검증:

```bash
npm run coverage:training-session
npm run gate:training-session
npm run gate:milestone-scope-closure -- M40
npm run smoke:training-session
npm run smoke:m14
npm run verify:m16
npm run typecheck
npm run build
npm run test --if-present
```

## M41. [구현] 훈련 가능 조건 전수 구현

책임 선언:
- 역할: 105개 훈련 command의 가능 조건과 불가 사유를 전수 구현한다.
- 범위: 대상/실행자/조수 역할 조건, 장비/상태/자원/장소/이벤트 조건이다.
- 방식: availability는 view 계산으로 만들고 저장 상태 변경 없이 불가 사유를 표시한다.
- 완료 결과: 각 command가 가능/불가 판정과 불가 사유 검증을 갖는다.
- 누락 차단: 실행 가능한 command에 조건 row나 불가 사유가 없으면 완료하지 않는다.

- [x] `Train.csv` 105개 command별 가능 조건을 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [x] command별 대상, 실행자, 조수 역할 조건을 구현
- [x] command별 장비, 상태, 자원, 장소, 이벤트 조건을 구현
- [x] 불가 사유를 view 계산 결과로 표시
- [x] availability 계산이 저장 상태를 바꾸지 않는지 검증
- [x] command별 가능/불가 smoke 또는 table 검증을 추가
- [x] M20/M25 coverage의 훈련 가능 조건 status 갱신
- [x] `npm run build` 실행

M41 완료 근거:
- M41 owned scope는 1,625행이다. `unit:M41:training-availability` feature row 1,624행과 `unit:M41:training-availability-original-game-erb-comorder-erb` source-file-review 1행을 원본 `COMABLE.ERB`, `COMSEQ_REGISTER.ERB`, `COMORDER.ERB` 기준으로 닫았다.
- `COMABLE.ERB`의 `COM_ABLE*` source program 125개를 `data/coverage/training-availability-rules.json`으로 추출했고, `Train.csv` active command 105개 전부가 대응 source program을 가진다.
- availability는 save/session을 변경하지 않는 view 계산으로 처리한다. 원본 조건의 읽기 대상은 새 runtime owner(`people`, `body`, `social`, `inventory`, `equipment`, `run`, `featureState`, `session`)로 해석하고, 원본 raw 변수명은 runtime 모델명으로 쓰지 않는다.
- 불가 command는 `Original availability rule COM_ABLE...` 형식의 사유를 반환한다. command 효과와 후처리는 M42~M44 소유로 남긴다.
- item 22/90/91 계열과 장비/상태/자원/관계/능력/소질/경험 조건을 원본 availability interpreter에 연결했고, 대표 item 부족 및 임시 장비 조건을 smoke로 검증했다.
- `coverage:training-availability`, `gate:training-availability`, `smoke:training-availability`를 placeholder가 아닌 실제 script로 교체했다.
- `data/coverage/training-availability-coverage.json`, `data/coverage/training-availability-rules.json`, `data/coverage/audits/M41-gap-audit.json`, `data/coverage/milestones/M41-closure.json`을 생성했다. ownedTotal 1,625, implemented 1,371, mapped 254, blocker/missing/unapproved 0.

검증:

```bash
npm run coverage:training-availability
npm run gate:training-availability
npm run gate:milestone-scope-closure -- M41
npm run smoke:training-availability
npm run smoke:training-session
npm run smoke:m14
npm run verify:m16
npm run gate:raw-names
npm run typecheck
npm run build
npm run test --if-present
```

## M42. [구현] 훈련 command 효과 0~34 완성

책임 선언:
- 역할: `Train.csv` command 0~34에 연결된 훈련 효과 source를 원본 단위 매니페스트로 닫는다.
- 범위: command row, 연결된 `COMF*.ERB` label/file, 특수 item 소비 조건, `SOURCE/LOSEBASE/EXP/PALAM/ABL/TALENT/TEQUIP/TFLAG` 계산, 결과 owner, 성공/불가/취소/session 폐기다.
- 방식: command 번호만 세지 않는다. 각 command가 실제로 호출하는 효과 source와 그 source가 읽고 쓰는 원본 단위를 매니페스트에 넣고, 단위별 `implemented-verified` 또는 차단 상태로 닫는다.
- 완료 결과: command 0~34와 연결 효과 source 전체가 source evidence, runtime consumer, verification을 갖는다.
- 누락 차단: static profile, line index, 예정 `runtimeConsumerId`/`verificationId`, source evidence만으로 완료하지 않는다.

- [ ] command 0~34 원본 단위 매니페스트를 작성하고 각 command row와 연결 `COMF*.ERB` source를 적음
- [ ] command 0~34의 source 계산, 파라미터 증감, 체력/기력 감소를 구현
- [ ] 특수 item 소비 조건이 있으면 item owner와 effect owner를 매니페스트에서 분리하고 완료/차단 상태를 기록
- [ ] command별 결과 owner를 `people`, `body`, `social`, `inventory`, `economy`, `run` 중 하나로 확정
- [ ] command별 성공, 불가, 취소, 결과 적용, session 폐기를 검증
- [ ] 원본 계산 중간값을 저장 payload에 넣지 않도록 검증
- [ ] command 0~34의 source evidence와 consumer evidence를 연결
- [ ] 관련 blocker 0개 확인. 해소 불가 항목은 사용자 승인 제외 근거가 있을 때만 완료 처리
- [ ] M20/M24/M25 coverage의 command 0~34 status 갱신
- [ ] `npm run build` 실행

M42 차단 기록:
- coverage: `data/coverage/training-effect-0-34.json`
- runtime profiles: `data/catalog/training-effect-profiles-0-34.json`
- gap audit: `data/coverage/audits/M42-gap-audit.json`
- closure: `data/coverage/milestones/M42-closure.json`
- 현재 상태: 원본 `SOURCE/LOSEBASE/EXP` 라인 인덱싱과 static profile 생성만 되어 있어 책임 축소 상태다.
- `npm run gate:training-effect -- 0-34`는 원본 효과 계산 구현이 완료될 때까지 실패해야 한다.
- 이 마일스톤은 완료가 아니다. M43으로 넘어가지 않는다.

## M43. [구현] 훈련 command 효과 35~69 완성

책임 선언:
- 역할: `Train.csv` command 35~69에 연결된 훈련 효과 source를 원본 단위 매니페스트로 닫는다.
- 범위: command row, 연결된 `COMF*.ERB` label/file, 특수 item 소비 조건, `SOURCE/LOSEBASE/EXP/PALAM/ABL/TALENT/TEQUIP/TFLAG` 계산, 결과 owner, 성공/불가/취소/session 폐기다.
- 방식: 각 command와 연결 source를 독립 단위로 구현하고 coverage를 command/source별로 닫는다. blocker는 완료 차단 상태로 남긴다.
- 완료 결과: command 35~69와 연결 효과 source 전체가 source evidence, runtime consumer, verification을 갖는다.
- 누락 차단: 결과 owner가 불명확하거나 미구현 source가 blocker 없이 남으면 완료하지 않는다.

- [ ] command 35~69 원본 단위 매니페스트를 작성하고 각 command row와 연결 `COMF*.ERB` source를 적음
- [ ] command 35~69의 source 계산, 파라미터 증감, 체력/기력 감소를 구현
- [ ] 특수 item 소비 조건이 있으면 item owner와 effect owner를 매니페스트에서 분리하고 완료/차단 상태를 기록
- [ ] command별 결과 owner를 `people`, `body`, `social`, `inventory`, `economy`, `run` 중 하나로 확정
- [ ] command별 성공, 불가, 취소, 결과 적용, session 폐기를 검증
- [ ] 원본 계산 중간값을 저장 payload에 넣지 않도록 검증
- [ ] command 35~69의 source evidence와 consumer evidence를 연결
- [ ] 관련 blocker 0개 확인. 해소 불가 항목은 사용자 승인 제외 근거가 있을 때만 완료 처리
- [ ] M20/M24/M25 coverage의 command 35~69 status 갱신
- [ ] `npm run build` 실행

## M44. [구현/범위보강필요] 훈련 command 효과 70 이상과 후처리 완성

책임 선언:
- 역할: command 70 이상, 번호 범위 밖 `COMF*.ERB` 효과 source, 훈련 공통 후처리를 완성한다.
- 범위: `Train.csv` active command 70 이상, `COMF137.ERB`처럼 command 번호 범위 밖에서 item/후처리로 소비되는 효과 source, 훈련 후처리, 이벤트 hook 호출, 장비 변화, 자원 변화, raw-name gate다.
- 방식: 105개 command 숫자 집계만 쓰지 않는다. 모든 `COMF*.ERB` 효과 source를 매니페스트에 넣고, command owner/특수 item owner/후처리 owner를 단위별로 닫는다.
- 완료 결과: 전체 훈련 효과 source coverage에 미구현 row가 남지 않는다.
- 누락 차단: `COMF`, `TFLAG`, `SOURCE`, `TEQUIP`, `LOSEBASE` raw name이 runtime에 남거나, 번호 범위 밖 효과 source가 매니페스트 밖에 있으면 완료하지 않는다.

- [ ] command 70 이상과 번호 범위 밖 훈련 효과 source의 원본 단위 매니페스트를 작성
- [ ] command 70 이상 전체의 source 계산, 파라미터 증감, 체력/기력 감소를 구현
- [ ] `COMF137.ERB`처럼 특수 item/후처리에서 소비되는 훈련 효과 source를 구현 또는 차단 상태로 닫음
- [ ] 훈련 후처리, 이벤트, 장비 변화, 자원 변화가 올바른 owner에 반영되는지 검증
- [ ] command별 성공, 불가, 취소, 결과 적용, session 폐기를 검증
- [ ] 원본 계산 중간값을 저장 payload에 넣지 않도록 검증
- [ ] 전체 command/effect source coverage에 미구현 row가 남지 않는지 확인
- [ ] 원본명 `COMF`, `TFLAG`, `SOURCE`, `TEQUIP`, `LOSEBASE` 직접 사용 검색 통과
- [ ] M20/M24/M25 coverage의 command 70 이상 및 후처리 status 갱신
- [ ] `npm run build` 실행

## M45. [구현] 능력 상승/휴식/공통 유지보수 완성

책임 선언:
- 역할: 능력 상승, 휴식, 회복, 자동 아이템 사용, 공통 유지보수 기능을 닫는다.
- 범위: common-system feature, 결과 owner, 성공/조건 미충족/취소/턴 종료 연결이다.
- 방식: 공통 기능을 특정 기능 내부 임시 로직이 아니라 별도 owner와 handler로 분리한다.
- 완료 결과: 공통 유지보수 흐름이 저장 roundtrip과 coverage 갱신을 갖는다.
- 누락 차단: common-system feature가 숨은 임시 코드로 남거나 owner가 불명확하면 완료하지 않는다.

- [ ] 능력 상승 메뉴와 조건을 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 휴식, 회복, 자동 아이템 사용, 공통 유지보수 흐름을 구현
- [ ] 공통 시스템 feature가 특정 기능 owner에 잘못 섞이지 않도록 분리
- [ ] 성공, 조건 미충족, 취소, 턴 종료 연결을 검증
- [ ] 결과가 `people`, `body`, `inventory`, `run`, `economy` owner에만 반영되는지 검증
- [ ] 저장 roundtrip을 검증
- [ ] M19/M20/M24/M25 coverage의 common-system 관련 status 갱신
- [ ] `npm run build` 실행

## M46. [구현] 미션 완성

책임 선언:
- 역할: 미션 전체 lifecycle을 완성한다.
- 범위: 미션 정의, 수락, 진행, 보고, 완료, 실패, 만료, 보상/패널티, 턴 종료 연동이다.
- 방식: 미션 진행 save와 목록/보고 선택 session을 분리한다.
- 완료 결과: 모든 미션이 조건/기한/보상/실패와 저장 roundtrip을 갖는다.
- 누락 차단: 미션 상태와 선택 session이 섞이거나 보상 owner가 불명확하면 완료하지 않는다.

- [ ] 미션 전체를 정의, 진행 상태, 보상, 실패 조건으로 분리
- [ ] 미션 수락, 진행, 보고, 완료, 실패, 만료를 구현
- [ ] 미션 기한과 턴 종료 처리를 연결
- [ ] 미션 보상과 패널티가 `economy`, `world`, `people`, `body`, `featureState`에 반영되는지 검증
- [ ] 미션 목록 선택 session이 저장 payload에 남지 않는지 검증
- [ ] 미션 후 저장 roundtrip을 검증
- [ ] M19/M20/M24/M25 coverage의 미션 관련 status 갱신
- [ ] `npm run build` 실행

## M47. [구현] 세계/이벤트/스토리 진행 완성

책임 선언:
- 역할: 세계 진행, 이벤트, 스토리 플래그와 이벤트 hook을 완성한다.
- 범위: 이벤트 발생 조건, 1회성/반복성, 결과 상태 변화, 표시 화면, hook 연결이다.
- 방식: 이벤트 표시와 상태 변경을 분리하고 결과는 world/meta/featureState 등 owner에 반영한다.
- 완료 결과: 이벤트가 발생 조건, 표시, 결과, 저장 roundtrip을 모두 갖는다.
- 누락 차단: 표시만 있고 상태 변화나 발생 조건 근거가 없는 이벤트가 남으면 완료하지 않는다.

- [ ] 이벤트 발생 조건, 1회성/반복성, 결과 상태 변화를 구현 또는 사용자 승인 제외로 닫고, 소유 blocker 0개 확인
- [ ] 세계/장소/스토리 진행 플래그를 `world`에 연결
- [ ] 이벤트 표시 화면과 상태 변경을 분리
- [ ] 턴 종료, 방문, 미션, 훈련, 촬영에서 발생하는 이벤트 hook을 연결
- [ ] 이벤트 결과가 저장 상태와 session에 섞이지 않도록 검증
- [ ] 이벤트 후 저장 roundtrip을 검증
- [ ] M19/M23/M24/M25 coverage의 event-world 관련 status 갱신
- [ ] `npm run build` 실행

## M48. [구현] 엔딩/계승/전역 상태 완성

책임 선언:
- 역할: 엔딩, 계승, 전역 meta 상태를 완성한다.
- 범위: 엔딩 조건, 결과 화면, 계승 새 게임, 게임 종료, 업적/클리어 보너스/전역 해금이다.
- 방식: 회차 save와 global/meta save를 분리하고 엔딩 조건은 view/calculation으로 구현한다.
- 완료 결과: 엔딩과 계승 흐름이 실제 UI/action 경로와 저장/로드 검증을 갖는다.
- 누락 차단: 회차 save와 전역 save가 섞이거나 승인 없는 엔딩 제외가 있으면 완료하지 않는다.

- [ ] 엔딩 조건 전체를 조건 id와 결과 화면으로 분류
- [ ] 엔딩 조건 계산을 view/calculation으로 구현
- [ ] 엔딩 결과, 계승 새 게임, 게임 종료 흐름을 구현
- [ ] 회차 밖 업적, 클리어 보너스, 전역 해금을 `meta`에 연결
- [ ] LOADGLOBAL/SAVEGLOBAL 성격의 상태와 회차 save 상태를 분리 검증
- [ ] 엔딩 후 저장/로드 또는 새 게임 흐름을 검증
- [ ] M19/M24/M25 coverage의 ending-event-meta 관련 status 갱신
- [ ] `npm run build` 실행

## M49. [구현/정리] 정보/도움말/설정/남은 기능 닫기

책임 선언:
- 역할: 정보/도움말/설정/디버그와 명시적으로 M49 intake된 잔여 기능만 닫는다.
- 범위: 정보, 도움말, 업적, 설정, 디버그 메뉴, PRINT/HTML/message/help/status text, 그리고 `M49-intake`에 원본 단위와 원래 owner가 기록된 잔여 기능이다.
- 방식: M49를 catch-all로 쓰지 않는다. 잔여 기능은 source id, 원래 owner 후보, M49로 온 이유, 승인 제외 여부가 있어야 M49 범위에 들어온다.
- 완료 결과: M49 intake 단위와 정보/도움말/설정/text 단위가 모두 구현/검증, 승인 제외, 차단 중 하나로 닫힌다.
- 누락 차단: owner 불명 기능, 설명 없는 제외, 디버그 범위 불명, intake 없는 잔여 기능을 M49 완료에 포함하지 않는다.

- [ ] 정보, 도움말, 업적, 설정, 디버그 메뉴를 구현 또는 사용자 승인 제외로 분류
- [ ] `M49-intake` 표를 만들고 source id, 원래 owner 후보, M49로 온 이유, 승인 제외 여부를 기록
- [ ] intake 없는 잔여 기능은 해당 owner 마일스톤으로 되돌리거나 `scope-redesign-required`로 차단
- [ ] PRINT/HTML/message/help/status text를 view/text coverage로 분류하고 실제 소비 화면을 연결
- [ ] 설정 상태를 `settings`와 `meta` owner로 분리
- [ ] 정보 화면이 정의 데이터와 저장 상태를 읽기 전용으로 표시하는지 검증
- [ ] 디버그 기능은 개발 전용 또는 사용자 승인 제외로 분류하고, 미승인 blocker가 있으면 완료하지 않음
- [ ] M28~M49 전체 기능군의 gap audit을 취합
- [ ] 기능군별 미구현 feature, 미소비 definition, 미정 save/session row가 남지 않는지 확인
- [ ] `npm run build` 실행
- [ ] 테스트 도구가 있으면 `npm run test --if-present` 실행
