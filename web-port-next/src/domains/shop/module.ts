import type { DomainModule } from '../../kernel/module';
import { initialShopState } from './types';

export const shopModule: DomainModule = {
  id: 'shop',
  label: 'Shop',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'shop',
  description: '세이브에 남는 상점 해금, 숨김, 시설 진행만 관리한다. 현재 판매 가능 목록과 선택 중인 물건은 세션 또는 화면 모델이 소유한다.',
  owns: ['shop unlocks', 'hidden listings', 'facility flags', 'legacy shop flags needing mapping'],
  dependsOn: ['catalog', 'inventory', 'economy', 'people'],
  createInitialState: () => initialShopState,
};
