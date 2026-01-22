import { useState } from 'react';
import './TipsScreen.css';

interface TipsScreenProps {
  onBack: () => void;
}

type TipsCategory = 'main' | 'characlear' | 'talent' | 'beauty' | 'mission' | 'achievement' | 'hint' | 'extrachara' | 'pregnancy';

function TipsScreen({ onBack }: TipsScreenProps) {
  const [currentCategory, setCurrentCategory] = useState<TipsCategory>('main');

  const renderMain = () => (
    <>
      <h2>TIPS</h2>
      <div className="tips-menu">
        <button onClick={() => setCurrentCategory('characlear')}>여배우 함락・은퇴 조건</button>
        <button onClick={() => setCurrentCategory('talent')}>특수 소질 획득 방법</button>
        <button onClick={() => setCurrentCategory('beauty')}>매력치</button>
        <button onClick={() => setCurrentCategory('mission')}>미션</button>
        <button onClick={() => setCurrentCategory('achievement')}>실적 해금</button>
        <button onClick={() => setCurrentCategory('hint')}>초심자 강좌</button>
        <button onClick={() => setCurrentCategory('extrachara')}>특수 캐릭터</button>
        <button onClick={() => setCurrentCategory('pregnancy')}>임신 시스템</button>
      </div>
    </>
  );

  const renderMission = () => (
    <div className="tips-detail">
      <h3>◆미션◆</h3>
      <p>지정된 캐릭터를 지정된 조건으로 육성하는 모드</p>
      <p>난이도는 SS→F까지 7단계가 있고 난이도에 따라 습득 포인트와 공헌도가 달라진다</p>

      <h4>◆미션 해방 조건◆</h4>
      <p>미션을 해방하려면 아래의 조건을 만족해야 한다</p>
      <ul>
        <li>키류 엘렌과 키류 카논이【영원한 사랑】을 습득했다</li>
        <li>※키류 엘렌과 계약하려면 실적「좀 더 누나!제대로 하자」을 달성해야 한다</li>
      </ul>
      <p>이상의 조건을 만족하고 키류 조직 사무소에서「엘렌을 만나러 간다」를 실행하면 해방된다</p>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderAchievement = () => (
    <div className="tips-detail">
      <h3>◆실적◆</h3>
      <p>특정 조건을 만족하면 해금된다</p>
      <p>실적을 해금하면 보통 나오지 않는 특수한 캐릭터나 소질을 얻을 수 있다</p>

      <h4>◆실적 해금 방법◆</h4>

      <div className="achievement-list">
        <div className="achievement-item">
          <strong>실적번호 00: 제비</strong>
          <p>함락시킨 여배우가 10명 이상</p>
          <p className="note">※단 레이첼・파라디수스의 비약에 의해【연심】【음란】을 습득한 캐릭터는 카운트하지 않는다</p>
        </div>

        <div className="achievement-item">
          <strong>실적번호 01: 로리큐브</strong>
          <p>15살 이하 혹은【동안】을 가진 캐릭터를 4명 이상 조수가능으로 만든다</p>
          <p className="note">※단【음마】【안드로이드】【천사】를 습득한 캐릭터는 카운트되지 않는다</p>
        </div>
      </div>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderHint = () => (
    <div className="tips-detail">
      <h3>◆초심자 강좌◆</h3>

      <h4>1. 게임의 기본</h4>
      <p>이 게임은 조교사무소를 운영하는 게임입니다.</p>
      <ul>
        <li>노예 시장에서 캐릭터를 구매하세요</li>
        <li>조교를 통해 캐릭터를 육성하세요</li>
        <li>창관이나 AV 촬영으로 수익을 얻으세요</li>
        <li>상점에서 필요한 아이템을 구매하세요</li>
      </ul>

      <h4>2. 조교의 기본</h4>
      <p>조교는 캐릭터의 능력치와 소질을 변화시킵니다.</p>
      <ul>
        <li>쾌감 파라미터를 높여서 절정시키세요</li>
        <li>반복적인 조교로 감각을 개발하세요</li>
        <li>아이템을 활용하면 더 효과적입니다</li>
      </ul>

      <h4>3. 수익 얻기</h4>
      <p>캐릭터를 창관이나 AV 촬영에 보내서 수익을 얻을 수 있습니다.</p>
      <ul>
        <li>높은 능력치를 가진 캐릭터일수록 수익이 많습니다</li>
        <li>특수한 소질을 가진 캐릭터는 프리미엄을 받습니다</li>
      </ul>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderBeauty = () => (
    <div className="tips-detail">
      <h3>◆매력치에 대해서◆</h3>
      <p>매력치는 캐릭터의 인기도를 나타내는 수치입니다.</p>

      <h4>매력치가 높으면</h4>
      <ul>
        <li>창관과 AV 촬영에서 더 많은 수익을 얻습니다</li>
        <li>특정 이벤트가 발생하기 쉬워집니다</li>
        <li>스카우트되기 쉬워집니다</li>
      </ul>

      <h4>매력치를 올리는 방법</h4>
      <ul>
        <li>조교로 능력치를 높인다</li>
        <li>특수한 소질을 습득한다</li>
        <li>미션을 클리어한다</li>
        <li>성공적인 영업을 반복한다</li>
      </ul>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderTalent = () => (
    <div className="tips-detail">
      <h3>◆특수한 소질의 획득 방법◆</h3>
      <p>일부 소질은 특별한 방법으로만 획득할 수 있습니다.</p>

      <div className="talent-list">
        <div className="talent-item">
          <strong>【연심】</strong>
          <p>호감도를 최대치까지 올린다</p>
        </div>

        <div className="talent-item">
          <strong>【음란】</strong>
          <p>모든 쾌감 파라미터를 최대치로 만든다</p>
        </div>

        <div className="talent-item">
          <strong>【복종】</strong>
          <p>굴복 파라미터를 최대치로 만든다</p>
        </div>

        <div className="talent-item">
          <strong>【임신 체질】</strong>
          <p>임신을 3회 이상 경험한다</p>
        </div>
      </div>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderCharaclear = () => (
    <div className="tips-detail">
      <h3>◆여배우 후보의 함락・은퇴 가능 조건◆</h3>
      <p>캐릭터를 함락시키거나 은퇴시키기 위한 조건입니다.</p>

      <h4>함락 조건</h4>
      <ul>
        <li>연애도 1000 이상</li>
        <li>【연심】소질 습득</li>
        <li>또는 【음란】+【복종】 소질 습득</li>
      </ul>

      <h4>은퇴 조건</h4>
      <ul>
        <li>함락 상태일 것</li>
        <li>매력치 5000 이상</li>
        <li>조교 횟수 50회 이상</li>
      </ul>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderExtrachara = () => (
    <div className="tips-detail">
      <h3>◆가입조건이 특수한 캐릭터◆</h3>
      <p>일부 캐릭터는 특별한 조건을 만족해야만 가입할 수 있습니다.</p>

      <div className="chara-list">
        <p className="notice">특정 실적을 해금하거나 특별한 이벤트를 완료해야 나타나는 캐릭터들이 있습니다.</p>
        <p>조건은 플레이하면서 발견하세요!</p>
      </div>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  const renderPregnancy = () => (
    <div className="tips-detail">
      <h3>◆임신에 관해◆</h3>

      <h4>임신 시스템</h4>
      <p>V성교 커맨드를 사용하면 임신 확률이 있습니다.</p>

      <h4>임신 확률에 영향을 주는 요소</h4>
      <ul>
        <li>위험일 여부 (배란기에는 확률 상승)</li>
        <li>피임약 복용 여부</li>
        <li>【불임】소질 보유 여부</li>
        <li>사정량</li>
      </ul>

      <h4>임신 중</h4>
      <ul>
        <li>일부 커맨드가 사용 불가능합니다</li>
        <li>체형이 변화합니다</li>
        <li>특수한 이벤트가 발생합니다</li>
      </ul>

      <h4>출산 후</h4>
      <ul>
        <li>【모유 체질】소질을 획득할 수 있습니다</li>
        <li>임신 횟수에 따라 【임신 체질】을 습득합니다</li>
      </ul>

      <button onClick={() => setCurrentCategory('main')} className="back-btn">돌아가기</button>
    </div>
  );

  return (
    <div className="tips-screen">
      {currentCategory === 'main' && renderMain()}
      {currentCategory === 'mission' && renderMission()}
      {currentCategory === 'achievement' && renderAchievement()}
      {currentCategory === 'hint' && renderHint()}
      {currentCategory === 'beauty' && renderBeauty()}
      {currentCategory === 'talent' && renderTalent()}
      {currentCategory === 'characlear' && renderCharaclear()}
      {currentCategory === 'extrachara' && renderExtrachara()}
      {currentCategory === 'pregnancy' && renderPregnancy()}

      <button className="main-back-btn" onClick={onBack}>메인 메뉴로</button>
    </div>
  );
}

export default TipsScreen;
