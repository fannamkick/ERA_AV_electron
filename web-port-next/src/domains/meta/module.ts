import type { DomainModule } from '../../kernel/module';
import { initialMetaState } from './types';

export const metaModule: DomainModule = {
  id: 'meta',
  label: 'Meta',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'meta',
  description: '회차 밖 업적, 클리어 보너스, GLOBAL 계열 메타 진행을 관리한다.',
  owns: ['achievements', 'clear bonuses', 'global counters', 'global flags', 'global text values'],
  dependsOn: ['catalog'],
  createInitialState: () => initialMetaState,
};
