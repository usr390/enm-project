export interface EnmEvent {

    //#region summary
        // an 'enm event' represents what users would typically consider an event local to their area.
        // examples include music concerts, art shows, food festivals, etc.
    //#endregion

    "id": number,
    "name": string,
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "startTime": number;
    "endTime"?: number;
    "day": number;
    "month": number;
    "year": number;
    "priceOfEntry": number;

}
