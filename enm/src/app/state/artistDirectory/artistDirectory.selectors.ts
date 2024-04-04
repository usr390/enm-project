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

export const selectSortedArtistsWithEnhancedSorting2 = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    // Example of priorityArtists array
    const priorityArtists = [
      'Havrath',
      'Glare', 
      'Twin Tribes',
      'Dios Del Ghetto',
      'EDWINVOYAGER',
      'Chulita Vinyl Club',
      'Inconvenient Truth',
      'SKA',
      'Toro Bravo',
      'Maere (Mære)',
      'Bison',
      'The Objects',
      'Brag',
      'Milklace',
      'Supermarket',
      'Lil Duende',
      'Bummertrash',
      'Violetta',
      'Worst Behavior',
      'Italia',
      'Cat Bully Club',
      'Queen Killah Bee',
      'Riley!',
      'The Polybius Cabinet'
    ];

    // Check if the artist has a non-pending streaming platform link
    const isStreamingArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'spotify' || key === 'apple' || key === 'bandcamp' ||
             key === 'soundcloud' || key === 'mixcloud')) {
          return true;
        }
      }
      return false;
    };

    // Check if the artist has a non-pending social media link
    const isSocialMediaArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'instagram' || key === 'facebook' || key === 'youtube')) {
          return true;
        }
      }
      return false;
    };

    // Prioritize artists based on predefined list, location, streaming, and social media presence
    return artists.filter(artist => artist.location === 'RGV').sort((a, b) => {
      const aPriorityIndex = priorityArtists.indexOf(a.name);
      const bPriorityIndex = priorityArtists.indexOf(b.name);

      // Check if either artist is in the priority list
      if (aPriorityIndex !== -1 && bPriorityIndex === -1) {
        return -1; // a before b
      } else if (aPriorityIndex === -1 && bPriorityIndex !== -1) {
        return 1; // b before a
      } else if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
        // If both are in the priority list, sort them based on their order in the list
        return aPriorityIndex - bPriorityIndex;
      }

      const aIsFromRGV = a.location === 'RGV';
      const bIsFromRGV = b.location === 'RGV';
      const aIsStreaming = isStreamingArtist(a);
      const bIsStreaming = isStreamingArtist(b);
      const aIsSocialMedia = isSocialMediaArtist(a);
      const bIsSocialMedia = isSocialMediaArtist(b);

      // Prioritize RGV artists first
      if (aIsFromRGV && !bIsFromRGV) {
        return -1; // a before b
      } else if (!aIsFromRGV && bIsFromRGV) {
        return 1; // b before a
      } else {
        // If both are from RGV or both are not, proceed with previous priorities
        if (aIsStreaming && !bIsStreaming) {
          return -1;
        } else if (!aIsStreaming && bIsStreaming) {
          return 1;
        } else if (!aIsStreaming && !bIsStreaming && aIsSocialMedia && !bIsSocialMedia) {
          return -1;
        } else if (!aIsStreaming && !bIsStreaming && !aIsSocialMedia && bIsSocialMedia) {
          return 1;
        } else {
          // Alphabetically sort if both are in the same category
          return a.name.localeCompare(b.name);
        }
      }
    });
  }
);

export const selectSortedArtistsWithEnhancedSorting = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    // Check if the artist has a non-pending streaming platform link
    const isStreamingArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'spotify' || key === 'apple' || key === 'bandcamp' ||
             key === 'soundcloud' || key === 'mixcloud')) {
          return true;
        }
      }
      return false;
    };

    // Check if the artist has a non-pending social media link
    const isSocialMediaArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'instagram' || key === 'facebook' || key === 'youtube')) {
          return true;
        }
      }
      return false;
    };

    // Prioritize artists based on location, streaming, and social media presence
    return artists.filter(artist => artist.location === 'RGV').sort((a, b) => {
      const aIsFromRGV = a.location === 'RGV';
      const bIsFromRGV = b.location === 'RGV';
      const aIsStreaming = isStreamingArtist(a);
      const bIsStreaming = isStreamingArtist(b);
      const aIsSocialMedia = isSocialMediaArtist(a);
      const bIsSocialMedia = isSocialMediaArtist(b);

      // Prioritize RGV artists first
      if (aIsFromRGV && !bIsFromRGV) {
        return -1; // a before b
      } else if (!aIsFromRGV && bIsFromRGV) {
        return 1; // b before a
      } else {
        // If both are from RGV or both are not, proceed with previous priorities
        if (aIsStreaming && !bIsStreaming) {
          return -1;
        } else if (!aIsStreaming && bIsStreaming) {
          return 1;
        } else if (!aIsStreaming && !bIsStreaming && aIsSocialMedia && !bIsSocialMedia) {
          return -1;
        } else if (!aIsStreaming && !bIsStreaming && !aIsSocialMedia && bIsSocialMedia) {
          return 1;
        } else {
          // Alphabetically sort if both are in the same category
          return a.name.localeCompare(b.name);
        }
      }
    });

    // return artists
  }
);

export const selectSortedArtistsWithEnhancedSorting2NonRGV = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    // Example of priorityArtists array
    const priorityArtists = [
      'Havrath',
      'Glare', 
      'Twin Tribes',
      'Dios Del Ghetto',
      'EDWINVOYAGER',
      'Chulita Vinyl Club',
      'Inconvenient Truth',
      'SKA',
      'Toro Bravo',
      'Maere (Mære)',
      'Bison',
      'The Objects',
      'Brag',
      'Milklace',
      'Supermarket',
      'Lil Duende',
      'Bummertrash',
      'Violetta',
      'Worst Behavior',
      'Italia',
      'Cat Bully Club',
      'Queen Killah Bee',
      'Riley!',
      'The Polybius Cabinet'
    ];

    // Check if the artist has a non-pending streaming platform link
    const isStreamingArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'spotify' || key === 'apple' || key === 'bandcamp' ||
             key === 'soundcloud' || key === 'mixcloud')) {
          return true;
        }
      }
      return false;
    };

    // Check if the artist has a non-pending social media link
    const isSocialMediaArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'instagram' || key === 'facebook' || key === 'youtube')) {
          return true;
        }
      }
      return false;
    };

    // Prioritize artists based on predefined list, location, streaming, and social media presence
    return artists.filter(artist => artist.location !== 'RGV').sort((a, b) => {
      const aPriorityIndex = priorityArtists.indexOf(a.name);
      const bPriorityIndex = priorityArtists.indexOf(b.name);

      // Check if either artist is in the priority list
      if (aPriorityIndex !== -1 && bPriorityIndex === -1) {
        return -1; // a before b
      } else if (aPriorityIndex === -1 && bPriorityIndex !== -1) {
        return 1; // b before a
      } else if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
        // If both are in the priority list, sort them based on their order in the list
        return aPriorityIndex - bPriorityIndex;
      }

      const aIsFromRGV = a.location === 'RGV';
      const bIsFromRGV = b.location === 'RGV';
      const aIsStreaming = isStreamingArtist(a);
      const bIsStreaming = isStreamingArtist(b);
      const aIsSocialMedia = isSocialMediaArtist(a);
      const bIsSocialMedia = isSocialMediaArtist(b);

      // Prioritize RGV artists first
      if (aIsFromRGV && !bIsFromRGV) {
        return -1; // a before b
      } else if (!aIsFromRGV && bIsFromRGV) {
        return 1; // b before a
      } else {
        // If both are from RGV or both are not, proceed with previous priorities
        if (aIsStreaming && !bIsStreaming) {
          return -1;
        } else if (!aIsStreaming && bIsStreaming) {
          return 1;
        } else if (!aIsStreaming && !bIsStreaming && aIsSocialMedia && !bIsSocialMedia) {
          return -1;
        } else if (!aIsStreaming && !bIsStreaming && !aIsSocialMedia && bIsSocialMedia) {
          return 1;
        } else {
          // Alphabetically sort if both are in the same category
          return a.name.localeCompare(b.name);
        }
      }
    });
  }
);

export const selectSortedArtistsWithEnhancedSortingNonRGV = createSelector(
  selectAll,
  (artists: Artist[]): Artist[] => {
    // Check if the artist has a non-pending streaming platform link
    const isStreamingArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'spotify' || key === 'apple' || key === 'bandcamp' ||
             key === 'soundcloud' || key === 'mixcloud')) {
          return true;
        }
      }
      return false;
    };

    // Check if the artist has a non-pending social media link
    const isSocialMediaArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'instagram' || key === 'facebook' || key === 'youtube')) {
          return true;
        }
      }
      return false;
    };

    // Prioritize artists based on location, streaming, and social media presence
    return artists.filter(artist => artist.location !== 'RGV').sort((a, b) => {
      const aIsFromRGV = a.location === 'RGV';
      const bIsFromRGV = b.location === 'RGV';
      const aIsStreaming = isStreamingArtist(a);
      const bIsStreaming = isStreamingArtist(b);
      const aIsSocialMedia = isSocialMediaArtist(a);
      const bIsSocialMedia = isSocialMediaArtist(b);

      // Prioritize RGV artists first
      if (aIsFromRGV && !bIsFromRGV) {
        return -1; // a before b
      } else if (!aIsFromRGV && bIsFromRGV) {
        return 1; // b before a
      } else {
        // If both are from RGV or both are not, proceed with previous priorities
        if (aIsStreaming && !bIsStreaming) {
          return -1;
        } else if (!aIsStreaming && bIsStreaming) {
          return 1;
        } else if (!aIsStreaming && !bIsStreaming && aIsSocialMedia && !bIsSocialMedia) {
          return -1;
        } else if (!aIsStreaming && !bIsStreaming && !aIsSocialMedia && bIsSocialMedia) {
          return 1;
        } else {
          // Alphabetically sort if both are in the same category
          return a.name.localeCompare(b.name);
        }
      }
    });
  }
);

export const selectLoading = createSelector(
  selectFeature,
  (state: ArtistDirectoryState): boolean => state.loading
);

export const selectFilter = createSelector(
  selectFeature,
(state: ArtistDirectoryState): ArtistDirectoryFilter => state.artistDirectoryFilter
);

export const selectFilterText = createSelector(
  selectFeature,
  (state: ArtistDirectoryState): string => state.artistDirectoryFilter.text
);

export const selectArtistDirectoryState = createFeatureSelector<ArtistDirectoryState>('artistDirectory');

export const selectArtists = createSelector(selectArtistDirectoryState, (state) => state.entities)

export const selectFiltered = createSelector(
  selectSortedArtistsWithEnhancedSorting,
  selectFilter,
  (artists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredArtists = artists;

    // Apply text filter
    if (filter.text) {
      const normalizedFilter = normalizeText(filter.text);
      filteredArtists = filteredArtists.filter(artist => {
        // Check if filter text is in artist's name
        const nameMatch = normalizeText(artist.name).includes(normalizedFilter);
        // Check if any of artist's links match the filter text as a platform, assuming non-'pending'
        const platformMatch = Object.entries(artist.links).some(([key, value]) =>
          normalizeText(key).includes(normalizedFilter) && value !== 'pending'
        );  
        return nameMatch || platformMatch;
      });
    }

    // Apply 'recently listed' logic using slice for artists
    if (filter.recentlyListed) {
      // Assuming 'filteredArtists' is sorted with the most recently added at the end.
      // This will grab the last 50 elements from the array.
      filteredArtists = filteredArtists.slice(-50).reverse();
    }

    return filteredArtists;
  }
);

export const selectFilteredRecentlyTouredArtists = createSelector(
  selectSortedArtistsWithEnhancedSortingNonRGV,
  selectFilter,
  (artists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredArtists = artists;

    // Apply text filter
    if (filter.text) {
      const normalizedFilter = normalizeText(filter.text);
      filteredArtists = filteredArtists.filter(artist => {
        // Check if filter text is in artist's name
        const nameMatch = normalizeText(artist.name).includes(normalizedFilter);
        // Check if any of artist's links match the filter text as a platform, assuming non-'pending'
        const platformMatch = Object.entries(artist.links).some(([key, value]) =>
          normalizeText(key).includes(normalizedFilter) && value !== 'pending'
        );  
        return nameMatch || platformMatch;
      });
    }

    return filteredArtists;
  }
);

export const selectFilteredForVendingEvents = createSelector(
  selectSortedArtistsWithEnhancedSorting2,
  selectFilter,
  (artists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredArtists = artists;

    // Apply text filter
    if (filter.text) {
      const normalizedFilter = normalizeText(filter.text);
      filteredArtists = filteredArtists.filter(artist => {
        // Check if filter text is in artist's name
        const nameMatch = normalizeText(artist.name).includes(normalizedFilter);
        // Check if any of artist's links match the filter text as a platform, assuming non-'pending'
        const platformMatch = Object.entries(artist.links).some(([key, value]) =>
          normalizeText(key).includes(normalizedFilter) && value !== 'pending'
        );  
        return nameMatch || platformMatch;
      });
    }

    return filteredArtists;
  }
);

export const selectFilteredRecentlyToured = createSelector(
  selectSortedArtistsWithEnhancedSortingNonRGV,
  selectFilter,
  (artists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredArtists = artists;

    // Apply text filter
    if (filter.text) {
      const normalizedFilter = normalizeText(filter.text);
      filteredArtists = filteredArtists.filter(artist => {
        // Check if filter text is in artist's name
        const nameMatch = normalizeText(artist.name).includes(normalizedFilter);
        // Check if any of artist's links match the filter text as a platform, assuming non-'pending'
        const platformMatch = Object.entries(artist.links).some(([key, value]) =>
          normalizeText(key).includes(normalizedFilter) && value !== 'pending'
        );  
        return nameMatch || platformMatch;
      });
    }

    return filteredArtists;
  }
);

export const selectFilteredRecentlyTouredForVendingEvents = createSelector(
  selectSortedArtistsWithEnhancedSorting2NonRGV,
  selectFilter,
  (artists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredArtists = artists;

    // Apply text filter
    if (filter.text) {
      const normalizedFilter = normalizeText(filter.text);
      filteredArtists = filteredArtists.filter(artist => {
        // Check if filter text is in artist's name
        const nameMatch = normalizeText(artist.name).includes(normalizedFilter);
        // Check if any of artist's links match the filter text as a platform, assuming non-'pending'
        const platformMatch = Object.entries(artist.links).some(([key, value]) =>
          normalizeText(key).includes(normalizedFilter) && value !== 'pending'
        );  
        return nameMatch || platformMatch;
      });
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

export const selectFilteredArtistDirectoryCountForRecentlyTouredArtists = createSelector(
  selectFilteredRecentlyTouredArtists,
  (filteredArtistDirectory: Artist[]): number => {
    return filteredArtistDirectory.length;
  }
);