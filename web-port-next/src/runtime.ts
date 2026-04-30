import { validateLegacyFamilyOwnership } from './adapters/legacy/familyOwnership';
import { legacyAdapterModule } from './adapters/legacy/module';
import { gameDefinition, gameRuntimeInputs } from './game/runtime';
import { createGameDefinition } from './kernel/module';
import { createGameRuntime } from './kernel/runtime';

export const appGameDefinition = createGameDefinition({
  domains: [...gameDefinition.domains, legacyAdapterModule],
  features: gameDefinition.features,
});

export const gameRuntime = createGameRuntime({
  definition: appGameDefinition,
  initialCatalog: gameRuntimeInputs.initialCatalog,
  initialState: gameRuntimeInputs.initialState,
  initialSession: gameRuntimeInputs.initialSession,
  extraDiagnostics: validateLegacyFamilyOwnership(),
});
