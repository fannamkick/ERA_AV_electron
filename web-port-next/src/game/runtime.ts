import { catalogModule } from '../catalog/module';
import { bodyModule } from '../domains/body/module';
import { economyModule } from '../domains/economy/module';
import { equipmentModule } from '../domains/equipment/module';
import { featureStateModule } from '../domains/featureState/module';
import { featureSessionModule } from '../domains/featureSession/module';
import { interactionModule } from '../domains/interaction/module';
import { inventoryModule } from '../domains/inventory/module';
import { metaModule } from '../domains/meta/module';
import { missionModule } from '../domains/mission/module';
import { missionSessionModule } from '../domains/missionSession/module';
import { peopleModule } from '../domains/people/module';
import { runModule } from '../domains/run/module';
import { saveModule } from '../domains/save/module';
import { scriptModule } from '../domains/script/module';
import { settingsModule } from '../domains/settings/module';
import { shopModule } from '../domains/shop/module';
import { shootingSessionModule } from '../domains/shootingSession/module';
import { socialModule } from '../domains/social/module';
import { textModule } from '../domains/text/module';
import { uiSessionModule } from '../domains/ui/module';
import { visitSessionModule } from '../domains/visit/module';
import { worldModule } from '../domains/world/module';
import { workSessionModule } from '../domains/workSession/module';
import { workModule } from '../domains/work/module';
import { gameFeatures } from '../features';
import { createGameDefinition } from '../kernel/module';
import { initialGameCatalog, initialGameSession, initialGameState } from './state';

export const gameDefinition = createGameDefinition({
  domains: [
    catalogModule,
    saveModule,
    settingsModule,
    metaModule,
    runModule,
    worldModule,
    missionModule,
    missionSessionModule,
    peopleModule,
    socialModule,
    bodyModule,
    textModule,
    economyModule,
    inventoryModule,
    equipmentModule,
    shopModule,
    shootingSessionModule,
    workModule,
    featureStateModule,
    featureSessionModule,
    interactionModule,
    scriptModule,
    uiSessionModule,
    visitSessionModule,
    workSessionModule,
  ],
  features: gameFeatures,
});

export const gameRuntimeInputs = {
  initialCatalog: initialGameCatalog,
  initialState: initialGameState,
  initialSession: initialGameSession,
} as const;
