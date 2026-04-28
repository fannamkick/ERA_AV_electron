import { all, bitAny, bitNone, compareStat, evaluateConditions, minStat, not } from '../src/core/conditions';
import {
  addBase,
  addExp,
  addLoseBase,
  addMessage,
  addSource,
  addUp,
  applyEffects,
  assignStain,
  clearStatBits,
  clearStainBits,
  defaultEffectHandlers,
  mergeStains,
  roleTarget,
  setFlagBits,
  setStainBits,
  setStatBits,
  stainSlot,
  toggleEquipment,
} from '../src/core/effects';
import {
  createEmptyTrainingState,
  createInMemoryTrainingContext,
  createStoreTrainingContext,
} from '../src/domain/adapters';
import { ContentRegistry, type ContentPack } from '../src/content';
import {
  blocksAssistantDirtyMouthContact,
  comf69AvailabilityRequirements,
  comf128AvailabilityRequirements,
  comf133AvailabilityRequirements,
  defineScoreFormulaGate,
  comf6OrderGateTerms,
  commonOrderGateTerms,
  createStandardTrainingModePassiveProcessors,
  definePassiveTrainingModeProcessor,
  definePassiveEquipmentHook,
  definePassiveTrainingModeHook,
  defineTrainingModeToggle,
  defineTrainingCommand,
  isTrainingModeActive,
  requiresNoTrainingMode,
  TrainingEngine,
  TRAINING_MODE_DEFINITIONS,
  trainingEffectHandlers,
  applySourceModifiers,
  defineSourceModifier,
  defineSourcePipeline,
  sourceEffectsFromValues,
} from '../src/domain/training';
import { comf0SourceEffects } from '../src/domain/training/sourceEffectResolvers';
import { comf0StainPostEffects } from '../src/domain/training/stainEffectResolvers';
import { cflagIndex, flagIndex, hasFlagKey } from '../src/domain/flags';
import { hasStatKey, statIndex, STAIN_BITS } from '../src/domain/stats';
import { migrateSaveData } from '../src/utils/saveSystem';
import type { Character } from '../src/types/character';

function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function assertThrows(fn: () => unknown, message: string): void {
  let threw = false;

  try {
    fn();
  } catch {
    threw = true;
  }

  assert(threw, message);
}

function verifyKeyMaps(): void {
  assert(statIndex('source', 'submission') === 4, 'source.submission should map to SOURCE:4');
  assert(statIndex('source', 'shame') === 11, 'source.shame should map to SOURCE:11');
  assert(statIndex('source', 'aversion') === 14, 'source.aversion should map to SOURCE:14');
  assert(statIndex('loseBase', 'health') === 0, 'loseBase.health should map to LOSEBASE:0');
  assert(statIndex('up', 'fear') === 10, 'up.fear should map to UP:10');
  assert(statIndex('equipment', 'vibrator') === 11, 'equipment.vibrator should map to TEQUIP:11');
  assert(statIndex('equipment', 'analVibrator') === 13, 'equipment.analVibrator should map to TEQUIP:13');
  assert(statIndex('equipment', 'rope') === 44, 'equipment.rope should map to TEQUIP:44');
  assert(statIndex('equipment', 'bestialityPlay') === 89, 'equipment.bestialityPlay should map to TEQUIP:89');
  assert(statIndex('equipment', 'tentacleTraining') === 90, 'equipment.tentacleTraining should map to TEQUIP:90');
  assert(statIndex('equipment', 'tentacleMouth') === 98, 'equipment.tentacleMouth should map to TEQUIP:98');
  assert(statIndex('equipment', 'slimeVaginalEntry') === 151, 'equipment.slimeVaginalEntry should map to TEQUIP:151');
  assert(statIndex('equipment', 'slimeMouth') === 154, 'equipment.slimeMouth should map to TEQUIP:154');
  assert(statIndex('stain', 'mouth') === 0, 'stain.mouth should map to STAIN:0');
  assert(statIndex('stain', 'breast') === 5, 'stain.breast should map to STAIN:5');
  assert(statIndex('mark', 'pleasure') === 1, 'mark.pleasure should map to MARK:1');
  assert(STAIN_BITS.semen === 4, 'STAIN_BITS.semen should map to bit 4');
  assert(flagIndex('difficulty') === 5, 'flag.difficulty should map to FLAG:5');
  assert(cflagIndex('clothing') === 40, 'cflag.clothing should map to CFLAG:40');
  assert(hasStatKey('ability', 'technique'), 'ability.technique should be registered');
  assert(!hasStatKey('ability', 'missingAbility'), 'missing ability key should not be registered');
  assert(hasFlagKey('cflag', 'fainted'), 'cflag.fainted should be registered');
  assertThrows(() => statIndex('source', 'missingSource'), 'unknown stat keys should throw');
}

function verifyConditionsAndEffects(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);

  const effectResult = applyEffects([
    addSource('submission', 12),
    addExp('caress', 2),
    addBase('stamina', 5),
    addLoseBase('health', 4),
    addUp('fear', 9),
    setStatBits('cflag', 'clothing', 16),
    setFlagBits('difficulty', 1),
    addMessage('foundation verification'),
  ], context);

  assert(effectResult.warnings.length === 0, 'effects should apply without warnings');
  assert(effectResult.messages[0] === 'foundation verification', 'message effect should be collected');

  assert(
    context.getNumericStat('source', 'submission') === 12,
    'source effect should write source.submission',
  );
  assert(
    context.getNumericStat('exp', 'caress') === 2,
    'exp effect should write exp.caress',
  );
  assert(
    context.getNumericStat('base', 'stamina') === 5,
    'base effect should write base.stamina',
  );
  assert(
    context.getNumericStat('loseBase', 'health') === 4,
    'loseBase effect should write loseBase.health',
  );
  assert(
    context.getNumericStat('up', 'fear') === 9,
    'up effect should write up.fear',
  );

  assert(
    context.getNumericStat('cflag', 'clothing') === 16,
    'bitwise stat effect should set cflag.clothing bits',
  );
  assert(
    context.getNumericStat('flag', 'difficulty') === 1,
    'bitwise flag effect should set flag.difficulty bits',
  );

  const passed = evaluateConditions([
    minStat('base', 'stamina', 5),
    compareStat('source', 'submission', 'eq', 12),
    not(bitNone('cflag', 'clothing', 16)),
    all([
      compareStat('exp', 'caress', 'gte', 2),
      compareStat('loseBase', 'health', 'eq', 4),
      compareStat('up', 'fear', 'eq', 9),
      bitNone('cflag', 'clothing', 1),
    ]),
  ], context);

  assert(passed.passed, `conditions should pass: ${passed.reasons.join(', ')}`);

  const clearResult = applyEffects([
    clearStatBits('cflag', 'clothing', 16),
  ], context);
  assert(clearResult.warnings.length === 0, 'bitwise clear effect should apply without warnings');
  assert(
    context.getNumericStat('cflag', 'clothing') === 0,
    'bitwise stat effect should clear cflag.clothing bits',
  );

  const customHandlerResult = applyEffects([
    addMessage('handler verification'),
  ], context, {
    handlers: {
      ...defaultEffectHandlers,
      'message.add': (effect) => ({
        applied: true,
        message: `custom ${effect.text}`,
      }),
    },
  });
  assert(
    customHandlerResult.messages[0] === 'custom handler verification',
    'effect handler registry should allow handler replacement',
  );

  const domainHandlerResult = applyEffects([
    toggleEquipment('vibrator', { enabled: true }),
  ], context);
  assert(
    domainHandlerResult.warnings.some((warning) => warning.includes('no handler is registered')),
    'core default effect handlers should not own equipment domain semantics',
  );
}

function verifySourceModifierPipeline(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);

  context.applyNumericStat('talent', 'love', 1, 'set');

  const doubleArousal = defineSourceModifier({
    id: 'test.doubleArousal',
    when: (currentContext) => currentContext.getNumericStat('talent', 'love') > 0,
    apply: (_currentContext, source) => ({
      ...source,
      arousal: (source.arousal ?? 0) * 2,
    }),
  });

  const addSubmission = defineSourceModifier({
    id: 'test.addSubmission',
    apply: (_currentContext, source) => ({
      ...source,
      submission: (source.submission ?? 0) + 5,
    }),
  });

  const source = applySourceModifiers(context, { arousal: 10, submission: 1 }, [
    doubleArousal,
    addSubmission,
  ]);

  assert(source.arousal === 20, 'source pipeline should apply modifiers in order');
  assert(source.submission === 6, 'source pipeline should preserve previous modifier output');

  const pipeline = defineSourcePipeline({
    initial: () => ({ arousal: 3 }),
    modifiers: [doubleArousal],
  });
  const effects = pipeline(context);
  assert(effects.length === 1, 'source pipeline should produce source effects');

  assertThrows(() => applySourceModifiers(context, { arousal: 1 }, [
    defineSourceModifier({ id: 'duplicate', apply: (_currentContext, current) => ({ ...current }) }),
    defineSourceModifier({ id: 'duplicate', apply: (_currentContext, current) => ({ ...current }) }),
  ]), 'duplicate source modifier ids should throw');

  assertThrows(() => sourceEffectsFromValues({ arousal: Number.POSITIVE_INFINITY }), 'non-finite source values should throw');
}

function verifyActorRoleBindings(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1, {
    assistant: 2,
    trainer: 3,
  });

  context.applyNumericStat('ability', 'technique', 1, 'set');
  context.applyNumericStat('ability', 'technique', 4, 'set', roleTarget('assistant'));

  const assistantCondition = evaluateConditions([
    compareStat('ability', 'technique', 'eq', 4, undefined, undefined, 'assistant'),
  ], context);
  assert(assistantCondition.passed, 'role-aware condition should read assistant stats');

  const targetCondition = evaluateConditions([
    compareStat('ability', 'technique', 'eq', 1, undefined, undefined, 'target'),
  ], context);
  assert(targetCondition.passed, 'target role should default to default character');

  const trainerResult = applyEffects([
    addBase('health', 7, roleTarget('trainer')),
  ], context);
  assert(trainerResult.warnings.length === 0, 'role-targeted trainer effect should apply');
  assert(
    context.getNumericStat('base', 'health', 3) === 7,
    'role-targeted trainer effect should mutate trainer only',
  );
  assert(
    context.getNumericStat('base', 'health', 1) === 0,
    'role-targeted trainer effect should not mutate target',
  );

  const effectReceiverResult = applyEffects([
    addBase('stamina', 3, roleTarget('effectReceiver')),
  ], context);
  assert(effectReceiverResult.warnings.length === 0, 'effectReceiver should default to target');
  assert(
    context.getNumericStat('base', 'stamina', 1) === 3,
    'effectReceiver should default to target character',
  );

  const unboundContext = createInMemoryTrainingContext(createEmptyTrainingState(), 1);
  const unboundResult = applyEffects([
    addBase('health', 1, roleTarget('assistant')),
  ], unboundContext);
  assert(unboundResult.warnings.length === 1, 'unbound role-targeted effects should warn');
}

function verifyEquipmentToggleEffects(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);

  const enableResult = applyEffects([
    toggleEquipment('vibrator', { enabled: true, conflicts: ['tentacleTraining', 'slime'] }),
  ], context, { handlers: trainingEffectHandlers });
  assert(enableResult.warnings.length === 0, 'equipment toggle should apply without warnings');
  assert(context.getNumericStat('equipment', 'vibrator') === 1, 'equipment toggle should enable equipment');

  context.applyNumericStat('equipment', 'tentacleTraining', 1, 'set');
  context.applyNumericStat('equipment', 'slime', 1, 'set');

  const conflictResult = applyEffects([
    toggleEquipment('vibrator', { enabled: true, conflicts: ['tentacleTraining', 'slime'] }),
  ], context, { handlers: trainingEffectHandlers });
  assert(conflictResult.warnings.length === 0, 'equipment toggle conflicts should apply without warnings');
  assert(context.getNumericStat('equipment', 'tentacleTraining') === 0, 'equipment toggle should clear tentacle conflict');
  assert(context.getNumericStat('equipment', 'slime') === 0, 'equipment toggle should clear slime conflict');

  const disableResult = applyEffects([
    toggleEquipment('vibrator', { enabled: false }),
  ], context, { handlers: trainingEffectHandlers });
  assert(disableResult.warnings.length === 0, 'equipment toggle disable should apply without warnings');
  assert(context.getNumericStat('equipment', 'vibrator') === 0, 'equipment toggle should disable equipment');

  assertThrows(() => defineTrainingCommand({
    id: 'training.test.bad-equipment-toggle',
    originalId: 997,
    name: 'Bad Equipment Toggle Test Command',
    category: 'basic',
    requirements: [],
    effects: [toggleEquipment('vibrator', { conflicts: ['vibrator'] })],
  }), 'equipment toggle should reject self-conflicts');

  assertThrows(() => defineTrainingCommand({
    id: 'training.test.unknown-equipment-toggle',
    originalId: 996,
    name: 'Unknown Equipment Toggle Test Command',
    category: 'basic',
    requirements: [],
    effects: [toggleEquipment('missingEquipmentKey')],
  }), 'equipment toggle should reject unknown equipment keys');
}

function verifyTrainingModes(): void {
  assert(
    TRAINING_MODE_DEFINITIONS.tentacle.legacyEquipmentKey === 'tentacleTraining',
    'tentacle mode should bridge to TEQUIP:90',
  );
  assert(
    TRAINING_MODE_DEFINITIONS.slime.legacyEquipmentKey === 'slime',
    'slime mode should bridge to TEQUIP:150',
  );

  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);

  assert(!isTrainingModeActive(context, 'tentacle'), 'tentacle mode should start inactive');
  assert(
    evaluateConditions([requiresNoTrainingMode('tentacle')], context).passed,
    'requiresNoTrainingMode should pass before mode activation',
  );

  context.applyTag?.(TRAINING_MODE_DEFINITIONS.slime.tag, true);
  context.applyNumericStat('equipment', 'slime', 1, 'set');
  context.applyNumericStat('equipment', 'slimeVaginalEntry', 1, 'set');

  const command = defineTrainingCommand({
    id: 'training.test.mode-toggle',
    originalId: 988,
    name: 'Mode Toggle Test Command',
    category: 'special',
    requirements: [],
    effects: [],
    dynamicEffects: [
      defineTrainingModeToggle({ mode: 'tentacle', conflicts: ['slime'] }),
    ],
  });
  const engine = new TrainingEngine({ commands: [command] });
  const result = engine.execute(command.id, context);

  assert(result.success, 'training mode toggle should execute successfully');
  assert(isTrainingModeActive(context, 'tentacle'), 'training mode should be active through tag/equipment bridge');
  assert(context.getNumericStat('equipment', 'tentacleTraining') === 1, 'tentacle mode should set TEQUIP:90 bridge');
  assert(!isTrainingModeActive(context, 'slime'), 'mode toggle conflicts should clear slime mode');
  assert(context.getNumericStat('equipment', 'slime') === 0, 'mode toggle conflicts should clear TEQUIP:150 bridge');
  assert(context.getNumericStat('equipment', 'slimeVaginalEntry') === 0, 'mode toggle conflicts should clear slime sub-flags');
  assert(
    !evaluateConditions([requiresNoTrainingMode('tentacle')], context).passed,
    'requiresNoTrainingMode should fail while mode is active',
  );

  context.applyNumericStat('equipment', 'analVibrator', 1, 'set');
  context.applyNumericStat('equipment', 'tentacleMouth', 1, 'set');
  const disableCommand = defineTrainingCommand({
    id: 'training.test.mode-disable',
    originalId: 986,
    name: 'Mode Disable Test Command',
    category: 'special',
    requirements: [],
    effects: [],
    dynamicEffects: [
      defineTrainingModeToggle({ mode: 'tentacle', enabled: false }),
    ],
  });
  const disableResult = new TrainingEngine({ commands: [disableCommand] }).execute(disableCommand.id, context);
  assert(disableResult.success, 'training mode disable should execute successfully');
  assert(!isTrainingModeActive(context, 'tentacle'), 'disabled mode should be inactive');
  assert(context.getNumericStat('equipment', 'analVibrator') === 0, 'disabling tentacle should clear reused TEQUIP:13');
  assert(context.getNumericStat('equipment', 'tentacleMouth') === 0, 'disabling tentacle should clear TEQUIP:98');

  const bridgeState = createEmptyTrainingState();
  const bridgeContext = createInMemoryTrainingContext(bridgeState, 1);
  bridgeContext.applyNumericStat('equipment', 'bestialityPlay', 1, 'set');
  assert(
    isTrainingModeActive(bridgeContext, 'bestiality'),
    'training mode should read legacy equipment bridge even when tag is absent',
  );

  const storeCharacter = createTestCharacter();
  const storeContext = createStoreTrainingContext({
    flags: {},
    characters: [storeCharacter],
  }, storeCharacter.id);
  const storeCommand = defineTrainingCommand({
    id: 'training.test.store-mode-toggle',
    originalId: 987,
    name: 'Store Mode Toggle Test Command',
    category: 'special',
    requirements: [],
    effects: [],
    dynamicEffects: [
      defineTrainingModeToggle({ mode: 'bestiality', enabled: true }),
    ],
  });
  const storeResult = new TrainingEngine({ commands: [storeCommand] }).execute(storeCommand.id, storeContext);
  assert(storeResult.success, 'store context should apply training mode tag/equipment effects');
  assert(isTrainingModeActive(storeContext, 'bestiality'), 'store context should expose active training mode');
}

function verifyStainEffects(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1, {
    trainer: 2,
  });

  const result = applyEffects([
    setStainBits('mouth', STAIN_BITS.semen | STAIN_BITS.anal),
    setStainBits('mouth', STAIN_BITS.urine, roleTarget('trainer')),
    mergeStains(
      stainSlot('mouth'),
      stainSlot('mouth', roleTarget('trainer')),
    ),
    clearStainBits('mouth', STAIN_BITS.anal),
    assignStain('hand', STAIN_BITS.penis | STAIN_BITS.semen),
  ], context, { handlers: trainingEffectHandlers });

  assert(result.warnings.length === 0, 'stain effects should apply without warnings');
  assert(
    context.getNumericStat('stain', 'mouth') === (STAIN_BITS.semen | STAIN_BITS.urine),
    'stain clear should remove only the requested bits from target mouth',
  );
  assert(
    context.getNumericStat('stain', 'mouth', 2) === (STAIN_BITS.semen | STAIN_BITS.anal | STAIN_BITS.urine),
    'bidirectional stain merge should union trainer mouth before target clear',
  );
  assert(
    context.getNumericStat('stain', 'hand') === (STAIN_BITS.penis | STAIN_BITS.semen),
    'stain assignment should replace the target part value',
  );

  const dirtyMouth = evaluateConditions([
    bitAny('stain', 'mouth', STAIN_BITS.semen),
    bitNone('stain', 'mouth', STAIN_BITS.anal),
  ], context);
  assert(dirtyMouth.passed, 'stain bit conditions should read canonical stain parts');

  assertThrows(() => defineTrainingCommand({
    id: 'training.test.bad-stain',
    originalId: 995,
    name: 'Bad Stain Test Command',
    category: 'basic',
    requirements: [],
    effects: [setStainBits('missingPart', STAIN_BITS.semen)],
  }), 'stain effects should reject unknown stain parts');
}

function findSourceValue(effects: readonly { readonly kind: string; readonly stat?: string; readonly key?: string; readonly value?: number }[], key: string): number {
  const effect = effects.find((candidate) =>
    candidate.kind === 'stat.numeric' &&
    candidate.stat === 'source' &&
    candidate.key === key
  );
  const value = effect?.value;
  if (value === undefined) {
    throw new Error(`expected source effect for ${key}`);
  }
  return value;
}

function verifyComf0ParityCleanup(): void {
  const sourceState = createEmptyTrainingState();
  const sourceContext = createInMemoryTrainingContext(sourceState, 1, { trainer: 2 });
  sourceContext.applyStainModify?.('mouth', 'setBits', STAIN_BITS.semen, roleTarget('trainer'));

  const sourceEffects = comf0SourceEffects()(sourceContext);
  assert(
    findSourceValue(sourceEffects, 'comfort') === 45,
    'COMF0 should multiply SOURCE:8 by 150% when trainer mouth has any stain',
  );

  const normalState = createEmptyTrainingState();
  const normalContext = createInMemoryTrainingContext(normalState, 1, { trainer: 2 });
  normalContext.applyStainModify?.('vagina', 'setBits', STAIN_BITS.vaginalFluid);
  normalContext.applyStainModify?.('breast', 'setBits', STAIN_BITS.breastMilk);
  normalContext.applyStainModify?.('hand', 'setBits', STAIN_BITS.semen, roleTarget('trainer'));

  const normalResult = applyEffects(comf0StainPostEffects()(normalContext), normalContext, {
    handlers: trainingEffectHandlers,
  });
  assert(normalResult.warnings.length === 0, 'COMF0 normal stain effects should apply without warnings');
  assert(
    normalContext.getNumericStat('stain', 'vagina') === (STAIN_BITS.vaginalFluid | STAIN_BITS.semen),
    'COMF0 normal branch should merge trainer hand stain into target vagina',
  );
  assert(
    normalContext.getNumericStat('stain', 'breast') ===
      (STAIN_BITS.vaginalFluid | STAIN_BITS.breastMilk | STAIN_BITS.semen),
    'COMF0 normal branch should merge trainer hand stain into target breast after vagina transfer',
  );
  assert(
    normalContext.getNumericStat('stain', 'hand', 2) ===
      (STAIN_BITS.vaginalFluid | STAIN_BITS.breastMilk | STAIN_BITS.semen),
    'COMF0 normal branch should merge target vagina and breast stain back into trainer hand',
  );

  const tentacleState = createEmptyTrainingState();
  const tentacleContext = createInMemoryTrainingContext(tentacleState, 1, { trainer: 2 });
  tentacleContext.applyNumericStat('equipment', 'tentacleTraining', 1, 'set');
  tentacleContext.applyStainModify?.('vagina', 'setBits', STAIN_BITS.vaginalFluid);
  tentacleContext.applyStainModify?.('hand', 'setBits', STAIN_BITS.anal, roleTarget('trainer'));

  const tentacleResult = applyEffects(comf0StainPostEffects()(tentacleContext), tentacleContext, {
    handlers: trainingEffectHandlers,
  });
  assert(tentacleResult.warnings.length === 0, 'COMF0 TEQUIP90 stain effects should apply without warnings');
  assert(
    tentacleContext.getNumericStat('stain', 'hand') === (STAIN_BITS.penis | STAIN_BITS.semen),
    'COMF0 TEQUIP90 branch should add tentacle dirt to target hand',
  );
  assert(
    tentacleContext.getNumericStat('stain', 'breast') === (STAIN_BITS.penis | STAIN_BITS.semen),
    'COMF0 TEQUIP90 branch should add tentacle dirt to target breast',
  );
  assert(
    tentacleContext.getNumericStat('stain', 'vagina') === STAIN_BITS.vaginalFluid,
    'COMF0 TEQUIP90 branch should not run normal target vagina/trainer hand transfer',
  );
  assert(
    tentacleContext.getNumericStat('stain', 'hand', 2) === STAIN_BITS.anal,
    'COMF0 TEQUIP90 branch should not merge trainer hand stains',
  );
}

function verifyAssistantAvailabilityPredicates(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1, { assistant: 2 });

  context.applyTag?.('training.assistantPlay', true);
  context.applyStainModify?.('mouth', 'setBits', STAIN_BITS.semen);
  context.applyNumericStat('ability', 'obedience', 3, 'set', roleTarget('assistant'));
  context.applyNumericStat('talent', 'sensitivityHigh', 1, 'set', roleTarget('assistant'));

  const blocked = evaluateConditions([blocksAssistantDirtyMouthContact()], context);
  assert(!blocked.passed, 'assistant dirty-mouth predicate should block sensitive low-obedience assistant');

  context.applyNumericStat('talent', 'filthIgnore', 1, 'set', roleTarget('assistant'));
  const allowed = evaluateConditions([blocksAssistantDirtyMouthContact()], context);
  assert(allowed.passed, 'assistant dirty-mouth predicate should allow filth-ignore assistant');
}

function verifyPostEffectPhase(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);
  const command = defineTrainingCommand({
    id: 'training.test.post-effects',
    originalId: 994,
    name: 'Post Effect Phase Test Command',
    category: 'basic',
    requirements: [],
    effects: [addSource('submission', 10)],
    postEffects: [
      () => [assignStain('mouth', STAIN_BITS.semen)],
    ],
  });
  const engine = new TrainingEngine({
    commands: [command],
    convertSourceToPalamAfterEffects: true,
  });

  const result = engine.execute(command.id, context);
  assert(result.success, 'post effect phase command should execute successfully');
  assert(context.getNumericStat('palam', 'submission') === 10, 'source conversion should run before post effects complete');
  assert(context.getNumericStat('stain', 'mouth') === STAIN_BITS.semen, 'post effects should mutate state after source conversion');

  const skipState = createEmptyTrainingState();
  const skipContext = createInMemoryTrainingContext(skipState, 1);
  skipContext.applyTag?.('training.skipPostEffects', true);
  const skipCommand = defineTrainingCommand({
    id: 'training.test.skip-post-effects',
    originalId: 988,
    name: 'Skip Post Effect Phase Test Command',
    category: 'basic',
    requirements: [],
    phaseSkips: [{
      phase: 'postEffects',
      when: [{ kind: 'tag.has', tag: 'training.skipPostEffects' }],
      reason: 'test post-effect early return',
    }],
    effects: [addBase('health', 1)],
    postEffects: [
      () => [addBase('health', 10)],
    ],
  });
  const skipEngine = new TrainingEngine({ commands: [skipCommand] });
  const skipResult = skipEngine.execute(skipCommand.id, skipContext);
  assert(skipResult.success, 'phase skip command should execute successfully');
  assert(skipResult.skippedPhases?.[0]?.phase === 'postEffects', 'phase skip should report skipped postEffects');
  assert(skipContext.getNumericStat('base', 'health') === 1, 'phase skip should bypass post effects');
}

function verifyRemapBeforeExecutePhase(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);
  const sourceCommand = defineTrainingCommand({
    id: 'training.test.remap-source',
    originalId: 993,
    name: 'Remap Source Test Command',
    category: 'basic',
    remapBeforeExecute: [
      () => ({ commandId: 'training.test.remap-target', reason: 'test remap' }),
    ],
    requirements: [],
    effects: [addBase('health', 999)],
  });
  const targetCommand = defineTrainingCommand({
    id: 'training.test.remap-target',
    originalId: 992,
    name: 'Remap Target Test Command',
    category: 'basic',
    requirements: [],
    effects: [addBase('health', 3)],
  });
  const engine = new TrainingEngine({ commands: [sourceCommand, targetCommand] });

  const result = engine.execute(sourceCommand.id, context);
  assert(result.success, 'remapped command should execute successfully');
  assert(result.commandId === targetCommand.id, 'remap should return the executed target command id');
  assert(result.remappedFrom?.[0] === sourceCommand.id, 'remap should record the source command id');
  assert(result.remapReasons?.[0] === 'test remap', 'remap should record the remap reason');
  assert(context.getNumericStat('base', 'health') === 3, 'remap should skip source command effects');

  const gatedState = createEmptyTrainingState();
  const gatedContext = createInMemoryTrainingContext(gatedState, 1);
  const gatedSource = defineTrainingCommand({
    id: 'training.test.available-remap-source',
    originalId: 987,
    name: 'Available Remap Source Test Command',
    category: 'basic',
    remapBeforeExecute: [
      () => ({
        commandId: 'training.test.available-remap-target',
        reason: 'target available remap',
        requireTargetAvailable: true,
      }),
    ],
    requirements: [],
    effects: [addBase('health', 1)],
  });
  const gatedTarget = defineTrainingCommand({
    id: 'training.test.available-remap-target',
    originalId: 986,
    name: 'Available Remap Target Test Command',
    category: 'basic',
    requirements: [
      minStat('ability', 'technique', 1, 'target remap requires technique'),
    ],
    effects: [addBase('health', 5)],
  });
  const gatedEngine = new TrainingEngine({ commands: [gatedSource, gatedTarget] });
  const skippedRemap = gatedEngine.execute(gatedSource.id, gatedContext);
  assert(skippedRemap.success, 'source command should execute when validated remap target is unavailable');
  assert(skippedRemap.commandId === gatedSource.id, 'unavailable validated remap should stay on source command');
  assert(gatedContext.getNumericStat('base', 'health') === 1, 'unavailable validated remap should apply source effects');

  gatedContext.applyNumericStat('ability', 'technique', 1, 'set');
  const allowedRemap = gatedEngine.execute(gatedSource.id, gatedContext);
  assert(allowedRemap.success, 'validated remap should execute when target is available');
  assert(allowedRemap.commandId === gatedTarget.id, 'available validated remap should execute target command');
  assert(gatedContext.getNumericStat('base', 'health') === 6, 'available validated remap should apply target effects');
}

function verifyPreExecuteDecisionPhase(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);
  const command = defineTrainingCommand({
    id: 'training.test.pre-execute-decision',
    originalId: 985,
    name: 'Pre Execute Decision Test Command',
    category: 'basic',
    preExecuteChecks: [
      () => ({
        id: 'test.confirm',
        prompt: 'Confirm test command?',
        cancelReason: 'test command was rejected',
      }),
    ],
    requirements: [],
    effects: [addBase('health', 4)],
  });
  const engine = new TrainingEngine({ commands: [command] });
  const rejected = engine.execute(command.id, context);
  assert(!rejected.success, 'pre-execute decision should reject when no decision provider accepts it');
  assert(rejected.decisionResults?.[0]?.accepted === false, 'pre-execute decision should report rejection');
  assert(context.getNumericStat('base', 'health') === 0, 'rejected pre-execute decision should skip effects');

  const acceptedContext = {
    ...createInMemoryTrainingContext(createEmptyTrainingState(), 1),
    requestTrainingDecision: () => true,
  };
  const accepted = engine.execute(command.id, acceptedContext);
  assert(accepted.success, 'pre-execute decision should allow when decision provider accepts it');
  assert(accepted.decisionResults?.[0]?.accepted === true, 'pre-execute decision should report acceptance');
  assert(acceptedContext.getNumericStat('base', 'health') === 4, 'accepted pre-execute decision should apply effects');
}

function verifyFormulaGates(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);
  context.applyNumericStat('ability', 'obedience', 1, 'set');

  const gate = defineScoreFormulaGate({
    id: 'test.commandScore',
    threshold: 3,
    reason: 'test score too low',
    terms: [
      {
        id: 'obedience',
        value: (currentContext) => currentContext.getNumericStat('ability', 'obedience') * 2,
      },
      {
        id: 'love',
        when: (currentContext) => currentContext.getNumericStat('talent', 'love') > 0,
        value: () => 5,
      },
    ],
  });

  const command = defineTrainingCommand({
    id: 'training.test.formula-gate',
    originalId: 990,
    name: 'Formula Gate Test Command',
    category: 'basic',
    requirements: [],
    formulaGates: [gate],
    effects: [addBase('health', 1)],
  });
  const engine = new TrainingEngine({ commands: [command] });
  const blocked = engine.execute(command.id, context);
  assert(!blocked.success, 'formula gate should block when score is below threshold');
  assert(blocked.formulaGateResults?.[0]?.score === 2, 'formula gate should report score');
  assert(context.getNumericStat('base', 'health') === 0, 'blocked formula gate should skip effects');

  context.applyNumericStat('talent', 'love', 1, 'set');
  const allowed = engine.execute(command.id, context);
  assert(allowed.success, 'formula gate should allow when score meets threshold');
  assert(allowed.formulaGateResults?.[0]?.passed, 'formula gate should report pass result');
  assert(context.getNumericStat('base', 'health') === 1, 'passing formula gate should apply effects');

  const orderState = createEmptyTrainingState();
  const orderContext = createInMemoryTrainingContext(orderState, 1);
  orderContext.applyNumericStat('ability', 'obedience', 2, 'set');
  orderContext.applyNumericStat('ability', 'masochism', 1, 'set');
  orderContext.applyNumericStat('mark', 'pain', 1, 'set');
  orderContext.applyNumericStat('mark', 'submission', 1, 'set');
  orderContext.applyNumericStat('palam', 'submission', 1000, 'set');
  const orderGate = defineScoreFormulaGate({
    id: 'test.commonOrder',
    threshold: 20,
    terms: commonOrderGateTerms({ palamThresholds: [100, 500, 1000, 3000, 10000] }),
  });
  const orderCommand = defineTrainingCommand({
    id: 'training.test.common-order-gate',
    originalId: 989,
    name: 'Common Order Gate Test Command',
    category: 'basic',
    requirements: [],
    formulaGates: [orderGate],
    effects: [addBase('health', 2)],
  });
  const orderEngine = new TrainingEngine({ commands: [orderCommand] });
  const orderResult = orderEngine.execute(orderCommand.id, orderContext);
  assert(orderResult.success, 'common COM_ORDER terms should feed formula gates');
  assert(
    (orderResult.formulaGateResults?.[0]?.score ?? 0) >= 20,
    'common COM_ORDER terms should report accumulated score',
  );

  const comf6State = createEmptyTrainingState();
  const comf6Context = createInMemoryTrainingContext(comf6State, 1, { trainer: 2 });
  comf6Context.applyNumericStat('ability', 'obedience', 1, 'set');
  comf6Context.applyNumericStat('ability', 'mouthService', 2, 'set');
  comf6Context.applyNumericStat('ability', 'desire', 1, 'set');
  comf6Context.applyNumericStat('talent', 'devoted', 1, 'set');
  comf6Context.applyNumericStat('talent', 'charm', 1, 'set', roleTarget('trainer'));
  const comf6Gate = defineScoreFormulaGate({
    id: 'test.comf6Order',
    threshold: 15,
    terms: comf6OrderGateTerms({
      palamThresholds: [100, 500, 1000, 3000, 10000],
      dirtyPenalty: () => 2,
    }),
  });
  const comf6Command = defineTrainingCommand({
    id: 'training.test.comf6-order-gate',
    originalId: 984,
    name: 'COMF6 Order Gate Test Command',
    category: 'basic',
    requirements: [],
    formulaGates: [comf6Gate],
    effects: [addBase('health', 2)],
  });
  const comf6Engine = new TrainingEngine({ commands: [comf6Command] });
  const comf6Result = comf6Engine.execute(comf6Command.id, comf6Context);
  assert(comf6Result.success, 'COMF6 order terms should feed formula gates');
  assert(
    (comf6Result.formulaGateResults?.[0]?.score ?? 0) >= 15,
    'COMF6 order terms should include command-specific terms and dirty penalty',
  );
}

function verifyChainAvailabilityDefinitions(): void {
  const sixtyNineState = createEmptyTrainingState();
  const sixtyNineContext = createInMemoryTrainingContext(sixtyNineState, 1, { trainer: 2 });
  sixtyNineContext.applyNumericStat('ability', 'obedience', 3, 'set');
  sixtyNineContext.applyNumericStat('ability', 'mouthService', 3, 'set');
  assert(
    evaluateConditions(comf69AvailabilityRequirements(), sixtyNineContext).passed,
    'COM69 schema availability should pass default non-assistant required gates',
  );

  sixtyNineContext.applyNumericStat('equipment', 'rope', 1, 'set');
  assert(
    !evaluateConditions(comf69AvailabilityRequirements(), sixtyNineContext).passed,
    'COM69 schema availability should block rope',
  );

  const com128State = createEmptyTrainingState();
  const com128Context = createInMemoryTrainingContext(com128State, 1, { trainer: 2 });
  com128Context.applyNumericStat('ability', 'technique', 3, 'set', roleTarget('trainer'));
  com128Context.applyNumericStat('talent', 'male', 1, 'set', roleTarget('trainer'));
  assert(
    evaluateConditions(comf128AvailabilityRequirements(), com128Context).passed,
    'COM128 schema availability should pass trainer technique/genital gates',
  );

  com128Context.applyNumericFlag('additionalCommandsDisabled', 1, 'set');
  assert(
    !evaluateConditions(comf128AvailabilityRequirements(), com128Context).passed,
    'COM128 schema availability should block FLAG:71',
  );

  const com133State = createEmptyTrainingState();
  const com133Context = createInMemoryTrainingContext(com133State, 1, { trainer: 2 });
  com133Context.applyNumericStat('ability', 'technique', 4, 'set', roleTarget('trainer'));
  com133Context.applyNumericStat('talent', 'futanari', 1, 'set', roleTarget('trainer'));
  assert(
    evaluateConditions(comf133AvailabilityRequirements(), com133Context).passed,
    'COM133 schema availability should pass trainer technique/futanari gates',
  );
}

function verifyPassiveEquipmentHooks(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);
  context.applyNumericStat('equipment', 'vibrator', 1, 'set');

  const hook = definePassiveEquipmentHook({
    id: 'test.vibratorComfort',
    equipmentKey: 'vibrator',
    phase: 'beforeSourceConversion',
    effects: () => [addSource('comfort', 7)],
  });
  const command = defineTrainingCommand({
    id: 'training.test.passive-equipment-hook',
    originalId: 991,
    name: 'Passive Equipment Hook Test Command',
    category: 'basic',
    requirements: [],
    effects: [addSource('submission', 3)],
  });
  const engine = new TrainingEngine({
    commands: [command],
    passiveEffectHooks: [hook],
  });

  const result = engine.execute(command.id, context);
  assert(result.success, 'passive equipment hook command should execute successfully');
  assert(result.appliedEffects === 2, 'passive equipment hook should add one applied effect');
  assert(context.getNumericStat('source', 'submission') === 3, 'command source should be applied');
  assert(context.getNumericStat('source', 'comfort') === 7, 'passive equipment hook source should be applied');
  assertThrows(() => definePassiveEquipmentHook({
    id: 'test.badEquipmentHook',
    equipmentKey: 'missingEquipment',
    phase: 'beforeSourceConversion',
    effects: () => [],
  }), 'passive equipment hooks should reject unknown equipment keys');
}

function verifyPassiveTrainingModeHooks(): void {
  const state = createEmptyTrainingState();
  const context = createInMemoryTrainingContext(state, 1);
  context.applyTag?.(TRAINING_MODE_DEFINITIONS.bestiality.tag, true);

  const hook = definePassiveTrainingModeHook({
    id: 'test.bestialityFear',
    mode: 'bestiality',
    phase: 'beforeSourceConversion',
    effects: () => [addSource('fear', 9)],
  });
  const command = defineTrainingCommand({
    id: 'training.test.passive-mode-hook',
    originalId: 985,
    name: 'Passive Mode Hook Test Command',
    category: 'special',
    requirements: [],
    effects: [addSource('submission', 4)],
  });
  const engine = new TrainingEngine({
    commands: [command],
    passiveEffectHooks: [hook],
  });

  const result = engine.execute(command.id, context);
  assert(result.success, 'passive training mode hook command should execute successfully');
  assert(context.getNumericStat('source', 'submission') === 4, 'command source should be applied with passive mode hook');
  assert(context.getNumericStat('source', 'fear') === 9, 'passive mode hook should apply while mode is active');
  assertThrows(() => definePassiveTrainingModeHook({
    id: '',
    mode: 'bestiality',
    phase: 'beforeSourceConversion',
    effects: () => [],
  }), 'passive training mode hook should reject empty ids');

  const processorState = createEmptyTrainingState();
  const processorContext = createInMemoryTrainingContext(processorState, 1);
  processorContext.applyTag?.(TRAINING_MODE_DEFINITIONS.tentacle.tag, true);
  processorContext.applyNumericStat('equipment', 'tentacleTraining', 1, 'set');

  const processorCommand = defineTrainingCommand({
    id: 'training.test.passive-mode-processor',
    originalId: 986,
    name: 'Passive Mode Processor Test Command',
    category: 'special',
    requirements: [],
    effects: [
      addSource('pleasureC', 100),
      addSource('pleasureV', 80),
      addSource('aversion', 20),
      addSource('arousal', 40),
    ],
  });
  const processorEngine = new TrainingEngine({
    commands: [processorCommand],
    passiveEffectHooks: createStandardTrainingModePassiveProcessors(),
  });
  const processorResult = processorEngine.execute(processorCommand.id, processorContext);
  assert(processorResult.success, 'standard passive training mode processors should execute successfully');
  assert(
    processorContext.getNumericStat('source', 'pleasureC') === 150,
    'tentacle processor should multiply SOURCE:0 pleasureC by 1.50',
  );
  assert(
    processorContext.getNumericStat('source', 'pleasureV') === 120,
    'tentacle processor should multiply SOURCE:1 pleasureV by 1.50',
  );
  assert(
    processorContext.getNumericStat('source', 'aversion') === 26,
    'tentacle processor should multiply SOURCE:14 aversion by 1.30',
  );
  assert(
    processorContext.getNumericStat('source', 'arousal') === 40,
    'tentacle processor should not modify unrelated source keys',
  );

  const bestialityState = createEmptyTrainingState();
  const bestialityContext = createInMemoryTrainingContext(bestialityState, 1);
  bestialityContext.applyTag?.(TRAINING_MODE_DEFINITIONS.bestiality.tag, true);
  const bestialityCommand = defineTrainingCommand({
    id: 'training.test.bestiality-passive-mode-processor',
    originalId: 988,
    name: 'Bestiality Passive Mode Processor Test Command',
    category: 'special',
    requirements: [],
    effects: [
      addSource('shame', 30),
      addSource('semen', 10),
      addSource('aversion', 20),
    ],
  });
  const bestialityEngine = new TrainingEngine({
    commands: [bestialityCommand],
    passiveEffectHooks: createStandardTrainingModePassiveProcessors(),
  });
  const bestialityResult = bestialityEngine.execute(bestialityCommand.id, bestialityContext);
  assert(bestialityResult.success, 'bestiality passive training mode processor should execute successfully');
  assert(
    bestialityContext.getNumericStat('source', 'shame') === 60,
    'bestiality processor should multiply SOURCE:11 shame by 2.00',
  );
  assert(
    bestialityContext.getNumericStat('source', 'semen') === 13,
    'bestiality processor should multiply SOURCE:12 semen by 1.30',
  );
  assert(
    bestialityContext.getNumericStat('source', 'aversion') === 30,
    'bestiality processor should multiply SOURCE:14 aversion by 1.50',
  );

  const slimeState = createEmptyTrainingState();
  const slimeContext = createInMemoryTrainingContext(slimeState, 1);
  slimeContext.applyTag?.(TRAINING_MODE_DEFINITIONS.slime.tag, true);
  const slimeCommand = defineTrainingCommand({
    id: 'training.test.slime-passive-mode-processor',
    originalId: 987,
    name: 'Slime Passive Mode Processor Test Command',
    category: 'special',
    requirements: [],
    effects: [
      addSource('arousal', 100),
      addSource('obedience', 10),
    ],
  });
  const slimeEngine = new TrainingEngine({
    commands: [slimeCommand],
    passiveEffectHooks: createStandardTrainingModePassiveProcessors(),
  });
  const slimeResult = slimeEngine.execute(slimeCommand.id, slimeContext);
  assert(slimeResult.success, 'slime passive training mode processor should execute successfully');
  assert(
    Math.abs(slimeContext.getNumericStat('source', 'arousal') - 130) < 0.0001,
    'slime processor should multiply SOURCE:3 arousal by 1.30',
  );
  assert(
    slimeContext.getNumericStat('source', 'obedience') === 20,
    'slime processor should multiply SOURCE:6 obedience by 2.00',
  );

  assertThrows(() => definePassiveTrainingModeProcessor({
    id: 'test.bad-source-multiplier',
    mode: 'slime',
    sourceMultipliers: [{ sourceKey: 'missingSource', factor: 1.2 }],
  }), 'passive training mode processor should reject unknown source keys');
}

function createTestCharacter(): Character {
  return {
    id: 1,
    name: 'Test',
    callName: 'Test',
    base: {},
    maxBase: {},
    abl: {},
    palam: {},
    talent: {},
    exp: {},
    mark: {},
    juel: {},
    cflag: {},
    cstr: {},
    relation: [],
    isOwned: true,
    isAssistant: false,
    equipment: {},
    source: [],
    loseBase: [],
    up: [],
    stain: [],
    tier: 'N',
    stars: 0,
    condition: { hp: 100, mp: 100, mood: 0 },
    traits: [],
    assignment: null,
    baseValue: 0,
    marketValue: 0,
    loyalty: 0,
  };
}

function verifyStoreTrainingContext(): void {
  const character = createTestCharacter();
  const context = createStoreTrainingContext({
    flags: {},
    characters: [character],
  }, character.id);

  const result = applyEffects([
    addSource('pleasureC', 20),
    addBase('health', 10),
    addLoseBase('stamina', 6),
    addUp('arousal', 8),
    addExp('caress', 1),
  ], context);

  assert(result.warnings.length === 0, 'store context effects should apply without warnings');
  assert(
    context.getNumericStat('source', 'pleasureC') === 20,
    'store context should write source.pleasureC',
  );
  assert(
    context.getNumericStat('base', 'health') === 10,
    'store context should write base.health',
  );
  assert(
    context.getNumericStat('loseBase', 'stamina') === 6,
    'store context should write loseBase.stamina',
  );
  assert(
    context.getNumericStat('up', 'arousal') === 8,
    'store context should write up.arousal',
  );
  assert(
    context.getNumericStat('exp', 'caress') === 1,
    'store context should write exp.caress',
  );

  context.applyNumericStat('equipment', 'tentacleTraining', 1, 'set');
  assert(
    context.getNumericStat('equipment', 'tentacleTraining') === 1,
    'store context should write equipment.tentacleTraining',
  );

  context.applyBitwiseStat?.('equipment', 'tentacleTraining', 2, 'set');
  assert(
    context.getNumericStat('equipment', 'tentacleTraining') === 3,
    'store context should apply bitwise equipment effects',
  );

  context.applyNumericFlag('difficulty', 2, 'set');
  assert(context.getNumericStat('flag', 'difficulty') === 2, 'store context should read/write flags');

  const stainResult = applyEffects([
    setStainBits('vagina', STAIN_BITS.vaginalFluid),
  ], context, { handlers: trainingEffectHandlers });
  assert(stainResult.warnings.length === 0, 'store context stain effect should apply without warnings');
  assert(
    context.getNumericStat('stain', 'vagina') === STAIN_BITS.vaginalFluid,
    'store context should write stain.vagina',
  );
}

function verifyContentRegistry(): void {
  const baseCommand = defineTrainingCommand({
    id: 'training.test.content-registry-base',
    originalId: 1998,
    name: 'Content Registry Base Command',
    category: 'basic',
    requirements: [],
    effects: [addMessage('base content command')],
  });
  const experimentalCommand = defineTrainingCommand({
    id: 'training.test.content-registry-experimental',
    originalId: 1999,
    name: 'Content Registry Experimental Command',
    category: 'basic',
    requirements: [],
    effects: [addMessage('experimental content command')],
  });
  const basePack: ContentPack = {
    id: 'test.base',
    register(registry) {
      registry.registerTrainingCommand(baseCommand);
    },
  };
  const experimentalPack: ContentPack = {
    id: 'test.experimental',
    experimental: true,
    register(registry) {
      registry.registerTrainingCommand(experimentalCommand);
    },
  };
  const registry = new ContentRegistry({ packs: [basePack, experimentalPack] });

  assert(registry.isPackEnabled('test.base'), 'base content pack should be enabled by default');
  assert(!registry.isPackEnabled('test.experimental'), 'experimental content pack should be disabled by default');
  assert(
    registry.getTrainingCommand(baseCommand.id)?.id === baseCommand.id,
    'enabled pack training command should be visible',
  );
  assert(
    registry.getTrainingCommand(experimentalCommand.id) === undefined,
    'disabled pack training command should be hidden',
  );

  registry.setPackEnabled('test.experimental', true);
  assert(
    registry.getTrainingCommandByOriginalId(1999)?.id === experimentalCommand.id,
    'enabled experimental pack command should be visible by original id',
  );

  const engine = registry.createTrainingEngine();
  assert(
    engine.getCommand(experimentalCommand.id)?.id === experimentalCommand.id,
    'content registry should create engines from enabled pack commands',
  );

  registry.setPackEnabled('test.base', false);
  assert(
    registry.getTrainingCommand(baseCommand.id) === undefined,
    'disabled base pack command should be hidden',
  );
  assertThrows(
    () => registry.setPackEnabled('missing.pack', true),
    'content registry should reject unknown pack enable requests',
  );
  assertThrows(
    () => new ContentRegistry({ packs: [basePack, basePack] }),
    'content registry should reject duplicate pack ids',
  );
}

function verifySaveContentPackMigration(): void {
  const migrated = migrateSaveData({
    version: '0.0.0',
    timestamp: 0,
    slotNumber: 1,
    gameState: {
      day: 1,
      money: 0,
      ownedCharacters: [],
      availableCharacters: [],
      currentCharacter: null,
      globalFlags: {},
      items: {},
      achievements: [],
      clearedEndings: [],
    },
    metadata: {
      playTime: 0,
      saveCount: 0,
      dayReached: 1,
    },
  });

  assert(
    migrated.content.enabledPackIds.includes('training.base'),
    'legacy save migration should enable the base training content pack',
  );
}

function verifyCommandDefinitionValidation(): void {
  assertThrows(() => defineTrainingCommand({
    id: 'training.test.conflicted',
    originalId: 999,
    name: 'Conflicted Test Command',
    category: 'basic',
    requirements: [],
    effects: [],
    unresolvedConflicts: [{
      area: 'source',
      sources: [{
        file: 'legacy/training/commands/commands/COMF999.ts',
        confidence: 'conflicted',
      }],
      decisionNeeded: 'Choose a canonical source formula before migration.',
      blocksMigration: true,
    }],
  }), 'blocking unresolved conflicts should reject command definitions');

  assertThrows(() => defineTrainingCommand({
    id: 'training.test.bad-bit-mask',
    originalId: 998,
    name: 'Bad Bit Mask Test Command',
    category: 'basic',
    requirements: [],
    effects: [setStatBits('cflag', 'clothing', 0)],
  }), 'invalid bitwise masks should reject command definitions');
}

function main(): void {
  verifyKeyMaps();
  verifyConditionsAndEffects();
  verifySourceModifierPipeline();
  verifyActorRoleBindings();
  verifyEquipmentToggleEffects();
  verifyTrainingModes();
  verifyStainEffects();
  verifyComf0ParityCleanup();
  verifyAssistantAvailabilityPredicates();
  verifyPostEffectPhase();
  verifyRemapBeforeExecutePhase();
  verifyPreExecuteDecisionPhase();
  verifyFormulaGates();
  verifyChainAvailabilityDefinitions();
  verifyPassiveEquipmentHooks();
  verifyPassiveTrainingModeHooks();
  verifyStoreTrainingContext();
  verifyContentRegistry();
  verifySaveContentPackMigration();
  verifyCommandDefinitionValidation();
  console.log(JSON.stringify({
    ok: true,
    verified: ['keyMaps', 'conditions', 'effects', 'effectHandlerRegistry', 'numericMultiplyEffects', 'sourceModifierPipeline', 'actorRoleBindings', 'equipmentToggleEffects', 'trainingModes', 'stainEffects', 'comf0ParityCleanup', 'assistantAvailabilityPredicates', 'postEffectPhase', 'remapBeforeExecutePhase', 'preExecuteDecisionPhase', 'formulaGates', 'chainAvailabilityDefinitions', 'passiveEquipmentHooks', 'passiveTrainingModeHooks', 'passiveTrainingModeProcessors', 'storeTrainingContext', 'contentRegistry', 'saveContentPackMigration', 'commandDefinitionValidation'],
  }, null, 2));
}

main();
