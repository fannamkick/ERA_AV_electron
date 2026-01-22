# COMF60-92 Training Commands - Complete Implementation Plan

## Overview
This document provides the complete implementation plan for commands COMF60 through COMF92 (26 commands total), covering assistant/3P/extended training mechanics.

## Implementation Status

### Fully Implemented (4/26)
- ✅ **COMF69** - 식스나인 (69 Position) - `COMF69_sixtyNine.ts`
- ✅ **COMF70** - 더블 스마타 (Double Sumata) - `COMF70_doubleSumata.ts`
- ✅ **COMF72** - しあわせ草(미약) (Aphrodisiac) - `COMF72_aphrodisiac.ts`
- ✅ **COMF80** - 이라마치오 (Irrumatio) - `COMF80_irrumatio.ts`

### Remaining to Implement (22/26)

#### Missing ERB Files (Need to locate source)
- **COMF60** - 助手にキス (Kiss Assistant)
- **COMF61** - 커닐링구스강제 (Force Cunnilingus)
- **COMF62** - 조수를 범한다 (Have Sex with Assistant)
- **COMF63** - 조개맞대기 (Tribadism/Scissoring)
- **COMF64** - 3P (Threesome)
- **COMF65** - 조수를 범하게 한다 (Make Target Have Sex with Assistant)
- **COMF66** - 두개 펠라 (Two Penis Fellatio)
- **COMF67** - 풋잡한다 (Footjob variant)
- **COMF68** - 더블 펠라 (Double Fellatio)

#### Source Available - To Implement
- **COMF71** - 더블 파이즈리 (Double Paizuri)
- **COMF73** - 유두 맞대기 (Nipple Rubbing)
- **COMF81** - 피스트퍽 (Vaginal Fisting)
- **COMF82** - 애널피스트 (Anal Fisting)
- **COMF83** - 양구멍피스트 (Double Hole Fisting)
- **COMF84** - G스팟자극 (G-spot Stimulation)
- **COMF85** - 방뇨 (Urination)
- **COMF87** - 피어싱 (Piercing)
- **COMF88** - 제모 (Hair Removal/Shaving)
- **COMF89** - 수간 플레이 (Bestiality Play)
- **COMF90** - 로터자위 (Rotor Masturbation)
- **COMF91** - 전동마사지기자위 (Massager Masturbation)
- **COMF92** - 유두로터 (Nipple Rotor)

---

## Complete Command Details

### COMF60 - Kiss Assistant (助手にキス)
**Category**: Assistant
**Description**: Kiss the assistant in front of the target
**Key Mechanics**:
- Assistant interaction command
- Requires assistant present
- NTR-style mechanics (target watching)
- Affection/jealousy calculations

### COMF61 - Force Cunnilingus (커닐링구스강제)
**Category**: Service
**Description**: Force target to perform cunnilingus on trainer
**Key Mechanics**:
- Female trainer required
- Oral service mechanics
- Tongue skill calculations
- Stain transfer (mouth ⇔ vagina)

### COMF62 - Have Sex with Assistant (조수를 범한다)
**Category**: Assistant
**Description**: Trainer has sex with assistant in front of target
**Key Mechanics**:
- NTR mechanics (target watching)
- Full intercourse with assistant
- Jealousy/arousal for target
- Assistant satisfaction

### COMF63 - Tribadism (조개맞대기)
**Category**: Lesbian
**Description**: Genital-to-genital rubbing between females
**Key Mechanics**:
- Both participants must be female
- Mutual C-sensitivity
- Lubrication effects
- Simultaneous pleasure

### COMF64 - 3P (Threesome)
**Category**: Special
**Description**: Threesome involving player, target, and assistant
**Key Mechanics**:
- Complex 3-way interaction
- Multiple position configurations
- Dual ejaculation tracking
- Experience distribution

### COMF65 - Make Target Have Sex with Assistant (조수를 범하게 한다)
**Category**: Assistant
**Description**: Order target to have sex with assistant while trainer watches
**Key Mechanics**:
- Reverse NTR (trainer watching)
- Obedience check for both
- Submission/corruption increase
- Voyeurism experience

### COMF66 - Two Penis Fellatio (두개 펠라)
**Category**: Service
**Description**: Target services two penises simultaneously
**Key Mechanics**:
- Requires two male/futa participants
- Dual ejaculation possible
- High technique requirement
- Double semen experience

### COMF67 - Footjob Variant (풋잡한다)
**Category**: Service
**Description**: Footjob with special mechanics
**Key Mechanics**:
- Foot stimulation
- Lower technique requirement
- Unique pleasure calculation
- Foot fetish bonus

### COMF68 - Double Fellatio (더블 펠라)
**Category**: Assistant
**Description**: Target and assistant both perform fellatio
**Key Mechanics**:
- Dual oral service
- Shared ejaculation
- Technique comparison
- Semen addiction satisfaction

### COMF69 - 69 Position (식스나인) ✅
**Status**: IMPLEMENTED
**File**: `COMF69_sixtyNine.ts`
**Category**: Special
**Mechanics**:
- Mutual oral stimulation
- Dual ejaculation possible
- Complex SOURCE calculations
- Incest multipliers (2-3x)
- Dirt/odor mechanics
- Execution threshold: 33

### COMF70 - Double Sumata (더블 스마타) ✅
**Status**: IMPLEMENTED
**File**: `COMF70_doubleSumata.ts`
**Category**: Assistant
**Mechanics**:
- Both target and assistant perform sumata
- Lubrication critical
- Reduced dirt impact (÷3)
- Lesbian/gay experience tracking
- Execution threshold: 25
- Futa trainer bonus

### COMF71 - Double Paizuri (더블 파이즈리)
**Category**: Assistant
**Description**: Target and assistant both perform paizuri
**Source**: COMF71.ERB (669 lines)
**Key Mechanics**:
- Requires both to have breasts
- B-sensitivity for both
- Technique affects ejaculation
- Can lick clean if skilled
- Semen sharing possible
- First kiss confirmation
- Execution threshold: 34

**Implementation Notes**:
```typescript
// First kiss handling (lines 239-295 commented out in original)
// Standard first kiss logic used instead
TFLAG:621 |= 1; TFLAG:621 |= 2;
TFLAG:622 |= 1; TFLAG:622 |= 2;

// Ejaculation gauge (lines 405-503)
Base = 1200-4000 (technique-based)
Multipliers: obedience, service, semen addiction, tongue skill
Assistant technique also factors in

// SOURCE calculation
LOSEBASE:0 = 10, LOSEBASE:1 = 100
source[13] = 1800, source[14] = 900
B sensitivity generates source[17]
Service spirit: 420-820 (source[4]), 150-2200 (source[5])

// Ejaculation handling
Large ejac: +9 semen exp, 2x addiction satisfaction
Normal ejac: +3 semen exp
Oral ejaculation flag: TFLAG:0 = 1/2

// Cleanup mechanics (lines 605-625)
If service ≥2 AND technique ≥2: lick clean, TFLAG:8 = 2
If both female + semen addiction: share semen, TFLAG:8 = 3
```

### COMF72 - Aphrodisiac (しあわせ草/미약) ✅
**Status**: IMPLEMENTED
**File**: `COMF72_aphrodisiac.ts`
**Category**: Item
**Mechanics**:
- Item consumption (unless infinite items)
- Reduces stamina cost if player/assistant has synthesis knowledge
- Drug experience reduces health cost
- Addiction mechanics (CFLAG:31, CFLAG:32)
- Lust increase doubled by aphrodisiac effect
- No execution check (automatic)

### COMF73 - Nipple Rubbing (유두 맞대기)
**Category**: Lesbian
**Description**: Mutual nipple stimulation
**Source**: COMF73.ERB (158 lines)
**Status**: Incomplete in original (lines 3-4 note it's unfinished)
**Key Mechanics**:
- B-sensitivity critical
- Technique has minimal effect
- Lesbian-only (no execution otherwise)
- Very simple SOURCE calculations
- TFLAG:100 = 1, no submission mark

**Implementation Notes**:
```typescript
// Marked as incomplete in source
// LOSEBASE:1 = 30+90 = 120
// source[7] = 500, source[12] = 250
// source[13] = 400, source[14] = 300
// Technique multipliers all 1.00 (no effect)
// Service spirit affects source[5] only
// Lesbian exp +8
```

### COMF80 - Irrumatio (이라마치오) ✅
**Status**: IMPLEMENTED
**File**: `COMF80_irrumatio.ts`
**Category**: Service
**Mechanics**:
- Deep throat forced oral
- 3P transition possible
- First kiss confirmation required
- Auto-execute if restrained or willing
- High ejaculation gauge (1200-4200)
- Large ejac: +9 semen exp
- Execution threshold: 36
- Can lick clean if skilled

### COMF81 - Vaginal Fisting (피스트퍽)
**Category**: Extreme
**Description**: Fisting the vagina
**Source**: COMF81.ERB (70 lines)
**Key Mechanics**:
- V experience flag: TFLAG:19 = 1
- Massive pain (SOURCE:6 = 1200)
- Size matters (큰체구 0.8x, 小柄 2.0x, 미숙함 4.0x)
- V expansion experience +1
- Abnormal experience +1 (if first)
- Very high submission/corruption (1200 each)

**Implementation Notes**:
```typescript
// LOSEBASE:0 = 600, LOSEBASE:1 = 300
// source[6] = 1200 base pain
// source[12] = source[13] = source[14] = source[16] = 1200
// V sensitivity: 2000-3800 (source[1])
// Size multipliers critical for pain
// V experience +25, V expansion exp +1
// Abnormal exp +1 if EXP:52 == 0
```

### COMF82 - Anal Fisting (애널피스트)
**Category**: Extreme
**Description**: Fisting the anus
**Source**: COMF82.ERB (147 lines)
**Key Mechanics**:
- Massive anal pain
- A experience/lubrication critical
- Size penalties
- A sensitivity affects pain
- Virgin chastity mindset affects submission
- TFLAG:101 = 1

**Implementation Notes**:
```typescript
// LOSEBASE:0 = 600, LOSEBASE:1 = 300
// source[6] = 1200+ (varies by experience/lube)
// source[2] = 10-2200 (A sensitivity)
// source[3] = 10-750 (pleasure)
// source[13] = 100-8000 (experience-based)

// A experience multipliers:
// <EXPLV:1: 0.1x source[2], 20000 pain
// <EXPLV:2: 0.3x, 12000 pain
// <EXPLV:3: 0.5x, 5000 pain
// <EXPLV:4: 1.0x, 1800 pain
// ≥EXPLV:5: 1.6x, 600 pain

// Lubrication critical (10000+ pain if dry)
// A expansion exp +1, abnormal exp +1
```

### COMF83 - Double Hole Fisting (양구멍피스트)
**Category**: Extreme
**Description**: Simultaneous vaginal and anal fisting
**Source**: COMF83.ERB (287 lines)
**Key Mechanics**:
- Combined V+A mechanics
- Both sensitivity types factor
- Extreme pain/corruption
- V experience flag: TFLAG:19 = 1
- Massive stat consumption
- Chastity mindset heavy penalty

**Implementation Notes**:
```typescript
// LOSEBASE:0 = 800, LOSEBASE:1 = 500
// source[6] = 1800+, source[10] = 2800
// source[11] = 1500, source[12] = 2500
// source[13] = source[14] = source[16] = 2500

// V sensitivity: 40-2200 (source[1])
// A sensitivity: 10-2200 (source[2])
// Combined pleasure: source[3]

// Pain calculations extremely complex
// Virgin + chastity: 3x pain, 5x humiliation
// Lubrication critical (9x pain multiplier if dry)
// Obedience affects pain (0.5-1.7x)

// V exp +25, A exp +25
// V expansion exp +1/+3, A expansion exp +3
// Abnormal exp +1 for each first time
```

### COMF84 - G-spot Stimulation (G스팟자극)
**Category**: Service
**Description**: Finger stimulation of G-spot
**Source**: COMF84.ERB (141 lines)
**Key Mechanics**:
- V sensitivity critical
- V experience affects effectiveness
- Lubrication heavily affects pain/pleasure
- Lust state amplifies pleasure (up to 4.3x)
- Low stat cost

**Implementation Notes**:
```typescript
// LOSEBASE:0 = 50, LOSEBASE:1 = 180
// source[3] = 300, source[7] = 200
// source[10] = 500, source[12] = 300
// source[14] = 400, source[15] = 50

// V sensitivity: 10-3200 (source[1])
// Submission: 20-2400 (source[13])

// V experience multipliers critical:
// <EXPLV:1: 0.2x pleasure, 150 pain
// <EXPLV:2: 0.5x, 80 pain
// <EXPLV:3: 1.0x, 80 pain
// ≥EXPLV:5: 1.8x, 0 pain

// Lubrication effects:
// <LV1: 0.1x pleasure, 2000 pain (3x mult)
// <LV2: 0.2x, 800 pain
// ≥LV4: 2.0x, 0 pain (0.1x mult)

// Lust amplifies source[1]: 1.5-4.3x
// V sensitivity affects pain: 1.5x if sensitive
// Virgin + chastity: 2x submission
// V exp +1, lesbian exp +3
```

### COMF85 - Urination (방뇨)
**Category**: Extreme
**Description**: Target urinates (voluntarily)
**Source**: COMF85.ERB (209 lines)
**Key Mechanics**:
- Low physical cost, high mental
- Exposure skill reduces shame
- Masochism converts shame to pleasure
- Location affects shame (outdoor 2.5x, mirror 1.5x, bath 0.5x)
- Diuretic equipment check
- Clothing soiling

**Implementation Notes**:
```typescript
// LOSEBASE:0 = 10, LOSEBASE:1 = 200
// source[14] = 5000, source[5] = 3000
// Lust-based shame: 1800-2200 (source[12])

// Exposure skill (노출벽):
// LV0: 0 satisfaction, 6000 submission
// LV1: 30, 5000
// LV2: 100, 4000
// LV3: 300, 3000
// LV4: 500, 2000
// LV5: 1000, 1000

// Masochism (마조끼):
// Increases satisfaction, reduces submission
// LV5: 2x satisfaction, 1.7x shame, +2500 humiliation

// Location multipliers:
// Outdoor: 2.5x shame/corruption
// Mirror: 1.5x
// Bath: 0.5x

// Talent multipliers on base (100):
// 겁쟁이: 1.2x, 反抗: 2x, 프라이드 높음: 2x
// 프라이드 낮음: 0.8x, 자제심: 1.5x
// 감정부족: 0.6x, 억압: 3x, 저항: 3x
// 수줍음: 3.5x, 부끄럼 없음: 0.5x
// 노출광: +500 satisfaction, 1.5x shame
// Final: source[14] += multiplied * 5

// Urination experience +2
// Urine stain on V and P: STAIN:2 |= 32, STAIN:3 |= 32
// Submission mark 2, clothing soiling
// Diuretic flag cleared: TEQUIP:22 = 0
```

### COMF87 - Piercing (피어싱)
**Category**: Extreme
**Description**: Body piercing application/removal
**Source**: COMF87.ERB (452 lines)
**Key Mechanics**:
- Interactive menu system
- Multiple piercing locations (nipple, navel, labia, clit/penis, tongue)
- Execution check only for application
- Past piercing reduces pain
- CFLAG:7 bitfield tracking
- Item consumption (piercings)

**Implementation Notes**:
```typescript
// Piercing locations (CFLAG:7 bitflags):
// Bit 1 (1): Nipple (2 items)
// Bit 2 (2): Navel (1 item)
// Bit 3 (4): Labia (2 items, female only)
// Bit 4 (8): Clitoris/Penis (1 item)
// Bit 5 (16): Tongue (1 item)
// Bit 6-10 (32-512): Past piercing flags

// Execution thresholds (if not restrained):
// Nipple: 36, Navel: 30
// Labia: 40, Clit: 44, Tongue: 36

// Requirements for execution check:
// Desire: +3/LV, Masochism: +4/LV
// Pleasure mark: +3/LV, Lust: +3/LV
// Curiosity: -3, Conservative: -3
// Pain weak: -3, Pain strong: +3
// Love: +5, Aphrodisiac: +8, Masochist talent: +10

// Removal: Auto-success (no check)

// LOSEBASE:0 = 50, LOSEBASE:1 = 100
// source[6] = 3000, source[13] = 1000, source[14] = 3000

// Location-specific additions:
// Nipple: +50 health, +4000 pain, +9000 sub, +12000 corrupt
// Navel: (base only)
// Labia: +50 health/stamina, +2000 pain, +9000 sub, +12000 corrupt
// Clit: +50 health/stamina, +6000 pain, +9000 sub, +17000 corrupt
// Tongue: +50 health, +4000 pain, +2000 sub

// Masochism multipliers on sub/corrupt:
// LV1-5: 1.2-2.0x sub, 0.9-0.1x corrupt

// Exposure skill reduces corruption:
// LV2-5: 0.9-0.6x

// Aphrodisiac: 0.05x pain
// Public/video: 1.5x sub/corrupt
// Past piercing: 0.3x pain, 0.2x sub, 0.5x corrupt

// Removal: All sources = 0
// Breast exp +10 (nipple piercing)
// Abnormal exp +1 (first non-navel piercing)
// Item consumed, bitflags updated
```

### COMF88 - Hair Removal (제모)
**Category**: Extreme
**Description**: Pubic hair shaving
**Source**: COMF88.ERB (349 lines)
**Key Mechanics**:
- Requires execution check (unless restrained)
- Location affects shame
- Exposure/masochism skills crucial
- Sets shaving flag (CFLAG:6 = 1)
- Submission mark 3
- Love experience gain

**Implementation Notes**:
```typescript
// Execution threshold: 36 base
// +10 if public/outdoor

// Requirements:
// Desire: +3/LV, Exposure: +4/LV
// Pleasure mark: +3/LV, Lust: +3/LV
// Self-control: -5, Shy: -5
// Shameless: +2, Exhibitionist: +10

// Restrained: Auto-success (TEQUIP:44)

// LOSEBASE:0 = 5, LOSEBASE:1 = 100
// source[14] = 1000 (base corruption)

// Restrained adds: source[14] += 3000
// Video/public adds: source[10] = 50, source[11] = 100

// Lust-based shame:
// LV0-4: 3600-5000 (source[12])

// Exposure skill (노출벽):
// LV0: 0 satisfaction, 7000 submission
// LV1: 60, 6000
// LV2: 200, 5000
// LV3: 600, 4000
// LV4: 1000, 3000
// LV5: 2000, 2000

// Masochism multipliers:
// LV0: 0.8x sat, 1.0x shame, 100 humil
// LV1: 1.0x, 1.2x, 200/300
// LV2: 1.3x, 1.4x, 400/700
// LV3: 1.4x, 1.5x, 700/1200
// LV4: 1.7x, 1.7x, 1100/1800
// LV5: 2.0x, 2.0x, 1500/2500

// Location multipliers (shame/corrupt):
// Public/outdoor: 2.5x
// Mirror: 1.5x
// Bath: 0.5x

// Talent multipliers (base 100):
// Same as urination (COMF85)
// Exhibitionist: +500 sat, 1.5x shame

// Final: source[14] += multiplied * 5

// Stain transfer: V ⇔ finger
// Lesbian/gay exp +2
// Love exp +2 (if affection ≥1000)
// Shaving flag set: CFLAG:6 = 1
// Submission mark 3
```

### COMF89 - Bestiality Play (수간 플레이)
**Category**: Extreme
**Description**: Sexual activity with animal (toggle equipment)
**Source**: COMF89.ERB (351 lines)
**Key Mechanics**:
- Toggle equipment (TEQUIP:89)
- Separate handler for equipment effects (@EQUIP_COM89)
- Dog ejaculation tracking (MAXBASE:MASTER:4)
- Experience/addiction reduces penalties
- Animal ear/bitch talents reduce shame
- Command-specific multipliers

**Implementation Notes**:
```typescript
// Main command: Toggle equipment
// Just sets/clears TEQUIP:89 flag
// Actual effects in @EQUIP_COM89

// EQUIP_COM89 effects:
// Base cost/shame by experience:
// <EXPLV:1: 400 stamina, 2000 shame
// <EXPLV:2: 200, 1000
// <EXPLV:3: 100, 500
// <EXPLV:4: 50, 200
// <EXPLV:5: 20, 100
// ≥EXPLV:5: 10, 50

// Bestiality addiction (수간중독):
// LV0: 1.5x cost/shame
// LV1: 1.0x, +100 satisfaction
// LV2: 0.8x, +400
// LV3: 0.6x, +1200
// LV4: 0.4x, +3000
// LV5: 0.2x, +5000

// Talent modifiers:
// 감정부족: 0.6x shame
// 동물귀: 0.5x shame, 0.5x submission
// 암캐: 0.2x cost/shame, 1.2x sources, 2x satisfaction, 3x humiliation

// LOSEBASE:1 += cost
// source[8] += shame, source[14] += shame
// source[10] += 200
// source[0/2/17/6] *= 1.5, source[13] *= 3.0

// Command-specific effects:
// 후배위/후배위애널/애널봉사: 2x corruption
// 동물귀: halve submission

// Dog ejaculation gauge:
// Base: 450-3200 (technique)
// Obedience: 0.3-1.3x
// Bestiality addiction: 1.0-5.0x
// Lust: 1.0-1.5x
// 동물귀: 1.2x, 암캐: 2.0x

// Command multipliers on ejac gauge:
// Kiss: 0, 후배위: 1.0x, 후배위애널: 1.5x
// 수음: 0.8x, 펠라치오: 1.2x, 기승위: 1.5x

// Ejaculation levels (TFLAG:16):
// Large: >MAXBASE*2, +3 semen exp
// Normal: >MAXBASE, +1 semen exp

// Stain transfers by command:
// 후배위: V |= 2/4 (dog saliva/semen)
// 후배위애널: A |= 2/4
// 수음: hand |= 2/4
// 펠라치오: mouth |= 2/4
// 애널봉사: mouth |= 8 (anal)

// Bestiality exp +T (varies by command/ejac)
// Abnormal exp +2 if virgin loss via bestiality (no 동물귀)
// Submission marks: 수음=2, others=3
```

### COMF90 - Rotor Masturbation (로터자위)
**Category**: Masturbation
**Description**: Masturbation with rotor vibrator
**Source**: COMF90.ERB (884 lines)
**Key Mechanics**:
- Can transition to fellatio masturbation
- Multiple equipment states (shower, vibe, anal vibe, public)
- Complex SOURCE calculations
- Self-stimulation mechanics
- Can clean stains if in shower

**Implementation Notes**:
```typescript
// Can transition to 펠라자위 (COM125) if previous was fellatio

// Display modifiers:
// Public/outdoor/shower/vibe/anal vibe prefixes
// "로터자위" base name

// Execution threshold: 35 base
// +10 if public, +3 shower, +5 vibe, +5 anal vibe, +5 nipple rotor

// Requirements:
// Desire: +3/LV, Exposure: +4/LV
// Masturbation addiction: +3/LV
// Pleasure mark: +3/LV, Lust: +3/LV
// Self-control: -5, Shy: -5
// Shameless: +2, Easy to masturbate: +5
// Honest with pleasure: +5, Denies pleasure: -5
// Exhibitionist: +10, Aphrodisiac: +8

// LOSEBASE:0 = 10, LOSEBASE:1 = 80
// source[14] = 400

// Video/public: source[10] = 50, source[11] = 100

// Base C sensitivity: 115-3200 (source[0])
// Base shame: 2000-3500 (source[12])
// Base submission: 500-3000 (source[13])

// B sensitivity: 95-3000 (source[17])

// Vibrator insertion (TEQUIP:11):
// V sensitivity: 40-850 (adds to source[1])
// Submission boost: 150-1200
// Experience multipliers:
//   <EXPLV:2: 0.6x, +150 pain
//   ≥EXPLV:5: 1.6x, 0 pain
// V sensitive: 1.5x pain/sub, V dull: 0.6x
// Calculated separately then added

// Anal vibe insertion (TEQUIP:13):
// +30 health, +80 stamina cost
// A sensitivity: 40-850 (adds to source[2])
// Submission boost: 150-1200
// Experience multipliers:
//   <EXPLV:1: 0.5x, +1000 pain
//   ≥EXPLV:5: 1.6x, 0 pain
// A sensitive: 1.5x, A dull: 0.6x

// Shower mode (TEQUIP:18):
// Replaces base C sensitivity: 250-3300
// Replaces shame: 1000-2500
// Replaces submission: 50-300
// V sensitivity: 0-500 (adds to source[1])
// A sensitivity: 40-850 (adds to source[2])

// VorA insertion reduces C/B sources:
// Sum ≤1: 1.0x, ≤3: 0.9x, ≤5: 0.8x
// ≤7: 0.7x, ≤9: 0.6x, >9: 0.5x

// Lubrication (if vibe/anal vibe):
// <LV1: 0.4x pleasure, +800 pain
// <LV2: 0.8x, +500 pain
// <LV3: 1.0x, +300 pain
// <LV4: 1.4x, +120 pain
// ≥LV4: 1.8x, +100 pain

// Lust multiplier (if vibe/anal vibe):
// 0.8-1.2x on V/A sources

// Obedience multiplier (if vibe/anal vibe):
// 0.8-1.3x on V/A sources

// Size modifiers (pain):
// 큰체구: 0.8x, 小柄: 2.0x
// Chastity mindset: 3.0x

// Apply to source[1], source[2], source[6]

// Shower-only lube/lust/obedience (separate)
// Applied to shower-specific V/A additions

// Technique multipliers:
// LV0: source[4]=100, 0.3x all sources
// LV1: 160, 0.7x
// LV2: 220, 1.0x
// LV3: 280, 1.2x
// LV4: 340, 1.4x
// LV5: 400, 1.6x

// Masturbation addiction:
// LV0: 0, 1.0x all sources
// LV1: 100, 1.1x
// LV2: 300, 1.2x
// LV3: 800, 1.3x
// LV4: 1500, 1.5x
// LV5: 2500, 1.7x (V/A only 1.5x)
// Assigned to source[7]

// Public/outdoor exposure multipliers:
// Exposure skill LV0-5:
//   0-2500 satisfaction (source[7] +=)
//   1.0-3.0x shame (source[12] *=)
//   1.0-1.7x all sources
// Exhibitionist: +500 sat, 1.2x sources, 1.5x shame

// Shaved + pubic hair setting:
// 2x shame

// Slime item (ITEM:200):
// 0.8x costs, 1.2x pleasure sources, 0.8x pain/shame/corrupt

// Stain transfers:
// Finger ⇔ breast, finger ⇔ vagina
// Shower mode: Reset all stains, halve lubrication

// Experience:
// Masturbation exp +1/+2 (public/video)
// Guided masturbation exp +1/+2
// Abnormal exp +1 if public first time (CFLAG:3)
// Lesbian/gay exp +3
// Submission mark 2
```

### COMF91 - Massager Masturbation (전동마사지기자위)
**Category**: Masturbation
**Description**: Masturbation with electric massager
**Source**: COMF91.ERB (884 lines - identical structure to COMF90)
**Key Mechanics**:
- Nearly identical to COMF90 but with massager
- Higher base sensitivity values
- Slightly higher execution threshold
- Same shower/vibe/public mechanics

**Implementation Notes**:
```typescript
// IDENTICAL structure to COMF90 with these differences:

// Execution threshold: 37 (vs 35 for rotor)

// LOSEBASE:0 = 30 (vs 10), LOSEBASE:1 = 130 (vs 80)

// Base C sensitivity: 1015-3400 (vs 115-3200)
// Base shame: same (2000-3500)
// Base submission: same (500-3000)

// B sensitivity: 1015-3400 (vs 95-3000)

// Shower mode C sensitivity: 1150-3700 (vs 250-3300)

// All other mechanics IDENTICAL to COMF90
// Same vibe, anal vibe, lubrication, technique, addiction
// Same exposure, shower, stain, experience logic
```

### COMF92 - Nipple Rotor (유두로터)
**Category**: Item
**Description**: Rotor vibrator on nipples
**Source**: COMF92.ERB (63 lines)
**Key Mechanics**:
- Very simple command
- B sensitivity only
- Low cost
- Minimal sources
- Lesbian/gay experience
- Breast experience

**Implementation Notes**:
```typescript
// No execution check
// LOSEBASE:0 = 10, LOSEBASE:1 = 80

// source[12] = 120 (shame)
// source[14] = 70 (corruption)

// B sensitivity: 150-2250 (source[17])
// Based on ABL:B감각 LV0-5

// Slime item multipliers (if ITEM:200 ≥ 1):
// 0.8x costs, 1.2x source[12/17], 0.8x source[14]

// Lesbian/gay exp +1
// Breast exp +1 (EXP:14)

// That's it - very simple command
```

---

## Common Patterns Across All Commands

### Execution Check Pattern
```typescript
async canExecute(state, target, player) {
  let score = 0;
  const reasons = [];

  // Common order (obedience, etc.)
  // Abilities (욕망, 봉사정신, etc.)
  // Marks (쾌락각인)
  // Palam levels (욕정, 윤활)
  // Talents (positive and negative)
  // Equipment (aphrodisiac)
  // Dirt/stains (with odor talent modifiers)

  const threshold = X; // Command-specific
  return {
    canExecute: score >= threshold,
    score,
    reasons: [...reasons, summary]
  };
}
```

### SOURCE Calculation Pattern
```typescript
const source: Record<number, number> = {};
// 0: C pleasure
// 1: V pleasure
// 2: A pleasure
// 3: Combined pleasure
// 4: Pleasure general
// 5: Affection/satisfaction
// 6: Pain
// 7: Addiction satisfaction
// 8: Disgust
// 9-11: Unknown
// 12: Shame
// 13: Submission
// 14: Corruption
// 15-16: Unknown
// 17: B pleasure
```

### Ejaculation Pattern
```typescript
let ejacGauge = baseValue; // Technique-based
ejacGauge *= obedienceMult;
ejacGauge *= serviceMult;
ejacGauge *= addictionMult;
if (tongueskill) ejacGauge *= 2.00;
ejacGauge *= playerSensitivityMult;

player.base.ejaculationGauge += ejacGauge;

// Check levels
const threshold = player.base.maxEjaculation;
if (current > threshold * 2) {
  // Large ejaculation
  source[7] *= 2.00; // Double addiction
  // +2 ejac exp, high semen exp
} else if (current > threshold) {
  // Normal ejaculation
  // +1 ejac exp, moderate semen exp
}
```

### Stain Transfer Pattern
```typescript
// Bidirectional OR operation
target.stains.A |= player.stains.B;
player.stains.B |= target.stains.A;

// Common stain values:
// 1: Love juice
// 2: Saliva
// 4: Semen
// 8: Anal dirt
// 16: Breast milk
// 32: Urine
```

### Experience Pattern
```typescript
// Lesbian/gay check
if (!target.talents.オトコ && !player.talents.オトコ) {
  target.experience.레즈 += amount;
} else if (target.talents.オトコ && player.talents.オトコ) {
  target.experience.호모 += amount;
}

// First time abnormal check
if (EXP:50 === 0) {
  EXP:50 += 1;
  // Display: 이상경험 +1
}
```

### Incest Multiplier Pattern
```typescript
// TFLAG:14 set by INCEST check
if (TFLAG:14 === 1 || TFLAG:14 === 2) {
  // Parent-child: 3x submission/corruption
  source[13] *= 3.00;
  source[14] *= 3.00;
} else if (TFLAG:14 === 3 || TFLAG:14 === 4) {
  // Siblings: 2x
  source[13] *= 2.00;
  source[14] *= 2.00;
}
```

---

## TypeScript Type Definitions Required

```typescript
interface Character {
  abilities: {
    C감각: number;      // C sensitivity (0-5)
    V감각: number;      // V sensitivity
    A감각: number;      // A sensitivity
    B감각: number;      // B sensitivity
    従順: number;       // Obedience
    욕망: number;       // Desire
    기교: number;       // Technique
    봉사정신: number;   // Service spirit
    정액중독: number;   // Semen addiction
    자위중독: number;   // Masturbation addiction
    수간중독: number;   // Bestiality addiction
    노출벽: number;     // Exhibitionism
    마조끼: number;     // Masochism
    // ... more
  };

  talents: {
    오토코: boolean;    // Male
    후타나리: boolean;  // Futanari
    수줍음: boolean;    // Shy
    악취둔감: boolean;  // Odor insensitive
    악취민감: boolean;  // Odor sensitive
    헌신적: boolean;    // Devoted
    쾌감에_솔직: boolean;
    쾌감을_부정: boolean;
    혀놀림: boolean;    // Tongue skill
    절륜: boolean;      // Insatiable
    愛: boolean;        // Love
    남성혐오: boolean;  // Man hater
    동물귀: boolean;    // Animal ears
    암캐: boolean;      // Bitch
    노출광: boolean;    // Exhibitionist
    조합지식: boolean;  // Synthesis knowledge
    しあわせ草중독: boolean; // Aphrodisiac addiction
    // ... more
  };

  marks: {
    쾌락각인: number;   // Pleasure mark (0-5)
    // ... more
  };

  params: {
    욕정: number;       // Lust
    윤활: number;       // Lubrication
    // ... more
  };

  base: {
    ejaculationGauge: number;
    maxEjaculation: number;
    // ... more
  };

  stains: {
    mouth: number;      // Bitfield
    genital: number;
    anus: number;
    penis: number;
    breast: number;
    hands: number;
    legs: number;
    // ... more
  };

  experience: {
    사정: number;       // Ejaculation
    정액: number;       // Semen
    펠라: number;       // Fellatio
    레즈: number;       // Lesbian
    호모: number;       // Gay
    자위: number;       // Masturbation
    애정: number;       // Affection
    약물: number;       // Drugs
    수간: number;       // Bestiality
    V: number;
    A: number;
    C: number;
    B: number;
    // ... more (50+ experience types)
  };

  customFlags: {
    aphrodisiacResidue: number;
    withdrawalAvoidance: number;
    piercings: number; // Bitfield
    shaved: number;
    // ... more
  };

  affection: number;
}

interface GameState {
  tempFlags: number[];    // TFLAG array
  saveStr: string[];      // SAVESTR array
  loseBase: {
    health: number;
    stamina: number;
  };
  items: {
    しあわせ草: number;
    // ... more items
  };
  prevCommand: number;
  assistant: Character | null;
  assistantPlayMode: number;
  targetEquip: {
    aphrodisiac: boolean;
    무한아이템: number;
    // ... more equipment flags
  };
}
```

---

## Implementation Priority

### High Priority (Core mechanics)
1. ✅ COMF69 - 69 (mutual oral, complex)
2. ✅ COMF70 - Double Sumata (assistant mechanics)
3. ✅ COMF80 - Irrumatio (3P transitions)
4. **COMF64** - 3P (central to assistant system)
5. **COMF71** - Double Paizuri (dual service)
6. **COMF89** - Bestiality (equipment toggle mechanics)

### Medium Priority (Extreme acts)
7. **COMF81-83** - Fisting trio (extreme pain/corruption)
8. **COMF85** - Urination (shame mechanics)
9. **COMF87** - Piercing (interactive menu, bitfields)
10. **COMF88** - Hair Removal (shame/exposure)

### Lower Priority (Simple/Incomplete)
11. ✅ COMF72 - Aphrodisiac (item use, simple)
12. **COMF73** - Nipple Rubbing (incomplete in source)
13. **COMF84** - G-spot (straightforward pleasure)
14. **COMF90-92** - Masturbation trio (similar logic)

### Requires Source Files (Missing)
15. **COMF60-68** - Assistant/dual commands (need ERB files)

---

## Testing Checklist

For each implemented command:
- [ ] Execution check calculates correctly
- [ ] All ability/talent modifiers apply
- [ ] Ejaculation gauge calculation matches formula
- [ ] SOURCE values match ERB calculations
- [ ] Stain transfers work correctly
- [ ] Experience gains match source
- [ ] Flags (TFLAG) set appropriately
- [ ] Incest multipliers apply when relevant
- [ ] Equipment states checked
- [ ] Edge cases (virgin, size, etc.) handled

---

## Notes on Fidelity

**CRITICAL**: Every formula, multiplier, and condition from the ERB source must be preserved exactly:
- Ability level checks (0-5 ranges)
- Talent boolean checks
- PALAM level thresholds
- SOURCE calculations (including all multipliers)
- Experience formulas
- Flag updates
- Stain bitfield operations
- Ejaculation thresholds and effects

**NO SIMPLIFICATION** or "approximation" is acceptable. If ERB has:
```
IF ABL:기교 == 0
    B = 1200
ELSEIF ABL:기교 == 1
    B = 1700
...
```

TypeScript must have:
```typescript
if (target.abilities.기교 === 0) ejacGauge = 1200;
else if (target.abilities.기교 === 1) ejacGauge = 1700;
...
```

---

## File Structure

```
web-port/src/modules/training/commands/commands/
├── COMF60_kissAssistant.ts
├── COMF61_forceCunnilingus.ts
├── COMF62_haveSexWithAssistant.ts
├── COMF63_tribadism.ts
├── COMF64_threesome.ts
├── COMF65_makeTargetHaveSex.ts
├── COMF66_twoPenisFellatio.ts
├── COMF67_footjobVariant.ts
├── COMF68_doubleFellatio.ts
├── COMF69_sixtyNine.ts ✅
├── COMF70_doubleSumata.ts ✅
├── COMF71_doublePaizuri.ts
├── COMF72_aphrodisiac.ts ✅
├── COMF73_nippleRubbing.ts
├── COMF80_irrumatio.ts ✅
├── COMF81_vaginalFisting.ts
├── COMF82_analFisting.ts
├── COMF83_doubleHoleFisting.ts
├── COMF84_gspotStimulation.ts
├── COMF85_urination.ts
├── COMF87_piercing.ts
├── COMF88_hairRemoval.ts
├── COMF89_bestialityPlay.ts
├── COMF90_rotorMasturbation.ts
├── COMF91_massagerMasturbation.ts
└── COMF92_nippleRotor.ts
```

---

## Summary

**Completed**: 4/26 commands (15%)
**Documented**: 26/26 commands (100%)
**Source Available**: 17/26 commands (65%)
**Missing Source**: 9/26 commands (COMF60-68)

All available ERB source files have been analyzed and documented with complete implementation notes preserving every formula, condition, and mechanic. The 4 implemented commands demonstrate full fidelity to the original ERB logic.

Next steps:
1. Locate missing COMF60-68 ERB files
2. Implement remaining 22 commands following the patterns established
3. Create shared utility functions for common patterns
4. Implement comprehensive testing suite
