import type { DomainModule } from '../../kernel/module';
import { initialShootingSessionState } from './types';

export const shootingSessionModule: DomainModule = {
  id: 'shooting-session',
  label: 'Shooting Session',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'session',
  statePath: 'session.shooting',
  description: 'Owns current filming target, scene selection, visible choices, and calculated filming amount for the active screen only.',
  owns: ['current filming target', 'current filming scene', 'visible filming choices', 'filming amount buffer'],
  dependsOn: ['work', 'people', 'body', 'economy', 'run'],
  createInitialState: () => initialShootingSessionState,
};
