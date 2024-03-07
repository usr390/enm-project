import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PromoCodeSchema = new Schema({
    promoCode: String,
    isUsed: Boolean,
    userId: mongoose.Schema.Types.ObjectId,
    activatedAt: Date,
    expiresAt: Date
});

const PromoCodeModel = mongoose.model("PromoCode", PromoCodeSchema);

export default PromoCodeModel;