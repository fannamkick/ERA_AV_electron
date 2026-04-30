import type { GameState } from '../game/state';
import type { MainMenuView, MenuItemView } from '../game/views';

const phaseOneMainMenuItems: readonly MenuItemView[] = [
  { id: 'training', label: '훈련 시작', route: 'training', enabled: true },
  { id: 'recruit', label: '인물 영입', route: 'recruit', enabled: true },
  { id: 'itemShop', label: '아이템 구매/사용', route: 'itemShop', enabled: true },
  { id: 'work', label: '창관/업무', route: 'work', enabled: true },
  { id: 'shooting', label: '촬영', route: 'shooting', enabled: true },
  { id: 'clothing', label: '재단/의복', enabled: false, disabledReason: 'M23 이후 기능 전수 구현' },
  { id: 'visit', label: '방문', route: 'visit', enabled: true },
  { id: 'rest', label: '휴식/시간 종료', enabled: true },
  { id: 'abilityUp', label: '능력 상승', enabled: false, disabledReason: 'M23 이후 기능 전수 구현' },
  { id: 'mission', label: '미션', route: 'mission', enabled: true },
  { id: 'saveLoad', label: '저장/로드', route: 'saveLoad', enabled: true },
  { id: 'settings', label: '설정/정보/업적/도움말/디버그', enabled: false, disabledReason: 'M23에서 구현 또는 승인 제외 분류' },
  { id: 'endingCheck', label: '엔딩 체크', enabled: false, disabledReason: 'M27에서 1차 구현' },
];

export function buildMainMenuView(state: GameState): MainMenuView {
  return {
    kind: 'mainMenu',
    route: 'mainMenu',
    currentMoney: state.economy.account.currentMoney,
    menuItems: phaseOneMainMenuItems,
  };
}
