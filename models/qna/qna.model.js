const mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
    answer: {
      type: mongoose.Schema.ObjectId,
      ref: "Answer",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Qna = mongoose.model("QNA", qnaSchema);
