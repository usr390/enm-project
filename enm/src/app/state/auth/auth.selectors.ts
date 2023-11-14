import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorResponse = createSelector(selectAuthState, (state) => state.logInErrorResponse)
