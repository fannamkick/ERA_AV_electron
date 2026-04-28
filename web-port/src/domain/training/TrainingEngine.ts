import {
  applyEffects,
  type Effect,
  type EffectApplierContext,
  type EffectHandlerRegistry,
} from '../../core/effects';
import { evaluateConditions, type ConditionEvaluatorContext } from '../../core/conditions';
import type {
  TrainingCommandDefinition,
  TrainingCommandDecisionRequest,
  TrainingCommandDecisionResult,
  TrainingCommandExecution,
  TrainingFormulaGateResult,
  TrainingPassiveEffectHook,
  TrainingPassiveHookPhase,
  TrainingCommandSkippedPhase,
} from './trainingTypes';
import { convertSourceToPalam, type SourceConversionResult } from '../person';
import { trainingEffectHandlers } from './trainingEffectHandlers';

export interface TrainingEngineContext extends ConditionEvaluatorContext, EffectApplierContext {
  getSourceSnapshot?(): readonly number[];
  getPalamSnapshot?(): readonly number[];
  applySourceSnapshot?(source: readonly number[]): void;
  applyPalamSnapshot?(palam: readonly number[]): void;
  getRelation?(fromCharacterId: number, toCharacterId: number): number;
  requestTrainingDecision?(request: TrainingCommandDecisionRequest, command: TrainingCommandDefinition): boolean;
}

export interface TrainingEngineOptions {
  readonly commands: readonly TrainingCommandDefinition[];
  readonly convertSourceToPalamAfterEffects?: boolean;
  readonly clearMappedSourceAfterConversion?: boolean;
  readonly passiveEffectHooks?: readonly TrainingPassiveEffectHook[];
  readonly effectHandlers?: EffectHandlerRegistry;
}

export interface TrainingCommandExecutionOptions {
  readonly convertSourceToPalamAfterEffects?: boolean;
  readonly clearMappedSourceAfterConversion?: boolean;
  readonly maxRemapDepth?: number;
}

export class TrainingEngine {
  private readonly commandsById = new Map<string, TrainingCommandDefinition>();
  private readonly commandsByOriginalId = new Map<number, TrainingCommandDefinition>();
  private readonly convertSourceToPalamAfterEffects: boolean;
  private readonly clearMappedSourceAfterConversion: boolean;
  private readonly passiveEffectHooks: readonly TrainingPassiveEffectHook[];
  private readonly effectHandlers: EffectHandlerRegistry;

  constructor(options: TrainingEngineOptions) {
    this.convertSourceToPalamAfterEffects = options.convertSourceToPalamAfterEffects ?? false;
    this.clearMappedSourceAfterConversion = options.clearMappedSourceAfterConversion ?? true;
    this.passiveEffectHooks = options.passiveEffectHooks ?? [];
    this.effectHandlers = options.effectHandlers ?? trainingEffectHandlers;

    for (const command of options.commands) {
      this.register(command);
    }
  }

  register(command: TrainingCommandDefinition): void {
    if (this.commandsById.has(command.id)) {
      throw new Error(`Duplicate training command id: ${command.id}`);
    }

    this.commandsById.set(command.id, command);

    if (command.originalId !== undefined) {
      if (this.commandsByOriginalId.has(command.originalId)) {
        throw new Error(`Duplicate original training command id: ${command.originalId}`);
      }
      this.commandsByOriginalId.set(command.originalId, command);
    }
  }

  getCommand(commandId: string): TrainingCommandDefinition | undefined {
    return this.commandsById.get(commandId);
  }

  getCommandByOriginalId(originalId: number): TrainingCommandDefinition | undefined {
    return this.commandsByOriginalId.get(originalId);
  }

  getAllCommands(): TrainingCommandDefinition[] {
    return Array.from(this.commandsById.values());
  }

  getAvailableCommands(context: TrainingEngineContext): TrainingCommandDefinition[] {
    return this.getAllCommands().filter((command) => this.isCommandAvailable(command, context));
  }

  execute(
    commandId: string,
    context: TrainingEngineContext,
    options: TrainingCommandExecutionOptions = {},
  ): TrainingCommandExecution {
    return this.executeResolved(commandId, context, options, [], [], []);
  }

  private executeResolved(
    commandId: string,
    context: TrainingEngineContext,
    options: TrainingCommandExecutionOptions,
    remappedFrom: string[],
    remapReasons: string[],
    accumulatedDecisionResults: TrainingCommandDecisionResult[],
  ): TrainingCommandExecution {
    const command = this.getCommand(commandId);
    if (!command) {
      return {
        commandId,
        success: false,
        appliedEffects: 0,
        messages: [],
        warnings: [`Unknown training command: ${commandId}`],
        remappedFrom: remappedFrom.length > 0 ? remappedFrom : undefined,
        remapReasons: remapReasons.length > 0 ? remapReasons : undefined,
      };
    }

    const currentDecisionResults = this.resolvePreExecuteDecisions(command, context);
    const decisionResults = [...accumulatedDecisionResults, ...currentDecisionResults];
    const rejectedDecision = currentDecisionResults.find((result) => !result.accepted);
    if (rejectedDecision) {
      return {
        commandId: command.id,
        originalId: command.originalId,
        success: false,
        appliedEffects: 0,
        messages: command.messages ? [...command.messages] : [],
        warnings: ['Training command was cancelled before execution.'],
        failedReasons: rejectedDecision.reason ? [rejectedDecision.reason] : undefined,
        decisionResults,
        remappedFrom: remappedFrom.length > 0 ? remappedFrom : undefined,
        remapReasons: remapReasons.length > 0 ? remapReasons : undefined,
      };
    }

    const remap = this.resolveRemap(command, context);
    if (remap && remap.commandId !== command.id) {
      const maxDepth = options.maxRemapDepth ?? 8;
      if (remappedFrom.length >= maxDepth) {
        return {
          commandId: command.id,
          originalId: command.originalId,
          success: false,
          appliedEffects: 0,
          messages: command.messages ? [...command.messages] : [],
          warnings: [`Training command remap exceeded max depth (${maxDepth}).`],
          decisionResults: decisionResults.length > 0 ? decisionResults : undefined,
          remappedFrom: [...remappedFrom, command.id],
          remapReasons: remap.reason ? [...remapReasons, remap.reason] : remapReasons,
        };
      }

      return this.executeResolved(
        remap.commandId,
        context,
        options,
        [...remappedFrom, command.id],
        remap.reason ? [...remapReasons, remap.reason] : remapReasons,
        decisionResults,
      );
    }

    const requirementResult = evaluateConditions(command.requirements, context);
    if (!requirementResult.passed) {
      return {
        commandId: command.id,
        originalId: command.originalId,
        success: false,
        appliedEffects: 0,
        messages: command.messages ? [...command.messages] : [],
        warnings: ['Training command requirements were not met.'],
        failedReasons: requirementResult.reasons,
        decisionResults: decisionResults.length > 0 ? decisionResults : undefined,
        remappedFrom: remappedFrom.length > 0 ? remappedFrom : undefined,
        remapReasons: remapReasons.length > 0 ? remapReasons : undefined,
      };
    }

    const formulaGateResults = this.evaluateFormulaGates(command, context);
    const failedFormulaGates = formulaGateResults.filter((result) => !result.passed);
    if (failedFormulaGates.length > 0) {
      return {
        commandId: command.id,
        originalId: command.originalId,
        success: false,
        appliedEffects: 0,
        messages: command.messages ? [...command.messages] : [],
        warnings: ['Training command formula gates were not met.'],
        failedReasons: failedFormulaGates.flatMap((result) => result.reasons ?? [`Formula gate failed: ${result.id}`]),
        formulaGateResults,
        decisionResults: decisionResults.length > 0 ? decisionResults : undefined,
        remappedFrom: remappedFrom.length > 0 ? remappedFrom : undefined,
        remapReasons: remapReasons.length > 0 ? remapReasons : undefined,
      };
    }

    const dynamicEffects = command.dynamicEffects?.flatMap((resolve) => [...resolve(context)]) ?? [];
    const effectResult = this.applyTrainingEffects([...command.effects, ...dynamicEffects], context);
    const beforeSourceHookResult = applyEffects(
      this.resolvePassiveHookEffects(command, context, 'beforeSourceConversion'),
      context,
      { handlers: this.effectHandlers },
    );
    const sourceAfterEffects = context.getSourceSnapshot?.();
    const sourceConversion = this.convertSourceToPalamIfAvailable(context, options);
    const skippedPhases = this.resolveSkippedPhases(command, context);
    const shouldSkipPostEffects = skippedPhases.some((skip) => skip.phase === 'postEffects');
    const postEffects = shouldSkipPostEffects
      ? []
      : command.postEffects?.flatMap((resolve) => [...resolve(context)]) ?? [];
    const postEffectResult = this.applyTrainingEffects(postEffects, context);
    const afterSourceHookResult = applyEffects(
      this.resolvePassiveHookEffects(command, context, 'afterSourceConversion'),
      context,
      { handlers: this.effectHandlers },
    );
    const warnings = [
      ...effectResult.warnings,
      ...beforeSourceHookResult.warnings,
      ...postEffectResult.warnings,
      ...afterSourceHookResult.warnings,
    ];
    if (warnings.length === 0) {
      this.updateChainState(command, context);
    }

    return {
      commandId: command.id,
      originalId: command.originalId,
      success: warnings.length === 0,
      appliedEffects:
        effectResult.applied.length +
        beforeSourceHookResult.applied.length +
        postEffectResult.applied.length +
        afterSourceHookResult.applied.length,
      messages: [
        ...(command.messages ?? []),
        ...effectResult.messages,
        ...beforeSourceHookResult.messages,
        ...postEffectResult.messages,
        ...afterSourceHookResult.messages,
      ],
      warnings,
      formulaGateResults: formulaGateResults.length > 0 ? formulaGateResults : undefined,
      decisionResults: decisionResults.length > 0 ? decisionResults : undefined,
      skippedPhases: skippedPhases.length > 0 ? skippedPhases : undefined,
      remappedFrom: remappedFrom.length > 0 ? remappedFrom : undefined,
      remapReasons: remapReasons.length > 0 ? remapReasons : undefined,
      sourceAfterEffects: sourceAfterEffects ? [...sourceAfterEffects] : undefined,
      sourceConversion,
    };
  }

  private resolveRemap(
    command: TrainingCommandDefinition,
    context: TrainingEngineContext,
  ): { commandId: string; reason?: string } | undefined {
    for (const resolver of command.remapBeforeExecute ?? []) {
      const remap = resolver(context, command);
      if (!remap) continue;
      if (!remap.requireTargetAvailable) return remap;

      const targetCommand = this.getCommand(remap.commandId);
      if (targetCommand && this.isCommandAvailable(targetCommand, context)) {
        return remap;
      }
    }

    return undefined;
  }

  private resolvePreExecuteDecisions(
    command: TrainingCommandDefinition,
    context: TrainingEngineContext,
  ): TrainingCommandDecisionResult[] {
    const results: TrainingCommandDecisionResult[] = [];

    for (const resolver of command.preExecuteChecks ?? []) {
      const request = resolver(context, command);
      if (!request) continue;

      const accepted = context.requestTrainingDecision?.(request, command)
        ?? request.defaultAccepted
        ?? false;

      results.push({
        id: request.id,
        accepted,
        reason: accepted ? undefined : request.cancelReason,
      });
    }

    return results;
  }

  private resolveSkippedPhases(
    command: TrainingCommandDefinition,
    context: TrainingEngineContext,
  ): TrainingCommandSkippedPhase[] {
    const skipped: TrainingCommandSkippedPhase[] = [];

    for (const skip of command.phaseSkips ?? []) {
      if (evaluateConditions(skip.when, context).passed) {
        skipped.push({
          phase: skip.phase,
          reason: skip.reason,
        });
      }
    }

    return skipped;
  }

  private isCommandAvailable(command: TrainingCommandDefinition, context: TrainingEngineContext): boolean {
    return evaluateConditions(command.requirements, context).passed &&
      this.evaluateFormulaGates(command, context).every((result) => result.passed);
  }

  private evaluateFormulaGates(
    command: TrainingCommandDefinition,
    context: TrainingEngineContext,
  ): TrainingFormulaGateResult[] {
    return command.formulaGates?.map((resolver) => resolver(context, command)) ?? [];
  }

  private resolvePassiveHookEffects(
    command: TrainingCommandDefinition,
    context: TrainingEngineContext,
    phase: TrainingPassiveHookPhase,
  ): Effect[] {
    return this.passiveEffectHooks.flatMap((hook) => [...hook(context, command, phase)]);
  }

  private applyTrainingEffects(
    effects: readonly Effect[],
    context: TrainingEngineContext,
  ) {
    return applyEffects(effects, context, { handlers: this.effectHandlers });
  }

  private updateChainState(
    command: TrainingCommandDefinition,
    context: TrainingEngineContext,
  ): void {
    if (command.originalId === undefined) return;

    const previousCommand = context.getNumericStat('tflag', 'previousCommand');
    context.applyNumericStat('tflag', 'previousPreviousCommand', previousCommand, 'set');
    context.applyNumericStat('tflag', 'previousCommand', command.originalId, 'set');
    context.applyNumericStat(
      'tflag',
      'previousTrainerWasAssistant',
      context.hasTag?.('training.assistantPlay') ? 1 : 0,
      'set',
    );
  }

  private convertSourceToPalamIfAvailable(
    context: TrainingEngineContext,
    options: TrainingCommandExecutionOptions,
  ): SourceConversionResult | undefined {
    const enabled = options.convertSourceToPalamAfterEffects
      ?? this.convertSourceToPalamAfterEffects;

    if (!enabled) return undefined;

    const clearMappedSource = options.clearMappedSourceAfterConversion
      ?? this.clearMappedSourceAfterConversion;

    if (!context.getSourceSnapshot || !context.getPalamSnapshot || !context.applyPalamSnapshot) {
      return undefined;
    }

    if (clearMappedSource && !context.applySourceSnapshot) {
      return undefined;
    }

    const source = context.getSourceSnapshot();
    const palam = context.getPalamSnapshot();
    const result = convertSourceToPalam({
      source,
      palam,
      clearMappedSource,
    });

    context.applyPalamSnapshot(result.palam);
    if (clearMappedSource) {
      context.applySourceSnapshot?.(result.source);
    }

    return result;
  }
}
