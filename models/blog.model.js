const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://th.bing.com/th/id/R.5416c23d099f40de66137827eeb11ec0?rik=zb9ybRTUjpoesw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_385839.png&ehk=%2bUY2bPDQxxyGg0SYYR81rrZ0Kf5WcFigHNSYNtt1KAY%3d&risl=&pid=ImgRaw&r=0",
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
