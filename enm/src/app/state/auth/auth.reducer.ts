import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { NullableUser } from "src/app/models/user.model";
import { logInSuccessResponse, logOut, logInErrorResponse, rehydrateFromBrowserLocalStorage, updateForm } from "./auth.actions";
import { LogInErrorResponse } from "src/app/models/logInErrorResponse.model";
import { enmPlusMonthlySubscriptionPaymentSuccessReponse } from "../payment/payment.actions";

export interface AuthState {
    user: NullableUser,
    logInErrorResponse: LogInErrorResponse,
}

export const initialState: AuthState = {
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
    }),
    on(rehydrateFromBrowserLocalStorage, (state, { user, logInErrorResponse }) => {
        return {
            ...state,
            user: user,
            logInErrorResponse: logInErrorResponse
        }
    }),
    on(enmPlusMonthlySubscriptionPaymentSuccessReponse, (state, { user }) => {
        if (user) {
            return {
                ...state,
                user: {
                    ...user,
                    plus: true
                }
            };
        }
        return state;
    }),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorResponse = createSelector(selectAuthState, (state) => state.logInErrorResponse)
