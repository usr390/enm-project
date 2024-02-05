import { Action, createReducer, on } from "@ngrx/store";
import {ArtistDirectoryState, Artists, initialState} from './artistDirectory.state'
import { artistDirectoryFilter, artistDirectoryRequestSuccessResponse } from "./artistDirectory.actions";

const _artistDirectoryReducer = createReducer(
    initialState,
    on(artistDirectoryRequestSuccessResponse, (state, { artistDirectorySuccessResponse }) => {
        const entities: Artists = {};
        artistDirectorySuccessResponse.artists.forEach((artist) => (entities[artist._id] = artist));
        return {
          ...state,
          entities,
        };
    }),
    on(artistDirectoryFilter, (state, { text }) => ({
        ...state,
        filter: {
          ...state.artistDirectoryFilter,
          text,
        },
    })),
);

export function artistDirectoryReducer(state: ArtistDirectoryState | undefined, action: Action) {
    return _artistDirectoryReducer(state, action)
}