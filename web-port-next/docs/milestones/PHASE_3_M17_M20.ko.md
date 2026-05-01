# Phase 3. 원본 대조 체계

범위: M17~M20

목표: 완성 여부를 셀 수 있도록 원본 기능과 정의 데이터의 1차 전수표, mapping 정책, 반복 구현 규칙을 고정한다.

완료 기준: feature/definition coverage 산출물의 컬럼과 상태값이 확정되고, 미정 항목을 완료로 처리하지 않는 차단 규칙이 문서화된다.

| M | 역할 | 책임 |
| --- | --- | --- |
| M17 | 원본 근거 대조 정책 | mapping 상태, approved-excluded, adapter import 경계를 고정한다. |
| M18 | 반복 구현 규칙 | 구현 전/후 template, blocker template, 완료 차단 규칙을 고정한다. |
| M19 | 원본 기능 coverage 필수화 | ERB 기능 row를 feature/blocker로 분류하고 feature coverage gate를 만든다. |
| M20 | 정의 데이터 분류와 소비 책임 | CSV/Chara seed/정의 row를 runtime owner, consumer, blocker로 분류한다. |

주의: Phase 3은 장부와 정책을 만드는 phase다. 기능 구현 완료를 의미하지 않는다.
