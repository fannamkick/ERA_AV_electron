import type { DomainModule } from '../../kernel/module';
import { initialWorldState } from './types';

export const worldModule: DomainModule = {
  id: 'world',
  label: 'World',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'world',
  description: '회차 내부 월드 이벤트, 스토리 플래그, 해금을 관리한다. GLOBAL과 PBAND는 meta/mission으로 분리한다.',
  owns: ['world event flags', 'story flags', 'world unlocks', 'unmapped world flags'],
  dependsOn: ['run'],
  createInitialState: () => initialWorldState,
};
