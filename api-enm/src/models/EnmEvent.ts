import mongoose from "mongoose";
import { VenueSchema } from "./Venue";
import { ArtistSchema } from "./Artist";

/* summary
    an enmEvent represents what users would typically consider a music event local to their area.
    examples include shows performed by local artists/bands, concerts for touring musicians, or
    seasonal music festivals

    "location" is the name of venue, bar, club, community center, or any other establishment hosting the event
*/

const Schema = mongoose.Schema;

const EnmEventSchema = new Schema({
    tags: [String],
    venue: VenueSchema,
    dateTime: Date,
    cover: Number,
    artists: [ArtistSchema],
    creationDateTime: Date,
});

const EnmEventModel = mongoose.model("EnmEvent", EnmEventSchema);

export default EnmEventModel;