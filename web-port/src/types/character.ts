// erAV_Ho 캐릭터 데이터 타입 정의
// 원본 erabasic 엔진 구조 재현

// 추가 타입 export
export type { GameItems } from './items';
export type { TrainingCommands, TrainingResult, TrainingContext } from './training';

/**
 * BASE (基礎) - 타고난 기본 능력치 (조교 불가)
 * 예: 체력치(0): 1500, 기력치(1): 1500, 매달 출연료(30): 2100
 */
export interface CharacterBase {
  0?: number;   // 체력
  1?: number;   // 기력
  2?: number;   // 사정게이지
  3?: number;   // 출연료
  7?: number;   // 외견연령
  8?: number;   // 어림연령
  9?: number;   // 진짜연령
  10?: number;  // 수명
  11?: number;  // 탄생월
  12?: number;  // 탄생일
  13?: number;  // 혈액형
  20?: number;  // 키
  21?: number;  // 체중
  22?: number;  // 가슴
  23?: number;  // 허리
  24?: number;  // 엉덩이
  30?: number;  // 출연료
  31?: number;  // 매력치
  32?: number;  // 가슴(소수)
  33?: number;  // 허리(소수)
  34?: number;  // 엉덩이(소수)
  40?: number;  // 마력
  50?: number;  // 자지사이즈

  [key: number]: number | undefined;
}

/**
 * ABL (能力) - 조교로 올리는 능력치 (LV 0~10)
 * 예: C감각(0): 1, 신뢰(10): 3, 기교(12): 3
 */
export interface CharacterAbilities {
  0?: number;   // C감각
  1?: number;   // B감각
  2?: number;   // V감각
  3?: number;   // A감각
  10?: number;  // 신뢰
  11?: number;  // 욕망
  12?: number;  // 기교
  13?: number;  // 봉사기술
  14?: number;  // 성교기술
  15?: number;  // 화술
  16?: number;  // 봉사정신
  17?: number;  // 노출벽
  20?: number;  // 새드끼
  21?: number;  // 마조끼
  22?: number;  // 레즈끼
  23?: number;  // BL끼
  30?: number;  // 성교중독
  31?: number;  // 자위중독
  32?: number;  // 정액중독
  33?: number;  // 레즈중독
  37?: number;  // 매춘중독
  38?: number;  // 사정중독
  39?: number;  // 분유중독
  40?: number;  // 수간중독
  41?: number;  // 촉수중독
  50?: number;  // 미용감각
  51?: number;  // 운동능력
  52?: number;  // 학력
  70?: number;  // 피사기능
  71?: number;  // 가창기능
  72?: number;  // 무용기능
  73?: number;  // 요리기능
  80?: number;  // 과학지식
  81?: number;  // 오타쿠지식

  [key: number]: number | undefined;
}

// 파라미터 (Palam.csv) - 조교 중 변화하는 수치
export interface CharacterParameters {
  0?: number;  // 쾌C
  1?: number;  // 쾌V
  2?: number;  // 쾌A
  3?: number;  // 윤활
  4?: number;  // 온순
  5?: number;  // 욕정
  6?: number;  // 굴복
  7?: number;  // 습득
  8?: number;  // 치정
  9?: number;  // 고통
  10?: number; // 공포
  11?: number; // 반감
  12?: number; // 불쾌
  13?: number; // 억울
  14?: number; // 쾌B
  15?: number; // 향락
  100?: number; // 부정

  [key: number]: number | undefined;
}

// 특성 (Talent.csv)
export interface CharacterTalents {
  // 기본 소질 (0-9)
  0?: number;  // 처녀
  1?: number;  // 동정
  2?: number;  // 애널처녀
  9?: number;  // 붕괴

  // 성격 (10-19)
  10?: number; // 겁쟁이
  11?: number; // 건방짐
  12?: number; // 다부짐
  13?: number; // 솔직함
  14?: number; // 얌전함
  15?: number; // 프라이드 높음
  16?: number; // 활발함
  17?: number; // 프라이드 낮음
  18?: number; // 츤데레

  // 성에 대한 관심 (20-29)
  20?: number; // 자제심
  21?: number; // 쿨
  22?: number; // 감정부족
  23?: number; // 호기심
  24?: number; // 보수적
  25?: number; // 포지티브
  26?: number; // 네거티브
  27?: number; // 일선을 넘지않음
  28?: number; // 튀고 싶어함

  // 처녀성 (30-39)
  30?: number; // 정조관념
  31?: number; // 정조 무관심
  32?: number; // 억압
  33?: number; // 해방
  34?: number; // 저항
  35?: number; // 수줍음
  36?: number; // 부끄럼 없음
  37?: number; // 약점

  // 체질 (40-49)
  40?: number; // 아픔에 약함
  41?: number; // 아픔에 강함
  42?: number; // 젖기쉬움
  43?: number; // 젖기힘듬
  44?: number; // 울보
  45?: number; // 울지 않음
  46?: number; // 약물중독
  47?: number; // 정애미각

  // 기술 (50-59)
  50?: number; // 소질있음
  51?: number; // 습득느림
  52?: number; // 혀놀림
  55?: number; // 조합지식
  56?: number; // 약독내성
  57?: number; // 오줌싸개

  // 결벽도 (60-69)
  60?: number; // 자위하기 쉬움
  61?: number; // 악취둔감
  62?: number; // 악취민감
  63?: number; // 헌신적
  64?: number; // 불결무시

  // 솔직도 (70-79)
  70?: number; // 쾌감에 솔직
  71?: number; // 쾌감을 부정
  72?: number; // 중독되기 쉬움
  73?: number; // 즉각함락
  74?: number; // 자위광
  75?: number; // 섹스광
  76?: number; // 음란
  77?: number; // 애널광
  78?: number; // 가슴광

  // 성벽 (79-99)
  79?: number; // 보이시
  80?: number; // 도착적
  81?: number; // 바이
  82?: number; // 남성불신
  83?: number; // 새드
  84?: number; // 질투
  85?: number; // 연심
  86?: number; // 망신
  87?: number; // 소악마
  88?: number; // 마조
  89?: number; // 노출광
  90?: number; // 섹프
  91?: number; // 매혹
  92?: number; // 수수께끼의 매력
  93?: number; // 카리스마

  // 신체 특징 (99-152)
  99?: number;  // 큰체구
  100?: number; // 작은체형
  101?: number; // C둔감
  102?: number; // C민감
  103?: number; // V둔감
  104?: number; // V민감
  105?: number; // A둔감
  106?: number; // A민감
  107?: number; // B둔감
  108?: number; // B민감
  109?: number; // 빈유
  110?: number; // 거유
  111?: number; // 회복 빠름
  112?: number; // 회복 느림
  113?: number; // 매력
  114?: number; // 폭유
  115?: number; // 비만
  116?: number; // 절벽
  117?: number; // 치료
  118?: number; // 고무
  119?: number; // 통통함
  121?: number; // 후타나리
  122?: number; // 남성
  123?: number; // 광기
  124?: number; // 동물귀
  125?: number; // 음모 없음
  126?: number; // 인기인
  127?: number; // 역습
  128?: number; // 음모 빽빽함
  130?: number; // 모유체질
  131?: number; // 유아퇴행
  132?: number; // 유치
  133?: number; // 조루
  134?: number; // 유리멘탈
  135?: number; // 미숙함
  136?: number; // 암캐
  137?: number; // 묘판
  140?: number; // 동물 좋아함
  141?: number; // 동물 싫어함
  150?: number; // 자위 안함
  151?: number; // 봉사 안함
  152?: number; // 세뇌 안당함
  153?: number; // 임신
  154?: number; // 육아 중

  [key: number]: number | undefined;
}

// 경험치 (EXP) - exp.csv
export interface CharacterExperience {
  // 기본경험 (0-9)
  0?: number;  // V경험
  1?: number;  // A경험
  2?: number;  // 절정경험
  3?: number;  // 사정경험
  4?: number;  // 삽입경험
  5?: number;  // 성교경험
  8?: number;  // 정음절정경험
  9?: number;  // 감독경험

  // 자위/개발 (10-19)
  10?: number; // 자위경험
  11?: number; // 지도자위경험
  12?: number; // 야외노출경험
  13?: number; // C개발경험
  14?: number; // B개발경험
  15?: number; // V개발경험
  16?: number; // A개발경험

  // 봉사 (20-29)
  20?: number; // 정액경험
  21?: number; // 봉사쾌락경험
  22?: number; // 펠라경험
  23?: number; // 애정경험

  // 특수플레이 (30-39)
  30?: number; // 피학쾌락경험
  31?: number; // 방뇨경험
  32?: number; // A쾌락경험
  33?: number; // 가학쾌락경험
  34?: number; // C경험
  35?: number; // B경험

  // 성벽 (40-49)
  40?: number; // 레즈경험
  41?: number; // BL경험

  // 이상/확장 (50-60)
  50?: number; // 이상경험
  51?: number; // 긴박경험
  52?: number; // V확장경험
  53?: number; // A확장경험
  54?: number; // 분유경험
  55?: number; // 촉수경험
  56?: number; // 수간경험
  57?: number; // 약물경험
  58?: number; // 유간경험
  59?: number; // 산란경험
  60?: number; // 출산경험
  65?: number; // 지도실신경험

  // 특수능력 (61-84)
  61?: number; // 요리경험
  70?: number; // 피사경험
  71?: number; // 가창경험
  72?: number; // 무용경험
  73?: number; // 대화경험
  74?: number; // 매춘경험
  75?: number; // 영업애정경험
  76?: number; // AV출연경험
  77?: number; // 아르바이트경험
  78?: number; // 접객경험
  79?: number; // 모델경험
  80?: number; // 지명경험
  81?: number; // 애프터경험
  82?: number; // 성우경험
  83?: number; // 작화경험
  84?: number; // 치료효과경험

  // 기타 (90-99)
  90?: number; // 공헌도
  91?: number; // 인기
  92?: number; // 훈계경험

  // 특별 (100+)
  101?: number; // 남친과의 SEX회수
  102?: number; // 코스프레경험
  103?: number; // 치한경험
  104?: number; // 섹프와의 SEX회수
  105?: number; // 레이프회수
  107?: number; // 캐릭터 매각경험(MASTER)
  108?: number; // 직원 네토라레경험
  109?: number; // 교제인원수
  110?: number; // RB단 성격개선경험
  111?: number; // 이미지체인지횟수
  112?: number; // 비속어 지도횟수
  120?: number; // 미용트레이닝경험
  121?: number; // 운동트레이닝경험
  122?: number; // 학업트레이닝경험
  123?: number; // 오타쿠트레이닝경험
  124?: number; // 스페셜 에스테사용경험
  130?: number; // 카논 아르바이트
  131?: number; // 사오리 아르바이트
  132?: number; // 유카코 아르바이트
  133?: number; // 하루노 아르바이트
  134?: number; // 엘레나 아르바이트
  135?: number; // 아이샤 아르바이트
  136?: number; // 오토하 아르바이트
  137?: number; // 마리 아르바이트

  [key: number]: number | undefined;
}

// 각인 (MARK) - Mark.csv
export interface CharacterMarks {
  0?: number;  // 고통각인
  1?: number;  // 쾌락각인
  2?: number;  // 굴복각인
  3?: number;  // 반발각인

  [key: number]: number | undefined;
}

// 구슬/상성 (JUEL/相性)
export interface CharacterJuel {
  [key: number]: number;
}

// 캐릭터 플래그 (CFLAG)
export interface CharacterFlags {
  2?: number;   // 호감도 (실제)
  16?: number;  // 첫 키스 상대 (0=기억안남, 1=이름있음, 16=플레이어, -1=미경험)
  100?: number; // 호감도 표시용

  // 생일/나이
  21?: number;  // 생일(월일 4자리)
  22?: number;  // 연령(생년 4자리)
  41?: number;  // 나이

  // 신체 특징
  170?: number; // B컵
  171?: number; // B우유통
  174?: number; // B유륜
  175?: number; // B유두
  176?: number; // V길이
  177?: number; // V크기
  609?: number; // 페니스 사이즈 (남성용)
  611?: number; // 포피 상태 (남성용)

  // 초체험 기록 - 첫 키스
  820?: number; // 첫 키스 나이
  821?: number; // 첫 키스 월
  822?: number; // 첫 키스 주
  823?: number; // 첫 키스 장소
  824?: number; // 첫 키스 상황
  825?: number; // 첫 키스 일
  826?: number; // 생일 기념 여부
  827?: number; // 전 남친 여부

  // 초체험 기록 - 처녀상실 (CFLAG:15, 160-167)
  15?: number;  // 처녀상실 상대 (0=기억안남, 1=이름있음, 16=플레이어)
  160?: number; // 처녀상실 나이
  161?: number; // 처녀상실 월
  162?: number; // 처녀상실 주
  163?: number; // 처녀상실 장소
  164?: number; // 처녀상실 상황
  165?: number; // 처녀상실 일
  166?: number; // 생일 기념 여부
  167?: number; // 전 남친 여부

  // 초체험 기록 - 애널처녀상실 (CFLAG:616, 830-837)
  616?: number; // 애널처녀상실 상대 (0=기억안남, 1=이름있음, 16=플레이어)
  830?: number; // 애널처녀상실 나이
  831?: number; // 애널처녀상실 월
  832?: number; // 애널처녀상실 주
  833?: number; // 애널처녀상실 장소
  834?: number; // 애널처녀상실 상황
  835?: number; // 애널처녀상실 일
  836?: number; // 생일 기념 여부
  837?: number; // 전 남친 여부

  // 직업/위치
  684?: number; // 다니고 있는 곳 (0=없음, 1~=장소)

  // 조교 관련
  600?: number; // 처음조교일
  602?: number; // 처음조교주
  620?: number; // 매수 가격

  [key: number]: number | undefined;
}

// 캐릭터 문자열 데이터 (CSTR)
export interface CharacterStrings {
  1?: string;   // 첫 키스 상대 이름
  2?: string;   // 처녀상실 상대 이름
  3?: string;   // 애널처녀상실 상대 이름
  7?: string;   // 남자친구 성
  8?: string;   // 남자친구 이름
  9?: string;   // 생리 상태 텍스트
  40?: string;  // 남자친구 직업
  41?: string;  // 남자친구 관계
  42?: string;  // 짝사랑 상대
  43?: string;  // 친구
  44?: string;  // 부모자식
  47?: string;  // 섹프 성
  48?: string;  // 섹프 이름
  60?: string;  // 임신 아이 아버지
  80?: string;  // 첫 키스 신체부위1
  81?: string;  // 처녀상실 신체부위
  82?: string;  // 애널처녀상실 신체부위

  [key: number]: string | undefined;
}

// 메인 캐릭터 데이터 구조
export interface Character {
  id: number;
  name: string;           // 이름 (NAME)
  callName: string;       // 호칭 (CALLNAME)
  nickname?: string;      // 애칭 (NICKNAME)

  // 기본 수치 (조교 불가)
  base: CharacterBase;           // 기본 능력치 (BASE)
  maxBase: CharacterBase;        // 최대 능력치 (MAXBASE)

  // 성장 수치 (조교로 변화)
  abl: CharacterAbilities;       // 현재 능력치 (ABL)

  // 변동 수치 (턴마다 변화)
  palam: CharacterParameters;    // 파라미터

  // 특성/경험
  talent: CharacterTalents;      // 특성
  exp: CharacterExperience;      // 경험치
  mark: CharacterMarks;          // 각인
  juel: CharacterJuel;           // 구슬

  // 플래그 및 문자열
  cflag: CharacterFlags;         // 캐릭터 플래그
  cstr: CharacterStrings;        // 캐릭터 문자열

  // 관계
  relation: number[];            // 관계 (RELATION)

  // 상태
  isOwned: boolean;              // 소유 여부
  isAssistant: boolean;          // 조수 여부
  location?: string;             // 현재 위치

  // 조교 시스템 전용 (런타임 추가 속성)
  abilities?: number[];          // abl을 배열로 변환 (호환성)
  equipment?: Record<number, number>;  // 장비 상태 (TEQUIP)
  source?: number[];             // SOURCE 배열 (조교 중 쾌락 증가량)
}

// 캐릭터 생성 시 초기 데이터
export interface CharacterCreateData {
  id: number;
  name: string;
  callName: string;
  nickname?: string;
  base?: Partial<CharacterBase>;
  abl?: Partial<CharacterAbilities>;
  palam?: Partial<CharacterParameters>;
  talent?: Partial<CharacterTalents>;
  exp?: Partial<CharacterExperience>;
  mark?: Partial<CharacterMarks>;
  juel?: Partial<CharacterJuel>;
  cflag?: Partial<CharacterFlags>;
  cstr?: Partial<CharacterStrings>;
  relation?: number[];
}
