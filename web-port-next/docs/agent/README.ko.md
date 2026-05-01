# 에이전트 시작 문서

이 폴더는 Codex/서브에이전트가 세션 시작 때 먼저 읽는 얇은 문서다. 목적은 토큰 누수를 줄이는 것이며, 완료 판정 기준을 줄이는 것이 아니다.

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
