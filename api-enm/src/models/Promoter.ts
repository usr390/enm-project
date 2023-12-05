import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PromoterSchema = new Schema({
    name: String,
    link: String,
});

const PromoterModel = mongoose.model("Promoter", PromoterSchema);

export default PromoterModel;