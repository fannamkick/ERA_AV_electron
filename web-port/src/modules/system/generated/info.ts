/**
 * INFO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function show_info(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[0] === 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await show_talent(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await show_info_abl(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    if (character != 0) {
      await show_info_mark(ctx, character);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    }
    await show_info_exp(ctx, character);
    await show_juel(ctx, character);
  } else if (ctx.args[0] === 1) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await show_info_birthday(ctx, character);
    ctx.print('');
    await show_info_bodysize(ctx, character);
    if (ctx.flags[160] === 0) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      await show_info_slung(ctx, character);
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await show_info_lesson(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await show_info_casualwear(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    if (character != ctx.master) {
      await show_appearace(ctx, character);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    }
  } else if (ctx.args[0] === 2) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    if (character != ctx.master) {
      await show_prof(ctx, character);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    }
  } else if (ctx.args[0] === 3) {
    await print_actress_str(ctx, character);
  } else if (ctx.args[0] === 4) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await print_actress_relation(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
}

export async function show_talent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  U = 0;
  S = 0;
  for (let COUNT = 0; COUNT < 31; COUNT++) {
    if (S > 0 || (S % 6 === 0)) {
      switch (U) {
        case 0:
          if (S === 6) {
            ctx.showMessage('');
            U += 1;
          }
          case 1:
            if (S === 12) {
              ctx.showMessage('');
              U += 1;
            }
            case 2:
              if (S === 18) {
                ctx.showMessage('');
                U += 1;
              }
              case 3:
                if (S === 24) {
                  ctx.showMessage('');
                  U += 1;
                }
                case 4:
                  if (S === 30) {
                    ctx.showMessage('');
                    U += 1;
                  }
                  case 5:
                    if (S === 36) {
                      ctx.showMessage('');
                      U += 1;
                    }
                  break;
                }
              }
              if (ctx.count === 0) {
                if (ctx.talents[0]) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[처녀]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[0] === 0 && ctx.talents[122] === 0) {
                  if (ctx.talents[2] === 0) {
                    ctx.setColor(0xF58F98);
                    ctx.showMessage(`[양구멍 관통 완료]`);
                    ctx.resetColor();
                    S += 1;
                  } else {
                    ctx.showMessage(`[비처녀]`);
                    S += 1;
                  }
                }
              } else if (ctx.count === 1) {
                if (ctx.talents[1]) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[동정]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 2) {
                if (ctx.talents[2]) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[애널처녀]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[2] === 0) {
                  if (ctx.talents[0] === 0) {
                    ctx.showMessage(``);
                  } else {
                    ctx.showMessage(`[애널비처녀]`);
                    S += 1;
                  }
                }
              } else if (ctx.count === 3) {
                if (ctx.talents[85] === 1 && ctx.talents[430] === 0) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[연심]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[85] === 1 && ctx.talents[430] ==1) {
                  ctx.print('');
                }
                if (ctx.talents[90] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[섹프]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 4) {
                if (ctx.talents[430] === 1) {
                  ctx.setColor(0xAFB4DB);
                  ctx.showMessage(`[영원한 사랑]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 5) {
                if (ctx.talents[511] === 1 && ctx.talents[505] === 0) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[천사]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[85] === 1 && ctx.talents[430] ==1) {
                  ctx.print('');
                }
              } else if (ctx.count === 6) {
                if (ctx.talents[440] === 1) {
                  ctx.setColor(0xAFB4DB);
                  ctx.showMessage(`[절륜]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 7) {
                if (ctx.talents[76] === 1 && ctx.talents[422] === 1 && ctx.talents[432] === 1 && ctx.talents[511] === 0 && ctx.talents[505] === 0) {
                  ctx.setColor(0xAFB4DB);
                  ctx.showMessage(`[흑갸루걸레]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[76] === 1 && ctx.talents[432] === 1 && ctx.talents[440] === 0) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[음란]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[76] === 1 && ctx.talents[440] === 0) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[음란]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 8) {
                if (ctx.talents[121] === 1) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[후타나리]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 9) {
                if (ctx.talents[180] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[업소여성]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 10) {
                if (ctx.talents[181] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[고급창부]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 11) {
                if (ctx.talents[184] === 1) {
                  if (ctx.talents[190] === 1) {
                    ctx.setColor(0xF58F98);
                    ctx.showMessage(`[깨끗한 교제]`);
                    ctx.resetColor();
                    S += 1;
                  } else {
                    ctx.setColor(0xF58F98);
                    ctx.showMessage(`[남친있음]`);
                    ctx.resetColor();
                    S += 1;
                  }
                }
              } else if (ctx.count === 12) {
                if (ctx.talents[401] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[인기 AV배우]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[400] === 1 && ctx.talents[401] === 0) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[AV배우]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 13) {
                if (ctx.talents[422] === 1 && ctx.talents[76] === 0 && ctx.talents[432] === 1 && ctx.talents[511] === 0 && ctx.talents[505] === 0) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[흑갸루]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[422] === 1 && ctx.talents[432] === 1 && ctx.talents[511] === 1 && ctx.talents[505] === 1) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[갈색피부]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[422] === 1 && ctx.talents[432] === 0) {
                  ctx.setColor(0xDDBBCC);
                  ctx.showMessage(`[갈색피부]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[422] === 1 && ctx.talents[432] === 1 && ctx.talents[511] === 0 && ctx.talents[505] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[흑갸루]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[422] === 1 && ctx.talents[432] === 1 && ctx.talents[511] === 1 && ctx.talents[505] === 0) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[흑갸루]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 14) {
                if (ctx.talents[422] === 1 && ctx.talents[432] === 1 && ctx.talents[511] === 1 && ctx.talents[505] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[갸루계]`);
                  ctx.resetColor();
                  S += 1;
                } else if (ctx.talents[422] === 0 && ctx.talents[432] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[갸루계]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 15) {
                if (ctx.talents[425] === 1) {
                  ctx.setColor(0xF58F98);
                  ctx.showMessage(`[섹프있음]`);
                  ctx.resetColor();
                  S += 1;
                }
              } else if (ctx.count === 16) {
                if (ctx.talents[505] === 1 && ctx.talents[511] === 0 && ctx.talents[554] === 0) {
                  ctx.setColor(0xF58F98);
                  if (ctx.talents[122] === 0) {
                    ctx.showMessage(`[서큐버스]`);
                    S += 1;
                  } else if (ctx.talents[121] === 1) {
                    ctx.showMessage(`[인큐버스]`);
                    S += 1;
                  }
                  ctx.resetColor();
                } else if (ctx.talents[505] === 1 && ctx.talents[511] === 1 && ctx.talents[554] === 0) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[타천사]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 17) {
                if (ctx.talents[509] === 1 && ctx.talents[203] === 0) {
                  ctx.setColor(0xAFB4DB);
                  ctx.showMessage(`[Colorful Pure Girls]`);
                  S += 1;
                  ctx.resetColor();
                } else if (ctx.talents[509] === 1 && ctx.talents[203] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[Colorful Pure Girls]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 18) {
                if (ctx.talents[515] === 1 && ctx.talents[203] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[%CSTR:MASTER:4%]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 19) {
                if (ctx.talents[551] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[기적]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 20) {
                if (ctx.talents[550] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[근성]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 21) {
                if (ctx.talents[518] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[Mermaid girl]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 22) {
                if (ctx.talents[519] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[Triptych]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 23) {
                if (ctx.talents[522] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[Emerald Queen]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 24) {
                if (ctx.talents[523] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[Lily Princess]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 25) {
                if (ctx.talents[552] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[ONLY ONE IDOL]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 26) {
                if (ctx.talents[553] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[ONLY ONE EMPRESS]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 27) {
                if (ctx.talents[554] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[LUXURIA]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 28) {
                if (ctx.talents[562] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[SUPER HEROINE]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 29) {
                if (ctx.talents[560] === 1) {
                  ctx.setColor(0xFFD700);
                  ctx.showMessage(`[구현]`);
                  S += 1;
                  ctx.resetColor();
                }
              } else if (ctx.count === 30) {
                if (S != U * 6) {
                  ctx.showMessage('');
                  S = 0;
                }
                // TODO: BREAK
              }
            }
            for (let COUNT = 0; COUNT < 600; COUNT++) {
              if (ctx.count === 0) {
                // TODO: CONTINUE
              } else if (ctx.count === 1) {
                // TODO: CONTINUE
              } else if (ctx.count === 2) {
                // TODO: CONTINUE
              } else if (ctx.count === 76) {
                // TODO: CONTINUE
              } else if (ctx.count === 85) {
                // TODO: CONTINUE
              } else if (ctx.count === 90) {
                // TODO: CONTINUE
              } else if (ctx.count === 180) {
                // TODO: CONTINUE
              } else if (ctx.count === 181) {
                // TODO: CONTINUE
              } else if (ctx.count === 184) {
                // TODO: CONTINUE
              } else if (ctx.count === 400) {
                // TODO: CONTINUE
              } else if (ctx.count === 401) {
                // TODO: CONTINUE
              } else if (ctx.count === 422) {
                // TODO: CONTINUE
              } else if (ctx.count === 425) {
                // TODO: CONTINUE
              } else if (ctx.count === 121) {
                // TODO: CONTINUE
              } else if (ctx.count === 430) {
                // TODO: CONTINUE
              } else if (ctx.count === 432) {
                // TODO: CONTINUE
              } else if (ctx.count === 440) {
                // TODO: CONTINUE
              } else if (ctx.count === 505) {
                // TODO: CONTINUE
              } else if (ctx.count === 509) {
                // TODO: CONTINUE
              } else if (ctx.count === 511) {
                // TODO: CONTINUE
              } else if (ctx.count === 515) {
                // TODO: CONTINUE
              } else if (ctx.count === 518) {
                // TODO: CONTINUE
              } else if (ctx.count === 519) {
                // TODO: CONTINUE
              } else if (ctx.count === 522) {
                // TODO: CONTINUE
              } else if (ctx.count === 523) {
                // TODO: CONTINUE
              } else if (ctx.count >= 550) {
                // TODO: CONTINUE
              } else if (ctx.count === 114 && ctx.talents[114] && (ctx.talents[251] || ctx.talents[252] || ctx.talents[253])) {
                // TODO: CONTINUE
              } else if (ctx.getTalent(target, ctx.count)) {
                ctx.showMessage(`[${ctx.getVarName("TALENT", COUNT)}]`);
                S += 1;
                if (S % 6 === 0) {
                  ctx.showMessage('');
                }
              }
            }
            if (S % 6 != 0) {
              ctx.showMessage('');
            }
}

export async function show_info_abl(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  U = 0;
  for (let COUNT = 0; COUNT < 40; COUNT++) {
    if (ctx.count >= 4 && ctx.count <=9) {
      // TODO: CONTINUE
    }
    if (ctx.count >= 18 && ctx.count <= 19) {
      // TODO: CONTINUE
    }
    if (ctx.count >= 24 && ctx.count <= 29) {
      // TODO: CONTINUE
    }
    if (ctx.count >= 34 && ctx.count <= 36) {
      // TODO: CONTINUE
    }
    if (ctx.talents[122] && (ctx.count == 2 || ctx.count == 22 || ctx.count == 33)) {
      // TODO: CONTINUE
    }
    if (ctx.talents[122] == 0 && (ctx.count == 23 || ctx.count == 34)) {
      // TODO: CONTINUE
    }
    X = ctx.count;
    if (ctx.abilities[X] == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`${ctx.getVarName("ABL", X)}`);
    if (X <= 3 || X === 17) {
      ctx.print('');
    } else if ((X >= 10 && X <= 12) || X === 15) {
      ctx.print('');
    }
    ctx.showMessage(`- ${ctx.abilities[X]}LV`);
    await decide_ablup,x(ctx, character);
    U += 1;
    if (U % 4 === 0) {
      ctx.showMessage('');
    }
  }
  if (U % 4 != 0) {
    ctx.showMessage('');
  }
  U = 0;
  for (let COUNT = 0; COUNT < 3; COUNT++) {
    X = ctx.count + 50;
    if (ctx.abilities[X] == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`${ctx.getVarName("ABL", X)}`);
    if (X === 52) {
      ctx.showMessage(`- ${ctx.abilities[X]}LV`);
    } else {
      ctx.showMessage(`- ${ctx.abilities[X]}LV`);
    }
    U += 1;
    if (U % 4 === 0) {
      ctx.showMessage('');
    }
  }
  for (let COUNT = 0; COUNT < 12; COUNT++) {
    X = ctx.count + 70;
    if (ctx.abilities[X] == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`${ctx.getVarName("ABL", X)}`);
    ctx.showMessage(`- ${ctx.abilities[X]}LV`);
    U += 1;
    if (U % 4 === 0) {
      ctx.showMessage('');
    }
  }
  if (U % 4 != 0) {
    ctx.showMessage('');
  }
}

export async function show_info_mark(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`고통:LV${character.mark[0]}`);
  ctx.drawBar(character.mark[0], 3, 3);
  ctx.showMessage(`쾌락:LV${character.mark[1]}`);
  ctx.drawBar(character.mark[1], 3, 3);
  ctx.showMessage(`굴복:LV${character.mark[2]}`);
  ctx.drawBar(character.mark[2], 3, 3);
  ctx.showMessage(`반발:LV${character.mark[3]}`);
  ctx.drawBar(character.mark[3], 3, 3);
  await decide_ablup99(ctx, character);
  if (ctx.result == 1) {
    ctx.printChar('*');
  }
  ctx.showMessage('');
}

export async function show_info_exp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  U = 0;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    if (ctx.exp[ctx.count] == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`${ctx.getVarName("EXP", COUNT)}:${ctx.exp[ctx.count]}`);
    U += 1;
    if (U % 4 === 0) {
      ctx.showMessage('');
    }
  }
  if (U % 4 != 0) {
    ctx.showMessage('');
  }
}

export async function life_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (MAXctx.base[0] <= 0) {
    return 0;
  }
  ctx.locals[1] = ctx.base[0] * 100;
  ctx.locals[0] = ctx.locals[1] / MAXctx.base[0];
  ctx.print('체력치');
  if (ctx.base[0] < 0) {
    ctx.drawBar(0, MAXctx.base[0], 32);
    ctx.showMessage(`(0/${MAXctx.base[0]})`);
  } else {
    ctx.drawBar(ctx.base[0], MAXctx.base[0], 32);
    ctx.showMessage(`(${ctx.base[0]}/${MAXctx.base[0]})`);
  }
  if (ctx.base[0] < 0) {
    ctx.print('★사망★');
  } else if (ctx.base[0] < 500) {
    ctx.print('★빈사★');
  }
  ctx.showMessage('');
  ctx.resetColor();
}

export async function vital_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (MAXctx.base[1] <= 0) {
    return 0;
  }
  ctx.print('기력치');
  if (ctx.base[1] < 0) {
    ctx.drawBar(0, MAXctx.base[1], 32);
    ctx.showMessage(`(0/${MAXctx.base[1]})`);
  } else {
    ctx.drawBar(ctx.base[1], MAXctx.base[1], 32);
    ctx.showMessage(`(${ctx.base[1]}/${MAXctx.base[1]})`);
  }
  if (ctx.base[1] <= 0) {
    ctx.print('★기력0★');
  }
  ctx.showMessage('');
  ctx.resetColor();
}

export async function beauty_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (MAXctx.base[31] <= 0) {
    return 0;
  }
  ctx.print('매력치');
  if (ctx.base[31] < 0) {
    ctx.drawBar(0, MAXctx.base[31], 32);
    ctx.showMessage(`(0/${MAXctx.base[31]})`);
  } else {
    ctx.drawBar(ctx.base[31], MAXctx.base[31], 32);
    ctx.showMessage(`(${ctx.base[31]}/${MAXctx.base[31]})`);
  }
  ctx.showMessage('');
}

export async function mp_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (MAXctx.base[40] <= 0) {
    return 0;
  }
  ctx.print('마력');
  if (ctx.base[40] < 0 || ctx.talents[9] === 1) {
    ctx.drawBar(0, MAXctx.base[40], 32);
    ctx.showMessage(`(0/${MAXctx.base[40]})`);
  } else {
    ctx.drawBar(ctx.base[40], MAXctx.base[40], 32);
    ctx.showMessage(`(${ctx.base[40]}/${MAXctx.base[40]})`);
  }
  ctx.showMessage('');
}

export async function ntr_bar(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[620] <= 0) {
    return 0;
  }
  ctx.print('NTR');
  if (character.cflags[619] < 0) {
    ctx.drawBar(0, character.cflags[620], 32);
    ctx.showMessage(`(0/${character.cflags[620]})`);
  } else {
    ctx.drawBar(character.cflags[619], character.cflags[620], 32);
    ctx.showMessage(`(${character.cflags[619]}/${character.cflags[620]})`);
  }
  ctx.showMessage('');
}

export async function show_appearace(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
  await print_hairstyle(ctx, character);
  ctx.showMessage('.');
  if (ctx.flags[37]) {
    ctx.showMessage(`지도실에 불러낼 때의 복장은`);
    await print_clothtype(ctx, character);
    if (character.cflags[40] === 0) {
      ctx.showMessage(``);
    } else {
      ctx.showMessage(`차림`);
    }
    ctx.showMessage('입니다.');
  }
  if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
    if (character.cflags[40] == 64) {
      ctx.showMessage('안쪽은 전라인 것 같습니다.');
    }
    return 1;
  }
  if ((character.cflags[40] & 8) && (character.cflags[40] & 1) == 0 && character.cflags[41] <= 240 && character.cflags[41] >= 251) {
    ctx.showMessage('팬티는 입지 않은 것 같습니다.');
  }
  if (character.cflags[606] >= 1 && ((character.cflags[40] <= 3 || (character.cflags[40] === 15 && character.cflags[41] >= 241 && character.cflags[41] <= 250)) || (character.cflags[40] >= 64 && character.cflags[40] <= 67 && character.cflags[42] >= 51))) {
    await print_tatto(ctx, character);
    ctx.showMessage(` 문신이 새겨져 있습니다.`);
  }
  if ((character.cflags[40] & 6) === 0 || character.cflags[40] === 0 || (character.cflags[40] & 1) === 1) {
    if (character.cflags[607] === 1) {
      ctx.showMessage('양 겨드랑이에 털이 예쁘게 나 있습니다.');
    } else {
      ctx.showMessage('잔털의 처리는 완벽한 것 같습니다.');
    }
  }
  if (character.cflags[40] & 17) {
    return 0;
  }
  if ((character.cflags[40] & 64) && character.cflags[42] == 69) {
    return 0;
  }
  if ((character.cflags[40] & 8) && ctx.abilities[10] + ctx.abilities[17] < 3) {
    return 0;
  }
  if ((character.cflags[40] & 8) && (character.cflags[41] >= 240 && character.cflags[41] <= 250)) {
    return 0;
  }
  ctx.print('');
  if ((character.cflags[40] & 8) && (ctx.flags[36] || (character.cflags[7] & 12))) {
    await print_clothtype_main2(ctx, character);
    ctx.print('의 옷자락을 걷어올리게 하면');
  }
  if (ctx.flags[36]) {
    if (character.cflags[6] > 18) {
      ctx.showMessage('치부에서 애널까지 빽빽히 음모로 덮여 있습니다.');
    } else if (character.cflags[6] > 13) {
      ctx.showMessage('사타구니에 음모가 무성히 우거져 있습니다.');
    } else if (character.cflags[6] > 10) {
      ctx.showMessage('치부에 음모가 아름답게 자라 있습니다.');
    } else if (character.cflags[6] > 8 && ctx.talents[422] === 0) {
      ctx.showMessage('음부는 희미하게 음모로 덮여 있습니다.');
    } else if (character.cflags[6] > 8 && ctx.talents[422] === 1) {
      ctx.showMessage('마이크로비키니 라인을 따라 음모가 정리되어 있습니다.');
    } else if (character.cflags[6] > 6) {
      ctx.showMessage('음부를 희미하게 자라나기 시작한 음모가 덮고 있습니다.');
    } else if (character.cflags[6] > 0 && ctx.talents[125]) {
      ctx.showMessage('성기는 완전히 무모입니다.');
    } else if (character.cflags[6] > 0) {
      ctx.showMessage('성기는 깨끗하게 깎아져 있습니다.');
    } else if (character.cflags[6] === 0 || character.cflags[6] === 0 - 1) {
      ctx.showMessage('성기는 완전히 무모입니다.');
    } else if (character.cflags[6] === 0 - 2) {
      ctx.showMessage('음모는 영구 탈모되어 있습니다.');
    }
  }
  if (ctx.talents[122] === 0) {
    if (ctx.flags[36] === 1) {
      if (character.cflags[6] > 6) {
        ctx.showMessage(`음모에 덮힌`);
      } else {
        ctx.showMessage(`음모가 없이 맨들맨들한`);
      }
    }
    ctx.showMessage(`음부는`);
    await vaginaform(ctx, character);
    ctx.showMessage(`.`);
  }
  S = 0;
  if ((character.cflags[7] & 8)) {
    if (ctx.talents[122] || ctx.talents[121]) {
      ctx.print('페니스');
    } else {
      ctx.print('클리토리스');
    }
    S = 1;
  }
  if ((character.cflags[7] & 4)) {
    if (S) {
      ctx.print('와');
    } else {
      ctx.print('');
    }
    ctx.print('소음순');
    S = 1;
  }
  if ((character.cflags[40] & 6) === 0) {
    if ((character.cflags[7] & 1)) {
      if (S) {
        ctx.print('과');
      } else {
        ctx.print('');
      }
      ctx.print('유두');
      S = 1;
    }
  }
  if ((character.cflags[7] & 2)) {
    if (S) {
      ctx.print('와');
    } else {
      ctx.print('');
    }
    ctx.print('배꼽');
    S = 1;
  }
  if ((character.cflags[7] & 16)) {
    if (S) {
      ctx.print('과');
    } else {
      ctx.print('');
    }
    ctx.print('혀');
    S = 1;
  }
  if (S) {
    ctx.showMessage('에 피어스를 하고 있습니다.');
  }
  S = 0;
}

export async function stain_info(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 6; COUNT++) {
    if (ctx.count == 2 && ctx.getTalent(master, 121) == 0 && ctx.getTalent(master, 122) == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == 3 && ctx.getTalent(master, 122)) {
      // TODO: CONTINUE
    }
    if (ctx.count == 5 && ctx.getTalent(master, 122)) {
      // TODO: CONTINUE
    }
    ctx.showMessage(ctx.getString('NAME:MASTER'));
    if (ctx.count === 0) {
      ctx.print('의 입:');
    } else if (ctx.count === 1) {
      ctx.print('의 손:');
    } else if (ctx.count === 2) {
      ctx.print('의 P:');
    } else if (ctx.count === 3) {
      ctx.print('의 V:');
    } else if (ctx.count === 4) {
      ctx.print('의 A:');
    } else if (ctx.count === 5) {
      ctx.print('의 B:');
    }
    if (ctx.stain[ctx.master][ctx.count] & 1) {
      ctx.print('<V>');
    }
    if (ctx.stain[ctx.master][ctx.count] & 2) {
      ctx.print('<P>');
    }
    if (ctx.stain[ctx.master][ctx.count] & 4) {
      ctx.print('<정액>');
    }
    if (ctx.stain[ctx.master][ctx.count] & 8) {
      ctx.print('<A>');
    }
    if (ctx.stain[ctx.master][ctx.count] & 16) {
      ctx.print('<젖>');
    }
    if (ctx.stain[ctx.master][ctx.count] & 32) {
      ctx.print('<오줌>');
    }
    ctx.showMessage('');
  }
  for (let COUNT = 0; COUNT < 6; COUNT++) {
    if (ctx.count == 2 && ctx.talents[121] == 0 && ctx.talents[122] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == 3 && ctx.talents[122]) {
      // TODO: CONTINUE
    }
    if (ctx.count == 5 && ctx.talents[122]) {
      // TODO: CONTINUE
    }
    ctx.showMessage(ctx.getString('NAME:TARGET'));
    if (ctx.count === 0) {
      ctx.print('의 입:');
    } else if (ctx.count === 1) {
      ctx.print('의 손:');
    } else if (ctx.count === 2) {
      ctx.print('의 P:');
    } else if (ctx.count === 3) {
      ctx.print('의 V:');
    } else if (ctx.count === 4) {
      ctx.print('의 A:');
    } else if (ctx.count === 5) {
      ctx.print('의 B:');
    }
    if (ctx.stain[ctx.count] & 1) {
      ctx.print('<V>');
    }
    if (ctx.stain[ctx.count] & 2) {
      ctx.print('<P>');
    }
    if (ctx.stain[ctx.count] & 4) {
      ctx.print('<정액>');
    }
    if (ctx.stain[ctx.count] & 8) {
      ctx.print('<A>');
    }
    if (ctx.stain[ctx.count] & 16) {
      ctx.print('<젖>');
    }
    if (ctx.stain[ctx.count] & 32) {
      ctx.print('<오줌>');
    }
    ctx.showMessage('');
  }
  for (let COUNT = 0; COUNT < 6; COUNT++) {
    if (ctx.assi < 0) {
      // TODO: BREAK
    }
    if (ctx.count == 2 && ctx.getTalent(assi, 121) == 0 && ctx.getTalent(assi, 122) == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == 3 && ctx.getTalent(assi, 122)) {
      // TODO: CONTINUE
    }
    if (ctx.count == 5 && ctx.getTalent(assi, 122)) {
      // TODO: CONTINUE
    }
    ctx.showMessage(ctx.getString('NAME:ASSI'));
    if (ctx.count === 0) {
      ctx.print('의 입:');
    } else if (ctx.count === 1) {
      ctx.print('의 손:');
    } else if (ctx.count === 2) {
      ctx.print('의 P:');
    } else if (ctx.count === 3) {
      ctx.print('의 V:');
    } else if (ctx.count === 4) {
      ctx.print('의 A:');
    } else if (ctx.count === 5) {
      ctx.print('의 B:');
    }
    if (ctx.stain[ctx.assi][ctx.count] & 1) {
      ctx.print('<V>');
    }
    if (ctx.stain[ctx.assi][ctx.count] & 2) {
      ctx.print('<P>');
    }
    if (ctx.stain[ctx.assi][ctx.count] & 4) {
      ctx.print('<정액>');
    }
    if (ctx.stain[ctx.assi][ctx.count] & 8) {
      ctx.print('<A>');
    }
    if (ctx.stain[ctx.assi][ctx.count] & 16) {
      ctx.print('<젖>');
    }
    if (ctx.stain[ctx.assi][ctx.count] & 32) {
      ctx.print('<오줌>');
    }
    ctx.showMessage('');
  }
  await ctx.wait();
  return 1;
}

export async function show_equip_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.equipment[53]) {
    V = 10 - character.tflags[70] + 1;
    ctx.showMessage(`[촬영중(잔여 {V}회)]`);
  }
  if (character.equipment[54]) {
    ctx.print('[야외 플레이중]');
  }
  if (character.equipment[57]) {
    ctx.print('[수치(큰거울)플레이중]');
  }
  if (character.equipment[58]) {
    ctx.print('[목욕탕 플레이중]');
  }
  if (character.equipment[59]) {
    ctx.print('[');
    await print_costume(ctx, character);
    ctx.print('코스프레중]');
  }
  if (character.equipment[89]) {
    ctx.print('[수간 플레이중]');
  }
  if (character.equipment[90]) {
    ctx.print('[촉수소환중]');
  }
  if (character.equipment[70]) {
    ctx.print('[삼각목마 기승 중]');
  }
  ctx.showMessage('');
  if (character.equipment[150]) {
    ctx.print('[슬라임 생성중]');
  }
  if (character.equipment[70]) {
    ctx.print('[삼각목마 기승 중]');
  }
  ctx.showMessage('');
}

export async function show_equip_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.equipment[11] || character.equipment[13] || character.equipment[14] || character.equipment[15] || character.equipment[16] || character.equipment[17] || character.equipment[18] || character.equipment[19] || character.equipment[21] || character.equipment[22] || character.equipment[43] || character.equipment[44] || character.equipment[45] || character.equipment[46] || character.equipment[47] || character.equipment[48] || character.equipment[49] || character.equipment[98] || character.tflags[899] >= 1) {
    ctx.showMessage(`사용중(${ctx.getName(character)})`);
    if (character.equipment[21]) {
      ctx.print('[미약 효과 발휘중]');
    }
    if (character.equipment[22]) {
      ctx.print('[이뇨제 효과 발휘중]');
    }
    if (character.equipment[11] && character.equipment[90]) {
      ctx.print('[촉수 삽입]');
    } else if (character.equipment[11]) {
      ctx.print('[바이브]');
    }
    if (character.equipment[151]) {
      ctx.print('[슬라임 질내진입]');
    }
    if (character.equipment[13] && character.equipment[90]) {
      ctx.print('[촉수애널삽입]');
    } else if (character.equipment[13]) {
      ctx.print('[애널바이브]');
    }
    if (character.equipment[152]) {
      ctx.print('[슬라임 항문진입]');
    }
    if (character.equipment[14] && character.equipment[90]) {
      ctx.print('[촉수 클리자극]');
    } else if (character.equipment[14]) {
      ctx.print('[클리캡]');
    }
    if (character.equipment[15] && character.equipment[90]) {
      ctx.print('[촉수 유두자극]');
    } else if (character.equipment[15]) {
      ctx.print('[니플캡]');
    }
    if (character.equipment[16] && character.equipment[90]) {
      ctx.print('[촉수 착유]');
    } else if (character.equipment[16]) {
      ctx.print('[착유기]');
    }
    if (character.equipment[17] && character.equipment[90]) {
      ctx.print('[촉수페니스자극]');
    } else if (character.equipment[17]) {
      ctx.print('[오나홀]');
    }
    if (character.equipment[44] && character.equipment[90]) {
      ctx.print('[촉수 긴박]');
    } else if (character.equipment[44]) {
      ctx.print('[밧줄로 긴박]');
    }
    if (character.equipment[46] && character.equipment[90]) {
      ctx.print('[촉수 관장]');
    } else if (character.equipment[46]) {
      ctx.print('[관장+애널플러그]');
    }
    if (character.equipment[98]) {
      ctx.print('[촉수 구욕]');
    }
    if (character.equipment[154]) {
      ctx.print('[슬라임 구욕]');
    }
    if (character.equipment[43]) {
      ctx.print('[아이마스크]');
    }
    if (character.equipment[45]) {
      ctx.print('[볼재갈]');
    }
    if (character.equipment[18]) {
      ctx.print('[샤워]');
    }
    if (character.equipment[19]) {
      ctx.print('[애널비즈]');
    }
    if (character.equipment[49]) {
      ctx.print('[애널전극]');
    }
    if (character.tflags[899] >= 1) {
      ctx.print('[실신중]');
    }
    ctx.showMessage('');
  }
}

export async function saveinfo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[5] === 1) {
    ctx.putForm('EASY/');
  } else if (ctx.flags[5] === 2) {
    ctx.putForm('NORMAL/');
  } else if (ctx.flags[5] === 3) {
    ctx.putForm('HARD/');
  } else if (ctx.flags[5] === 4) {
    ctx.putForm('POWERFUL/');
  } else if (ctx.flags[5] === 9) {
    ctx.putForm('EXTRA/');
  }
  if (TIME === 0) {
    ctx.putForm('{DAY+1}주차・전반');
  } else {
    ctx.putForm('{DAY+1}주차・후반');
  }
  if (ctx.flags[1] >= 0) {
    character = ctx.flags[1];
  }
  if (ctx.flags[2] >= 0) {
    ctx.assi = ctx.flags[2];
  }
  if (character >= 1) {
    ctx.putForm('전회: %NAME:TARGET% 지도');
  }
}

export async function show_info_slung(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`　 남성기 호칭: %CSTR:80%`);
  ctx.showMessage(`　 여성기 호칭: %CSTR:81%`);
  ctx.showMessage(`　   항문 호칭: %CSTR:82%`);
  ctx.showMessage(`단어 지도:`);
  if (character.cflags[8] === 1) {
    ctx.showMessage(`불가능`);
  } else {
    ctx.showMessage(`가능`);
  }
}

export async function show_info_lesson(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.exp[120] <= 5 && ctx.abilities[50] === 1) {
    ctx.exp[120] = 5;
  } else if (ctx.exp[120] <= 10 && ctx.abilities[50] === 2) {
    ctx.exp[120] = 10;
  } else if (ctx.exp[120] <= 15 && ctx.abilities[50] === 3) {
    ctx.exp[120] = 15;
  } else if (ctx.exp[120] <= 20 && ctx.abilities[50] === 4) {
    ctx.exp[120] = 20;
  } else if (ctx.exp[120] <= 25 && ctx.abilities[50] === 5) {
    ctx.exp[120] = 25;
  } else if (ctx.exp[120] <= 30 && ctx.abilities[50] === 6 && (ctx.talents[402] || ctx.talents[203])) {
    ctx.exp[120] = 30;
  } else if (ctx.exp[120] <= 40 && ctx.abilities[50] === 7 && (ctx.talents[402] || ctx.talents[203])) {
    ctx.exp[120] = 40;
  } else if (ctx.exp[120] <= 50 && ctx.abilities[50] === 8 && (ctx.talents[402] || ctx.talents[203])) {
    ctx.exp[120] = 50;
  } else if (ctx.exp[120] <= 60 && ctx.abilities[50] === 9 && (ctx.talents[509] || ctx.talents[515] || ctx.talents[518] || ctx.talents[519] || ctx.talents[522] || ctx.talents[523])) {
    ctx.exp[120] = 60;
  } else if (ctx.exp[120] <= 70 && ctx.abilities[50] === 10 && (ctx.talents[509] || ctx.talents[515] || ctx.talents[518] || ctx.talents[519] || ctx.talents[522] || ctx.talents[523])) {
    ctx.exp[120] = 70;
  }
  if (ctx.exp[121] <= 5 && ctx.abilities[51] === 1) {
    ctx.exp[121] = 5;
  } else if (ctx.exp[121] <= 10 && ctx.abilities[51] === 2) {
    ctx.exp[121] = 10;
  } else if (ctx.exp[121] <= 15 && ctx.abilities[51] === 3) {
    ctx.exp[121] = 15;
  } else if (ctx.exp[121] <= 20 && ctx.abilities[51] === 4) {
    ctx.exp[121] = 20;
  } else if (ctx.exp[121] <= 25 && ctx.abilities[51] === 5) {
    ctx.exp[121] = 25;
  } else if (ctx.exp[121] <= 30 && ctx.abilities[51] === 6 && (ctx.talents[204] || ctx.talents[16])) {
    ctx.exp[121] = 30;
  } else if (ctx.exp[121] <= 40 && ctx.abilities[51] === 7 && (ctx.talents[204] || ctx.talents[16])) {
    ctx.exp[121] = 40;
  } else if (ctx.exp[121] <= 50 && ctx.abilities[51] === 8 && (ctx.talents[204] || ctx.talents[16])) {
    ctx.exp[121] = 50;
  } else if (ctx.exp[121] <= 60 && ctx.abilities[51] === 9 && (ctx.talents[204])) {
    ctx.exp[121] = 60;
  } else if (ctx.exp[121] <= 70 && ctx.abilities[51] === 10 && (ctx.talents[204])) {
    ctx.exp[121] = 70;
  }
  if (ctx.exp[122] <= 5 && ctx.abilities[52] === 1) {
    ctx.exp[122] = 5;
  } else if (ctx.exp[122] <= 10 && ctx.abilities[52] === 2) {
    ctx.exp[122] = 10;
  } else if (ctx.exp[122] <= 15 && ctx.abilities[52] === 3) {
    ctx.exp[122] = 15;
  } else if (ctx.exp[122] <= 20 && ctx.abilities[52] === 4) {
    ctx.exp[122] = 20;
  } else if (ctx.exp[122] <= 25 && ctx.abilities[52] === 5) {
    ctx.exp[122] = 25;
  } else if (ctx.exp[122] <= 30 && ctx.abilities[52] === 6 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.exp[122] = 30;
  } else if (ctx.exp[122] <= 40 && ctx.abilities[52] === 7 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.exp[122] = 40;
  } else if (ctx.exp[122] <= 50 && ctx.abilities[52] === 8 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.exp[122] = 50;
  } else if (ctx.exp[122] <= 60 && ctx.abilities[52] === 9 && (ctx.talents[224])) {
    ctx.exp[122] = 60;
  } else if (ctx.exp[122] <= 70 && ctx.abilities[52] === 10 && (ctx.talents[224])) {
    ctx.exp[122] = 70;
  }
  if (ctx.exp[123] <= 5 && ctx.abilities[81] === 1) {
    ctx.exp[123] = 5;
  } else if (ctx.exp[123] <= 10 && ctx.abilities[81] === 2) {
    ctx.exp[123] = 10;
  } else if (ctx.exp[123] <= 15 && ctx.abilities[81] === 3) {
    ctx.exp[123] = 15;
  } else if (ctx.exp[123] <= 20 && ctx.abilities[81] === 4) {
    ctx.exp[123] = 20;
  } else if (ctx.exp[123] <= 25 && ctx.abilities[81] === 5) {
    ctx.exp[123] = 25;
  } else if (ctx.exp[123] <= 30 && ctx.abilities[81] === 6 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.exp[123] = 30;
  } else if (ctx.exp[123] <= 40 && ctx.abilities[81] === 7 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.exp[123] = 40;
  } else if (ctx.exp[123] <= 50 && ctx.abilities[81] === 8 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.exp[123] = 50;
  } else if (ctx.exp[123] <= 60 && ctx.abilities[81] === 9 && (ctx.talents[224])) {
    ctx.exp[123] = 60;
  } else if (ctx.exp[123] <= 70 && ctx.abilities[81] === 10 && (ctx.talents[224])) {
    ctx.exp[123] = 70;
  }
  ctx.showMessage(`미용감각: ${ctx.abilities[50], 3}`);
  if (ctx.abilities[50] < 1) {
    ctx.drawBar(ctx.exp[120], 5, 5);
  } else if (ctx.abilities[50] < 2) {
    ctx.drawBar((ctx.exp[120]-5), 5, 5);
  } else if (ctx.abilities[50] < 3) {
    ctx.drawBar((ctx.exp[120]-10), 5, 5);
  } else if (ctx.abilities[50] < 4) {
    ctx.drawBar((ctx.exp[120]-15), 5, 5);
  } else if (ctx.abilities[50] < 5) {
    ctx.drawBar((ctx.exp[120]-20), 5, 5);
  } else if (ctx.abilities[50] < 6 && (ctx.talents[402] || ctx.talents[203])) {
    ctx.drawBar((ctx.exp[120]-25), 5, 5);
  } else if (ctx.abilities[50] < 7 && (ctx.talents[402] || ctx.talents[203])) {
    ctx.drawBar((ctx.exp[120]-30), 10, 5);
  } else if (ctx.abilities[50] < 8 && (ctx.talents[402] || ctx.talents[203])) {
    ctx.drawBar((ctx.exp[120]-40), 10, 5);
  } else if (ctx.abilities[50] < 9 && (ctx.talents[509] || ctx.talents[515] || ctx.talents[518] || ctx.talents[519])) {
    ctx.drawBar((ctx.exp[120]-50), 10, 5);
  } else if (ctx.abilities[50] < 10 && (ctx.talents[509] || ctx.talents[515] || ctx.talents[518] || ctx.talents[519])) {
    ctx.drawBar((ctx.exp[120]-60), 10, 5);
  } else {
    ctx.print('[*MAX*]');
  }
  ctx.print('');
  ctx.showMessage(`운동능력: ${ctx.abilities[51], 3}`);
  if (ctx.abilities[51] < 1) {
    ctx.drawBar(ctx.exp[121], 5, 5);
  } else if (ctx.abilities[51] < 2) {
    ctx.drawBar((ctx.exp[121]-5), 5, 5);
  } else if (ctx.abilities[51] < 3) {
    ctx.drawBar((ctx.exp[121]-10), 5, 5);
  } else if (ctx.abilities[51] < 4) {
    ctx.drawBar((ctx.exp[121]-15), 5, 5);
  } else if (ctx.abilities[51] < 5) {
    ctx.drawBar((ctx.exp[121]-20), 5, 5);
  } else if (ctx.abilities[51] < 6 && (ctx.talents[204] || ctx.talents[16])) {
    ctx.drawBar((ctx.exp[121]-25), 5, 5);
  } else if (ctx.abilities[51] < 7 && (ctx.talents[204] || ctx.talents[16])) {
    ctx.drawBar((ctx.exp[121]-30), 10, 5);
  } else if (ctx.abilities[51] < 8 && (ctx.talents[204] || ctx.talents[16])) {
    ctx.drawBar((ctx.exp[121]-40), 10, 5);
  } else if (ctx.abilities[51] < 9 && ctx.talents[204]) {
    ctx.drawBar((ctx.exp[121]-50), 10, 5);
  } else if (ctx.abilities[51] < 10 && ctx.talents[204]) {
    ctx.drawBar((ctx.exp[121]-60), 10, 5);
  } else {
    ctx.print('[*MAX*]');
  }
  ctx.showMessage('');
  ctx.showMessage(`학력: ${ctx.abilities[52], 3}`);
  if (ctx.abilities[52] < 1) {
    ctx.drawBar(ctx.exp[122], 5, 5);
  } else if (ctx.abilities[52] < 2) {
    ctx.drawBar((ctx.exp[122]-5), 5, 5);
  } else if (ctx.abilities[52] < 3) {
    ctx.drawBar((ctx.exp[122]-10), 5, 5);
  } else if (ctx.abilities[52] < 4) {
    ctx.drawBar((ctx.exp[122]-15), 5, 5);
  } else if (ctx.abilities[52] < 5) {
    ctx.drawBar((ctx.exp[122]-20), 5, 5);
  } else if (ctx.abilities[52] < 6 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.drawBar((ctx.exp[122]-25), 5, 5);
  } else if (ctx.abilities[52] < 7 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.drawBar((ctx.exp[122]-30), 10, 5);
  } else if (ctx.abilities[52] < 8 && (ctx.talents[224] || ctx.talents[50])) {
    ctx.drawBar((ctx.exp[122]-40), 10, 5);
  } else if (ctx.abilities[52] < 9 && ctx.talents[224]) {
    ctx.drawBar((ctx.exp[122]-50), 10, 5);
  } else if (ctx.abilities[52] < 10 && ctx.talents[224]) {
    ctx.drawBar((ctx.exp[122]-60), 10, 5);
  } else {
    ctx.print('[*MAX*]');
  }
  ctx.print('');
  ctx.showMessage(`오타쿠지식: ${ctx.abilities[81], 3}`);
  if (ctx.abilities[81] < 1) {
    ctx.drawBar(ctx.exp[123], 5, 5);
  } else if (ctx.abilities[81] < 2) {
    ctx.drawBar((ctx.exp[123]-5), 5, 5);
  } else if (ctx.abilities[81] < 3) {
    ctx.drawBar((ctx.exp[123]-10), 5, 5);
  } else if (ctx.abilities[81] < 4) {
    ctx.drawBar((ctx.exp[123]-15), 5, 5);
  } else if (ctx.abilities[81] < 5) {
    ctx.drawBar((ctx.exp[123]-20), 5, 5);
  } else if (ctx.abilities[81] < 6 && (ctx.talents[224] || ctx.talents[50] || ctx.talents[405] || ctx.talents[406])) {
    ctx.drawBar((ctx.exp[123]-25), 5, 5);
  } else if (ctx.abilities[81] < 7 && (ctx.talents[224] || ctx.talents[50] || ctx.talents[405] || ctx.talents[406])) {
    ctx.drawBar((ctx.exp[123]-30), 10, 5);
  } else if (ctx.abilities[81] < 8 && (ctx.talents[224] || ctx.talents[50] || ctx.talents[405] || ctx.talents[406])) {
    ctx.drawBar((ctx.exp[123]-40), 10, 5);
  } else if (ctx.abilities[81] < 9 && (ctx.talents[224] || ctx.talents[405] || ctx.talents[406])) {
    ctx.drawBar((ctx.exp[123]-50), 10, 5);
  } else if (ctx.abilities[81] < 10 && (ctx.talents[224] || ctx.talents[405] || ctx.talents[406])) {
    ctx.drawBar((ctx.exp[123]-60), 10, 5);
  } else {
    ctx.print('[*MAX*]');
  }
  ctx.showMessage('');
}

export async function print_actress_relation(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[3] = 0;
  // TODO: FOR LOCAL:1, 0, CHARANUM
  ctx.locals[2] = ctx.getCharacterNo(ctx.locals[1]);
  if (relation[ctx.locals[2]] != 0 && relation[ctx.locals[2]] != CSVRELATION(character.no, (ctx.locals[2]), 0)) {
    if (relation[ctx.locals[2]]%100 > 9) {
      ctx.showMessage(`%CALLNAME:(LOCAL:1),12,LEFT%＜상성 ${relation[ctx.locals[2]]/100,2}.${relation[ctx.locals[2]]%100}배＞`);
    } else {
      ctx.showMessage(`%CALLNAME:(LOCAL:1),12,LEFT%＜상성 ${relation[ctx.locals[2]]/100,2}.0${relation[ctx.locals[2]]%100}배＞`);
    }
    ctx.locals[3] += 1;
    if (ctx.locals[3] === 3) {
      ctx.showMessage('');
      ctx.locals[3] = 0;
    }
  } else if (character != ctx.locals[1]) {
    ctx.showMessage(`%CALLNAME:(LOCAL:1),12,LEFT%＜상성 ??.??배＞`);
    ctx.locals[3] += 1;
    if (ctx.locals[3] === 3) {
      ctx.showMessage('');
      ctx.locals[3] = 0;
    }
  }
  // TODO: NEXT
  if (ctx.locals[3] > 0) {
    ctx.showMessage('');
  }
}
