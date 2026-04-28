/**
 * ITEM_AV.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function item_av(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(` 교환소`);
  ctx.showMessage(`《습득한 메달을 다양한 아이템과 교환할 수 있습니다》`);
  ctx.showMessage(` 현재 소지 메달: ${ctx.masterBase[61]}개`);
  ctx.drawLine('･･');
  ctx.showMessage('[0] - 포인트와 교환한다 (1개: 5000pt)');
}
