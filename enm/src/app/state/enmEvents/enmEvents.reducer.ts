import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { selectEventFromEventList } from "./enmEvents.actions";

export interface EnmEventsState {
    selectedEnmEvent: string,
}

export const initialState: EnmEventsState = {
    selectedEnmEvent: '',
}

const _authReducer = createReducer(
    initialState,
    on(selectEventFromEventList, (state, selectEventFromEventList ) => {
        return {
            ...state,
            selectedEnmEvent: selectEventFromEventList._id
        }
    }),

);

export function enmEventsReducer(state: EnmEventsState | undefined, action: Action) {
    return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<EnmEventsState>('enmEvents');
