# 원본 게임 기능 흐름 지도

## 분석 산출물

| 항목 | 수량 | 산출물 |
| --- | ---: | --- |
| 원본 파일 | 375 | `data/game-system-analysis/file-summary.tsv` |
| 전역 라벨 | 1499 | `data/game-system-analysis/label-index.tsv` |
| 로컬 라벨 | 449 | `data/game-system-analysis/label-index.tsv` |
| 전체 호출 | 3045 | `data/game-system-analysis/resolved-call-edges.tsv` |
| 정적 해결 호출 | 2976 | `data/game-system-analysis/resolved-call-edges.tsv` |
| 동적 호출 | 66 | `data/game-system-analysis/dynamic-call-patterns.tsv` |
| 미해결 호출 | 0 | `data/game-system-analysis/summary.json` |
| 흐름 제어 액션 | 4601 | `data/game-system-analysis/flow-control-actions.tsv` |
| exit 액션 | 3536 | `RETURN`, `RETURNF`, `QUIT`, `RESETDATA` |
| pause 액션 | 931 | `INPUT`, `WAIT` |
| persistence 액션 | 134 | `SAVEGAME`, `LOADGAME`, `SAVEDATA`, `LOADGLOBAL`, `SAVEGLOBAL` |
| 전체 그래프 | 1개 | `data/game-system-analysis/flowgraph.dot` |

## 전체 게임 루프

```ts
function startGame() {
  const state = createInitialSaveState();
  return openMainMenu(state);
}

function continueGame(saveFile) {
  const state = loadSaveState(saveFile);
  return openMainMenu(state);
}

function openMainMenu(state) {
  while (true) {
    const choice = showMainMenu(state);

    if (choice === "train") return startTraining(state);
    if (choice === "rest") return finishTimeBlock(state);
    if (choice === "save") saveGame(state);
    if (choice === "load") state = loadSaveState();
    if (choice === "endingCheck") {
      const ending = checkEnding(state);
      if (ending.shouldQuit) return quitGame();
    }

    runMenuFeature(state, choice);
  }
}
```

새 구현의 최상위 구조는 `새 게임/로드 -> 메인 화면 -> 기능 실행 -> 훈련 또는 턴 종료 -> 메인 화면` 루프다. `상점`이라는 이름이 원본에 남아 있어도 실제 역할은 메인 화면 라우터다.

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `SYSTEM_GAMESTART.ERB/EVENTFIRST` | 일반 새 게임 초기화 |
| `SYSTEM_NEWGAME.ERB` | 엔딩 뒤 계승 새 게임 |
| `SHOP_MAIN.ERB/EVENTSHOP`, `USERSHOP` | 메인 화면 라우터 |
| `BEGIN SHOP`, `BEGIN TRAIN`, `BEGIN TURNEND` | 메인/훈련/턴 종료 루프 전환 |

## 메인 화면 기능 목록

메인 화면은 저장 상태를 직접 소유하지 않는다. 사용자 선택을 받아 각 기능 서비스로 넘기는 라우터다.

| 기능 | 새 구현 처리 | 끝점 |
| --- | --- | --- |
| 훈련 시작 | 대상과 보조 인물을 고르고 훈련 루프로 전환 | 훈련 루프 |
| 인물 영입 | 영입 가능한 인물을 보여주고 돈/인물 목록을 변경 | 메인 화면 |
| 아이템 구매/사용 | 판매 목록을 만들고 구매/사용 결과를 인벤토리와 돈에 반영 | 메인 화면 |
| 창관/업무 | 업무 배정 또는 업무 실행 결과를 처리 | 메인 화면 또는 턴 종료 |
| 촬영 | 촬영 대상과 장면을 고르고 수익/경험/피로를 반영 | 취소 시 메인 화면, 완료 시 턴 종료 |
| 재단/의복 | 의복 구매/변경을 처리 | 메인 화면 |
| 방문 | 방문 장소별 특수 행동을 실행 | 방문 화면 또는 메인 화면 |
| 휴식 | 현재 시간대를 종료 | 턴 종료 |
| 능력 상승 | 자원으로 능력치를 올림 | 메인 화면 또는 턴 종료 |
| 미션 | 미션 수령/보고/기한 처리를 관리 | 메인 화면 |
| 저장/로드 | 저장 또는 상태 교체 | 메인 화면 또는 로드된 상태 |
| 설정/정보/업적/도움말/디버그 | 화면 표시 또는 설정 변경 | 메인 화면 |
| 엔딩 체크 | 조건을 검사하고 종료 여부 결정 | 계속 또는 종료 |

근거:

| 원본 선택값 | 원본 라벨 | 기능 |
| ---: | --- | --- |
| 100 | `BEFORE_TRAIN` | 훈련 시작 |
| 101 | `CHARA_BUY_NEW` | 인물 영입 |
| 102 | `ITEM_SHOP`, `EVENTBUY` | 아이템 구매/사용 |
| 103 | `YUUKAKU_TOP` | 창관/업무 |
| 104 | `AV_TOP` | 촬영 |
| 109 | `HOUMON` | 방문 |
| 105 | `BEGIN TURNEND` | 휴식/시간 종료 |
| 112 | `ABILITY_UP` | 능력 상승 |
| 120 | `MISSION_MAIN` | 미션 |

## 아이템 구매/사용

아이템 기능은 “아이템 정의”, “플레이어가 가진 수량”, “현재 화면에서 팔리는 목록”, “현재 선택한 항목”을 분리해야 한다.

```ts
function openItemShop(state) {
  const session = createShopSession();
  session.visibleItems = getVisibleSaleItems(state);

  while (true) {
    const selected = askItemSelection(session.visibleItems);
    if (selected.isCancel) return "mainMenu";

    const item = getItemDefinition(selected.itemId);
    const decision = askPurchaseOrUse(item, state);

    if (decision.isCancel) continue;
    if (!canPay(state.money, decision.price)) {
      showMessage("돈이 부족합니다");
      continue;
    }

    state.money.current -= decision.price;
    applyItemGainOrUse(state, item, decision.quantity);
  }
}
```

상태 변경:

| 변경 대상 | 내용 |
| --- | --- |
| 돈 | 구매 가격만큼 감소 |
| 인벤토리 | 구매면 수량 증가, 사용형이면 효과 적용 또는 수량 감소 |
| 현재 상점 세션 | 선택 항목, 구매 수량, 표시 목록 |

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `SHOP_ITEM.ERB/ITEM_SHOP` | 아이템 상점 화면 |
| `EVENTBUY` | 구매 가능성/가격/수량 처리 |
| `BUY_PLURAL` | 복수 구매 |
| `USE_ITEM` | 즉시 사용형 아이템 처리 |
| `CLEAR_SHOP` | 상점 선택값 정리 |

## 촬영

촬영은 상점의 부속 기능이 아니라 독립적인 실행 세션이다. 실행 중에는 대상, 선택 장면 목록, 남은 촬영량, 장면별 계산 결과가 필요하고, 완료 시에는 인물 상태/경험/돈/진행 플래그를 바꾼 뒤 턴을 종료한다.

```ts
function openShooting(state) {
  const session = createShootingSession(state);
  refreshShootingMonthlyInfo(state, session);

  while (true) {
    const action = askStartShootingOrReturn(state, session);
    if (action === "return") return "mainMenu";

    if (!hasShootingEquipment(state)) {
      showMessage("촬영 장비가 없습니다");
      return "mainMenu";
    }

    if (!hasShootableActor(state)) {
      showMessage("촬영 가능한 인물이 없습니다");
      continue;
    }

    const actor = selectShootingActor(state);
    if (actor.isCancel) continue;

    const selectedScenes = selectShootingScenes(state, actor.characterId, session);
    if (selectedScenes.length === 0) return "mainMenu";

    const confirmed = confirmShootingPlan(selectedScenes);
    if (!confirmed) {
      session.resetPlan();
      continue;
    }

    const result = executeShootingScenes(state, actor.characterId, selectedScenes);
    applyShootingResult(state, actor.characterId, result);
    return finishTimeBlock(state);
  }
}
```

대상 선택 조건:

| 검사 | 실패 시 |
| --- | --- |
| 플레이어 본인은 제외 | 메시지 표시 후 대상 선택으로 복귀 |
| 체력이 일정값 미만이면 제외 | 메시지 표시 후 대상 선택으로 복귀 |
| 반발 각인이 높으면 제외 | 메시지 표시 후 대상 선택으로 복귀 |
| 순종/욕망 계열 능력이 부족하면 제외 | 메시지 표시 후 대상 선택으로 복귀 |
| 임신 말기 또는 육아 중이면 제외 | 메시지 표시 후 대상 선택으로 복귀 |
| 남성 소질이면 제외 | 메시지 표시 후 대상 선택으로 복귀 |
| 후반 시간대에 이미 영업 중이면 제외 | 메시지 표시 후 대상 선택으로 복귀 |

장면 선택:

```ts
function selectShootingScenes(state, actorId, session) {
  const scenes = getAvailableShootingScenes(state, actorId);

  while (true) {
    const input = askSceneSelection(scenes, session.page);

    if (input === "previousPage") session.page--;
    else if (input === "nextPage") session.page++;
    else if (input === "return" && session.selectedScenes.length === 0) return [];
    else if (input === "start" && session.selectedScenes.length > 0) return session.selectedScenes;
    else if (input.isSceneId) {
      const cost = calculateSceneCost(input.sceneId, state, actorId);
      if (session.remainingSceneCapacity < cost) {
        showMessage("더 이상 촬영할 수 없습니다");
        continue;
      }

      const confirmed = askSceneAddConfirmation(input.sceneId);
      if (confirmed) session.addScene(input.sceneId, cost);
    }
  }
}
```

촬영 실행:

```ts
function executeShootingScenes(state, actorId, scenes) {
  const result = createShootingResult();

  for (const scene of scenes) {
    showSceneIntro(scene);
    const sceneResult = calculateSceneResult(state, actorId, scene);
    showSceneOutcome(scene, sceneResult);
    result.merge(sceneResult);
    waitForUser();
  }

  return result;
}
```

완료 반영:

| 변경 대상 | 내용 |
| --- | --- |
| 대상 인물의 체력/기력 | 촬영 소모량만큼 감소 |
| 대상 인물 경험 | 장면별 경험 증가 |
| 데뷔 상태 | 첫 촬영이면 데뷔 상태 갱신 |
| 촬영 점수/최고점 | 촬영 결과 점수 갱신 |
| 돈 | 촬영 수익 증가 |
| 시간 흐름 | 촬영 완료 후 턴 종료로 이동 |

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `SHOP_AV.ERB/AV_TOP` | 촬영 화면 시작, 장비/후보 검사 |
| `CHARA_SELECT_AV` | 촬영 대상 선택과 조건 검사 |
| `AV_LIST` | 장면 목록/선택/촬영량 차감 |
| `AV_CHOOSE` | 선택 장면 최종 확인 |
| `AV_RESULT` | 장면 실행, 경험/수익/체력 반영 |
| `AV_POINTCALC` | 촬영 점수 계산 |
| `SCENE_TITLE_*`, `SCENE_VISIBLE_*`, `SCENE_CALC_*`, `SCENE_RESULT_*`, `SCENE_EXP_*` | 장면별 정의/계산/결과 훅 |
| `AV_RESULT -> BEGIN TURNEND` | 촬영 완료 후 턴 종료 |

## 방문

방문은 장소별 특수 행동을 실행하는 메뉴다. 방문 자체가 저장 도메인은 아니고, 각 장소 서비스가 인물/신체/시설/돈/소질 상태를 바꾼다.

```ts
function openVisitMenu(state) {
  while (true) {
    const places = getVisibleVisitPlaces(state);
    const place = askVisitPlace(places);

    if (place.isReturn) return "mainMenu";
    if (!place.isValid) continue;

    runVisitPlaceAction(state, place.id);
  }
}
```

방문 장소:

| 장소 기능 | 하는 일 | 끝점 |
| --- | --- | --- |
| 조직 사무소 | 시설/방/동물 구매, 특정 의뢰 또는 이벤트 | 방문 메뉴 |
| 비밀 연구소 | 신체/성질/기억/성별/세뇌 계열 변경 | 방문 메뉴 |
| 레이첼 공방 | 체력/기력/호감/성욕/노화/특수 추가 처리 | 방문 메뉴 |
| 이쿠미 연구소 | 임신 처리, 안드로이드 추가, 서큐버스화, 아이템 강화 | 방문 메뉴 |
| RB단 아지트 | 조교/소질 계열 특수 처리 | 방문 메뉴 |
| 토모요시댁 | 경비 강화/약화, 특정 인물 추가 | 방문 메뉴 |
| 아카샤 본부 | 성향 파괴/직업 변경/처녀성 변경/타락 처리 | 방문 메뉴 |

현재 확인한 방문 계열 호출 그래프에서는 방문 기능 자체가 직접 훈련 루프나 턴 종료 루프로 넘어가지 않는다. 기본 구조는 `장소 선택 -> 장소 행동 -> 방문 메뉴 복귀 -> 999면 메인 화면 복귀`다.

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `HOUMON.ERB/HOUMON` | 방문 메뉴 |
| `KIRYU_GUMI`, `SECRET_LABO`, `RACHEL_LABO`, `IKUMI_LABO`, `SAKURA_AZITO`, `AYANO_ORDER`, `EUNICE_LABO` | 방문 장소별 처리 |

## 미션

미션은 정의 데이터와 진행 상태를 분리해야 한다. 정의 데이터는 제목/표시 조건/수령 효과/계산/보상/보고 결과이고, 저장 상태는 현재 수령 여부, 성공/실패, 기한, 진행 대상이다.

```ts
function openMissionMenu(state) {
  while (true) {
    const activeMission = findActiveMission(state);
    const action = askMissionMenu(activeMission);

    if (action === "return") {
      restorePreviousTargetSelection(state);
      return "mainMenu";
    }

    if (action === "reportActive" && activeMission) {
      showMissionInfo(activeMission);
      if (askReportConfirmation()) reportMission(state, activeMission.id);
      continue;
    }

    if (action === "receive") {
      openMissionList(state);
      continue;
    }
  }
}
```

```ts
function openMissionList(state) {
  const missions = getVisibleMissions(state);

  while (true) {
    const input = askMissionSelection(missions);

    if (input === "return") return;
    if (input === "previousPage") movePage(-1);
    if (input === "nextPage") movePage(1);

    const mission = missions.find(input.missionId);
    if (!mission) continue;

    showMissionInfo(mission);

    if (!mission.isAccepted && askReceiveConfirmation()) {
      acceptMission(state, mission.id);
      return;
    }

    if (mission.isAccepted && askReportConfirmation()) {
      reportMission(state, mission.id);
      return;
    }
  }
}
```

```ts
function reportMission(state, missionId) {
  const result = calculateMissionResult(state, missionId);
  const reward = calculateMissionReward(state, missionId, result);

  updateMissionStatus(state, missionId, result);
  applyMoneyAndContribution(state, reward);
  applyMissionReportEffects(state, missionId, result);
}

function updateMissionDeadlinesAtTurnEnd(state) {
  for (const mission of activeTimedMissions(state)) {
    mission.remainingWeeks--;
    if (mission.remainingWeeks <= 0) reportMission(state, mission.id);
  }
}
```

상태 변경:

| 변경 대상 | 내용 |
| --- | --- |
| 미션 진행 상태 | 미수령/수령 중/실패/성공/대성공 |
| 진행 중 미션 수 | 수령 시 증가, 보고 시 감소 |
| 돈/공헌도 | 보상 또는 페널티 반영 |
| 대상 인물 | 미션별 보고 효과 반영 |
| 기한 | 턴 종료 때 감소 |

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `MISSION_MAIN` | 미션 메뉴 |
| `MISSION_LIST` | 미션 목록/수령/보고 선택 |
| `MISSION_EXEC_REPORT` | 성공 판정과 보상/페널티 |
| `MISSION_DAY` | 턴 종료 시 기한 감소 |
| `MISSION_TITLE_*`, `MISSION_INFO_*`, `MISSION_VISIBLE_*`, `MISSION_RECEIVE_*`, `MISSION_CALC_*`, `MISSION_FEE_*`, `MISSION_REPORT_*` | 미션별 핸들러 |

## 창관/업무

창관은 “업무 메뉴”와 “업무 실행”을 분리해야 한다. 메뉴에서 업무를 고를 때는 아직 턴이 끝나지 않을 수 있지만, 실제 업무가 완료되면 대부분 턴 종료로 이어진다.

```ts
function openWorkMenu(state) {
  while (true) {
    const action = askWorkMenu(state);

    if (action === "return") return "mainMenu";
    if (action === "sellCharacter") sellCharacter(state);
    if (action === "reception") return runReceptionWork(state);
    if (action === "normalWork") runNormalWorkMenu(state);
    if (action === "specialWork") return runSpecialWorkMenu(state);
    if (action === "facility") openFacilityMenu(state);
  }
}
```

```ts
function runSpecialWorkMenu(state) {
  const work = askSpecialWorkSelection(state);
  if (work.isCancel) return "workMenu";

  const result = executeWork(state, work.id);
  applyWorkResult(state, result);
  return finishTimeBlock(state);
}
```

업무 완료 공통 처리:

| 단계 | 내용 |
| --- | --- |
| 업무 조건 확인 | 참여 인물/시설/시간/돈/상태 검사 |
| 업무 본문 실행 | 업무별 이벤트, 대사, 선택지, 성행위 또는 공연 처리 |
| 경험/피로 계산 | 업무 경험, 체력/기력, 추가 상태 반영 |
| 사망/임신/후처리 검사 | 업무 결과에 따른 후속 검사 |
| 돈/수익 계산 | 수익 또는 비용 반영 |
| 턴 종료 | 완료 업무는 턴 종료 흐름으로 이동 |

확인된 완료 업무:

| 업무 기능 | 끝점 |
| --- | --- |
| 접객 업무 | 완료 시 턴 종료, 취소 시 업무 메뉴 |
| 도시락/노점 계열 | 턴 종료 |
| 콘서트 | 턴 종료 |
| 스트립쇼 | 턴 종료 |
| 난교/대회/경주 계열 | 턴 종료 |
| 성접대 계열 | 턴 종료 |
| 경매 | 턴 종료 |

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `YUUKAKU_TOP` | 창관/업무 상위 메뉴 |
| `RECEPTION_MAIN` | 접객 업무 |
| `WORK_SPECIAL_SELECT` | 특수 업무 선택 |
| `LUNCH_STALL`, `CONCERT`, `STRIPTEASE`, `SEX_ORGY`, `KB_PLAY`, `V_AUCTION` | 특수 업무 실행 |
| `WORK_EXP`, `WORK_SP_MONEY_CM`, `WORK_SP_AFTER`, `CHARADEAD_CHECK` | 업무 결과 처리 |
| 각 업무의 `BEGIN TURNEND` | 업무 완료 후 턴 종료 |

## 훈련

훈련은 도메인이 아니라 기능 루프다. 저장 상태는 인물/신체/관계/경제/아이템 등 각 도메인에 있고, 훈련 중 계산값은 실행 중 데이터에만 둔다.

```ts
function startTraining(state) {
  const target = selectTrainingTarget(state);
  if (!target) return "mainMenu";

  const assistant = selectAssistant(state, target);
  const session = createTrainingSession(state, target, assistant);

  while (true) {
    showTrainingStatus(state, session);

    const command = askTrainingCommand(state, session);
    if (command.isCancel) return finishTraining(state, session);

    if (!canRunCommand(state, session, command.id)) {
      showMessage("실행할 수 없습니다");
      continue;
    }

    const calculation = calculateTrainingCommand(state, session, command.id);
    applyTrainingCommandResult(state, session, calculation);

    if (shouldEndTraining(state, session)) {
      return finishTraining(state, session);
    }
  }
}

function finishTraining(state, session) {
  applyAfterTrainingEvents(state, session);
  return finishTimeBlock(state);
}
```

훈련에서 저장하면 안 되는 값:

| 값 | 이유 |
| --- | --- |
| 현재 선택 커맨드 | 화면 입력값 |
| 커맨드 가능 여부 계산값 | 매번 재계산 가능 |
| 쾌락/피로/소모 중간 계산 | 훈련 실행 중 데이터 |
| 임시 장비/플래그 | 훈련 세션 또는 상호작용 세션 |

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `BEFORE_TRAIN` | 대상/보조 인물 선택 후 훈련 진입 |
| `EVENTTRAIN` | 훈련 루프 |
| `USERCOM`, `COM_ABLE*`, `COMF*` | 커맨드 선택/가능 여부/효과 |
| `SYSTEM_SOURCE` 계열 | 훈련 계산 |
| `EVENTCOMEND` | 계속 훈련 또는 종료 판단 |
| `EVENTEND` | 훈련 후 처리 |
| `EVENTEND -> BEGIN TURNEND` | 훈련 완료 후 턴 종료 |

## 턴 종료

턴 종료는 하루/시간대가 지나갈 때 발생하는 후처리 묶음이다. 특정 도메인이 아니라 여러 도메인 서비스를 순서대로 호출하는 오케스트레이터다.

```ts
function finishTimeBlock(state) {
  applyImmediateTurnEndChecks(state);

  if (state.clock.timeBlock === "secondHalf") {
    settleDailyWorkAndEvents(state);
    updateMissionDeadlinesAtTurnEnd(state);
    advanceDay(state);

    if (shouldStartNewMonth(state.clock)) {
      applyMonthlyEvents(state);
    }

    applyNewDayEvents(state);
  } else {
    state.clock.timeBlock = "secondHalf";
  }

  const ending = checkEnding(state);
  if (ending.shouldQuit) return quitGame();

  runAutomaticPurchasesAndItemUse(state);
  runMorningPickupAndAchievementChecks(state);
  return openMainMenu(state);
}
```

턴 종료에서 처리되는 묶음:

| 묶음 | 내용 |
| --- | --- |
| 즉시 후처리 | 판매 가능 보조 검사, 특수 스킬, 임신/수태, 휴식, 배란, 신체 변화 |
| 하루 종료 이벤트 | 창관 결과, 다음날 이벤트, 스카우트, 아이돌/모델/클럽/관계 이벤트 |
| 일일 작업 | 아르바이트, 직업, 미션 기한, 주말 학원 이벤트 |
| 날짜 진행 | 일자 증가, 월 변경, 새날 이벤트 |
| 공통 마무리 | 엔딩 검사, 자동 구매/아이템 사용, 업적 확인, 메인 화면 복귀 |

근거:

| 원본 위치 | 의미 |
| --- | --- |
| `EVENT_TURNEND.ERB/EVENTTURNEND` | 턴 종료 전체 |
| `MISSION_DAY` | 미션 기한 감소 |
| `EVENT_NEXTDAY`, `EVENT_NEXTMONTH`, `EVENT_NEWDAY` | 날짜/월/새날 처리 |
| `ENDING_CHECK`, `AUTO_BUYING`, `AUTO_ITEMUSE`, `CHECK_ACHIEVEMENT` | 공통 마무리 |
| `EVENTTURNEND -> BEGIN SHOP` | 처리 완료 후 메인 화면 복귀 |

## 동적 핸들러 묶음

원본의 동적 호출은 새 구현에서 문자열 함수 호출로 옮기지 않는다. 정의 데이터와 핸들러 테이블로 바꾼다.

| 기능 | 새 구현 형태 | 원본 패턴 |
| --- | --- | --- |
| 훈련 커맨드 가능 조건 | `TrainingCommandHandler.canRun` | `COM_ABLE*` |
| 훈련 커맨드 효과 | `TrainingCommandHandler.apply` | `COMF*` |
| 능력 상승 | `AbilityUpgradeRule` | `ABLUP*`, `DECIDE_ABLUP*` |
| 미션 | `MissionDefinition`, `MissionHandler` | `MISSION_*` |
| 아르바이트 | `JobDefinition`, `JobHandler` | `ARBEIT_*` |
| 촬영 장면 | `ShootingSceneDefinition`, `ShootingSceneHandler` | `SCENE_*` |
| 캐릭터 대사 훅 | optional dialogue hook | `KOJO_*`, `SELF_KOJO_*` |

후보 수가 0인 optional hook은 버그가 아니다. 원본도 없는 대사/조건 훅을 허용하는 구조다. 실제 미해결 호출은 현재 0개다.
