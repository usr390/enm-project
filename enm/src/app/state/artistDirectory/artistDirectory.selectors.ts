import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArtistDirectoryFilter, ArtistDirectoryState } from "./artistDirectory.state";
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

export const selectFilter = createSelector(
  selectFeature,
  (state: ArtistDirectoryState): ArtistDirectoryFilter => state.artistDirectoryFilter
);

export const selectArtistDirectoryState = createFeatureSelector<ArtistDirectoryState>('artistDirectory');
export const selectArtists = createSelector(selectArtistDirectoryState, (state) => state.entities)

export const selectFiltered = createSelector(
  selectAll,
  selectFilter,
  (artists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredArtists = artists;

    console.log(filteredArtists, ' <- filtered artists')
    // Apply text filter
    if (filter.text) {
      const normalizedFilter = normalizeText(filter.text);
      filteredArtists = filteredArtists.filter(artist => 
        normalizeText(artist.name).includes(normalizedFilter)
      );
    }
    return filteredArtists;
  }
);


// function to normalize text by removing special characters, diacritics and converting to lowercase
const normalizeText = (text: string) => {
  const from = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ";
  const to   = "AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn";
  let normalizedText = text.toLowerCase();
  for (let i = 0; i < from.length; i++) {
    normalizedText = normalizedText.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // replace other non-alphanumeric characters
  normalizedText = normalizedText.replace(/[^\w\s]/gi, '');

  return normalizedText;
};

export const selectFilteredArtistDirectoryCount = createSelector(
  selectFiltered,
  (filteredArtistDirectory: Artist[]): number => {
    return filteredArtistDirectory.length;
  }
);