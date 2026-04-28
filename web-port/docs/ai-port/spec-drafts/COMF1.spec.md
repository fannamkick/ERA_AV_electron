# COMF1 (Cunnilingus) Spec Draft

## Status
- **Implementation State**: Already implemented (command definition + resolver slices present)
- **Draft Type**: Spec-only (sourceFormula confidence = temporary)

## Canonical Evidence Summary

### Availability
- **Authoritative Source**: `COM_ABLE1` (availability.ts)
- **Confidence**: Conflicted
- **Key Gates**:
  - Target must be female (`!genderCheck.isFemale`)
  - Target cannot have TALENT:122 (male)
  - Cannot use during bestiality (TEQUIP:89)
  - Cannot use while hogtied
  - Lower clothing must be removed

### Unresolved Availability Conflicts
1. **COMF1-AVAIL-EQUIP-CONFLICT-1** (minor): COM_ABLE1 excludes TEQUIP:70 but generated command and COMMAND_AVAILABLE_1 include it
2. **COMF1-AVAIL-EQUIP-CONFLICT-2** (medium): COM_ABLE1 includes bestiality/hogtie gates not present in generated/improved command

### Source Formula
- **Confidence**: Temporary (current operational resolver deployed; canonical is generated COMF1_cunnilingus.ts)
- **Generated canonical**: cValueTable=[50,150,350,650,1050,1550]
- **Current deployed**: sensitivityC=[40,160,700,1500,2400,3300]
- **Improved baseline**: cValues=[50,200,600,1400,2200,3200]

### Unresolved Source Conflicts
1. **source-value-table-disagreement**: 쾌C outputs differ for same C감각 levels
2. **additional-source-writes**: Current adds pain/fear/semen/aversion; generated adds 쾌V/윤활/굴복/욕정
3. **habit-formula-disagreement**: Current uses unrounded division; generated/improved use floor()
4. **source-index-disagreement**: Improved maps writes to indices not used by current

### Direct Effects (Canonical)
- LOSEBASE: stamina 5, willpower 50, health 5 (generated) vs current: addLoseBase('health',5)+addLoseBase('stamina',50)
- 쾌C multiplier ×2 for 혀놀림/TEQUIP:89
- 습득 = floor(쾌C/20) for 혀놀림/TEQUIP:89

### Side Effects (Canonical)
- Stain transfer V→mouth (generated) vs improved: omitted
- Phase skip for TEQUIP:89 (early return before stain/EXP)

## No Materialization Required

The report explicitly states: "COMF1 is already implemented (command definition + resolver slices present). No executable code changes needed."

## Verification Checks

The following checks should be run to verify COMF1 parity:

1. **Source Value Parity**: Verify generated COMF1_cunnilingus.ts cValueTable against legacy ERB COMF1.ERB values
2. **Early Exit Behavior**: Verify TEQUIP:89 returns before stain/EXP post-effects
3. **Availability Gate Alignment**: Confirm COM_ABLE1, COMMAND_AVAILABLE_1, and generated command equipment checks are synchronized
4. **Stain Transfer**: Verify V→mouth stain merge behavior matches legacy
5. **Experience Gains**: Verify 레즈경험:3 + 애정경험:1 triggers for female+female pair
6. **First Kiss Flag**: Verify FLAG:620 set correctly

## Implementation Evidence
- Command definition: `src/content/training/basicCommands.ts#current-command-1`
- Source resolver: `src/domain/training/sourceEffectResolvers.ts#comf1SourceEffects`
- Stain post-effects: `src/domain/training/stainEffectResolvers.ts#comf1StainPostEffects`
- Experience post-effects: `src/domain/training/experienceEffectResolvers.ts#comf1ExperiencePostEffects`
- Chain remap: `src/content/training/basicCommands.ts#comf1RemapToCom69`
- Generated canonical: `src/legacy/training/commands/commands/COMF1_cunnilingus.ts`
