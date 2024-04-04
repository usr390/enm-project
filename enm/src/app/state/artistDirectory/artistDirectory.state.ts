import { Artist } from "src/app/models/artist.model"

export interface Artists {
    [id: string]: Artist;
}

export interface ArtistDirectoryFilter {
    text: string;
    recentlyListed: boolean
}

export interface ArtistDirectoryState {
    entities: Artists,
    artistDirectoryFilter: ArtistDirectoryFilter,
    loading: boolean,
    loaded: boolean,
}

export const initialState: ArtistDirectoryState = {
    entities: {},
    artistDirectoryFilter: {
        text: '',
        recentlyListed: false
    },
    loading: false,
    loaded: false,
}