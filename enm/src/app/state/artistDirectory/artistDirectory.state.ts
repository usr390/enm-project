import { Artist } from "src/app/models/artist.model"

export interface Artists {
    [id: string]: Artist;
}

export interface ArtistDirectoryFilter {
    text: string;
}

export interface ArtistDirectoryState {
    entities: Artists,
    artistDirectoryFilter: ArtistDirectoryFilter
}

export const initialState: ArtistDirectoryState = {
    entities: {},
    artistDirectoryFilter: {
        text: ''
    }
}