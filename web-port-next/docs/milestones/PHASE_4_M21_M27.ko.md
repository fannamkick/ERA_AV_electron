# Phase 4. 전수표 보강과 누락 감사

범위: M21~M27

목표: 원본 근거, 정의 데이터, 저장 상태, 세션/계산 상태 전수표를 서로 대조하고 구현 전 누락을 찾는다.

완료 기준: source evidence, feature, definition, save mapping, session mapping, blocker 장부가 서로 맞물리고 구현 전 누락 감사가 통과한다.

| M | 역할 | 책임 |
| --- | --- | --- |
| M21 | 원본 근거 관리자 | source manifest와 source evidence schema를 만들고 문서 근거와 실제 원본을 구분한다. |
| M22 | 전수표 관계 검증자 | feature/definition/save/session/blocker/approved-exclusion 관계 gate를 만든다. |
| M23 | ERB 기반 정의 수집자 | ERB 내부 메뉴/장면/이벤트/미션/업무/촬영/훈련/엔딩/text 후보를 수집한다. |
| M24 | 저장 상태 매핑 관리자 | persistent 후보를 save field 또는 non-save 판정으로 분해한다. |
| M25 | 세션/계산 매핑 관리자 | 임시 buffer와 계산 중간값의 생성/소비/폐기 lifecycle을 분리한다. |
| M26 | 구현 전 누락 감사자 | gap, orphan, role-only, unknown owner를 감사한다. |
| M27 | 구현 큐 관리자 | M28~M49 구현 단위와 blocker 해소 책임을 큐화한다. |

주의: M21~M27을 통과하지 못하면 M28 이후 구현 완료를 주장하지 않는다.
