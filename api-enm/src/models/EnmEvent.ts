import mongoose from "mongoose";

/* summary
    an enmEvent represents what users would typically consider a music event local to their area.
    examples include shows performed by local artists/bands, concerts for touring musicians, or
    seasonal music festivals

    "location" is the name of venue, bar, club, community center, or any other establishment hosting the event
*/

const Schema = mongoose.Schema;

const VenueSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    country: String
});

const EnmEventSchema = new Schema({
    id: Number,
    name: String,
    location: String,
    tags: [String],
    venue: VenueSchema,
    address: String,
    city: String,
    state: String,
    country: String,
    dateTime: Date,
    startTime: Number,
    endTime: {
        type: Number,
        required: false
    },
    day: Number,
    month: Number,
    year: Number,
    priceOfEntry: Number,
    artists: [String]
});

const EnmEventModel = mongoose.model("EnmEvent", EnmEventSchema);

export default EnmEventModel;