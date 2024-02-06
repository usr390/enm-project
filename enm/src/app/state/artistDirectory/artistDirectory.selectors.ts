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


export const selectSortedArtists = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    return artists.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
);

export const selectSortedArtistsWithPendingLast = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    return artists.slice().sort((a, b) => {
      // Check if either artist has a 'pending' link
      const aIsPending = a.link === 'pending';
      const bIsPending = b.link === 'pending';

      // If both have 'pending' or neither, sort alphabetically
      if (aIsPending === bIsPending) {
        return a.name.localeCompare(b.name);
      }

      // If only a is pending, put a after b
      if (aIsPending) return 1;

      // If only b is pending, put a before b
      return -1;
    });
  }
);

export const selectSortedArtistsWithEnhancedSorting = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    return artists.slice().sort((a, b) => {
      // Priority for RGV location
      const aIsRGV = a.location === 'RGV';
      const bIsRGV = b.location === 'RGV';

      // Check if either artist has a 'pending' link
      const aIsPending = a.link === 'pending';
      const bIsPending = b.link === 'pending';

      // RGV artists come first
      if (aIsRGV && !bIsRGV) return -1;
      if (!aIsRGV && bIsRGV) return 1;

      // For non-RGV artists, sort by location abbreviation first, then by name
      if (!aIsRGV && !bIsRGV) {
        if (a.location !== b.location) {
          return a.location.localeCompare(b.location); // Sort by location if they're different
        }
        // If locations are the same, sort by name
        return a.name.localeCompare(b.name);
      }

      // Sorting non-RGV artists with valid links before 'pending' links, if both are not RGV
      if (aIsPending !== bIsPending) {
        return aIsPending ? 1 : -1; // Pending links go later
      }

      // If both have the same link status and are not RGV (handled above), or both are RGV
      // Sort alphabetically by name
      return a.name.localeCompare(b.name);
    });
  }
);




export const selectFilter = createSelector(
  selectFeature,
  (state: ArtistDirectoryState): ArtistDirectoryFilter => state.artistDirectoryFilter
);

export const selectArtistDirectoryState = createFeatureSelector<ArtistDirectoryState>('artistDirectory');
export const selectArtists = createSelector(selectArtistDirectoryState, (state) => state.entities)

export const selectFiltered = createSelector(
  selectSortedArtistsWithEnhancedSorting,
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
