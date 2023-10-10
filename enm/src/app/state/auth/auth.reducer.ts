import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { NullableUser } from "src/app/models/user.model";
import { logInSuccessResponse, logOut, logInErrorResponse, rehydrateFromBrowserLocalStorage, updateForm } from "./auth.actions";
import { LogInErrorResponse } from "src/app/models/logInErrorResponse.model";
import { EnmEventAddFormState } from "src/app/models/enmEventAddFormState";

export interface State {
    user: NullableUser,
    logInErrorResponse: LogInErrorResponse,
    enmEventAddFormState: EnmEventAddFormState
}

export const initialState: State = {
    user: null,
    logInErrorResponse: null,
    enmEventAddFormState: null
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
    }),
    on(rehydrateFromBrowserLocalStorage, (state, { user, logInErrorResponse }) => {
        return {
            ...state,
            user: user,
            logInErrorResponse: logInErrorResponse
        }
    }),
    on(updateForm, (state, { formValue }) => {
        return {
            ...state,
            enmEventAddFormState: formValue
        }
    })
);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorResponse = createSelector(selectAuthState, (state) => state.logInErrorResponse)

export const selectVenue = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.venue)
