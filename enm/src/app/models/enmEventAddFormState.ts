import { Promoter } from "./promoter.model";
import { Venue } from "./venue.model";

interface enmEventAddFormState {
    tags?: string[],
    venue?: Venue,
    promoter?: Promoter
    date?: Date;
    startTime?: Date;
    dateTime?: Date,
    cover?: number,
    artists?: string[]
}

export type EnmEventAddFormState = enmEventAddFormState | null