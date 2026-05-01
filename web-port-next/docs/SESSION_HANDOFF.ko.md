# 세션 인수인계

새 세션은 아래 요약만 읽고 M28~M41 완료 선언 재정렬부터 진행한다. 그 뒤 M42 훈련 command 효과 0~34 구현을 재개한다. 완전 이식 여부는 모든 구현 책임과 M50~M52 최종 검증으로만 닫는다.

## 에이전트 시작 문서

토큰 누수를 막기 위해 Codex/서브에이전트는 먼저 아래 문서를 읽는다.

- `docs/agent/CODEX_BOOTSTRAP.ko.md`
- `docs/agent/KNOWN_ISSUES.ko.md`
- `docs/agent/CURRENT_STATUS.ko.md`
- `docs/agent/NEXT_MILESTONE.ko.md`

위 문서는 dashboard와 탐색 시작점이다. 완료 판정은 원본 파일, coverage 원장, gate/smoke/build, gap audit, closure JSON이 소유한다. query/검색 결과만으로 `implemented`, `used`, `mapped`, `approved-excluded`를 부여하지 않는다.

완료/차단/책임 재설계 판정은 `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md`를 따른다. `[구현]` 마일스톤의 `transferredOut`, file-level `source-file-review`, owner-only `mapped`, implemented 0/mapped-only closure는 completed 금지 신호다.

## 작업 위치

- 루트: `e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본`
- 활성 구현 폴더: `web-port-next`

## 작업 의도

이 프로젝트의 목적은 원본 게임을 새 웹 앱으로 "겉보기만 비슷하게" 옮기는 것이 아니다. 원본 ERB/CSV/Chara/VariableSize에 들어 있는 기능, 정의 데이터, 저장 상태, 세션/계산 상태를 빠짐없이 대조하고, 새 런타임의 `definitions`, `save`, `session`, `views/calculation` 경계에 맞게 다시 해석해 이식하는 것이다.

가장 중요한 원칙은 원본의 전역 변수와 라벨 구조를 그대로 앱 구조로 복사하지 않는 것이다. 원본의 `CFLAG`, `TFLAG`, `SOURCE`, `ITEMSALES`, `BOUGHT`, `LOCAL`, `ARG`, `RESULT` 같은 이름은 새 모델명이 아니라 원본 근거다. 새 구현은 의미 중심 owner와 lifecycle을 가져야 하며, 원본 이름은 coverage/source evidence와 adapter 검증 경계에서만 추적한다.

이 작업에서 "완료"는 화면이 뜨거나 성공 경로 하나가 동작한다는 뜻이 아니다. 원본 근거, runtime consumer, save/session/view/calculation 경계, 성공/실패/취소 또는 예외 검증, coverage/audit/closure 산출물, 문서 갱신, 별도 커밋이 모두 맞아야 완료다. `blocker`, `needsDecision`, `missingMapping`, `needs-review`, `role-only`, 승인 없는 `approved-excluded`는 완료가 아니라 완료 차단 상태다.

## 전체 프로젝트 의도

최종 목표는 M52에서만 판정한다. M52의 완전 이식은 원본 기능과 정의 데이터가 모두 구현, 검증된 mapping, 또는 사용자 승인 제외 중 하나로 닫히고, 미구현 기능 0개, 미분류 정의 0개, 미정 save/session 주소 0개, 미해소 blocker 0개, 미승인 제외 0개가 되는 상태다.

프로젝트는 다음 순서로 의도적으로 나뉜다.

- M0~M16은 새 웹 런타임의 최소 게임 루프와 검증 골격을 만든다. 이 구간은 완전 이식이 아니다.
- M17~M27은 원본 근거, coverage, save/session mapping, 구현 큐, blocker 동결을 만든다. 이 구간을 통과하지 못하면 이후 구현 완료를 주장할 수 없다.
- M28~M49는 기능군별 owner가 자기 소유 row를 실제 구현, 검증된 mapping, 사용자 승인 제외, 또는 정당한 transfer로 닫는 구간이다.
- M50~M52는 전체 저장/로드, 최종 누락 감사, 완전 이식 판정을 닫는 구간이다. 이 단계는 미구현 기능을 숨기는 단계가 아니라 남은 누락을 발견하면 해당 owner 마일스톤으로 되돌리는 단계다.

따라서 새 작업자는 "다음 기능을 구현"하기 전에 항상 현재 마일스톤의 owned scope를 확인해야 한다. 기능이 동작하더라도 해당 row의 source evidence, runtime consumer, verification, coverage, closure count가 맞지 않으면 완료 처리하지 않는다. 문서만 보고 `implemented`, `used`, `mapped`를 부여하지 말고, 실제 원본 파일과 runtime 소비 경로를 대조한다.

## 강한 제약

- `.env.local`을 읽거나 출력하지 않는다.
- 유료 AI/OpenRouter 호출을 실행하지 않는다.
- 기존 `web-port`의 AI-assisted 산출물은 참고 자료로만 본다.
- unrelated dirty files는 되돌리지 않는다.
- 원본 ERB/CSV 구조를 그대로 앱 아키텍처로 복사하지 않는다.
- 원본 주소 변환표는 M21~M27 전수표 보강과 누락 감사 없이 대량 작성하지 않는다.
- 마일스톤을 완료할 때는 `NEW_PORT_MILESTONES.ko.md`의 "마일스톤 완료 운영 의무"를 모두 지킨다. 특히 `PROGRESS_STATUS.ko.md`, `SESSION_HANDOFF.ko.md`, 필요한 기준 문서, coverage/audit/closure 산출물, 마지막 검증 명령, 별도 커밋이 빠지면 완료가 아니다.

## 현재 상태

- Vite/React/TypeScript 기본 골격이 있다.
- `GameState`와 `GameSession`은 분리되어 있다.
- 정의 데이터는 저장 상태에서 분리하는 방향으로 정리되어 있다.
- Phase 1~6 구분과 근거는 `NEW_PORT_MILESTONES.ko.md`에 명시되어 있다.
- M0 기준 동결과 M1 공통 실행 계약은 완료되어 있다.
- M1에서 `routes/actions/effects/results/dispatch` 계약이 추가되었고, 실패 result는 저장 상태를 바꾸지 않는다. M1의 action 계약은 Phase 1 범위 안으로 제한되어 있으며, 알 수 없는 action은 실패 result로 처리된다.
- M2에서 `GameData`, view 모델 타입, save payload 타입, 상태/action result/save payload 경계 helper가 추가되었고 Phase 1 smoke에서 실행된다.
- M3에서 `legacy-catalog.json`이 runtime 정의 데이터로 연결되었고 `GameDefinitions` bridge, item/recruit/shop listing 분류, 조회 실패 helper가 추가되었다. Runtime bridge 기준은 `items=61`, `recruitListings=48`, `shopListings=46`이다.
- M4에서 `game/new` handler, EASY/NORMAL 입력, 초기 날짜/목표/자금/시작 인물/시작 아이템, 실패 불변 처리가 구현되었다.
- M5에서 `mainMenu` route, 메인 메뉴 view 계산, enabled/disabled 사유, effect 로그, unknown route 경로가 구현되었다.
- M6에서 상점 진입, 판매 listing 계산, 선택/수량 변경, 구매 성공/실패/취소, 돈/인벤토리 반영이 구현되었다.
- M7에서 영입 listing view, 후보 선택, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계가 구현되었다.
- M8에서 `turn/end` action, 주차/월 롤오버, `phase=freeAction` 복귀, 예약 이벤트 소비, session 임시 상태 폐기 경계가 구현되었다. 미션/월말 hook은 M35에서 실제 처리로 승격되었다.
- M9에서 저장 payload schema v1, 직렬화/역직렬화, 손상 JSON/future schema/runtime 오염 payload 실패, 저장 roundtrip, `saveLoad` session 폐기가 구현되었다.
- M10에서 방문 장소/행동 view, 조직 사무소 기본 방 사용 허가, 돈 부족/중복/취소 실패 경로, `world.unlocks`와 `featureState.visits` 저장 경계, `visit` session 폐기가 구현되었다.
- M11에서 미션 정의 1개, 미션 목록/선택 view, 수락/보고 action, 조건 미충족 실패, 방문 해금 조건 연동, 보상 지급, `mission` 저장 상태와 `mission-session` 경계가 구현되었다.
- M12에서 업무 정의 1개, 업무/참여 인물 선택 view, 결과 계산/저장 반영 분리, 돈/경험/신체 피로/업무 이력 저장 반영, 완료 후 턴 종료, `work-session` 폐기가 구현되었다.
- M13에서 촬영 장면 정의 1개, 촬영 대상/장면 선택 view, 대상/장면 누락 실패, 선택/화면 취소, 촬영량 session 계산, 수익/팬/점수/경험/신체 피로/촬영 이력 저장 반영, 완료 후 턴 종료, `shooting-session` 폐기가 구현되었다.
- M14에서 훈련 command 1개, 대상/실행자/조수 선택 상태, command 후보 view, 불가 사유, 자극/파라미터/체력 소모/session 계산 버퍼, 파라미터/자원/경험/신체 피로 저장 반영, 완료 후 턴 종료, interaction session 폐기가 구현되었다.
- M15에서 `AppLayout`을 runtime state/session과 action dispatch 소유자로 축소하고, route별 renderer를 `RouteScreens.tsx`로 분리했다. `ScreenPrimitives.tsx`에 공통 선택지/요약 UI를 추가했고, `DiagnosticsPanel.tsx`에 현재 route, state 요약, session 요약, boundary diagnostics, effect log를 읽기 전용으로 표시한다.
- M16에서 새 테스트 framework는 추가하지 않고 기존 Vite smoke와 Node gate script를 묶었다. `test:roundtrip`, `gate:boundaries`, `gate:raw-names`, `gate:stubs`, `verify:m16`이 추가되었고 build 단독 완료를 차단한다.
- `gate:stubs`는 `legacy*NeedingMapping` 계열 보류 marker를 `tools/m16_stub_allowlist.json`에 기록된 사유/해소 마일스톤이 있을 때만 허용한다. 미등록 marker는 실패한다.
- M17에서 `LEGACY_MAPPING_POLICY.ko.md`를 추가해 mapping 상태값, M52 허용/차단 의미, evidence 요구사항, 불명확 주소 처리, `approved-excluded` 승인 조건, adapter import 금지 경계를 확정했다.
- M17에서 `src/game/runtime.ts`는 core 정의만 소유하고, legacy adapter 결합은 `src/runtime.ts`에서 수행하도록 경계를 옮겼다. `src/game`, `src/domains`, `src/catalog`에서는 `src/adapters/legacy`를 직접 import하지 않는다.
- M17은 원본 주소를 대량으로 `mapped` 처리하지 않았다. 실제 전수 mapping은 M24/M25의 coverage 산출물 기준으로 진행한다.
- M18에서 `IMPLEMENTATION_UNIT_RULES.ko.md`를 추가했다. 이후 구현은 unit 1개씩만 진행하고, 구현 전 template, 구현 후 template, blocker template, 완료 차단 규칙을 따라야 한다.
- M28~M49는 M18 template 없이 구현 완료 체크를 할 수 없다. 성공 경로만 있거나 coverage/blocker 갱신이 없으면 완료가 아니다.
- M19에서 `data/coverage/features.json`과 `data/coverage/blockers.json`을 생성했다. feature row는 5,344개이고, `implemented` 11개, `blocker` 5,333개다.
- M19 coverage에는 dynamic call 66개, persistence 134개, exit 3,536개, pause 931개, engine entry 9개, unreferenced global 652개가 포함된다. 원본 분석 count와 gate count가 일치한다.
- M19는 구현 완료 수를 늘리는 단계가 아니다. M28~M49가 `groupKey`와 `ownerMilestone` 기준으로 feature blocker를 줄여야 한다.
- M20에서 `data/coverage/definitions.json`을 생성했고 M23에서 ERB 기반 정의 160행을 병합했다. 현재 definition row는 8,000개이고, raw 정의 918개와 Chara seed 6,922행, ERB-derived 정의 160행이 모두 source evidence, 역할, runtime owner 후보, 실제/예정 consumer, status 또는 blocker를 가진다.
- M20은 정의 데이터 전수 분류와 소비 책임 배정이다. 실제 컨텐츠 효과 구현 완료가 아니다.
- M20/M23 definition status는 M34 이후 CFLAG 정의와 Chara CFLAG/RELATION seed 일부가 실제 소비 검증으로 승격되었다. 그래도 `template`/`listing`/`display-only`/`calculation-only`는 M28~M49에서 실제 소비 검증으로 계속 승격해야 한다.
- M20 blocker 중 즉시 사용 item은 M30에서 소비 근거가 있지만, 특수 item 15개는 M30 blocked 원인이다. 신체/능력/소질/경험 seed는 M33에서, CFLAG 정의 151개와 Chara CFLAG seed 1,465개 및 RELATION seed 532개는 M34에서, 턴/시간 진행 row는 M35에서, 방문/시설 row는 M36에서, 업무/창관/특수 업무 row는 M37에서, 촬영 장면 정의 row는 M38에서, 촬영 실행/판매 row는 M39에서, 훈련 세션 lifecycle row는 M40에서, 훈련 가능 조건 row는 M41에서 소비/분류를 닫았다. 남은 큰 묶음은 훈련 효과, 미션/이벤트/엔딩/정보 계열이며 M42~M49에서 의미별 owner와 lifecycle로 분해해야 한다.
- 데이터 완성도는 수집 수량이 아니라 실제 게임 구성 역할 기준으로 판정한다. 현재 feature coverage와 definition coverage는 v1로 생성되었지만, 전체 게임 완료 기준의 source/save/session coverage는 M21~M27과 M51/M52에서 닫는다.
- 변수, 정의 데이터, 기능 흐름, 저장/세션 판정의 1차 기준은 문서가 아니라 작업 루트의 `original-game/CSV`, `original-game/ERB`, `original-game/CSV/Chara*.csv`, `original-game/CSV/VariableSize.CSV`이다. 문서는 파생 해석이므로 문서만 보고 `implemented`, `used`, `mapped`를 부여하지 않는다.
- M21~M27에서는 source evidence, feature, definition, save mapping, session mapping, blocker/approved exclusion registry를 대조하는 gate를 추가해야 한다. 같은 gate는 M51/M52 최종 판정에서도 다시 실행한다.
- 누락 전수 감사 마일스톤은 세 종류로 둔다: M26 구현 전 `pre-implementation-gap-audit.json`, M28~M49 기능군 종료 `Mxx-gap-audit.json`, M51 최종 `final-gap-audit.json`. 감사에서 `discovered-gap`, `orphan-coverage`, `role-only`가 남으면 다음 단계로 넘어가지 않는다.
- M24에서 `map-save-state` 1,215행은 save-field 989개와 non-save 226개로 닫혔다. ERB persistent 후보 1,016개는 save-field 985개와 M25 session-state 이관 31개로 판정되었고 M24 후 미판정은 0개다.
- M25에서 `map-session-state` 365행은 session-field 298개와 calculation-internal 67개로 닫혔다. runtime session 후보 234개는 화면/훈련/촬영/업무/script scratch 계열로 분류되었고 M25 후 미판정은 0개다.
- M26에서 구현 전 누락 감사는 implementation review 14,546행, source-file-review 13행, 미해소 issue 0개로 닫혔다. save/session mapping row가 기능 완료 범위에 남거나 orphan/role-only로 남으면 해당 기능을 완료 처리하지 않는다.
- M27에서 구현 큐는 queue unit 36개, queued review row 14,546개, frozen blocker 59개, approved exclusion request candidate 59개로 동결했다. M27 owner로 남은 source-file-review 2개는 M51 최종 누락 감사 owner로 이관했다.
- M28에서 메인 화면 route 연결은 완료했다. `unit:M28:main-route` 27행 중 메인 메뉴 정의 24개는 route/action/view/dispatch/smoke 근거를 갖고, BOYFRIEND event-local screen session row 3개는 M47로 책임 이관했다.
- M29에서 아이템 상점 구매는 완료했다. `unit:M29:shop-purchase` 206행 중 implemented 43, mapped 40, transferredOut 123으로 닫았고, 실제 `SHOP_ITEM.ERB` 구매형 listing은 30개다.
- M30은 blocked다. 즉시 사용 아이템 flow는 구현했지만 특수 item 200~214의 훈련 효과는 M30에서 구현하지 않았고, 37개 transfer가 `ownedBlocker`로 남아 있다. `gate:item-use-coverage`와 `gate:milestone-scope-closure -- M30`은 현재 실패해야 정상이다.
- M31에서 영입 listing과 인물 생성은 완료했다. owned scope 237행 중 implemented 52, mapped 158, transferredOut 27로 닫았고 `Item.csv` 영입 listing 48개와 `recruit:150` 반복 영입을 생성 결과에 연결했다.
- M32에서 인물 원형과 identity는 완료했다. implementation queue 274행과 M31 inbound transfer 20행, 총 294행 중 implemented 286, mapped 8로 닫았고 Chara template 109개, identity 문자열, CSTR seed, lifecycle 상태를 정의/save 경계에 연결했다.
- M33에서 신체/능력/소질/경험은 완료했다. M27 queue 5,283행과 M33 필수 `Palam.csv` 정의 17행, 총 5,300행 중 implemented 4,768, mapped 465, transferredOut 67로 닫았다. Chara `BASE/ABL/TALENT/EXP` seed, `BASE/ABL/TALENT/EXP/MARK/PALAM` 표시 정의, `BASE/MAXBASE/EXP/MARK` save mapping을 people/body owner에 연결했다.
- M33에서 업무/촬영/훈련 결과 반영은 `src/features/bodyStats.ts` 공통 helper로 통일했다. `bodyStatDeltas`, `paramDeltas`, `resourceDeltas`가 같은 `body.byCharacterId.*` 저장 필드를 갱신한다.
- M34에서 관계/CFLAG/장비/의복 owner는 완료했다. M34 queue 2,149행과 M29/M31/M33 inbound transfer 83행, 총 2,232행 중 implemented 1,998, mapped 234로 닫았다. `splitLegacyCharacterFlags`, `buildWardrobeView`, `main/openWardrobe`, `wardrobe/toggleClothing`이 CFLAG seed, RELATION seed, 의복/장비 route의 실제 소비 경로다.
- M34.5에서 M35 진입 전 hardening을 완료했다. `gate:source-evidence`는 auxiliary evidence 완료 근거 169개를 primary `VariableSize.CSV` evidence로 재연결한 뒤 통과한다.
- M35에서 턴 종료와 시간 진행 완성을 완료했다. `coverage:turn-pipeline`, `gate:turn-pipeline`, `smoke:turn-long`을 실제 script로 교체했고, M35 owned scope 7행을 mapped 7, unresolved issue 0개로 닫았다.
- M35에서 `run.clock`에 day/week/month/year/currentTimeSlot/counter를 연결하고, `run.progressFlags.flag_34/flag_61`을 weekly/monthly hook 소비로 닫았다. 미션 기한, scheduled event, weekly/monthly automatic hook, world event flag, 월말 비용, session cleanup, save roundtrip은 `smoke:turn-long`이 검증한다.
- M36에서 방문/시설 완성을 완료했다. `coverage:visit-facility`, `gate:visit-facility`, `smoke:visit-all`을 실제 script로 교체했고, M36 owned scope 559행을 implemented 552, mapped 7, unresolved issue 0개로 닫았다.
- M36에서 방문 장소 7개와 source file + source label 기준 방문 action 86개를 runtime에 연결했다. 방문 선택값은 `GameSession.visit`에만 남고, 완료 결과는 `featureState.visits`, `world.eventFlags`, `world.unlocks`, `economy.account/accountingEntries` owner에만 반영된다.
- M37에서 업무/창관/특수 업무 완성을 완료했다. `coverage:work`, `gate:work-coverage`, `smoke:work-all`을 실제 script로 교체했고, M37 owned scope 461행을 implemented 286, mapped 175, unresolved issue 0개로 닫았다.
- M37에서 ERB-derived 업무 listing 8개와 원본 업무 source file + source label 기반 업무 정의 72개를 runtime `definitions.workDefinitions`로 연결했다. 업무 선택값은 `GameSession.work`에만 남고, 실행 결과는 `economy`, `people`, `body`, `work`, `run` owner에만 반영된다.
- M38에서 촬영 정의와 장면 조건 완성을 완료했다. `coverage:filming-scene`, `gate:filming-scene`, `smoke:filming-scenes`를 실제 script로 교체했고, M38 owned scope 6행을 mapped 6, unresolved issue 0개로 닫았다.
- M38에서 ERB-derived 촬영 장면 6개를 runtime `definitions.filmingSceneDefinitions`로 연결했다. 장면/대상 선택값과 촬영량 버퍼는 `GameSession.shooting`에만 남는다.
- M39에서 촬영 실행/결과/판매 완성을 완료했다. `coverage:filming-execution`, `gate:filming-execution`, `smoke:filming-all`을 실제 script로 교체했고, M39 owned scope 174행을 implemented 135, mapped 39, unresolved issue 0개로 닫았다.
- M39에서 촬영 실행 결과는 `economy.videoSalesTotal`, `work.filmingProgressFlags`, `work.filmingByCharacterId`, `work.careerFlagsByCharacterId`, `people`, `body` owner에만 반영한다. `session.shooting.sceneTemporaryValues`, `session.shooting.sceneFlags`, `session.interaction.participants.assistantId`는 저장 payload에 남지 않는다.
- M40에서 훈련 메뉴와 세션 완성을 완료했다. `coverage:training-session`, `gate:training-session`, `smoke:training-session`을 실제 script로 교체했고, M40 owned scope 11행을 implemented 5, mapped 6, unresolved issue 0개로 닫았다.
- M40에서 원본 `TRAIN_MAIN.ERB`의 `EVENTTRAIN`, `EVENTCOM`, `EVENTCOMEND`, `EVENTEND`, `JUEL_CHECK`, `SHOW_STATUS`, `FIGURE_INDENT`, `FIGURE_INDENT_SLASH`를 runtime consumer와 smoke 검증에 연결했다. 105개 훈련 command 후보 전체 view, 대상/실행자/조수 선택, 조수 해제, command 선택 reset, 누락/불가 실패, 선택 취소, 화면 취소, 실행 후 턴 종료와 session cleanup을 검증한다.
- M41에서 훈련 가능 조건 전수 구현을 완료했다. `coverage:training-availability`, `gate:training-availability`, `smoke:training-availability`를 실제 script로 교체했고, M41 owned scope 1,625행을 implemented 1,371, mapped 254, unresolved issue 0개로 닫았다.
- M41에서 원본 `COMABLE.ERB`의 `COM_ABLE*` source program 125개를 추출했고, `Train.csv` active command 105개 전부가 대응 source program을 가진다. `COMSEQ_REGISTER.ERB` dynamic call row와 `COMORDER.ERB` source-file-review row도 coverage/audit/closure에 반영했다.
- M41 availability는 저장 상태를 바꾸지 않는 view 계산으로 연결했고, 불가 command는 원본 availability rule 기반 사유를 표시한다. command 효과와 후처리는 M42~M44 소유로 남긴다.
- 다음 작업은 M28~M41 완료 선언 재정렬이다. 그 뒤 M42 훈련 command 효과 0~34를 원본 기준으로 닫는다.
- 원본 흐름 기준은 `GAME_FLOW_MAP.ko.md`가 소유한다.
- 데이터/상태 소유권 기준은 `GAME_DOMAIN_SYSTEM.md`가 소유한다.
- 모듈 경계와 import 방향은 `MODULE_SYSTEM.ko.md`가 소유한다.
- 실행 순서와 체크박스는 `NEW_PORT_MILESTONES.ko.md`가 소유한다.
- 현재 완료/미완료와 다음 작업은 `PROGRESS_STATUS.ko.md`가 소유한다.
- 미정 항목은 완료가 아니라 blocker로 기록한다.

## 마지막 검증

마지막으로 기록된 통과 명령:

```bash
npm run collect:catalog
npm run inventory:legacy-mapping
npm run coverage:features
npm run gate:feature-coverage
npm run coverage:definitions
npm run gate:definition-consumption
npm run analyze:game-system
npm run typecheck
npm run smoke:phase1
npm run smoke:m7
npm run smoke:m8
npm run smoke:m9
npm run smoke:m10
npm run smoke:m11
npm run smoke:m12
npm run smoke:m13
npm run smoke:m14
npm run test:roundtrip
npm run gate:boundaries
npm run gate:raw-names
npm run gate:stubs
npm run verify:m16
npm run coverage:source-manifest
npm run gate:source-evidence
npm run coverage:crosscheck
npm run gate:coverage-crosscheck
npm run gate:approved-exclusions
npm run coverage:erb-definitions
npm run gate:erb-definition-coverage
npm run coverage:save-mapping
npm run gate:save-mapping
npm run gate:state-family-index-coverage
npm run coverage:session-mapping
npm run gate:session-mapping
npm run gate:session-save-boundary
npm run audit:pre-implementation
npm run gate:pre-implementation-audit
npm run coverage:implementation-queue
npm run gate:implementation-queue
npm run coverage:main-routes
npm run gate:main-route-coverage
npm run gate:milestone-scope-closure -- M28
npm run smoke:main-routes
npm run coverage:shop-purchase
npm run gate:shop-purchase-coverage
npm run gate:milestone-scope-closure -- M29
npm run smoke:item-shop
npm run coverage:item-use
npm run smoke:item-use
npm run coverage:recruit
npm run gate:recruit-coverage
npm run gate:milestone-scope-closure -- M31
npm run smoke:recruit-all
npm run coverage:character-identity
npm run gate:character-identity
npm run gate:milestone-scope-closure -- M32
npm run smoke:character-identity
npm run coverage:body-stat
npm run gate:body-stat-mapping
npm run gate:milestone-scope-closure -- M33
npm run smoke:body-stat
npm run smoke:character-identity
npm run coverage:social-equipment-cflag
npm run gate:social-equipment-cflag
npm run gate:milestone-scope-closure -- M34
npm run smoke:social-equipment-cflag
npm run coverage:gate-registry
npm run gate:source-evidence
npm run gate:coverage-hardening
npm run gate:milestone-scope-closure -- M34.5
npm run coverage:turn-pipeline
npm run gate:turn-pipeline
npm run gate:milestone-scope-closure -- M35
npm run smoke:turn-long
npm run smoke:m8
npm run coverage:visit-facility
npm run gate:visit-facility
npm run gate:milestone-scope-closure -- M36
npm run smoke:visit-all
npm run smoke:m10
npm run coverage:work
npm run gate:work-coverage
npm run gate:milestone-scope-closure -- M37
npm run smoke:work-all
npm run smoke:m12
npm run coverage:filming-scene
npm run gate:filming-scene
npm run gate:milestone-scope-closure -- M38
npm run smoke:filming-scenes
npm run smoke:m13
npm run coverage:filming-execution
npm run gate:filming-execution
npm run gate:milestone-scope-closure -- M39
npm run smoke:filming-all
npm run smoke:m13
npm run coverage:training-session
npm run gate:training-session
npm run gate:milestone-scope-closure -- M40
npm run smoke:training-session
npm run smoke:m14
npm run coverage:training-availability
npm run gate:training-availability
npm run gate:milestone-scope-closure -- M41
npm run smoke:training-availability
npm run smoke:training-session
npm run smoke:m14
npm run verify:m16
npm run smoke:main-routes
npm run gate:definition-consumption
npm run typecheck
npm run build
npm run test --if-present
rg "adapters/legacy|legacy/" src/game src/domains src/catalog
rg "IMPLEMENTATION_UNIT_RULES|구현 전 template|구현 후 template|blocker template|M18" docs
rg "\bstate\.[A-Za-z0-9_.$\[\]?]+\s*=|\bsession\.[A-Za-z0-9_.$\[\]?]+\s*=|\.push\(|\.splice\(" src/ui
rg "CFLAG|TFLAG|SOURCE|TEQUIP|ITEMSALES|BOUGHT|COMF|SCENE_|LOSEBASE" src/game src/domains src/features src/ui
```

주요 결과:

- 정의 데이터 918개
- Chara CSV 109개
- Chara 초기값 6,922행
- `smoke:phase1` 통과: 새 게임, 상점 진입, 돈 부족 구매 실패, 구매 성공, 취소, unknown action 실패, save payload 경계 검증
- `smoke:m7` 통과: 영입 화면 진입, 돈 부족 실패, 영입 성공, 중복 실패, 취소, `people/body/social/equipment` 생성 경계 검증
- `smoke:m8` 통과: 턴 종료, 주차/월 롤오버, phase 복귀, 예약 이벤트 소비, session 임시 상태 폐기, save payload 경계 검증
- `smoke:m9` 통과: 저장 스냅샷 생성, JSON 역직렬화, runtime 오염 payload 차단, 손상 JSON/future schema 실패, 저장 roundtrip 검증
- `smoke:m10` 통과: 방문 화면 진입, 장소/행동 선택, 돈 부족 실패, 취소, 시설 해금 성공, 중복 실패, `visit` session 폐기, save payload 경계 검증
- `smoke:m11` 통과: 미션 선택, 수락 전 보고 실패, 수락 저장, 조건 미충족 보고 실패, 방문 조건 달성, 보고 완료/보상 지급, `mission-session` 폐기, save payload 경계 검증
- `smoke:m12` 통과: 업무 화면 진입, 업무/참여 인물 선택, 미선택/인물 누락 실패, 취소, 업무 실행, 돈/경험/신체 피로/업무 이력 저장 반영, 턴 종료, `work-session` 폐기, save payload 경계 검증
- `smoke:m13` 통과: 촬영 화면 진입, 대상/장면 선택, 대상/장면 누락 실패, 선택 취소, 화면 취소, 촬영 확정, 수익/팬/점수/경험/신체 피로/촬영 이력 저장 반영, 턴 종료, `shooting-session` 폐기, save payload 경계 검증
- `smoke:m14` 통과: 훈련 화면 진입, 대상/실행자/command 선택, command/대상/실행자 누락 실패, 선택 취소, 훈련 실행, 파라미터/자원/경험/신체 피로 저장 반영, 턴 종료, interaction session 폐기, save payload 경계 검증
- M15 UI 직접 상태 변경 검색 통과: `state.* =`, `session.* =`, `push`, `splice` 매칭 0개
- `test:roundtrip` 통과: 새 게임, 아이템 구매, 영입, 턴 종료 후 snapshot/load가 save state를 정확히 복원
- `gate:boundaries` 통과: runtime diagnostics error 0개, action result boundary, save payload boundary, session/definitions/views 오염 payload 실패 검증
- `gate:raw-names` 통과
- `gate:stubs` 통과: 문서화된 보류 marker 28개, 미등록 marker 0개
- `verify:m16` 통과
- `inventory:legacy-mapping` 통과: 원본 주소 수집 진단 0건
- core adapter import 경계 검색 통과: `src/game`, `src/domains`, `src/catalog`에서 `adapters/legacy|legacy/` 매칭 0개
- M18 반복 구현 규칙 검색 통과: 기준 문서, 구현 전/후 template, blocker template 참조 확인
- `coverage:features` 통과: feature row 5,344개, blocker group 59개 생성
- `gate:feature-coverage` 통과: dynamic 66 / persistence 134 / exit 3,536 / pause 931 / engine entry 9 / unreferenced global 652 count 일치
- `coverage:definitions` 통과: 현재 definition row 8,000개, blocker group 59개 생성. auxiliary source/cflag row 169개는 primary `VariableSize.CSV` evidence로 재연결됨
- `gate:definition-consumption` 통과: raw definition 918개와 Chara seed 6,922행 count 일치
- M21~M27 coverage/gate 통과: source evidence, crosscheck, ERB definition, save/session mapping, pre-implementation audit, implementation queue 산출물 생성
- M28 main route coverage/gate/smoke 통과: owned row 27개, unresolved issue 0개
- M29 shop purchase coverage/gate/smoke 통과: owned row 206개, unresolved issue 0개
- M30 item use 재판정: owned row 74개, implemented 21, mapped 16, transferredOut 37, ownedBlocker 37. `gate:item-use-coverage`와 `gate:milestone-scope-closure -- M30`은 실패해야 정상이다.
- M31 recruit coverage/gate/smoke 통과: owned row 237개, unresolved issue 0개
- M32 character identity coverage/gate/smoke 통과: owned row 294개, unresolved issue 0개
- M33 body/stat coverage/gate/smoke 통과: owned row 5,300개, unresolved issue 0개
- M34 social/equipment/CFLAG coverage/gate/smoke 통과: owned row 2,232개, unresolved issue 0개
- M34.5에서 `npm run gate:source-evidence` 실패 원인이던 auxiliary evidence 완료성 row 169개를 primary source evidence로 재연결했고, M35~M52 gate registry와 final verify skeleton을 추가했다.
- M35 turn pipeline coverage/gate/smoke 통과: owned row 7개, unresolved issue 0개
- M36 visit facility coverage/gate/smoke 통과: owned row 559개, unresolved issue 0개
- M37 work coverage/gate/smoke 통과: owned row 461개, unresolved issue 0개
- M38 filming scene coverage/gate/smoke 통과: owned row 6개, unresolved issue 0개
- M39 filming execution coverage/gate/smoke 통과: owned row 174개, unresolved issue 0개
- M40 training session coverage/gate/smoke 통과: owned row 11개, unresolved issue 0개
- M41 training availability coverage/gate/smoke 통과: owned row 1,625개, unresolved issue 0개. 원본 `COMABLE.ERB` source program 125개와 active command 105개 대응 검증
- `smoke:main-routes` 통과: 메인 메뉴 108 wardrobe route 활성화 확인
- `analyze:game-system` 통과
- `tsc --noEmit` 통과
- `vite build` 통과
- 123 modules transformed
- 원본명 직접 사용 차단 검색 통과, 매칭 0개

## 바로 다음 작업

1. Phase 1 구현은 M0~M6 기준으로 완료되었고, `npm run smoke:phase1`와 `npm run build`를 통과했다.
2. M7 고용/영입 1차는 완료되었고 `npm run smoke:m7`와 `npm run build`를 통과했다.
3. M8 턴 종료/시간 진행은 완료되었고 `npm run smoke:m8`와 `npm run build`를 통과했다.
4. M9 저장/로드는 완료되었고 `npm run smoke:m9`와 `npm run build`를 통과했다.
5. M10 방문/시설 1차는 완료되었고 `npm run smoke:m10`와 `npm run build`를 통과했다.
6. M11 미션 1차는 완료되었고 `npm run smoke:m11`와 `npm run build`를 통과했다.
7. M12 업무 1차는 완료되었고 `npm run smoke:m12`와 `npm run build`를 통과했다.
8. M13 촬영 1차는 완료되었고 `npm run smoke:m13`와 `npm run build`를 통과했다.
9. M14 훈련 1차는 완료되었고 `npm run smoke:m14`와 `npm run build`를 통과했다.
10. M15 화면 정리와 진단 패널은 완료되었고 `npm run typecheck`, 기존 smoke 전체, `npm run build`, UI 직접 변경 검색을 통과했다.
11. M16 테스트/검증 체계 확장은 완료되었고 `npm run verify:m16`을 통과했다.
12. M17 원본 근거 대조 정책은 완료되었고 `npm run inventory:legacy-mapping`, adapter import 경계 검색, `npm run typecheck`, `npm run build`, `npm run verify:m16`을 통과했다.
13. M18 반복 구현 규칙 고정은 완료되었고 `IMPLEMENTATION_UNIT_RULES.ko.md`, `npm run build`, `npm run test --if-present`, template 참조 검색으로 확인되었다.
14. M19 원본 기능 커버리지 전수표는 완료되었고 `npm run coverage:features`, `npm run gate:feature-coverage`, `npm run analyze:game-system`, `npm run build`로 확인되었다.
15. M20 정의 데이터 전수 분류와 소비 책임 배정은 완료되었고 `npm run collect:catalog`, `npm run coverage:definitions`, `npm run gate:definition-consumption`, `npm run build`로 확인되었다. 이것은 실제 컨텐츠 효과 구현 완료가 아니라 M28~M49의 실제 소비 검증을 위한 장부 완료다.
16. M21 원본 근거 장부 확정은 완료되었고 `npm run coverage:source-manifest`, `npm run gate:source-evidence`, `npm run build`로 확인되었다.
17. M22 coverage 교차 대조 gate는 완료되었고 `npm run coverage:crosscheck`, `npm run gate:coverage-crosscheck`, `npm run gate:approved-exclusions`, `npm run build`로 확인되었다.
18. M23 ERB 기반 정의 데이터 보강은 완료되었고 `npm run coverage:erb-definitions`, `npm run coverage:definitions`, `npm run gate:erb-definition-coverage`, `npm run gate:coverage-crosscheck`, `npm run build`로 확인되었다.
19. M24 저장 상태 원본 주소 전수 매핑은 완료되었고 `npm run coverage:save-mapping`, `npm run gate:save-mapping`, `npm run gate:state-family-index-coverage`, `npm run gate:coverage-crosscheck`, `npm run build`로 확인되었다.
20. M25 세션/계산 원본 주소 전수 매핑은 완료되었고 `npm run coverage:session-mapping`, `npm run gate:session-mapping`, `npm run gate:session-save-boundary`, `npm run gate:coverage-crosscheck`, `npm run build`로 확인되었다.
21. M26 구현 전 누락 감사는 완료되었고 `npm run audit:pre-implementation`, `npm run gate:pre-implementation-audit`, `npm run build`로 확인되었다.
22. M27 구현 단위 큐와 blocker 동결은 완료되었고 `npm run coverage:implementation-queue`, `npm run gate:implementation-queue`, `npm run build`, `npm run test --if-present`로 확인되었다.
23. M28 메인 화면과 route 전수 연결은 완료되었고 `npm run coverage:main-routes`, `npm run gate:main-route-coverage`, `npm run gate:milestone-scope-closure -- M28`, `npm run smoke:main-routes`, `npm run build`로 확인되었다.
24. M29 아이템 상점과 구매 완성은 완료되었고 `npm run coverage:shop-purchase`, `npm run gate:shop-purchase-coverage`, `npm run gate:milestone-scope-closure -- M29`, `npm run smoke:item-shop`, `npm run smoke:phase1`, `npm run build`로 확인되었다.
25. M30 아이템 사용은 즉시 사용 아이템 flow 기준으로 근거가 있지만, 2026-05-02 재판정에서 `status: blocked`로 되돌렸다. `npm run coverage:item-use`는 ownedBlocker 37개를 기록하며, `npm run gate:item-use-coverage`와 `npm run gate:milestone-scope-closure -- M30`은 실패해야 정상이다.
26. M31 영입 listing과 인물 생성 완성은 완료되었고 `npm run coverage:recruit`, `npm run gate:recruit-coverage`, `npm run gate:milestone-scope-closure -- M31`, `npm run smoke:recruit-all`, `npm run smoke:m7`, `npm run smoke:main-routes`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다.
27. M32 인물 원형과 identity 완성은 완료되었고 `npm run coverage:character-identity`, `npm run gate:character-identity`, `npm run gate:milestone-scope-closure -- M32`, `npm run smoke:character-identity`, `npm run smoke:recruit-all`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다.
28. M33 신체/능력/소질/경험 완성은 완료되었고 `npm run coverage:body-stat`, `npm run gate:body-stat-mapping`, `npm run gate:milestone-scope-closure -- M33`, `npm run smoke:body-stat`, `npm run smoke:character-identity`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다.
29. M34 관계/CFLAG/장비/의복 owner 완성은 `npm run coverage:social-equipment-cflag`, `npm run gate:social-equipment-cflag`, `npm run gate:milestone-scope-closure -- M34`, `npm run smoke:social-equipment-cflag`, `npm run smoke:main-routes`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M34 owned scope 2,232행 중 implemented 1,998, mapped 234, unresolved issue 0개로 닫았다.
30. M34 이후 전수 검토에서 M35 진입 전 hardening 필요가 확인되었다.
31. M34.5 전수 이식 gate hardening은 완료되었다. `gate:source-evidence`, `gate:coverage-hardening`, `gate:coverage-crosscheck`, `gate:pre-implementation-audit`, `gate:implementation-queue`, `build`, `test --if-present`가 통과했다.
32. M35 턴 종료와 시간 진행 완성은 `npm run coverage:turn-pipeline`, `npm run gate:turn-pipeline`, `npm run gate:milestone-scope-closure -- M35`, `npm run smoke:turn-long`, `npm run smoke:m8`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M35 owned scope 7행 중 mapped 7, unresolved issue 0개로 닫았다.
33. M36 방문/시설 완성은 `npm run coverage:visit-facility`, `npm run gate:visit-facility`, `npm run gate:milestone-scope-closure -- M36`, `npm run smoke:visit-all`, `npm run smoke:m10`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M36 owned scope 559행 중 implemented 552, mapped 7, unresolved issue 0개로 닫았다.
34. M37 업무/창관/특수 업무 완성은 `npm run coverage:work`, `npm run gate:work-coverage`, `npm run gate:milestone-scope-closure -- M37`, `npm run smoke:work-all`, `npm run smoke:m12`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M37 owned scope 461행 중 implemented 286, mapped 175, unresolved issue 0개로 닫았다.
35. M38 촬영 정의와 장면 조건 완성은 `npm run coverage:filming-scene`, `npm run gate:filming-scene`, `npm run gate:milestone-scope-closure -- M38`, `npm run smoke:filming-scenes`, `npm run smoke:m13`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M38 owned scope 6행 중 mapped 6, unresolved issue 0개로 닫았다.
36. M39 촬영 실행/결과/판매 완성은 `npm run coverage:filming-execution`, `npm run gate:filming-execution`, `npm run gate:milestone-scope-closure -- M39`, `npm run smoke:filming-all`, `npm run smoke:m13`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M39 owned scope 174행 중 implemented 135, mapped 39, unresolved issue 0개로 닫았다.
37. M40 훈련 메뉴와 세션 완성은 `npm run coverage:training-session`, `npm run gate:training-session`, `npm run gate:milestone-scope-closure -- M40`, `npm run smoke:training-session`, `npm run smoke:m14`, `npm run verify:m16`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M40 owned scope 11행 중 implemented 5, mapped 6, unresolved issue 0개로 닫았다.
38. M41 훈련 가능 조건 전수 구현은 `npm run coverage:training-availability`, `npm run gate:training-availability`, `npm run gate:milestone-scope-closure -- M41`, `npm run smoke:training-availability`, `npm run smoke:training-session`, `npm run smoke:m14`, `npm run verify:m16`, `npm run gate:raw-names`, `npm run typecheck`, `npm run build`, `npm run test --if-present`로 확인되었다. M41 owned scope 1,625행 중 implemented 1,371, mapped 254, unresolved issue 0개로 닫았다.
39. 다음 작업은 M28~M41 완료 선언 재정렬 후 M42 훈련 command 효과 0~34 구현이다. command 0~34의 source 계산, 결과 owner, 성공/불가/취소/session cleanup을 원본 기준으로 닫는다.

## 읽을 문서

| 문서 | 용도 |
| --- | --- |
| `docs/README.md` | 문서 책임 분리 |
| `docs/NEW_PORT_MILESTONES.ko.md` | 실행 순서와 체크박스 |
| `docs/PROGRESS_STATUS.ko.md` | 현재 완료/미완료와 다음 작업 |
| `docs/GAME_FLOW_MAP.ko.md` | 기능 흐름 기준 |
| `docs/GAME_DOMAIN_SYSTEM.md` | 데이터 소유권 기준 |
| `docs/MODULE_SYSTEM.ko.md` | 모듈 경계 |
| `docs/LEGACY_MAPPING_POLICY.ko.md` | 원본 근거 대조 상태값, evidence, 승인/차단 정책 |
| `docs/IMPLEMENTATION_UNIT_RULES.ko.md` | 구현 전/후 template, blocker template, 1회 최대 구현 단위 |

## 최신 인수인계: 완료 선언 재정렬 후 M42 blocked

- M28~M41 완료 선언은 현재 완전 포팅 보장 기준으로 신뢰하지 않는다. M30은 blocked로 재판정 완료했으므로, `PORT_COMPLETION_COVERAGE_REVIEW.ko.md`와 `M28_M41_DONE_NOT_DONE_LEDGER.ko.md` 기준으로 M35, M38, M39, M41을 우선 재판정한다.
- M42는 완료가 아니다.
- 이유: 이전 산출물은 원본 `COMF0.ERB`~`COMF34.ERB` 효과 계산을 구현한 것이 아니라 `SOURCE/LOSEBASE/EXP` 라인 인덱싱과 static profile 생성을 완료로 오판했다.
- 현재 M42 closure는 `status: blocked`이며, `training-effect-0-34.json`은 implemented 0, ownedBlocker 35, missingVerification 35를 기록한다.
- `npm run gate:training-effect -- 0-34`는 원본 효과 계산 구현 전까지 실패해야 한다.
- 다음 세션은 M28~M41 완료 선언 재정렬 후 M42를 재개한다. M43로 넘어가지 않는다.
