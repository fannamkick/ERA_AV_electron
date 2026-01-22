# SOURCE/PALAM 인덱스 매핑

## SOURCE 인덱스 (커맨드 실행 결과)

ERB에서 사용하는 SOURCE 배열 인덱스와 의미:

```
SOURCE:0  = 쾌C (pleasureC) - 클리토리스 쾌감
SOURCE:1  = 쾌V (pleasureV) - 질 쾌감
SOURCE:2  = 쾌A (pleasureA) - 항문 쾌감
SOURCE:3  = 윤활 (lubrication) - 애액/윤활
SOURCE:4  = 굴복 (submission) - 성행동/굴복
SOURCE:5  = 욕정 (lust) - 욕정
SOURCE:6  = 고통 (pain) - 고통
SOURCE:7  = 애정 (love) - 애정
SOURCE:8  = 안심 (comfort) - 불결/안심
SOURCE:9  = (미사용)
SOURCE:10 = (미사용)
SOURCE:11 = 공포 (terror) - 공포
SOURCE:12 = 반감 (antipathy) - 노출/반감
SOURCE:13 = 공포2 (fear) - 공포 추가
SOURCE:14 = 우울 (depression) - 우울
SOURCE:15 = (미사용)
SOURCE:16 = 습관 (habit) - 습관
SOURCE:17 = 쾌B (pleasureB) - 가슴/유두 쾌감
```

## PALAM 인덱스 (파라미터 누적값)

```
PALAM:0  = 쾌C
PALAM:1  = 쾌V
PALAM:2  = 쾌A
PALAM:3  = 윤활
PALAM:4  = 굴복
PALAM:5  = 욕정
PALAM:6  = 고통
PALAM:7  = 애정
PALAM:8  = 안심
PALAM:9  = 고통 (중복)
PALAM:10 = (기타)
PALAM:11 = 공포
PALAM:12 = 반감
PALAM:13 = 공포
PALAM:14 = 우울
PALAM:15 = (미사용)
PALAM:16 = 습관
PALAM:17 = 쾌B
```

## ABL 인덱스 (능력치)

```
ABL:0  = C감각
ABL:1  = B감각
ABL:2  = V감각
ABL:3  = A감각
ABL:10 = 종순
ABL:11 = 욕망
ABL:12 = 기교
ABL:16 = 봉사정신
ABL:17 = 노출벽
ABL:20 = 가학
ABL:21 = 마조
```

## TALENT 인덱스 (주요 소질)

```
TALENT:61 = 악취둔감
TALENT:62 = 감도가 높음
TALENT:70 = 모유체질
TALENT:72 = 노출벽
TALENT:73 = 봉사정신
TALENT:74 = 처녀
TALENT:76 = 애널처녀
TALENT:78 = 펠라테크
TALENT:79 = 키스마
TALENT:80 = 조루
TALENT:81 = 자위중독
TALENT:85 = M기질
TALENT:86 = S기질
TALENT:122 = 처녀 (중복)
```

## CFLAG 인덱스 (캐릭터 플래그)

```
CFLAG:2  = 호감도
CFLAG:16 = 의식 상태 (-1: 기절)
CFLAG:40 = 의상 상태 (비트마스크)
CFLAG:42 = 장비 (79: 정조대)
CFLAG:100 = 첫 경험 플래그
CFLAG:101 = 첫 키스 플래그
```

## TEQUIP 인덱스 (장비 활성 상태)

```
TEQUIP:11 = 바이브 (질)
TEQUIP:13 = 애널바이브
TEQUIP:14 = 클리캡
TEQUIP:45 = 볼개그
TEQUIP:89 = 수간/촉수
TEQUIP:90 = 로터
```

## EXP 인덱스 (경험치)

```
EXP:0  = V경험
EXP:1  = A경험
EXP:14 = 애무 경험
EXP:16 = 봉사 경험
EXP:23 = 페로몬 경험
EXP:40 = 레즈 경험
EXP:41 = 백합 경험
EXP:44 = 수음 경험
EXP:45 = 펠라 경험
EXP:47 = 키스 경험
EXP:48 = 가슴애무 경험
EXP:49 = 자위 경험
EXP:50 = 애널애무 경험
EXP:51 = 커닐링구스 경험
EXP:52 = 로터 경험
EXP:53 = 바이브 경험
```

## 중요 상수

```
절정 임계값 = 10,000 (SOURCE 누적)
기절 임계값 = 10회 절정 또는 5회 연속 절정
```
