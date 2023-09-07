const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter a valid email address",
    ],
  },
  thoughts: [{ type: mongoose.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

mongoose.model("User", UserSchema);