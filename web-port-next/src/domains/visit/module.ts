import type { DomainModule } from '../../kernel/module';
import { initialVisitSessionState } from './types';

export const visitSessionModule: DomainModule = {
  id: 'visit-session',
  label: 'Visit Session',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'session',
  statePath: 'session.visit',
  description: '방문 메뉴의 현재 장소, 행동 선택, 표시 목록처럼 저장하지 않는 실행 중 상태를 관리한다.',
  owns: ['current visit place', 'current visit action', 'visible visit choices'],
  dependsOn: ['world', 'feature-state', 'economy'],
  createInitialState: () => initialVisitSessionState,
};
