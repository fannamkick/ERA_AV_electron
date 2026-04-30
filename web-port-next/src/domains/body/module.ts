import type { DomainModule } from '../../kernel/module';
import { initialBodyState } from './types';

export const bodyModule: DomainModule = {
  id: 'body',
  label: 'Body',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'body',
  description: '캐릭터별 신체, 생식, 성적 이력, PALAM/JUEL/MARK/STAIN 계열 상태를 관리한다.',
  owns: ['body stats', 'reproduction', 'sexual history', 'appearance', 'condition params', 'training resources', 'imprints', 'contamination'],
  dependsOn: ['people', 'catalog'],
  createInitialState: () => initialBodyState,
};
