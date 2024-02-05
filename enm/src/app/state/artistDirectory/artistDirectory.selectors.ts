import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArtistDirectoryState } from "./artistDirectory.state";
import { AppState } from "../app.state";
import { Artist } from "src/app/models/artist.model";

export const selectFeature = (state: AppState): ArtistDirectoryState => state.artistDirectory;

export const selectEntities = createSelector(
    selectFeature,
    (state: ArtistDirectoryState): { [id: string]: Artist } => state.entities
  );
  
  export const selectAll = createSelector(selectEntities, (entities): Artist[] =>
    Object.values(entities)
  );

export const selectAuthState = createFeatureSelector<ArtistDirectoryState>('artistDirectory');
export const selectArtists = createSelector(selectAuthState, (state) => state.entities)