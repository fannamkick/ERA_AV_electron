/**
 * EGG_ITEM.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function egg_item(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "가")} 낳은 알이 깨지고, 그 안에는`);
  if (ctx.item[91] === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 91), "가")} 들어있었다`);
    ctx.item[91] = 1;
  } else {
    switch (ctx.rand(16)) {
      case 0:
        if (ctx.item[200] === 0) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 200), "가")} 들어있었다`);
          ctx.item[200] = 1;
        } else {
          await egg_item_use(ctx, character);
        }
        case 1:
          if (ctx.item[201] === 0) {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 201), "가")} 들어있었다`);
            ctx.item[201] = 1;
          } else {
            await egg_item_use(ctx, character);
          }
          case 2:
            if (ctx.item[202] === 0) {
              ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 202), "가")} 들어있었다`);
              ctx.item[202] = 1;
            } else {
              await egg_item_use(ctx, character);
            }
            case 3:
              if (ctx.item[203] === 0) {
                ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 203), "가")} 들어있었다`);
                ctx.item[203] = 1;
              } else {
                await egg_item_use(ctx, character);
              }
              case 4:
                if (ctx.item[204] === 0) {
                  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 204), "가")} 들어있었다`);
                  ctx.item[204] = 1;
                } else {
                  await egg_item_use(ctx, character);
                }
                case 5:
                  if (ctx.item[205] === 0) {
                    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 205), "가")} 들어있었다`);
                    ctx.item[205] = 1;
                  } else {
                    await egg_item_use(ctx, character);
                  }
                  case 6:
                    if (ctx.item[206] === 0) {
                      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 206), "가")} 들어있었다`);
                      ctx.item[206] = 1;
                    } else {
                      await egg_item_use(ctx, character);
                    }
                    case 7:
                      if (ctx.item[207] === 0) {
                        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 207), "가")} 들어있었다`);
                        ctx.item[207] = 1;
                      } else {
                        await egg_item_use(ctx, character);
                      }
                      case 8:
                        if (ctx.item[208] === 0) {
                          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 208), "가")} 들어있었다`);
                          ctx.item[208] = 1;
                        } else {
                          await egg_item_use(ctx, character);
                        }
                        case 9:
                          if (ctx.item[209] === 0) {
                            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 209), "가")} 들어있었다`);
                            ctx.item[209] = 1;
                          } else {
                            await egg_item_use(ctx, character);
                          }
                          case 10:
                            if (ctx.item[210] === 0) {
                              ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 210), "가")} 들어있었다`);
                              ctx.item[210] = 1;
                            } else {
                              await egg_item_use(ctx, character);
                            }
                            case 11:
                              if (ctx.item[211] === 0) {
                                ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 211), "가")} 들어있었다`);
                                ctx.item[211] = 1;
                              } else {
                                await egg_item_use(ctx, character);
                              }
                              case 12:
                                if (ctx.item[212] === 0) {
                                  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 212), "가")} 들어있었다`);
                                  ctx.item[212] = 1;
                                } else {
                                  await egg_item_use(ctx, character);
                                }
                                case 13:
                                  if (ctx.item[213] === 0) {
                                    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 213), "가")} 들어있었다`);
                                    ctx.item[213] = 1;
                                  } else {
                                    await egg_item_use(ctx, character);
                                  }
                                  case 14:
                                    if (ctx.item[214] === 0) {
                                      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 214), "가")} 들어있었다`);
                                      ctx.item[214] = 1;
                                    } else {
                                      await egg_item_use(ctx, character);
                                    }
                                    default:
                                      await egg_item_use(ctx, character);
                                    break;
                                  }
                                }
}

export async function egg_item_use(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  switch (ctx.rand(2)) {
    case 0:
      if (ctx.item[24] >= 99) {
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", 24), "가")} 들어있었다`);
        ctx.item[24] += 1;
      } else {
        ctx.showMessage(`작은 보석이 들어있었다`);
        ctx.money += 500;
      }
      default:
        ctx.showMessage(`작은 보석이 들어있었다`);
        ctx.money += 500;
      break;
    }
}
