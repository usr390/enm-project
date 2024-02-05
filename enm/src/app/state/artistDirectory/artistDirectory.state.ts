import { Artist } from "src/app/models/artist.model"

export interface ArtistDirectoryState {
    artists: Artist[],
}

export const initialState: ArtistDirectoryState = {
    artists: [],
}