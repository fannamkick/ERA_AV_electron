import type { DomainModule } from '../../kernel/module';
import { initialTextState } from './types';

export const textModule: DomainModule = {
  id: 'text',
  label: 'Text',
  status: 'active',
  layer: 'presentation',
  stateScope: 'save',
  statePath: 'text',
  description: '호칭, 조사, 표시 규칙, CSTR 기반 문자열 항목, 지속 텍스트 상태를 관리한다.',
  owns: ['display rules', 'particle rules', 'address rules', 'character text entries', 'generated names', 'persistent journal'],
  dependsOn: ['people', 'catalog'],
  createInitialState: () => initialTextState,
};
