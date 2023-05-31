const mongoose = require("mongoose");

let documentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: false,
    },
    doc_image: {
      type: String,
      required: false,
      default:
        "https://th.bing.com/th/id/OIP.ppmu-bOuBEEWK_ViGQ6Z4wHaHa?pid=ImgDet&rs=1",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Documentation", documentationSchema);
