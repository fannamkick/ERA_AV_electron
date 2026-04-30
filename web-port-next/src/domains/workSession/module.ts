import type { DomainModule } from '../../kernel/module';
import { initialWorkSessionState } from './types';

export const workSessionModule: DomainModule = {
  id: 'work-session',
  label: 'Work Session',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'session',
  statePath: 'session.work',
  description: '업무 메뉴의 현재 업무, 참여 인물, 표시 목록처럼 저장하지 않는 실행 중 상태를 관리한다.',
  owns: ['current work selection', 'current work participant', 'visible work choices'],
  dependsOn: ['work', 'people', 'body', 'economy', 'run'],
  createInitialState: () => initialWorkSessionState,
};
