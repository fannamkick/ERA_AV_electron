# Codex Bootstrap

이 문서는 세션 시작용 압축 규칙이다. 완료 기준을 대체하지 않는다.

## 절대 규칙

- `.env.local`을 읽거나 출력하지 않는다.
- 유료 AI/OpenRouter 호출을 실행하지 않는다.
- unrelated dirty files를 되돌리거나 커밋에 섞지 않는다.
- 기존 `web-port` 산출물은 참고 자료이며 구현 기준으로 승격하지 않는다.
- 기본 shell은 PowerShell이다. Bash heredoc(`node - <<'NODE'`)과 Bash redirection 예시를 그대로 실행하지 않는다. 반복 이슈는 `KNOWN_ISSUES.ko.md`를 따른다.
- 원본 변수명(`CFLAG`, `TFLAG`, `SOURCE`, `TEQUIP`, `COMF`, `LOSEBASE` 등)을 앱 모델명으로 복사하지 않는다.
- `blocker`, `needsDecision`, `missingMapping`, `needs-review`, `role-only`, 승인 없는 `approved-excluded`는 완료가 아니다.
- 마일스톤 책임을 라인 색인, static profile, 자체 scaffold gate로 축소하지 않는다.
- 책임 범위는 `docs/milestones/PORT_RESPONSIBILITY_MAP.ko.md`와 해당 phase 문서의 `페이즈 책임`을 우선한다.
- 각 마일스톤은 시작 전에 원본 단위 매니페스트를 만들고, 종료 전에 모든 단위를 `implemented-verified`, `approved-excluded`, `blocked`, `scope-redesign-required` 중 하나로 닫는다.
- 완료 판정 전에는 `docs/milestones/RESPONSIBILITY_SEPARATION_RULES.ko.md` 기준으로 completed/blocked/scope-redesign-required를 먼저 판단한다.

## 완료 권위

완료 판정은 다음 자료로만 한다.

1. 실제 원본 위치: 파일, 라벨, CSV 행, family/index
2. runtime consumer: route/action/handler/view/calculation/save 또는 session consumer
3. verification: 성공/실패/취소/예외, roundtrip 또는 boundary 검증
4. coverage/gap/closure: 마일스톤 coverage, `Mxx-gap-audit.json`, `Mxx-closure.json`
5. 검증 명령: 전용 coverage/gate/smoke, `gate:milestone-scope-closure -- Mxx`, `npm run build`

`Mxx-closure.json`이 `completed`이면 `responsibilityIntegrity`가 있어야 한다. 마일스톤 책임 동사가 runtime behavior와 검증으로 닫히지 않았거나, 알려진 한계가 책임 범위 안에 있으면 완료가 아니라 blocked다.

완료를 주장할 때는 gate 결과보다 먼저 "원본 단위 매니페스트에서 완료로 처리한 것", "안 했거나 넘긴 것", "재확인 필요한 것"을 자연어로 적는다. `implemented`, `mapped`, `transferredOut` 숫자만으로 완료를 선언하지 않는다.

`transferredOut > 0`, file-level `source-file-review`, owner-only `mapped`, implemented 0/mapped-only closure, 원본 숫자 범위 밖 command 발견은 모두 의심 신호다. 이 경우 completed를 금지하고 responsibility separation 기준으로 재판정한다.

closure 작성/완료 판정 시 query 결과만 사용하지 않는다. 해당 coverage rows, gap audit, closure, source evidence 원본 row/block을 직접 대조한다. 요약 조회는 탐색용이며 완료 근거가 아니다.

## I/O 누수 방지

- 긴 문서 전체 읽기 금지. `rg` 또는 section 조회로 현재 마일스톤과 관련 줄만 읽는다.
- 마일스톤 전후 맥락은 `docs/milestones/README.ko.md`와 해당 phase 문서로 먼저 좁힌다.
- 대형 coverage/audit JSON 전체 출력 금지. summary, count, blocking row id, 특정 row만 조회한다.
- 원본 ERB/CSV 전체 출력 금지. 라벨/호출 흐름 주변을 읽되, 구현 판단에는 필요한 원본 block을 직접 확인한다.
- 명령 성공 로그는 대화에 길게 남기지 않는다. 명령명, exit code, 핵심 count만 남긴다.
- 실패 로그는 콘솔 요약과 full failure artifact를 분리한다.
- inline script가 길거나 한글 marker가 필요하면 PowerShell 파이프 대신 기존 `tools/` script를 사용하거나 ASCII-only `node -e`로 줄인다.

## 요약 사용 한계

- agent 문서, generated/dashboard, query 결과는 탐색 보조다.
- 완료 선언, blocker 해소, transfer, approved-excluded, final verdict에는 원본 row와 full artifact 대조가 필요하다.
- query 결과가 0건이거나 “전부 완료”처럼 너무 좋은 결과면 원본 coverage/gate를 직접 확인한다.

## Full Read 조건

아래 경우에는 토큰 절약보다 정확성을 우선한다.

- 새 coverage/gate/smoke script 작성 또는 placeholder 교체
- blocker/transfer/approved-excluded 처리
- owner 또는 save/session 경계 변경
- source evidence 충돌
- milestone closure 작성 또는 완료 판정
- final gap audit, complete verdict
- gate failure가 cap에 걸렸거나 일부만 표시된 경우
