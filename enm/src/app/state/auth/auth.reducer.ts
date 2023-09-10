import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User, NullableUser } from "src/app/models/user.model";
import { logInSuccess, logInFailure } from "./auth.actions";

export interface State {
    user: NullableUser,
    logInError?: string
}

export const initialState: State = {
    user: {
        username: 'light can',
        password: 'growler123'
    },
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
    })
);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorMessage = createSelector(selectAuthState, (state) => state.logInError)