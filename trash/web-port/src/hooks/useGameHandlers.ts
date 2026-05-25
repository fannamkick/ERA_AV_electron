/**
 * 게임 핸들러 커스텀 훅
 * 게임 로직 핸들러들을 관리
 */

import { useGameStore } from '../stores/gameStore';
import { createStarterCharacter } from '../utils/characterFactory';

export function useGameHandlers() {
  const { resetGame, endTurn, addCharacter } = useGameStore();

  /**
   * 새 게임 시작
   */
  const handleNewGame = () => {
    resetGame();

    // 초기 캐릭터 추가 (미야마 카나데)
    const starterChar = createStarterCharacter();
    addCharacter(starterChar);
    console.log('[NEW GAME] 초기 캐릭터 추가:', starterChar.name);

    return true;
  };

  /**
   * 휴식 (아무것도 안 하고 턴 종료)
   * ERB에서는 메인 메뉴에서 "휴식" 선택 시 아무 행동 없이 TURNEND로 이동
   */
  const handleRest = () => {
    console.log('[REST] 휴식 선택 → 턴 종료');
    endTurn();
    return true;
  };

  /**
   * 행동 완료 후 턴 종료
   * 조교/창관/AV촬영/방문 등 행동 후 자동 호출
   */
  const handleActionComplete = (actionName: string) => {
    console.log(`[ACTION] ${actionName} 완료 → 턴 종료`);
    endTurn();
    return true;
  };

  return {
    handleNewGame,
    handleRest,
    handleActionComplete,
  };
}
