import type { DomainModule } from '../../kernel/module';
import { initialEquipmentState } from './types';

export const equipmentModule: DomainModule = {
  id: 'equipment',
  label: 'Equipment',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'equipment',
  description: '캐릭터별 지속 장비, 의복, 피어싱, 장비 제한을 관리한다. 실행 중 임시 장비와 분리한다.',
  owns: ['persistent equipment', 'clothing state', 'piercings', 'equipment restrictions'],
  dependsOn: ['catalog', 'people'],
  createInitialState: () => initialEquipmentState,
};
