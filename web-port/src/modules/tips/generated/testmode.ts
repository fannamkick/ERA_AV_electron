/**
 * TESTMODE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function testmode(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('何かの実動テスト用に用意された呼出関数です');
  ctx.showMessage('開発用なので通常時には特に何もありません');
  return;
}
