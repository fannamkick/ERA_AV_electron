/**
 * 아이템 타입 정의 (Item.csv)
 * 총 109개 아이템
 */

/**
 * 게임 아이템 인벤토리
 * key: 아이템 ID, value: 소지 개수
 */
export interface GameItems {
  // 조교도구 (0-23)
  0?: number;   // 로터
  1?: number;   // 바이브
  2?: number;   // E마사지기
  3?: number;   // 애널바이브
  4?: number;   // 페니스밴드
  5?: number;   // 아이마스크
  6?: number;   // 비디오카메라
  7?: number;   // 클리캡
  8?: number;   // 니플캡
  9?: number;   // 볼개그
  10?: number;  // 채찍
  11?: number;  // 바늘
  12?: number;  // 오나홀
  13?: number;  // 플레이매트
  14?: number;  // 밧줄
  15?: number;  // 관장기+플러그
  16?: number;  // 큰거울
  17?: number;  // 착유기
  18?: number;  // 촬영세트・기초
  19?: number;  // 코스프레의상
  20?: number;  // 애널비즈
  21?: number;  // 전극플러그
  22?: number;  // 개
  23?: number;  // 본디지

  // 소모품 (24-29)
  24?: number;  // 콘돔
  25?: number;  // 로션
  26?: number;  // 프린세스포이즌
  27?: number;  // 이뇨제
  29?: number;  // 싸인펜

  // 회복/버프 (30-39)
  30?: number;  // 영양제
  31?: number;  // 향
  34?: number;  // 피어스링
  37?: number;  // 러브스코프
  38?: number;  // 부스터메일
  39?: number;  // 【비밀지식】

  // 특수아이템 (40-52)
  40?: number;  // 배란유발제
  41?: number;  // 강모제
  42?: number;  // 【조합지식】
  43?: number;  // 배란억제제
  52?: number;  // 【기교Lv】

  // 코스프레 (60-79)
  60?: number;  // 코스프레의상・라이트노벨팩
  61?: number;  // 코스프레의상・애니메이션팩
  62?: number;  // 코스프레의상・네임드팩
  63?: number;  // 코스프레의상・게임팩
  64?: number;  // 코스프레의상・도우진팩
  65?: number;  // 코스프레의상・마블팩
  66?: number;  // 코스프레의상・AV여배우팩
  67?: number;  // 코스프레의상・아이돌팩
  68?: number;  // 코스프레의상・카드게임팩
  69?: number;  // 코스프레의상・음악팩
  70?: number;  // 코스프레의상・제복팩
  71?: number;  // 코스프레의상・종교팩
  72?: number;  // 코스프레의상・스포츠팩
  73?: number;  // 코스프레의상・영화팩
  74?: number;  // 코스프레의상・판타지팩
  75?: number;  // 코스프레의상・특촬팩
  76?: number;  // 코스프레의상・과학팩
  77?: number;  // 코스프레의상・서비스업팩
  78?: number;  // 코스프레의상・동물팩
  79?: number;  // 코스프레의상・역사팩

  // 촬영세트 (80-89)
  80?: number;  // 촬영세트・저택
  81?: number;  // 촬영세트・학교
  82?: number;  // 촬영세트・병원
  83?: number;  // 촬영세트・사원
  84?: number;  // 촬영세트・격투기장
  85?: number;  // 촬영세트・수영장
  86?: number;  // 촬영세트・해변
  87?: number;  // 촬영세트・전철
  88?: number;  // 촬영세트・숲
  89?: number;  // 촬영세트・동굴

  // 기타 아이템 (90-108)
  90?: number;  // 촬영세트・우주선
  91?: number;  // 촬영세트・서양성
  92?: number;  // 촬영세트・일본성
  93?: number;  // 촬영세트・호화객선
  94?: number;  // 촬영세트・유원지
  95?: number;  // 촬영세트・고층빌딩
  96?: number;  // 촬영세트・감옥
  97?: number;  // 촬영세트・온천
  98?: number;  // 촬영세트・폐건물
  99?: number;  // 코스프레의상・밀리터리팩
  100?: number; // 촬영세트・연구소
  101?: number; // 촬영세트・수족관
  102?: number; // 촬영세트・유적
  103?: number; // 촬영세트・마법소녀
  104?: number; // 촬영세트・로봇
  105?: number; // 【AV적성】
  106?: number; // 【모델적성】
  107?: number; // 【아이돌적성】
  108?: number; // 【클럽적성】

  [key: number]: number | undefined;
}

/**
 * 아이템 정보 (GameData.items.list에서 가져옴)
 */
export interface ItemInfo {
  id: number;
  name: string;
  price?: number;
  description?: string;
}

/**
 * 인벤토리 아이템
 */
export interface InventoryItem {
  itemId: number;
  quantity: number;
}
