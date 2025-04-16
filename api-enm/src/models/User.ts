import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    plus: Boolean,
    stripeCustomerId: String,
    expires: String,
    appAccountToken_apple: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;