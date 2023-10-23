import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    plus: Boolean,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;