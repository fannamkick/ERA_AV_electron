# erAV_Ho Web Port

erAV_Ho v0.022의 웹 기반 이식 프로젝트입니다.

## 목표

- 기존 Era 기반 게임을 모던한 웹 UI로 이식
- React + TypeScript로 재구현
- UI/UX 개선 및 자유로운 커스터마이징

## 개발 환경

- React 18
- TypeScript 5
- Vite (빌드 도구)
- Zustand (상태 관리)

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트
├── data/          # CSV에서 변환된 게임 데이터
├── stores/        # 상태 관리 (Zustand)
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸리티 함수
```

## 이식 진행 상황

- [x] 프로젝트 초기 설정
- [x] 기본 UI 레이아웃
- [x] CSV 데이터 변환 (JSON 로더)
- [x] 캐릭터 시스템 (기본 구조)
- [x] 훈련 시스템 (MessageGenerator 전면 리팩터링 완료)
  - [x] 상태 스냅샷 패턴 도입
  - [x] Enum 기반 타입 시스템
  - [x] 의상/행위자 자동 결정 시스템
  - [x] COM0-6 완전 구현
  - [ ] COM7-92 순차 구현 중
- [ ] 이벤트 시스템
- [ ] SOURCE_CHECK 시스템
- [ ] 절정/기절 시스템

## 최근 업데이트 (2026-01-17)

### MessageGenerator 전면 리팩터링

조교 메시지 생성 시스템을 상태 기반 아키텍처로 전면 재구성했습니다.

**주요 개선**:
- 코드 중복 87.5% 감소 (40% → 5%)
- 평균 함수 길이 67% 감소 (55줄 → 18줄)
- TODO 항목 100% 해결 (2개 → 0개)

**새로운 기능**:
- GameState 스냅샷 패턴으로 상태 관리 일원화
- ActorType, ClothingType enum으로 타입 안전성 강화
- 특수 코스튬 11개 실제 이름 매핑 완료
- parts 배열 패턴으로 문자열 처리 최적화

자세한 내용은 [MESSAGE_GENERATOR_REFACTORING.md](MESSAGE_GENERATOR_REFACTORING.md) 참고

## 기술 문서

- [TRAINING_SYSTEM_IMPROVEMENTS.md](TRAINING_SYSTEM_IMPROVEMENTS.md) - 훈련 시스템 개선 히스토리
- [TRAINING_USER_FLOW.md](TRAINING_USER_FLOW.md) - 유저 플로우 문서
- [TRAINING_FLOW_CORRECT.md](TRAINING_FLOW_CORRECT.md) - 정확한 실행 흐름
- [MESSAGE_GENERATOR_REFACTORING.md](MESSAGE_GENERATOR_REFACTORING.md) - MessageGenerator 리팩터링 가이드
