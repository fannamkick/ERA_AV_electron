export type VisitSessionState = {
  readonly selectedPlaceId?: string;
  readonly selectedActionId?: string;
  readonly visiblePlaceIds: readonly string[];
  readonly visibleActionIds: readonly string[];
};

export const initialVisitSessionState: VisitSessionState = {
  visiblePlaceIds: [],
  visibleActionIds: [],
};
