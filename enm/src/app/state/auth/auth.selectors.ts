import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { AppState } from "../app.state";

export const selectFeature = (state: AppState): AuthState => state.auth;

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(selectAuthState, (state) => state.user)
export const selectLogInErrorResponse = createSelector(selectAuthState, (state) => state.logInErrorResponse)

export const createUserProcessing = createSelector(
  selectFeature,
  (state: AuthState): boolean => state.createUserProcessing
);

export const logInProcessing = createSelector(
  selectFeature,
  (state: AuthState): boolean => state.logInProcessing
);