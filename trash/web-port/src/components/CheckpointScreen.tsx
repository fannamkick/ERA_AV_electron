/**
 * 체크포인트 화면
 * 기상/점심/취침 체크포인트에서 이벤트 결과 표시
 */

import { useState, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getPhaseName } from '../core/time';
import { rollEvent } from '../core/eventEngine';
import type { EventResult } from '../core/eventEngine';
import { applyConditionChanges } from '../core/condition';

interface CheckpointScreenProps {
  onComplete: () => void;
}

export function CheckpointScreen({ onComplete }: CheckpointScreenProps) {
  const { phase, day, money, economy, ownedCharacters } = useGameStore();
  const [eventResult, setEventResult] = useState<EventResult | null>(null);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;
    setProcessed(true);

    // 이벤트 컨텍스트 구성
    const context = {
      day,
      money,
      reputation: economy.reputation,
      characterCount: ownedCharacters.length,
      flags: {},
      phase,
    };

    // 랜덤 이벤트 체크 (30% 확률)
    const event = rollEvent(context);
    if (event) {
      const result = event.execute(context);
      setEventResult(result);

      // 효과 적용
      if (result.effects.money) {
        useGameStore.getState().addMoney(result.effects.money);
      }
      if (result.effects.reputation) {
        useGameStore.getState().addReputation(result.effects.reputation);
      }

      // mood 효과 처리
      if (result.effects.mood) {
        const store = useGameStore.getState();

        // characterId가 지정되면 특정 캐릭터만, 아니면 전체
        if (result.effects.characterId !== undefined) {
          const targetChar = store.getCharacter(result.effects.characterId);
          if (targetChar) {
            const newCondition = applyConditionChanges(targetChar.condition, {
              mood: result.effects.mood
            });
            store.updateCharacter(result.effects.characterId, { condition: newCondition });
          }
        } else {
          // 모든 소유 캐릭터에 적용
          ownedCharacters.forEach(char => {
            const newCondition = applyConditionChanges(char.condition, {
              mood: result.effects.mood!
            });
            store.updateCharacter(char.id, { condition: newCondition });
          });
        }
      }

      // flags 효과 처리
      if (result.effects.flags) {
        const store = useGameStore.getState();
        Object.entries(result.effects.flags).forEach(([key, value]) => {
          store.setFlag(parseInt(key), value);
        });
      }
    }
  }, [processed, ownedCharacters]);

  const phaseName = getPhaseName(phase);

  return (
    <div className="checkpoint-screen" style={{ padding: '2rem' }}>
      <h2 style={{ color: '#4CAF50', marginBottom: '1rem' }}>
        {phaseName} 체크포인트
      </h2>

      <div style={{ marginBottom: '1.5rem', color: '#ccc' }}>
        <p>Day {day} - {phaseName}</p>
      </div>

      {eventResult ? (
        <div style={{
          padding: '1rem',
          border: '1px solid #555',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          backgroundColor: '#1a1a2e',
        }}>
          <h3 style={{ color: '#ffc107', marginBottom: '0.5rem' }}>이벤트 발생!</h3>
          <p>{eventResult.message}</p>
          {eventResult.effects.money && (
            <p style={{ color: eventResult.effects.money > 0 ? '#4CAF50' : '#f44336' }}>
              자금: {eventResult.effects.money > 0 ? '+' : ''}{eventResult.effects.money}
            </p>
          )}
          {eventResult.effects.reputation && (
            <p style={{ color: eventResult.effects.reputation > 0 ? '#4CAF50' : '#f44336' }}>
              평판: {eventResult.effects.reputation > 0 ? '+' : ''}{eventResult.effects.reputation}
            </p>
          )}
          {eventResult.effects.mood && (
            <p style={{ color: eventResult.effects.mood > 0 ? '#4CAF50' : '#f44336' }}>
              기분: {eventResult.effects.mood > 0 ? '+' : ''}{eventResult.effects.mood}
              {eventResult.effects.characterId !== undefined ? ' (특정 캐릭터)' : ' (전체 캐릭터)'}
            </p>
          )}
        </div>
      ) : (
        <div style={{
          padding: '1rem',
          border: '1px solid #333',
          borderRadius: '8px',
          marginBottom: '1.5rem',
        }}>
          <p style={{ color: '#888' }}>특별한 일 없이 시간이 흘렀다.</p>
        </div>
      )}

      <button
        onClick={onComplete}
        style={{
          padding: '0.8rem 2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        계속
      </button>
    </div>
  );
}
