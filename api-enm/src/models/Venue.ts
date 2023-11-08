import mongoose from "mongoose";

/* summary
    an enmEvent represents what users would typically consider a music event local to their area.
    examples include shows performed by local artists/bands, concerts for touring musicians, or
    seasonal music festivals

    "location" is the name of venue, bar, club, community center, or any other establishment hosting the event
*/

const Schema = mongoose.Schema;

export const VenueSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    link: String,
});

const VenueModel = mongoose.model("Venue", VenueSchema);

export default VenueModel;