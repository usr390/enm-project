import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BlogSchema = new Schema({
    title: String,
    body: String,
    date: String
});

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;