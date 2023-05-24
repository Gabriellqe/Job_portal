const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const expressAsyncHandler = require("express-async-handler");

exports.isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);
  next();
});
