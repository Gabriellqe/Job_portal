const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);
  next();
});

exports.isAuthenticatedAdmin = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);

  if (req.user.roles !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to access this route", 403)
    );
  }

  next();
});

exports.isAuthenticatedInstructor = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);

  if (req.user.roles !== "instructor") {
    return next(
      new ErrorHandler("You are not authorized to access this route", 403)
    );
  }

  next();
});