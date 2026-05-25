/**
 * SHOP_SLAVE3.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function chara_price(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 99; COUNT++) {
    if (flag[1000+ctx.count] == 0) {
      // TODO: FLAG:(1000+COUNT) = ITEMPRICE:(100+COUNT)
    }
  }
}
