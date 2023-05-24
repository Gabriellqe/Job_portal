const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const sendTokenCookie = require("../utils/jwtToken");

//create a user
const createUser = asyncHandler(async (req, res, next) => {
  const { email, firstname, lastname, mobile, password, profession } = req.body;

  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return next(new ErrorHandler("User already exists", 409));
    }

    const newUser = await userModel.create({
      email,
      firstname,
      lastname,
      mobile,
      password,
      profession,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

//Login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendTokenCookie(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { createUser, getUser, loginUser };
