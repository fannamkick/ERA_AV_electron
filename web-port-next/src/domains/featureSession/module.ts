import type { DomainModule } from '../../kernel/module';
import { initialFeatureSessionState } from './types';

export const featureSessionModule: DomainModule = {
  id: 'feature-session',
  label: 'Feature Session',
  status: 'active',
  layer: 'gameplay',
  stateScope: 'session',
  statePath: 'session.featureSession',
  description: '구체 세션 도메인으로 아직 분리하지 않은 기능 실행 프레임 중 커맨드 시퀀스와 상태만 임시로 관리한다.',
  owns: ['command sequences', 'passout status', 'deferred user command'],
  dependsOn: ['interaction'],
  createInitialState: () => initialFeatureSessionState,
};
