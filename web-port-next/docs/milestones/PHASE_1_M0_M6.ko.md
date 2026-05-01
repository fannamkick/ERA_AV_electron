# Phase 1. 최소 세로 루프

범위: M0~M6

목표: 공통 실행 계약, 저장/세션/view 경계, 정의 데이터 입력, 새 게임, 메인 화면, 아이템 구매 1차를 연결한다.

완료 기준: 새 게임 -> 메인 화면 -> 아이템 상점 -> 상품 선택/수량 변경 -> 구매 성공/실패/취소 -> 돈/인벤토리 반영 -> `npm run build` 통과.

| M | 역할 | 책임 |
| --- | --- | --- |
| M0 | 기준 동결 | M1~M6의 포함/제외 범위와 blocker 가능 지점을 확정한다. |
| M1 | 공통 실행 계약 | UI 직접 상태 변경 없이 action/result/effect 계약을 만든다. |
| M2 | 데이터 구조 v1 | `GameState`, `GameSession`, view 계산 객체, save payload 경계를 만든다. |
| M3 | 정의 데이터 연결 | 원본 CSV catalog를 runtime definition으로 연결한다. |
| M4 | 새 게임 생성 | 새 게임 입력과 초기 저장 상태 생성을 구현한다. |
| M5 | 메인 화면 view | 메인 route와 menu view, enabled/disabled reason을 구현한다. |
| M6 | 아이템 구매 1차 | 구매 상점 최소 루프와 돈/인벤토리 반영을 구현한다. |

주의: Phase 1 완료는 완전 이식 완료가 아니다.
