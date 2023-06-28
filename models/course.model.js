const mongoose = require("mongoose");

let courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlenght: 3,
      maxlenght: 350,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlenght: 3,
      maxlenght: 2000,
    },
    price: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default:
        "https://th.bing.com/th/id/R.5416c23d099f40de66137827eeb11ec0?rik=zb9ybRTUjpoesw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_385839.png&ehk=%2bUY2bPDQxxyGg0SYYR81rrZ0Kf5WcFigHNSYNtt1KAY%3d&risl=&pid=ImgRaw&r=0",
    },
    category: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    totalHours: {
      type: Number,
      default: 0,
    },
    enrolls: {
      type: String,
      default: 0,
    },
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
