import type { AnyCondition } from '../../core/conditions';
import type { Effect } from '../../core/effects';
import type { DomainRuntimeContext } from '../shared';
import type { SourceConversionResult } from '../person';

export interface TrainingCommandRuntimeContext extends DomainRuntimeContext {}

export type TrainingEffectResolver = (
  context: TrainingCommandRuntimeContext,
) => readonly Effect[];

export interface TrainingCommandRemap {
  readonly commandId: string;
  readonly reason?: string;
  readonly requireTargetAvailable?: boolean;
}

export type TrainingCommandRemapResolver = (
  context: TrainingCommandRuntimeContext,
  command: TrainingCommandDefinition,
) => TrainingCommandRemap | undefined;

export interface TrainingCommandDecisionRequest {
  readonly id: string;
  readonly prompt: string;
  readonly defaultAccepted?: boolean;
  readonly cancelReason?: string;
}

export interface TrainingCommandDecisionResult {
  readonly id: string;
  readonly accepted: boolean;
  readonly reason?: string;
}

export type TrainingCommandPreExecuteResolver = (
  context: TrainingCommandRuntimeContext,
  command: TrainingCommandDefinition,
) => TrainingCommandDecisionRequest | undefined;

export interface TrainingFormulaGateResult {
  readonly id: string;
  readonly passed: boolean;
  readonly score?: number;
  readonly threshold?: number;
  readonly reasons?: readonly string[];
  readonly details?: readonly string[];
}

export type TrainingFormulaGateResolver = (
  context: TrainingCommandRuntimeContext,
  command: TrainingCommandDefinition,
) => TrainingFormulaGateResult;

export type TrainingPassiveHookPhase = 'beforeSourceConversion' | 'afterSourceConversion';

export type TrainingPassiveEffectHook = (
  context: TrainingCommandRuntimeContext,
  command: TrainingCommandDefinition,
  phase: TrainingPassiveHookPhase,
) => readonly Effect[];

export type TrainingCommandSkippablePhase = 'postEffects';

export interface TrainingCommandPhaseSkip {
  readonly phase: TrainingCommandSkippablePhase;
  readonly when: readonly AnyCondition[];
  readonly reason?: string;
}

export interface TrainingCommandSkippedPhase {
  readonly phase: TrainingCommandSkippablePhase;
  readonly reason?: string;
}

export type TrainingCommandCategory =
  | 'basic'
  | 'tool'
  | 'insertion'
  | 'service'
  | 'sm'
  | 'assistant'
  | 'special';

export type ActorRole =
  | 'target'
  | 'trainer'
  | 'master'
  | 'assistant'
  | 'currentTrainer'
  | 'previousTrainer'
  | 'session'
  | 'global'
  | 'effectReceiver';

export type ActorBindings = Partial<Record<ActorRole, number>>;

export interface ActorRequirement {
  readonly role: ActorRole;
  readonly required: boolean;
  readonly defaultFrom?: ActorRole;
}

export type LegacySourceConfidence =
  | 'canonical'
  | 'temporary'
  | 'conflicted'
  | 'unsafe';

export interface LegacyReference {
  readonly file: string;
  readonly symbol?: string;
  readonly confidence: LegacySourceConfidence;
  readonly notes?: string;
}

export interface LegacySourceDecision {
  readonly availability?: LegacyReference;
  readonly sourceFormula?: LegacyReference;
  readonly directEffects?: LegacyReference;
  readonly sideEffects?: LegacyReference;
  readonly chainRemap?: LegacyReference;
  readonly messages?: LegacyReference;
}

export type LegacyConflictArea =
  | 'availability'
  | 'source'
  | 'effects'
  | 'chain'
  | 'state'
  | 'messages';

export interface UnresolvedLegacyConflict {
  readonly area: LegacyConflictArea;
  readonly sources: readonly LegacyReference[];
  readonly decisionNeeded: string;
  readonly blocksMigration: boolean;
}

export interface TrainingCommandDefinition {
  readonly id: string;
  readonly originalId?: number;
  readonly name: string;
  readonly category: TrainingCommandCategory;
  readonly tags?: readonly string[];
  readonly actors?: readonly ActorRequirement[];
  readonly legacy?: LegacySourceDecision;
  readonly unresolvedConflicts?: readonly UnresolvedLegacyConflict[];
  readonly preExecuteChecks?: readonly TrainingCommandPreExecuteResolver[];
  readonly remapBeforeExecute?: readonly TrainingCommandRemapResolver[];
  readonly requirements: readonly AnyCondition[];
  readonly formulaGates?: readonly TrainingFormulaGateResolver[];
  readonly phaseSkips?: readonly TrainingCommandPhaseSkip[];
  readonly effects: readonly Effect[];
  readonly dynamicEffects?: readonly TrainingEffectResolver[];
  readonly postEffects?: readonly TrainingEffectResolver[];
  readonly messages?: readonly string[];
}

export interface TrainingCommandExecution {
  readonly commandId: string;
  readonly originalId?: number;
  readonly success: boolean;
  readonly appliedEffects: number;
  readonly messages: string[];
  readonly warnings: string[];
  readonly failedReasons?: readonly string[];
  readonly formulaGateResults?: readonly TrainingFormulaGateResult[];
  readonly decisionResults?: readonly TrainingCommandDecisionResult[];
  readonly skippedPhases?: readonly TrainingCommandSkippedPhase[];
  readonly remappedFrom?: readonly string[];
  readonly remapReasons?: readonly string[];
  readonly sourceAfterEffects?: readonly number[];
  readonly sourceConversion?: SourceConversionResult;
}
