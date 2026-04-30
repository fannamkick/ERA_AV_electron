export type ScriptFrameState = {
  readonly numericLocals: Record<string, number>;
  readonly stringLocals: Record<string, string>;
  readonly args: readonly string[];
  readonly results: readonly string[];
  readonly listFrames: Record<string, string>;
};

export const initialScriptFrameState: ScriptFrameState = {
  numericLocals: {},
  stringLocals: {},
  args: [],
  results: [],
  listFrames: {},
};

