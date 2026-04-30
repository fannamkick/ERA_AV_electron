import type { DomainModule } from '../../kernel/module';
import { initialFeatureState } from './types';

export const featureStateModule: DomainModule = {
  id: 'feature-state',
  label: 'Feature State',
  status: 'planned',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'featureState',
  description: '전용 도메인으로 아직 승격하지 않은 이벤트, 방문, 팁, 미분류 기능 진행 상태를 임시로 관리한다.',
  owns: ['event progress', 'visit progress', 'tips', 'feature unlocks', 'unmapped feature flags'],
  dependsOn: ['catalog', 'people', 'world'],
  createInitialState: () => initialFeatureState,
};
