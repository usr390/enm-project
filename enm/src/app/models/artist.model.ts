
export interface Artist {

    /* summary
        artist is an individual, group, band, collective, or other entity that produces music
    */

    "_id": string,
    "name": string,
    "link": string,
    "location": string
    "medium": string
    "status": string
    "links": Record<string, any>,
    "debut": boolean,
    "albumDebut": boolean,
    "lastShow": boolean,
    "comeback": boolean,
    "start": string,
    "genre": [],
    "rgvDebut": boolean,
    "women": boolean,
    "womanfronted": boolean
}
