/**
 * 게임 초기화 모듈 (init.ts)
 *
 * 앱 시작 시 이벤트/커맨드 데이터를 레지스트리에 등록한다.
 * App.tsx에서 한 번만 호출.
 */

import { registerEvents } from './core/eventEngine';
import { registerCommands } from './gameplay/training';
import { TRAINING_COMMANDS } from './data/commands';
import { MORNING_EVENTS } from './data/events/morning';
import { MIDDAY_EVENTS } from './data/events/midday';
import { NIGHT_EVENTS } from './data/events/night';

let initialized = false;

export function initializeGame(): void {
  if (initialized) return;
  initialized = true;

  // 이벤트 등록
  registerEvents(MORNING_EVENTS);
  registerEvents(MIDDAY_EVENTS);
  registerEvents(NIGHT_EVENTS);

  // 조교 커맨드 등록
  registerCommands(TRAINING_COMMANDS);

  console.log('[INIT] 게임 데이터 초기화 완료:', {
    events: MORNING_EVENTS.length + MIDDAY_EVENTS.length + NIGHT_EVENTS.length,
    commands: TRAINING_COMMANDS.length,
  });
}
