const mongoose = require("mongoose");

const TutorialSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    tutorialCategory: { type: String, require: true },
    tutorialCategorySlug: { type: String, required: true },
    topicName: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    keywords: { type: [], require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutorial", TutorialSchema);
