const mongoose = require("mongoose");

const qnaTagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Qnatag = mongoose.model("Qnatag", qnaTagSchema);
