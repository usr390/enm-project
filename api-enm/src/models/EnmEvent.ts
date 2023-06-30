import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EnmEventSchema = new Schema({
    id: Number,
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    time: Date,
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