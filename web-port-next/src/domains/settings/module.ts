import type { DomainModule } from '../../kernel/module';
import { initialSettingsState } from './types';

export const settingsModule: DomainModule = {
  id: 'settings',
  label: 'Settings',
  status: 'active',
  layer: 'foundation',
  stateScope: 'save',
  statePath: 'settings',
  description: '시스템 설정, 캐릭터 기본 설정, 치트/테스트 모드, 설정성 FLAG를 관리한다.',
  owns: ['system settings', 'character defaults', 'debug flags', 'test mode', 'settings legacy mappings'],
  dependsOn: [],
  createInitialState: () => initialSettingsState,
};
