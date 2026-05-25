import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import './FilmingScreen.css';

interface FilmingScreenProps {
  onBack: () => void;
}

type FilmGenre = 'soft' | 'normal' | 'hard' | 'fetish';

function FilmingScreen({ onBack }: FilmingScreenProps) {
  const { ownedCharacters, money, addMoney } = useGameStore();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<FilmGenre>('normal');

  const genres = [
    { id: 'soft' as FilmGenre, name: '소프트', basePrice: 5000 },
    { id: 'normal' as FilmGenre, name: '일반', basePrice: 10000 },
    { id: 'hard' as FilmGenre, name: '하드', basePrice: 15000 },
    { id: 'fetish' as FilmGenre, name: '페티시', basePrice: 12000 }
  ];

  const handleFilming = () => {
    if (!selectedCharacter) {
      return;
    }

    const genre = genres.find(g => g.id === selectedGenre);
    if (!genre) return;

    const earnings = genre.basePrice + Math.floor(Math.random() * 5000);
    addMoney(earnings);
    setSelectedCharacter(null);
  };

  if (ownedCharacters.length === 0) {
    return (
      <div className="filming-screen">
        <div className="info-bar">
          <h2>AV 촬영</h2>
          <div className="money-display">
            <span className="label">소지금:</span>
            <span className="value">₩{money.toLocaleString()}</span>
          </div>
        </div>
        <div className="game-message">
          <p>촬영할 캐릭터가 없습니다.</p>
          <p>노예 시장에서 캐릭터를 구매하세요.</p>
        </div>
        <div className="filming-actions">
          <button onClick={onBack}>돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="filming-screen">
      <div className="info-bar">
        <h2>AV 촬영</h2>
        <div className="money-display">
          <span className="label">소지금:</span>
          <span className="value">₩{money.toLocaleString()}</span>
        </div>
      </div>

      <div className="filming-content">
        <div className="filming-setup">
          <div className="setup-section">
            <h3>캐릭터 선택</h3>
            <div className="character-select-grid">
              {ownedCharacters.map((char) => (
                <button
                  key={char.id}
                  className={`char-select-btn ${selectedCharacter === char.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCharacter(char.id)}
                >
                  <div className="char-avatar-small">{char.name[0]}</div>
                  <div className="char-name-small">{char.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="setup-section">
            <h3>장르 선택</h3>
            <div className="genre-list">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className={`genre-btn ${selectedGenre === genre.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGenre(genre.id)}
                >
                  <div className="genre-name">{genre.name}</div>
                  <div className="genre-price">기본 {genre.basePrice.toLocaleString()}엔</div>
                </button>
              ))}
            </div>
          </div>

          <button
            className="filming-start-btn"
            onClick={handleFilming}
            disabled={!selectedCharacter}
          >
            촬영 시작
          </button>
        </div>

        <div className="filming-info">
          <h3>촬영 정보</h3>
          <div className="info-box">
            <p>AV 촬영을 통해 수익을 얻을 수 있습니다.</p>
            <p>장르에 따라 기본 수익이 다릅니다.</p>
            <p>캐릭터의 능력치에 따라 추가 수익이 발생합니다.</p>
          </div>
        </div>
      </div>

      <div className="filming-actions">
        <button onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}

export default FilmingScreen;
