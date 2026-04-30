# ERB 상태 스캔

## 스캔 범위

- ERB 파일 수: 372
- 상태 접근식 unique key 수: 3627
- 숫자 슬롯 후보 unique 수: 1510
- script/local 접근식 unique 수: 220
- 동적/스칼라 비-script 접근식 unique 수: 306
- 상태 참조 총 발생 수: 85756
- #DIM/#DIMS 선언 수: 80
- 라벨 unique 수: 1549
- 라벨 정의 총 수: 1550
- missingMapping 포함 접근식 unique 수: 2230
- missingMapping 포함 숫자 슬롯 후보 unique 수: 888

## 도메인 후보별 상태 key 수

| 도메인 후보 | unique key | 발생 수 |
| --- | ---: | ---: |
| `body` | 26 | 733 |
| `body|feature-session` | 38 | 1258 |
| `body|people` | 233 | 2285 |
| `definitions` | 288 | 3598 |
| `definitions|text` | 2 | 100 |
| `economy` | 2 | 355 |
| `feature-session` | 86 | 10344 |
| `feature-session|body` | 2 | 769 |
| `feature-session|interaction|equipment|missingMapping` | 35 | 1688 |
| `feature-session|interaction|missingMapping` | 139 | 2276 |
| `feature-session|script` | 2 | 216 |
| `feature-session|text|script` | 7 | 17 |
| `feature-state|economy` | 3 | 3 |
| `interaction|feature-session` | 1 | 342 |
| `inventory` | 61 | 404 |
| `inventory|feature-state` | 24 | 57 |
| `people` | 199 | 9507 |
| `people|body` | 20 | 340 |
| `people|body|feature-state|world|missingMapping` | 567 | 6126 |
| `people|body|missingMapping` | 1207 | 11578 |
| `people|text` | 54 | 2545 |
| `run` | 10 | 471 |
| `save` | 1 | 3 |
| `script` | 215 | 23642 |
| `script|ui-session` | 3 | 2617 |
| `script|ui-session|save` | 2 | 155 |
| `social` | 29 | 171 |
| `text|people|body|missingMapping` | 141 | 2441 |
| `world` | 89 | 183 |
| `world|missingMapping` | 141 | 1532 |

## family별 상태 key 수

| family | unique key | 발생 수 |
| --- | ---: | ---: |
| `A` | 23 | 4414 |
| `ABL` | 174 | 7546 |
| `ABLNAME` | 37 | 358 |
| `ARG` | 6 | 291 |
| `ARGS` | 2 | 297 |
| `ASSI` | 1 | 102 |
| `ASSIPLAY` | 1 | 400 |
| `B` | 5 | 3645 |
| `BASE` | 112 | 1368 |
| `BASENAME` | 1 | 2 |
| `BOUGHT` | 1 | 46 |
| `C` | 1 | 1772 |
| `CALLNAME` | 23 | 1911 |
| `CFLAG` | 567 | 6126 |
| `CHARANUM` | 1 | 461 |
| `CHARASALES` | 3 | 3 |
| `COUNT` | 1 | 581 |
| `CSTR` | 141 | 2441 |
| `D` | 1 | 1004 |
| `DAY` | 6 | 353 |
| `DOWN` | 5 | 31 |
| `E` | 2 | 1068 |
| `EJAC` | 1 | 342 |
| `EX` | 9 | 69 |
| `EXP` | 226 | 2254 |
| `EXPLV` | 7 | 391 |
| `EXPNAME` | 37 | 461 |
| `F` | 3 | 363 |
| `FLAG` | 115 | 1509 |
| `G` | 1 | 541 |
| `GLOBAL` | 89 | 183 |
| `GOTJUEL` | 5 | 17 |
| `H` | 3 | 26 |
| `I` | 1 | 261 |
| `ISASSI` | 5 | 12 |
| `ITEM` | 59 | 296 |
| `ITEMNAME` | 20 | 52 |
| `ITEMPRICE` | 2 | 4 |
| `ITEMSALES` | 24 | 57 |
| `J` | 10 | 228 |
| `JUEL` | 73 | 538 |
| `K` | 1 | 91 |
| `L` | 8 | 527 |
| `LOCAL` | 20 | 2416 |
| `LOCALS` | 7 | 594 |
| `LOSEBASE` | 2 | 769 |
| `M` | 1 | 140 |
| `MARK` | 20 | 340 |
| `MARKNAME` | 5 | 49 |
| `MASTER` | 1 | 63 |
| `MAXBASE` | 48 | 379 |
| `MONEY` | 2 | 355 |
| `N` | 1 | 215 |
| `NAME` | 22 | 524 |
| `NICKNAME` | 9 | 110 |
| `NO` | 19 | 1488 |
| `NOITEM` | 1 | 62 |
| `NOWEX` | 6 | 16 |
| `O` | 2 | 88 |
| `P` | 7 | 592 |
| `PALAM` | 33 | 1241 |
| `PALAMLV` | 16 | 1196 |
| `PALAMNAME` | 23 | 211 |
| `PBAND` | 28 | 75 |
| `PLAYER` | 1 | 35 |
| `PREVCOM` | 1 | 224 |
| `Q` | 1 | 133 |
| `R` | 1 | 205 |
| `RELATION` | 29 | 171 |
| `RESULT` | 3 | 2617 |
| `RESULTS` | 2 | 155 |
| `S` | 1 | 1694 |
| `SAVEDATA` | 1 | 3 |
| `SAVESTR` | 10 | 226 |
| `SELECTCOM` | 1 | 408 |
| `SOURCE` | 19 | 7784 |
| `STAIN` | 26 | 733 |
| `STR` | 2 | 100 |
| `T` | 83 | 566 |
| `TALENT` | 972 | 9255 |
| `TALENTNAME` | 137 | 870 |
| `TARGET` | 1 | 378 |
| `TCVAR` | 24 | 120 |
| `TEQUIP` | 35 | 1688 |
| `TFLAG` | 143 | 2426 |
| `TIME` | 2 | 66 |
| `TRAINNAME` | 3 | 4 |
| `TSTR` | 2 | 216 |
| `U` | 10 | 284 |
| `UP` | 18 | 424 |
| `V` | 1 | 639 |
| `W` | 9 | 51 |
| `X` | 1 | 362 |
| `Y` | 1 | 432 |
| `Z` | 1 | 122 |

## 가장 많이 등장한 숫자 슬롯 후보

| slot candidate | family | 도메인 후보 | 접근식 수 | 발생 수 | files |
| --- | --- | --- | ---: | ---: | ---: |
| `TALENT:122` | `TALENT` | `people|body|missingMapping` | 18 | 1066 | 50 |
| `ABL:10` | `ABL` | `people` | 7 | 1043 | 26 |
| `CFLAG:40` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 9 | 913 | 22 |
| `SOURCE:5` | `SOURCE` | `feature-session` | 1 | 836 | 10 |
| `SOURCE:1` | `SOURCE` | `feature-session` | 1 | 801 | 10 |
| `ABL:12` | `ABL` | `people` | 9 | 800 | 33 |
| `SOURCE:4` | `SOURCE` | `feature-session` | 1 | 760 | 10 |
| `SOURCE:13` | `SOURCE` | `feature-session` | 1 | 744 | 10 |
| `ABL:16` | `ABL` | `people` | 7 | 691 | 18 |
| `PALAM:5` | `PALAM` | `body|feature-session` | 2 | 688 | 12 |
| `SOURCE:3` | `SOURCE` | `feature-session` | 1 | 667 | 10 |
| `SOURCE:6` | `SOURCE` | `feature-session` | 1 | 641 | 10 |
| `ABL:11` | `ABL` | `people` | 8 | 526 | 25 |
| `SOURCE:2` | `SOURCE` | `feature-session` | 1 | 525 | 10 |
| `SOURCE:0` | `SOURCE` | `feature-session` | 1 | 501 | 10 |
| `ABL:0` | `ABL` | `people` | 8 | 499 | 29 |
| `LOSEBASE:0` | `LOSEBASE` | `feature-session|body` | 1 | 475 | 10 |
| `TALENT:76` | `TALENT` | `people|body|missingMapping` | 12 | 458 | 37 |
| `ABL:32` | `ABL` | `people` | 4 | 443 | 13 |
| `PALAMLV:4` | `PALAMLV` | `definitions` | 1 | 436 | 10 |
| `ABL:2` | `ABL` | `people` | 9 | 399 | 23 |
| `SOURCE:7` | `SOURCE` | `feature-session` | 1 | 398 | 10 |
| `EXP:0` | `EXP` | `people|body|missingMapping` | 10 | 392 | 25 |
| `TALENT:121` | `TALENT` | `people|body|missingMapping` | 18 | 384 | 42 |
| `CFLAG:42` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 10 | 381 | 23 |
| `TALENT:85` | `TALENT` | `people|body|missingMapping` | 12 | 366 | 33 |
| `ABL:3` | `ABL` | `people` | 8 | 358 | 17 |
| `SOURCE:14` | `SOURCE` | `feature-session` | 1 | 348 | 10 |
| `TALENT:432` | `TALENT` | `people|body|missingMapping` | 12 | 347 | 28 |
| `PALAM:3` | `PALAM` | `body|feature-session` | 2 | 343 | 12 |
| `STAIN:2` | `STAIN` | `body` | 4 | 328 | 24 |
| `BASE:0` | `BASE` | `body|people` | 13 | 327 | 39 |
| `ABL:17` | `ABL` | `people` | 5 | 324 | 21 |
| `SOURCE:17` | `SOURCE` | `feature-session` | 1 | 313 | 10 |
| `ABL:21` | `ABL` | `people` | 7 | 302 | 19 |
| `SOURCE:12` | `SOURCE` | `feature-session` | 1 | 300 | 10 |
| `LOSEBASE:1` | `LOSEBASE` | `feature-session|body` | 1 | 294 | 10 |
| `CFLAG:170` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 2 | 288 | 11 |
| `BASE:2` | `BASE` | `body|people` | 5 | 284 | 18 |
| `SOURCE:8` | `SOURCE` | `feature-session` | 1 | 272 | 10 |

## 가장 많이 등장한 상태 접근식

| key | slot candidate | 도메인 후보 | read | write | files |
| --- | --- | --- | ---: | ---: | ---: |
| `A` | `` | `script` | 2484 | 1684 | 177 |
| `B` | `` | `script` | 2405 | 1233 | 136 |
| `RESULT` | `` | `script|ui-session` | 2610 | 2 | 189 |
| `C` | `` | `script` | 1111 | 661 | 89 |
| `S` | `` | `script` | 282 | 1412 | 88 |
| `LOCAL` | `` | `script` | 696 | 433 | 114 |
| `E` | `` | `script` | 422 | 638 | 101 |
| `D` | `` | `script` | 481 | 523 | 51 |
| `ABL:10` | `ABL:10` | `people` | 882 | 42 | 123 |
| `CFLAG:40` | `CFLAG:40` | `people|body|feature-state|world|missingMapping` | 779 | 94 | 24 |
| `NO:TARGET` | `` | `people` | 853 | 0 | 47 |
| `SOURCE:5` | `SOURCE:5` | `feature-session` | 560 | 276 | 54 |
| `SOURCE:1` | `SOURCE:1` | `feature-session` | 617 | 184 | 33 |
| `SOURCE:4` | `SOURCE:4` | `feature-session` | 387 | 373 | 58 |
| `SOURCE:13` | `SOURCE:13` | `feature-session` | 371 | 373 | 74 |
| `CALLNAME:TARGET` | `` | `people|text` | 717 | 1 | 61 |
| `PALAM:5` | `PALAM:5` | `body|feature-session` | 685 | 0 | 91 |
| `SOURCE:3` | `SOURCE:3` | `feature-session` | 340 | 327 | 40 |
| `ABL:16` | `ABL:16` | `people` | 655 | 10 | 76 |
| `ABL:12` | `ABL:12` | `people` | 646 | 10 | 70 |
| `LOCAL:1` | `` | `script` | 241 | 415 | 68 |
| `SOURCE:6` | `SOURCE:6` | `feature-session` | 279 | 362 | 53 |
| `V` | `` | `script` | 328 | 311 | 58 |
| `COUNT` | `` | `script` | 561 | 20 | 92 |
| `G` | `` | `script` | 234 | 307 | 23 |
| `SOURCE:2` | `SOURCE:2` | `feature-session` | 409 | 116 | 27 |
| `SOURCE:0` | `SOURCE:0` | `feature-session` | 264 | 237 | 37 |
| `L` | `` | `script` | 165 | 327 | 49 |
| `TALENT:122` | `TALENT:122` | `people|body|missingMapping` | 490 | 0 | 126 |
| `LOSEBASE:0` | `LOSEBASE:0` | `feature-session|body` | 189 | 286 | 116 |
| `CHARANUM` | `` | `people` | 461 | 0 | 104 |
| `ABL:11` | `ABL:11` | `people` | 437 | 11 | 82 |
| `PALAMLV:4` | `PALAMLV:4` | `definitions` | 436 | 0 | 101 |
| `ABL:32` | `ABL:32` | `people` | 426 | 6 | 47 |
| `Y` | `` | `script` | 161 | 271 | 41 |
| `LOCALS:2` | `` | `script` | 406 | 6 | 1 |
| `SELECTCOM` | `` | `feature-session` | 389 | 19 | 32 |
| `ASSIPLAY` | `` | `feature-session` | 398 | 2 | 88 |
| `SOURCE:7` | `SOURCE:7` | `feature-session` | 53 | 345 | 56 |
| `TARGET` | `` | `feature-session` | 152 | 226 | 89 |

## missingMapping 포함 상태

- 총 2230개 접근식 unique key가 `missingMapping` 후보를 포함한다.
- 총 888개 숫자 슬롯 후보가 `missingMapping` 후보를 포함한다.

| slot candidate | family | 도메인 후보 | 접근식 수 | 발생 수 | files |
| --- | --- | --- | ---: | ---: | ---: |
| `TALENT:122` | `TALENT` | `people|body|missingMapping` | 18 | 1066 | 50 |
| `CFLAG:40` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 9 | 913 | 22 |
| `TALENT:76` | `TALENT` | `people|body|missingMapping` | 12 | 458 | 37 |
| `EXP:0` | `EXP` | `people|body|missingMapping` | 10 | 392 | 25 |
| `TALENT:121` | `TALENT` | `people|body|missingMapping` | 18 | 384 | 42 |
| `CFLAG:42` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 10 | 381 | 23 |
| `TALENT:85` | `TALENT` | `people|body|missingMapping` | 12 | 366 | 33 |
| `TALENT:432` | `TALENT` | `people|body|missingMapping` | 12 | 347 | 28 |
| `CFLAG:170` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 2 | 288 | 11 |
| `CFLAG:627` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 1 | 266 | 1 |
| `CFLAG:41` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 8 | 239 | 18 |
| `CSTR:1` | `CSTR` | `text|people|body|missingMapping` | 10 | 238 | 22 |
| `TEQUIP:90` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 237 | 10 |
| `CFLAG:16` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 11 | 219 | 29 |
| `EXP:1` | `EXP` | `people|body|missingMapping` | 10 | 213 | 18 |
| `CFLAG:171` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 2 | 210 | 5 |
| `TFLAG:14` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 205 | 10 |
| `TEQUIP:89` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 194 | 10 |
| `CFLAG:15` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 13 | 186 | 28 |
| `CSTR:7` | `CSTR` | `text|people|body|missingMapping` | 5 | 183 | 11 |
| `TALENT:0` | `TALENT` | `people|body|missingMapping` | 15 | 182 | 35 |
| `FLAG:42` | `FLAG` | `world|missingMapping` | 1 | 172 | 10 |
| `TFLAG:400` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 161 | 1 |
| `TALENT:422` | `TALENT` | `people|body|missingMapping` | 4 | 146 | 17 |
| `CFLAG:130` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 6 | 143 | 10 |
| `CSTR:0` | `CSTR` | `text|people|body|missingMapping` | 10 | 141 | 22 |
| `CFLAG:12` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 7 | 134 | 15 |
| `TALENT:83` | `TALENT` | `people|body|missingMapping` | 9 | 134 | 22 |
| `CSTR:80` | `CSTR` | `text|people|body|missingMapping` | 5 | 129 | 16 |
| `EXP:40` | `EXP` | `people|body|missingMapping` | 7 | 128 | 14 |
| `CSTR:12` | `CSTR` | `text|people|body|missingMapping` | 2 | 122 | 3 |
| `CSTR:32` | `CSTR` | `text|people|body|missingMapping` | 2 | 122 | 4 |
| `EXP:50` | `EXP` | `people|body|missingMapping` | 7 | 119 | 20 |
| `TALENT:35` | `TALENT` | `people|body|missingMapping` | 5 | 118 | 18 |
| `TFLAG:50` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 118 | 10 |
| `TALENT:135` | `TALENT` | `people|body|missingMapping` | 8 | 117 | 19 |
| `TALENT:505` | `TALENT` | `people|body|missingMapping` | 7 | 117 | 30 |
| `TEQUIP:150` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 117 | 8 |
| `TALENT:153` | `TALENT` | `people|body|missingMapping` | 12 | 111 | 29 |
| `TALENT:62` | `TALENT` | `people|body|missingMapping` | 3 | 110 | 12 |
| `CSTR:13` | `CSTR` | `text|people|body|missingMapping` | 1 | 109 | 4 |
| `CSTR:33` | `CSTR` | `text|people|body|missingMapping` | 1 | 109 | 4 |
| `CSTR:42` | `CSTR` | `text|people|body|missingMapping` | 2 | 109 | 2 |
| `CSTR:3` | `CSTR` | `text|people|body|missingMapping` | 8 | 106 | 16 |
| `TALENT:71` | `TALENT` | `people|body|missingMapping` | 7 | 104 | 13 |
| `TEQUIP:70` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 103 | 6 |
| `CFLAG:173` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 1 | 97 | 8 |
| `TFLAG:160` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 96 | 3 |
| `CFLAG:7` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 2 | 94 | 11 |
| `TALENT:61` | `TALENT` | `people|body|missingMapping` | 2 | 94 | 11 |
| `TEQUIP:11` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 94 | 10 |
| `EXP:41` | `EXP` | `people|body|missingMapping` | 4 | 93 | 12 |
| `TALENT:100` | `TALENT` | `people|body|missingMapping` | 7 | 93 | 16 |
| `EXP:20` | `EXP` | `people|body|missingMapping` | 8 | 92 | 18 |
| `TEQUIP:55` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 90 | 5 |
| `CFLAG:600` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 5 | 87 | 8 |
| `TALENT:110` | `TALENT` | `people|body|missingMapping` | 9 | 87 | 20 |
| `TALENT:30` | `TALENT` | `people|body|missingMapping` | 7 | 87 | 17 |
| `EXP:3` | `EXP` | `people|body|missingMapping` | 8 | 85 | 21 |
| `TALENT:2` | `TALENT` | `people|body|missingMapping` | 10 | 85 | 26 |
| `CFLAG:178` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 1 | 80 | 3 |
| `CSTR:8` | `CSTR` | `text|people|body|missingMapping` | 5 | 80 | 8 |
| `FLAG:49` | `FLAG` | `world|missingMapping` | 1 | 80 | 1 |
| `CFLAG:6` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 6 | 79 | 14 |
| `CFLAG:602` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 5 | 79 | 8 |
| `EXP:23` | `EXP` | `people|body|missingMapping` | 3 | 78 | 13 |
| `TFLAG:407` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 78 | 1 |
| `CFLAG:110` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 11 | 76 | 16 |
| `TEQUIP:13` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 76 | 10 |
| `TEQUIP:44` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 76 | 10 |
| `EXP:91` | `EXP` | `people|body|missingMapping` | 5 | 73 | 10 |
| `TALENT:109` | `TALENT` | `people|body|missingMapping` | 8 | 73 | 19 |
| `TALENT:114` | `TALENT` | `people|body|missingMapping` | 9 | 73 | 19 |
| `TALENT:132` | `TALENT` | `people|body|missingMapping` | 4 | 73 | 19 |
| `TALENT:203` | `TALENT` | `people|body|missingMapping` | 6 | 73 | 26 |
| `TALENT:63` | `TALENT` | `people|body|missingMapping` | 6 | 72 | 19 |
| `TALENT:22` | `TALENT` | `people|body|missingMapping` | 2 | 70 | 13 |
| `CFLAG:2` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 3 | 69 | 12 |
| `TALENT:1` | `TALENT` | `people|body|missingMapping` | 12 | 69 | 25 |
| `TALENT:184` | `TALENT` | `people|body|missingMapping` | 9 | 68 | 26 |
| `FLAG:560` | `FLAG` | `world|missingMapping` | 1 | 67 | 2 |
| `TALENT:33` | `TALENT` | `people|body|missingMapping` | 4 | 67 | 16 |
| `EXP:120` | `EXP` | `people|body|missingMapping` | 2 | 66 | 4 |
| `FLAG:48` | `FLAG` | `world|missingMapping` | 1 | 66 | 3 |
| `CFLAG:1` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 5 | 65 | 17 |
| `EXP:121` | `EXP` | `people|body|missingMapping` | 2 | 65 | 3 |
| `TALENT:99` | `TALENT` | `people|body|missingMapping` | 6 | 65 | 13 |
| `TFLAG:401` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 65 | 1 |
| `TALENT:11` | `TALENT` | `people|body|missingMapping` | 4 | 64 | 16 |
| `TEQUIP:53` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 64 | 10 |
| `TFLAG:180` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 64 | 4 |
| `EXP:123` | `EXP` | `people|body|missingMapping` | 2 | 63 | 2 |
| `TALENT:70` | `TALENT` | `people|body|missingMapping` | 6 | 63 | 16 |
| `TEQUIP:54` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 63 | 10 |
| `EXP:122` | `EXP` | `people|body|missingMapping` | 2 | 62 | 2 |
| `FLAG:6` | `FLAG` | `world|missingMapping` | 1 | 62 | 10 |
| `TEQUIP:58` | `TEQUIP` | `feature-session|interaction|equipment|missingMapping` | 1 | 62 | 10 |
| `TFLAG:29` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 62 | 3 |
| `TALENT:330` | `TALENT` | `people|body|missingMapping` | 3 | 61 | 19 |
| `TALENT:88` | `TALENT` | `people|body|missingMapping` | 9 | 61 | 16 |
| `FLAG:50` | `FLAG` | `world|missingMapping` | 1 | 60 | 7 |
| `TALENT:199` | `TALENT` | `people|body|missingMapping` | 3 | 60 | 6 |
| `CFLAG:616` | `CFLAG` | `people|body|feature-state|world|missingMapping` | 5 | 59 | 10 |
| `FLAG:5` | `FLAG` | `world|missingMapping` | 1 | 59 | 10 |
| `FLAG:53` | `FLAG` | `world|missingMapping` | 1 | 59 | 4 |
| `TALENT:20` | `TALENT` | `people|body|missingMapping` | 3 | 59 | 12 |
| `TALENT:32` | `TALENT` | `people|body|missingMapping` | 2 | 58 | 13 |
| `TALENT:82` | `TALENT` | `people|body|missingMapping` | 4 | 58 | 16 |
| `TFLAG:200` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 58 | 10 |
| `TALENT:154` | `TALENT` | `people|body|missingMapping` | 9 | 57 | 20 |
| `TALENT:34` | `TALENT` | `people|body|missingMapping` | 2 | 57 | 13 |
| `TALENT:80` | `TALENT` | `people|body|missingMapping` | 2 | 57 | 13 |
| `TALENT:116` | `TALENT` | `people|body|missingMapping` | 8 | 56 | 18 |
| `TALENT:31` | `TALENT` | `people|body|missingMapping` | 6 | 56 | 16 |
| `TALENT:430` | `TALENT` | `people|body|missingMapping` | 6 | 56 | 27 |
| `TFLAG:100` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 56 | 10 |
| `TALENT:13` | `TALENT` | `people|body|missingMapping` | 7 | 55 | 16 |
| `TALENT:21` | `TALENT` | `people|body|missingMapping` | 2 | 55 | 13 |
| `TALENT:57` | `TALENT` | `people|body|missingMapping` | 6 | 55 | 9 |
| `TFLAG:13` | `TFLAG` | `feature-session|interaction|missingMapping` | 1 | 55 | 10 |

## ERB operation 집계

| operation | 발생 수 | files |
| --- | ---: | ---: |
| `ADDCHARA` | 69 | 41 |
| `CALL` | 1961 | 292 |
| `CALLFORM` | 38 | 8 |
| `DELCHARA` | 4 | 4 |
| `DOTRAIN` | 2 | 1 |
| `DRAWLINE` | 382 | 99 |
| `GETCHARA` | 217 | 47 |
| `GOTO` | 938 | 101 |
| `INPUT` | 458 | 123 |
| `JUMP` | 59 | 27 |
| `LOADGAME` | 1 | 1 |
| `RAND` | 817 | 96 |
| `RANDCHOOSE` | 3 | 2 |
| `RANDCHOOSE_NUM` | 20 | 1 |
| `RETURN` | 3527 | 317 |
| `SAVEDATA` | 3 | 1 |
| `SAVEGAME` | 1 | 1 |
| `TRYCCALLFORM` | 14 | 7 |
| `WAIT` | 473 | 102 |

## 산출물

- 전체 JSON: `data/legacy-state-scan/erb-state-inventory.json`
- 재생성 명령: `npm run scan:erb-states`

## 한계

- 이 스캔은 ERB의 상태 참조를 빠뜨리지 않기 위한 기계 추출이다.
- 슬롯의 최종 의미는 자동 확정하지 않는다.
- `missingMapping`이 포함된 항목은 별도 슬롯 사전에서 승인해야 한다.
- 동적 `CALLFORM`이나 문자열 조합으로 만들어지는 의미는 operation/label 근거로 따로 검토해야 한다.
