import type { FeatureModule } from '../kernel/module';

export type FirstPlayableLoopStep = {
  readonly id: string;
  readonly label: string;
  readonly requiredDomain: string;
};

export const firstPlayableLoop: readonly FirstPlayableLoopStep[] = [
  { id: 'new-game', label: '새 게임 시작', requiredDomain: 'run' },
  { id: 'create-roster', label: '캐릭터 로스터 생성', requiredDomain: 'people' },
  { id: 'assign-roles', label: '대상과 조수 지정', requiredDomain: 'interaction' },
  { id: 'execute-training', label: '간단한 훈련 실행', requiredDomain: 'interaction' },
  { id: 'apply-result', label: '결과를 인물/신체/경제 상태에 적용', requiredDomain: 'body' },
  { id: 'end-day', label: '하루 종료와 예약 이벤트 처리', requiredDomain: 'run' },
  { id: 'save-load', label: '저장과 불러오기', requiredDomain: 'save' },
];

export const firstPlayableLoopFeature: FeatureModule = {
  id: 'first-playable-loop',
  label: 'First Playable Loop',
  milestone: 'M7',
  status: 'planned',
  description: '새 게임부터 역할 지정, 단일 훈련, 결과 적용, 하루 종료, 저장까지 통과하는 최소 루프를 만든다.',
  requiredDomains: [
    'catalog',
    'save',
    'settings',
    'meta',
    'run',
    'world',
    'mission',
    'mission-session',
    'people',
    'social',
    'body',
    'text',
    'economy',
    'inventory',
    'equipment',
    'shop',
    'shooting-session',
    'work',
    'feature-state',
    'feature-session',
    'interaction',
    'script',
    'ui-session',
    'visit-session',
    'work-session',
    'legacy-adapter',
  ],
  provides: ['new game path', 'role assignment path', 'single training execution path', 'end day path', 'save/load boundary'],
  steps: firstPlayableLoop.map((step) => step.label),
};
