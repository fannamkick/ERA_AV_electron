# 반복 구현 단위 규칙

이 문서는 M18의 기준 문서다. 목적은 M23~M29에서 기능군을 전수 구현할 때 작업자가 임의로 범위를 넓히거나, 원본 근거/실패 경로/coverage 갱신 없이 완료 처리하지 못하게 하는 것이다.

완료 판단은 "코드가 돌아감"이 아니라 아래 네 가지가 모두 맞는지로 한다.

1. 원본 흐름과 근거가 있다.
2. definition/save/session/view/calculation 소유권이 구현 전에 정해졌다.
3. 성공/실패/취소 또는 예외 경로가 검증된다.
4. coverage row와 blocker가 즉시 갱신된다.

## 적용 범위

이 규칙은 M18 이후 새로 구현하거나 전수 보강하는 모든 기능 단위에 적용한다.

- M23: 메뉴/공통 화면/진입점
- M24: 아이템/상점/listing
- M25: 인물 생성/영입/인물 상태
- M26: 방문/시설/업무/촬영
- M27: 미션/이벤트/턴 후처리
- M28: 훈련 command
- M29: 저장/로드/회귀 검증

M19~M22의 coverage 작성 단계에서도 row를 구현 완료로 바꾸려면 이 문서의 구현 후 template에 맞는 근거가 필요하다.

## 1회 최대 단위

| 기능군 | 1회 최대 단위 | 쪼개야 하는 예 |
| --- | --- | --- |
| 메뉴/공통 화면 | 메뉴 항목 1개 또는 route 1개 | 메인 화면 전체 재작성 |
| 아이템/상점 | item 1개, listing 1개, 사용 효과 1개 | Item.csv 전체 일괄 구현 |
| 인물/영입 | character template 1개 또는 seed family 1개 | Chara 109개 전체를 한 번에 완료 처리 |
| 방문/시설 | 장소 1개와 행동 1개 | 시설군 전체 구현 |
| 업무 | 업무 정의 1개와 후처리 1개 | 업무 전체 구현 |
| 촬영 | 촬영 장면 1개와 후처리 1개 | 장면 전체 구현 |
| 미션 | 미션 1개 또는 이벤트 조건 1개 | 미션 시스템 전체 구현 |
| 턴 후처리 | hook 1개 | 월말/주말/미션/이벤트를 한 번에 구현 |
| 훈련 | command 1개 | Train.csv 전체 구현 |
| 저장/로드 | 저장 필드 묶음 1개 또는 migration 1개 | schema 전체를 근거 없이 확정 |
| 엔딩 | 조건 1개 또는 결과 화면 1개 | 엔딩 전체 구현 |

단위가 위 표보다 크면 먼저 coverage row 묶음을 나누고, 각 row마다 아래 template을 따로 작성한다.

## 구현 전 template

새 기능 단위를 시작하기 전에 아래 항목을 먼저 채운다. 하나라도 없으면 구현부터 하지 않는다.

```md
### 구현 전

- unit id:
- 담당 마일스톤:
- 1회 최대 단위 판정:
- coverage row:
  - feature:
  - definition:
  - save mapping:
  - session/calculation mapping:
- 원본 흐름 근거:
  - `GAME_FLOW_MAP.ko.md` 위치:
  - 원본 파일/라벨/호출 흐름:
  - player input:
  - 종료 조건 또는 복귀 route:
- 원본 데이터 근거:
  - CSV file/id/name:
  - Chara template/seed row:
  - ERB family/index read:
  - ERB family/index write:
- 소유권:
  - definitions read:
  - save writes:
  - session writes:
  - session clear timing:
  - calculation owner:
  - view output:
- 예상 검증:
  - success smoke/assertion:
  - failure smoke/assertion:
  - cancel smoke/assertion:
  - exception/invalid input assertion:
  - save roundtrip assertion:
- 시작 전 blocker:
  - blocker id:
  - 차단 범위:
  - 해소 조건:
```

## 구현 중 규칙

- 원본 family/index 이름을 runtime 모델명으로 복사하지 않는다.
- feature handler가 `src/adapters/legacy`를 직접 import하지 않는다.
- raw CSV 행을 읽었다는 이유만으로 definition coverage를 완료하지 않는다.
- 저장 상태를 바꾸는 기능은 save payload boundary 또는 roundtrip 검증을 가진다.
- session/calculation buffer는 기능 종료 시 폐기 시점이 있어야 한다.
- 실패 경로는 저장 상태 불변 또는 의도된 session 변경을 명시해야 한다.
- 취소 경로는 route 복귀와 session 폐기를 검증해야 한다.
- 의미를 모르는 값은 임시 기본값으로 완료하지 않고 blocker로 남긴다.

## 구현 후 template

작업을 닫기 전에 아래 항목을 남긴다. 진행 문서에는 요약을 남기고, coverage 산출물이 생긴 뒤에는 해당 row에도 같은 id를 연결한다.

```md
### 구현 후

- unit id:
- 완료 범위:
- 변경 파일:
- coverage 갱신:
  - feature row/status/smoke id:
  - definition row/status/consumer:
  - save mapping row/status/field path:
  - session mapping row/status/owner:
  - blocker row 생성/해소:
- 구현 근거:
  - definitions read:
  - save writes:
  - session writes/clears:
  - view output:
  - effects:
- 검증 결과:
  - success command/result:
  - failure command/result:
  - cancel command/result:
  - exception command/result:
  - roundtrip command/result:
  - boundary/raw-name/stub gate:
- 남은 blocker:
  - blocker id:
  - owner milestone:
  - 왜 이번 unit 완료를 막지 않는지 또는 막는지:
```

## blocker template

blocker는 "나중에"라는 메모가 아니라 완료 차단 row다. 아래 항목을 가진다.

```md
### blocker

- blocker id:
- owner milestone:
- source location:
  - file:
  - label/id/family/index:
- blocked target:
  - feature id:
  - definition id:
  - save/session address:
- status: blocker
- reason:
- required decision:
- temporary runtime behavior:
- completion blocked:
- unblocks when:
- verification to close:
```

blocker를 `approved-excluded`로 바꾸려면 사용자 승인 기록, 원본 위치, 제외 사유, 손실 범위, 대체 동작이 필요하다.

## 완료 차단 규칙

아래 중 하나라도 해당하면 해당 unit과 소속 마일스톤은 완료 처리하지 않는다.

- 구현 전 template이 없다.
- 원본 흐름 근거가 없다.
- definition/save/session/view 소유권이 불명확하다.
- 성공 경로만 있고 실패/취소/예외 검증이 없다.
- 저장 상태를 바꾸는데 roundtrip 또는 payload boundary 검증이 없다.
- session buffer를 쓰는데 clear timing이 없다.
- coverage row를 갱신하지 않았다.
- `needsDecision`, `missingMapping`, `needs-review`, `blocker`를 완료 범위 안에 남겼다.
- 사용자 승인 없는 `approved-excluded`를 완료 근거로 썼다.
- `TODO`, `stub`, `placeholder`, `dummy`, `mock`, `legacy*NeedingMapping`이 runtime 완료 경로에 남았다.

## 진행 문서 기록 규칙

`PROGRESS_STATUS.ko.md`와 `SESSION_HANDOFF.ko.md`에는 매번 전체 template을 붙이지 않는다. 대신 아래 요약을 남긴다.

- 완료한 unit id와 범위
- 읽은 원본 근거
- 바뀐 definition/save/session/view 소유권
- 실행한 smoke/gate/build
- 새 blocker 또는 해소된 blocker
- 다음 unit id

긴 template 원문은 이 문서를 기준으로 삼고, coverage 산출물이 생기면 row id와 smoke id로 추적한다.
