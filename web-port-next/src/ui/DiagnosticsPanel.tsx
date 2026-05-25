import type { GameCatalog } from '../catalog/types';
import type { BoundaryDiagnostic } from '../game/boundaries';
import type { GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';
import type { ModuleDiagnostic } from '../kernel/module';
import { SummaryList } from './ScreenPrimitives';

export type EffectLogEntry = {
  readonly id: number;
  readonly effect: GameEffect;
};

type StatusRailProps = {
  readonly catalog: GameCatalog;
  readonly state: GameState;
  readonly session: GameSession;
};

type RuntimeDiagnosticsPanelProps = {
  readonly state: GameState;
  readonly session: GameSession;
  readonly runtimeDiagnostics: readonly ModuleDiagnostic[];
  readonly boundaryDiagnostics: readonly BoundaryDiagnostic[];
  readonly effectLog: readonly EffectLogEntry[];
};

function formatEffect(effect: GameEffect): string {
  if (effect.type === 'save/request') {
    return `저장 요청: ${effect.reason}`;
  }

  return effect.message;
}

function effectTone(effect: GameEffect): string {
  if (effect.type === 'ui/warning') {
    return 'warning';
  }

  if (effect.type === 'ui/log') {
    return effect.severity;
  }

  return 'info';
}

function countRecords(records: readonly Record<string, unknown>[]): number {
  return records.reduce((total, record) => total + Object.keys(record).length, 0);
}

function countSelectedSessionValues(session: GameSession): number {
  return [
    session.shop.selectedListingId,
    session.shop.selectedItemId,
    session.recruit.selectedListingId,
    session.mission.selectedMissionId,
    session.visit.selectedPlaceId,
    session.visit.selectedActionId,
    session.work.selectedWorkId,
    session.work.selectedCharacterId,
    session.shooting.selectedCharacterId,
    session.shooting.selectedSceneId,
    session.interaction.participants.targetId,
    session.interaction.participants.masterId,
    session.interaction.participants.assistantId,
    session.interaction.commandFlow.selectedCommandId,
  ].filter((value) => value !== undefined).length;
}

function countVisibleSessionChoices(session: GameSession): number {
  return (
    session.shop.visibleListingIds.length +
    session.recruit.visibleListingIds.length +
    session.mission.visibleMissionIds.length +
    session.visit.visiblePlaceIds.length +
    session.visit.visibleActionIds.length +
    session.work.visibleWorkIds.length +
    session.work.eligibleCharacterIds.length +
    session.shooting.visibleCharacterIds.length +
    session.shooting.visibleSceneIds.length
  );
}

function countTrainingBuffers(session: GameSession): number {
  return countRecords([
    session.interaction.sources,
    session.interaction.paramDeltas,
    session.interaction.baseLoss,
    session.interaction.resultBuffers.gotJuel,
    session.interaction.resultBuffers.nowEx,
    session.interaction.resultBuffers.ejaculationThresholds,
    session.interaction.resultBuffers.climaxCounters,
  ]);
}

export function StatusRail({ state }: StatusRailProps) {
  const isDay = state.run.clock.currentTimeSlot === 0;
  const itemKindCount = Object.keys(state.inventory.itemCounts).length;

  return (
    <aside className="side-rail" aria-label="사무소 현황판">
      <p className="brand">erAV Next</p>
      <SummaryList
        items={[
          {
            label: '현재 일정',
            value: `${state.run.clock.month}월 ${state.run.clock.week}주차 (${state.run.clock.turn}턴)`,
          },
          {
            label: '활동 시간',
            value: <span className={`time-badge ${isDay ? 'daytime' : 'nighttime'}`}>{isDay ? '낮 (Day)' : '밤 (Night)'}</span>,
          },
          { label: '사무소 자금', value: `${state.economy.account.currentMoney.toLocaleString()} Pt` },
          { label: '소속 여배우', value: `${Object.keys(state.people.characters).length}명` },
          { label: '보유 도구류', value: `${itemKindCount}종` },
        ]}
      />
    </aside>
  );
}


export function RuntimeDiagnosticsPanel({
  state,
  session,
  runtimeDiagnostics,
  boundaryDiagnostics,
  effectLog,
}: RuntimeDiagnosticsPanelProps) {
  const diagnostics = [...runtimeDiagnostics, ...boundaryDiagnostics];

  return (
    <section className="info-grid" aria-label="읽기 전용 진단 패널">
      <article className="panel">
        <div className="section-heading">
          <p>진단</p>
          <h2>상태 요약</h2>
        </div>
        <SummaryList
          items={[
            { label: 'Route', value: session.ui.route },
            { label: 'Save Version', value: state.runtime.saveVersion },
            { label: 'Money', value: `${state.economy.account.currentMoney.toLocaleString()} Pt` },
            { label: 'Missions', value: Object.keys(state.mission.byMissionId).length },
            { label: 'Work Records', value: Object.keys(state.work.assignments).length },
            { label: 'Unlocks', value: Object.keys(state.world.unlocks).length },
          ]}
        />
      </article>

      <article className="panel">
        <div className="section-heading">
          <p>진단</p>
          <h2>세션 요약</h2>
        </div>
        <SummaryList
          items={[
            { label: 'Selected Values', value: countSelectedSessionValues(session) },
            { label: 'Visible Choices', value: countVisibleSessionChoices(session) },
            { label: 'Training Buffers', value: countTrainingBuffers(session) },
            { label: 'Filming Buffer', value: session.shooting.filmingAmount },
            { label: 'Save Text', value: `${session.saveLoad.snapshotText.length}/${session.saveLoad.loadText.length}` },
            { label: 'Pending Events', value: session.interaction.pendingEvents.length },
          ]}
        />
      </article>

      <article className="panel">
        <div className="section-heading">
          <p>검증</p>
          <h2>경계 상태</h2>
        </div>
        <ul className="diagnostic-list">
          {diagnostics.map((diagnostic) => (
            <li className={`diagnostic diagnostic-${diagnostic.severity}`} key={diagnostic.message}>
              <strong>{diagnostic.severity.toUpperCase()}</strong>
              <span>{diagnostic.message}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="panel">
        <div className="section-heading">
          <p>효과 로그</p>
          <h2>최근 결과</h2>
        </div>
        <ul className="effect-list">
          {effectLog.length === 0 && <li>아직 실행한 action이 없습니다.</li>}
          {effectLog.map((entry) => (
            <li className={`effect effect-${effectTone(entry.effect)}`} key={entry.id}>
              {formatEffect(entry.effect)}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
