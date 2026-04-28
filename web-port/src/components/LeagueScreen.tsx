/**
 * 리그 화면
 * 리그 순위, 시즌 정보, 포인트 표시
 */

import { useGameStore } from '../stores/gameStore';
import { getDivisionName } from '../gameplay/league';

interface LeagueScreenProps {
  onBack: () => void;
}

export function LeagueScreen({ onBack }: LeagueScreenProps) {
  const { league, weeklyStats } = useGameStore();

  const divisionColors: Record<string, string> = {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: divisionColors[league.division], marginBottom: '1.5rem' }}>
        {getDivisionName(league.division)} 리그
      </h2>

      {/* 현재 상태 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
          <div style={{ color: '#888', fontSize: '0.85rem' }}>시즌</div>
          <div style={{ fontSize: '1.5rem', color: '#fff' }}>
            {league.season}시즌 / {league.seasonWeek}주차
          </div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
          <div style={{ color: '#888', fontSize: '0.85rem' }}>순위</div>
          <div style={{ fontSize: '1.5rem', color: '#fff' }}>
            {league.rank}위
          </div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
          <div style={{ color: '#888', fontSize: '0.85rem' }}>총 포인트</div>
          <div style={{ fontSize: '1.5rem', color: '#4CAF50' }}>
            {league.points}pt
          </div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px' }}>
          <div style={{ color: '#888', fontSize: '0.85rem' }}>이번 주</div>
          <div style={{ fontSize: '1.5rem', color: '#2196F3' }}>
            {league.weeklyPoints}pt
          </div>
        </div>
      </div>

      {/* 이번 주 실적 */}
      <h3 style={{ color: '#ccc', marginBottom: '0.5rem' }}>이번 주 실적</h3>
      <div style={{
        padding: '1rem',
        border: '1px solid #333',
        borderRadius: '8px',
        marginBottom: '1.5rem',
      }}>
        <p>수입: <span style={{ color: '#4CAF50' }}>₩{weeklyStats.income.toLocaleString()}</span></p>
        <p>지출: <span style={{ color: '#f44336' }}>₩{weeklyStats.expense.toLocaleString()}</span></p>
        <p>조교 포인트: {weeklyStats.trainingPoints}</p>
        <p>영업 손님: {weeklyStats.brothelCustomers}명</p>
        <p>캐릭터 판매: {weeklyStats.charactersSold}건</p>
      </div>

      <button
        onClick={onBack}
        style={{
          padding: '0.6rem 1.5rem',
          backgroundColor: '#333',
          color: '#ccc',
          border: '1px solid #555',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        돌아가기
      </button>
    </div>
  );
}
