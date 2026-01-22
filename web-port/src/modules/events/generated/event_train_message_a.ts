/**
 * EVENT_TRAIN_MESSAGE_A.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function train_message_a(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[6] & 1)) {
    return 0;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (character.tflags[9] === 1) {
    if (SELECTCOM === 122) {
      if (character.tflags[10] >= 1) {
        ctx.showMessage('두 사람은 동시에 사정해, 서로의 페니스에 정액을 뿌렸다…');
      } else {
        ctx.showMessage(`뿜어져나온 정액이 ${ctx.getVarName("CALL", TARGET)}의 페니스를 더럽혔다…`);
      }
    } else {
      if (SELECTCOM == 33) {
        ctx.showMessage(`뿜어져나온 정액이 ${ctx.getVarName("CALL", TARGET)}의 몸을 더럽혔다…`);
      }
      if (SELECTCOM == 62) {
        ctx.showMessage('뿜어져나온 정액이 두 사람의 몸을 더럽혔다…');
      }
    }
  } else if (character.tflags[9] === 2) {
    if (SELECTCOM === 122) {
      if (character.tflags[10] >= 1) {
        ctx.showMessage('두 사람은 동시에 사정해, 서로의 페니스에 대량의 정액을 뿌렸다…');
      } else {
        ctx.showMessage(`뿜어져나온 대량의 정액이 ${ctx.getVarName("CALL", TARGET)}의 페니스를 질퍽질퍽하게 더럽혔다…`);
      }
    } else {
      if (SELECTCOM == 33) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸은 뿜어져나온 대량의 정액에 범벅이 되었다…`);
      }
      if (SELECTCOM == 62) {
        ctx.showMessage('두 사람의 몸은 뿜어져나온 대량의 정액에 범벅이 되었다…');
      }
    }
  }
  if (character.tflags[15] == 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 들러붙은 촉수가 끈적끈적한 체액을 뿜어냈다…`);
  }
  if (character.tflags[15] == 2) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 전신에 들러붙은 촉수가 일제히 끈적끈적한 체액을 뿜어냈다…`);
  }
  if (character.tflags[16] > 0) {
    if (SELECTCOM === 21 || SELECTCOM === 34) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질내에, 짐승의 악취가 나는 뜨거운 정액이 뿜어져나왔다…`);
    } else if (SELECTCOM === 27) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 직장에, 짐승의 악취가 나는 뜨거운 정액이 뿜어져나왔다…`);
    } else if (SELECTCOM === 31) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 입속에, 짐승의 악취가 나는 뜨거운 정액이 뿜어져나왔다…`);
    } else if (SELECTCOM === 30) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 손바닥에, 짐승의 악취가 나는 뜨거운 정액이 뿜어져나왔다…`);
    }
  }
  if (character.tflags[7] > 0) {
    if (character.tflags[7] == 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 눈앞에서, ${ctx.getVarName("CALL", ASSI)}의 안쪽에 정액을 쏟아부었다…`);
    }
    if (character.tflags[7] == 2) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 눈앞에서, ${ctx.getVarName("CALL", ASSI)}의 안쪽에 흘러넘칠 정도로 정액을 쏟아부었다…`);
    }
    if (ctx.abilities[11] > 3 || ctx.abilities[32] > 2 && character.tflags[899] <= 1) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 그 모습을 부러운듯이 바라보고 있다…`);
    }
  }
  if (character.tflags[0] > 0 && character.tflags[29] > 0) {
    if (SELECTCOM === 32) {
      if (ctx.rand(3) === 0) {
        ctx.showMessage(`양 가슴에 눌려서 감싸이는 압박감에`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(`――`);
        if (ctx.talents[76]) {
          ctx.showMessage(`요염하게`);
        }
        if (ctx.talents[114]) {
          ctx.showMessage(`흘러넘칠 것만같은 유방을`);
        } else if (ctx.talents[110]) {
          ctx.showMessage(`풍만한 유방을`);
        } else if (ctx.talents[109]) {
          ctx.showMessage(`조금 부족한 느낌이 드는 유방을`);
        } else if (ctx.talents[116]) {
          ctx.showMessage(`납짝한 가슴을`);
        } else {
          ctx.showMessage(`부드러운 유방을`);
        }
        if (ctx.talents[85]) {
          ctx.showMessage(`사랑스럽게`);
        }
        ctx.showMessage(`문질러오는`);
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게`);
      } else {
        ctx.showMessage(`음경이 ${ctx.getVarName("CALL", TARGET)}의`);
        if (ctx.talents[114]) {
          ctx.showMessage(`흘러넘칠 듯한 유방에`);
        } else if (ctx.talents[110]) {
          ctx.showMessage(`포근한 가슴에`);
        } else if (ctx.talents[109]) {
          ctx.showMessage(`살짝 부풀어오른 유방에`);
        } else if (ctx.talents[116]) {
          ctx.showMessage(`부드러운 가슴의 피부에`);
        } else {
          ctx.showMessage(`모양 좋은 유방에`);
        }
        if (ctx.talents[110] || ctx.talents[114]) {
          ctx.showMessage(`파묻히는 감촉에`);
        } else {
          ctx.showMessage(`쓸어올려지는 감촉에`);
        }
      }
    } else {
      if (ctx.rand(4) === 0) {
        ctx.print('달라붙어오는 입안 점막의 자극에');
      } else if (ctx.rand(3) === 0) {
        ctx.print('뒤에서부터 귀두를 기어다니는 혀의 감각에');
      } else if (ctx.rand(2) === 0) {
        ctx.print('음경을');
        if (ctx.talents[76]) {
          ctx.print('음란하게');
        }
        if (ctx.talents[85]) {
          ctx.print('관능적으로');
        }
        ctx.print('훑는 목구멍의 쾌감에');
      } else if (ctx.rand(2) === 0) {
        ctx.print('귀두 뒷쪽을 문질러올리는 입술의 부드러움에');
      } else {
        ctx.print('요도를 핥는 혀끝의 움직임에');
      }
    }
    if (SELECTCOM === 68 || SELECTCOM === 71) {
      if (ctx.rand(4) === 0) {
        ctx.showMessage(`W , ${ctx.josaHelper("플레이어가")} 넘쳐오는 정액을 털어놓자`);
      } else if (ctx.rand(3) === 0) {
        ctx.showMessage(`W  자극을 받아, ${ctx.josaHelper("플레이어는")} 사정을 막을 수가 없었다.`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(` 짜내어진 ${ctx.getVarName("CALL", MASTER)}의 정액이`);
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}들의 몸을 더럽혀갔다.`);
        ctx.showMessage(`그것이 방아쇠가 되었는지`);
      } else {
        ctx.showMessage(`W  격렬하게 욕정해, ${ctx.josaHelper("플레이어는")} 두사람의 상기된 얼굴을 향해 사정을 했다.`);
        ctx.showMessage(`그리고`);
      }
    } else if (SELECTCOM === 6) {
      if (character.tflags[6]) {
        ctx.showMessage(`W , ${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("플레이어가")} 넘쳐오는 정액을 털어놓자마자,`);
      } else {
        ctx.showMessage(`W , ${ctx.josaHelper("플레이어가")} 넘쳐오는 정액을 털어놓자`);
      }
    } else {
      if (ctx.rand(4) === 0) {
        ctx.showMessage(`W , ${ctx.josaHelper("플레이어가")} 넘쳐오는 정액을 털어놓자`);
      } else if (ctx.rand(3) === 0) {
        ctx.showMessage(`W  자극을 받아, ${ctx.josaHelper("플레이어는")} 사정을 막을 수가 없었다.`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(` 짜내어진 ${ctx.getVarName("CALL", PLAYER)}의 정액이`);
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 몸을 더럽혀갔다.`);
        ctx.showMessage(`그것이 방아쇠가 되었는지`);
      } else {
        ctx.showMessage(`W 격렬하게 욕정해, ${ctx.josaHelper("플레이어는")} 그 상기된 얼굴을 향해 사정했다.`);
        ctx.showMessage(`그리고`);
      }
    }
  }
  if (character.tflags[0] === 1) {
    if (SELECTCOM === 31) {
      if (ctx.abilities[16] >= 3) {
        if (ctx.rand(6) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 꿀꺽하고 정액을 들이마셨다…`);
        } else if (ctx.rand(5) === 0) {
          ctx.showMessage(`정액을 입으로 받아들이고, ${ctx.josaHelper("타겟은")} 맛을 보듯이 천천히 삼켰다…`);
        } else if (ctx.rand(4) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 목구멍에 흘러들어가는 하얗고 탁한 액체의 감각에 아랫배를 뜨겁게 달구었다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`음경을 맛있게 훑고있는 ${ctx.getVarName("CALL", TARGET)}의 목구멍에, ${ctx.getVarName("CALL", PLAYER)}의 정액이 얽혀들어갔다…`);
        } else if (ctx.rand(2)) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 입안에 튀어들어오는 정액을 뱃속에 넣으려는 듯이 혀를 움직이고 있다…`);
        } else {
          ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 뺨을 오무리고, 가만히 정액의 분출을 받아들였다…`);
          ctx.showMessage(`W 그리고 맥동이 사라지자, 조용히 입에 모은 정액을 음경에 바르기 시작해`);
          ctx.showMessage(`다시 촉촉한 입술로 뒤덮어갔다…`);
        }
      } else {
        if (ctx.rand(4) === 0) {
          ctx.showMessage(`정액을 ${ctx.getVarName("CALL", TARGET)}의 입안에 흘려넣었다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 기세 좋게 뿜어나온 정액에 숨이 막힐 것만 같아서, 삼키지 않을 수가 없게되었다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`맥박치는 음경은, 사정후에도 ${ctx.getVarName("CALL", TARGET)}의 입안에 머물러서, 정액을 토해내는 것을 허락하지 않았다…`);
        } else {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 입안에 흘러들어온 정액을 삼키지 못하고, 괴로운 듯이 게워내고 있다…`);
        }
      }
    } else if (SELECTCOM === 32) {
      if (ctx.talents[110] || ctx.talents[114]) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴 골짜기에 정액이 고여 있다…`);
      } else {
        if (ctx.rand(3) === 0 && ctx.talents[116] === 0) {
          ctx.showMessage(`미끄덩한 정액이 두 가슴에서 번들거리고 있다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴에 하얀 줄무늬가 흘려내려갔다…`);
        } else {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴팍부터 얼굴까지 정액에 흩뿌려졌다…`);
        }
      }
    } else if (SELECTCOM === 68) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")} 정액을 입으로 받아들이고 있다…`);
    } else if (SELECTCOM === 69) {
      if (ctx.rand(4) === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 비부의 자극에 몸을 떨면서 정액을 삼키고 있다…`);
      } else if (ctx.rand(3) === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 혀가 가져오는 쾌감에 희롱당하면서도, ${ctx.josaHelper("타겟은")} 탐욕스럽게 정액을 삼키려하고 있다…`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 무심코 혀끝을 쉬는 틈을 타, ${ctx.josaHelper("타겟은")} 음경을 잡고 빨면서 정액을 짜내었다.`);
      } else {
        if (character.tflags[29] > 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 절정에 맞춰서, ${ctx.getVarName("CALL", PLAYER)}도 사정을 했다.`);
        } else {
          ctx.showMessage(`두사람은 상대를 보내려고 애를 썼지만, ${ctx.getVarName("CALL", PLAYER)} 쪽이 먼저 절정에 도달하고말았다.`);
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 만족스러운 얼굴 위를, 정액이 실을 늘어뜨리면서 흘러떨어졌다.`);
        }
      }
    } else if (SELECTCOM === 80 || SELECTCOM === 124) {
      if (ctx.abilities[16] >= 3) {
        if (ctx.rand(5) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 꿀꺽하고 정액을 들이마셨다…`);
        } else if (ctx.rand(4) === 0) {
          ctx.showMessage(`정액을 입으로 받아들이고, ${ctx.josaHelper("타겟은")} 맛을 보듯이 천천히 삼켰다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 목구멍에 흘러들어가는 하얗고 탁한 액체의 감각에 아랫배를 뜨겁게 달구었다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`음경을 맛있게 훑고있는 ${ctx.getVarName("CALL", TARGET)}의 목구멍에, ${ctx.getVarName("CALL", PLAYER)}의 정액이 얽혀들어갔다…`);
        } else {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 입안에 튀어들어오는 정액을 뱃속에 넣으려는 듯이 혀를 움직이고 있다…`);
        }
      } else {
        if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 머리를 잡고, 목 안쪽에 정액을 방출했다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`머리를 붙잡힌 ${ctx.josaHelper("타겟은")}, 흘러들어오는 정액을 토해내지도 못하고 강제로 정액을 마셨다…`);
        } else {
          ctx.showMessage(`구토하는 ${ctx.josaHelper("타겟을")} 아랑곳하지 않고 찔러넣어진 음경이, 목구멍에서 튀어오르듯이 맥박치고 있다…`);
        }
      }
    } else if (SELECTCOM === 123) {
      if (ctx.talents[109]) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 페니스를 가슴에 문지르는 ${ctx.getVarName("CALL", TARGET)}의 입 안에다 정액을 들이부었다…`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 페니스를 가슴 사이에 끼운 ${ctx.getVarName("CALL", TARGET)}의 입 안에다 정액을 들이부었다…`);
      }
    } else if (SELECTCOM === 126) {
      if (ctx.abilities[16] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 꿀꺽하고 정액을 들이마셨다…`);
      } else {
        ctx.showMessage(`정액을 ${ctx.getVarName("CALL", TARGET)}의 입 안에다 흘려넣었다…`);
      }
      if (ctx.abilities[32] >= 3 && ctx.getTalent(player, 122)) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 구슬을 어루만지며, 막대를 짜내듯 정액을 들이마시고 있다`);
      }
      if (ctx.abilities[32] >= 3 && ctx.getTalent(player, 121)) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 막대를 짜내듯 정액을 들이마시고 있다`);
      }
    } else if (SELECTCOM === 127) {
      if (ctx.abilities[16] >= 3) {
        ctx.showMessage(`페니스에 음란하게 달라붙는 ${ctx.getVarName("CALL", TARGET)}의 입 속에 정액을 뿜어냈다…`);
      } else {
        ctx.showMessage(`페니스에 달라붙는 ${ctx.getVarName("CALL", TARGET)}의 입 속에 정액을 뿜어냈다…`);
      }
      if (ctx.abilities[32] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 황홀해하는 표정으로 페니스와 정액을 삼키고 있다…`);
      }
    }
  } else if (character.tflags[0] === 2) {
    if (SELECTCOM === 31) {
      if (ctx.abilities[16] >= 3) {
        if (ctx.rand(9) === 0) {
          ctx.showMessage(`채 삼키지 못한 정액이 ${ctx.getVarName("CALL", TARGET)}의 입에서 흘러나왔다`);
        } else if (ctx.rand(8) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 입에서 흘러서 떨어뜨릴뻔한 정액을, 필사적으로 막고 전부 마시고 있다…`);
        } else if (ctx.rand(7) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 숨이 막힐 정도로 많은 정액의 양에 놀라면서도, 더욱 목을 울리며 전부 삼켰다…`);
        } else if (ctx.rand(6) === 0) {
          ctx.showMessage(`목구멍을 침입해 들어오는 엄청난 정액의 흐름에, ${ctx.josaHelper("타겟은")} 몸을 뜨겁게 흥분시켜갔다…`);
        } else if (ctx.rand(5) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 목구멍에서 튀어나올 정도의 정액에 목이 메여, 더러워진 턱을 닦고 다시 입을 맞추었다…`);
        } else if (ctx.rand(4) === 0) {
          ctx.showMessage(`페니스 그자체를 삼켜버릴 듯한 기세로 꿈틀대는 ${ctx.getVarName("CALL", TARGET)}의 목구멍은`);
          ctx.showMessage(`끝없이 토해내지는 정액을 요염하게 받아들였다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 혀위에 내뿜어져나오는 하얗고 탁한 액체를, 열심히 위장에 받아들이듯이 계속 봉사했다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 목에 삽입된 ${ctx.getVarName("CALL", PLAYER)}의 음경은,`);
          ctx.showMessage(`다량의 정액으로 채워진 목구멍으로 계속 애무를 받고 있다…`);
        } else {
          ctx.showMessage(`대량의 정액을 간신히 입안에 받아들이고, ${ctx.josaHelper("타겟은")} 맛보듯이 천천히 삼켰다…`);
        }
      } else {
        if (ctx.rand(2) === 0) {
          ctx.showMessage(`흘러넘칠 정도로 많은 정액이 ${ctx.getVarName("CALL", TARGET)}의 목구멍을 두들겼다…`);
        } else {
          ctx.showMessage(`방출된 대량의 정액이, 맥박치는 음경과 함께 ${ctx.getVarName("CALL", TARGET)}의 목을 점령하였다…`);
        }
      }
    } else if (SELECTCOM === 32) {
      if (ctx.rand(3) === 0 && ctx.talents[116] === 0) {
        ctx.showMessage(`미끄덩한 정액이 두 가슴에서 번들거리고 있다…`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(`튀어나온 정액이 ${ctx.getVarName("CALL", TARGET)}의 얼굴에서 가슴팍까지 뒤덮고 있다…`);
      } else {
        ctx.showMessage(`정액이 ${ctx.getVarName("CALL", TARGET)}의 가슴을 하얗게 물들였다…`);
      }
    } else if (SELECTCOM === 68) {
      ctx.showMessage(`대량의 정액이 ${ctx.josaHelper("타겟과")} ${ctx.getVarName("CALL", ASSI)}의 얼굴에 쏟아졌다…`);
    } else if (SELECTCOM === 69) {
      if (ctx.rand(4) === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 비부의 자극에 몸을 떨면서 정액을 삼키고 있다…`);
      } else if (ctx.rand(3) === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 혀가 가져오는 쾌감에 희롱당하면서도, ${ctx.josaHelper("타겟은")} 탐욕스럽게 정액을 삼키려하고 있다…`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(`${ctx.josaHelper("플레이어가")} 무심코 혀끝을 쉬는 틈을 타, ${ctx.josaHelper("타겟은")} 음경을 잡고 빨면서, 정액을 짜내었다.`);
      } else {
        if (character.tflags[29] > 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 절정에 맞춰서, ${ctx.getVarName("CALL", PLAYER)}도 사정을 했다.`);
        } else {
          ctx.showMessage(`두사람은 상대를 보내려고 애를 썼지만, ${ctx.getVarName("CALL", PLAYER)} 쪽이 먼저 절정에 도달하고말았다.`);
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 만족스러운 얼굴 위를, 정액이 실을 늘어뜨리면서 흘러떨어졌다.`);
        }
      }
    } else if (SELECTCOM === 80 || SELECTCOM === 124) {
      if (ctx.abilities[16] >= 3) {
        if (ctx.rand(9) === 0) {
          ctx.showMessage(`채 삼키지 못한 정액이 ${ctx.getVarName("CALL", TARGET)}의 입에서 흘러나왔다`);
        } else if (ctx.rand(8) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 입에서 흘러서 떨어뜨릴뻔한 정액을, 필사적으로 막고 전부 마시고 있다…`);
        } else if (ctx.rand(7) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 숨이 막힐 정도로 많은 정액의 양에 놀라면서도, 더욱 목을 울리며 전부 삼켰다…`);
        } else if (ctx.rand(6) === 0) {
          ctx.showMessage(`목구멍을 침입해 들어오는 엄청난 정액의 흐름에, ${ctx.josaHelper("타겟은")} 몸을 뜨겁게 흥분시켜갔다…`);
        } else if (ctx.rand(5) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 목구멍에서 튀어나올 정도의 정액에 목이 메여, 더러워진 턱을 닦고 다시 입을 맞추었다…`);
        } else if (ctx.rand(4) === 0) {
          ctx.showMessage(`페니스 그자체를 삼켜버릴 듯한 기세로 꿈틀대는 ${ctx.getVarName("CALL", TARGET)}의 목구멍은`);
          ctx.showMessage(`끝없이 토해내지는 정액을 요염하게 받아들였다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 혀위에 내뿜어져나오는 하얗고 탁한 액체를, 열심히 위장에 받아들이듯이 계속 봉사했다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 목에 삽입된 ${ctx.getVarName("CALL", PLAYER)}의 음경은,`);
          ctx.showMessage(`다량의 정액으로 채워진 목구멍으로 계속 애무를 받고 있다…`);
        } else {
          ctx.showMessage(`대량의 정액을 간신히 입안에 받아들이고, ${ctx.josaHelper("타겟은")} 맛보듯이 천천히 삼켰다…`);
        }
      } else {
        if (ctx.rand(2) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 목안에 방출된 정액이, 입에서 흘러넘쳐나왔다…`);
        } else {
          ctx.showMessage(`맥박치는 ${ctx.getVarName("CALL", PLAYER)}의 음경이, 자신에게서 뿜어져나온 대량의 정액과 함께`);
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 목구멍을 자극하고 있다…`);
        }
      }
    } else if (SELECTCOM === 123) {
      if (ctx.talents[109]) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 페니스를 가슴에 문지르는 ${ctx.getVarName("CALL", TARGET)}의 입 안에다 정액을 들이부었다…`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 페니스를 가슴 사이에 끼운 ${ctx.getVarName("CALL", TARGET)}의 입 안에다 정액을 들이부었다…`);
      }
      ctx.showMessage('입에서 흘러넘친 정액이 페니스와 가슴을 하얗게 더럽혀갔다…');
    } else if (SELECTCOM === 126) {
      if (ctx.abilities[16] >= 3) {
        ctx.showMessage(`마시지 못한 정액이 ${ctx.getVarName("CALL", TARGET)}의 입에서 흘러나왔다…`);
      } else {
        ctx.showMessage(`흘러넘칠 정도의 정액이 ${ctx.getVarName("CALL", TARGET)}의 목을 두들겼다…`);
      }
      if (ctx.abilities[32] >= 3 && ctx.getTalent(player, 122)) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 넘치는 정액으로 입 주위가 질척질척하게 된 채로 구슬을 어루만지며, 막대를 짜내듯 정액을 들이마시고 있다`);
      }
      if (ctx.abilities[32] >= 3 && ctx.getTalent(player, 121)) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 넘치는 정액으로 입 주위가 질척질척하게 된 채로 막대를 짜내듯 정액을 들이마시고 있다`);
      }
    } else if (SELECTCOM === 127) {
      if (ctx.abilities[16] >= 3) {
        ctx.showMessage(`페니스에 음란하게 달라붙는 ${ctx.getVarName("CALL", TARGET)}의 입 속에 대량의 정액을 뿜어냈다…`);
      } else {
        ctx.showMessage(`페니스에 달라붙는 ${ctx.getVarName("CALL", TARGET)}의 입 속에 대량의 정액을 뿜어냈다…`);
      }
      if (ctx.abilities[32] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 정액을 입에서 흘리면서, 황홀해하는 표정으로 페니스와 정액을 들이삼키고 있다…`);
      }
    }
  } else if (character.tflags[1] === 1 && ctx.abilities[20] <= 2) {
    if (ctx.exp[20] == 0 && character.tflags[899] <= 1) {
      ctx.print('놀란 표정을 짓는');
    }
    if (ctx.abilities[32] > 2 && character.tflags[899] <= 1) {
      ctx.print('황홀해하는 표정을 짓는');
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 정액이 흩뿌려졌다…`);
  } else if (character.tflags[1] === 1 && ctx.abilities[20] >= 3) {
    if (character.equipment[55]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴에 앉아 ${ctx.getVarName("CALL", PLAYER)}의 페니스를 문지르는`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 0) {
      ctx.showMessage(`의 멸시의 시선`);
    }
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 1) {
      ctx.showMessage(`의 동정섞인 멸시의 시선`);
    }
    ctx.showMessage(`을 받으며`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 손에 욕망을 분출했다…`);
    if (ctx.talents[83]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 손에 묻은 정액을 ${ctx.getVarName("CALL", PLAYER)}의 육봉에 바르고`);
      ctx.showMessage(`아직 민감한 귀두를 집요하게 괴롭히고 있다`);
    }
  } else if (character.tflags[1] === 3 && ctx.abilities[20] >= 3) {
    if (character.equipment[55]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴에 앉아 ${ctx.getVarName("CALL", PLAYER)}의 페니스를 문지르는`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 0) {
      ctx.showMessage(`의 멸시의 시선`);
    }
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 1) {
      ctx.showMessage(`의 동정섞인 멸시의 시선`);
    }
    ctx.showMessage(`을 받으며`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 오나홀에 욕망을 분출했다…`);
    if (ctx.talents[83]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 방금 사정한 ${ctx.getVarName("CALL", PLAYER)}의 육봉을`);
      ctx.showMessage(`오나홀로 집요하게 괴롭히고 있다`);
    }
  } else if (character.tflags[1] === 2 && ctx.abilities[20] <= 2) {
    if (ctx.exp[20] == 0 && character.tflags[899] <= 1) {
      ctx.print('놀란 표정을 짓는');
    }
    if (ctx.abilities[32] > 2 && character.tflags[899] <= 1) {
      ctx.print('황홀해하는 표정을 짓는');
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 얼굴과 손에 대량의 정액이 흩뿌려졌다…`);
  } else if (character.tflags[1] === 2 && ctx.abilities[20] >= 3) {
    if (character.equipment[55]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴에 앉아 ${ctx.getVarName("CALL", PLAYER)}의 페니스를 문지르는`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 0) {
      ctx.showMessage(`의 멸시의 시선`);
    }
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 1) {
      ctx.showMessage(`의 동정섞인 멸시의 시선`);
    }
    ctx.showMessage(`을 받으며`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 손에 대량의 정액을 분출했다…`);
    if (ctx.talents[83]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 손에 묻은 정액을 ${ctx.getVarName("CALL", PLAYER)}의 육봉에 바르고`);
      ctx.showMessage(`찰박찰박 음란한 소리를 내며, 아직 민감한 귀두를 집요하게 괴롭히고 있다`);
    }
  } else if (character.tflags[1] === 4 && ctx.abilities[20] >= 3) {
    if (character.equipment[55]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 얼굴에 앉아 ${ctx.getVarName("CALL", PLAYER)}의 페니스를 문지르는`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 0) {
      ctx.showMessage(`의 멸시의 시선`);
    }
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 1) {
      ctx.showMessage(`의 동정섞인 멸시의 시선`);
    }
    ctx.showMessage(`을 받으며`);
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 오나홀에 넘쳐날 정도로 대량의 정액을 분출했다…`);
    if (ctx.talents[83]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 방금 사정한 ${ctx.getVarName("CALL", PLAYER)}의 육봉을`);
      ctx.showMessage(`찰박찰박 음란한 소리를 내며, 오나홀로 집요하게 괴롭히고 있다`);
    }
  } else if (character.tflags[18] === 1) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 0) {
      ctx.showMessage(`의 멸시의 시선을 받으며,`);
    }
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 1) {
      ctx.showMessage(`의 동정섞인 멸시의 시선을 받으며,`);
    }
    ctx.showMessage(`그 발에 뜨거운 정액을 뿌렸다…`);
  } else if (character.tflags[18] === 2) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 0) {
      ctx.showMessage(`의 멸시의 시선을 받으며,`);
    }
    if ((ctx.talents[83] || ctx.abilities[20] > 2) && ctx.talents[85] == 1) {
      ctx.showMessage(`의 동정섞인 멸시의 시선을 받으며,`);
    }
    ctx.showMessage(`그 발에 대량의 뜨거운 정액을 뿌렸다…`);
  } else if (character.tflags[102]  === 1) {
    if (ctx.talents[128]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 엉덩이 사이에 정액이 고여있다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 국부에 정액이 튀었다…`);
    }
  } else if (character.tflags[102]  === 2) {
    if (ctx.talents[128]) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 엉덩이 계곡에 대량의 정액이 고여있다…`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 국부에 대량의 정액이 튀었다…`);
    }
  } else if (SELECTCOM === 55 && character.tflags[899] <= 1) {
    if (ctx.params[5] >= PALAMLV[3]) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 숨을 헐떡거리`);
    }
    if (ctx.params[5] >= PALAMLV[5]) {
      ctx.print('며, 뜨거운 시선으로 이쪽을 바라보');
    }
    if (ctx.params[5] >= PALAMLV[3] && character.equipment[21]) {
      ctx.print('고, 바들바들 떨리는 몸을 끌어안');
    }
    if (ctx.params[5] >= PALAMLV[4] && character.equipment[21]) {
      ctx.print('으');
    }
    if (ctx.params[5] >= PALAMLV[4]) {
      ctx.print('면서, 자꾸만 허벅지를 문지르');
    }
    if (ctx.params[5] >= PALAMLV[3]) {
      ctx.showMessage('고 있다…');
    }
  }
  if (character.tflags[29] > 0 && character.tflags[899] <= 1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (character.tflags[11] == 1) {
      ctx.print('가슴 끝에서 모유를 늘어뜨리며');
    }
    if (character.tflags[11] == 2) {
      ctx.print('가슴 끝에서 향기를 낼 정도로 대량의 모유를 뿜어내며');
    }
    if (character.tflags[29] >= 5 && character.tflags[29] <= 8 && ctx.talents[121] == 0 && ctx.talents[122] == 0) {
      ctx.print('음순에서 투명한 애액을 뿜어내며');
    }
    if (character.tflags[29] >= 9 && ctx.talents[121] == 0 && ctx.talents[122] == 0) {
      ctx.print('음순에서 백탁액 섞인 애액을 뿜어내며');
    }
    if (character.tflags[10] == 1) {
      ctx.print('페니스에서 정액을 뿜어내며');
    }
    if (character.tflags[10] == 2) {
      ctx.print('맥동하는 페니스에서 대량의 정액을 흩뿌리며');
    }
    if ((character.tflags[29] < 5 || ctx.talents[121] || ctx.talents[122]) && character.tflags[10] == 0 && character.tflags[11] == 0) {
      ctx.print('등을 크게 젖히며');
    }
    if (character.tflags[29] < 12) {
      ctx.showMessage('온몸을 떨며 절정에 도달했다');
    } else {
      ctx.showMessage('쾌락에 녹아버린 얼굴로 절정에 도달했다');
    }
  }
  if (character.tflags[2] > 0) {
    ctx.showMessage('');
    if (character.cflags[33] != 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의 비렬에서 사정 직전의`);
      if (character.tflags[31]) {
        ctx.showMessage(`처녀혈이 붙은`);
      }
      ctx.showMessage(`페니스를 뽑아`);
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
      if (character.cflags[33] === 1) {
        ctx.showMessage(`의`);
        if (ctx.flags[36]) {
          if (character.cflags[6] > 6) {
            ctx.showMessage(`음모가 자란`);
          } else if (character.cflags[6] <= 6 && ctx.talents[125] === 0) {
            ctx.showMessage(`맨들맨들하게 깎은`);
          } else {
            ctx.showMessage(`털이 없는`);
          }
        }
        ctx.showMessage(`치구`);
      } else if (character.cflags[33] === 2) {
        ctx.showMessage(`의`);
        if (character.cflags[173]) {
          if (character.cflags[170] >= 5) {
            await print_shoestype_main(ctx, character);
            ctx.showMessage(`%조사만처리(RESULT+2,"를")% 신은`);
          }
        }
        ctx.showMessage(`허벅지`);
      } else if (character.cflags[33] === 3) {
        ctx.showMessage(`의`);
        if ((character.cflags[7] & 2)) {
          ctx.showMessage(`피어스가 달린`);
        }
        ctx.showMessage(`배꼽`);
      } else if (character.cflags[33] === 4) {
        ctx.showMessage(`의`);
        if ((character.cflags[7] & 1)) {
          ctx.showMessage(`유두에 피어스를 단`);
        }
        if (ctx.talents[109]) {
          ctx.showMessage(`소극적인`);
        } else if (ctx.talents[110]) {
          ctx.showMessage(`큰`);
        } else if (ctx.talents[114]) {
          ctx.showMessage(`풍만한`);
        } else if (ctx.talents[116]) {
          ctx.showMessage(`빨래판 같은`);
        } else {
          ctx.showMessage(`예쁜`);
        }
        ctx.showMessage(`가슴`);
      } else if (character.cflags[33] === 5) {
        ctx.showMessage(`의`);
        if (ctx.abilities[16] >= 3) {
          ctx.showMessage(`입에 가져가니 ${ctx.josaHelper("타겟은")}`);
          ctx.showMessage(`페니스를 물고 입으로 봉사했다……`);
          ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}의`);
          if (ctx.abilities[12] >= 3) {
            ctx.showMessage(`훌륭한`);
          } else {
            ctx.showMessage(`서투르지만 헌신적인`);
          }
          ctx.showMessage(`혀놀림에 신음하며, 그`);
        }
        ctx.showMessage(`입`);
      } else if (character.cflags[33] === 6) {
        ctx.showMessage(`의 얼굴`);
      } else if (character.cflags[33] === 7) {
        ctx.showMessage(`의`);
        if (character.cflags[600] != 9 && character.cflags[601] != 1) {
          await print_haircolor_tailor(ctx, character);
        }
        if (character.cflags[600] === 9 && character.cflags[601] === 1) {
          ctx.print('탈색한');
        } else {
          ctx.print('색');
        }
        ctx.showMessage(`머리`);
      } else if (character.cflags[33] === 8) {
        if (character.cflags[42] === 80) {
          ctx.print('안경');
        } else if (character.cflags[42] === 81) {
          ctx.print('선글라스');
        }
      }
      ctx.showMessage(`에`);
      if (character.tflags[2] == 2) {
        ctx.showMessage(`대량의`);
      }
      ctx.showMessage(`정액을 뿜었다……`);
    } else if (character.cflags[33] === 0 && (ctx.params[5] < PALAMLV[4] || character.tflags[31])) {
      if (SELECTCOM === 20 || SELECTCOM === 22) {
        ctx.print('페니스를 뽑아낸 비열에서는');
        if (character.tflags[31]) {
          ctx.print('처녀혈이 섞인');
        }
        ctx.showMessage('정액이 흘러나왔다…');
      } else if (SELECTCOM === 21 || SELECTCOM === 23) {
        ctx.print('페니스를 뽑아낸 비열에서는');
        if (character.tflags[31]) {
          ctx.print('처녀혈이 섞인');
        }
        ctx.showMessage('정액이 늘어진 채 똑똑 떨어졌다…');
      } else if (SELECTCOM === 26 || SELECTCOM === 27 || SELECTCOM === 28 || SELECTCOM === 29 || SELECTCOM === 36) {
        ctx.showMessage('애널에서 흘러나오는, 장액이 섞인 정액이 엉덩이 굴곡을 따라 떨어져 내리고 있다…');
      } else if (SELECTCOM === 34) {
        ctx.print('페니스를 뽑아내자');
        if (character.tflags[31]) {
          ctx.print('처녀혈이 섞인');
        }
        ctx.showMessage('정액이 흘러나왔다…');
      } else if (SELECTCOM === 91) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 자궁에 뜨거운 정액이 쏟아졌다…`);
      }
      character.tflags[31] = 0;
      character.tflags[60] = 0;
    } else if (character.cflags[33] === 0) {
      if (SELECTCOM === 26 || SELECTCOM === 27 || SELECTCOM === 28 || SELECTCOM === 29 || SELECTCOM === 36) {
        if (ctx.rand(6) === 0) {
          ctx.showMessage(`정액이 넘쳐나는 ${ctx.getVarName("CALL", TARGET)}의 장내가 움질움찔 떨며,`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스를 거세게 조이고 있다…`);
        } else if (ctx.rand(5) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 장내는, 정액을 토해낸 페니스에 달라붙어,`);
          ctx.showMessage(`장벽으로 빨아올리듯이 받아들이고 있다…`);
        } else if (ctx.rand(4) === 0) {
          ctx.showMessage(`사정하는 것이 직장으로 느껴지자, ${ctx.josaHelper("타겟은")} 자기도 모르게 장벽으로 남근을 훑어올렸다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 어깨에서 엉덩이로 경련이 달리고,`);
          ctx.showMessage(`페니스를 삼킨 항문에서 정액이 흘러나왔다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`장내를 채운 하얗고 탁한 액체의 열기에 의식이 몽롱한 듯,`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 음욕에 몸부림쳤다…`);
        } else {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 항문은, 더욱더 정액을 짜내려는 듯이 요염하게 꿈틀대었다…`);
        }
      } else {
        if (ctx.rand(6) === 0) {
          ctx.showMessage(`정액으로 채워진 질내는 조금씩 꿈틀대며,`);
          ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 페니스에 얽혀붙고 있다…`);
        } else if (ctx.rand(5) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질벽은 정액을 토해낸 페니스를 얽혀붙어,`);
          ctx.showMessage(`음란한 살덩어리로 빨아들이듯이 맞아들이고 있다…`);
        } else if (ctx.rand(4) === 0) {
          ctx.showMessage(`사정하는 것이 자궁으로 느껴지자, ${ctx.josaHelper("타겟은")} 자기도 모르게 ${ctx.getVarName("CALL", PLAYER)}의 페니스를 바짝 조였다…`);
        } else if (ctx.rand(3) === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 어깨에서 엉덩이로 경련이 달리고,`);
          ctx.showMessage(`페니스를 삼킨 음순에서 정액이 흘러나왔다…`);
        } else if (ctx.rand(2) === 0) {
          ctx.showMessage(`질내를 채운 하얗고 탁한 액체의 열기에 의식이 몽롱해진 듯,`);
          ctx.showMessage(`${ctx.josaHelper("타겟은")} 음욕에 몸부림쳤다…`);
        } else {
          ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질구는, 더욱더 정액을 짜내려는 듯이 요염하게 꿈틀대었다…`);
        }
      }
    }
    if (ctx.item[29] > 0 && character.cflags[33] === 0) {
      ctx.showMessage('');
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에 질내사정 횟수를 낙서합니까?`);
      ctx.showMessage(`《현재 질내사정 횟수 / ${character.tflags[820]}회》`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      // Label: INPUT_LOOP
      await ctx.inputNumber();
      if (ctx.result === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에 질내사정 횟수를 쓰지 않았습니다`);
      } else if (ctx.result === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에 질내사정 횟수를 낙서합니다`);
        character.tflags[820] += 1;
        ctx.item[29] -= 1;
        ctx.showMessage(`《현재 질내사정 횟수 / ${character.tflags[820]}회》`);
        await ctx.wait();
      } else {
        // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else {
    if (character.tflags[899] <= 1) {
      if (character.tflags[29] >= 9 && character.tflags[19] && (character.equipment[11] || character.tflags[60]) && (character.cflags[40] & 16) === 0 && (character.cflags[40] & 1) === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 고기주름은 찐득거리는 액체를 흘리며, 꾸욱꾸욱 하고 조르는 듯 수축을 반복하고 있다…`);
      } else if (character.tflags[29] >= 5 && character.tflags[19] && (character.equipment[11] || character.tflags[60]) && (character.cflags[40] & 16) === 0 && (character.cflags[40] & 1) === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 고기주름은 찐득거리는 액체를 떨어뜨리며, 허덕이는 것처럼 개폐를 반복하고 있다…`);
      } else if (character.tflags[29] >= 9) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 간헐적으로 절정을 반복하면서, 몸을 움찔움찔 경련시키면서 몸부림치고 있다…`);
      } else if (character.tflags[29] >= 5) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 간헐적으로 절정을 반복하면서, 축 늘어져 있다…`);
      } else if (character.tflags[29] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 거친 숨을 쉬면서, 절정의 여운에 빠져 있다…`);
      }
    }
  }
  if (character.tflags[899] >= 2 && character.tflags[29] >= 3 && (character.equipment[22] || ctx.talents[57])) {
    ctx.showMessage(`의식이 없는 ${ctx.getVarName("CALL", TARGET)}의 음순에서 하염없이 소변이 흘러나오고 있다…`);
  } else if (character.tflags[899] >= 2 && character.tflags[29] >= 1 && (character.equipment[22] || ctx.talents[57])) {
    ctx.showMessage(`의식이 없는 ${ctx.getVarName("CALL", TARGET)}의 음순에서 소변이 졸졸 새어나오고 있다…`);
  } else if (character.cflags[42] === 69 && (character.cflags[40] & 64) && ((character.tflags[29] >= 5 && character.equipment[22]) || (character.tflags[29] >= 3 && character.equipment[22] && ctx.talents[57]))) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 입고 있는 기저귀에서 김이 피어오르며,`);
    ctx.showMessage(`분명히 알 수 있을 정도로 소변 냄새가 풍겨져나왔다`);
    ctx.showMessage(`아무래도 흥분한 나머지, 기저귀 안에 오줌을 지린 것 같다…`);
  } else if (character.cflags[42] === 69 && (character.cflags[40] & 64) && ((character.tflags[29] >= 3 && ctx.talents[57]) || (character.tflags[29] >= 1 && character.equipment[22]))) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 기저귀에서 김이 피어오르며, 오줌 냄새가 풍겨져나오고 있다…`);
  } else if (character.cflags[42] === 11 && (character.cflags[40] & 64) && ((character.tflags[29] >= 5 && character.equipment[22]) || (character.tflags[29] >= 3 && character.equipment[22] && ctx.talents[57]))) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 입고 있는`);
    await print_clothtype_special(ctx, character);
    ctx.showMessage(`이 떨리고, 밖에서도 확실히 느껴질 정도의 소변 냄새가 풍겨져나왔다`);
    ctx.showMessage(`아무래도 흥분한 나머지,`);
    await print_clothtype_special(ctx, character);
    ctx.showMessage(` 속에 방뇨를 해버린 것 같다…`);
  } else if (character.cflags[42] === 11 && (character.cflags[40] & 64) && ((character.tflags[29] >= 3 && ctx.talents[57]) || (character.tflags[29] >= 1 && character.equipment[22]))) {
    ctx.showMessage(`아까까지 격렬하게 움직이고 있던`);
    await print_clothtype_special(ctx, character);
    ctx.showMessage(`의 움직임이 딱 멈추었다`);
    ctx.showMessage(`아무래도, 안에다 오줌을 지려버린 것 같다…`);
  } else if ((character.cflags[40] & 16) && ((character.tflags[29] >= 5 && character.equipment[22]) || (character.tflags[29] >= 3 && character.equipment[22] && ctx.talents[57]))) {
    ctx.showMessage(`쾌락에 견디지 못하고, ${ctx.josaHelper("타겟은")}`);
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"가")% 흠뻑 젖은 것도 신경쓰지 않고 힘차게 오줌을 싸기 시작했다…`);
  } else if ((character.cflags[40] & 16) && ((character.tflags[29] >= 3 && ctx.talents[57]) || (character.tflags[29] >= 1 && character.equipment[22]))) {
    await print_clothtype_main2(ctx, character);
    ctx.showMessage(`의 사타구니에 김이 나면서, 노란 얼룩이 퍼져나간다…`);
  } else if ((character.cflags[40] & 1) && ((character.tflags[29] >= 5 && character.equipment[22]) || (character.tflags[29] >= 3 && character.equipment[22] && ctx.talents[57]))) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 쾌락에 견디지 못하고선, 팬티 속에다가 성대하게 오줌을 지렸다…`);
  } else if ((character.cflags[40] & 1) && ((character.tflags[29] >= 3 && ctx.talents[57]) || (character.tflags[29] >= 1 && character.equipment[22]))) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 입고 있는 팬티에서 김이 피어오르면서, 노란 얼룩이 퍼져나간다……`);
  } else if (character.tflags[29] >= 7 && character.equipment[22] && ctx.talents[57]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 바들바들 몸을 경련시키면서 하염없이 오줌을 흘렸다`);
    ctx.showMessage(`아무래도 배뇨행위 자체에 쾌락을 느끼고 있는 것 같다…`);
  } else if (character.tflags[29] >= 7 && character.equipment[22]) {
    ctx.showMessage(`경련하는 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 분수처럼 소변이 뿜어져나왔다…`);
  } else if (character.tflags[29] >= 7 && ctx.talents[57]) {
    ctx.showMessage(`경련하는 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 기세 좋게 물줄기가 솟구쳐, 호를 그렸다…`);
  } else if (character.tflags[29] >= 5 && character.equipment[22] && ctx.talents[57]) {
    ctx.showMessage(`축 늘어진 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 분수처럼 소변이 뿜어져나왔다…`);
  } else if (character.tflags[29] >= 5 && character.equipment[22]) {
    ctx.showMessage(`축 늘어진 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 기세 좋게 물줄기가 솟구쳐, 호를 그렸다…`);
  } else if (character.tflags[29] >= 5 && ctx.talents[57]) {
    ctx.showMessage(`축 늘어진 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 물줄기가 솟구쳐, 웅덩이를 만들었다…`);
  } else if (character.tflags[29] >= 3 && character.equipment[22] && ctx.talents[57]) {
    ctx.showMessage(`떨고 있는 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 기세 좋게 물줄기가 솟구쳐, 호를 그렸다…`);
  } else if (character.tflags[29] >= 3 && character.equipment[22]) {
    ctx.showMessage(`떨고 있는 ${ctx.getVarName("CALL", TARGET)}의 요도구에서 물줄기가 솟구쳐, 웅덩이를 만들었다…`);
  } else if (character.tflags[29] >= 3 && ctx.talents[57]) {
    ctx.showMessage(`떨고 있는 ${ctx.getVarName("CALL", TARGET)}의 음순에서 소변이 졸졸 새어나오고 있다…`);
  } else if (character.tflags[29] >= 1 && character.equipment[22] && ctx.talents[57]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 요도구에서 물줄기가 솟구쳐, 웅덩이를 만들었다…`);
  } else if (character.tflags[29] >= 1 && character.equipment[22]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 음순에서 소변이 졸졸 새어나오고 있다…`);
  }
  if (character.tflags[15] == 1 && character.tflags[3]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 비순에서, 더러운 액체가 뒤섞인 처녀혈이 끔찍한 촉수를 타고 떨어졌다…`);
  }
  if (character.tflags[2] == 0 && character.tflags[15] == 0 && character.tflags[3]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 비순에서, 처녀의 증거인 붉은 피가 흘러 떨어졌다…`);
  }
  if (character.tflags[3] && character.tflags[14] > 0 && character.tflags[15] === 0 && character.equipment[89] === 0 && character.equipment[90] === 0 && character.tflags[899] <= 1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (character.tflags[14] === 1 && ctx.getTalent(player, 122)) {
      ctx.print('부친');
    } else if (character.tflags[14] === 1 && ctx.getTalent(player, 122) === 0) {
      ctx.print('모친');
    } else if (character.tflags[14] === 2 && ctx.getTalent(player, 122)) {
      ctx.print('아들');
    } else if (character.tflags[14] === 2 && ctx.getTalent(player, 122) === 0) {
      ctx.print('딸');
    } else if (character.tflags[14] === 3 && ctx.getTalent(player, 122)) {
      ctx.print('오빠');
    } else if (character.tflags[14] === 3 && ctx.getTalent(player, 122) === 0) {
      ctx.print('언니');
    } else if (character.tflags[14] === 4 && ctx.getTalent(player, 122)) {
      ctx.print('남동생');
    } else if (character.tflags[14] === 4 && ctx.getTalent(player, 122) === 0) {
      ctx.print('여동생');
    } else if (character.tflags[14] === 6 && ctx.getTalent(player, 122)) {
      ctx.print('사촌동생');
    }
    ctx.showMessage(`인 ${ctx.getVarName("CALL", PLAYER)}에게 처녀를 바쳤다`);
  }
  if (character.tflags[3] && character.equipment[89] && character.tflags[899] <= 1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 들개에게 처녀를 바쳤다`);
  }
  if (character.tflags[8] > 0) {
    ctx.print('그 후,');
    if (character.tflags[0] && character.tflags[6] && ctx.assi) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", ASSI)}의 페니스를 교대로 물고, 더러움을 혀로 깨끗하게 없앴다…`);
    } else {
      if (character.tflags[8] >= 2) {
        ctx.showMessage(`${ctx.josaHelper("조수와")}`);
      }
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.abilities[10] >= 3) {
        ctx.print('남아있던 정액을 빨아들이면서,');
      }
      ctx.showMessage('페니스의 더러움을 깨끗하게 핥아주었다…');
    }
    if (character.tflags[8] == 3) {
      ctx.showMessage('두 사람은 그것만으론 부족한 듯 서로의 입에 고여있던 정액을 핥고 있다…');
    }
  }
  if (SELECTCOM === 31 && character.tflags[0] && character.tflags[29]) {
    ctx.print('그리고');
    if (ctx.abilities[16] >= 3) {
      if (ctx.rand(3) === 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}, 생각 난듯이 입안에 남은 정액을 음경에 묻히고, 발라준 후에 다시 입에 물었다.`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(`, ${ctx.josaHelper("플레이어가")} 작게 벌어진 입술에 음경을 눌러붙이자, 흘러나온 정액을 되찾겠다는 듯이 목구멍으로 훑기 시작했다.`);
      } else {
        ctx.showMessage(`, ${ctx.josaHelper("타겟은")} 요도에 남아있는 정액을 떠내서, 더러운 음경을 혀로 깨끗하게 했다.`);
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 작게 벌어진 입술에 음경을 밀어넣자, 생각이 난 듯이 혀를 움직였다.`);
    }
  }
  if (SELECTCOM === 69 && character.tflags[29]) {
    if (character.tflags[0] > 0) {
      ctx.showMessage(`그 후`);
    }
    if (ctx.rand(4) === 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 다시 비소를 혀로 희롱해주자, ${ctx.getVarName("CALL", TARGET)}도`);
      if (ctx.abilities[16] >= 3) {
        ctx.print('기쁜 듯이');
      }
      ctx.showMessage('입으로 물어서 보답했다.');
    } else if (ctx.rand(3) === 0) {
      ctx.showMessage(`다시 장난쳐오는 ${ctx.getVarName("CALL", TARGET)}에게`);
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}도 다시 그녀의 음부에 입을 맞추기 시작했다.`);
    } else if (ctx.rand(2) === 0) {
      ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.josaHelper("타겟은")} 한숨을 쉬고, 어느쪽이 먼저랄 것도 없이 서로의 성기를 애무했다.`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 아랫배 쪽을 보자, ${ctx.josaHelper("타겟이")} 끈적끈적해진`);
      if (ctx.getTalent(player, 121) || ctx.getTalent(player, 122)) {
        ctx.showMessage(`음경에`);
      } else {
        ctx.showMessage(`음순에`);
      }
      if (ctx.abilities[16] >= 3) {
        ctx.showMessage(`사랑스러운 듯이`);
      }
      ctx.showMessage(`장난을 쳤다.`);
    }
  }
  if (SELECTCOM === 0 && character.equipment[44] === 0 && character.tflags[899] <= 1) {
    A = UP[0];
    B = UP[14];
    C = A + B;
    if (C < 100) {
      if (ctx.talents[11]) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 애무를 당하면서도 반항적인 태도를 취하고 있다.`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 간지러운 듯 몸을 움츠리지만, 쾌락을 느낄 정도까지는 개발되지 못한 것 같다.`);
      }
    } else if (C < 300) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (character.equipment[90]) {
        ctx.print('촉수의 꿈틀거림');
      } else if (character.equipment[89]) {
        ctx.print('개의 혀 움직임');
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 애무`);
      }
      ctx.showMessage('에 반응해 몸을 떨고 있다.');
    } else if (C < 1000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 몸에 가벼운 전격이라도 닿은 듯이 작게 떨렸다.`);
    } else if (C < 3000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 분명히 쾌락을 느끼고 있는 모습으로 요염하게 신음소리를 내고 있다.`);
    } else if (C < 6000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 애무에 격렬한 쾌락을 느끼고는, 스스로 조르듯 손을`);
      if (character.equipment[90]) {
        ctx.print('촉수생물');
      } else if (character.equipment[89]) {
        ctx.print('개의 머리');
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 머리`);
      }
      ctx.showMessage('에 둘렀다.');
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (character.equipment[90]) {
        ctx.print('촉수의 감촉');
      } else if (character.equipment[89]) {
        ctx.print('개 혀의 움직임');
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 애무`);
      }
      ctx.print('만으로 격렬하게 마구 느끼며, 새로운 자극을 요구해');
      if (character.equipment[90]) {
        ctx.showMessage('떼지어 모인 촉수에게 범해지고 있다.');
      } else if (character.equipment[89]) {
        ctx.showMessage('들개의 몸에 안기고 있다.');
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}에게 안기고 있다.`);
      }
    }
  } else if (SELECTCOM === 1  && character.tflags[899] <= 1) {
    A = UP[0];
    if (A < 300) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 그곳은 아직 단단하게 닫힌 상태이다. 쾌락을 느끼기엔 시간이 걸릴지도 모르겠다.`);
    } else if (A < 1000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 커닐링구스의 자극에 가만히 견디고 있지만, 확실하게 느끼고 있는 것 같다.`);
    } else if (A < 3000) {
      ctx.showMessage(`민감한 콩을 핥아지고 있다는 것을 느낀 것인지, ${ctx.josaHelper("타겟은")}`);
      if (ctx.talents[35]) {
        ctx.print('수치심으로 뺨을 붉게 물들인 채 손으로 자신의 입을 억누르고 소리가 나오는 것을 참으며');
      }
      if (ctx.talents[70] || ctx.talents[33]) {
        ctx.showMessage('뜨거운 한숨을 내쉬면서 쾌락에 몸을 맡기고 있다.');
      } else if (ctx.talents[71] || ctx.talents[32]) {
        ctx.showMessage('쾌락을 부정하듯 고개를 흔들며 견디고 있다.');
      } else {
        ctx.showMessage('비소에서 애액을 흘리며 작게 한숨을 쉬었다.');
      }
    } else if (A < 6000) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 작은 콩을 혀로 문질러주자 ${ctx.josaHelper("타겟은")} 사랑스러운 소리를 내면서 파들파들 몸을 떨었다.`);
    } else if (A < 10000 && character.equipment[89] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 확실한 쾌락의 소리를 내면서, 무의식적으로 ${ctx.getVarName("CALL", PLAYER)}의 머리를 손으로 눌러 한층 더 그 부분을 눌러왔다.`);
    } else {
      if (ctx.talents[102]) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 민감한 클리토리스에 가해진 괴롭힘에 격하게 몸부림치며, 계속 한심한 소리를 냈다.`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 클리토리스에 가해진 자극에 격한 신음소리를 내며 계속 허덕였다.`);
      }
    }
  } else if (SELECTCOM === 2 && character.tflags[899] <= 1) {
    A = UP[2];
    if (A < 300) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 비명을 지르며 몸을 뒤튼다.`);
      if (ctx.abilities[3] <= 2) {
        ctx.showMessage('천천히 개발해나가면 될 것 같다.');
      } else {
        ctx.showMessage('몸이 아직 준비가 덜 된 것 같다.');
      }
    } else if (A < 1000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 작은 몸을 떨었다.`);
      if (ctx.abilities[3] <= 2) {
        ctx.showMessage('아직 조금 더 개발할 필요가 있을 것 같다.');
      } else {
        ctx.showMessage('쾌락을 얻기에는 아직 몸을 좀 더 풀어야 할 것 같다.');
      }
    } else if (A < 3000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 작게 교성을 지르면서 몸을 경직시켰다.`);
      if (ctx.talents[106]) {
        ctx.print('본래부터 애널에 대한 자극에 약한 것인지,');
      }
      ctx.showMessage('분명하게 쾌락을 느끼기 시작하고 있다.');
    } else if (A < 6000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 애널에 가해진 자극에 확실히 쾌락을 느끼고 있는 것 같다.`);
    } else if (A < 10000) {
      if (ctx.talents[106]) {
        ctx.print('민감한 애널을 괴롭혀지자');
      } else {
        ctx.print('애널에 가해진 자극에');
      }
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 기뻐하는 소리를 내면서`);
      if (ctx.talents[70] || ctx.talents[33]) {
        ctx.showMessage('쾌락을 호소했다.');
      } else if (ctx.talents[71] || ctx.talents[32]) {
        ctx.showMessage('필사적으로 쾌락을 부정했다.');
      } else {
        ctx.showMessage('미친듯이 허덕였다.');
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 개발당한 애널을 만져주자 참을 수 없다는 듯이 비명 섞인 신음소리를 지르며 미친듯 기뻐랬다.`);
    }
  } else if (SELECTCOM === 3) {
    A = UP[0];
    B = UP[1];
    C = UP[2];
    D = UP[17];
    E = A + B + C + D;
    if (ctx.talents[122] || ctx.talents[121]) {
      ctx.saveStr[2] = "성기를 훑었";
      ctx.saveStr[3] = "딱딱하게 발기한 페니스를 움켜쥐";
    } else {
      ctx.saveStr[2] = "성기를 만지작거렸";
      ctx.saveStr[3] = "애액을 계속 흘리고 있는 비소를 벌려 보이";
    }
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.abilities[17] == 4) {
      ctx.print('노출하는 쾌락에 취한 표정을 보이면서,');
    }
    if (ctx.abilities[17] == 5) {
      ctx.showMessage(`완전히 보여지는 쾌감에 눈떠버렸는지, 음탕한 표정을 지은 채, 스스로 %SAVESTR:3%면서,`);
    }
    if (ctx.talents[35] && ctx.abilities[17] <= 3) {
      ctx.print('수치심으로 얼굴을 새빨갛게 물들인 채,');
    }
    if (ctx.talents[45] == 0 && ctx.talents[310] == 0) {
      ctx.print('눈물을 글썽이며');
    }
    if (ctx.talents[99]) {
      ctx.print('큰 몸을 굽힌 채');
    }
    if (ctx.talents[100]) {
      ctx.print('작은 몸으로');
    }
    if (ctx.talents[100] == 0 && (character.equipment[11] || character.equipment[13])) {
      ctx.print('자기 안에');
    }
    if (character.equipment[11] && character.equipment[13]) {
      ctx.print('두 개의 바이브가 박혀 있는 추잡한 모습을 보이면서,');
    } else if (character.equipment[11]) {
      ctx.print('들어가 있는 바이브를 손으로 쥔 채,');
    } else if (character.equipment[13]) {
      ctx.print('쑤셔박힌 애널바이브를 들고서,');
    }
    if (character.equipment[53]) {
      ctx.print('비디오카메라를 향해');
    }
    ctx.showMessage('계속 자위하고 있다.');
    if (E < 300) {
      ctx.showMessage('그 손의 움직임은 아직 뻣뻣해, 쾌락보다도 수치심 쪽이 더 강한 것 같다.');
    } else if (E <1000) {
      ctx.showMessage('때때로 작은 몸을 떠는 모습은 확실히 쾌락을 느끼기 시작하고 있었지만, 아직 몰두하지는 못하고 있는 것 같다.');
    } else if (E < 3000) {
      ctx.showMessage('그 표정에서는 확실한 쾌락의 조짐이 보이며, 열띤 한숨이 새어나오고 있다.');
    } else if (E < 6000) {
      ctx.showMessage('그리고 참을 수 없는 쾌감에 쾌락의 소리를 내면서 자위 행위에 몰두하고 있다.');
    } else if (E < 10000) {
      ctx.showMessage(`그리고 자위 행위를 계속하면서 쾌락에 몸을 경련하며, 허리로 브릿지를 만든 채 스스로 계속 %SAVESTR:2%다.`);
    } else {
      ctx.showMessage(`지나친 쾌락에 모든 것을 잊어버린듯한 표정으로 찌걱찌걱 소리를 내면서 계속 %SAVESTR:2%다. 내버려두면 분명 계속할 것이다.`);
    }
  } else if (SELECTCOM === 5 && character.equipment[89] === 0 && character.tflags[899] <= 1) {
    if (ctx.talents[114]) {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 손은, ${ctx.getVarName("CALL", TARGET)}의 젖에 폭 묻혀 있다……`);
    }
    A = UP[14];
    if (ctx.talents[130] && character.equipment[16] === 0 && character.equipment[90] === 0) {
      ctx.saveStr[2] = "빨아";
    } else {
      ctx.saveStr[2] = "만져";
    }
    if (A < 300) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 아직 가슴으로 쾌락을 느낄 정도까지는 개발되지 않은 것 같다.`);
    } else if (A < 1000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 가슴을 농락당하는 쾌감에 눈을 떠가는듯한 모습이다.`);
    } else if (A < 3000) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴을 계속 %SAVESTR:2%주자 유두는 단단하게 솟고, 뜨거운 한숨을 쉬기 시작했다.`);
    } else if (A < 6000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 가슴 애무에 흐리멍텅한 표정이 되어 있다.`);
    } else if (A < 10000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.talents[109]) {
        ctx.print('평균보다 살짝 작은 가슴으로');
      }
      ctx.showMessage('심하게 느끼며, 가슴에 가해진 자극만으로도 황홀함의 극치에 도달한 상태다.');
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴을 계속 %SAVESTR:2%주자 그것만으로 매우 느끼며 몸을 홱 젖혀,`);
      if (ctx.talents[110] || ctx.talents[114]) {
        ctx.showMessage('눈앞에서 그 거유를 흔들며 이쪽의 눈을 즐겁게 해주었다.');
      } else {
        ctx.showMessage('풀어진 표정으로 쾌락에 몸을 맡겼다.');
      }
    }
  } else if (SELECTCOM === 10 && character.tflags[899] <= 1) {
    A = UP[0];
    if (ctx.talents[121] || ctx.talents[122]) {
      ctx.saveStr[2] = "페니스";
    } else {
      ctx.saveStr[2] = "클리토리스";
    }
    if (A < 300) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 아직 큰 쾌락을 얻기엔 충분히 개발되지 못한 것 같다.`);
    } else if (A < 1000) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 %SAVESTR:2%에 로터를 들이대자, 작게 비명을 지르며 움찔 하고 몸을 경련시켰다.`);
    } else if (A < 3000) {
      if (ctx.talents[70]) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 로터의 자극에, 기분 좋은듯 그 쾌락을 받아들이고 있다.`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 %SAVESTR:2%에 로터를 들이대자, 쾌락의 목소리를 내면서 자극으로부터 달아나려 몸을 뒤틀었다.`);
      }
    } else if (A < 6000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} %SAVESTR:2%를 직접 로터에 자극받아, 격한 쾌락에 온몸을 경련했다.`);
    } else if (A < 10000) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 %SAVESTR:2%를 로터로 자극하자, 격렬한 쾌락에 몸부림치며, 허리를 추잡하게 그라인드시켰다.`);
    } else {
      if (ctx.talents[42]) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 로터를 가져다 대자, 지나치게 강렬한 쾌락에 격하게 허리를 굽힌 채 연속으로 애액을 분출시켰다.`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 로터를 들이대자, 지나친 쾌락에 침까지 흘리면서 몸을 배배 꼬았다.`);
      }
    }
  } else if (SELECTCOM === 11 && character.tflags[899] <= 1) {
    A = UP[1];
    if (character.equipment[11]) {
      if (A < 300) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 바이브의 굵기에 괴로운 듯 몸부림쳤다.`);
      } else if (A < 1000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 익숙하지 않은 바이브의 감각에 당황하면서도, 때때로 밀어오는 쾌락의 충격에 몸을 떨고 있다.`);
      } else if (A < 3000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 이미 바기나로도 쾌락을 느끼는 몸이 되어버린 것인지, 진동하는 바이브를 넣자 확실하게 느끼는 목소리를 냈다.`);
      } else if (A < 6000) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의`);
        if (ctx.talents[132]) {
          ctx.print('작은');
        }
        ctx.showMessage('바기나에 바이브를 쑤셔넣자 그 즉시 쾌락에 녹아있는 표정을 지었다.');
      } else if (A < 10000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
        if (ctx.talents[100]) {
          ctx.print('그 작은 몸으로');
        }
        ctx.showMessage('굵직한 바이브를 삼킨 채, 격렬한 진동에 의한 자극과 쾌락에 그 나신을 은어마냥 팔딱거리고 있다.');
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 진동하는 바이브를 격렬하게 넣어주니 애액을 흘리면서 격렬한 쾌락에 몸부림쳤다.`);
      }
    } else {
      if (A < 300) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에서 바이브를 뽑아내자 안심하는 표정을 지었다.`);
      } else if (A < 1000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 그 몸에서 바이브를 뽑아낸 순간 작고 귀여운 신음소리를 냈다.`);
      } else if (A < 3000) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에서 바이브를 뽑아내는 순간 가볍게 넣고 빼주자 작은 신음소리를 흘리면서 몸을 떨었다.`);
      } else if (A < 6000) {
        ctx.showMessage(`${ctx.josaHelper("타겟을")} 심하게 바이브로 괴롭힌 후 가까스로 뽑아내자 질에서 대량의 애액이 쏟아져나왔다.`);
      } else if (A < 10000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 바이브를 뽑아낸 것만으로도 귀여운 신음소리를 내며 마지막에 다시 한 번 더 쑤셔박았다가 격렬하게 뽑아내자 애액을 뿜어내면서 온몸을 경련시켰다.`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에서 바이브를 뽑아내기 전에 바이브를 있는 힘껏 격하게 넣고 뽑아내자 온몸을 배배 꼬면서 미친듯 기뻐했다.`);
      }
    }
  } else if (SELECTCOM === 12 && character.tflags[899] <= 1) {
    A = UP[0];
    if (ctx.talents[121] || ctx.talents[122]) {
      ctx.saveStr[2] = "페니스";
    } else {
      ctx.saveStr[2] = "클리토리스";
    }
    if (A < 300) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 %SAVESTR:2%에 마사지기를 들이댔으나, 진동에 견딜 뿐 큰 쾌락을 얻는 것기엔 아직 먼 것 같다.`);
    } else if (A < 1000) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 그곳에 마사지기를 들이대자, 간지럼 타면서도 그 표정에 쾌락의 징조가 보인다.`);
    } else if (A < 3000) {
      ctx.showMessage(`%SAVESTR:2%에 마사지기를 들이대자, ${ctx.josaHelper("타겟은")} 작고 귀여운 소리를 내면서 몸을 떨었다.`);
    } else if (A < 6000) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 그곳에 마사지기를 들이대자, 참을 수 없는 쾌락에 무심코 두 다리를 오므려서 마사지기를 조여버려, ${ctx.josaHelper("타겟은")} 몸부림쳤다.`);
    } else if (A < 10000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} %SAVESTR:2%에서 느껴지는 마사지기의 진동으로 인한 쾌락에, 필사적으로 달아나려 하면서 계속 색기 있는 신음소리를 내고 있다.`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 마사지기를 들이댄 순간 격렬하게 몸을 뒤로 젖히며,`);
      if (ctx.talents[42] && ctx.talents[122] === 0) {
        ctx.showMessage('그곳에서 몇 번이고 애액을 흩뿌렸다.');
      } else {
        ctx.showMessage('강렬한 쾌락에 몸을 경련시켰다.');
      }
    }
  } else if (SELECTCOM === 13 && character.tflags[899] <= 1) {
    A = UP[2];
    if (character.equipment[13]) {
      if (A < 300) {
        ctx.showMessage(`애널에 바이브를 넣자 ${ctx.josaHelper("타겟은")} 비명을 질렀다. 아직 고통이 더 강한 것 같다.`);
      } else if (A < 1000) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 애널은 상당히 받아들일 수 있게 된 것 같지만 아직 좀 힘들어보인다.`);
      } else if (A < 3000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 애널에 바이브를 삽입당하자 조금 고통스러워 해도 쾌락 쪽이 더 강해진 것 같다.`);
      } else if (A < 6000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 애널에 바이브를 쑤셔박히고선 명백한 교성을 내면서 쾌락을 느끼고 있다.`);
      } else if (A < 10000) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 애널바이브가 가져다주는 강렬한 쾌락에 표정이 풀어졌다.`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 애널에 가해진 자극에 격하게 느끼면서`);
        if (ctx.talents[99]) {
          ctx.print('그 큰 몸을');
        } else if (ctx.talents[100]) {
          ctx.print('그 작은 몸을');
        } else {
          ctx.print('그 땀 투성이가 된 몸을');
        }
        ctx.showMessage('괴로움에 뒹굴었다.');
      }
    } else {
      if (A < 300) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 몸에서 애널바이브를 뽑아내자 안도의 한숨을 쉬었다.`);
      } else if (A < 1000) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 애널 조임을 즐기면서 천천히 뽑아주었다.`);
      } else if (A < 3000) {
        ctx.showMessage(`애널에서 바이브를 뽑아내는 순간, ${ctx.josaHelper("타겟은")} 참을 수 없다는 신음소리를 냈다.`);
      } else if (A < 6000) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 안에서 계속 진동하는 바이브를 강제로 뽑아내자 달콤한 쾌락이 뒤섞인 신음소리를 냈다.`);
      } else if (A < 10000) {
        ctx.showMessage(`애널바이브를 뽑아내기 전에 가볍게 뺐다 끼워넣자 ${ctx.josaHelper("타겟은")} 달콥한 목소리를 내면서 엉덩이를 흔들었다.`);
      } else {
        ctx.showMessage(`애널바이브를 들고 격하게 넣었다 빼자 ${ctx.josaHelper("타겟은")} 강렬한 쾌락에 격하게 신음소리를 내며 추잡하게 허리를 흔들며 쾌락을 탐했다.`);
      }
    }
  } else if (SELECTCOM === 14 && character.tflags[899] <= 1) {
    A = UP[0];
    if (A < 300) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 클리토리스에 가해진 자극에 눈을 감은 채 견디고 있다.`);
    } else if (A < 1000) {
      ctx.showMessage(`클리 마사지기로 클리토리스를 문질러주자 ${ctx.josaHelper("타겟은")} 작은 신음소리를 냈다.`);
    } else if (A < 3000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 클리토리스에 가해진 자극을 견디지 못한 채 몸을 조금씩 떨며 쾌락에 몰아세워지고 있다.`);
    } else if (A < 6000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 전동 클리캡의 자극이 가져다주는 격렬한 쾌감에 허리를 위로 밀며 추잡한 댄스를 추고 있다.`);
    } else if (A < 10000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 클리토리스에 받은 쾌락에 의식이 희미해진 채 느슨한 표정을 짓고 있다.`);
    } else {
      ctx.showMessage(`전동 클리캡을 쥐고 움직여주자 ${ctx.josaHelper("타겟은")} 클리토리스에 가해진 엄청난 자극을 견디지 못하고 대량으로 애액을 흘리면서 몸을 젖혔다.`);
    }
  } else if (SELECTCOM === 20 || SELECTCOM === 26 && character.tflags[899] <= 1) {
    if (character.tflags[2] && ctx.abilities[10] >= 3 && ctx.abilities[11] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}에게 다리를 얽어 허리를 꽉 눌렀다…`);
    }
  } else if (SELECTCOM === 24 || SELECTCOM === 28 && character.tflags[899] <= 1) {
    if (character.tflags[2] && ctx.abilities[10] >= 3 && ctx.abilities[11] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 머리에 손을 둘러 껴안았다…`);
    }
  } else if (SELECTCOM === 25 || SELECTCOM === 29 && character.tflags[899] <= 1) {
    if (character.tflags[2] && ctx.abilities[10] >= 3 && ctx.abilities[11] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 등을 뒤로 젖힌 채 ${ctx.getVarName("CALL", PLAYER)}에게 매달려왔다…`);
    }
  } else if (SELECTCOM === 34) {
    A = UP[1];
    if (A < 299) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 괴로워하면서 명령에 따라 허리를 흔든다. 하지만 아직 쾌락을 얻기에는 먼 것 같다.`);
    } else if (A < 1000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 괴로워하지만 그 표정에는 쾌락의 조짐이 보인다.`);
    } else if (A < 3000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 허리를 흔들면서 참을 수 없는 쾌락에 귀여운 소리를 흘리고 있다.`);
    } else if (A < 6000) {
      if (ctx.talents[110] || ctx.talents[114]) {
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 눈앞에서, ${ctx.josaHelper("타겟은")} 커다란 유방을 허리의 움직임에 따라 위아래로 출렁이면서 쾌락에 젖어있다.`);
      }
      if (ctx.talents[110] == 0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 상당히 익숙해진 것인지, 쾌락에 밀쳐올려지면서 스스로 허리를 흔들고 있다.`);
      }
    } else if (A < 10000) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.talents[99]) {
        ctx.showMessage(`그 큰 체구를 가지고,`);
      } else if (ctx.talents[100]) {
        ctx.showMessage(`그 작은 몸으로`);
      }
      if ((ctx.talents[32] || ctx.talents[71]) && ctx.talents[432] === 0) {
        ctx.showMessage(`쾌락을 부정하는 말을 토해내면서, 참지 못하고 계속 허덕이는 신음소리를 내고 있다.`);
      } else if (ctx.talents[432] === 1) {
        ctx.showMessage(`상스럽게 가랑이 위에서 허리를 흔들고 등을 뒤로 젖히면서 음란한 말이 섞인 쾌락의 신음을 질렀다.`);
      } else {
        ctx.showMessage(`열심히 허리를 흔들며 등을 뒤로 젖힌 채 쾌락의 신음소리를 냈다.`);
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 허리를 흔들면서 풀려버린, 느슨한 얼굴로 쾌락을 취하고 있다.`);
    }
  } else if (SELECTCOM === 40 || SELECTCOM === 41 || SELECTCOM === 42 && character.tflags[899] <= 1) {
    A = UP[9];
    if (A < 300) {
      B = 0;
    } else if (A < 1000) {
      B = 1;
    } else if (A < 2000) {
      B = 2;
    } else if (A < 3000) {
      B = 3;
    } else {
      B = 4;
    }
    if (ctx.talents[40]) {
      B += 1;
    }
    if (ctx.talents[41]) {
      B -= 1;
    }
    if (B < 1) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 비명을 참아가며 아픔에 견뎠다.`);
    } else if (B < 2) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 심한 고통에 악문 이 사이로 괴로운듯한 신음소리를 냈다.`);
    } else if (B < 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고통에 견디지 못하고 비명을 지르며 온몸을 뒤틀었다.`);
    } else if (B < 4) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 아픔이 너무 심해 온몸에서 식은땀을 흘리면서 고통에 괴로워하며 뒹굴었다.`);
    } else if (B < 5) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 너무 심한 아픔에 의식이 날아갈 것 같게 되자 차마 들을 수 없는 짐승 같은 비명을 계속 질렀다.`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 너무 심한 아픔에`);
      if (ctx.talents[45] == 0 && ctx.talents[310] == 0) {
        ctx.print('흐느껴 울면서');
      }
      ctx.showMessage('필사적으로 용서를 구걸하고 있다.');
    }
    if (UP[5] > 1000) {
      ctx.showMessage(`그러나 동시에, ${ctx.josaHelper("타겟은")} 고통에 몸을 뒤틀면서도`);
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.showMessage(`페니스를 발기시키고 있다……`);
      } else {
        ctx.showMessage(`사타구니를 적시고 있다……`);
      }
    }
  } else if (SELECTCOM === 88 && character.tflags[899] <= 1) {
    if (ctx.rand(3) === 0 && character.equipment[44] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 면도된`);
      if (character.cflags[608] === 0) {
        ctx.print('도끼자국이 깔끔한');
      } else if (character.cflags[608] === 1) {
        ctx.print('소음순이 비어져나온');
      } else if (character.cflags[608] === 2) {
        ctx.print('색소가 침착되어 거무슴한 소음순이 비어져나온');
      }
      ctx.print('가랑이');
      if (ctx.abilities[16] >=3) {
        ctx.showMessage(`에 손가락을 뻗어, 감촉을 확인하고 있다…`);
        if (ctx.talents[35]) {
          ctx.showMessage(`얼굴을 붉히지만 꼭 싫지만은 않은 모습이다.`);
        }
      } else {
        ctx.showMessage(`를 손으로 가리고, 음부의 감촉을 확인하고 있다…`);
      }
    } else if (ctx.rand(2) === 0 && character.equipment[44] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 완전히 모습을 드러낸`);
      if (character.cflags[608] === 0) {
        ctx.print('도끼자국이 깔끔한');
      } else if (character.cflags[608] === 1) {
        ctx.print('소음순이 비어져나온');
      } else if (character.cflags[608] === 2) {
        ctx.print('색소가 침착되어 거무슴한 소음순이 삐져나온');
      }
      ctx.showMessage('성기를,');
      if (ctx.abilities[16] >=3) {
        if (ctx.talents[24] || ctx.talents[30] || ctx.talents[35]) {
          ctx.showMessage(`얼굴을 새빨갛게 붉히면서도`);
        }
        ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}의 눈앞에 보여줬다.`);
      } else {
        if (ctx.talents[24] || ctx.talents[30] || ctx.talents[35]) {
          ctx.showMessage(`부끄러운 듯이`);
        }
        ctx.showMessage(`손으로 감추려하고 있다.`);
      }
    } else {
      ctx.showMessage(`어린 아기처럼 드러난 자신의`);
      if (ctx.talents[121] || ctx.talents[122]) {
        ctx.print('페니스를');
      } else {
        if (character.cflags[608] === 0) {
          ctx.print('도끼자국이 깔끔한');
        } else if (character.cflags[608] === 1) {
          ctx.print('소음순이 비어져나온');
        } else if (character.cflags[608] === 2) {
          ctx.print('색소가 침착되어 거무슴한 소음순이 비어져나온');
        }
        ctx.showMessage('음부를,');
      }
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
      if (ctx.abilities[17] >= 3) {
        ctx.print('자랑스럽게');
      } else {
        ctx.print('쓸쓸한 듯이');
      }
      ctx.showMessage(`내려다보고 있다…`);
    }
  }
  if (SELECTCOM === 37 || SELECTCOM === 138) {
    if (ctx.abilities[16] >=3 && character.tflags[29] === 0) {
      if (ctx.rand(3) ==0) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 항문 주변을 핥아주고, 혀끝을 길게 뽑아 안쪽으로 들어왔다`);
        ctx.showMessage(`혀가 미끈미끈한 장벽을 덧그리듯이 희롱하고 있다…`);
      } else if (ctx.rand(2) === 0) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 혀끝이 항문을 얕게 찌르고, 그 다음엔 그 주변을 문질렀다…`);
        ctx.showMessage(`그리고, 갑자기 혀끝이 깊게 찔러들어와, 직장을 희롱하듯이 움직였다`);
      } else {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 애널에 달라붙어, 엉덩이 전체를 껴안는 듯한 자세로 봉사를 하고 있다…`);
      }
    } else if (ctx.abilities[10] >=2 && character.tflags[29] === 0) {
      if (ctx.rand(2) ==0) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 혀끝이 안에 들어오기전에 잠시 망설였다…`);
        ctx.showMessage(`무서운듯이 다시 뽑혀나와, 입구 주변을 맴돌고 있다.`);
      } else {
        ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 혀끝은 항문을 얕게 찌르고, 주변을 문질러갔다…`);
        ctx.showMessage(`하지만, 안쪽으로 들어갈 수는 없었다.`);
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게는 아직 저항감이 있는 것같다.`);
      }
    }
  }
  if (character.equipment[46] && character.tflags[899] <= 1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 대량으로 관장액이 부어진 항문에 마개가 끼워진 상태로, 계속 괴로워하고 있다.`);
    if (ctx.abilities[21] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고통스러워하는 표정을 짓고 있다.`);
    } else if (ctx.abilities[21] === 1) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 진땀을 흘리면서, 배설감을 참고 있다.`);
    } else if (ctx.abilities[21] === 2) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 괴로운 표정을 지으면서도, 얼굴을 홍조시킨 채 쭈뼛거리며 엉덩이를 흔들고 있다.`);
    } else if (ctx.abilities[21] === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 배설감에 시달리면서도, 때때로 황홀해하는 표정을 짓고 있다.`);
    } else if (ctx.abilities[21] === 4) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 황홀해하는 표정을 지으면서, 배설감과 복통을 즐기고 있다.`);
    } else if (ctx.abilities[21] >= 5) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 배설감을 마음껏 맛보고 있다.`);
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 표정은 쾌감에 느슨하게 풀려서, 그 입과 질구에서 똑똑 침을 떨어뜨리고 있다.`);
    }
  }
  if (character.equipment[55]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.getVarName("CALL", PLAYER)}의 얼굴에 엉덩이를 들이밀며 가학적인 미소를 짓고 있다.`);
  }
  return 0;
}
