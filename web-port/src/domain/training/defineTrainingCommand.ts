import type { TrainingCommandDefinition } from './trainingTypes';
import type { Effect } from '../../core/effects';
import { hasStatKey } from '../stats';

const MAX_SAFE_BITWISE_MASK = 0x7fffffff;

function validateFiniteNumber(value: number, label: string, errors: string[]): void {
  if (!Number.isFinite(value)) {
    errors.push(`${label} must be a finite number.`);
  }
}

function validateBitwiseMask(mask: number, label: string, errors: string[]): void {
  if (!Number.isInteger(mask)) {
    errors.push(`${label} must be an integer.`);
    return;
  }

  if (mask <= 0) {
    errors.push(`${label} must be greater than zero.`);
  }

  if (mask > MAX_SAFE_BITWISE_MASK) {
    errors.push(`${label} must be <= ${MAX_SAFE_BITWISE_MASK} because JS bitwise operators use signed 32-bit values.`);
  }
}

function validateStainPart(part: string, label: string, errors: string[]): void {
  if (!part.trim()) {
    errors.push(`${label} is required.`);
  } else if (!hasStatKey('stain', part)) {
    errors.push(`${label} is not a registered stain part: ${part}`);
  }
}

function validateEffect(effect: Effect, commandId: string, index: number, errors: string[]): void {
  const label = `${commandId}.effects[${index}]`;

  if (effect.kind === 'flag.numeric') {
    validateFiniteNumber(effect.value, `${label}.value`, errors);
    return;
  }

  if (effect.kind === 'stat.numeric') {
    validateFiniteNumber(effect.value, `${label}.value`, errors);
    return;
  }

  if (effect.kind === 'flag.bit') {
    validateBitwiseMask(effect.mask, `${label}.mask`, errors);
    return;
  }

  if (effect.kind === 'stat.bit') {
    validateBitwiseMask(effect.mask, `${label}.mask`, errors);
    return;
  }

  if (effect.kind === 'equipment.toggle') {
    if (!effect.key.trim()) {
      errors.push(`${label}.key is required.`);
    } else if (!hasStatKey('equipment', effect.key)) {
      errors.push(`${label}.key is not a registered equipment key: ${effect.key}`);
    }

    for (const conflict of effect.conflicts ?? []) {
      if (!conflict.trim()) {
        errors.push(`${label}.conflicts must not contain empty keys.`);
      } else if (!hasStatKey('equipment', conflict)) {
        errors.push(`${label}.conflicts contains an unregistered equipment key: ${conflict}`);
      }
      if (conflict === effect.key) {
        errors.push(`${label}.conflicts must not include the toggled equipment key.`);
      }
    }
  }

  if (effect.kind === 'stain.modify') {
    validateStainPart(effect.part, `${label}.part`, errors);

    if (effect.op === 'assign') {
      if (!Number.isInteger(effect.value) || effect.value < 0) {
        errors.push(`${label}.value must be a non-negative integer for stain assignment.`);
      }
      return;
    }

    validateBitwiseMask(effect.value, `${label}.value`, errors);
    return;
  }

  if (effect.kind === 'stain.transfer') {
    validateStainPart(effect.from.part, `${label}.from.part`, errors);
    validateStainPart(effect.to.part, `${label}.to.part`, errors);
  }
}

export function validateTrainingCommandDefinition(command: TrainingCommandDefinition): readonly string[] {
  const errors: string[] = [];

  if (!command.id.trim()) {
    errors.push('Training command id is required.');
  }

  if (!command.name.trim()) {
    errors.push(`Training command ${command.id || '<missing-id>'} name is required.`);
  }

  for (const conflict of command.unresolvedConflicts ?? []) {
    if (conflict.blocksMigration) {
      errors.push(
        `${command.id} has a blocking unresolved ${conflict.area} conflict: ${conflict.decisionNeeded}`,
      );
    }
  }

  command.effects.forEach((effect, index) => validateEffect(effect, command.id, index, errors));

  return errors;
}

export function defineTrainingCommand(command: TrainingCommandDefinition): TrainingCommandDefinition {
  const errors = validateTrainingCommandDefinition(command);

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return command;
}
