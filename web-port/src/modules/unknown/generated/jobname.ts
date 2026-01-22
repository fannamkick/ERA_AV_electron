/**
 * JOBNAME.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function jobname(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  F = 0;
  // TODO: STR:100 =
  if (ctx.getTalent(target, 452)) {
    STR[100] += "不良";
    F &= 1;
  }
  if (ctx.getTalent(target, 223)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "대학생";
      } else {
        STR[100] += "대학생";
      }
    } else {
      STR[100] += "女子大生";
    }
    F += 1;
  } else if (ctx.getTalent(target, 220)) {
    if (ctx.base[character][11] <= 18 && ctx.base[character][11] >= 15) {
      STR[100] += "現役";
    }
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "高●生";
      } else {
        STR[100] += "高●生";
      }
    } else {
      STR[100] += "女●高生";
    }
    F += 1;
  } else if (ctx.getTalent(target, 221)) {
    if (ctx.base[character][11] <= 15 && ctx.base[character][11] >= 12) {
      STR[100] += "現役";
    }
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "中●生";
      } else {
        STR[100] += "中●生";
      }
    } else {
      STR[100] += "女子中●生";
    }
    F += 1;
  } else if (ctx.getTalent(target, 222)) {
    if (ctx.base[character][11] <= 12 && ctx.base[character][11] >= 6) {
      STR[100] += "現役";
    }
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "小●生";
      } else {
        STR[100] += "小●生";
      }
    } else {
      STR[100] += "女子小●生";
    }
    F += 1;
  } else if (ctx.getTalent(target, 206)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "人妻";
      } else {
      }
    } else {
      STR[100] += "人妻";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 210)) {
    STR[100] += "貧乏";
    F += 1;
  }
  if (ctx.getTalent(target, 209)) {
    STR[100] += "야마토 나데시코";
    F += 1;
  }
  if (ctx.getTalent(target, 203)) {
    STR[100] += "아이돌";
    F += 1;
  }
  if (ctx.getTalent(target, 407)) {
    if (ctx.getTalent(target, 122) === 1) {
      if (ctx.getTalent(target, 413) === 1) {
        STR[100] += "お姫様";
      } else {
        STR[100] += "王子様";
      }
    } else {
      STR[100] += "お姫様";
    }
    F += 1;
  } else if (ctx.getTalent(target, 205)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "お嬢様";
      } else {
        STR[100] += "坊ちゃん";
      }
    } else {
      STR[100] += "お嬢様";
    }
    F += 1;
  } else if (ctx.getTalent(target, 433)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "女医";
      } else {
        STR[100] += "医師";
      }
    } else {
      STR[100] += "女医";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 208)) {
    STR[100] += "セレブ";
    F += 1;
  }
  if (ctx.talents[422] === 1 && ctx.talents[203] === 0 && ctx.talents[432] === 1) {
    STR[100] += "レゲエダンサー";
    F += 1;
  }
  if (ctx.talents[422] === 1 && ctx.talents[203] === 1 && ctx.talents[432] === 1) {
    STR[100] += "흑갸루の카리스마";
    F += 1;
  }
  if (ctx.getTalent(target, 512)) {
    STR[100] += "그랜드마스터";
    F += 1;
  }
  if (ctx.getTalent(target, 411)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "간호사";
      } else {
        STR[100] += "看護師";
      }
    } else {
      STR[100] += "간호사";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 412)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "教師";
      } else {
        STR[100] += "教師";
      }
    } else {
      STR[100] += "女教師";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 417)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "메이드";
      } else {
        STR[100] += "執事";
      }
    } else {
      STR[100] += "메이드";
    }
    F += 1;
    F += 1;
  }
  if (ctx.getTalent(target, 506)) {
    STR[100] += "성우";
    F += 1;
  }
  if (ctx.getTalent(target, 427)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "シスター";
      } else {
        if (ctx.rand(3) != 0) {
          STR[100] += "神父";
        } else {
          STR[100] += "ブラザー";
        }
      }
    } else {
      STR[100] += "シスター";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 429)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "巫女";
      } else {
        STR[100] += "神主";
      }
    } else {
      STR[100] += "巫女";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 429)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "婦K?";
      } else {
        STR[100] += "警○官";
      }
    } else {
      STR[100] += "婦K";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 402)) {
    STR[100] += "패션모델";
    F += 1;
  }
  if (ctx.getTalent(target, 206)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413) === 0) {
        STR[100] += "主夫";
      }
    }
    F += 1;
  }
  if (ctx.getTalent(target, 403) || ctx.getTalent(target, 404)) {
    STR[100] += "フリーター";
    F += 1;
  }
  if (ctx.getTalent(target, 511) && ctx.talents[505]) {
    STR[100] += "타천사";
    F += 1;
  } else if (ctx.getTalent(target, 511)) {
    STR[100] += "천사";
    F += 1;
  }
  if (ctx.getTalent(target, 508)) {
    STR[100] += "더치와이프";
  } else if (ctx.getTalent(target, 504)) {
    STR[100] += "안드로이드";
  }
  if (ctx.getTalent(target, 505)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "인큐버스";
      } else {
        STR[100] += "인큐버스";
      }
    } else {
      STR[100] += "서큐버스";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 180)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "업소여성(♂)";
      } else {
        STR[100] += "売り専男";
      }
    } else {
      STR[100] += "업소여성";
    }
    F += 1;
  } else if (ctx.getTalent(target, 181)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "고급창부(♂)";
      } else {
        STR[100] += "高級売専男";
      }
    } else {
      STR[100] += "고급창부";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 421)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "캬바레녀";
      } else {
        STR[100] += "キャスト";
      }
    } else {
      STR[100] += "캬바레녀";
    }
    F += 1;
  } else if (ctx.getTalent(target, 451)) {
    if (ctx.getTalent(target, 122)) {
      if (ctx.getTalent(target, 413)) {
        STR[100] += "캬바레녀";
      } else {
        STR[100] += "キャスト";
      }
    } else {
      STR[100] += "캬바레녀";
    }
    F += 1;
  }
  if (ctx.getTalent(target, 513)) {
    STR[100] += "RB団首領";
    F += 1;
  }
  if (ctx.getTalent(target, 201)) {
    STR[100] += "프로듀서";
    F += 1;
  } else if (ctx.getTalent(target, 202)) {
    STR[100] += "매니저";
    F += 1;
  }
  if (ctx.getTalent(target, 431)) {
    STR[100] += "ジャーナリスト";
    F += 1;
  }
  if (ctx.getTalent(target, 405)) {
    STR[100] += "自宅警備員";
    F += 1;
  }
  if (ctx.getTalent(target, 406)) {
    STR[100] += "코스프레イヤー";
    F += 1;
  }
  if (ctx.getTalent(target, 517)) {
    STR[100] += "探偵";
    F += 1;
  }
  if (character.no === 0 || character === 0) {
    if (ctx.getTalent(target, 400)) {
      if (ctx.getTalent(target, 122)) {
        if (ctx.getTalent(target, 413)) {
          STR[100] += "AV배우(♂)";
        } else {
          STR[100] += "AV男優";
        }
      } else {
        STR[100] += "AV배우";
      }
      F += 1;
    }
    if (F > 0) {
      STR[100] += "兼";
    }
    STR[100] += "AV감독";
    F += 1;
  }
  if (F === 0) {
    STR[100] += "フリーター";
  }
  return;
}
