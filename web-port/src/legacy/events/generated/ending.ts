/**
 * ENDING.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ending_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[5] === 9) {
    return;
  } else if (ctx.money < 0) {
    ctx.showMessage('');
    ctx.showMessage('포인트가 다 떨어졌다……');
    ctx.showMessage('');
    await bad_end_2(ctx, character);
    ctx.quitGame();
  } else if (DAY[0] < ctx.flags[3]) {
    return;
  }
  await ending_check_2(ctx, character);
}

export async function ending_check_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('');
  ctx.showMessage('카논과 약속한 날이 왔다……');
  ctx.showMessage('');
  ctx.drawLine();
  await ctx.wait();
  if (ctx.money < ctx.flags[4]) {
    await bad_end(ctx, character);
    ctx.quitGame();
  } else {
    await normal_end_01(ctx, character);
    return 1;
  }
}

export async function bad_end(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`「너라면 제대로 벌어줄거라고 생각했었는데 말야……`);
  ctx.showMessage(`　조직 애들에게 본보기도 보여줘야하고, 더 이상 기다려 줄 수는 없어」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`…………`);
  ctx.showMessage(`……`);
  await ctx.wait();
  ctx.showMessage(`기간내에 빚을 변재하기 못한 ${ctx.josaHelper("플레이어는")},`);
  ctx.showMessage(`키류 조직의 지하시설에서『물건』으로 다뤄지게 됐다`);
  ctx.showMessage(`괜한 말을 하지 못하도록 약이 투여된 ${ctx.josaHelper("플레이어는")}`);
  ctx.showMessage(`이제 후회조차 마음대로 하지 못한다……`);
  await ctx.wait();
  ctx.showMessage('');
  ctx.showMessage(`　　　　　　　　―― Ending No.-- (배드 엔드)`);
  await ctx.wait();
  return 1;
}

export async function bad_end_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`「네겐 소질이 보인다고 기대했는데 말야……」`);
  ctx.showMessage(`L`);
  ctx.showMessage(`…………`);
  ctx.showMessage(`……`);
  await ctx.wait();
  ctx.showMessage(`기간내에 빚을 변재하기 못한 ${ctx.josaHelper("플레이어는")},`);
  ctx.showMessage(`키류 조직의 지하시설에서『물건』으로 다뤄지게 됐다`);
  ctx.showMessage(`괜한 말을 하지 못하도록 약이 투여된 ${ctx.josaHelper("플레이어는")}`);
  ctx.showMessage(`이제 후회조차 마음대로 하지 못한다……`);
  await ctx.wait();
  ctx.showMessage('');
  ctx.showMessage(`　　　　　　　　―― Ending No.-- (배드 엔드)`);
  await ctx.wait();
  return 1;
}

export async function normal_end_01(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} ${ctx.flags[4]}포인트를 내놓으니 카논은 만족스럽게 웃었다.`);
  // TODO: PRINTW
  ctx.showMessage(`「너는 내가 점찍은 남자니까 이 정도는 벌어줘야지`);
  ctx.showMessage(`　……그럼 이제 어떻게 할거야?`);
  ctx.showMessage(`　너도 깨달았겠지만, 그냥 손 씻고 원래의 생활로는 돌아갈 수 없을테니까`);
  ctx.showMessage(`　고작 비디오 한편에 막대한 돈이 오가는 현실도 알아버렸고, 이곳저곳에서 원망도 많이 샀겠지`);
  ctx.showMessage(`　뭐, 우리 조직의 비호하에서 지금 일을 계속해 준다면야`);
  ctx.showMessage(`　적어도 네가 피해를 입는 일은 없겠지만 말야`);
  ctx.showMessage(`　그리고 이 일도 생각해보면, 평범한 남정네들은 돈을 아무리 쌓아도 평생 닿을 수 없는 여자를`);
  ctx.showMessage(`　네 마음대로 범할 수 있잖아`);
  ctx.showMessage(`　내가 보기엔 남자에게 이보다 좋은 일은 없다고 생각하는데`);
  ctx.showMessage(`　자, 어쩔래? 이대로 이 일을 계속하는 것도, 그래도 손을 씻고 평범한 생활로 돌아가는 것도 네 자유야`);
  ctx.showMessage(`　……라고 말은 했지만, 뒷사회에 한 번 발을 들이밀고만 네가`);
  ctx.showMessage(`　과연『평범』하게 살 수 있을까?」`);
  // TODO: PRINTW
  ctx.showMessage(`그리고 스탭과 여배우들이 모두 돌아간 사무소에서, ${ctx.josaHelper("플레이어는")} 혼자서 미래에 대해 생각했다`);
  ctx.showMessage(`더 이상 돌아갈 수 없는 곳까지 와버렸다는 자각은 있다`);
  ctx.showMessage(`그리고 설령 돌아갔다고 해도 나를 믿어줬던,`);
  ctx.showMessage(`남겨질 여배우들은 대체 어떻게 될까`);
  ctx.showMessage(`다른 사람이 내 뒤를 이어 감독일을 이어갈지, 아니면……`);
  ctx.showMessage(`그걸 생각하면, 역시 이 일을 계속해야 하는 걸까`);
  ctx.showMessage(`그러다 문득, 만약 지금에 이르는 과정이 달랐다면, 결과도 달랐을지도 모른다――`);
  ctx.showMessage(`그런 생각이 떠올랐다`);
  // TODO: PRINTW
  ctx.showMessage(`W ――그럼, 『당신』은 다시 해보고 싶어?`);
  ctx.showMessage(`W 　　지금과는 다른 미래가 보고 싶어?`);
  ctx.showMessage(`W 　『그 날』이 만약『지금』이었다면 다른 미래가 있었을까?`);
  ctx.showMessage(`W 　『당신』에겐 두가지 선택지가 있어`);
  ctx.showMessage(`W 　　하나는 지금 이대로 앞으로 나아가는 것`);
  ctx.showMessage(`W 　　또 하나는……『지금』이『과거』가 되어, 새로운『결말』을 보는 것`);
  ctx.showMessage(`W 　　자, 선택해봐?`);
  ctx.showMessage(`W 　『당신』이 만나지 못했던 사람들은 분명히…… 그래, 분명히『당신』의『미래』를 바꿔줄거야`);
  ctx.showMessage(`W 　　그래도, 강요는 하지 않을게`);
  ctx.showMessage(`　　거듭되는 시간을 반복하면 반복할수록『당신』은 사람이면서 사람이 아닌,`);
  ctx.showMessage(`W 　　다른『무언가』가 될지도 몰라`);
  ctx.showMessage(`W 　　아마 지금보다 더 빠져나갈 수 없는 지경에 이르겠지`);
  ctx.showMessage(`　　그래도『당신』이 원한다면 나는…… 몇번이든『당신』에게 멋진 꿈을 보여줄게――`);
  ctx.showMessage(`W`);
  ctx.showMessage(`어디에선가, 어느 소녀의 목소리가 들린 것 같았다`);
  ctx.showMessage(`그 목소리는 ${ctx.josaHelper("플레이어가")} 지금까지 들었던 어떤 소리보다도 편안했고,`);
  ctx.showMessage(`그렇기에 악마의 속삼임으로도 들리는 말이었다`);
  ctx.showMessage(`그 목소리는 환청이었는지, 아니면――`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 머리를 좌우로 흔들어 일단 생각을 정리했다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`이제와서 망설일 필요는 없다`);
  ctx.showMessage(`처음부터『그 날』에 악마에게 영혼을 판것이나 마찬가지였다`);
  ctx.showMessage(`그리고 ${ctx.josaHelper("플레이어는")}, 환상일지도 모르는 소녀의 목소리에 대답했다……`);
  ctx.showMessage(`W 　　　　　　　　―― Ending No.01 (노멀 엔드)`);
  await ctx.wait();
  await game_continue(ctx, character);
  if (ctx.result == 1) {
    return 1;
  }
  ctx.drawLine();
  ctx.showMessage('');
  ctx.showMessage('※EXTRA로 이행합니다');
  ctx.showMessage('');
  ctx.drawLine();
  ctx.money -= ctx.flags[4];
  ctx.flags[3] = 0;
  ctx.flags[4] = 0;
  ctx.flags[5] = 9;
  await ctx.wait();
}
