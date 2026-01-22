import { useState } from 'react';
import { useGameStore, type Difficulty } from '../stores/gameStore';
import './DifficultySelect.css';

interface DifficultySelectProps {
  onComplete: () => void;
}

interface DifficultyInfo {
  id: Difficulty;
  name: string;
  weeks: number;
  target: number;
  money: number;
  description: string;
}

function DifficultySelect({ onComplete }: DifficultySelectProps) {
  const { setDifficulty } = useGameStore();
  const [showDescription, setShowDescription] = useState(false);

  const difficulties: DifficultyInfo[] = [
    {
      id: 1,
      name: 'EASY',
      weeks: 120,
      target: 3000000,
      money: 2000,
      description: '기한 120주(행동횟수 +40회), 목표 금액 3,000,000Pt (NORMAL의 3/5)\n초기 포인트 2000pt, 주인공 기교 +1, 여배우 후보 추가\n※ EASY 모드로 시작한 데이터는 실적을 달성할 수 없습니다'
    },
    {
      id: 2,
      name: 'NORMAL',
      weeks: 100,
      target: 5000000,
      money: 1000,
      description: '기한 100주, 목표 금액 5,000,000Pt\n초기 포인트 1000pt\n기본 난이도입니다'
    }
  ];

  const handleSelect = (difficulty: Difficulty) => {
    console.log(`[DIFFICULTY] Selected: ${difficulty}`);
    setDifficulty(difficulty);
    onComplete();
  };

  if (showDescription) {
    return (
      <div className="difficulty-select">
        <h2>모드 설명</h2>
        <div className="difficulty-descriptions">
          {difficulties.map(diff => (
            <div key={diff.id} className="difficulty-card">
              <h3>{diff.name}</h3>
              <div className="difficulty-stats">
                <p>기한: {diff.weeks}주</p>
                <p>목표: ₩{diff.target.toLocaleString()}</p>
                <p>초기 자금: ₩{diff.money.toLocaleString()}</p>
              </div>
              <p className="difficulty-desc">{diff.description}</p>
            </div>
          ))}
        </div>
        <button
          className="back-button"
          onClick={() => setShowDescription(false)}
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="difficulty-select">
      <div className="game-intro">
        <p>이 게임은 성적으로 과격한 묘사가 다수 포함되어 있어,</p>
        <p>18세 미만인 분이나, 현실과 가상의 구별을 할 수 없는 분,</p>
        <p>자신의 행동에 책임을 가질 수 없는 분의 플레이는 금지합니다.</p>
        <p>또한 이 게임에 등장하는 모든 등장인물들은 모두 만 19세 이상입니다.</p>
        <p>이상의 사항을 확인하신 후, 게임을 시작해주십시오.</p>
      </div>

      <h2>★★ 모드를 선택해주십시오 ★★</h2>

      <div className="difficulty-options">
        {difficulties.map(diff => (
          <button
            key={diff.id}
            className="difficulty-button"
            onClick={() => handleSelect(diff.id)}
          >
            <span className="difficulty-name">{diff.name}</span>
            <span className="difficulty-info">
              ({diff.weeks}주 제한, 목표 금액 ₩{diff.target.toLocaleString()})
            </span>
          </button>
        ))}
      </div>

      <button
        className="help-button"
        onClick={() => setShowDescription(true)}
      >
        [9] 모드 설명을 읽는다
      </button>
    </div>
  );
}

export default DifficultySelect;
