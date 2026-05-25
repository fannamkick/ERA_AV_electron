import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import type { Character } from '../types/character';
import abilitiesData from '../data/json/abilities.json';
import expData from '../data/json/exp.json';
import talentsData from '../data/json/talents.json';
import { calculateEstimatePrice, canSellCharacter, getCharacterJob, getAttendingPlace } from '../utils/characterEvaluation';
import './CharacterListScreen.css';

interface CharacterListScreenProps {
  selectedId: number | null;
  onBack: () => void;
}

// 능력 이름 매핑
const ABL_NAMES: { [key: number]: string } = {};
abilitiesData.forEach(abl => {
  ABL_NAMES[abl.id] = abl.name;
});

// 경험 이름 매핑
const EXP_NAMES: { [key: string]: string } = expData;

// 소질 이름 매핑
const TALENT_NAMES: { [key: number]: string } = {};
talentsData.forEach(talent => {
  TALENT_NAMES[talent.id] = talent.name;
});

function CharacterListScreen({ selectedId, onBack }: CharacterListScreenProps) {
  const { ownedCharacters, setAssistant } = useGameStore();

  if (ownedCharacters.length === 0) {
    return (
      <div className="character-list-screen">
        <div className="game-message">
          <p>소유한 캐릭터가 없습니다.</p>
          <p>배우 모집에서 캐릭터를 영입하세요.</p>
        </div>
      </div>
    );
  }

  const selectedCharacter = selectedId ? ownedCharacters.find(c => c.id === selectedId) : null;

  const handleToggleAssistant = (id: number, currentStatus: boolean) => {
    setAssistant(id, !currentStatus);
  };

  // HP/Vital 바 렌더링
  const renderStatBar = (current: number, max: number, width: number = 32) => {
    const percentage = max > 0 ? (current / max) * 100 : 0;
    const filledBlocks = Math.floor((percentage / 100) * width);
    const emptyBlocks = width - filledBlocks;
    return (
      <span className="stat-bar">
        [{'*'.repeat(filledBlocks)}{'.'.repeat(emptyBlocks)}]
      </span>
    );
  };

  // 각인 바 렌더링 (별 3개)
  const renderMarkBar = (level: number) => {
    const maxLevel = 3;
    return (
      <span className="mark-bar">
        [{'★'.repeat(level)}{'☆'.repeat(maxLevel - level)}]
      </span>
    );
  };

  // ABL 데이터를 그룹별로 정리 (ERB 로직 기반)
  const getAblGroups = (character: Character) => {
    const groups: number[][] = [];
    let currentGroup: number[] = [];

    // 0-39 범위 (일부 제외)
    for (let i = 0; i < 40; i++) {
      if ((i >= 4 && i <= 9) || (i >= 18 && i <= 19) ||
          (i >= 24 && i <= 29) || (i >= 34 && i <= 36)) {
        continue;
      }
      if (character.talent[122] && (i === 2 || i === 22 || i === 33)) {
        continue;
      }
      if (!character.talent[122] && (i === 23 || i === 34)) {
        continue;
      }
      const ablValue = character.abl?.[i] ?? 0;
      if (ablValue > 0) {
        currentGroup.push(i);
        if (currentGroup.length === 4) {
          groups.push(currentGroup);
          currentGroup = [];
        }
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
      currentGroup = [];
    }

    // 50-52 범위
    for (let i = 50; i <= 52; i++) {
      const ablValue = character.abl?.[i] ?? 0;
      if (ablValue > 0) {
        currentGroup.push(i);
        if (currentGroup.length === 4) {
          groups.push(currentGroup);
          currentGroup = [];
        }
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
      currentGroup = [];
    }

    // 70-81 범위
    for (let i = 70; i <= 81; i++) {
      const ablValue = character.abl?.[i] ?? 0;
      if (ablValue > 0) {
        currentGroup.push(i);
        if (currentGroup.length === 4) {
          groups.push(currentGroup);
          currentGroup = [];
        }
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  // TALENT를 텍스트로 표시 (ERB SHOW_TALENT 로직 기반)
  const renderTalents = (character: Character) => {
    const talents: string[] = [];

    if (character.talent[0]) {
      talents.push('처녀');
    } else if (!character.talent[122]) {
      if (!character.talent[2]) {
        talents.push('양구멍 관통 완료');
      } else {
        talents.push('비처녀');
      }
    }

    if (character.talent[1]) {
      talents.push('동정');
    }

    if (character.talent[2]) {
      talents.push('애널처녀');
    } else if (character.talent[0]) {
      talents.push('애널비처녀');
    }

    if (character.talent[85] === 1 && !character.talent[430]) {
      talents.push('연심');
    }
    if (character.talent[90] === 1) {
      talents.push('섹프');
    }

    if (character.talent[430] === 1) {
      talents.push('영원한 사랑');
    }

    if (character.talent[511] === 1 && !character.talent[505]) {
      talents.push('천사');
    }

    if (character.talent[440] === 1) {
      talents.push('절륜');
    }

    if (character.talent[76] === 1 && character.talent[422] === 1 &&
        character.talent[432] === 1 && !character.talent[511] && !character.talent[505]) {
      talents.push('흑갸루걸레');
    } else if (character.talent[76] === 1 && !character.talent[440]) {
      talents.push('음란');
    }

    if (character.talent[121] === 1) {
      talents.push('후타나리');
    }

    if (character.talent[180] === 1) {
      talents.push('업소여성');
    }

    if (character.talent[181] === 1) {
      talents.push('고급창부');
    }

    if (character.talent[184] === 1) {
      if (character.talent[190] === 1) {
        talents.push('깨끗한 교제');
      } else {
        talents.push('남친있음');
      }
    }

    if (character.talent[401] === 1) {
      talents.push('인기 AV배우');
    } else if (character.talent[400] === 1) {
      talents.push('AV배우');
    }

    if (character.talent[422] === 1 && !character.talent[76] &&
        character.talent[432] === 1 && !character.talent[511] && !character.talent[505]) {
      talents.push('흑갸루');
    } else if (character.talent[422] === 1 && character.talent[432] === 1 &&
               character.talent[511] === 1 && character.talent[505] === 1) {
      talents.push('갈색피부');
      talents.push('갸루계');
    } else if (character.talent[422] === 1 && !character.talent[432]) {
      talents.push('갈색피부');
    } else if (!character.talent[422] && character.talent[432] === 1) {
      talents.push('갸루계');
    }

    if (character.talent[425] === 1) {
      talents.push('섹프있음');
    }

    if (character.talent[35] === 1) {
      talents.push('수줍음');
    }

    if (character.talent[46] === 1) {
      talents.push('젖기힘듬');
    }

    if (character.talent[110] === 1) {
      talents.push('거유');
    } else if (character.talent[109] === 1) {
      talents.push('빈유');
    }

    if (character.talent[220] === 1) {
      talents.push('고등학생');
    }
    if (character.talent[326] === 1) {
      talents.push('패션모델');
    }

    return talents;
  };

  // 첫 키스 렌더링 함수
  const renderFirstKiss = (character: Character) => {
    const cflag16 = character.cflag[16];
    if (cflag16 === undefined || cflag16 < 0) return null;

    const age = character.cflag[820] || 0;
    const month = character.cflag[821] || 0;
    const day = character.cflag[825] || 0;
    const partner = character.cstr[1] || '';
    const cflag16Value = cflag16;

    let partnerText = '';
    if (cflag16Value === 0) partnerText = '기억 안나는 사람';
    else if (cflag16Value === 1) partnerText = partner || '이름도 모르는 사람';
    else if (cflag16Value === 16) partnerText = '당신';
    else if (cflag16Value === 8) partnerText = `${partner}(남친)`;
    else partnerText = '알 수 없는 사람';

    const bodyPart = character.cstr[80] || character.cstr[81] || character.cstr[82] || '';

    return (
      <p className="event-record">
        첫 키스: {age > 0 ? `${age}살` : '몇년 전'} {month > 0 ? `${month}월` : '어느 날'}{day > 0 ? ` ${day}일` : ''}에 {partnerText}{bodyPart ? `의 ${bodyPart}` : ''}에게♥
      </p>
    );
  };

  // 처녀상실 렌더링 함수
  const renderVirginityLoss = (character: Character) => {
    // 아직 처녀이거나, 남성이면 표시 안함
    if (character.talent[0] || character.talent[122]) return null;

    const abl10 = character.abl[10] || 0;
    const cflag15 = character.cflag[15];

    // ABL:10 < 3이고 플레이어 캐릭터가 아니면 간단히 "경험함"만 표시
    if (abl10 < 3 && character.id !== 0) {
      return (
        <p className="event-record">
          처녀상실: 경험함♥
        </p>
      );
    }

    // 상세 정보 표시
    const age = character.cflag[160] || 0;
    const month = character.cflag[161] || 0;
    const day = character.cflag[165] || 0;
    const partner = character.cstr[2] || '';

    let partnerText = '';
    if (cflag15 === 0) partnerText = '기억 안나는 사람';
    else if (cflag15 === 1) partnerText = partner || '이름도 모르는 사람';
    else if (cflag15 === 16) partnerText = '당신';
    else if (cflag15 === 8) partnerText = `${partner}(남친)`;
    else partnerText = '알 수 없는 사람';

    const bodyPart = character.cstr[81] || '';

    return (
      <p className="event-record">
        처녀상실: {age > 0 ? `${age}살` : '몇년 전'} {month > 0 ? `${month}월` : '어느 날'}{day > 0 ? ` ${day}일` : ''}에 {partnerText}{bodyPart ? `의 ${bodyPart}` : ''}에게♥
      </p>
    );
  };

  // 애널처녀상실 렌더링
  const renderAnalVirginityLoss = (character: Character) => {
    // 아직 애널처녀면 표시 안함
    if (character.talent[2]) return null;

    const abl10 = character.abl[10] || 0;
    const cflag616 = character.cflag[616];

    // ABL:10 < 3이고 플레이어 캐릭터가 아니면 간단히 "경험함"만 표시
    if (abl10 < 3 && character.id !== 0) {
      return (
        <p className="event-record">
          애널처녀상실: 경험함♥
        </p>
      );
    }

    // 상세 정보 표시
    const age = character.cflag[830] || 0;
    const month = character.cflag[831] || 0;
    const day = character.cflag[835] || 0;
    const partner = character.cstr[3] || '';

    let partnerText = '';
    if (cflag616 === 0) partnerText = '기억 안나는 사람';
    else if (cflag616 === 1) partnerText = partner || '이름도 모르는 사람';
    else if (cflag616 === 16) partnerText = '당신';
    else if (cflag616 === 8) partnerText = `${partner}(남친)`;
    else partnerText = '알 수 없는 사람';

    const bodyPart = character.cstr[82] || '';

    return (
      <p className="event-record">
        애널처녀상실: {age > 0 ? `${age}살` : '몇년 전'} {month > 0 ? `${month}월` : '어느 날'}{day > 0 ? ` ${day}일` : ''}에 {partnerText}{bodyPart ? `의 ${bodyPart}` : ''}에게♥
      </p>
    );
  };

  // 남자친구 정보
  const renderBoyfriend = (character: Character) => {
    if (!character.talent[184]) return null;

    const bfFirstName = character.cstr[7] || '';
    const bfLastName = character.cstr[8] || '';
    const bfJob = character.cstr[40] || '알 수 없음';

    return (
      <p className="event-record">
        남자친구: {bfFirstName} {bfLastName} ({bfJob})
      </p>
    );
  };

  return (
    <div className="character-list-screen">
      {selectedCharacter ? (
        <div className="character-detail">
          {/* 기본 정보 헤더 - 한 줄로 표시 */}
          <div className="character-header">
            <h2 className="character-main-name">
              {selectedCharacter.name}
              {selectedCharacter.cstr?.[9] && ` ${selectedCharacter.cstr[9]}`}
              {(() => {
                const estimatePrice = calculateEstimatePrice(selectedCharacter);
                const isSellable = canSellCharacter(selectedCharacter);
                const job = getCharacterJob(selectedCharacter);
                const attendingPlace = getAttendingPlace(selectedCharacter);
                const gender = (selectedCharacter.talent[122] === 1 || selectedCharacter.talent[413] === 1) ? '♂' : '♀';
                const monthlyFee = selectedCharacter.base?.[30] || 0;

                return (
                  <>
                    {estimatePrice > 0 && ` [평가액: ${estimatePrice.toLocaleString()}포인트]`}
                    {monthlyFee > 0 && selectedCharacter.talent[400] === 1 && !selectedCharacter.talent[504] && ` [매달 출연료: ${monthlyFee.toLocaleString()}포인트]`}
                    {selectedCharacter.nickname && ` 예명: ${selectedCharacter.nickname}`}
                    {` 【성별: ${gender}】`}
                    {` 【직업: ${job}】`}
                    {isSellable && ' (売却可)'}
                    {selectedCharacter.abl[10] && selectedCharacter.abl[10] >= 3 && ` 다니고 있는 곳: ${attendingPlace}`}
                  </>
                );
              })()}
            </h2>
          </div>

          {/* 초체험 기록 및 남자친구 정보 */}
          {(selectedCharacter.cflag[16] !== undefined && selectedCharacter.cflag[16] >= 0) ||
           !selectedCharacter.talent[0] ||
           !selectedCharacter.talent[2] ||
           selectedCharacter.talent[184] ? (
            <>
              <div className="section-divider">‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥</div>
              <div className="event-records-section">
                {renderFirstKiss(selectedCharacter)}
                {renderVirginityLoss(selectedCharacter)}
                {renderAnalVirginityLoss(selectedCharacter)}
                {renderBoyfriend(selectedCharacter)}
              </div>
            </>
          ) : null}

          {/* BASE 스탯 바 (체력치, 기력치, 매력치, 호감도) */}
          <div className="base-stats">
            <div className="stat-row">
              <span className="stat-label">체력치</span>
              {renderStatBar(selectedCharacter.base?.[0] || 0, selectedCharacter.maxBase?.[0] || 1)}
              <span className="stat-value">
                ({selectedCharacter.base?.[0] || 0}/{selectedCharacter.maxBase?.[0] || 0})
              </span>
            </div>

            <div className="stat-row">
              <span className="stat-label">기력치</span>
              {renderStatBar(selectedCharacter.base?.[1] || 0, selectedCharacter.maxBase?.[1] || 1)}
              <span className="stat-value">
                ({selectedCharacter.base?.[1] || 0}/{selectedCharacter.maxBase?.[1] || 0})
              </span>
            </div>

            {selectedCharacter.base?.[2] !== undefined && (
              <div className="stat-row">
                <span className="stat-label">매력치</span>
                {renderStatBar(selectedCharacter.base[2] || 0, 80)}
                <span className="stat-value">
                  ({selectedCharacter.base[2] || 0}/80)
                </span>
              </div>
            )}

            {selectedCharacter.cflag?.[100] !== undefined && (
              <div className="stat-row">
                <span className="stat-label">호감도</span>
                {renderStatBar(selectedCharacter.cflag[100] || 0, 200)}
                <span className="stat-value">
                  ({selectedCharacter.cflag[100] || 0}%)
                </span>
              </div>
            )}
          </div>

          {/* 소질 (TALENT) - 텍스트로 표시 */}
          {(() => {
            const talentList = renderTalents(selectedCharacter);
            return talentList.length > 0 && (
              <>
                <div className="section-divider">‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥</div>
                <div className="talent-section">
                  <h3 className="section-title">특성 및 스킬 레벨</h3>
                  <div className="talent-text-list">
                    {talentList.map((talent, idx) => (
                      <span key={idx} className="talent-text">
                        [{talent}]
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}

          {/* ABL (능력치) */}
          {(() => {
            const ablGroups = getAblGroups(selectedCharacter);
            return ablGroups.length > 0 && (
              <>
                <div className="section-divider">‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥</div>
                <div className="abl-section">
                  {ablGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="abl-row">
                      {group.map((ablId, idx) => (
                        <span key={ablId}>
                          {ABL_NAMES[ablId] || `ABL:${ablId}`} - {selectedCharacter.abl[ablId]}LV{idx < group.length - 1 ? ' / ' : ''}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          {/* MARK (각인) - 항상 4개 표시 */}
          <div className="section-divider">‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥</div>
          <div className="mark-section">
            <span className="mark-item">
              고통:LV{selectedCharacter.mark?.[0] || 0} {renderMarkBar(selectedCharacter.mark?.[0] || 0)}
            </span>
            <span className="mark-item">
              쾌락:LV{selectedCharacter.mark?.[1] || 0} {renderMarkBar(selectedCharacter.mark?.[1] || 0)}
            </span>
            <span className="mark-item">
              굴복:LV{selectedCharacter.mark?.[2] || 0} {renderMarkBar(selectedCharacter.mark?.[2] || 0)}
            </span>
            <span className="mark-item">
              반발:LV{selectedCharacter.mark?.[3] || 0} {renderMarkBar(selectedCharacter.mark?.[3] || 0)}
            </span>
          </div>

          {/* EXP (경험치) */}
          {selectedCharacter.exp && Object.keys(selectedCharacter.exp).length > 0 && (
            <>
              <div className="section-divider">‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥</div>
              <div className="exp-section">
                <h3 className="section-title">경험치 및 구슬</h3>
                <div className="exp-list">
                  {Object.entries(selectedCharacter.exp)
                    .filter(([_, value]) => value > 0)
                    .map(([key, value], idx, arr) => (
                      <span key={key} className="exp-item">
                        {EXP_NAMES[key] || `EXP:${key}`}:{value}{idx < arr.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* JUEL (구슬) - 슬래시로 구분 */}
          <div className="juel-section">
            <p className="juel-line">
              쾌C의 구슬: {(selectedCharacter.juel?.[0] || 0).toLocaleString()} / 쾌V의 구슬: {(selectedCharacter.juel?.[1] || 0).toLocaleString()} / 쾌A의 구슬: {(selectedCharacter.juel?.[2] || 0).toLocaleString()} / 쾌B의 구슬: {(selectedCharacter.juel?.[14] || 0).toLocaleString()}
            </p>

            <p className="juel-line">
              온순의 구슬: {(selectedCharacter.juel?.[4] || 0).toLocaleString()} / 욕정의 구슬: {(selectedCharacter.juel?.[5] || 0).toLocaleString()} / 굴복의 구슬: {(selectedCharacter.juel?.[6] || 0).toLocaleString()} / 습득의 구슬: {(selectedCharacter.juel?.[7] || 0).toLocaleString()}
            </p>

            <p className="juel-line">
              치정의 구슬: {(selectedCharacter.juel?.[8] || 0).toLocaleString()} / 고통의 구슬: {(selectedCharacter.juel?.[9] || 0).toLocaleString()} / 공포의 구슬: {(selectedCharacter.juel?.[10] || 0).toLocaleString()} / 부정의 구슬: {(selectedCharacter.juel?.[100] || 0).toLocaleString()}
            </p>
          </div>

          <div className="section-divider">‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥</div>

          {/* 조수 설정 */}
          <div className="detail-actions">
            <button
              className={`assistant-toggle ${selectedCharacter.isAssistant ? 'active' : ''}`}
              onClick={() => handleToggleAssistant(selectedCharacter.id, selectedCharacter.isAssistant)}
            >
              {selectedCharacter.isAssistant ? '조수 해제' : '조수로 설정'}
            </button>
          </div>
        </div>
      ) : (
        <div className="game-message">
          <h3>캐릭터를 선택하세요</h3>
          <p>오른쪽 패널에서 캐릭터를 선택하세요.</p>
        </div>
      )}
    </div>
  );
}

export default CharacterListScreen;
