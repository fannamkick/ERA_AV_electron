import type { DomainModule } from '../../kernel/module';
import { initialInteractionSessionState } from './types';

export const interactionModule: DomainModule = {
  id: 'interaction',
  label: 'Interaction',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'session',
  statePath: 'session.interaction',
  description: '훈련/상호작용의 참가자, 임시 장비, 자극 원천, 증감 예정치 계산 파이프라인을 관리한다.',
  owns: [
    'interaction participants',
    'command flow',
    'temporary session flags',
    'temporary session equipment',
    'source buffers',
    'param deltas',
    'base loss buffers',
    'result buffers',
    'message buffers',
  ],
  dependsOn: ['people', 'body', 'equipment', 'catalog'],
  createInitialState: () => initialInteractionSessionState,
};
