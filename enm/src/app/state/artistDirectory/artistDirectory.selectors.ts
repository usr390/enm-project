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

export const selectSortedArtistsWithEnhancedSorting = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    return artists.slice().sort((a, b) => {
      // Separate local (RGV) from non-local artists first
      const aIsLocal = a.location === 'RGV';
      const bIsLocal = b.location === 'RGV';
      
      if (aIsLocal && !bIsLocal) return -1; // Prioritize local artist a over non-local artist b
      if (!aIsLocal && bIsLocal) return 1; // Prioritize local artist b over non-local artist a

      // Check for Spotify, Bandcamp, or Apple Music links next, excluding 'pending'
      const aHasSpotifyOrBandcampOrAppleMusic = (a.links && ((a.links.spotify && a.links.spotify !== 'pending') || (a.links.bandcamp && a.links.bandcamp !== 'pending') || (a.links.apple && a.links.apple !== 'pending')));
      const bHasSpotifyOrBandcampOrAppleMusic = (b.links && ((b.links.spotify && b.links.spotify !== 'pending') || (b.links.bandcamp && b.links.bandcamp !== 'pending') || (b.links.apple && b.links.apple !== 'pending')));

      if (aHasSpotifyOrBandcampOrAppleMusic && !bHasSpotifyOrBandcampOrAppleMusic) return -1;
      if (!aHasSpotifyOrBandcampOrAppleMusic && bHasSpotifyOrBandcampOrAppleMusic) return 1;

      // Then, handle the case for artists both in RGV or both not in RGV
      // This includes prioritizing by specific links, pending status, and name
      if (aIsLocal && bIsLocal) {
        const aHasPriorityLink = ['spotify', 'apple', 'bandcamp'].some(service => a.links && a.links[service]);
        const bHasPriorityLink = ['spotify', 'apple', 'bandcamp'].some(service => b.links && b.links[service]);

        if (aHasPriorityLink && !bHasPriorityLink) return -1;
        if (!aHasPriorityLink && bHasPriorityLink) return 1;

        const aIsPending = a.links && a.links.spotify === 'pending';
        const bIsPending = b.links && b.links.spotify === 'pending';
        if (aIsPending !== bIsPending) {
          return aIsPending ? 1 : -1;
        }

        return a.name.localeCompare(b.name);
      }

      // For non-RGV artists or those without priority links, sort by name
      // Since location is already handled, we directly compare names
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
