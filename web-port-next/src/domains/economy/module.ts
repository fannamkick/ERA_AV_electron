import type { DomainModule } from '../../kernel/module';
import { initialEconomyState } from './types';

export const economyModule: DomainModule = {
  id: 'economy',
  label: 'Economy',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'save',
  statePath: 'economy',
  description: '현재 자금, 거래 로그, 경제 관련 확정 플래그를 관리한다. 목표 금액과 평판/부채/누적 매출은 근거 확인 전까지 여기 만들지 않는다.',
  owns: ['current money', 'accounting entries', 'legacy economy flags needing mapping'],
  dependsOn: [],
  createInitialState: () => initialEconomyState,
};
