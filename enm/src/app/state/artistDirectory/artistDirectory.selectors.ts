import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArtistDirectoryState } from "./artistDirectory.state";
import { AppState } from "../app.state";

export const selectFeature = (state: AppState): ArtistDirectoryState => state.artistDirectory;

export const selectAuthState = createFeatureSelector<ArtistDirectoryState>('artistDirectory');
export const selectArtists = createSelector(selectAuthState, (state) => state.artists)