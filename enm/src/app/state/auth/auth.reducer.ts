import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { NullableUser } from "src/app/models/user.model";
import { logInSuccessResponse, logOut, logInErrorResponse } from "./auth.actions";
import { LogInErrorResponse } from "src/app/models/logInErrorResponse.model";

export interface State {
    user: NullableUser,
    logInErrorResponse: LogInErrorResponse
}

export const initialState: State = {
    user: null,
    logInErrorResponse: null,
}

const _authReducer = createReducer(
    initialState,
    on(logInSuccessResponse, (state, { logInSuccessResponse }) => {
        return {
            ...state,
            user: logInSuccessResponse.user,
            logInErrorResponse: null,
        }
    }),
    on(logInErrorResponse, (state, { error }) => {
        return {
            ...state,
            logInErrorResponse: error,
            user: null
        }
    }),
    on(logOut, (state) => {
        return {
            ...state,
            user: null,
            logInErrorResponse: null
        }
    })
);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorResponse = createSelector(selectAuthState, (state) => state.logInErrorResponse)