import type { DomainModule } from '../../kernel/module';
import { initialInventoryState } from './types';

export const inventoryModule: DomainModule = {
  id: 'inventory',
  label: 'Inventory',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'inventory',
  description: 'ITEM 계열 보유 수량과 아이템별 사용 제한만 관리한다. 판매 가능 상태, 구매 선택값, NOITEM 우회 플래그는 소유하지 않는다.',
  owns: ['item counts', 'item-specific restrictions'],
  dependsOn: ['catalog'],
  createInitialState: () => initialInventoryState,
};
