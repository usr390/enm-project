import { Venue } from "./venue.model";

export interface EnmEvent {

    /* summary
        an enmEvent represents what users would typically consider an event local to their area.
        examples include shows performed by local artists/bands, concerts for touring musicians, or
        seasonal music festivals
    */

    "_id": string,
    "name": string,
    "location": string,
    "tags": string[],
    "venue": Venue,
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "dateTime": string;
    // synonyms
    "priceOfEntry": number;
    "cover": number,
    //
    "artists": string[];
    "creationDateTime": string

}
