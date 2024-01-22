import { Action, createReducer, on } from "@ngrx/store";
import { enmEventListFilter, enmEventListRequest, enmEventListRequestErrorResponse, enmEventListRequestSuccessResponse, selectEventFromEventList } from "./enmEvents.actions";
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
          loaded: false,
          loading: true,
        };
    }),
    on(enmEventListRequestSuccessResponse, (state, { enmEvents }) => {
        const entities: EnmEvents = {};
        enmEvents.forEach((enmEvent) => (entities[enmEvent._id] = enmEvent));
        return {
          ...state,
          entities,
          loaded: true,
          loading: false,
        };
    }),
    on(enmEventListRequestErrorResponse, (state, { error }) => {
        return {
            ...state,
            enmEventListRequestErrorResponse: error,
            loaded: false
        }
    }),
    on(enmEventListFilter, (state, { text, recentlyListed }) => ({
        ...state,
        filter: {
          ...state.filter,
          text,
          recentlyListed
        },
    })),
);

export function enmEventsReducer(state: EnmEventsState | undefined, action: Action) {
    return _enmEventsReducer(state, action)
}
