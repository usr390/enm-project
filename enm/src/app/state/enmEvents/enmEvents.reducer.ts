import { Action, createReducer, on } from "@ngrx/store";
import { enmEventListRequest, enmEventListRequestErrorResponse, enmEventListRequestSuccessResponse, enmEventListSearch, selectEventFromEventList } from "./enmEvents.actions";
import { EnmEvents, EnmEventsState, initialState } from "./enmEvent.state";


const _enmEventsReducer = createReducer(
    initialState,
    on(selectEventFromEventList, (state, selectEventFromEventList ) => {
        return {
            ...state,
            selectedEnmEvent: selectEventFromEventList._id
        }
    }),
    on(enmEventListRequest, (state) => {
        return {
          ...state,
          loading: true,
        };
    }),
    on(enmEventListRequestSuccessResponse, (state, { enmEvents }) => {
        const entities: EnmEvents = {};
        enmEvents.forEach((enmEvent) => (entities[enmEvent._id] = enmEvent));
        return {
          ...state,
          entities,
          loading: false,
        };
    }),
    on(enmEventListRequestErrorResponse, (state, { error }) => {
        return {
            ...state,
            enmEventListRequestErrorResponse: error,
        }
    }),
    on(enmEventListSearch, (state, { text }) => ({
        ...state,
        filter: {
          ...state.filter,
          text,
        },
    })),
);

export function enmEventsReducer(state: EnmEventsState | undefined, action: Action) {
    return _enmEventsReducer(state, action)
}
