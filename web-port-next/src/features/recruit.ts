import { getRecruitListingDefinition } from '../catalog/lookup';
import { recruitBuyEventDefinitions, type RecruitBuyEventDefinition } from '../catalog/recruitBuyEvents';
import { recruitManualsByListingId } from '../catalog/recruitManuals';
import { recruitAdvertisementMaxCount, recruitAdvertisementTemplateId } from '../catalog/recruitListingIds';
import type { CatalogId, GameDefinitions, RecruitListingDefinition } from '../catalog/types';
import type { CharacterBodyState } from '../domains/body/types';
import type { CharacterEquipmentState } from '../domains/equipment/types';
import type { CharacterState } from '../domains/people/types';
import type { RecruitInterviewDraft, RecruitSessionState } from '../domains/recruit/types';
import type { GameSession, GameState } from '../game/state';
import type { RecruitInterviewView, RecruitListingView, RecruitManualView, RecruitView } from '../game/views';
import {
  characterIdForTemplate,
  createCharacterBundleFromSpecs,
  getCharacterTemplate,
  type CharacterCreationBundle,
} from './characterCreation';

export const DEFAULT_RECRUIT_ROSTER_LIMIT = 10;

const bodyBaseStatIds = new Set(['0', '1', '7', '8', '9', '11', '12', '13', '20', '21', '22', '23', '24', '30', '32', '33', '34', '35', '50', '60', '61']);
const bodyMaxBaseStatIds = new Set(['0', '1', '11', '12']);
const clothingFlagIds = new Set(['40', '41', '42', '43', '44', '45', '46', '48', '49', '170', '171', '173', '174', '175', '176', '177', '600', '601', '603']);
const recruitAdvertisementFlagId = '1050';
const recruitAdvertisementPrice = 300;
const recruitListingFlagPrefix = 'recruitListingFlag_';
const recruitListingPageSize = 60;
const recruitListingMaxPageIndex = 3;

export type RecruitFailure = {
  readonly code: string;
  readonly message: string;
};

export type RecruitUpdateResult =
  | {
      readonly ok: true;
      readonly state: GameState;
      readonly session: GameSession;
      readonly message: string;
      readonly eventLines?: readonly string[];
    }
  | {
      readonly ok: false;
      readonly failure: RecruitFailure;
    };

type DeterministicRng = {
  readonly next: (maxExclusive: number) => number;
};

export const recruitInterviewFamilyNameJapan = [
  '사토',
  '스즈키',
  '타카하시',
  '타나카',
  '와타나베',
  '이토',
  '야마모토',
  '나카무라',
  '코바야시',
  '사이토',
  '카토',
  '요시다',
  '야마다',
  '야마구치',
  '마츠모토',
  '이노우에',
  '키무라',
  '하야시',
  '야마자키',
  '나카시마',
  '이케다',
  '아베',
  '하시모토',
  '야마시타',
  '모리',
  '이시카와',
  '마에다',
  '오가와',
  '후지타',
  '오카다',
  '이시이',
  '무라카미',
  '콘도',
  '사카모토',
  '엔도',
  '아오키',
  '후지이',
  '니시무라',
  '후쿠다',
  '타다',
  '미우라',
  '후지와라',
  '오카모토',
  '마츠다',
  '나카가와',
  '나카노',
  '하라다',
  '오노',
  '타무라',
  '타케우치',
  '카네코',
  '와다',
  '나카야마',
  '이시다',
  '우에다',
  '모리타',
  '코지마',
  '시바타',
  '하라',
  '미야자카',
  '사카이',
  '쿠도',
  '요코야마',
  '미야모토',
  '우치다',
  '타카기',
  '안도',
  '시마다',
  '타니구치',
  '오노',
  '타카다',
  '마루야마',
  '이마이',
  '코노',
  '후지모토',
  '무라다',
  '타케다',
  '우에노',
  '스기야마',
  '마스다',
  '코야마',
  '오오츠카',
  '히라노',
  '스가와라',
  '쿠보',
  '마츠이',
  '치바',
  '이와자키',
  '키노시타',
  '노구치',
  '마츠오',
  '키구치',
  '노무라',
  '아라이',
  '와타나베',
  '사노',
  '스기모토',
  '오니시',
  '후루카와',
  '하마다',
] as const;

export const recruitInterviewFemaleGivenNameJapan = [
  '아이',
  '아오이',
  '아카네',
  '아카리',
  '아키코',
  '아스카',
  '아미',
  '이쿠코',
  '이요',
  '에이코',
  '에미',
  '카에데',
  '카오리',
  '카스미',
  '키쿠',
  '키미코',
  '쿄코',
  '쿠미',
  '케이코',
  '코즈에',
  '코토네',
  '코유키',
  '아야카',
  '사에코',
  '사오리',
  '사키',
  '사치코',
  '사토미',
  '사야카',
  '시오리',
  '시즈카',
  '시노부',
  '준코',
  '쇼코',
  '스즈네',
  '세이코',
  '세리카',
  '소노코',
  '타에코',
  '타마미',
  '타미코',
  '치아키',
  '치에코',
  '츠키요',
  '츠바키',
  '테츠코',
  '테루미',
  '토우코',
  '토키코',
  '토시코',
  '토모에',
  '토모코',
  '토모미',
  '나오코',
  '나나코',
  '나츠키',
  '나루미',
  '니이나',
  '네이코',
  '네네',
  '노조미',
  '노리코',
  '하즈키',
  '하츠미',
  '하나코',
  '히카리',
  '히사코',
  '히데미',
  '하루나',
  '히로코',
  '히로미',
  '후지코',
  '후미코',
  '호노카',
  '마이',
  '마오',
  '마리코',
  '마사미',
  '마나카',
  '마미',
  '마유미',
  '마리에',
  '미카',
  '미키코',
  '미사키',
  '미즈키',
  '미츠키',
  '미도리',
  '무츠미',
  '메구미',
  '모모에',
  '야에코',
  '야스코',
  '유이',
  '유키',
  '유코',
  '유마',
  '유리코',
  '요코',
  '란',
  '리코',
  '리츠코',
  '리나',
  '료코',
  '루미',
  '루리',
  '레이코',
  '레오나',
  '와카코',
  '와카바',
] as const;

function createDeterministicRng(seedText: string): DeterministicRng {
  let seed = 0x811c9dc5;
  for (let index = 0; index < seedText.length; index += 1) {
    seed ^= seedText.charCodeAt(index);
    seed = Math.imul(seed, 0x01000193) >>> 0;
  }

  return {
    next(maxExclusive: number): number {
      if (maxExclusive <= 0) return 0;
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed % maxExclusive;
    },
  };
}

function numericFlag(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clampRecruitPageIndex(pageIndex: number): number {
  return Math.max(0, Math.min(recruitListingMaxPageIndex, Math.trunc(pageIndex)));
}

function recruitPageIndexForSession(session: GameSession): number {
  return clampRecruitPageIndex(numericFlag(session.recruit.commandFlags['100'], session.recruit.pageIndex));
}

function recruitListingIdsForPage(listingIds: readonly CatalogId[], pageIndex: number): readonly CatalogId[] {
  const start = clampRecruitPageIndex(pageIndex) * recruitListingPageSize;
  return listingIds.slice(start, start + recruitListingPageSize);
}

function eraDiv(value: number, divisor: number): number {
  return Math.trunc(value / divisor);
}

function eraRoundUpByRemainder(value: number, divisor: number, threshold: number): number {
  const base = eraDiv(value, divisor);
  return value % divisor >= threshold ? base + 1 : base;
}

function recruitItemId(listing: RecruitListingDefinition): string {
  return listing.id.split(':')[1] ?? listing.id;
}

function recruitListingFlagKey(listing: RecruitListingDefinition): string {
  const itemId = Number(recruitItemId(listing));
  return `${recruitListingFlagPrefix}${Number.isFinite(itemId) ? itemId + 900 : listing.id}`;
}

function legacyRecruitListingFlagId(listing: RecruitListingDefinition): string | undefined {
  const itemId = Number(recruitItemId(listing));
  return Number.isFinite(itemId) ? String(itemId + 900) : undefined;
}

function explicitRecruitListingFlag(state: GameState, listing: RecruitListingDefinition): number | undefined {
  const value = state.run.runFlags[recruitListingFlagKey(listing)] ?? state.run.runFlags[legacyRecruitListingFlagId(listing) ?? ''];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function setRecordValue(source: Record<string, number>, key: string, value: number): Record<string, number> {
  return {
    ...source,
    [key]: value,
  };
}

function setFlexibleRecordValue<T extends boolean | number | string>(
  source: Record<string, T>,
  key: string,
  value: T,
): Record<string, T> {
  return {
    ...source,
    [key]: value,
  };
}

function isUnlockedOrDefault(state: GameState, listing: RecruitListingDefinition): boolean {
  if (state.shop.progress.hiddenListingIds.includes(listing.id)) return false;
  if (state.shop.progress.unlockedListingIds.includes(listing.id)) return true;
  return listing.defaultAvailable;
}

function recruitRosterLimit(state: GameState): number {
  const value = state.run.runFlags['23'] ?? state.run.runFlags.recruitRosterLimit;
  return typeof value === 'number' && Number.isFinite(value) ? value : DEFAULT_RECRUIT_ROSTER_LIMIT;
}

function recruitTemplateCount(state: GameState, templateId: CatalogId): number {
  return Object.values(state.people.characters).filter((character) => character.identity.templateId === templateId).length;
}

function maxRecruitCount(listing: RecruitListingDefinition): number {
  if (listing.maxRecruitCount !== undefined) return listing.maxRecruitCount;
  return listing.repeatable ? recruitAdvertisementMaxCount : 1;
}

function isRepeatableRecruitListing(listing: RecruitListingDefinition): boolean {
  return listing.repeatable === true || listing.characterTemplateId === recruitAdvertisementTemplateId;
}

function hasRemainingRecruitCount(state: GameState, listing: RecruitListingDefinition): boolean {
  if (!listing.characterTemplateId) return false;
  const explicitFlag = explicitRecruitListingFlag(state, listing);
  if (explicitFlag !== undefined && explicitFlag <= 0) return false;
  return recruitTemplateCount(state, listing.characterTemplateId) < maxRecruitCount(listing);
}

function recruitCharacterId(listing: RecruitListingDefinition, state: GameState): string | undefined {
  if (!listing.characterTemplateId) return undefined;
  if (!isRepeatableRecruitListing(listing)) return characterIdForTemplate(listing.characterTemplateId);
  return `${characterIdForTemplate(listing.characterTemplateId)}:${recruitTemplateCount(state, listing.characterTemplateId) + 1}`;
}

function transformHairStyle(rawStyle: number, age: number): number {
  const thresholds =
    age <= 15
      ? [10, 28, 43, 58, 68, 78, 83, 93, 98]
      : age <= 18
        ? [10, 25, 40, 50, 55, 73, 78, 88, 98]
        : age <= 22
          ? [10, 25, 40, 45, 47, 62, 68, 83, 98]
          : [10, 25, 35, 38, 39, 59, 68, 83, 98];

  const style = thresholds.findIndex((threshold) => rawStyle <= threshold);
  return style >= 0 ? style : 9;
}

type RecruitInterviewGender = 0 | 1 | 2;

function recruitInterviewGenderFromInput(value: number | undefined): RecruitInterviewGender | undefined {
  if (value === undefined || value === 0) return 0;
  if (value === 1) return 1;
  if (value === 2) return 2;
  return undefined;
}

function createRecruitInterviewFlags(
  listing: RecruitListingDefinition,
  state: GameState,
  instanceIndex: number,
  rerollIndex: number,
  gender: RecruitInterviewGender,
): Record<string, number> {
  const rng = createDeterministicRng(`${state.run.rngSeed ?? 'm31'}:${listing.id}:${instanceIndex}:${rerollIndex}:${Object.keys(state.people.characters).length}`);
  const age = 8 + rng.next(13) + rng.next(13);
  const month = rng.next(11) + 1;
  const day = month === 2 ? rng.next(28) + 1 : [4, 6, 9, 11].includes(month) ? rng.next(29) + 1 : rng.next(30) + 1;
  const bloodType = rng.next(3) + 1;
  const occupation = age <= 15 ? 0 : rng.next(9) + 1;
  const hairColor = rng.next(21);
  const rawHairStyle = rng.next(100);
  let breastRoll = 0;
  if (gender === 0) {
    breastRoll = rng.next(51) + rng.next(51);
  } else if (gender === 2 && rng.next(3) === 0) {
    breastRoll = Math.max(0, rng.next(101) - rng.next(101));
  }
  const breastSize = breastRoll <= 4 ? 1 : breastRoll <= 19 ? 2 : breastRoll >= 95 ? 4 : breastRoll >= 70 ? 3 : 0;
  const partnerState = rng.next(10);
  const ntrLimit = 100 + rng.next(100);
  const firstKissRoll = rng.next(100);
  let firstKiss = firstKissRoll < age * 2 ? 1 : 0;
  if (firstKiss === 0 && occupation === 7) rng.next(10);
  const sexRoll = rng.next(100);
  const sexExperienced = (partnerState >= 2 && partnerState <= 7) || occupation === 7 ? (sexRoll < age * 3 ? 1 : 0) : sexRoll < age ? 1 : 0;
  const analRoll = rng.next(100);
  let analExperienced = 0;
  if ((partnerState >= 2 && partnerState <= 7) || occupation === 7) {
    analExperienced = analRoll < age || (gender === 2 && analRoll >= age * 3) ? 1 : 0;
  } else {
    analExperienced = analRoll < age / 4 ? 1 : 0;
  }
  const personality = rng.next(19);
  const pubicHair = gender < 16 && gender >= rng.next(7) + 9 ? 1 : rng.next(20);
  const maidenTrait = gender === 1 ? 20 + rng.next(11) : 23 + rng.next(15);
  const painRoll = rng.next(100);
  const painTrait = painRoll <= 4 ? 40 : painRoll >= 95 ? 41 : 0;
  const wetnessRoll = rng.next(100);
  const wetnessTrait = wetnessRoll <= 4 ? 42 : wetnessRoll >= 95 ? 43 : 0;
  const frameRoll = rng.next(100);
  const frameTrait = frameRoll <= 4 ? 99 : frameRoll >= 95 ? 100 : 0;
  const bodyShape = rng.next(6) - rng.next(6);
  const requestedFee = (rng.next(10) + 1) * 100;

  return {
    '400': gender,
    '401': age,
    '402': month,
    '403': day,
    '404': bloodType,
    '405': occupation,
    '406': hairColor,
    '407': transformHairStyle(rawHairStyle, age),
    '408': breastSize,
    '409': partnerState,
    '410': ntrLimit,
    '411': firstKiss,
    '412': sexExperienced,
    '413': analExperienced,
    '414': personality,
    '415': pubicHair,
    '416': maidenTrait,
    '417': painTrait,
    '418': wetnessTrait,
    '419': frameTrait,
    '420': requestedFee,
    '421': bodyShape,
  };
}

function createRecruitInterviewName(state: GameState, instanceIndex: number, rerollIndex: number): { readonly familyName: string; readonly givenName: string } {
  const rng = createDeterministicRng(`${state.run.rngSeed ?? 'm31'}:interview-name:${instanceIndex}:${rerollIndex}`);
  return {
    familyName: recruitInterviewFamilyNameJapan[rng.next(100)] ?? '사토',
    givenName: recruitInterviewFemaleGivenNameJapan[rng.next(110)] ?? '아이',
  };
}

function createRecruitInterviewDraft(
  listing: RecruitListingDefinition,
  state: GameState,
  rerollIndex = 0,
  gender: RecruitInterviewGender = 0,
): RecruitInterviewDraft | undefined {
  if (!listing.characterTemplateId || !isRepeatableRecruitListing(listing)) return undefined;

  const instanceIndex = recruitTemplateCount(state, listing.characterTemplateId) + 1;
  const commandFlags = createRecruitInterviewFlags(listing, state, instanceIndex, rerollIndex, gender);
  const name = createRecruitInterviewName(state, instanceIndex, rerollIndex);
  const scratchTexts = {
    '50': name.familyName,
    '51': name.givenName,
  };
  const displayName = `${scratchTexts['50']} ${scratchTexts['51']}`;

  return {
    sourceListingId: listing.id,
    templateId: listing.characterTemplateId,
    instanceIndex,
    displayName,
    commandFlags: {
      ...commandFlags,
      '430': 1500,
      '431': 1500,
      recruitInterviewRerollCount: rerollIndex,
    },
    scratchTexts,
  };
}

function commandFlagsForSession(session: GameSession, draft?: RecruitInterviewDraft): Record<string, number> {
  return {
    ...session.recruit.commandFlags,
    '100': recruitPageIndexForSession(session),
    ...(draft?.commandFlags ?? {}),
  };
}

function scratchTextsForSession(session: GameSession, draft?: RecruitInterviewDraft): Record<string, string> {
  return {
    ...session.recruit.scratchTexts,
    ...(draft?.scratchTexts ?? {}),
  };
}

function masterCharacter(state: GameState): CharacterState | undefined {
  return state.people.characters['character:0'] ?? state.people.characters['0'];
}

function masterCallName(state: GameState): string {
  const master = masterCharacter(state);
  return master?.identity.callName ?? master?.identity.displayName ?? 'MASTER';
}

function targetAndParticle(name: string): string {
  return `${name}${hasHangulFinalConsonant(name) ? '과' : '와'}`;
}

function formatRecruitBuyEventLine(line: string, state: GameState): string {
  const masterName = masterCallName(state);
  return line
    .replaceAll('%플레이어는()%', `${masterName}는`)
    .replaceAll('%플레이어가()%', `${masterName}가`)
    .replaceAll('%CALLNAME:MASTER%', masterName);
}

function matchesRecruitBuyEventCondition(event: RecruitBuyEventDefinition, state: GameState): boolean {
  if (event.condition === 'always') return true;

  const masterNo = masterCharacter(state)?.identity.templateId;
  if (event.condition === 'master-no-0') return masterNo === '0';

  const isOpeningTime = state.run.clock.day === 0 && state.run.clock.currentTimeSlot === 0;
  if (event.condition === 'kanade-opening') return masterNo === '0' && isOpeningTime;
  if (event.condition === 'kanade-default') return masterNo === '0' && !isOpeningTime;

  return false;
}

function recruitBuyEventLinesForPurchase(state: GameState, listing: RecruitListingDefinition): readonly string[] {
  const templateId = listing.characterTemplateId;
  if (!templateId) return [];

  const event = recruitBuyEventDefinitions.find(
    (candidate) => candidate.targetTemplateId === templateId && matchesRecruitBuyEventCondition(candidate, state),
  );
  return event ? event.lines.map((line) => formatRecruitBuyEventLine(line, state)) : [];
}

function interviewAgeAppearance(age: number): string {
  if (age <= 14) return '너무 어려보이고 ';
  if (age <= 18) return '어린티가 남아있고 ';
  return '성숙해보이고 ';
}

function interviewBodyShapeLabel(shapeRank: number): string {
  if (shapeRank <= -5) return '걱정될 정도로 가는 ';
  if (shapeRank <= -3) return '살이 너무 빠진 ';
  if (shapeRank === -2) return '가냘픈 ';
  if (shapeRank === -1) return '날씬한 ';
  if (shapeRank < 2) return '';
  if (shapeRank === 2) return '약간 통통한 ';
  if (shapeRank === 3) return '통통한 ';
  if (shapeRank <= 5) return '살집있는 ';
  return '비만이 걱정되는 ';
}

function interviewFrameLabel(frameTrait: number): string {
  if (frameTrait === 99) return '큰 ';
  if (frameTrait === 100) return '작은 ';
  return '';
}

function interviewGenderSubject(gender: number, age: number): string {
  if (gender === 0 && age <= 14) return '소녀가';
  if (gender === 0) return '여자가';
  if (gender === 1 && age <= 14) return '소년이';
  if (gender === 1) return '남자가';
  return '낭자애가';
}

function interviewHairColorLabel(hairColor: number): string {
  if (hairColor === 0 || hairColor === 11) return '검은 ';
  if (hairColor === 1 || hairColor === 12) return '짙은 ';
  if (hairColor === 2 || hairColor === 13) return '금빛 ';
  if (hairColor === 3 || hairColor === 14) return '은빛 ';
  if (hairColor === 4 || hairColor === 15) return '붉은 ';
  if (hairColor === 5 || hairColor === 16) return '푸른 ';
  if (hairColor === 6 || hairColor === 17) return '녹색 ';
  if (hairColor === 7 || hairColor === 18) return '핑크빛 ';
  if (hairColor === 8 || hairColor === 19) return '보라빛 ';
  if (hairColor === 9) return '하얀 ';
  if (hairColor === 10 || hairColor === 21) return '갈색 ';
  if (hairColor === 20) return '탈색한 ';
  return '';
}

function interviewHairStyleLabel(hairStyle: number): string {
  if (hairStyle === 0) return '쇼트로 ';
  if (hairStyle === 1) return '세미 롱으로 ';
  if (hairStyle === 2) return '보브로 ';
  if (hairStyle === 3) return '포니테일로 ';
  if (hairStyle === 4) return '트윈테일로 ';
  if (hairStyle === 5) return '스트레이트 롱으로 ';
  if (hairStyle === 6) return '올림머리로 ';
  if (hairStyle === 7) return '풍성한 파마로 ';
  if (hairStyle === 8) return '롱 웨이브로 ';
  if (hairStyle === 9 || hairStyle === 99) return '승천 페가서스MIX 올림으로 ';
  return '';
}

function interviewBreastLine(gender: number, breastSize: number): string | undefined {
  if (gender === 0 && breastSize > 0) {
    if (breastSize === 1) return '가슴에 눈길을 주니 완전히 납작하지만, 수요는 있을지 모른다.';
    if (breastSize === 2) return '가슴에 눈길을 주니 겸손하게 부풀어 있었다.';
    if (breastSize === 3) return '가슴에 눈길을 주니 옷 너머로도 알 수 있는 풍요함이 있었다.';
    if (breastSize === 4) return '가슴에 눈길을 주니 지금이라도 옷에서 삐져나올 것만 같았다.';
  }
  if (gender === 2 && breastSize !== 0) {
    if (breastSize === 1) return '자신도 모르게 눈길이 간 가슴은 약간 부푼 느낌이 든다. 그럴리가 없는데…';
    if (breastSize === 2) return '자신도 모르게 눈길이 간 가슴은 살짝 부풀어 오른게 보인다. 저건 가짜일까?';
    if (breastSize === 3) return '자신도 모르게 눈길이 간 가슴은 이상하게도 옷 너머로도 알 수 있을만큼 부풀어있다.';
    if (breastSize === 4) return '자신도 모르게 눈길이 간 가슴은 성별이 의심될 정도로 위대했다.';
  }
  return undefined;
}

function interviewOccupationLabel(gender: number, age: number, occupation: number): string {
  if (occupation === 0 && age <= 12) return '초●학생이';
  if (occupation === 0 && age <= 15) return '중●생이';
  if (occupation === 1) return '간호사';
  if (occupation === 2) return '교사';
  if (occupation === 3) return gender === 1 ? '집사' : '메이드';
  if (occupation === 4) return '성우';
  if (occupation === 5) {
    if (gender === 0) return '업소여성이';
    if (gender === 1) return '업소남성이';
    return '업소여성(♂)이';
  }
  if (occupation === 6) return '아이돌이';
  if (occupation === 7) return '주부';
  if (occupation === 8) return '패션모델이';
  if (occupation === 9) return '아르바이트';
  return '무직이';
}

function interviewRelationshipLines(occupationLine: string, occupation: number, partnerState: number): readonly string[] {
  let line = occupationLine;
  if (partnerState <= 1) return [`${line}라고 한다.`];
  line += '고 ';
  if (partnerState >= 2 && partnerState < 7) line += '어느 ';
  if (partnerState === 2) line += '고등학생과 ';
  else if (partnerState === 3) line += '중학생과 ';
  else if (partnerState === 4) line += '대학생과 ';
  else if (partnerState === 5) line += '회사원과 ';
  else if (partnerState === 6) line += '호스트와 ';
  else if (partnerState === 7) line += '누군가와 배덕적인 관계를 ';
  else {
    line += occupation === 7 ? '배우자가 아닌 이성과 ' : '이성과 ';
    return occupation === 7 ? [`${line}사귄 경험은 없다고 한다.`, '배우자 몰래 '] : [`${line}사귄 경험은 없다고 한다.`];
  }
  if (occupation === 7) line += '배우자 몰래 ';
  if (partnerState >= 2 && partnerState < 7) return [`${line}사귀고 있다고 한다.`];
  return [`${line}가지고 있다고 한다.`];
}

function hasHangulFinalConsonant(text: string): boolean {
  const last = Array.from(text.trim()).pop();
  if (!last) return false;
  const code = last.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function appendKoreanParticle(text: string, particle: '는' | '가'): string {
  if (particle === '는') return `${text}${hasHangulFinalConsonant(text) ? '은' : '는'}`;
  return `${text}${hasHangulFinalConsonant(text) ? '이' : '가'}`;
}

function interviewPersonalityLabel(personality: number): string {
  if (personality === 10) return '검쟁이인 ';
  if (personality === 11) return '건방진 ';
  if (personality === 12) return '다부진 ';
  if (personality === 13) return '솔직한 ';
  if (personality === 14) return '얌전한 ';
  if (personality === 15) return '프라이드가 높은 ';
  if (personality === 16) return '활발한 ';
  if (personality === 17) return '프라이드가 낮은 ';
  if (personality === 18) return '츤데레같은 ';
  return '평범한 ';
}

function interviewMaidenConcernLine(maidenTrait: number): string {
  if (maidenTrait === 30) return '정조관념이 강한 점을 신경쓰고 있다.';
  if (maidenTrait === 31) return '경박해 보이는 점을 신경쓰고 있다.';
  if (maidenTrait === 32) return '욕망을 억누르고 있는 점을 신경쓰고 있다.';
  if (maidenTrait === 33) return '성에 개방적인 점을 신경쓰고 있다.';
  if (maidenTrait === 34) return '면접을 보는것도 싫어하는 점을 신경쓰고 있다.';
  if (maidenTrait === 35) return '바로 얼굴이 빨개지는 점을 신경쓰고 있다.';
  if (maidenTrait === 36) return '노출도가 높은 의상인 점을 신경쓰고 있다.';
  return '벌벌 떨고 있는 점을 신경쓰고 있다.';
}

function interviewHistoryLine(firstKiss: number, sex: number, anal: number): string {
  if (firstKiss === 0 && sex === 0 && anal === 0) return '섹스는 물론이고 키스도 한적이 없다고 한다.';
  if (firstKiss === 0 && sex === 1 && anal === 0) return '섹스는 해봤어도 키스는 한적이 없다고 한다.';
  if (firstKiss === 0 && sex === 0 && anal === 1) return '애널로 한 경험이 있다고 한다……';
  if (firstKiss === 0 && sex === 1 && anal === 1) return '키스만 빼고 대부분 해봤다고 한다……';
  if (firstKiss === 1 && sex === 0 && anal === 0) return '키스는 해봤지만, 그 이상은 한적이 없다고 한다.';
  if (firstKiss === 1 && sex === 1 && anal === 0) return '연인과 섹스해본 적이 있다고 한다.';
  if (firstKiss === 1 && sex === 0 && anal === 1) return '앞쪽 정조는 지켜왔다고 한다……';
  return '키스와 섹스는 물론 애널경험도 있다고 한다.';
}

function recruitSpeakerWithAbility(state: GameState, minimumAbility: number): CharacterState | undefined {
  return Object.values(state.people.characters).find((character) => (character.attributes.abilities['15'] ?? 0) >= minimumAbility);
}

function recruitSpeakerCallName(character: CharacterState): string {
  return character.identity.callName ?? character.identity.displayName;
}

function buildRecruitInterviewDescription(state: GameState, draft: RecruitInterviewDraft): readonly string[] {
  const flags = draft.commandFlags;
  const gender = flags['400'] ?? 0;
  const age = flags['401'] ?? 18;
  const occupation = flags['405'] ?? 0;
  const breastSize = flags['408'] ?? 0;
  const partnerState = flags['409'] ?? 0;
  const lines: string[] = [
    `약속했던 카페에 ${interviewAgeAppearance(age)}${interviewBodyShapeLabel(flags['421'] ?? 0)}${interviewFrameLabel(flags['419'] ?? 0)}${interviewGenderSubject(gender, age)} 찾아왔다.`,
    `${interviewHairColorLabel(flags['406'] ?? 0)}머리를 ${interviewHairStyleLabel(flags['407'] ?? 0)}하고 있다.`,
  ];
  const breastLine = interviewBreastLine(gender, breastSize);
  if (breastLine) lines.push(breastLine);
  lines.push(...interviewRelationshipLines(`직업은 ${interviewOccupationLabel(gender, age, occupation)}`, occupation, partnerState));
  lines.push(`AV데뷔를 한다면 출연료로 ${flags['420'] ?? recruitAdvertisementPrice}를 요구했다.`);

  const personalitySpeaker = recruitSpeakerWithAbility(state, 1);
  if (personalitySpeaker) {
    const speaker = recruitSpeakerCallName(personalitySpeaker);
    const personalityPrefix = `${appendKoreanParticle(speaker, '는')} 상대의 ${interviewPersonalityLabel(flags['414'] ?? 0)}`;
    if ((flags['416'] ?? 0) >= 30) lines.push(`${personalityPrefix}성격과 ${interviewMaidenConcernLine(flags['416'] ?? 0)}`);
    else lines.push(`${personalityPrefix}점을 신경쓰고 있다.`);
  }

  const detailSpeaker = recruitSpeakerWithAbility(state, 3);
  if (detailSpeaker) {
    const speaker = recruitSpeakerCallName(detailSpeaker);
    lines.push(`말을 잘하는 ${appendKoreanParticle(speaker, '가')} 긴장을 풀어주고 이야기를 자세하게 들어보니 ${interviewHistoryLine(flags['411'] ?? 0, flags['412'] ?? 0, flags['413'] ?? 0)}`);
    const pubicHair = flags['415'] ?? 0;
    if (pubicHair <= 1) lines.push('아래쪽 털은 영구제모 했다고 한다.');
    else if (pubicHair <= 5) lines.push('아래쪽에 털이 없는게 컴플렉스라고 한다.');
    else if (pubicHair <= 7) lines.push('음모를 정리해본 적이 없다고 한다……');
    if ((flags['417'] ?? 0) === 40) lines.push('아픈 건 못 견딘다고 한다.');
    else if ((flags['417'] ?? 0) === 41) lines.push('아파도 참을 줄 안다고 한다.');
    if ((flags['418'] ?? 0) === 42) lines.push('금방 젖어버리는 체질이라고 한다.');
    else if ((flags['418'] ?? 0) === 43) lines.push('잘 젖지 않는 체질이라고 한다.');
  }

  return lines;
}

function buildRecruitInterviewView(state: GameState, draft: RecruitInterviewDraft, price: number): RecruitInterviewView {
  return {
    candidateName: draft.displayName,
    promptLines: ['이번 면접 상대는……', '[0] - 여자'],
    descriptionLines: buildRecruitInterviewDescription(state, draft),
    contractPrompt: `${price}P로 계약합니까?`,
    confirmLabel: '[0] - 네',
    rejectLabel: '[1] - 아니오',
    rerollLabel: '[8] - 다음 사람',
  };
}

function recruitManualViewForListing(listingId: CatalogId): RecruitManualView | undefined {
  const manual = recruitManualsByListingId[listingId];
  if (!manual) return undefined;
  return {
    candidateNumber: manual.candidateNumber,
    itemId: manual.itemId,
    sourceLineStart: manual.sourceLineStart,
    sourceLineEnd: manual.sourceLineEnd,
    lines: manual.lines,
    hints: manual.hints,
    resultItemId: manual.resultItemId,
    styleColor: manual.styleColor,
    fontName: manual.fontName,
  };
}

function baseStatFromBundle(
  character: CharacterState,
  body: CharacterBodyState,
  statId: string,
  fallback = 0,
): number {
  return character.attributes.baseStats.current[statId] ?? body.bodyStats[statId] ?? body.baseStats[statId] ?? fallback;
}

function setBaseStat(
  character: CharacterState,
  body: CharacterBodyState,
  statId: string,
  value: number,
): { readonly character: CharacterState; readonly body: CharacterBodyState } {
  if (bodyBaseStatIds.has(statId)) {
    return {
      character,
      body: {
        ...body,
        baseStats: setRecordValue(body.baseStats, statId, value),
        bodyStats: setRecordValue(body.bodyStats, statId, value),
        maxBaseStats: bodyMaxBaseStatIds.has(statId) ? setRecordValue(body.maxBaseStats, statId, value) : body.maxBaseStats,
      },
    };
  }

  return {
    character: {
      ...character,
      attributes: {
        ...character.attributes,
        baseStats: {
          current: setRecordValue(character.attributes.baseStats.current, statId, value),
          maximum: setRecordValue(character.attributes.baseStats.maximum, statId, value),
        },
      },
    },
    body,
  };
}

function addTrait(character: CharacterState, traitId: string): CharacterState {
  return {
    ...character,
    attributes: {
      ...character.attributes,
      traits: {
        ...character.attributes.traits,
        [traitId]: true,
      },
    },
  };
}

function addExperience(character: CharacterState, experienceId: string, amount: number): CharacterState {
  return {
    ...character,
    attributes: {
      ...character.attributes,
      experiences: {
        ...character.attributes.experiences,
        [experienceId]: (character.attributes.experiences[experienceId] ?? 0) + amount,
      },
    },
  };
}

function setExperience(character: CharacterState, experienceId: string, value: number): CharacterState {
  return {
    ...character,
    attributes: {
      ...character.attributes,
      experiences: {
        ...character.attributes.experiences,
        [experienceId]: value,
      },
    },
  };
}

function setProfileText(character: CharacterState, textId: string, value: string): CharacterState {
  return {
    ...character,
    identity: {
      ...character.identity,
      profileTextSlots: {
        ...character.identity.profileTextSlots,
        [textId]: value,
      },
    },
  };
}

function setBodyConditionFlag(
  body: CharacterBodyState,
  flagId: string,
  value: boolean | number | string,
): CharacterBodyState {
  return {
    ...body,
    conditionFlags: setFlexibleRecordValue(body.conditionFlags, flagId, value),
  };
}

function setEquipmentFlag(
  equipment: CharacterEquipmentState,
  flagId: string,
  value: boolean | number | string,
): CharacterEquipmentState {
  return {
    ...equipment,
    availabilityFlags: setFlexibleRecordValue(equipment.availabilityFlags, flagId, value),
    clothing: clothingFlagIds.has(flagId) ? setFlexibleRecordValue(equipment.clothing, flagId, value) : equipment.clothing,
  };
}

function applyDefaultClothingFlags(equipment: CharacterEquipmentState, character: CharacterState): CharacterEquipmentState {
  const outerwear = Number(equipment.clothing['41'] ?? equipment.availabilityFlags['41'] ?? 0);
  const special = Number(equipment.clothing['42'] ?? equipment.availabilityFlags['42'] ?? 0);
  if (outerwear === 0 && special === 0) return equipment;

  let clothingState = 0;
  if (outerwear !== 0) {
    const flatChest = character.attributes.traits['116'] === true;
    const immature = character.attributes.traits['135'] === true;
    const childish = character.attributes.traits['132'] === true;
    const smallBreast = character.attributes.traits['109'] === true;
    clothingState |= 1;
    if (!flatChest && !immature && (!childish || !smallBreast)) clothingState |= 2;
    if (outerwear === 202 || outerwear === 254) clothingState &= ~2;
    if ((outerwear >= 191 && outerwear <= 200) || (outerwear >= 241 && outerwear <= 250) || (outerwear >= 291 && outerwear <= 300)) {
      clothingState &= ~3;
    }
    if (outerwear === 29) clothingState &= ~3;
    if (special === 69) clothingState &= ~1;

    if (outerwear >= 1 && outerwear <= 100) clothingState |= 4 | 8;
    else if (outerwear >= 101 && outerwear <= 200) clothingState |= 4 | 16;
    else if (outerwear >= 201 && outerwear <= 250) clothingState |= 4 | 8;
    else if (outerwear >= 251 && outerwear <= 300) clothingState |= 4 | 16;
    if (outerwear === 192) clothingState = 16;
  }
  if (special !== 0) clothingState |= 64;

  return setEquipmentFlag(equipment, '40', clothingState);
}

function applyDifficultyLifeAdjustment(character: CharacterState, body: CharacterBodyState, state: GameState) {
  const modeId = state.run.runFlags.modeId;
  const currentLife = baseStatFromBundle(character, body, '10', 0);
  if (modeId === 'easy') return setBaseStat(character, body, '10', 0);
  if (modeId === 'normal' || modeId === 'extra') return setBaseStat(character, body, '10', currentLife * 2);
  return { character, body };
}

function applyPubicHairDefault(
  character: CharacterState,
  body: CharacterBodyState,
  listing: RecruitListingDefinition,
  state: GameState,
): CharacterBodyState {
  if (state.run.runFlags.pubicHairSystemEnabled === false) return body;
  const age = baseStatFromBundle(character, body, '9', 0);
  const templateId = listing.characterTemplateId;
  if (templateId === '1') return setBodyConditionFlag(body, '6', 14);
  if (templateId === '11') return setBodyConditionFlag(body, '6', 18);
  if (templateId === '9' || templateId === '18') return setBodyConditionFlag(body, '6', 1);
  if (templateId === '2') return setBodyConditionFlag(body, '6', 7);
  if (character.attributes.traits['125']) return setBodyConditionFlag(body, '6', -1);
  if (age <= 15 && templateId !== '5') return setBodyConditionFlag(body, '6', 6);
  return setBodyConditionFlag(body, '6', 12);
}

function setDefaultGenitalCall(character: CharacterState): CharacterState {
  if (character.attributes.traits['432'] === true) {
    return setProfileText(setProfileText(setProfileText(character, '80', '자지'), '81', '보지'), '82', '애널');
  }
  if (character.attributes.traits['76'] === true) {
    return setProfileText(setProfileText(setProfileText(character, '80', '자지'), '81', '보지'), '82', '엉덩이');
  }
  if (character.attributes.traits['23'] === true) {
    return setProfileText(setProfileText(setProfileText(character, '80', '고추'), '81', '거기'), '82', '엉덩이');
  }
  if (character.attributes.traits['408'] === true) {
    return setProfileText(setProfileText(setProfileText(character, '80', '페니스'), '81', '질'), '82', '애널');
  }
  return setProfileText(setProfileText(setProfileText(character, '80', '거시기'), '81', '그곳'), '82', '엉덩이구멍');
}

function applyBeautyCalculation(character: CharacterState, body: CharacterBodyState) {
  let beauty = baseStatFromBundle(character, body, '31', 0);
  const traits = character.attributes.traits;
  const conditionFlags = body.conditionFlags;
  if (traits['0'] !== true) beauty -= 10;
  else if (traits['2'] !== true) beauty -= 5;
  else if (traits['47'] === true) beauty -= 5;
  else if (traits['64'] === true) beauty -= 5;
  else if (traits['115'] === true) beauty -= 20;
  else if (traits['128'] === true) beauty -= 5;
  else if (traits['180'] === true) beauty -= 5;
  else if (traits['181'] === true) beauty -= 10;
  else if (traits['184'] === true) beauty -= 5;
  else if (traits['321'] === true) beauty -= 5;
  else if (traits['424'] === true) beauty -= 10;
  else if (conditionFlags['16'] === 1) beauty -= 5;
  return setBaseStat(character, body, '31', Math.max(0, beauty));
}

function applyOccupationInterviewState(character: CharacterState, body: CharacterBodyState, equipment: CharacterEquipmentState, flags: Record<string, number>) {
  let nextCharacter = character;
  let nextBody = body;
  let nextEquipment = equipment;
  const occupation = flags['405'] ?? 0;
  const age = flags['401'] ?? 0;
  let stamina = flags['430'] ?? 1500;
  let energy = flags['431'] ?? 1500;

  const setJob = (traitId: string, clothingId: number, specialClothingId = 0) => {
    nextCharacter = addTrait(nextCharacter, traitId);
    nextEquipment = setEquipmentFlag(nextEquipment, '41', clothingId);
    if (specialClothingId !== 0) nextEquipment = setEquipmentFlag(nextEquipment, '42', specialClothingId);
  };

  if (occupation === 0 && age <= 12) {
    setJob('222', 22);
    stamina -= 100;
    energy -= 100;
  } else if (occupation === 0 && age >= 13 && age <= 15) {
    setJob('221', 18);
  } else if (occupation === 1) {
    setJob('411', 24);
    stamina += 100;
  } else if (occupation === 2) {
    setJob('412', 21);
    energy += 100;
  } else if (occupation === 3) {
    setJob('417', 25);
  } else if (occupation === 4) {
    setJob('506', 1);
    stamina += 100;
  } else if (occupation === 5) {
    setJob('180', 203);
  } else if (occupation === 6) {
    setJob('203', 30);
    stamina += 100;
  } else if (occupation === 7) {
    setJob('206', 101, 1);
  } else if (occupation === 8) {
    setJob('402', 23);
  } else if (occupation === 9) {
    setJob('403', 140);
    stamina += 100;
  } else if (occupation === 10) {
    setJob('405', 103);
  }

  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '0', stamina));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '1', energy));
  return { character: nextCharacter, body: nextBody, equipment: nextEquipment };
}

function applyInterviewPhysicalState(character: CharacterState, body: CharacterBodyState, flags: Record<string, number>) {
  let nextCharacter = character;
  let nextBody = body;
  const age = flags['401'] ?? 18;
  const frameTrait = flags['419'] ?? 0;
  const bodyWeightRank = flags['421'] ?? 0;
  const breastSize = flags['408'] ?? 0;
  const gender = flags['400'] ?? 0;
  const rng = createDeterministicRng(`physical:${Object.entries(flags).join(':')}`);

  const averageHeight = (sex: number, years: number): number => {
    if (sex === 0) {
      if (years === 8) return 128;
      if (years === 9) return 133;
      if (years === 10) return 140;
      if (years === 11) return 147;
      if (years === 12) return 152;
      if (years === 13) return 133;
      if (years === 14) return 156;
      if (years === 15) return 157;
      return 158;
    }
    if (sex === 1) {
      if (years === 8) return 128;
      if (years === 9) return 133;
      if (years === 10) return 139;
      if (years === 11) return 145;
      if (years === 12) return 152;
      if (years === 13) return 159;
      if (years === 14) return 165;
      if (years === 15) return 168;
      if (years === 16) return 170;
      return 171;
    }
    if (years === 8) return 128;
    if (years === 9) return 133;
    if (years === 10) return 139;
    if (years === 11) return 145;
    if (years === 12) return 151;
    if (years === 13) return 156;
    if (years === 14) return 159;
    if (years === 15) return 161;
    return 162;
  };

  const heightSex = gender === 2 ? rng.next(3) : gender;
  let height = averageHeight(heightSex, age);
  let heightScale = 100 + rng.next(6) - rng.next(6);
  if (frameTrait === 99) {
    heightScale = 105 + rng.next(21);
  } else if (frameTrait === 100) {
    let smallFrameOffset = rng.next(11) - rng.next(11);
    if (smallFrameOffset > 0) smallFrameOffset = 0 - smallFrameOffset;
    heightScale = 95 + smallFrameOffset;
  }
  height = eraDiv(height * heightScale, 100);

  let fat = 0;
  if (gender === 0) {
    const ageFat = age > 16 ? 8 : age - 8;
    fat = 160 + ageFat * 12 + rng.next(121) - rng.next(121);
  } else if (gender === 1) {
    fat = 165 + rng.next(121) - rng.next(121);
  } else {
    const ageFat = age > 16 ? 16 : age - 8;
    fat = 160 + ageFat * 8;
  }
  if (bodyWeightRank === 0) {
    fat += rng.next(11);
    fat -= rng.next(11);
  } else if (bodyWeightRank > 0) {
    fat += bodyWeightRank * 20 + rng.next(20);
  } else if (bodyWeightRank < 0) {
    fat -= bodyWeightRank * 20 + rng.next(20);
  }

  let maturity = 85;
  let maturityHeightScale = 100;
  if (gender === 0 || gender === 2) {
    if (age < 10) {
      if (rng.next(20) === 0) {
        maturity = 10 + rng.next(51) - rng.next(51);
        if (maturity < 10) maturity = 10;
      } else {
        maturity = rng.next(11) - rng.next(11);
        if (maturity < 10) maturity = 10;
      }
      maturityHeightScale = 100;
    } else if (age > 10 && age < 16) {
      maturity = rng.next(10) === 0 ? 10 + (age - 10) : 10 + (age - 10) * 15;
      maturity += rng.next(31) - rng.next(31);
      if (maturity < 15) maturity = 15;
      maturityHeightScale = 100 + eraDiv(30 * (maturity - (10 + (age - 10) * 15)), 100);
    } else {
      maturity = rng.next(10) === 0 ? 15 : 85;
      maturity += rng.next(31) - rng.next(31);
      if (maturity < 15) maturity = 15;
      maturityHeightScale = 100 + eraDiv(30 * (maturity - 85), 100);
    }
  } else if (gender === 1) {
    if (age < 12) {
      maturity = rng.next(11) - rng.next(11);
      if (maturity < 10) maturity = 10;
      maturityHeightScale = 100;
    } else if (age > 12 && age < 17) {
      maturity = 10 + (age - 10) * 15 + rng.next(31) - rng.next(31);
      if (maturity < 15) maturity = 15;
      maturityHeightScale = 100 + eraDiv(30 * (maturity - (10 + (age - 10) * 15)), 100);
    } else {
      maturity = 85 + rng.next(31) - rng.next(31);
      if (maturity < 15) maturity = 15;
      maturityHeightScale = 100 + eraDiv(30 * (maturity - 85), 100);
    }
  }

  const muscle =
    gender === 0 ? 30 + rng.next(31) - rng.next(21) : gender === 1 ? 45 + rng.next(51) - rng.next(31) : 35 + rng.next(36) - rng.next(26);
  flags['430'] = (flags['430'] ?? 1500) + (muscle - 50) * 10;
  height = eraDiv(height * maturityHeightScale, 100);

  let weight = eraDiv(eraDiv(eraDiv(eraDiv(height * height * height * 47, 100), 100), 100), 10);
  if (gender === 0 || gender === 2) weight = eraDiv(weight * 8, 10);
  weight += eraDiv(eraDiv((15 + muscle) * height * 23, 100), 100);
  weight += eraDiv(eraDiv(fat * 50 * height, 1000), 100);

  let measureWork = eraDiv(eraDiv(height * (3200 + fat + muscle * 10), 100) * 10, 100);
  let waist = eraDiv(measureWork, 10);
  measureWork += eraDiv(height * (rng.next(16) - rng.next(16)), 100);
  if (measureWork % 10 >= 5) waist += 1;

  let bustWork = measureWork;
  const bustBase = height * 44;
  if (gender === 0) {
    const maturityDelta = (maturity - 60) * 3;
    if (breastSize === 1) {
      bustWork = 350 + rng.next(350) + maturityDelta;
      flags['431'] = (flags['431'] ?? 1500) + 100;
    } else if (breastSize === 2) {
      bustWork = 700 + rng.next(450) + maturityDelta;
    } else if (breastSize === 0) {
      bustWork = 1150 + rng.next(500) + maturityDelta;
    } else if (breastSize === 3) {
      bustWork = 1650 + rng.next(650) + maturityDelta;
    } else if (breastSize === 4) {
      bustWork = 2300 + rng.next(851) + maturityDelta;
      flags['430'] = (flags['430'] ?? 1500) + 100;
    } else {
      bustWork = 700 + rng.next(500) + maturityDelta;
    }
    weight += eraDiv(bustWork, 1250);
  } else if (gender === 1) {
    bustWork = muscle * 2 * height;
    weight += eraDiv(muscle, 50);
  }
  bustWork += bustBase;
  const bust = eraRoundUpByRemainder(bustWork, 100, 5);

  measureWork = bustWork + eraDiv(height * (rng.next(16) - rng.next(16)), 100);
  const hip = eraRoundUpByRemainder(measureWork, 100, 5);

  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '20', height));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '21', weight));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '22', bust));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '23', waist));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '24', hip));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '0', flags['430'] ?? 1500));
  ({ character: nextCharacter, body: nextBody } = setBaseStat(nextCharacter, nextBody, '1', flags['431'] ?? 1500));
  if (breastSize === 1) nextCharacter = addTrait(nextCharacter, '116');
  else if (breastSize === 2) nextCharacter = addTrait(nextCharacter, '109');
  else if (breastSize === 3) nextCharacter = addTrait(nextCharacter, '110');
  else if (breastSize === 4) nextCharacter = addTrait(nextCharacter, '114');
  if (height < 150) nextCharacter = addTrait(nextCharacter, '100');
  else if (height >= 170) nextCharacter = addTrait(nextCharacter, '99');

  return { character: nextCharacter, body: nextBody };
}

function applyInterviewSexualHistory(character: CharacterState, body: CharacterBodyState, flags: Record<string, number>) {
  let nextCharacter = character;
  let nextBody = body;
  const rng = createDeterministicRng(`history:${Object.entries(flags).join(':')}`);
  const partnerState = flags['409'] ?? 0;
  const occupation = flags['405'] ?? 0;
  const gender = flags['400'] ?? 0;
  const firstKiss = flags['411'] ?? 0;
  const sex = flags['412'] ?? 0;
  const anal = flags['413'] ?? 0;

  const partnerLabel = occupation === 7 ? '남편' : gender === 1 || (gender === 2 && rng.next(3) === 0) ? '여자친구' : '남자친구';
  const unknownLabel = gender === 1 || (gender === 2 && rng.next(3) === 0) ? '모르는 여자' : '모르는 남자';
  const exLabel = gender === 1 || (gender === 2 && rng.next(3) === 0) ? '전 여친' : '전 남친';

  nextBody = setBodyConditionFlag(nextBody, '16', firstKiss === 0 ? -1 : 1);
  nextCharacter = setProfileText(nextCharacter, '1', firstKiss === 0 ? '미경험' : partnerState >= 2 && partnerState <= 6 ? partnerLabel : partnerState >= 7 ? '친족' : unknownLabel);

  if (sex === 0) {
    nextCharacter = addTrait(nextCharacter, '0');
  } else {
    nextCharacter = addExperience(nextCharacter, '0', 1 + rng.next(20));
    nextCharacter = addExperience(nextCharacter, '2', 1 + rng.next(Math.max(1, nextCharacter.attributes.experiences['0'] ?? 1)));
    nextBody = setBodyConditionFlag(nextBody, '15', 1);
    nextCharacter = setProfileText(nextCharacter, '0', partnerState >= 2 && partnerState <= 6 ? partnerLabel : partnerState >= 7 ? '친족' : rng.next(10) < 7 ? exLabel : unknownLabel);
  }

  if (anal === 0) {
    nextCharacter = addTrait(nextCharacter, '2');
  } else {
    nextCharacter = addExperience(nextCharacter, '1', 1 + rng.next(10));
    nextCharacter = addExperience(nextCharacter, '2', 1 + rng.next(Math.max(1, nextCharacter.attributes.experiences['1'] ?? 1)));
    const analLabel = partnerState >= 2 && partnerState <= 6 ? partnerLabel : partnerState >= 7 ? '친족' : rng.next(10) < 7 ? exLabel : unknownLabel;
    nextCharacter = setProfileText(setProfileText(nextCharacter, '2', analLabel), '3', analLabel);
  }

  return { character: nextCharacter, body: nextBody };
}

function applyInterviewSexualHistoryOriginalLike(character: CharacterState, body: CharacterBodyState, flags: Record<string, number>) {
  let nextCharacter = character;
  let nextBody = body;
  const rng = createDeterministicRng(`history-original-like:${Object.entries(flags).join(':')}`);
  const partnerState = flags['409'] ?? 0;
  const occupation = flags['405'] ?? 0;
  const gender = flags['400'] ?? 0;
  const firstKiss = flags['411'] ?? 0;
  const sex = flags['412'] ?? 0;
  const anal = flags['413'] ?? 0;
  const femalePartner = gender === 1 || (gender === 2 && rng.next(3) === 0);
  const partnerLabel = occupation === 7 ? '남편' : femalePartner ? '여자친구' : '남자친구';
  const unknownLabel = femalePartner ? '모르는 여자' : '모르는 남자';
  const exLabel = femalePartner ? '전 여친' : '전 남친';
  const toolLabels = ['바이브', '딜도', '로터', '필기도구', '송이버섯', '바나나', '오이', '당근', '계란', '기다란 무언가'];
  const analToolLabels = ['애널바이브', '애널비즈', '구슬', '손가락', '기다란 무언가'];
  const tabooLabels = [
    '오빠',
    '의붓오빠',
    '언니',
    '의붓언니',
    '남동생',
    '의붓남동생',
    '여동생',
    '의붓여동생',
    '아빠',
    '새아빠',
    '엄마',
    '새엄마',
    '조부',
    '조모',
    '숙부',
    '백부',
    '숙모',
    '백모',
    '전 담임교사',
    '체육교사',
    '교장',
    '용무원',
    '가정교사 오빠',
    '가정교사 언니',
    '가정교사 아저씨',
    '가정교사 아줌마',
    '의사',
    '간호사',
    '집사',
    '메이드',
    '들개(♂)',
    '애완견(♂)',
    '들개(♀)',
    '애완견(♀)',
  ];
  const tabooLabel = (): string => {
    const label = tabooLabels[rng.next(tabooLabels.length)] ?? '오빠';
    if (label.includes('개(')) nextCharacter = addExperience(nextCharacter, '56', 1 + rng.next(26));
    return label;
  };

  nextBody = setBodyConditionFlag(nextBody, '16', firstKiss === 0 ? -1 : 1);
  nextCharacter = setProfileText(
    nextCharacter,
    '1',
    firstKiss === 0 ? '미경험' : partnerState >= 2 && partnerState <= 6 ? partnerLabel : partnerState === 7 ? tabooLabel() : rng.next(10) < 5 ? unknownLabel : exLabel,
  );

  if (sex === 0) {
    nextCharacter = addTrait(nextCharacter, '0');
  } else {
    nextCharacter = addExperience(nextCharacter, '0', 1 + rng.next(20));
    nextCharacter = addExperience(nextCharacter, '2', 1 + rng.next(Math.max(1, nextCharacter.attributes.experiences['0'] ?? 1)));
    nextBody = setBodyConditionFlag(nextBody, '15', 1);
    const sexLabel =
      partnerState >= 2 && partnerState <= 6
        ? partnerLabel
        : partnerState === 7
          ? tabooLabel()
          : rng.next(10) < 2 && gender === 0
            ? toolLabels[rng.next(toolLabels.length)] ?? '바이브'
            : rng.next(10) < 7
              ? exLabel
              : unknownLabel;
    nextCharacter = setProfileText(nextCharacter, '0', sexLabel);
  }

  if (anal === 0) {
    nextCharacter = addTrait(nextCharacter, '2');
  } else {
    nextCharacter = addExperience(nextCharacter, '1', 1 + rng.next(10));
    nextCharacter = addExperience(nextCharacter, '2', 1 + rng.next(Math.max(1, nextCharacter.attributes.experiences['1'] ?? 1)));
    const analLabel =
      partnerState >= 2 && partnerState <= 6
        ? partnerLabel
        : partnerState === 7
          ? tabooLabel()
          : rng.next(10) < 2
            ? analToolLabels[rng.next(analToolLabels.length)] ?? '애널바이브'
            : rng.next(10) < 7
              ? exLabel
              : unknownLabel;
    nextCharacter = setProfileText(setProfileText(nextCharacter, '2', analLabel), '3', analLabel);
  }

  return { character: nextCharacter, body: nextBody };
}

export const recruitInterviewOriginalHistoryLabels = [
  '가상 남친(자위: 기다란 무언가)',
  '가정교사 아저씨',
  '가정교사 아줌마',
  '가정교사 언니',
  '가정교사 오빠',
  '간호사',
  '강간당함',
  '강호사',
  '계란',
  '교장',
  '구슬',
  '기다란 무언가',
  '남동생',
  '남자친구',
  '남자친구(사실 미경험)',
  '남자친구의 자지',
  '남편',
  '남편의 자지',
  '당근',
  '들개(♀)',
  '들개(♂)',
  '딜도',
  '로터',
  '망상속 남친(사실 미경험)',
  '망상속 남친(자위)',
  '망상속 남친(자위: 손가락)',
  '망상속 여친(사실 미경험)',
  '망상속 여친(자위)',
  '메이드',
  '모르는 남자',
  '모르는 여자',
  '바나나',
  '바이브',
  '백모',
  '백부',
  '새아빠',
  '새엄마',
  '송이버섯',
  '숙모',
  '숙부',
  '아빠',
  '애널바이브',
  '애널비즈',
  '애완견(♀)',
  '애완견(♂)',
  '언니',
  '엄마',
  '여동생',
  '여의사',
  '여자친구',
  '여자친구(사실 미경험)',
  '여자친구의 가슴',
  '오빠',
  '오이',
  '용무원',
  '의료기구',
  '의붓남동생',
  '의붓언니',
  '의붓여동생',
  '의붓오빠',
  '의사',
  '이차원 남친(사실 미경험)',
  '이차원 여친(자위)',
  '자고있어서 처녀상실이유 불명',
  '전 남친',
  '전 담임교사',
  '전 여친',
  '조모',
  '조부',
  '집사',
  '체육교사',
  '필기도구',
  '해삼',
] as const;

function applyInterviewSexualHistoryOriginalExact(character: CharacterState, body: CharacterBodyState, flags: Record<string, number>) {
  let nextCharacter = character;
  let nextBody = body;
  const rng = createDeterministicRng(`history-original-exact:${Object.entries(flags).join(':')}`);
  const partnerState = flags['409'] ?? 0;
  const occupation = flags['405'] ?? 0;
  const gender = flags['400'] ?? 0;
  const firstKiss = flags['411'] ?? 0;
  const sex = flags['412'] ?? 0;
  const anal = flags['413'] ?? 0;
  let fantasyPartnerHandled = false;
  const rand = (maxExclusive: number) => rng.next(Math.max(1, maxExclusive));
  const isFemalePartnerRoll = () => gender === 1 || (gender === 2 && rand(3) === 0);
  const isMaleHistoryRole = () => gender === 0 || (gender === 2 && rand(2) === 0);
  const setHistoryText = (slot: '0' | '1' | '2' | '3', label: string | undefined) => {
    if (label !== undefined) nextCharacter = setProfileText(nextCharacter, slot, label);
  };
  const normalPartnerLabel = () => (occupation === 7 ? '남편' : isFemalePartnerRoll() ? '여자친구' : '남자친구');
  const bodyPartPartnerLabel = () => (occupation === 7 ? '남편의 자지' : isFemalePartnerRoll() ? '여자친구의 가슴' : '남자친구의 자지');
  const unknownPartnerLabel = () => (isFemalePartnerRoll() ? '모르는 여자' : '모르는 남자');
  const formerPartnerLabel = () => (isFemalePartnerRoll() ? '전 여친' : '전 남친');
  const fantasyKissLabel = () => {
    if (gender === 0) return '남자친구(사실 미경험)';
    if (gender === 1) return '여자친구(사실 미경험)';
    return rand(3) === 0 ? '남자친구(사실 미경험)' : '여자친구(사실 미경험)';
  };
  const familySiblingOlderLabel = () => (isMaleHistoryRole() ? (rand(3) === 0 ? '오빠' : '의붓오빠') : rand(3) === 0 ? '언니' : '의붓언니');
  const familySiblingYoungerLabel = () =>
    isMaleHistoryRole() ? (rand(3) === 0 ? '남동생' : '의붓남동생') : rand(3) === 0 ? '여동생' : '의붓여동생';
  const familyParentLabel = () => (isMaleHistoryRole() ? (rand(3) === 0 ? '아빠' : '새아빠') : rand(3) === 0 ? '엄마' : '새엄마');
  const familyGrandparentLabel = () => (isMaleHistoryRole() ? '조부' : '조모');
  const familyUncleAuntLabel = () => (isMaleHistoryRole() ? (rand(3) === 0 ? '숙부' : '백부') : rand(3) === 0 ? '숙모' : '백모');
  const teacherLabel = (history: 'kiss' | 'sex' | 'anal') => {
    const e = rand(5);
    if (e === 0) return '전 담임교사';
    if (e === 1) return '체육교사';
    if (e === 2) return '교장';
    if (e === 3) return '용무원';
    if (e === 4) return isMaleHistoryRole() ? '가정교사 오빠' : '가정교사 언니';
    if (e === 5) return isMaleHistoryRole() ? '가정교사 아저씨' : '가정교사 아줌마';
    if (history === 'kiss') return isMaleHistoryRole() ? '의사' : '간호사';
    if (isMaleHistoryRole()) return rand(2) === 0 ? '의사' : '의료기구';
    const medical = rand(5);
    if (medical === 0) return '의료기구';
    if (medical < 4) return history === 'anal' ? '강호사' : '간호사';
    return '여의사';
  };
  const servantLabel = () => (isMaleHistoryRole() ? '집사' : '메이드');
  const petLabel = () => {
    if (isMaleHistoryRole()) return rand(5) === 0 ? '들개(♂)' : '애완견(♂)';
    const e = rand(10);
    nextCharacter = addExperience(nextCharacter, '56', 1 + rand(26));
    if (e < 2) return '들개(♀)';
    if (e < 9) return '애완견(♀)';
    return '들개(♂)';
  };
  const tabooLabel = (history: 'kiss' | 'sex' | 'anal') => {
    const e = rand(8);
    if (e === 0) return familySiblingOlderLabel();
    if (e === 1) return familySiblingYoungerLabel();
    if (e === 2) return familyParentLabel();
    if (e === 3) return familyGrandparentLabel();
    if (e === 4) return familyUncleAuntLabel();
    if (e === 5) return teacherLabel(history);
    if (e === 6) return servantLabel();
    return petLabel();
  };
  const sexToolLabel = () => {
    const e = rand(3);
    if (e === 0) return '바이브';
    if (e === 1) return '딜도';
    return '로터';
  };
  const masturbationLabel = () => {
    const e = rand(3);
    if (e === 0) return '필기도구';
    if (e === 1) {
      const vegetable = rand(3);
      if (vegetable === 0) return '송이버섯';
      if (vegetable === 1) return '바나나';
      if (vegetable === 2) return '오이';
      if (vegetable === 3) return '당근';
      return '계란';
    }
    return '기다란 무언가';
  };
  const sexFantasyLabel = () => {
    const e = rand(gender === 0 ? 3 : 10);
    if (gender === 0) {
      if (e === 0) {
        nextCharacter = addTrait(nextCharacter, '0');
        return '이차원 남친(사실 미경험)';
      }
      if (e === 1) return '망상속 남친(자위: 손가락)';
      return '가상 남친(자위: 기다란 무언가)';
    }
    if (gender === 1) {
      if (e === 0) {
        nextCharacter = addTrait(nextCharacter, '1');
        return '망상속 여친(사실 미경험)';
      }
      if (e < 9) return '이차원 여친(자위)';
      return '해삼';
    }
    if (e === 0) {
      nextCharacter = addTrait(nextCharacter, '1');
      return rand(3) === 0 ? '망상속 여친(사실 미경험)' : '망상속 남친(사실 미경험)';
    }
    return e < 6 ? '망상속 여친(자위)' : '망상속 남친(자위)';
  };
  const analFantasyLabel = () => {
    const e = rand(gender === 0 ? 3 : 10);
    if (gender === 0) {
      if (e === 0) {
        nextCharacter = addTrait(nextCharacter, '2');
        return '이차원 남친(사실 미경험)';
      }
      if (e === 1) return '망상속 남친(자위: 손가락)';
      return '가상 남친(자위: 기다란 무언가)';
    }
    if (gender === 1) {
      if (e === 0) {
        nextCharacter = addTrait(nextCharacter, '2');
        nextCharacter = setExperience(setExperience(nextCharacter, '1', 0), '2', 0);
        return '망상속 여친(사실 미경험)';
      }
      return '이차원 여친(자위)';
    }
    if (e === 0) {
      nextCharacter = addTrait(nextCharacter, '2');
      nextCharacter = setExperience(setExperience(nextCharacter, '1', 0), '2', 0);
      return rand(3) === 0 ? '망상속 여친(사실 미경험)' : '망상속 남친(사실 미경험)';
    }
    return e < 6 ? '망상속 여친(자위)' : '망상속 남친(자위)';
  };

  if (firstKiss === 0) {
    nextBody = setBodyConditionFlag(nextBody, '16', -1);
  } else if (firstKiss === 1) {
    nextBody = setBodyConditionFlag(nextBody, '16', 1);
    let e = rand(10);
    if (partnerState >= 2 && partnerState <= 6) {
      e = rand(10);
      if (e < 5) setHistoryText('1', normalPartnerLabel());
      else if (e < 7) setHistoryText('1', bodyPartPartnerLabel());
      else if (e === 7) setHistoryText('1', unknownPartnerLabel());
      else setHistoryText('1', formerPartnerLabel());
    } else if (partnerState === 7) {
      setHistoryText('1', tabooLabel('kiss'));
    } else if (e === 0) {
      if (rand(5) === 0) {
        e = rand(4);
        if (e === 3 || (fantasyPartnerHandled && e === 2)) {
          fantasyPartnerHandled = true;
          nextBody = setBodyConditionFlag(nextBody, '16', -1);
          setHistoryText('1', fantasyKissLabel());
        }
      } else if (occupation === 7 && rand(5) === 0) {
        setHistoryText('1', '남편');
      } else {
        setHistoryText('1', '모르는 여자');
      }
    } else {
      setHistoryText('1', '전 여친');
    }
  }

  if (sex === 0) {
    nextCharacter = addTrait(nextCharacter, '0');
  } else if (sex === 1) {
    nextCharacter = addExperience(nextCharacter, '0', 1 + rand(20));
    nextCharacter = addExperience(nextCharacter, '2', 1 + rand(nextCharacter.attributes.experiences['0'] ?? 1));
    nextBody = setBodyConditionFlag(nextBody, '15', 1);
    let e = rand(10);
    if (partnerState >= 2 && partnerState <= 6) {
      e = rand(10);
      if (e < 5) setHistoryText('0', normalPartnerLabel());
      else if (e < 7 && gender === 0) setHistoryText('0', sexToolLabel());
      else if (e < 7 && gender !== 0) nextCharacter = addTrait(nextCharacter, '1');
      else if (e === 7) setHistoryText('0', unknownPartnerLabel());
      else setHistoryText('0', formerPartnerLabel());
    } else if (partnerState === 7) {
      setHistoryText('0', tabooLabel('sex'));
    } else if (e === 0 && gender === 0) {
      setHistoryText('0', masturbationLabel());
    } else if (e === 1 || (fantasyPartnerHandled && e < 7)) {
      const fantasyRoll = rand(4);
      if (gender === 0 && (fantasyRoll === 3 || (fantasyPartnerHandled && fantasyRoll === 2))) {
        fantasyPartnerHandled = true;
        setHistoryText('0', sexFantasyLabel());
      }
    } else if (e === 2) {
      setHistoryText('0', '자고있어서 처녀상실이유 불명');
    } else if (e === 3) {
      setHistoryText('0', '강간당함');
    } else if (occupation === 7 && rand(3) === 0) {
      setHistoryText('0', '남편');
    } else if (gender === 1) {
      setHistoryText('0', '전 여친');
    }
  }

  if (anal === 0) {
    nextCharacter = addTrait(nextCharacter, '2');
  } else if (anal === 1) {
    if (gender === 0) {
      nextCharacter = addExperience(nextCharacter, '1', 1 + rand(10));
      nextCharacter = addExperience(nextCharacter, '2', 1 + rand(nextCharacter.attributes.experiences['1'] ?? 1));
    }
    let e = rand(10);
    if (partnerState >= 2 && partnerState <= 6) {
      e = rand(10);
      if (e < 5) setHistoryText('2', normalPartnerLabel());
      else if (e < 7 && gender === 0) {
        const tool = rand(3);
        if (tool === 0) setHistoryText('2', '애널바이브');
        else if (tool === 1) setHistoryText('2', '애널비즈');
        else setHistoryText('2', '구슬');
      } else if (e === 7) setHistoryText('2', unknownPartnerLabel());
      else setHistoryText('2', formerPartnerLabel());
    } else if (partnerState === 7) {
      setHistoryText('3', tabooLabel('anal'));
    } else if (e === 1 || (fantasyPartnerHandled && e < 7)) {
      const fantasyRoll = rand(4);
      if (gender === 0 && (fantasyRoll === 3 || (fantasyPartnerHandled && fantasyRoll === 2))) {
        fantasyPartnerHandled = true;
        setHistoryText('3', analFantasyLabel());
      }
    } else if (occupation === 7 && rand(3) === 0) {
      setHistoryText('3', '남편');
    } else if (gender === 1) {
      setHistoryText('3', '전 여친');
    }
  }

  return { character: nextCharacter, body: nextBody };
}

type RecruitBundleAdjustment = {
  readonly bundle: CharacterCreationBundle;
  readonly socialNtrProgress: Record<string, boolean | number | string>;
  readonly socialPartnerProgress: Record<string, boolean | number | string>;
};

function applyInterviewAddToBundle(bundle: CharacterCreationBundle, draft: RecruitInterviewDraft): RecruitBundleAdjustment {
  const characterId = bundle.createdCharacterIds[0];
  let character = bundle.characters[characterId];
  let body = bundle.bodies[characterId];
  let equipment = bundle.equipment[characterId];
  if (!character || !body || !equipment) return { bundle, socialNtrProgress: {}, socialPartnerProgress: {} };

  const flags = draft.commandFlags;
  const gender = flags['400'] ?? 0;
  const hairColor = flags['406'] ?? 0;
  const partnerState = flags['409'] ?? 0;
  let stamina = 1500;
  let energy = 1500;
  if (gender === 1) {
    character = addTrait(character, '122');
    energy -= 100;
  } else if (gender === 2) {
    character = addTrait(addTrait(character, '122'), '413');
  }

  ({ character, body } = setBaseStat(character, body, '9', flags['401'] ?? 18));
  ({ character, body } = setBaseStat(character, body, '11', flags['402'] ?? 1));
  ({ character, body } = setBaseStat(character, body, '12', flags['403'] ?? 1));
  ({ character, body } = setBaseStat(character, body, '13', flags['404'] ?? 1));
  ({ character, body } = setBaseStat(character, body, '0', stamina));
  ({ character, body } = setBaseStat(character, body, '1', energy));

  ({ character, body, equipment } = applyOccupationInterviewState(character, body, equipment, { ...flags, '430': stamina, '431': energy }));
  equipment = setEquipmentFlag(setEquipmentFlag(equipment, '600', hairColor < 11 ? hairColor : hairColor - 11), '601', hairColor < 11 ? 0 : 1);
  equipment = setEquipmentFlag(equipment, '603', hairColor < 11 ? hairColor : createDeterministicRng(`hair:${draft.displayName}`).next(11));
  equipment = setEquipmentFlag(equipment, '602', flags['407'] ?? 0);

  ({ character, body } = applyInterviewPhysicalState(character, body, flags));
  if (partnerState >= 2 && partnerState <= 6) {
    character = addTrait(character, '184');
  }
  body = setBodyConditionFlag(body, '620', flags['410'] ?? 100);
  if (partnerState >= 2 && partnerState <= 6) {
    body = setBodyConditionFlag(setBodyConditionFlag(body, '621', 1), '622', partnerState);
  }
  ({ character, body } = applyInterviewSexualHistoryOriginalExact(character, body, flags));
  if ((flags['414'] ?? 0) >= 10) character = addTrait(character, String(flags['414']));
  const pubicHair = flags['415'] ?? 0;
  body = setBodyConditionFlag(body, '6', pubicHair <= 1 ? -2 : pubicHair <= 5 ? -1 : pubicHair <= 7 ? 15 : 12);
  if ((flags['416'] ?? 0) >= 30) character = addTrait(character, String(flags['416']));
  if ((flags['417'] ?? 0) !== 0) character = addTrait(character, String(flags['417']));
  if ((flags['418'] ?? 0) !== 0) character = addTrait(character, String(flags['418']));
  ({ character, body } = setBaseStat(character, body, '30', flags['420'] ?? recruitAdvertisementPrice));
  character = {
    ...character,
    identity: {
      ...character.identity,
      displayName: draft.displayName,
      callName: draft.scratchTexts['51'] ?? draft.displayName,
      nickname: draft.scratchTexts['51'] ?? draft.displayName,
    },
  };

  return {
    bundle: {
      ...bundle,
      characters: { ...bundle.characters, [characterId]: character },
      bodies: { ...bundle.bodies, [characterId]: body },
      equipment: { ...bundle.equipment, [characterId]: equipment },
    },
    socialNtrProgress: {
      [`${characterId}.flag_620`]: flags['410'] ?? 100,
      ...(partnerState >= 2 && partnerState <= 6
        ? {
            [`${characterId}.flag_621`]: 1,
            [`${characterId}.flag_622`]: partnerState,
          }
        : {}),
    },
    socialPartnerProgress:
      partnerState >= 2 && partnerState <= 6
        ? {
            [`${characterId}.partnerState`]: partnerState,
          }
        : {},
  };
}

function applyRecruitPurchaseSettings(
  bundle: CharacterCreationBundle,
  listing: RecruitListingDefinition,
  state: GameState,
  draft?: RecruitInterviewDraft,
): RecruitBundleAdjustment {
  let adjusted: RecruitBundleAdjustment = draft
    ? applyInterviewAddToBundle(bundle, draft)
    : { bundle, socialNtrProgress: {}, socialPartnerProgress: {} };

  const characterId = adjusted.bundle.createdCharacterIds[0];
  let character = adjusted.bundle.characters[characterId];
  let body = adjusted.bundle.bodies[characterId];
  let equipment = adjusted.bundle.equipment[characterId];
  if (!character || !body || !equipment) return adjusted;

  ({ character, body } = applyDifficultyLifeAdjustment(character, body, state));
  body = applyPubicHairDefault(character, body, listing, state);
  character = setDefaultGenitalCall(character);
  if (state.run.runFlags.clothingSystemEnabled !== false) equipment = applyDefaultClothingFlags(equipment, character);
  if (numericFlag(state.meta.globalCounters['200'], -1) < 0) ({ character, body } = applyBeautyCalculation(character, body));

  adjusted = {
    ...adjusted,
    bundle: {
      ...adjusted.bundle,
      characters: { ...adjusted.bundle.characters, [characterId]: character },
      bodies: { ...adjusted.bundle.bodies, [characterId]: body },
      equipment: { ...adjusted.bundle.equipment, [characterId]: equipment },
    },
  };
  return adjusted;
}

function unavailableReason(
  definitions: GameDefinitions,
  state: GameState,
  listing: RecruitListingDefinition,
): string | undefined {
  if (!isUnlockedOrDefault(state, listing)) return 'Recruit listing is currently hidden.';

  if (!listing.characterTemplateId || !getCharacterTemplate(definitions, listing.characterTemplateId)) {
    return 'Recruit listing is missing a character template.';
  }

  if (!hasRemainingRecruitCount(state, listing)) {
    return isRepeatableRecruitListing(listing) ? 'Recruitment limit reached for this listing.' : 'Character already recruited.';
  }

  const characterId = recruitCharacterId(listing, state);
  if (characterId && state.people.characters[characterId]) return 'Character already recruited.';
  if (Object.keys(state.people.characters).length > recruitRosterLimit(state)) return 'Roster limit reached.';
  if (state.economy.account.currentMoney < (listing.basePrice ?? 0)) return 'Not enough money.';

  return undefined;
}

function canEnterRecruitList(definitions: GameDefinitions, state: GameState, listing: RecruitListingDefinition): boolean {
  return (
    isUnlockedOrDefault(state, listing) &&
    listing.characterTemplateId !== undefined &&
    getCharacterTemplate(definitions, listing.characterTemplateId) !== undefined &&
    hasRemainingRecruitCount(state, listing)
  );
}

export function computeVisibleRecruitListingIds(definitions: GameDefinitions, state: GameState): readonly CatalogId[] {
  return Object.values(definitions.recruitListings)
    .filter((listing) => canEnterRecruitList(definitions, state, listing))
    .map((listing) => listing.id)
    .sort((left, right) => Number(left.split(':')[1]) - Number(right.split(':')[1]));
}

function listingViewFromDefinition(
  definitions: GameDefinitions,
  state: GameState,
  listingId: CatalogId,
): RecruitListingView | undefined {
  const listingResult = getRecruitListingDefinition(definitions, listingId);
  if (!listingResult.ok) return undefined;

  const listing = listingResult.definition;
  const disabledReason = unavailableReason(definitions, state, listing);

  return {
    listingId: listing.id,
    characterTemplateId: listing.characterTemplateId,
    characterId: recruitCharacterId(listing, state),
    label: listing.label,
    price: listing.basePrice ?? 0,
    available: disabledReason === undefined,
    disabledReason,
  };
}

export function buildRecruitView(definitions: GameDefinitions, state: GameState, session: GameSession): RecruitView {
  const allVisibleListingIds =
    session.recruit.visibleListingIds.length > 0 ? session.recruit.visibleListingIds : computeVisibleRecruitListingIds(definitions, state);
  const pageIndex = recruitPageIndexForSession(session);
  const visibleListingIds = recruitListingIdsForPage(allVisibleListingIds, pageIndex);
  const visibleListings = visibleListingIds
    .map((listingId) => listingViewFromDefinition(definitions, state, listingId))
    .filter((listing): listing is RecruitListingView => Boolean(listing));
  const selectedListing =
    session.recruit.selectedListingId !== undefined
      ? visibleListings.find((listing) => listing.listingId === session.recruit.selectedListingId)
      : undefined;
  const selectedManual = selectedListing ? recruitManualViewForListing(selectedListing.listingId) : undefined;

  return {
    kind: 'recruit',
    route: 'recruit',
    currentMoney: state.economy.account.currentMoney,
    pageIndex,
    maxPageIndex: recruitListingMaxPageIndex,
    pageSize: recruitListingPageSize,
    totalVisibleListingCount: allVisibleListingIds.length,
    previousPageLabel: '[1] 이전 페이지',
    nextPageLabel: '[9] 다음 페이지',
    returnLabel: '[999] - 돌아간다',
    visibleListings,
    selectedListingId: session.recruit.selectedListingId,
    selectedListing,
    selectedManual,
    interview:
      selectedListing && session.recruit.interviewDraft
        ? buildRecruitInterviewView(state, session.recruit.interviewDraft, selectedListing.price)
        : undefined,
  };
}

export function createRecruitSession(definitions: GameDefinitions, state: GameState): RecruitSessionState {
  return {
    selectedListingId: undefined,
    visibleListingIds: computeVisibleRecruitListingIds(definitions, state),
    pageIndex: 0,
    commandFlags: { '100': 0 },
    scratchTexts: {},
  };
}

function selectableRecruitFailure(
  definitions: GameDefinitions,
  state: GameState,
  listing: RecruitListingDefinition,
): RecruitFailure | undefined {
  if (!isUnlockedOrDefault(state, listing)) {
    return {
      code: 'recruit-listing-not-visible',
      message: `Recruit listing is currently hidden: ${listing.id}`,
    };
  }

  if (!listing.characterTemplateId || !getCharacterTemplate(definitions, listing.characterTemplateId)) {
    return {
      code: 'recruit-template-missing',
      message: `Recruit listing is missing a character template: ${listing.id}`,
    };
  }

  if (!hasRemainingRecruitCount(state, listing)) {
    return {
      code: isRepeatableRecruitListing(listing) ? 'recruit-repeat-limit' : 'recruit-duplicate-character',
      message: isRepeatableRecruitListing(listing)
        ? `Recruit listing reached its repeat limit: ${listing.id}`
        : `Character already recruited: ${listing.label}`,
    };
  }

  const characterId = recruitCharacterId(listing, state);
  if (characterId && state.people.characters[characterId]) {
    return {
      code: 'recruit-duplicate-character',
      message: `Character already recruited: ${listing.label}`,
    };
  }

  if (Object.keys(state.people.characters).length > recruitRosterLimit(state)) {
    return {
      code: 'recruit-roster-limit',
      message: 'Recruit roster limit reached.',
    };
  }

  return undefined;
}

export function selectRecruitListing(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  listingId: CatalogId,
  interviewGenderInput?: number,
): RecruitUpdateResult {
  const listingResult = getRecruitListingDefinition(definitions, listingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  const interviewGender = recruitInterviewGenderFromInput(interviewGenderInput);
  if (interviewGender === undefined) {
    return {
      ok: false,
      failure: {
        code: 'recruit-interview-gender-invalid',
        message: `Recruit interview gender must be 0, 1, or 2: ${interviewGenderInput}`,
      },
    };
  }

  const failure = selectableRecruitFailure(definitions, state, listingResult.definition);
  if (failure) {
    return {
      ok: false,
      failure,
    };
  }

  if (session.recruit.visibleListingIds.length > 0) {
    const pageListingIds = recruitListingIdsForPage(session.recruit.visibleListingIds, recruitPageIndexForSession(session));
    if (!pageListingIds.includes(listingId)) {
      return {
        ok: false,
        failure: {
          code: 'recruit-listing-not-in-session',
          message: `Recruit listing is not visible in the current page: ${listingId}`,
        },
      };
    }
  }

  if (session.recruit.visibleListingIds.length === 0) {
    const pageListingIds = recruitListingIdsForPage(computeVisibleRecruitListingIds(definitions, state), recruitPageIndexForSession(session));
    if (!pageListingIds.includes(listingId)) {
      return {
        ok: false,
        failure: {
          code: 'recruit-listing-not-in-session',
          message: `Recruit listing is not visible in the current page: ${listingId}`,
        },
      };
    }
  }

  const draft = createRecruitInterviewDraft(listingResult.definition, state, 0, interviewGender);

  return {
    ok: true,
    state,
    session: {
      ...session,
      recruit: {
        ...session.recruit,
        selectedListingId: listingResult.definition.id,
        commandFlags: commandFlagsForSession(session, draft),
        scratchTexts: scratchTextsForSession(session, draft),
        interviewDraft: draft,
      },
    },
    message: `${listingResult.definition.label} selected for recruitment.`,
  };
}

export function changeRecruitPage(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
  direction: 'previous' | 'next',
): RecruitUpdateResult {
  const currentPageIndex = recruitPageIndexForSession(session);
  const pageIndex =
    direction === 'previous'
      ? clampRecruitPageIndex(currentPageIndex - 1)
      : clampRecruitPageIndex(currentPageIndex + 1);
  const visibleListingIds =
    session.recruit.visibleListingIds.length > 0 ? session.recruit.visibleListingIds : computeVisibleRecruitListingIds(definitions, state);

  return {
    ok: true,
    state,
    session: {
      ...session,
      recruit: {
        ...session.recruit,
        selectedListingId: undefined,
        visibleListingIds,
        pageIndex,
        commandFlags: {
          ...session.recruit.commandFlags,
          '100': pageIndex,
        },
        scratchTexts: {},
        interviewDraft: undefined,
      },
    },
    message: direction === 'previous' ? '[1] 이전 페이지' : '[9] 다음 페이지',
  };
}

export function rerollRecruitInterview(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): RecruitUpdateResult {
  const selectedListingId = session.recruit.selectedListingId;
  if (!selectedListingId) {
    return {
      ok: false,
      failure: {
        code: 'recruit-selection-required',
        message: 'Select a recruit listing first.',
      },
    };
  }

  const listingResult = getRecruitListingDefinition(definitions, selectedListingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  const listing = listingResult.definition;
  if (!isRepeatableRecruitListing(listing)) {
    return {
      ok: false,
      failure: {
        code: 'recruit-interview-reroll-unavailable',
        message: `Recruit listing does not support interview reroll: ${listing.id}`,
      },
    };
  }

  const nextRerollIndex = numericFlag(session.recruit.commandFlags.recruitInterviewRerollCount, 0) + 1;
  const interviewGender = recruitInterviewGenderFromInput(numericFlag(session.recruit.commandFlags['400'], 0)) ?? 0;
  const draft = createRecruitInterviewDraft(listing, state, nextRerollIndex, interviewGender);

  return {
    ok: true,
    state,
    session: {
      ...session,
      recruit: {
        ...session.recruit,
        commandFlags: commandFlagsForSession(session, draft),
        scratchTexts: scratchTextsForSession(session, draft),
        interviewDraft: draft,
      },
    },
    message: `${listing.label} interview candidate rerolled.`,
  };
}

export function recruitSelectedCharacter(
  definitions: GameDefinitions,
  state: GameState,
  session: GameSession,
): RecruitUpdateResult {
  const selectedListingId = session.recruit.selectedListingId;
  if (!selectedListingId) {
    return {
      ok: false,
      failure: {
        code: 'recruit-selection-required',
        message: 'Select a recruit listing first.',
      },
    };
  }

  const listingResult = getRecruitListingDefinition(definitions, selectedListingId);
  if (!listingResult.ok) {
    return {
      ok: false,
      failure: {
        code: listingResult.failure.code,
        message: listingResult.failure.message,
      },
    };
  }

  const listing = listingResult.definition;
  const precheckFailure = selectableRecruitFailure(definitions, state, listing);
  if (precheckFailure) {
    return {
      ok: false,
      failure: precheckFailure,
    };
  }

  const price = listing.basePrice;
  if (price === undefined) {
    return {
      ok: false,
      failure: {
        code: 'recruit-price-missing',
        message: `Recruit listing is missing a price: ${listing.id}`,
      },
    };
  }

  if (state.economy.account.currentMoney < price) {
    return {
      ok: false,
      failure: {
        code: 'not-enough-money',
        message: `Not enough money. Required: ${price}Pt`,
      },
    };
  }

  const draft = session.recruit.interviewDraft ?? createRecruitInterviewDraft(listing, state);
  const characterId = recruitCharacterId(listing, state);
  const characterResult = createCharacterBundleFromSpecs(definitions, [
    {
      templateId: listing.characterTemplateId!,
      characterId,
      identityOverrides: draft
        ? {
            displayName: draft.displayName,
            callName: draft.displayName,
            nickname: draft.displayName,
          }
        : undefined,
      featureProgress: draft
        ? {
            recruitInterviewInstance: draft.instanceIndex,
          }
        : undefined,
    },
  ]);
  if (!characterResult.ok) {
    return {
      ok: false,
      failure: characterResult.failure,
    };
  }
  const adjustedRecruit = applyRecruitPurchaseSettings(characterResult.bundle, listing, state, draft);
  const recruitedCharacterId = adjustedRecruit.bundle.createdCharacterIds[0] ?? characterId ?? '';
  const recruitedDisplayName = adjustedRecruit.bundle.characters[recruitedCharacterId]?.identity.displayName ?? listing.label;
  const templateNumber = Number(listing.characterTemplateId);
  const globalCounterId = Number.isFinite(templateNumber) ? String(templateNumber + 200) : listing.characterTemplateId!;
  const currentRecruitAdvertisementCount = numericFlag(state.run.runFlags.recruitAdvertisementCount, 0);
  const nextRecruitAdvertisementCount = isRepeatableRecruitListing(listing)
    ? currentRecruitAdvertisementCount + 1
    : currentRecruitAdvertisementCount;
  const nextListingFlagValue =
    isRepeatableRecruitListing(listing) && nextRecruitAdvertisementCount < recruitAdvertisementMaxCount
      ? recruitAdvertisementPrice
      : -1;
  const legacyListingFlagId = legacyRecruitListingFlagId(listing);

  const nextState: GameState = {
    ...state,
    meta: {
      ...state.meta,
      globalCounters: {
        ...state.meta.globalCounters,
        [globalCounterId]: (state.meta.globalCounters[globalCounterId] ?? 0) + 1,
      },
      legacyGlobalsNeedingMapping: {
        ...state.meta.legacyGlobalsNeedingMapping,
        [`GLOBAL:${globalCounterId}`]: (state.meta.globalCounters[globalCounterId] ?? 0) + 1,
      },
    },
    run: {
      ...state.run,
      runFlags: {
        ...state.run.runFlags,
        [recruitListingFlagKey(listing)]: nextListingFlagValue,
        ...(legacyListingFlagId ? { [legacyListingFlagId]: nextListingFlagValue } : {}),
        ...(isRepeatableRecruitListing(listing)
          ? {
              recruitAdvertisementCount: nextRecruitAdvertisementCount,
              '90': nextRecruitAdvertisementCount,
              [recruitAdvertisementFlagId]: nextListingFlagValue,
            }
          : {}),
      },
    },
    economy: {
      ...state.economy,
      account: {
        currentMoney: state.economy.account.currentMoney - price,
      },
      accountingEntries: [
        ...state.economy.accountingEntries,
        `recruit:template:${listing.characterTemplateId}:character:${characterId}:total:${price}`,
      ],
    },
    people: {
      characters: {
        ...state.people.characters,
        ...adjustedRecruit.bundle.characters,
      },
    },
    body: {
      byCharacterId: {
        ...state.body.byCharacterId,
        ...adjustedRecruit.bundle.bodies,
      },
    },
    social: {
      ...state.social,
      relationships: {
        ...state.social.relationships,
        ...adjustedRecruit.bundle.relationships,
      },
      ntrProgress: {
        ...state.social.ntrProgress,
        ...adjustedRecruit.socialNtrProgress,
      },
      partnerProgress: {
        ...state.social.partnerProgress,
        ...adjustedRecruit.socialPartnerProgress,
      },
    },
    equipment: {
      byCharacterId: {
        ...state.equipment.byCharacterId,
        ...adjustedRecruit.bundle.equipment,
      },
    },
  };

  const eventLines = recruitBuyEventLinesForPurchase(nextState, listing);

  return {
    ok: true,
    state: nextState,
    session: {
      ...session,
      recruit: createRecruitSession(definitions, nextState),
    },
    message: `《${targetAndParticle(recruitedDisplayName)} 계약했습니다》`,
    eventLines,
  };
}
