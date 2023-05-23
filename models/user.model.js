const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    user_imgage: {
      type: String,
      required: true,
      default:
        "https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0",
    },
    mobile: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    roles: { type: String, required: true },
    profession: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
