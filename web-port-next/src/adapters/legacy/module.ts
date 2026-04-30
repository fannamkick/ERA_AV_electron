import type { DomainModule } from '../../kernel/module';
import { legacyFamilyOwnership } from './familyOwnership';
import { legacyIndexMappings } from './indexMapping';

export type LegacyAdapterState = {
  readonly familyOwnership: typeof legacyFamilyOwnership;
  readonly indexMappings: typeof legacyIndexMappings;
};

export const legacyAdapterModule: DomainModule<LegacyAdapterState> = {
  id: 'legacy-adapter',
  label: 'Legacy Adapter',
  status: 'active',
  layer: 'adapter',
  stateScope: 'adapter',
  statePath: 'adapters.legacy',
  description: 'ERB 변수 패밀리와 인덱스를 web-port-next 도메인 모델에 연결하는 검증 경계다.',
  owns: ['VariableSize.CSV family ownership', 'legacy index dictionary', 'missing mapping markers', 'source evidence links'],
  dependsOn: [
    'catalog',
    'settings',
    'meta',
    'run',
    'world',
    'mission',
    'people',
    'social',
    'body',
    'text',
    'economy',
    'inventory',
    'equipment',
    'shop',
    'work',
    'feature-state',
    'feature-session',
    'interaction',
    'script',
  ],
  createInitialState: () => ({
    familyOwnership: legacyFamilyOwnership,
    indexMappings: legacyIndexMappings,
  }),
};
