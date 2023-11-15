import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectAppState = createSelector(
    (state: AppState) => state,
    (state) => state
);