import { initialUiSessionState } from './types';
import type { DomainModule } from '../../kernel/module';

export const uiSessionModule: DomainModule = {
  id: 'ui-session',
  label: 'UI Session',
  status: 'active',
  layer: 'presentation',
  stateScope: 'session',
  statePath: 'session.ui',
  description: '현재 화면, 선택지, 로그처럼 저장 상태와 분리되는 UI 진행 상태.',
  owns: ['route', 'choices', 'visible log'],
  dependsOn: [],
  createInitialState: () => initialUiSessionState,
};
