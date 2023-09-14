import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { NullableUser } from "src/app/models/user.model";
import { logInSuccess, logInFailure, logOut } from "./auth.actions";

export interface State {
    user: NullableUser,
    logInError?: string
}

export const initialState: State = {
    user: null,
}

const _authReducer = createReducer(
    initialState,
    on(logInSuccess, (state, { logInSuccessResponse }) => {
        return {
            ...state,
            user: logInSuccessResponse.user
        }
    }),
    on(logInFailure, (state, { error }) => {
        return {
            ...state,
            logInError: error,
            user: null
        }
    }),
    on(logOut, (state) => {
        return {
            ...state,
            user: null
        }
    })
);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorMessage = createSelector(selectAuthState, (state) => state.logInError)