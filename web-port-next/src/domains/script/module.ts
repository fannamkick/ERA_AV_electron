import { initialScriptFrameState } from './types';
import type { DomainModule } from '../../kernel/module';

export const scriptModule: DomainModule = {
  id: 'script',
  label: 'Script Frame',
  status: 'planned',
  layer: 'adapter',
  stateScope: 'session',
  statePath: 'session.script',
  description: 'ERB 제어 흐름을 해석할 때 필요한 LOCAL, ARG, RESULT, named #DIM 프레임을 관리한다.',
  owns: ['numeric locals', 'string locals', 'arguments', 'results', 'list frames'],
  dependsOn: [],
  createInitialState: () => initialScriptFrameState,
};

