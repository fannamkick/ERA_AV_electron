import { useGameStore } from '../stores/gameStore';
import './CharacterList.css';

function CharacterList() {
  const characters = useGameStore((state) => state.characters);
  const currentCharacter = useGameStore((state) => state.currentCharacter);
  const setCurrentCharacter = useGameStore((state) => state.setCurrentCharacter);

  if (characters.length === 0) {
    return (
      <div className="character-list-empty">
        <p>캐릭터 데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 주요 특성 아이콘 가져오기
  const getTalentIcon = (char: any) => {
    if (char.talent[220]) return '🎓'; // 고등학생
    if (char.talent[326]) return '👗'; // 패션모델
    if (char.talent[400] || char.talent[401]) return '🎥'; // AV배우
    if (char.talent[180] || char.talent[181]) return '💋'; // 업소여성/고급창부
    return '👩';
  };

  // 주요 특성 표시 (최대 3개)
  const getMainTalents = (char: any) => {
    const talents = [];
    if (char.talent[0]) talents.push('처녀');
    if (char.talent[113]) talents.push('매력');
    if (char.talent[91]) talents.push('매혹');
    if (char.talent[110]) talents.push('거유');
    if (char.talent[114]) talents.push('폭유');
    if (char.talent[85]) talents.push('연심');
    if (char.talent[76]) talents.push('음란');
    return talents.slice(0, 3);
  };

  return (
    <div className="character-list">
      {characters.map((char) => {
        const mainTalents = getMainTalents(char);
        const height = char.base[20];
        const weight = char.base[21];
        const breastCup = char.cflag[170];
        const bust = char.base[22];
        const waist = char.base[23];
        const hips = char.base[24];
        const charm = char.base[31];
        const bloodType = char.cstr?.[9];

        return (
          <div
            key={char.id}
            className={`character-card ${currentCharacter === char.id ? 'active' : ''}`}
            onClick={() => setCurrentCharacter(char.id)}
          >
            <div className="character-avatar">
              {getTalentIcon(char)}
            </div>
            <div className="character-info">
              <div className="character-name">{char.name}</div>
              <div className="character-details">
                <small>
                  {char.cflag[41] || 18}세
                  {bloodType && ` | ${bloodType}형`}
                  {` | HP: ${char.base[0] || 0}/${char.maxBase[0] || 0}`}
                </small>
              </div>
              <div className="character-details">
                <small>
                  {height && `${height}cm`}
                  {weight && ` | ${weight}kg`}
                  {breastCup && ` | ${breastCup}컵`}
                  {charm !== undefined && ` | 매력 ${charm}`}
                </small>
              </div>
              {(bust || waist || hips) && (
                <div className="character-details">
                  <small>
                    {bust && `B${bust}`}
                    {waist && `-W${waist}`}
                    {hips && `-H${hips}`}
                  </small>
                </div>
              )}
              {mainTalents.length > 0 && (
                <div className="character-talents">
                  <small>{mainTalents.join(', ')}</small>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharacterList;
