import { Artist } from "src/app/models/artist.model"

export interface ArtistDirectoryFilter {
    text: string;
  }

export interface ArtistDirectoryState {
    artists: Artist[],
    artistDirectoryFilter: ArtistDirectoryFilter
}

export const initialState: ArtistDirectoryState = {
    artists: [],
    artistDirectoryFilter: {
        text: ''
    }
}