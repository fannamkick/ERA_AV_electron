import type { DomainModule } from '../../kernel/module';
import { initialPeopleState } from './types';

export const peopleModule: DomainModule = {
  id: 'people',
  label: 'People',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'people',
  description: '캐릭터 인스턴스, identity, BASE/ABL/TALENT/EXP, 캐릭터별 기본 진행 상태를 관리한다.',
  owns: [
    'character instances',
    'identity',
    'base stats',
    'abilities',
    'traits',
    'experiences',
    'character lifecycle flags',
    'roster roles',
  ],
  dependsOn: ['catalog'],
  createInitialState: () => initialPeopleState,
};
