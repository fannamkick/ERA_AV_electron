import type { RouteScreenProps } from './routeScreenTypes';
import { BootScreen } from './screens/BootScreen';
import { ItemShopScreen } from './screens/ItemShopScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { MissionScreen } from './screens/MissionScreen';
import { RecruitScreen } from './screens/RecruitScreen';
import { RosterScreen } from './screens/RosterScreen';
import { SaveLoadScreen } from './screens/SaveLoadScreen';
import { ShootingScreen } from './screens/ShootingScreen';
import { TrainingScreen } from './screens/TrainingScreen';
import { UnknownRouteScreen } from './screens/UnknownRouteScreen';
import { VisitScreen } from './screens/VisitScreen';
import { WardrobeScreen } from './screens/WardrobeScreen';
import { WorkScreen } from './screens/WorkScreen';

export function RouteScreen(props: RouteScreenProps) {
  const route = props.session.ui.route;

  if (route === 'boot' || route === 'newGame') return <BootScreen {...props} />;
  if (route === 'mainMenu') return <MainMenuScreen {...props} />;
  if (route === 'itemShop') return <ItemShopScreen {...props} />;
  if (route === 'mission') return <MissionScreen {...props} />;
  if (route === 'recruit') return <RecruitScreen {...props} />;
  if (route === 'roster') return <RosterScreen {...props} />;
  if (route === 'wardrobe') return <WardrobeScreen {...props} />;
  if (route === 'shooting') return <ShootingScreen {...props} />;
  if (route === 'training') return <TrainingScreen {...props} />;
  if (route === 'visit') return <VisitScreen {...props} />;
  if (route === 'work') return <WorkScreen {...props} />;
  if (route === 'saveLoad') return <SaveLoadScreen {...props} />;
  return <UnknownRouteScreen {...props} />;
}
