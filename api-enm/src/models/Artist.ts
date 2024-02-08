import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ArtistSchema = new Schema({
    name: String,
    link: String,
    location: String,
    status: String,
});

const ArtistModel = mongoose.model("Artist", ArtistSchema);

export default ArtistModel;