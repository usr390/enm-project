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

export const selectArtistsArray = createSelector(
  selectArtists,
  (artists) => Object.values(artists)
);

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

        // const platformMatch = Object.entries(artist.links).some(([key, value]) =>
        //   normalizeText(key).includes(normalizedFilter) && value !== 'pending'
        // );  

        return nameMatch //|| platformMatch;
      });
    }
    
    // Apply genre filters
    const genreFilters = [
      { key: 'rock', value: filter.rock },
      { key: 'punk', value: filter.punk },
      { key: 'metal', value: filter.metal },
      { key: 'edm', value: filter.edm },
      { key: 'rap', value: filter.rap },
      { key: 'jazz', value: filter.jazz },
      { key: 'pop', value: filter.pop },
      { key: 'experimental', value: filter.experimental },
      { key: 'latin', value: filter.latin },
      { key: 'other', value: filter.other }
    ];

    const activeGenres = genreFilters.filter(genre => genre.value).flatMap(genre => genreMapping[genre.key]);

    if (activeGenres.length > 0) {
      filteredArtists = filteredArtists.filter(artist => 
        artist.genre && artist.genre.some(genre => activeGenres.includes(genre))
      );
    }


    return filteredArtists;
  }
);

export const sortFiltered = createSelector(
  selectFiltered,
  selectFilter,
  (filteredArtists: Artist[], filter: ArtistDirectoryFilter): Artist[] => {
    let filteredAndSortedArtists = filteredArtists;

    // Conditionally apply sorting by 'start' property in descending order
    if (filter.sortByYearDescending) {
      filteredAndSortedArtists = filteredAndSortedArtists.sort((a, b) => {
        return new Date(b.start).getTime() - new Date(a.start).getTime();
      });
    } else {
      // Apply the enhanced sorting logic for the default case
      filteredAndSortedArtists = enhancedSort(filteredArtists);
    }

    return filteredAndSortedArtists;
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

// function getTimestampFromObjectId(objectId: string): number {
//   // Convert the timestamp component of the ObjectId from hexadecimal to a number
//   // Multiply by 1000 to convert the seconds to milliseconds
//   return parseInt(objectId.substring(0, 8), 16) * 1000;
// }
interface GenreMapping {
  [key: string]: string[];
}

const genreMapping: GenreMapping = {
  rock: [
    'rock', 'alternative rock', 'indie rock', 'pop rock', 'psychedelic rock', 'stoner rock', 
    'hard rock', 'glam rock', 'spanish rock', 'soft rock', 'surf rock', 'garage rock', 
    'grunge rock', 'psychedlic rock', 'grunge', 'classic rock', 'texicana', 'death rock', 'doom rock',
    'progressive rock', 'art rock', 'voidgaze', 'ambient rock', 'math rock', 'avant rock', 'post rock',
    'goth rock', 'experimental progressive rock', 'sad rock', 'progressive pop rock', 'chankla-gaze',
    'lofi rock', 'post progressive', 'beach rock'
  ],
  punk: [
    'punk', 'pop punk', 'hardcore punk', 'punk rock', 'egg punk', 'chain punk', 'soft punk',
    'queercore', 'psych punk', 'synth punk', 'emo', 'emocore', 'hardcore rock', 'beatdown',
    'post hardcore', 'easycore', 'new wave', 'digital hardcore', 'hardcore', 'dbeat', 'mangel',
    'melodic hardcore', 'dance punk', 'gulf coast emo'
  ],
  metal: [
    'metal', 'symphonic metal', 'doom metal', 'black\'n\'roll', 'nwobhm', 'avant metal', 
    'brutal death metal', 'thrash metal', 'black metal', 
    'death metal', 'power metal', 'heavy metal', 'groove metal', 'war metal', 
    'slam metal', 'drone metal', 'progressive metal', 'speed metal', 'deathcore', 
    'nu-metalcore', 'blackened death metal', 'blackened deathcore', 'trap metal', 'grind', 'grindcore', 
    'metalcore', 'doomgaze', 'sludge', 'hate metal', 
    'alternative metal', 'experimental metal', 'groove metal', 'voidgaze', 'djent', 'extreme metal',
    'downtempo', 'false grind'
  ],
  edm: [
    'edm', 'techno', 'house', 'dubstep', 'hard techno', 'tech house', 'psytrance', 'deep house', 
    'trance', 'breakcore', 'breakbeat hardcore', 'electronica', 'psychedelic trance', 'digital hardcore'
  ],
  rap: [
    'rap', 'hip hop', 'trap', 'experimental hip hop', 'trill hop', 'sample hop', 'phonk', 'trap metal', 
    'latin rap', 'gangsta rap'
  ],
  experimental: [
    'experimental', 'avant garde', 'avant rock', 'experimental pop', 'experimental progressive rock', 
    'experimental noise', 'experimental rock', 'experimental hip hop', 'experimental metal', 'industrial', 'voidgaze',
    'witch house', 'drone'
  ],
  jazz: ['jazz', 'neosoul'],
  pop: [
    'pop', 'pop rock', 'pop punk', 'indie pop', 'power pop', 'bedroom pop', 'alternative pop', 
    'experimental pop', 'dark pop', 'electronic pop', 'kawaii hip hop', 'synth pop', 'synth rock', 'dream pop',
    'sad pop', 'void pop', 'jangle pop'
  ],
  latin: [
    'latin', 'bolero', 'cumbia', 'norteño', 'latin pop', 'reggaeton', 'regional mexican', 'tropifolk', 
    'texicana', 'perreo'
  ],
  reggae: [
    'reggae', 'dub', 'rocksteady', 'ska', 'dancehall'
  ],
  electronic: [
    'electronic', 'techno', 'dubstep', 'triphop', 'tech house', 'house', 'electronica', 'synthwave', 
    'vaporwave', 'darkwave', 'coldwave', 'ebm', 'idm', 'chiptune', 'acid', 'minimal', 'rhythmic noise',
    'future beats'
  ],
  soul: ['soul', 'neosoul'],
  acoustic: ['acoustic'],
  folk: ['folk', 'americana folk', 'folk pop', 'folk rock', 'folktronica'],
  blues: ['blues'],
  other: [
    'new age', 'kitschwave', 'chiptune. lsdj', 'instrumental', 'ambient', 'psychedelic', 'outsider', 'goth', 
    'disco', 'club', 'no wave', 'midwest', 'lofi', 'neosoul', 'acoustic', 'instrumental', 
    'world music', 'orchestral', 'rhythmic noise', 'dirge', 
    'fusion', 'indie', 'ebm', 'dsmb', 'alternative folk', 'piano', 'lounge'
  ]
};

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

  const enhancedSort = (artists: Artist[]): Artist[] => {
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
  
    const isSocialMediaArtist = (artist: Artist): boolean => {
      for (const key in artist.links) {
        if (artist.links[key] !== 'pending' &&
            (key === 'instagram' || key === 'facebook' || key === 'youtube')) {
          return true;
        }
      }
      return false;
    };
  
    return artists.filter(artist => artist.location === 'RGV').sort((a, b) => {
      const aIsFromRGV = a.location === 'RGV';
      const bIsFromRGV = b.location === 'RGV';
      const aIsStreaming = isStreamingArtist(a);
      const bIsStreaming = isStreamingArtist(b);
      const aIsSocialMedia = isSocialMediaArtist(a);
      const bIsSocialMedia = isSocialMediaArtist(b);
  
      if (aIsFromRGV && !bIsFromRGV) {
        return -1; 
      } else if (!aIsFromRGV && bIsFromRGV) {
        return 1;
      } else {
        if (aIsStreaming && !bIsStreaming) {
          return -1;
        } else if (!aIsStreaming && bIsStreaming) {
          return 1;
        } else if (!aIsStreaming && !bIsStreaming && aIsSocialMedia && !bIsSocialMedia) {
          return -1;
        } else if (!aIsStreaming && !bIsStreaming && !aIsSocialMedia && bIsSocialMedia) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      }
    });
  };