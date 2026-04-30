import type { DomainModule } from '../kernel/module';
import { legacyGameDefinitions } from './legacyCatalog';

export const catalogModule: DomainModule = {
  id: 'catalog',
  label: 'Catalog',
  status: 'active',
  layer: 'foundation',
  stateScope: 'catalog',
  statePath: 'catalog',
  description: 'CSV의 정적 정의를 정규화한 읽기 전용 게임 데이터다.',
  owns: [
    'character templates',
    'character initial seed data',
    'base stat definitions',
    'ability definitions',
    'trait definitions',
    'experience definitions',
    'item definitions',
    'shop listing definitions',
    'training command definitions',
    'source definitions',
    'legacy CSTR/CFLAG name tables',
    'threshold tables',
  ],
  dependsOn: [],
  createInitialState: () => legacyGameDefinitions,
};
