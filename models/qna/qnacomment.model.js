const mongoose = require("mongoose");

const qnaCommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Qnacomment = mongoose.model("Qnacomment", qnaCommentSchema);
