import { Artist } from "src/app/models/artist.model"

export interface Artists {
    [id: string]: Artist;
}

export interface ArtistDirectoryFilter {
    text: string;
    recentlyListed: boolean,
    sortByYearDescending: boolean,
    recentlyToured: boolean,
    randomArtist: boolean,
    rock: boolean, 
    punk: boolean, 
    metal: boolean, 
    edm: boolean, 
    rap: boolean, 
    jazz: boolean, 
    pop: boolean, 
    experimental: boolean, 
    latin: boolean, 
    other: boolean
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
        recentlyListed: false,
        sortByYearDescending: false,
        recentlyToured: false,
        randomArtist: false,
        rock: false, 
        punk: false, 
        metal: false, 
        edm: false, 
        rap: false, 
        jazz: false, 
        pop: false, 
        experimental: false, 
        latin: false, 
        other: false
    },
    loading: false,
    loaded: false,
}