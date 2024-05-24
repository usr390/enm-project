import { Artist } from "./artist.model";
import { Venue } from "./venue.model";
import { Promoter } from "./promoter.model";

export interface EnmEvent {

    /* summary
        an enmEvent represents what users would typically consider an event local to their area.
        examples include shows performed by local artists/bands, concerts for touring musicians, or
        seasonal music festivals

        'synonyms' are semantically similar properties. they exist for backward compatibility
        (specifically so events created with older schemas are still displayed)
    */

    "_id": string,
    "tags": string[],
    "name": string,
    // synonyms
    "location": string, "address": string, "city": string, "state": string, "country": string,
    "venue": Venue,
    //
    // synonyms
    "priceOfEntry": number;
    "cover": number,
    //
    "date": string,
    "doorTime": string,
    "dateTime": string;
    "artists": Artist[];
    "creationDateTime": string,
    "promoter": Promoter,
    "isRecentlyListed": boolean,
    "canceled": boolean,
    "flyer": string,
    "updates": any,
    "postponed": boolean
    "rsvp": string
}
