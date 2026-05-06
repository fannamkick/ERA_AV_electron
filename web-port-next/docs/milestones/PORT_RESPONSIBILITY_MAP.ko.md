# 전체 포팅 책임 지도

이 문서는 전체 작업을 세 층으로만 본다.

1. 프로젝트: 원본 게임 전체를 web port로 완성한다.
2. 페이즈: 전체 포팅을 작업 단계로 나눈다.
3. 마일스톤: 각 호출에서 끝낼 책임 단위다.

gate, coverage, closure, 사실 장부는 이 책임 구조를 검증하는 도구다. 책임 구조를 대체하지 않는다.

## 현재 closure 상태

- M28은 strict source-unit manifest 기준으로 완료됐다.
- M29, M30, M31도 strict source-unit manifest 기준으로 완료됐다.
- Next work is not a new implementation jump. M28~M34 are strict-closed; start M34.5 closure correction, then M35~M41 before M42 resumes.
- M34.5~M41이 완료 또는 명시적 blocked/scope-redesign-required closure로 정리되기 전에는 M42를 재개하지 않는다. M28~M34은 strict closure 완료 상태다.
- M28~M52 aggregate는 total 11,226, implemented-verified 8,035, approved-excluded 273, blocked 2,819, scope-redesign-required 99, completedAllowedNow true 4 / false 22다.

## 책임 명시/freeze 작업

Phase 5 이후 구현 마일스톤은 먼저 책임을 고정한 뒤 실행한다. 진행 중에 다른 마일스톤으로 넘기며 완료 범위를 줄이는 방식은 금지한다.

책임 명시 작업의 산출물:

- 각 M의 owned runtime responsibility 한 문장
- 원본 단위 매니페스트 경로
- owned unit count
- 승인 제외 후보 count와 제외 사유
- 다른 owner 후보 count와 실제 owner
- receiver manifest 반영 여부
- 완료 금지 조건: `mapped`, `source-file-review`, `transferredOut`, owner-only row, 예정 verification만 남은 unit
- phase/마일스톤 상세 문서의 체크 항목별 책임 표기: `[HERE:Mxx]`, `[LATER:Myy]`, `[EXCLUDED->Myy]`, `[BLOCKED:Mxx]`, `[REDESIGN]`, `[VERIFY:Mxx]`, `[DOC-ONLY]`

이 산출물이 없는 마일스톤은 구현을 시작하지 않는다. 작업 중 owner가 섞인 사실이 발견되면 즉시 구현을 멈추고 `scope-redesign-required`로 남긴다. 책임 재분리는 별도 책임 명시 작업으로 처리하며, 그 호출의 구현 완료로 세지 않는다.

## 스킵 방지 계약

각 마일스톤 호출은 시작 전에 `원본 단위 매니페스트`를 만든 뒤에만 작업한다. 매니페스트는 그 호출이 닫아야 하는 ERB label, CSV row, Chara seed, save/session address, command/effect source, route/action/view 단위를 모두 적은 목록이다.

완료 선언은 숫자 보고가 아니라 매니페스트 대조 결과다. 종료 시 매니페스트의 모든 단위는 아래 상태 중 하나로 닫혀야 한다.

| 상태 | 의미 | `[구현]` 완료 허용 |
| --- | --- | --- |
| `implemented-verified` | runtime consumer와 성공/실패/취소/roundtrip 또는 전용 검증이 있다. | 허용 |
| `approved-excluded` | 사용자가 승인한 제외 근거와 제외 범위가 있다. | 허용 |
| `blocked` | 책임 범위 안에 남은 미구현/미검증 단위다. | 금지 |
| `scope-redesign-required` | 다른 owner 책임이 섞여 있어 마일스톤 범위를 다시 나눠야 한다. | 금지 |

`mapped`, `source-file-review`, `runtimeConsumerId` 예정값, `verificationId` 예정값, `transferredOut`는 완료 상태가 아니다. `[구현]` 마일스톤에서 이런 상태가 하나라도 남으면 먼저 매니페스트를 재분리하거나 `blocked`로 닫는다.

closure/gap/progress에는 매니페스트 경로, 단위별 상태 요약, blocked/scope-redesign-required 단위 목록, 실행한 gate/smoke/build 명령을 남긴다. 숫자는 확인용 요약일 뿐이며, 단위별 대조 없이 완료 판정에 쓰지 않는다.

## 프로젝트

| 층 | 책임 | 완료 위치 |
| --- | --- | --- |
| 전체 프로젝트 | 원본 ERB/CSV/Chara/VariableSize 기반 기능, 정의 데이터, 저장 상태, 세션/계산 상태, 화면 흐름, 이벤트, 엔딩을 web runtime behavior로 이식한다. | M52 |

## 페이즈

| Phase | 범위 | 해야 할 일 | 완료로 착각하면 안 되는 것 |
| --- | --- | --- | --- |
| Phase 1 | M0~M6 | 최소 web runtime과 첫 세로 루프를 만든다. | 전체 게임 기능 구현 |
| Phase 2 | M7~M16 | 핵심 루프와 저장/검증 골격을 확장한다. | 각 기능군 전수 구현 |
| Phase 3 | M17~M20 | 원본 근거, 구현 규칙, 기능/정의 coverage를 만든다. | coverage 생성 자체를 구현 완료로 해석 |
| Phase 4 | M21~M27 | source/save/session mapping, gap audit, implementation queue를 확정한다. | 책임 배정을 runtime 구현 완료로 해석 |
| Phase 5 | M28~M49 | 기능군별 runtime behavior를 실제 구현한다. | transfer/mapped/source-file-review를 완료로 해석 |
| Phase 6 | M50~M52 | 전체 저장/로드, 최종 gap audit, 완전 포팅 판정을 닫는다. | 남은 구현을 최종 단계에서 숨김 |

## 마일스톤

| M | Phase | 호출 책임 |
| --- | --- | --- |
| M0 | Phase 1 | Phase 1의 포함/제외와 blocker 가능 지점을 동결한다. |
| M1 | Phase 1 | route/action/result/effect 공통 실행 계약을 만든다. |
| M2 | Phase 1 | save state, session state, view 계산 객체의 타입 경계를 만든다. |
| M3 | Phase 1 | 원본 CSV 정의 데이터를 runtime definitions로 연결한다. |
| M4 | Phase 1 | 새 게임 생성과 초기 save state를 만든다. |
| M5 | Phase 1 | 최소 메인 화면 view와 route 진입을 만든다. |
| M6 | Phase 1 | 구매형 아이템 1차 루프를 성공/실패/취소까지 만든다. |
| M7 | Phase 2 | 영입 1차 루프와 인물 생성 경계를 만든다. |
| M8 | Phase 2 | 턴 종료/시간 진행 1차 실행 계약을 만든다. |
| M9 | Phase 2 | 저장/로드 1차 roundtrip과 payload 오염 차단을 만든다. |
| M10 | Phase 2 | 방문/시설 1차 루프를 만든다. |
| M11 | Phase 2 | 미션 1차 루프를 만든다. |
| M12 | Phase 2 | 업무 1차 루프를 만든다. |
| M13 | Phase 2 | 촬영 1차 루프를 만든다. |
| M14 | Phase 2 | 훈련 1차 command 루프를 만든다. |
| M15 | Phase 2 | 화면 렌더링 구조와 진단 패널을 정리한다. |
| M16 | Phase 2 | 반복 검증 체계를 만든다. |
| M17 | Phase 3 | 원본 근거 대조 정책을 고정한다. |
| M18 | Phase 3 | 반복 구현 단위 규칙을 고정한다. |
| M19 | Phase 3 | 원본 기능 coverage 전수표를 만든다. |
| M20 | Phase 3 | 정의 데이터와 Chara seed의 소비 책임을 분류한다. |
| M21 | Phase 4 | source evidence 장부를 확정한다. |
| M22 | Phase 4 | feature/definition/save/session/blocker 교차 대조 gate를 만든다. |
| M23 | Phase 4 | ERB 기반 정의 후보를 보강한다. |
| M24 | Phase 4 | 원본 persistent 후보를 save owner로 매핑한다. |
| M25 | Phase 4 | 원본 session/calculation 후보를 lifecycle owner로 매핑한다. |
| M26 | Phase 4 | 구현 전 누락과 owner 불명을 감사한다. |
| M27 | Phase 4 | M28~M49 구현 큐와 blocker 해소 책임을 동결한다. |
| M28 | Phase 5 | 원본 메인 화면 route/action/view를 전수 연결한다. |
| M29 | Phase 5 | 구매형 상점 listing과 구매 결과를 전수 구현한다. |
| M30 | Phase 5 | 즉시 사용 아이템 9개의 사용 flow와 효과를 구현한다. 특수 item 200~214는 이 책임에서 제외하고 실제 소비 owner로 분리한다. |
| M31 | Phase 5 | 영입 listing 전체와 인물 생성 결과를 구현한다. |
| M32 | Phase 5 | 인물 원형과 identity/lifecycle을 구현한다. |
| M33 | Phase 5 | 신체/능력/소질/경험 seed와 표시/저장 owner를 구현한다. |
| M34 | Phase 5 | 관계/CFLAG/장비/의복 owner를 구현한다. |
| M34.5 | Phase 5 | M35 이후 완료 차단 gate를 실제 script로 강화한다. |
| M35 | Phase 5 | 턴 종료, 시간 진행, hook 순서, session cleanup을 구현한다. |
| M36 | Phase 5 | 방문 장소, 시설, 장소별 행동, 해금/비용/결과를 구현한다. |
| M37 | Phase 5 | 업무/창관/특수 업무 조건과 결과를 구현한다. |
| M38 | Phase 5 | 촬영 장면 정의, 대상 조건, 장면 조건을 구현한다. |
| M39 | Phase 5 | 촬영 실행, 수익, 팬, 점수, 출시/판매 상태를 구현한다. |
| M40 | Phase 5 | 훈련 대상/실행자/조수/command 선택 session lifecycle을 구현한다. |
| M41 | Phase 5 | 훈련 command availability와 불가 사유를 구현한다. |
| M42 | Phase 5 | `Train.csv` command 0~34에 연결된 `COMF*.ERB` 효과 source, 특수 item 소비, 결과 반영을 구현한다. |
| M43 | Phase 5 | `Train.csv` command 35~69에 연결된 `COMF*.ERB` 효과 source, 특수 item 소비, 결과 반영을 구현한다. |
| M44 | Phase 5 | command 70 이상과 번호 범위 밖에서 소비되는 훈련 효과 source 전체, 공통 후처리를 구현한다. |
| M45 | Phase 5 | 능력 상승, 휴식, 회복, 자동 아이템, 공통 유지보수를 구현한다. |
| M46 | Phase 5 | 미션 전체 lifecycle을 구현한다. |
| M47 | Phase 5 | 세계/이벤트/스토리 trigger, condition, effect, hook을 구현한다. |
| M48 | Phase 5 | 엔딩, 계승, global/meta 상태를 구현한다. |
| M49 | Phase 5 | 정보/도움말/설정/view/text와 명시적으로 M49 intake된 잔여 기능만 닫는다. |
| M50 | Phase 6 | 전체 기능 후 저장/로드, schema, migration, 오염 payload 차단을 검증한다. 남은 구현은 해당 owner로 되돌린다. |
| M51 | Phase 6 | 최종 누락, orphan, role-only, 미승인 제외, blocker를 감사한다. |
| M52 | Phase 6 | 완전 포팅 여부를 최종 판정한다. |

## 적용 규칙

- 각 phase 문서는 이 책임 지도를 자기 범위로 잘라 적는다.
- 각 마일스톤 상세 체크리스트는 이 책임을 수행하는 세부 항목이다.
- 각 체크 항목은 현재 호출에서 하는 일인지, 뒤 마일스톤이 하는 일인지, 승인 제외인지, blocked/redesign인지 줄 단위로 표기한다.
- 각 마일스톤 실행 결과는 위 `스킵 방지 계약`의 원본 단위 매니페스트를 단위별로 닫은 뒤에만 완료 판정한다.
- 체크리스트와 책임 지도가 충돌하면 책임 지도가 우선하며, 체크리스트를 고친다.
- 구현 중 다른 owner 책임이 발견되면 구현을 멈추고 먼저 책임을 다시 나눈다. 진행 중 이관으로 해당 호출을 계속하지 않고, 기존 완료 선언도 유지하지 않는다.
- phase/마일스톤 문서의 체크박스는 gate 통과 전에는 상태 선언이 아니다. gate가 책임 지도와 충돌하면 체크박스를 되돌린다.
