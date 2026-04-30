import { validateGameDefinition, type GameDefinition, type ModuleDiagnostic } from './module';

export type GameRuntime<TCatalog, TState, TSession> = {
  readonly definition: GameDefinition;
  readonly initialCatalog: TCatalog;
  readonly initialState: TState;
  readonly initialSession: TSession;
  readonly diagnostics: readonly ModuleDiagnostic[];
};

type CreateGameRuntimeArgs<TCatalog, TState, TSession> = {
  readonly definition: GameDefinition;
  readonly initialCatalog: TCatalog;
  readonly initialState: TState;
  readonly initialSession: TSession;
  readonly extraDiagnostics?: readonly ModuleDiagnostic[];
};

export function createGameRuntime<TCatalog, TState, TSession>({
  definition,
  initialCatalog,
  initialState,
  initialSession,
  extraDiagnostics = [],
}: CreateGameRuntimeArgs<TCatalog, TState, TSession>): GameRuntime<TCatalog, TState, TSession> {
  return {
    definition,
    initialCatalog,
    initialState,
    initialSession,
    diagnostics: [...validateGameDefinition(definition), ...extraDiagnostics],
  };
}
