import type { DomainModule } from '../../kernel/module';
import { initialMissionSessionState } from './types';

export const missionSessionModule: DomainModule = {
  id: 'mission-session',
  label: 'Mission Session',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'session',
  statePath: 'session.mission',
  description: '미션 목록의 현재 선택과 표시 목록처럼 저장하지 않는 실행 중 상태를 관리한다.',
  owns: ['current mission selection', 'visible mission list'],
  dependsOn: ['mission', 'economy', 'world'],
  createInitialState: () => initialMissionSessionState,
};
