import { useState, useMemo } from 'react';
import { useGameStore } from '../stores/gameStore';
import items from '../data/json/items.json';
import './ShopScreen.css';

interface ShopScreenProps {
  onBack: () => void;
}

interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: 'tool' | 'consumable' | 'costume' | 'special' | 'magic';
}

function ShopScreen({ onBack }: ShopScreenProps) {
  const {
    money,
    buyItem,
    getItemCount,
    flags,
    difficulty,
    masterTalents,
    masterAbilities,
    ownedCharacters,
    assistantIds
  } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'tool', name: '도구' },
    { id: 'consumable', name: '소모품' },
    { id: 'costume', name: '의상' },
    { id: 'special', name: '특수' },
    { id: 'magic', name: '마법 아이템' }
  ];

  // 조합지식 보유 여부 체크 (마스터 또는 조수 중 1명이라도 보유)
  const hasAlchemyKnowledge = (): boolean => {
    // 마스터가 조합지식 보유
    if (masterTalents[55]) return true;

    // 조수 중 조합지식 보유자가 있는지 확인
    // TODO: 캐릭터 특성 시스템 구현 후 체크
    // const assistants = ownedCharacters.filter(c => assistantIds.includes(c.id));
    // return assistants.some(c => c.talents?.[55]);

    return false;
  };

  // 아이템 판매 가능 여부 체크 (SALEITEM_CHECK 로직)
  const isItemAvailable = (item: Item): boolean => {
    const itemId = item.id;
    const owned = getItemCount(itemId);

    // 기본 판매 아이템 (ID 0-23, 22 제외) - 이미 소유하면 판매 안함
    if (itemId >= 0 && itemId <= 23) {
      if (itemId === 22) return false; // 개 - 특수 아이템 제외
      if (owned > 0) return false; // 비소모품은 1개만 구매 가능

      // ID 21: 전극플러그 - EXTRA 전용 (TALENT:MASTER:93 필요)
      if (itemId === 21) {
        return masterTalents[93] === 1;
      }

      // ID 17: 착유기 - EXTRA 또는 NORMAL 이하에서만
      if (itemId === 17) {
        return difficulty === 9 || difficulty <= 2;
      }

      // ID 20: 애널비즈 - EXTRA 또는 NORMAL 이하에서만
      if (itemId === 20) {
        return difficulty === 9 || difficulty <= 2;
      }

      return true; // 나머지는 기본 판매
    }

    // ID 23: 본디지 - EXTRA 전용
    if (itemId === 23) {
      if (owned > 0) return false;
      return masterTalents[93] === 1;
    }

    // 소모품 (99개까지)
    const consumableIds = [24, 25, 29, 34];
    if (consumableIds.includes(itemId)) {
      return owned < 99;
    }

    // ID 30: 영양제 - 조합지식 필요
    if (itemId === 30) {
      return hasAlchemyKnowledge();
    }

    // 약품류 - 조합지식 필요
    const medicineIds = [26, 27, 31, 40, 41, 43];
    if (medicineIds.includes(itemId)) {
      if (!hasAlchemyKnowledge()) return false;

      // 소모품인 경우 99개 제한
      if ([26, 27].includes(itemId)) {
        if (owned >= 99) return false;
      }

      // ID 31: 향 - 하루 구매 제한
      if (itemId === 31) {
        const dailyLimit = difficulty === 3 ? 3 : difficulty === 4 ? 1 : 99;
        const todayBought = flags[61] || 0;
        if (todayBought >= dailyLimit) return false;
      }

      // ID 41: 강모제 - FLAG:36 필요 (음모 설정 사용)
      if (itemId === 41) {
        if (!flags[36]) return false;
      }

      return true;
    }

    // 특수 아이템 (1개만)
    if (itemId === 37) { // 러브스코프
      return owned === 0;
    }

    if (itemId === 38) { // 부스터메일
      if (owned > 0) return false;
      // HARD/POWERFUL에서는 판매 안함
      if (difficulty === 3 || difficulty === 4) return false;
      return true;
    }

    if (itemId === 39) { // 비밀지식
      return owned === 0;
    }

    if (itemId === 42) { // 조합지식
      return owned === 0;
    }

    if (itemId === 52) { // 기교Lv
      const technique = masterAbilities[12] || 0;
      const maxTechnique = 10;
      const fallenCount = flags[30] || 0; // 타락시킨 인원

      // 최대 10레벨, 타락시킨 인원+2까지만
      if (technique >= maxTechnique) return false;
      if (technique > fallenCount + 1) return false;

      return true;
    }

    // 마법 아이템 (ID 200~214)
    // 마법 아이템은 상점에서 판매하지 않음
    // 촉수생물(90) + 파란마술서(91)로 알을 낳으면 획득 가능
    if (itemId >= 200) {
      return false;
    }

    // ID 90: 촉수생물 - 레이첼 연구소에서 구매 (비밀지식 필요)
    if (itemId === 90) {
      return false;
    }

    // ID 91: 파란마술서 - 특수 획득 경로 (상점 판매 안함)
    if (itemId === 91) {
      return false;
    }

    return false; // 기타 아이템은 판매 안함
  };

  // 필터링된 아이템 목록
  const availableItems = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? items
      : items.filter(item => item.category === selectedCategory);

    return filtered.filter(item => isItemAvailable(item));
  }, [selectedCategory, getItemCount, flags, difficulty, masterTalents, masterAbilities]);

  const handleBuy = (item: Item) => {
    const success = buyItem(item.id, item.price);
    if (success) {
      console.log(`[SHOP] ${item.name} 구매 성공`);
    } else {
      alert('소지금이 부족합니다!');
    }
  };

  return (
    <div className="shop-screen">
      <div className="info-bar">
        <h2>상점</h2>
        <div className="money-display">
          <span className="label">소지금:</span>
          <span className="value">₩{money.toLocaleString()}</span>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 아이템 목록 */}
      <div className="shop-content">
        <div className="item-grid">
          {availableItems.map((item) => {
            const owned = getItemCount(item.id);
            const canAfford = money >= item.price;

            return (
              <div key={item.id} className="shop-item-card">
                <div className="item-info">
                  <div className="item-header">
                    <span className="item-name">{item.name}</span>
                    {owned > 0 && <span className="item-owned">보유: {owned}개</span>}
                  </div>
                  {item.description && (
                    <div className="item-desc">{item.description}</div>
                  )}
                  <div className="item-prices">
                    <span className="item-price">가격: ₩{item.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <button
                    className="buy-button"
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                  >
                    구매
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shop-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default ShopScreen;
