import mongoose from "mongoose";

/* Summary
   a Log entry represents a recorded event in the system, typically used to track user actions,
   API requests, or other relevant system activity.

   the fields stored here can vary depending on the logging context but may include information
   such as the user's name, location details, links, or other metadata captured at the time
   the log was created.
*/

const Schema = mongoose.Schema;

export const LogSchema = new Schema({
    endpoint: { type: String, required: true },
    method: { type: String, required: true },
    username: { type: String, default: "Unknown" },
    timestamp: { type: Date, default: Date.now },
    query: { type: Object, default: {} },
    headers: { type: Object, default: {} },
    clientIP: { type: String },
    userAgent: { type: String },
});

const LogModel = mongoose.model("Log", LogSchema);

export default LogModel;