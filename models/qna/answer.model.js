const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    description: {
      type: String,
      required: true,
    },

    voteCount: {
      type: Number,
      default: 0,
    },
    upVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
    downVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Answer", answerSchema);
