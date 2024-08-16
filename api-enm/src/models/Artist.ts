import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinksSchema = new Schema({
    apple: String,
    bandcamp: String,
    youtube: String,
    instagram: String,
    spotify: String,
    facebook: String,
    soundcloud: String,
    tiktok: String,
    x: String,
    self: String,
    tumblr: String,
    twitch: String,
    lastfm: String,
    discogs: String
});



export const ArtistSchema = new Schema({
    name: String,
    link: String,
    location: String,
    status: String,
    debut: Boolean,
    start: String,
    medium: String,
    links: { type: LinksSchema },
    genre: { type: [String] },
    artists: { type: [] },
    end: { type: String, default: "pending" },
    notes: { type: String, default: "" }
});

const ArtistModel = mongoose.model("Artist", ArtistSchema);

export default ArtistModel;