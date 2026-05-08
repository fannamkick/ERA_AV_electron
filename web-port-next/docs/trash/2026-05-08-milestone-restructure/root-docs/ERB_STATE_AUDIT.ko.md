# ERB 상태 후보 감사

## 핵심 결론

- 상태 접근식 unique 수: 3627
- 숫자 슬롯 후보 unique 수: 1510
- definition/static 숫자 슬롯: 258
- script/local 접근식: 220
- persistent 런타임 숫자 슬롯 후보: 1016
- persistent 후보 중 이름 정의, 캐릭터 seed, 또는 write 근거가 있는 슬롯: 963
- session/runtime buffer 숫자 슬롯 후보: 234
- 동적/스칼라/lookup 접근식: 75
- persistent missingMapping 슬롯: 724
- session missingMapping 슬롯: 164

## 숫자 슬롯 후보 분류

| 분류 | 후보 수 | 발생 수 | write 후보 | 주요 family |
| --- | ---: | ---: | ---: | --- |
| `not-runtime/definition-static` | 258 | 3621 | 5 | TALENTNAME:134, ABLNAME:33, EXPNAME:32, ITEMNAME:19, PALAMLV:14, PALAMNAME:13, EXPLV:7, MARKNAME:4, STR:2 |
| `runtime/dynamic-scalar-or-lookup` | 2 | 3 | 0 | NAME:1, NO:1 |
| `runtime/persistent/chara-seed+erb` | 68 | 5129 | 64 | CFLAG:47, CSTR:17, ABL:1, BASE:1, RELATION:1, TALENT:1 |
| `runtime/persistent/erb-read-only-evidence` | 53 | 143 | 0 | PBAND:18, CFLAG:12, TALENT:7, ABL:4, GLOBAL:4, FLAG:2, BASE:1, CSTR:1, DAY:1, GOTJUEL:1 |
| `runtime/persistent/erb-write-only-evidence` | 418 | 6497 | 418 | CFLAG:141, FLAG:101, GLOBAL:79, CSTR:47, JUEL:16, EX:8, STAIN:6, DAY:4, PBAND:4, MARK:3 |
| `runtime/persistent/name+chara-seed+erb` | 270 | 17175 | 218 | TALENT:192, EXP:34, ABL:26, BASE:18 |
| `runtime/persistent/name+erb` | 207 | 5191 | 172 | TALENT:56, ITEM:55, EXP:35, ITEMSALES:21, PALAM:15, MAXBASE:9, ABL:7, BASE:5, MARK:4 |
| `runtime/session-buffer` | 234 | 13600 | 227 | TFLAG:133, TEQUIP:35, SOURCE:19, UP:17, TCVAR:13, NOWEX:6, DOWN:4, SAVESTR:3, LOSEBASE:2, TSTR:2 |

## 접근식 분류

| 분류 | 접근식 수 | 발생 수 | write 후보 | 주요 family |
| --- | ---: | ---: | ---: | --- |
| `not-domain/script-scratch/non-numeric-access` | 220 | 26414 | 202 | T:83, A:23, LOCAL:20, J:10, U:10, W:9, L:8, LOCALS:7, P:7, ARG:6 |
| `not-runtime/definition-static/non-numeric-access` | 32 | 77 | 0 | PALAMNAME:10, EXPNAME:5, ABLNAME:4, TALENTNAME:3, TRAINNAME:3, ITEMPRICE:2, PALAMLV:2, BASENAME:1, ITEMNAME:1, MARKNAME:1 |
| `not-runtime/definition-static/numeric-access` | 258 | 3621 | 5 | TALENTNAME:134, ABLNAME:33, EXPNAME:32, ITEMNAME:19, PALAMLV:14, PALAMNAME:13, EXPLV:7, MARKNAME:4, STR:2 |
| `runtime/dynamic-scalar-or-lookup/non-numeric-access` | 73 | 4494 | 12 | CALLNAME:23, NAME:21, NO:18, NICKNAME:9, CHARANUM:1, SAVEDATA:1 |
| `runtime/dynamic-scalar-or-lookup/numeric-access` | 2 | 3 | 0 | NAME:1, NO:1 |
| `runtime/persistent-candidate/non-numeric-access` | 168 | 1360 | 96 | RELATION:27, TALENT:17, EXP:15, JUEL:13, FLAG:12, ABL:11, CFLAG:10, PALAM:7, GLOBAL:6, MARK:6 |
| `runtime/persistent-candidate/numeric-access` | 2602 | 34135 | 1692 | TALENT:955, CFLAG:557, EXP:211, ABL:163, CSTR:137, BASE:108, FLAG:103, GLOBAL:83, JUEL:60, ITEM:56 |
| `runtime/session-buffer/non-numeric-access` | 33 | 2052 | 17 | TFLAG:10, SAVESTR:7, TCVAR:6, ASSI:1, ASSIPLAY:1, DOWN:1, EJAC:1, MASTER:1, PLAYER:1, PREVCOM:1 |
| `runtime/session-buffer/numeric-access` | 239 | 13600 | 232 | TFLAG:133, TEQUIP:35, SOURCE:19, TCVAR:18, UP:17, NOWEX:6, DOWN:4, SAVESTR:3, LOSEBASE:2, TSTR:2 |

## CSV 이름 정의 크기

| family | 정의된 index 수 |
| --- | ---: |
| `ABL` | 34 |
| `BASE` | 23 |
| `BOUGHT` | 109 |
| `EXP` | 82 |
| `ITEM` | 109 |
| `ITEMSALES` | 109 |
| `MARK` | 4 |
| `MAXBASE` | 23 |
| `NOITEM` | 109 |
| `PALAM` | 17 |
| `TALENT` | 261 |

## 캐릭터 CSV seed index 크기

| family | seed index 수 |
| --- | ---: |
| `ABL` | 29 |
| `BASE` | 19 |
| `CFLAG` | 50 |
| `CSTR` | 19 |
| `EXP` | 37 |
| `RELATION` | 106 |
| `TALENT` | 199 |

## 이름/seed 없이 ERB 근거만 있는 persistent 상위 후보

| slot | 발생 수 | write | files | 도메인 후보 |
| --- | ---: | ---: | ---: | --- |
| `STAIN:2` | 328 | 133 | 24 | `body` |
| `CFLAG:627` | 266 | 8 | 1 | `people|body|feature-state|world|missingMapping` |
| `FLAG:42` | 172 | 4 | 10 | `world|missingMapping` |
| `CFLAG:130` | 143 | 10 | 10 | `people|body|feature-state|world|missingMapping` |
| `CFLAG:12` | 134 | 20 | 15 | `people|body|feature-state|world|missingMapping` |
| `CSTR:32` | 122 | 117 | 4 | `text|people|body|missingMapping` |
| `STAIN:0` | 121 | 56 | 20 | `body` |
| `DAY:1` | 118 | 8 | 10 | `run` |
| `CSTR:13` | 109 | 105 | 4 | `text|people|body|missingMapping` |
| `CSTR:33` | 109 | 104 | 4 | `text|people|body|missingMapping` |
| `DAY:2` | 103 | 9 | 10 | `run` |
| `JUEL:5` | 103 | 63 | 17 | `body|people` |
| `CFLAG:7` | 94 | 6 | 11 | `people|body|feature-state|world|missingMapping` |
| `STAIN:3` | 91 | 54 | 17 | `body` |
| `FLAG:49` | 80 | 11 | 1 | `world|missingMapping` |
| `CFLAG:110` | 76 | 19 | 16 | `people|body|feature-state|world|missingMapping` |
| `JUEL:6` | 73 | 39 | 13 | `body|people` |
| `CFLAG:2` | 69 | 11 | 12 | `people|body|feature-state|world|missingMapping` |
| `JUEL:100` | 68 | 21 | 13 | `body|people` |
| `FLAG:560` | 67 | 2 | 2 | `world|missingMapping` |
| `FLAG:48` | 66 | 2 | 3 | `world|missingMapping` |
| `STAIN:1` | 65 | 39 | 19 | `body` |
| `FLAG:6` | 62 | 4 | 10 | `world|missingMapping` |
| `FLAG:50` | 60 | 11 | 7 | `world|missingMapping` |
| `FLAG:5` | 59 | 11 | 10 | `world|missingMapping` |
| `FLAG:53` | 59 | 12 | 4 | `world|missingMapping` |
| `STAIN:4` | 59 | 25 | 21 | `body` |
| `JUEL:7` | 57 | 38 | 20 | `body|people` |
| `CSTR:47` | 54 | 47 | 7 | `text|people|body|missingMapping` |
| `CFLAG:36` | 52 | 2 | 1 | `people|body|feature-state|world|missingMapping` |
| `CFLAG:53` | 51 | 16 | 4 | `people|body|feature-state|world|missingMapping` |
| `CSTR:20` | 51 | 18 | 5 | `text|people|body|missingMapping` |
| `STAIN:5` | 51 | 30 | 12 | `body` |
| `CFLAG:54` | 50 | 12 | 9 | `people|body|feature-state|world|missingMapping` |
| `CSTR:48` | 50 | 47 | 3 | `text|people|body|missingMapping` |
| `CFLAG:102` | 46 | 10 | 4 | `people|body|feature-state|world|missingMapping` |
| `JUEL:4` | 45 | 33 | 13 | `body|people` |
| `FLAG:68` | 43 | 28 | 2 | `world|missingMapping` |
| `CFLAG:618` | 42 | 2 | 1 | `people|body|feature-state|world|missingMapping` |
| `FLAG:101` | 42 | 7 | 5 | `world|missingMapping` |
| `GLOBAL:200` | 39 | 2 | 10 | `world` |
| `FLAG:37` | 38 | 3 | 10 | `world|missingMapping` |
| `JUEL:8` | 38 | 31 | 11 | `body|people` |
| `CFLAG:33` | 37 | 1 | 4 | `people|body|feature-state|world|missingMapping` |
| `CFLAG:46` | 37 | 15 | 12 | `people|body|feature-state|world|missingMapping` |
| `CFLAG:831` | 37 | 15 | 8 | `people|body|feature-state|world|missingMapping` |
| `CFLAG:111` | 36 | 14 | 5 | `people|body|feature-state|world|missingMapping` |
| `BASE:4` | 35 | 16 | 4 | `body|people` |
| `FLAG:540` | 35 | 4 | 10 | `world|missingMapping` |
| `CFLAG:13` | 34 | 12 | 14 | `people|body|feature-state|world|missingMapping` |

## session/runtime buffer 상위 후보

| slot | 발생 수 | write | files | 도메인 후보 |
| --- | ---: | ---: | ---: | --- |
| `SOURCE:5` | 836 | 276 | 10 | `feature-session` |
| `SOURCE:1` | 801 | 184 | 10 | `feature-session` |
| `SOURCE:4` | 760 | 373 | 10 | `feature-session` |
| `SOURCE:13` | 744 | 373 | 10 | `feature-session` |
| `SOURCE:3` | 667 | 327 | 10 | `feature-session` |
| `SOURCE:6` | 641 | 362 | 10 | `feature-session` |
| `SOURCE:2` | 525 | 116 | 10 | `feature-session` |
| `SOURCE:0` | 501 | 237 | 10 | `feature-session` |
| `LOSEBASE:0` | 475 | 286 | 10 | `feature-session|body` |
| `SOURCE:7` | 398 | 345 | 10 | `feature-session` |
| `SOURCE:14` | 348 | 169 | 10 | `feature-session` |
| `SOURCE:17` | 313 | 137 | 10 | `feature-session` |
| `SOURCE:12` | 300 | 192 | 10 | `feature-session` |
| `LOSEBASE:1` | 294 | 260 | 10 | `feature-session|body` |
| `SOURCE:8` | 272 | 74 | 10 | `feature-session` |
| `SOURCE:10` | 238 | 168 | 10 | `feature-session` |
| `TEQUIP:90` | 237 | 2 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `SOURCE:15` | 207 | 90 | 10 | `feature-session` |
| `TFLAG:14` | 205 | 35 | 10 | `feature-session|interaction|missingMapping` |
| `TEQUIP:89` | 194 | 2 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TFLAG:400` | 161 | 3 | 1 | `feature-session|interaction|missingMapping` |
| `SOURCE:11` | 136 | 104 | 10 | `feature-session` |
| `SAVESTR:0` | 131 | 129 | 10 | `feature-session` |
| `TFLAG:899` | 128 | 3 | 10 | `feature-session` |
| `TFLAG:50` | 118 | 2 | 10 | `feature-session|interaction|missingMapping` |
| `TEQUIP:150` | 117 | 2 | 8 | `feature-session|interaction|equipment|missingMapping` |
| `TSTR:51` | 114 | 111 | 2 | `feature-session|script` |
| `TEQUIP:70` | 103 | 3 | 6 | `feature-session|interaction|equipment|missingMapping` |
| `TSTR:50` | 102 | 101 | 2 | `feature-session|script` |
| `TFLAG:160` | 96 | 91 | 3 | `feature-session|interaction|missingMapping` |
| `TEQUIP:11` | 94 | 2 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TEQUIP:55` | 90 | 2 | 5 | `feature-session|interaction|equipment|missingMapping` |
| `SOURCE:16` | 86 | 63 | 10 | `feature-session` |
| `TFLAG:407` | 78 | 37 | 1 | `feature-session|interaction|missingMapping` |
| `TEQUIP:13` | 76 | 2 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TEQUIP:44` | 76 | 2 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TFLAG:401` | 65 | 1 | 1 | `feature-session|interaction|missingMapping` |
| `TEQUIP:53` | 64 | 3 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TFLAG:180` | 64 | 25 | 4 | `feature-session|interaction|missingMapping` |
| `TEQUIP:54` | 63 | 5 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TEQUIP:58` | 62 | 2 | 10 | `feature-session|interaction|equipment|missingMapping` |
| `TFLAG:29` | 62 | 2 | 3 | `feature-session|interaction|missingMapping` |
| `TFLAG:200` | 58 | 50 | 10 | `feature-session|interaction|missingMapping` |
| `TFLAG:100` | 56 | 47 | 10 | `feature-session|interaction|missingMapping` |
| `SAVESTR:2` | 55 | 34 | 2 | `feature-session` |
| `TFLAG:13` | 55 | 55 | 10 | `feature-session|interaction|missingMapping` |
| `TFLAG:30` | 50 | 49 | 10 | `feature-session|interaction|missingMapping` |
| `UP:11` | 49 | 9 | 3 | `feature-session` |
| `TEQUIP:22` | 48 | 6 | 8 | `feature-session|interaction|equipment|missingMapping` |
| `TEQUIP:45` | 43 | 1 | 8 | `feature-session|interaction|equipment|missingMapping` |

## 동적/스칼라/lookup 접근식 상위 후보

| 접근식 | 발생 수 | write | files | family |
| --- | ---: | ---: | ---: | --- |
| `NO:TARGET` | 853 | 0 | 47 | `NO` |
| `CALLNAME:TARGET` | 718 | 1 | 61 | `CALLNAME` |
| `CHARANUM` | 461 | 0 | 104 | `CHARANUM` |
| `CALLNAME:MASTER` | 257 | 0 | 53 | `CALLNAME` |
| `CALLNAME:COUNT` | 241 | 2 | 27 | `CALLNAME` |
| `NO:ASSI` | 238 | 0 | 10 | `NO` |
| `CALLNAME:PLAYER` | 203 | 0 | 19 | `CALLNAME` |
| `NO:COUNT` | 202 | 0 | 33 | `NO` |
| `NAME:TARGET` | 157 | 1 | 49 | `NAME` |
| `NAME:COUNT` | 122 | 3 | 33 | `NAME` |
| `CALLNAME:T` | 94 | 0 | 6 | `CALLNAME` |
| `CALLNAME` | 91 | 0 | 2 | `CALLNAME` |
| `NICKNAME:TARGET` | 78 | 4 | 16 | `NICKNAME` |
| `CALLNAME:RESULT` | 77 | 0 | 10 | `CALLNAME` |
| `CALLNAME:ASSI` | 57 | 0 | 12 | `CALLNAME` |
| `NAME:T` | 55 | 0 | 7 | `NAME` |
| `NO:PLAYER` | 52 | 0 | 19 | `NO` |
| `NO:LOCAL` | 47 | 0 | 4 | `NO` |
| `NAME:RESULT` | 41 | 0 | 5 | `NAME` |
| `NO:MASTER` | 38 | 0 | 12 | `NO` |
| `CALLNAME:LOCAL` | 32 | 0 | 11 | `CALLNAME` |
| `NAME:MASTER` | 31 | 0 | 13 | `NAME` |
| `NO:RESULT` | 26 | 0 | 3 | `NO` |
| `NAME:ASSI` | 25 | 0 | 7 | `NAME` |
| `CALLNAME:C_NUM` | 23 | 0 | 2 | `CALLNAME` |
| `NAME:C` | 21 | 1 | 5 | `NAME` |
| `NAME:PLAYER` | 17 | 0 | 8 | `NAME` |
| `NAME:ARG` | 15 | 0 | 12 | `NAME` |
| `CALLNAME:ARG` | 14 | 0 | 10 | `CALLNAME` |
| `CALLNAME:L` | 14 | 0 | 1 | `CALLNAME` |
| `CALLNAME:f_actor` | 14 | 0 | 1 | `CALLNAME` |
| `CALLNAME:s_actor` | 14 | 0 | 1 | `CALLNAME` |
| `CALLNAME:C` | 13 | 1 | 3 | `CALLNAME` |
| `CALLNAME:Y` | 13 | 0 | 1 | `CALLNAME` |
| `CALLNAME:(LOCAL:1)` | 12 | 0 | 4 | `CALLNAME` |
| `NICKNAME:ASSI` | 12 | 0 | 2 | `NICKNAME` |
| `NICKNAME:PLAYER` | 12 | 0 | 1 | `NICKNAME` |
| `CALLNAME:F` | 8 | 0 | 1 | `CALLNAME` |
| `NAME:f_actor` | 8 | 0 | 1 | `NAME` |
| `NAME:s_actor` | 7 | 0 | 1 | `NAME` |
| `NAME:LOCAL` | 6 | 0 | 3 | `NAME` |
| `CALLNAME:(LOCAL:10)` | 5 | 0 | 1 | `CALLNAME` |
| `CALLNAME:B` | 5 | 0 | 2 | `CALLNAME` |
| `NAME:(LOCAL:1)` | 5 | 0 | 2 | `NAME` |
| `NO:(LOCAL:1)` | 5 | 0 | 3 | `NO` |
| `NO:ARG` | 4 | 0 | 2 | `NO` |
| `NO:L` | 4 | 0 | 1 | `NO` |
| `CALLNAME:X` | 3 | 0 | 1 | `CALLNAME` |
| `NAME:C_NUM` | 3 | 0 | 1 | `NAME` |
| `NO` | 3 | 0 | 1 | `NO` |

## 한계

- `definition/static`: 정의 데이터.
- `script/local`: 계산용 프레임.
- `persistent/name+erb`: 이름 CSV 정의와 ERB 사용 근거가 있는 슬롯.
- `persistent/chara-seed+erb`: 캐릭터 CSV 초기값과 ERB 사용 근거가 있는 슬롯.
- `persistent/erb-write-only-evidence`: CSV 이름/seed 없이 ERB write가 확인된 슬롯.
- `session-buffer`: 기능 실행 중 관리해야 하는 런타임 상태.
