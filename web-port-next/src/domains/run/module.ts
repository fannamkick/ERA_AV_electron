import { initialRunState } from './types';
import type { DomainModule } from '../../kernel/module';

export const runModule: DomainModule = {
  id: 'run',
  label: 'Run',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'run',
  description: '날짜, 턴, 현재 진행 단계, 스케줄러, 마지막 배우 기억, RNG seed를 관리한다.',
  owns: ['day', 'turn', 'phase', 'scheduled events', 'last selected actors', 'rng seed'],
  dependsOn: [],
  createInitialState: () => initialRunState,
};

