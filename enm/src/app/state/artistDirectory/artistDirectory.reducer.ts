import { Action, createReducer, on } from "@ngrx/store";
import {ArtistDirectoryState, Artists, initialState} from './artistDirectory.state'
import { artistDirectoryFilter, artistDirectoryRequest, artistDirectoryRequestErrorResponse, artistDirectoryRequestSuccessResponse } from "./artistDirectory.actions";

const _artistDirectoryReducer = createReducer(
    initialState,
    on(artistDirectoryRequest, (state) => {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }),
    on(artistDirectoryRequestSuccessResponse, (state, { artistDirectorySuccessResponse }) => {
      const entities: Artists = {};
      artistDirectorySuccessResponse.artists.forEach((artist) => (entities[artist._id] = artist));
      return {
        ...state,
        entities,
        loaded: true,
        loading: false,
      };
    }),
    on(artistDirectoryRequestErrorResponse, (state, { artistDirectoryErrorResponse }) => {
      return {
          ...state,
          loaded: false
      }
    }),

    on(artistDirectoryFilter, (state, { text, recentlyListed, sortByYearDescending, recentlyToured, rock, punk, metal, edm, rap, jazz, pop, experimental, latin, other }) => ({
        ...state,
        artistDirectoryFilter: {
          ...state.artistDirectoryFilter,
          text,
          recentlyListed,
          sortByYearDescending,
          recentlyToured,
          rock,
          punk,
          metal,
          edm,
          rap,
          jazz,
          pop,
          experimental,
          latin,
          other
        },
    })),
);

export function artistDirectoryReducer(state: ArtistDirectoryState | undefined, action: Action) {
    return _artistDirectoryReducer(state, action)
}