import type { DomainModule } from '../../kernel/module';
import { initialWorkState } from './types';

export const workModule: DomainModule = {
  id: 'work',
  label: 'Work',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'work',
  description: '영업, 노역, AV 촬영/판매, 아르바이트, 캐릭터별 경력 진행을 관리한다.',
  owns: ['work assignments', 'brothel progress', 'filming progress', 'career flags', 'work legacy mappings'],
  dependsOn: ['people', 'body', 'social', 'economy', 'text'],
  createInitialState: () => initialWorkState,
};
