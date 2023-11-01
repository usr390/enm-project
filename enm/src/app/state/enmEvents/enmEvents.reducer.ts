import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { enmEventListRequestErrorResponse, enmEventListRequestSuccessResponse, selectEventFromEventList } from "./enmEvents.actions";
import { EnmEvents, EnmEventsState, initialState } from "./enmEvent.state";


const _enmEventsReducer = createReducer(
    initialState,
    on(selectEventFromEventList, (state, selectEventFromEventList ) => {
        return {
            ...state,
            selectedEnmEvent: selectEventFromEventList._id
        }
    }),
    on(enmEventListRequestSuccessResponse, (state, { enmEvents }) => {
        const entities: EnmEvents = {};
        enmEvents.forEach((enmEvent) => (entities[enmEvent._id] = enmEvent));
        return {
          ...state,
          entities,
        };
    }),
    on(enmEventListRequestErrorResponse, (state, { error }) => {
        return {
            ...state,
            enmEventListRequestErrorResponse: error,
        }
    }),
);

export function enmEventsReducer(state: EnmEventsState | undefined, action: Action) {
    return _enmEventsReducer(state, action)
}
