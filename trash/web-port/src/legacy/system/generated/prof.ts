/**
 * PROF.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function show_prof(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.exp[76] === 0 && ctx.talents[400] === 0) {
    ctx.showMessage(` 아직 데뷔하지 않았습니다.`);
  } else if (ctx.exp[76] <= 10 && ctx.talents[400] === 1) {
    ctx.showMessage(` ${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "는")} AV 여배우로 데뷔했습니다.`);
    ctx.showMessage(` 지금까지 ${ctx.exp[76]}개의 작품을 릴리즈했습니다。`);
  } else if (ctx.exp[76] >= 10 && ctx.exp[76] <= 30 && ctx.talents[400] === 1) {
    ctx.showMessage(` ${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "는")} 인기 AV 여배우 중 한명입니다.`);
    ctx.showMessage(` 지금까지 ${ctx.exp[76]}개의 작품을 릴리즈했습니다。`);
  } else if (ctx.exp[76] >= 30 && ctx.talents[400] === 1) {
    ctx.showMessage(` ${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "는")} AV역사에 이름을 남길 정도의 초대형물 AV 여배우입니다.`);
    ctx.showMessage(` 지금까지 ${ctx.exp[76]}개의 작품을 릴리즈했습니다。`);
  }
  if (ctx.talents[184]) {
    ctx.print('현재');
    await print_boyfriend(ctx, character);
    if (ctx.result === 0) {
      ctx.print('와');
    } else {
      ctx.print('과');
    }
    ctx.showMessage('교제하고 있습니다。');
  }
  if (ctx.exp[101] >= 1) {
    ctx.print('');
    if (character.cflags[621] === 1) {
      ctx.showMessage(`남자친구와`);
      if (ctx.exp[109] >= 1) {
        ctx.showMessage(`전 남친 합계`);
      }
    } else {
      ctx.showMessage(`전 남친과`);
    }
    ctx.showMessage(`${ctx.exp[101]}회 섹스한 적 있`);
    if (character.cflags[15] === 8 && character.cflags[167] === 1) {
      ctx.showMessage(`고 전 남친으로 처녀상실 했`);
    } else if (character.cflags[15] === 8 && character.cflags[621] === 1) {
      ctx.print('고 남친의');
      if (character.cflags[15] === 8 && character.cflags[622] === 0) {
        ctx.print('흑');
      } else if (character.cflags[15] === 8 && character.cflags[622] === 3) {
        ctx.print('포경');
      } else if (character.cflags[15] === 8 && character.cflags[622] === 6) {
        ctx.print('극태');
      }
      if (ctx.talents[76] === 1) {
        ctx.print('자○');
      } else {
        ctx.print('페니스');
      }
      ctx.print('로 처녀상실 했');
    } else {
      ctx.print('');
    }
    ctx.showMessage('습니다.');
  }
  if (ctx.exp[104] >= 1) {
    ctx.showMessage(`섹프와 ${ctx.exp[104]}회 콘돔 없이 섹스한 적 있`);
    if (character.cflags[15] === 9) {
      ctx.print('고');
      ctx.print('섹파의');
      ctx.print('극태 검은 자○로 처녀상실 했');
    } else {
      ctx.print('');
    }
    ctx.showMessage('습니다.');
  }
  if (ctx.exp[109] >= 1) {
    ctx.showMessage(`이전에 ${ctx.exp[109]}명의 남성과 교제한 적 있`);
    if (character.cflags[621] === 1) {
      ctx.showMessage(`고, 현재 남친인`);
      await print_boyfriend(ctx, character);
      if (ctx.result === 0) {
        ctx.print('는');
      } else {
        ctx.print('은');
      }
      ctx.showMessage(`${ctx.exp[109] + 1}명째의 남친입`);
    } else {
      ctx.showMessage(`습`);
    }
    ctx.showMessage(`니다.`);
  }
  if (ctx.talents[432] === 1 && ctx.talents[203] === 1 && ctx.talents[509] === 1 && ctx.talents[519] === 1) {
    ctx.showMessage(` 현역 아이돌인만큼 소녀들 사이에서 카리스마적인 존재입니다。`);
  } else if (ctx.talents[422] === 1 && ctx.talents[203] === 0 && ctx.talents[509] === 0 && ctx.talents[519] === 0 && ctx.talents[432] === 1 && ctx.abilities[72] >= 4) {
    ctx.showMessage(` 어떤 DJ바의 레게 파티에서는 약간 유명한 댄서인 것 같습니다。`);
  }
  if (ctx.exp[103] >= 1) {
    ctx.showMessage(`치한을 ${ctx.exp[103]}회 만난 적 있`);
    if (character.cflags[15] === 7) {
      ctx.print('고,');
      ctx.print('치한의');
      ctx.print('페니스로 처녀상실 했');
    } else {
      ctx.print('');
    }
    ctx.showMessage('습니다.');
  }
  if (ctx.exp[60] >= 1) {
    ctx.showMessage(` ${ctx.josaHelper("타겟은")} ${ctx.exp[60]}명의 엄마입니다.`);
  }
  if (ctx.talents[424] === 1) {
    ctx.showMessage(` ${ctx.josaHelper("타겟이")} 애연하고 있는 담배는 %CSTR:6%입니다.`);
  }
  if (character.cflags[661] != 1 && (character.cflags[15] != 0 || character.cflags[16] != -1 || character.cflags[616] != 0)) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
}
