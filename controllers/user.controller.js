const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const sendTokenCookie = require("../utils/jwtToken");
const isValidMongoId = require("../utils/validateMongoId");

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

//Get all users
const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({
      success: true,
      message: "All users",
      data: allUsers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Update user
const updateUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  isValidMongoId(_id);
  const { firstname, lastname, mobile, profession } = req.body;
  try {
    const findUser = await userModel.findById(_id);

    if (!findUser) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    const updateUser = await userModel.findByIdAndUpdate(
      _id,
      {
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        mobile: mobile || user.mobile,
        profession: profession || user.profession,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Get user by id

module.exports = { createUser, getAllUser, loginUser, updateUser, deleteUser };
