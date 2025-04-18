import { Action, createReducer, on } from "@ngrx/store";
import { logInSuccessResponse, logOut, deleteUser, logInErrorResponse, rehydrateFromBrowserLocalStorage, createUserSuccessResponse, createUserRequest, createUserErrorResponse, logInRequest, refreshUserSuccessResponse, deleteUserSuccess, deleteUserFailure } from "./auth.actions";
import { enmPlusMonthlySubscriptionPaymentSuccessReponse } from "../payment/payment.actions";
import {AuthState, initialState} from './auth.state'

const _authReducer = createReducer(
    initialState,
    on(logInRequest, (state) => {
        return {
            ...state,
            logInProcessing: true
        }
    }),
    on(logInSuccessResponse, (state, { logInSuccessResponse }) => {
        return {
            ...state,
            user: logInSuccessResponse.user,
            logInErrorResponse: null,
            logInProcessing: false
        }
    }),
    on(logInErrorResponse, (state, { error }) => {
        return {
            ...state,
            logInErrorResponse: error,
            user: null,
            logInProcessing: false
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
    on(refreshUserSuccessResponse, (state, { refreshUserSuccessResponse }) => {
        return {
            ...state,
            user: refreshUserSuccessResponse.user,
        }
    }),
    on(logOut, (state) => {
        return {
            ...state,
            user: null,
            logInErrorResponse: null
        }
    }),
    on(deleteUser, (state, { userId }) => {
        return {
            ...state,
            logInProcessing: true
        }
    }),
    on(deleteUserSuccess, (state) => {
        return {
            ...state,
            user: null,
            logInErrorResponse: null,
            logInProcessing: false
        }
    }),
    on(deleteUserFailure, (state) => {
        return {
            ...state,
            logInProcessing: false
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