const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const jwtToken = require("../utils/jwtToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    asyncHandler(async (accessToken, refreshToken, profile, cb) => {
      const data = profile._json;
      try {
        let user = await userModel.findOne({ email: data.email });
        if (user) {
          return cb(null, profile);
        } else {
          const newUser = await userModel.create({
            firstname: data.name,
            lastname: data.given_name,
            user_image: data.picture,
            email: data.email,
            password: data.sub,
            roles: "user",
            mobile: "0000000000",
          });
          return await cb(null, newUser);
        }
      } catch (error) {
        cb(error);
      }
    })
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/*             
  function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      return cb(null, profile);
    }
*/
