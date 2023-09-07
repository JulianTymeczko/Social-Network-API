const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  reactionId: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: function (date) {
      return date.toLocaleDateString();
    },
  },
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: [1, "Must be between 1 and 280 characters"],
    maxLength: [280, "Must be between 1 and 280 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: function (date) {
      return date.toLocaleDateString();
    },
  },
  username: { type: String, required: true },
  reactions: [ReactionSchema],
});

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

mongoose.model("Thought", ThoughtSchema);