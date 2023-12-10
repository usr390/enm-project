import { Action, createReducer, on } from "@ngrx/store";
import { logInSuccessResponse, logOut, logInErrorResponse, rehydrateFromBrowserLocalStorage, updateForm, createUserSuccessResponse, createUserRequest, createUserErrorResponse } from "./auth.actions";
import { enmPlusMonthlySubscriptionPaymentSuccessReponse } from "../payment/payment.actions";
import {AuthState, initialState} from './auth.state'

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
    on(createUserRequest, (state) => {
        return {
            ...state,
            createUserProcessing: true,
        }
    }),
    on(createUserErrorResponse, (state) => {
        return {
            ...state,
            createUserProcessing: false,
        }
    }),
    on(createUserSuccessResponse, (state, { createUserSuccessResponse }) => {
        return {
            ...state,
            user: createUserSuccessResponse.user,
            logInErrorResponse: null,
            createUserProcessing: false,
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