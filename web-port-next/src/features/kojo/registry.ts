import type { KojoDialogueSpec } from './types';

// 캐릭터 템플릿 ID별 구상 사양 사전
export const kojoRegistry: Record<string, readonly KojoDialogueSpec[]> = {
  '1': [
    {
      id: 'virgin_v_orgasm',
      text: '아앗... 처음인데.. 안에 기분좋은게 가득해서.. 흐앗, 처녀막이 찢어져버렷...!',
      conditions: {
        commandId: '20', // 정상위
        isVirginVOrgasm: true,
      },
      specificity: 100, // 처녀막 상실 V절정은 최우선순위
    },
    {
      id: 'v_command_high_obedience',
      text: '하앗! 주인님, V조교는 너무 가버려요...!',
      conditions: {
        commandId: '20',
        minObedience: 3,
      },
      specificity: 50,
    },
    {
      id: 'default_v_command',
      text: '안돼.. V조교는 그만해주세요..',
      conditions: {
        commandId: '20',
      },
      specificity: 10,
    },
  ],
};
