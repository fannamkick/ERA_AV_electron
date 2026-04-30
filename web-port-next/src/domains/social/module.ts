import type { DomainModule } from '../../kernel/module';
import { initialSocialState } from './types';

export const socialModule: DomainModule = {
  id: 'social',
  label: 'Social',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'social',
  description: 'RELATION, 호감/상성, NTR/파트너 진행처럼 캐릭터 간 관계 상태를 관리한다.',
  owns: ['relationships', 'affinity', 'relationship roles', 'NTR progress', 'partner progress'],
  dependsOn: ['people'],
  createInitialState: () => initialSocialState,
};
