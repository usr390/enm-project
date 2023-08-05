export interface Venue {
    "name": string,
    "address": string,
    "city": string,
    "state": string,
    "country": string
}

export interface EnmEvent {

    /* summary
        an enmEvent represents what users would typically consider an event local to their area.
        examples include shows performed by local artists/bands, concerts for touring musicians, or
        seasonal music festivals

        "location" is the name of venue, bar, club, community center, or any other establishment hosting the event
    */

    "id": number,
    "name": string,
    "location": string,
    "venue": Venue,
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "dateTime": string;
    "priceOfEntry": number;
    "artists": string[];

}
