/**
 * 커맨드 자동 생성 스크립트
 *
 * commandData.json을 읽어서 모든 커맨드를 생성합니다.
 * 각 커맨드는 기본 템플릿을 사용하며, 나중에 개별 커맨드 파일에서 커스터마이징 가능합니다.
 */

import type { CommandPlugin } from './types';
import type { TrainingContext, SourceValues } from '../types';
import commandData from './commandData.json';
import { checkCommandAvailability } from './availability';

// 기본 가용성 함수 - availability.ts에서 처리
const getAvailabilityFunc = (commandId: number) => {
  return (context: TrainingContext): boolean => {
    return checkCommandAvailability(commandId, context);
  };
};

// 기본 SOURCE 계산 (카테고리별)
const calculateBasicSource = (
  context: TrainingContext,
  category: string
): SourceValues => {
  const { target } = context;
  const abilities = target.abilities;

  const source: SourceValues = {
    쾌C: 0,
    쾌V: 0,
    쾌A: 0,
    쾌B: 0,
    윤활: 0,
    굴종: 0,
    욕정: 0,
    굴복: 0,
    습득: 0,
    수치심: 0,
    고통: 0,
    공포: 0,
    반감: 0,
    불쾌: 0,
    억울: 0,
  };

  // 카테고리별 기본 값
  switch (category) {
    case '애무':
      source.쾌C = 20 + (abilities['C감각'] || 0) * 300;
      source.쾌B = 15 + (abilities['B감각'] || 0) * 30;
      source.욕정 = 60;
      source.윤활 = 60;
      break;

    case '도구':
      source.쾌C = 50 + (abilities['C감각'] || 0) * 400;
      source.욕정 = 100;
      source.윤활 = 80;
      break;

    case '삽입':
      source.쾌V = 50 + (abilities['V감각'] || 0) * 500;
      source.쾌C = 30 + (abilities['C감각'] || 0) * 200;
      source.윤활 = 100;
      source.욕정 = 100;
      source.굴종 = 20;
      break;

    case '봉사':
      source.굴종 = 30;
      source.욕정 = 80;
      source.습득 = 50;
      break;

    case 'SM':
      source.고통 = 300;
      source.공포 = 100;
      source.수치심 = 200;
      source.굴복 = 50;
      break;

    case '조수':
      source.쾌C = 40;
      source.쾌V = 60;
      source.욕정 = 120;
      source.습득 = 80;
      break;

    case '고급':
      source.쾌C = 100;
      source.쾌V = 150;
      source.고통 = 200;
      source.수치심 = 300;
      break;

    case '특수':
      source.굴종 = 10;
      source.수치심 = 50;
      break;
  }

  return source;
};

// 커맨드 생성
export function generateAllCommands(): Record<number, CommandPlugin> {
  const commands: Record<number, CommandPlugin> = {};

  commandData.commands.forEach((data) => {
    const cmd: CommandPlugin = {
      id: data.id,
      name: data.name,
      category: data.category as any,
      staminaCost: data.staminaCost,

      // availability.ts에서 정의된 가용성 함수 사용
      isAvailable: getAvailabilityFunc(data.id),

      calculateSource: (context: TrainingContext) =>
        calculateBasicSource(context, data.category),

      generateMessage: (context: TrainingContext) =>
        `${data.name}을(를) 실행했습니다.`,
    };

    commands[data.id] = cmd;
  });

  return commands;
}
