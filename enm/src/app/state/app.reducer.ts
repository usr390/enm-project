import { Action, createReducer, on } from "@ngrx/store";
import { AppState, initialState } from './app.state'
import { rehydrateFromBrowserLocalStorage } from "./app.actions";


const _appReducer = createReducer(
    initialState,
    on(rehydrateFromBrowserLocalStorage, (state, { appState }) => {
        return {
            ...state,
            auth: appState.auth,
            form: appState.form,
            enmEvents: appState.enmEvents
        }
    }),
);

export function appReducer(state: AppState | undefined, action: Action) {
    return _appReducer(state, action)
}