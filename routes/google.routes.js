const googleRouter = require("express").Router();
const passport = require("passport");
//const { googleAuthController } = require('../controllers/googleAuth.controller');
const jwtToken = require("../utils/jwtToken");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

googleRouter.get(
  "/login/success",
  asyncHandler(async (req, res, next) => {
    if (req.user) {
      const findUser = await userModel.findOne({ email: req.user._json.email });
      if (findUser) {
        res.status(200).json({
          status: true,
          message: "User has successfully authenticated",
          token: findUser.getJwtToken(),
          role: findUser.roles,
          username: findUser.firstname,
          user_image: findUser.user_image,
          from: "google",
        });
      } else {
        return next(new ErrorHandler("User not found", 401));
      }
    } else {
      return next(
        new ErrorHandler("Something went wrong in login success", 500)
      );
    }
  })
);

googleRouter.get(
  "/login/failed",
  asyncHandler(async (req, res, next) => {
    res.status(401).json({
      success: false,
      message: "User failed to authenticate.",
    });
  })
);

googleRouter.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

googleRouter.get(
  "/logout",
  asyncHandler(async (req, res, next) => {
    req.logout();
    res.redirect("/");
  })
);

module.exports = googleRouter;
