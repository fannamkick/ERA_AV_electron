import { useGameStore } from '../stores/gameStore';
import './CharacterDetail.css';
import { GameData } from '../constants';
import { calculateEstimatePrice, canSellCharacter, getCharacterJob, getAttendingPlace } from '../utils/characterEvaluation';

function CharacterDetail() {
  const characters = useGameStore((state) => state.characters);
  const currentCharacterId = useGameStore((state) => state.currentCharacter);

  const character = characters.find((c) => c.id === currentCharacterId);

  if (!character) {
    return (
      <div className="character-detail-empty">
        <p>캐릭터를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="character-detail">
      <div className="character-header">
        <h2>{character.name}</h2>
        {character.callName && <p className="call-name">호칭: {character.callName}</p>}
      </div>

      {/* 기본 정보 */}
      <div className="info-section">
        <p>나이: {character.base[9]}세</p>
        <p>키: {character.base[20]}cm / 체중: {character.base[21]}kg</p>
        <p>3사이즈: B{character.base[22]} W{character.base[23]} H{character.base[24]}</p>
        <p>매력치: {character.base[31] || 0}</p>
      </div>

      {/* 특성 */}
      <div className="section">
        <h3>특성</h3>
        <div className="talent-list">
          {Object.keys(character.talent)
            .map(Number)
            .filter(id => character.talent[id] === 1)
            .map(id => (
              <span key={id} className="talent-tag">
                {GameData.talents.getName(id)}
              </span>
            ))}
        </div>
      </div>

      {/* 능력치 */}
      <div className="section">
        <h3>능력치</h3>
        <div className="ability-list">
          {Object.entries(character.abl)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([id, value]) => (
              <div key={id} className="ability-item">
                <span>{GameData.abilities.getName(Number(id))}</span>
                <span>LV{value}</span>
              </div>
            ))}
        </div>
      </div>

      {/* 경험 */}
      <div className="section">
        <h3>경험</h3>
        <div className="exp-list">
          {Object.entries(character.exp || {})
            .filter(([_, value]) => value && value > 0)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([id, value]) => (
              <div key={id} className="exp-item">
                <span>{GameData.experience.getName(Number(id))}</span>
                <span>{value}</span>
              </div>
            ))}
        </div>
      </div>

      {/* 파라미터 */}
      <div className="section">
        <h3>파라미터</h3>
        <div className="param-list">
          {Object.entries(character.palam || {})
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([id, value]) => (
              <div key={id} className="param-item">
                <span>{GameData.parameters.getName(Number(id))}</span>
                <span>{value}</span>
              </div>
            ))}
        </div>
      </div>

      {/* 각인 */}
      <div className="section">
        <h3>각인</h3>
        <div className="mark-list">
          <p>고통: LV{character.mark[0] || 0}</p>
          <p>쾌락: LV{character.mark[1] || 0}</p>
          <p>반발: LV{character.mark[2] || 0}</p>
          <p>굴복: LV{character.mark[3] || 0}</p>
        </div>
      </div>

      {/* 구슬 */}
      <div className="section">
        <h3>구슬</h3>
        <div className="juel-list">
          {Object.entries(character.juel || {})
            .filter(([_, value]) => value && value > 0)
            .map(([id, value]) => (
              <p key={id}>구슬[{id}]: {value}</p>
            ))}
        </div>
      </div>

      {/* CFLAG */}
      <div className="section">
        <h3>플래그</h3>
        <div className="flag-list">
          {Object.entries(character.cflag || {})
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([id, value]) => (
              <p key={id}>CFLAG[{id}]: {value}</p>
            ))}
        </div>
      </div>

      {/* CSTR */}
      <div className="section">
        <h3>문자열 데이터</h3>
        <div className="string-list">
          {Object.entries(character.cstr || {})
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([id, value]) => (
              <p key={id}>CSTR[{id}]: {value}</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
