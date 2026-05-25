/**
 * 게임 데이터 로딩 커스텀 훅
 */

import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { createSampleCharacter } from '../utils/characterGenerator';
import type { Character } from '../types';

export function useGameData() {
  const { loadAvailableCharacters } = useGameStore();

  useEffect(() => {
    const loadGameData = async () => {
      try {
        // 1. CSV 기반 스페셜 캐릭터 로드
        const charactersData = await import('../data/json/characters.json');
        loadAvailableCharacters(charactersData.default as unknown as Character[]);

        // 2. 예시 캐릭터 추가
        const sampleChar = createSampleCharacter();
        loadAvailableCharacters([sampleChar]);

        console.log('[GAME DATA] Loaded special characters + 1 sample character');
      } catch (error) {
        console.error('캐릭터 데이터 로드 실패:', error);

        // CSV 로드 실패 시 예시 캐릭터만 사용
        const sampleChar = createSampleCharacter();
        loadAvailableCharacters([sampleChar]);

        console.log('[GAME DATA] Using sample character only (CSV failed)');
      }
    };

    loadGameData();
  }, [loadAvailableCharacters]);
}
