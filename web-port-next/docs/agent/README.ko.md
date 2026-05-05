# 에이전트 시작 문서

이 폴더는 Codex/서브에이전트가 세션 시작 때 먼저 읽는 얇은 문서다. 목적은 토큰 누수를 줄이는 것이며, 완료 판정 기준을 줄이는 것이 아니다.

## 현재 기준

- M28 strict closure 완료: 24개 main-route contract row는 M28 소유 구현 완료, BOYFRIEND event-local session row 3개는 M28 approved-excluded 및 M47 책임.
- 다음 작업은 M32~M52 책임 명시/freeze 보강이다. 그 뒤 첫 closure 대상은 M32다. M28~M31은 strict closure 완료 상태다.
- M32~M41이 strict manifest 기준으로 닫히거나 blocked/scope-redesign-required로 정정되기 전에는 M42 구현을 재개하지 않는다. M28~M31은 strict closure 완료 상태다.
- 현재 aggregate: total 11,226; implemented-verified 8,035; approved-excluded 273; blocked 2,819; scope-redesign-required 99; completedAllowedNow true 4 / false 22.

## 읽기 순서

1. `CODEX_BOOTSTRAP.ko.md`
2. `KNOWN_ISSUES.ko.md`
3. `CURRENT_STATUS.ko.md`
4. `NEXT_MILESTONE.ko.md`
5. 현재 마일스톤의 상세 체크리스트가 필요하면 `../milestones/README.ko.md`와 해당 phase 문서의 현재 마일스톤 section
6. 필요한 경우에만 `../NEW_PORT_MILESTONES.ko.md`의 공통 완료 기준, 책임 축소 금지, phase 경계
7. 구현 판단이 필요하면 원본 파일, coverage row, gate, runtime code를 직접 확인

## 권위 경계

이 폴더의 문서는 dashboard와 시작점이다. 완료 판정 권위는 아래 자료에 있다.

- 원본 파일: `original-game/CSV`, `original-game/ERB`, `original-game/CSV/Chara*.csv`, `original-game/CSV/VariableSize.CSV`
- coverage 원장: `data/coverage/features.json`, `data/coverage/definitions.json`, `data/coverage/save-mapping.json`, `data/coverage/session-mapping.json`, 마일스톤별 coverage
- 검증: 마일스톤별 coverage/gate/smoke, `gate:milestone-scope-closure`, `npm run build`, 필요한 회귀 검증
- 완료 기록: `data/coverage/audits/Mxx-gap-audit.json`, `data/coverage/milestones/Mxx-closure.json`

## 사용 규칙

- 이 문서만 보고 `implemented`, `used`, `mapped`, `approved-excluded`를 부여하지 않는다.
- query/검색 결과는 읽을 위치를 찾는 용도다. 완료 근거가 아니다.
- 대형 JSON과 긴 문서는 전체 출력하지 않는다. 필요한 row, section, blocking metric만 좁게 조회한다.
- gate 실패 출력은 요약만 대화에 남기고, 전체 실패 목록은 artifact로 남겨야 한다.
- milestone 완료 전에는 원본 row, runtime consumer, verification, closure/gap audit을 직접 확인한다.
- phase 문서는 탐색 시작점일 뿐이며, 책임 축소나 완료 판정 근거로 쓰지 않는다.
- 구현 중 책임을 이관하며 완료 범위를 줄이지 않는다. 다른 owner 후보가 보이면 구현을 멈추고 책임 명시/freeze 문서와 receiver manifest를 먼저 고친다.
