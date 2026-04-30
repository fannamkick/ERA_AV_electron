import { initialSaveState } from './types';
import type { DomainModule } from '../../kernel/module';

export const saveModule: DomainModule = {
  id: 'save',
  label: 'Save',
  status: 'planned',
  layer: 'foundation',
  stateScope: 'save',
  statePath: 'save',
  description: '저장 항목, 자동저장, 세이브 버전과 마이그레이션 상태를 관리한다.',
  owns: ['save entries', 'autosave metadata', 'migration version'],
  dependsOn: [],
  createInitialState: () => initialSaveState,
};
