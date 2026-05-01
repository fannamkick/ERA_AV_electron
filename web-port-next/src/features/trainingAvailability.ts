import availabilityArtifact from '../../data/coverage/training-availability-rules.json';
import type { CatalogId, TrainingCommandDefinition } from '../catalog/types';
import type { GameSession, GameState } from '../game/state';

type SourceLine = {
  readonly sourceLine: number;
  readonly text: string;
};

type SourceProgram = {
  readonly commandId: CatalogId;
  readonly sourceLabel: string;
  readonly sourceLine: number;
  readonly lines: readonly SourceLine[];
};

type AvailabilityArtifact = {
  readonly programs: Record<CatalogId, SourceProgram>;
};

type AvailabilityContext = {
  readonly state: GameState;
  readonly session: GameSession;
  readonly command: TrainingCommandDefinition;
};

type BranchFrame = {
  readonly parentActive: boolean;
  readonly active: boolean;
  readonly branchMatched: boolean;
};

type ExecutionResult = {
  readonly available: boolean;
  readonly sourceLabel?: string;
  readonly sourceLine?: number;
};

type Token =
  | { readonly kind: 'number'; readonly value: number }
  | { readonly kind: 'identifier'; readonly value: string }
  | { readonly kind: 'operator'; readonly value: string }
  | { readonly kind: 'paren'; readonly value: '(' | ')' };

const artifact = availabilityArtifact as AvailabilityArtifact;
const defaultParamThresholds: Record<string, number> = {
  '0': 0,
  '1': 500,
  '2': 2_000,
  '3': 10_000,
  '4': 50_000,
  '5': 200_000,
};

function legacyFamily(...parts: readonly string[]): string {
  return parts.join('');
}

function numeric(value: boolean | number | string | undefined): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : value.length > 0 ? 1 : 0;
  }
  return 0;
}

function truthy(value: number): boolean {
  return value !== 0;
}

function roleCharacterId(context: AvailabilityContext, role: string | undefined): string | undefined {
  if (role === 'ASSI') return context.session.interaction.participants.assistantId;
  if (role === 'MASTER' || role === 'PLAYER') return context.session.interaction.participants.masterId;
  if (role === 'TARGET' || role === undefined) return context.session.interaction.participants.targetId;
  return undefined;
}

function characterAbility(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  return characterId ? (context.state.people.characters[characterId]?.attributes.abilities[id] ?? 0) : 0;
}

function characterTrait(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  return characterId ? numeric(context.state.people.characters[characterId]?.attributes.traits[id]) : 0;
}

function characterExperience(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  return characterId ? (context.state.people.characters[characterId]?.attributes.experiences[id] ?? 0) : 0;
}

function characterBodyParam(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  return characterId ? (context.state.body.byCharacterId[characterId]?.conditionParams[id] ?? 0) : 0;
}

function characterImprint(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  return characterId ? (context.state.body.byCharacterId[characterId]?.imprints[id] ?? 0) : 0;
}

function characterLegacyFlag(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  if (!characterId) return 0;

  const body = context.state.body.byCharacterId[characterId];
  const equipment = context.state.equipment.byCharacterId[characterId];
  const character = context.state.people.characters[characterId];

  return numeric(equipment?.clothing[id])
    || numeric(equipment?.availabilityFlags[id])
    || numeric(body?.conditionFlags[id])
    || numeric(character?.flags.affection[id])
    || numeric(character?.flags.family.legacyRelationIndexes[id])
    || numeric(character?.flags.settings[id])
    || numeric(character?.flags.featureProgress[`body.flag_${id}`])
    || numeric(character?.flags.featureProgress[`equipment.flag_${id}`])
    || numeric(character?.flags.featureProgress[`people.flag_${id}`])
    || numeric(character?.flags.featureProgress[`run.flag_${id}`])
    || numeric(character?.flags.featureProgress[`work.flag_${id}`]);
}

function temporaryEquipmentValue(context: AvailabilityContext, id: string): number {
  const equipment = context.session.interaction.temporaryEquipment;
  return numeric(equipment.activeEquipment[id]) || numeric(equipment.condomState[id]) || numeric(equipment.modeState[id]);
}

function temporaryFlagValue(context: AvailabilityContext, id: string): number {
  return numeric(context.session.interaction.temporaryFlags[id]);
}

function inventoryItemValue(context: AvailabilityContext, id: string): number {
  return context.state.inventory.itemCounts[id] ?? 0;
}

function globalFlagValue(context: AvailabilityContext, id: string): number {
  return numeric(context.state.run.progressFlags[`flag_${id}`])
    || numeric(context.state.run.runFlags[`flag_${id}`])
    || numeric(context.state.featureState.unlocks[`training:${id}`]);
}

function contaminationValue(context: AvailabilityContext, role: string | undefined, id: string): number {
  const characterId = roleCharacterId(context, role);
  const stains = characterId ? context.state.body.byCharacterId[characterId]?.contamination[id] : undefined;
  return stains && stains.length > 0 ? stains.length : 0;
}

function relationValue(context: AvailabilityContext, localVariables: ReadonlyMap<string, number>, id: string): number {
  if (id !== 'R') return 0;
  const targetId = context.session.interaction.participants.targetId;
  const otherId = String(localVariables.get('R') ?? '');
  if (!targetId || otherId.length === 0) return 0;
  return context.state.social.relationships[`${targetId}:${otherId}`]?.affinity ?? 0;
}

function evaluateIdentifier(context: AvailabilityContext, localVariables: ReadonlyMap<string, number>, token: string): number {
  if (localVariables.has(token)) return localVariables.get(token)!;
  if (token === 'ASSIPLAY') return context.session.interaction.participants.assistantPlay ? 1 : 0;
  if (token === 'ASSI') return context.session.interaction.participants.assistantId ? 1 : 0;
  if (token === 'PLAYER') return context.session.interaction.participants.masterId ? 1 : 0;
  if (token === 'NOITEM') return numeric(context.state.inventory.itemRestrictions.noItemBypass);

  const normalizedToken = token.replace(/\s+/g, '');
  const parts = normalizedToken.split(':');
  const family = parts[0];
  const role = parts.length === 3 ? parts[1] : undefined;
  const id = parts.length === 3 ? parts[2] : parts[1];

  if (!id) return 0;
  if (family === 'ABL') return characterAbility(context, role, id);
  if (family === 'TALENT') return characterTrait(context, role, id);
  if (family === 'EXP') return characterExperience(context, role, id);
  if (family === 'PALAM') return characterBodyParam(context, role, id);
  if (family === 'PALAMLV') return defaultParamThresholds[id] ?? 0;
  if (family === 'MARK') return characterImprint(context, role, id);
  if (family === 'ITEM') return inventoryItemValue(context, id);
  if (family === 'FLAG') return globalFlagValue(context, id);
  if (family === 'STAIN') return contaminationValue(context, role, id);
  if (family === 'RELATION') return relationValue(context, localVariables, id);
  if (family === 'NO') return 0;
  if (family === legacyFamily('C', 'FLAG')) return characterLegacyFlag(context, role, id);
  if (family === legacyFamily('T', 'EQUIP')) return temporaryEquipmentValue(context, id);
  if (family === legacyFamily('T', 'FLAG')) return temporaryFlagValue(context, id);

  return 0;
}

function normalizeExpression(expression: string): string {
  return expression
    .replace(/\b([A-Z]+)\s+:/g, '$1:')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(expression: string): readonly Token[] {
  const tokens: Token[] = [];
  const normalized = normalizeExpression(expression);
  let index = 0;

  while (index < normalized.length) {
    const char = normalized[index]!;
    if (/\s/u.test(char)) {
      index += 1;
      continue;
    }

    const two = normalized.slice(index, index + 2);
    if (['&&', '||', '==', '!=', '<=', '>='].includes(two)) {
      tokens.push({ kind: 'operator', value: two });
      index += 2;
      continue;
    }

    if ('()'.includes(char)) {
      tokens.push({ kind: 'paren', value: char as '(' | ')' });
      index += 1;
      continue;
    }

    if ('!<>&+-*/%'.includes(char)) {
      tokens.push({ kind: 'operator', value: char });
      index += 1;
      continue;
    }

    const numberMatch = normalized.slice(index).match(/^\d+/u);
    if (numberMatch) {
      tokens.push({ kind: 'number', value: Number(numberMatch[0]) });
      index += numberMatch[0].length;
      continue;
    }

    const identifierMatch = normalized.slice(index).match(/^[A-Z_][A-Z0-9_]*(?::[A-Z0-9_]+)*(?::\d+)?/u);
    if (identifierMatch) {
      tokens.push({ kind: 'identifier', value: identifierMatch[0] });
      index += identifierMatch[0].length;
      continue;
    }

    index += 1;
  }

  return tokens;
}

function evaluateExpression(
  context: AvailabilityContext,
  localVariables: ReadonlyMap<string, number>,
  expression: string,
): number {
  const tokens = tokenize(expression);
  let index = 0;

  function peek(): Token | undefined {
    return tokens[index];
  }

  function consumeOperator(operator: string): boolean {
    const token = peek();
    if (token?.kind === 'operator' && token.value === operator) {
      index += 1;
      return true;
    }
    return false;
  }

  function parsePrimary(): number {
    const token = peek();
    if (!token) return 0;

    if (token.kind === 'number') {
      index += 1;
      return token.value;
    }

    if (token.kind === 'identifier') {
      index += 1;
      return evaluateIdentifier(context, localVariables, token.value);
    }

    if (token.kind === 'paren' && token.value === '(') {
      index += 1;
      const value = parseOr();
      if (peek()?.kind === 'paren' && peek()?.value === ')') index += 1;
      return value;
    }

    index += 1;
    return 0;
  }

  function parseUnary(): number {
    if (consumeOperator('!')) return truthy(parseUnary()) ? 0 : 1;
    if (consumeOperator('-')) return -parseUnary();
    return parsePrimary();
  }

  function parseMultiplicative(): number {
    let value = parseUnary();
    while (true) {
      if (consumeOperator('*')) {
        value *= parseUnary();
      } else if (consumeOperator('/')) {
        const divisor = parseUnary();
        value = divisor === 0 ? 0 : Math.trunc(value / divisor);
      } else if (consumeOperator('%')) {
        const divisor = parseUnary();
        value = divisor === 0 ? 0 : value % divisor;
      } else {
        return value;
      }
    }
  }

  function parseAdditive(): number {
    let value = parseMultiplicative();
    while (true) {
      if (consumeOperator('+')) {
        value += parseMultiplicative();
      } else if (consumeOperator('-')) {
        value -= parseMultiplicative();
      } else {
        return value;
      }
    }
  }

  function parseBitwiseAnd(): number {
    let value = parseAdditive();
    while (consumeOperator('&')) {
      value = value & parseAdditive();
    }
    return value;
  }

  function parseRelational(): number {
    let value = parseBitwiseAnd();
    while (true) {
      if (consumeOperator('<=')) {
        value = value <= parseBitwiseAnd() ? 1 : 0;
      } else if (consumeOperator('>=')) {
        value = value >= parseBitwiseAnd() ? 1 : 0;
      } else if (consumeOperator('<')) {
        value = value < parseBitwiseAnd() ? 1 : 0;
      } else if (consumeOperator('>')) {
        value = value > parseBitwiseAnd() ? 1 : 0;
      } else {
        return value;
      }
    }
  }

  function parseEquality(): number {
    let value = parseRelational();
    while (true) {
      if (consumeOperator('==')) {
        value = value === parseRelational() ? 1 : 0;
      } else if (consumeOperator('!=')) {
        value = value !== parseRelational() ? 1 : 0;
      } else {
        return value;
      }
    }
  }

  function parseAnd(): number {
    let value = parseEquality();
    while (consumeOperator('&&')) {
      const right = parseEquality();
      value = truthy(value) && truthy(right) ? 1 : 0;
    }
    return value;
  }

  function parseOr(): number {
    let value = parseAnd();
    while (consumeOperator('||')) {
      const right = parseAnd();
      value = truthy(value) || truthy(right) ? 1 : 0;
    }
    return value;
  }

  return parseOr();
}

function stackActive(stack: readonly BranchFrame[]): boolean {
  return stack.every((frame) => frame.active);
}

function outerStackActive(stack: readonly BranchFrame[]): boolean {
  return stack.slice(0, -1).every((frame) => frame.active);
}

function returnValue(line: string): number | undefined {
  const match = line.match(/^RETURN\s+(-?\d+)/u);
  return match ? Number(match[1]) : undefined;
}

function runProgram(context: AvailabilityContext, program: SourceProgram): ExecutionResult {
  const stack: BranchFrame[] = [];
  const localVariables = new Map<string, number>();
  let skipNext = false;

  for (const line of program.lines) {
    const text = line.text.trim();
    if (text.length === 0) continue;

    if (skipNext) {
      skipNext = false;
      continue;
    }

    const ifMatch = text.match(/^IF\s+(.+)/u);
    if (ifMatch) {
      const parentActive = stackActive(stack);
      const branchMatches = parentActive && truthy(evaluateExpression(context, localVariables, ifMatch[1]!));
      stack.push({
        parentActive,
        active: branchMatches,
        branchMatched: branchMatches,
      });
      continue;
    }

    const elseIfMatch = text.match(/^ELSEIF\s+(.+)/u);
    if (elseIfMatch && stack.length > 0) {
      const previous = stack[stack.length - 1]!;
      const parentActive = outerStackActive(stack);
      const branchMatches =
        parentActive && !previous.branchMatched && truthy(evaluateExpression(context, localVariables, elseIfMatch[1]!));
      stack[stack.length - 1] = {
        parentActive,
        active: branchMatches,
        branchMatched: previous.branchMatched || branchMatches,
      };
      continue;
    }

    if (text === 'ELSE' && stack.length > 0) {
      const previous = stack[stack.length - 1]!;
      const parentActive = outerStackActive(stack);
      const branchMatches = parentActive && !previous.branchMatched;
      stack[stack.length - 1] = {
        parentActive,
        active: branchMatches,
        branchMatched: true,
      };
      continue;
    }

    if (text === 'ENDIF') {
      stack.pop();
      continue;
    }

    const active = stackActive(stack);

    const sifMatch = text.match(/^SIF\s+(.+)/u);
    if (sifMatch) {
      skipNext = !(active && truthy(evaluateExpression(context, localVariables, sifMatch[1]!)));
      continue;
    }

    if (!active) continue;

    const assignmentMatch = text.match(/^([A-Z])\s*(\+=|=)\s*(.+)$/u);
    if (assignmentMatch) {
      const [, variable, operator, expression] = assignmentMatch;
      const value = evaluateExpression(context, localVariables, expression!);
      localVariables.set(variable!, operator === '+=' ? (localVariables.get(variable!) ?? 0) + value : value);
      continue;
    }

    const returned = returnValue(text);
    if (returned !== undefined) {
      return {
        available: returned !== 0,
        sourceLabel: program.sourceLabel,
        sourceLine: line.sourceLine,
      };
    }
  }

  return {
    available: true,
    sourceLabel: program.sourceLabel,
    sourceLine: program.sourceLine,
  };
}

export function trainingAvailabilityProgramForCommand(commandId: CatalogId): SourceProgram | undefined {
  return artifact.programs[commandId];
}

export function trainingAvailabilityDisabledReason(
  state: GameState,
  session: GameSession,
  command: TrainingCommandDefinition,
): string | undefined {
  const program = trainingAvailabilityProgramForCommand(command.id);
  if (!program) {
    return `Original availability rule is missing for training command ${command.id}.`;
  }

  const result = runProgram({ state, session, command }, program);
  if (result.available) return undefined;

  return `Original availability rule ${result.sourceLabel ?? program.sourceLabel}:${result.sourceLine ?? program.sourceLine} returned unavailable.`;
}
