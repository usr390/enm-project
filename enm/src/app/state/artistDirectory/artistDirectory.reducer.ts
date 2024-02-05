import { Action, createReducer, on } from "@ngrx/store";
import {ArtistDirectoryState, initialState} from './artistDirectory.state'
import { artistDirectoryRequestSuccessResponse } from "./artistDirectory.actions";

const _artistDirectoryReducer = createReducer(
    initialState,
    on(artistDirectoryRequestSuccessResponse, (state, { artistDirectorySuccessResponse }) => {
        return {
            ...state,
            artists: artistDirectorySuccessResponse.artists
        }
    }),
);

export function artistDirectoryReducer(state: ArtistDirectoryState | undefined, action: Action) {
    return _artistDirectoryReducer(state, action)
}