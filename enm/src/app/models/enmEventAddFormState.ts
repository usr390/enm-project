import { Venue } from "./venue.model";

interface enmEventAddFormState {
    tags?: string[],
    venue?: Venue,
    date?: Date;
    dateTime?: Date,
    cover?: number,
    artists?: string[]
}

export type EnmEventAddFormState = enmEventAddFormState | null