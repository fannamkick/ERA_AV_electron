import type { DomainModule } from '../../kernel/module';
import { initialMissionState } from './types';

export const missionModule: DomainModule = {
  id: 'mission',
  label: 'Mission',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'mission',
  description: '미션별 수락, 진행, 성공, 실패, 보상 수령 상태를 구조화한 진행 도메인이다.',
  owns: ['mission progress', 'accepted mission counts', 'mission rewards', 'legacy mission mappings'],
  dependsOn: ['people', 'economy', 'meta'],
  createInitialState: () => initialMissionState,
};
