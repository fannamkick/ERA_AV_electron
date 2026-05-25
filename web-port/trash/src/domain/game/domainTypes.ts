export type CharacterId = number;
export type LegacyIndex = number;
export type LegacyString = string;
export type NumericMap = Readonly<Record<LegacyIndex, number>>;
export type StringMap = Readonly<Record<LegacyIndex, LegacyString>>;

export type GameDomainId =
  | 'content'
  | 'run'
  | 'world'
  | 'people'
  | 'social'
  | 'economy'
  | 'inventory'
  | 'equipment'
  | 'interaction'
  | 'session'
  | 'feature'
  | 'script'
  | 'legacyCompatibility';

export type DomainResidency =
  | 'catalog'
  | 'persistent'
  | 'session'
  | 'scratch'
  | 'derived'
  | 'compatibility';

export type DomainScope =
  | 'catalog'
  | 'run'
  | 'global'
  | 'character'
  | 'characterDerived'
  | 'socialPair'
  | 'roleBinding'
  | 'featureSession'
  | 'localFrame'
  | 'scriptFrame'
  | 'compatibility';

export type ActorRole =
  | 'target'
  | 'player'
  | 'master'
  | 'assistant'
  | 'currentTrainer'
  | 'previousTrainer'
  | 'effectReceiver'
  | 'subject'
  | 'object';

export interface ActorMemoryState {
  readonly lastTargetId?: CharacterId;
  readonly lastAssistantId?: CharacterId;
  readonly lastPlayerId?: CharacterId;
}

export interface ActorRoleChange {
  readonly role: ActorRole;
  readonly from?: CharacterId;
  readonly to?: CharacterId;
  readonly source?: string;
}

export interface ActorFrame {
  readonly roles: Partial<Record<ActorRole, CharacterId>>;
  readonly saved?: ActorMemoryState;
  readonly history?: readonly ActorRoleChange[];
}

export interface ContentCatalogState {
  readonly itemNames: StringMap;
  readonly abilityNames: StringMap;
  readonly talentNames: StringMap;
  readonly experienceNames: StringMap;
  readonly markNames: StringMap;
  readonly palamNames: StringMap;
  readonly trainingNames: StringMap;
  readonly baseNames: StringMap;
  readonly sourceNames: StringMap;
  readonly exNames: StringMap;
  readonly equipmentNames: StringMap;
  readonly temporaryEquipmentNames: StringMap;
  readonly flagNames: StringMap;
  readonly characterFlagNames: StringMap;
  readonly temporaryFlagNames: StringMap;
  readonly strings: StringMap;
  readonly palamLevelThresholds: NumericMap;
  readonly experienceLevelThresholds: NumericMap;
}

export interface GameRunState {
  readonly day: NumericMap;
  readonly time: NumericMap;
  readonly phase: string;
  readonly difficulty: number;
  readonly rngSeed?: string;
  readonly actorMemory?: ActorMemoryState;
}

export interface WorldState {
  readonly location?: string;
  readonly tags: readonly string[];
  readonly flags: NumericMap;
  readonly globals: NumericMap;
  readonly globalStrings: StringMap;
  readonly progressBands: NumericMap;
}

export interface EconomyState {
  readonly money: NumericMap;
  readonly debt?: number;
  readonly reputation?: number;
  readonly weeklyIncome?: number;
  readonly weeklyExpense?: number;
}

export interface InventoryState {
  readonly items: NumericMap;
  readonly itemSales: NumericMap;
  readonly bought: NumericMap;
  readonly itemRestrictions: NumericMap;
}

export interface CharacterIdentityState {
  readonly id: CharacterId;
  readonly no: number;
  readonly name: string;
  readonly callName: string;
  readonly nickname?: string;
  readonly owner?: 'player' | 'npc' | 'system';
}

export type CharacterRosterRole =
  | 'master'
  | 'assistant'
  | 'actress'
  | 'slave'
  | 'guest'
  | 'system';

export interface CharacterRoleState {
  readonly current: readonly CharacterRosterRole[];
  readonly historical: readonly CharacterRosterRole[];
  readonly assistantEligible?: boolean;
}

export interface CharacterStatsState {
  readonly base: NumericMap;
  readonly maxBase: NumericMap;
  readonly ability: NumericMap;
  readonly talent: NumericMap;
  readonly experience: NumericMap;
  readonly mark: NumericMap;
  readonly palam: NumericMap;
  readonly ex: NumericMap;
}

export interface CharacterTextState {
  readonly cstr: StringMap;
}

export interface CharacterBodyState {
  readonly stain: NumericMap;
  readonly juel: NumericMap;
  readonly gotJuel: NumericMap;
  readonly nowEx: NumericMap;
}

export interface CharacterFlagState {
  readonly cflag: NumericMap;
}

export interface CharacterState {
  readonly identity: CharacterIdentityState;
  readonly roles?: CharacterRoleState;
  readonly stats: CharacterStatsState;
  readonly text: CharacterTextState;
  readonly body: CharacterBodyState;
  readonly flags: CharacterFlagState;
  readonly tags: readonly string[];
}

export interface PeopleState {
  readonly masterId: CharacterId;
  readonly currentTargetId?: CharacterId;
  readonly assistantIds: readonly CharacterId[];
  readonly ownedCharacterIds: readonly CharacterId[];
  readonly availableCharacterIds: readonly CharacterId[];
  readonly characters: Readonly<Record<CharacterId, CharacterState>>;
}

export interface SocialGraphState {
  readonly relation: Readonly<Record<CharacterId, NumericMap>>;
}

export interface EquipmentState {
  readonly equip: Readonly<Record<CharacterId, NumericMap>>;
  readonly activeModes: NumericMap;
  readonly ownerByMode: Readonly<Record<LegacyIndex, CharacterId | undefined>>;
}

export type InteractionEventKind =
  | 'contact'
  | 'kiss'
  | 'insertion'
  | 'ejaculation'
  | 'pregnancyCheck'
  | 'stainTransfer'
  | 'firstContact'
  | 'clothingChange'
  | 'bodyMutation';

export interface InteractionEvent {
  readonly kind: InteractionEventKind;
  readonly actors: ActorFrame;
  readonly tags: readonly string[];
}

export interface InteractionState {
  readonly pendingEvents: readonly InteractionEvent[];
}

export type FeatureSessionKind =
  | 'training'
  | 'work'
  | 'filming'
  | 'visit'
  | 'mission'
  | 'event'
  | 'achievement'
  | 'clearBonus'
  | 'shop'
  | 'tailor'
  | 'system'
  | 'unknown';

export interface DeclaredNumericLocalState {
  readonly value: number | NumericMap;
  readonly size?: number;
  readonly dynamic?: boolean;
  readonly constant?: boolean;
}

export interface DeclaredStringLocalState {
  readonly value: LegacyString | StringMap;
  readonly size?: number;
  readonly dynamic?: boolean;
  readonly constant?: boolean;
}

export interface MenuListFrameState {
  readonly list: NumericMap;
  readonly page?: number;
  readonly pageEnd?: number;
  readonly maxPage?: number;
  readonly shownum?: number;
  readonly showColumn?: number;
  readonly showLength?: number;
  readonly selectedIndex?: number;
}

export interface ScriptFrameState {
  readonly numericScratch: NumericMap;
  readonly stringScratch: StringMap;
  readonly local: NumericMap;
  readonly locals: StringMap;
  readonly arg: NumericMap;
  readonly args: StringMap;
  readonly result: NumericMap;
  readonly results: StringMap;
  readonly declaredNumericLocals?: Readonly<Record<string, DeclaredNumericLocalState>>;
  readonly declaredStringLocals?: Readonly<Record<string, DeclaredStringLocalState>>;
  readonly listFrames?: Readonly<Record<string, MenuListFrameState>>;
}

export interface FeatureSessionStatusState {
  readonly passoutLevel?: number;
  readonly deferredUserCommand?: number;
  readonly interactionCounters: NumericMap;
  readonly tags?: readonly string[];
}

export interface CommandSequenceState {
  readonly definitions: StringMap;
  readonly displayNames: StringMap;
  readonly activeSequenceId?: LegacyIndex;
  readonly cursor?: number;
  readonly backLabel?: LegacyString;
  readonly repeatLabel?: LegacyString;
}

export interface FeatureSessionState {
  readonly id: string;
  readonly kind: FeatureSessionKind;
  readonly actors: ActorFrame;
  readonly selectedCommand: NumericMap;
  readonly previousCommand: NumericMap;
  readonly nextCommand: NumericMap;
  readonly assistPlay: NumericMap;
  readonly source: NumericMap;
  readonly loseBase: NumericMap;
  readonly up: NumericMap;
  readonly down: NumericMap;
  readonly ejaculation: NumericMap;
  readonly temporaryFlags: NumericMap;
  readonly temporaryEquipment: NumericMap;
  readonly saveStrings: StringMap;
  readonly temporaryStrings: StringMap;
  readonly characterTemporary: Readonly<Record<CharacterId, NumericMap>>;
  readonly derivedItemTypes: NumericMap;
  readonly dataArrays: Readonly<Record<string, NumericMap>>;
  readonly script: ScriptFrameState;
  readonly status?: FeatureSessionStatusState;
  readonly commandSequences?: CommandSequenceState;
}

export interface FeatureSystemState {
  readonly completedEventIds: readonly string[];
  readonly scheduledEventIds: readonly string[];
  readonly completedAchievementIds: readonly string[];
  readonly clearBonusIds: readonly string[];
  readonly commandSequences?: Readonly<Record<string, CommandSequenceState>>;
}

export interface LegacyCompatibilityState {
  readonly rawNumericArrays: Readonly<Record<string, NumericMap>>;
  readonly rawStringArrays: Readonly<Record<string, StringMap>>;
  readonly raw?: Readonly<Record<string, unknown>>;
}

export interface GameDomainSnapshot {
  readonly content: ContentCatalogState;
  readonly run: GameRunState;
  readonly world: WorldState;
  readonly people: PeopleState;
  readonly social: SocialGraphState;
  readonly economy: EconomyState;
  readonly inventory: InventoryState;
  readonly equipment: EquipmentState;
  readonly interaction: InteractionState;
  readonly session?: FeatureSessionState;
  readonly feature: FeatureSystemState;
  readonly legacyCompatibility: LegacyCompatibilityState;
}

export interface GameDomainReader {
  readonly snapshot: GameDomainSnapshot;
  getCharacter(id: CharacterId): CharacterState | undefined;
  resolveRole(role: ActorRole, frame?: ActorFrame): CharacterId | undefined;
  getGlobalFlag(index: LegacyIndex): number;
  getItemCount(index: LegacyIndex): number;
  getRelationship(from: CharacterId, to: CharacterId): number;
}

export interface GameDomainWriter {
  updateCharacter(id: CharacterId, update: Partial<CharacterState>): void;
  setGlobalFlag(index: LegacyIndex, value: number): void;
  setItemCount(index: LegacyIndex, value: number): void;
  setRelationship(from: CharacterId, to: CharacterId, value: number): void;
  enqueueInteraction(event: InteractionEvent): void;
}

export interface GameDomainRuntime extends GameDomainReader, GameDomainWriter {}
