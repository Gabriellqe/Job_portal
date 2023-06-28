const userModel = require("../models/user.model");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const sendTokenCookie = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
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
    return next(new ErrorHandler(error.message, 500));
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
const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Block a user
const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { isBlocked } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
      data: updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Update Password
const updatePassword = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.findByIdAndUpdate(_id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please provide old and new password", 400));
    }
    if (oldPassword === newPassword) {
      return next(
        new ErrorHandler("Old password and new password cannot be same", 400)
      );
    }
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Forgot Password token
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User doesn't exists", 400));
  }

  try {
    const resetToken = user.createPasswordResetToken();
    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/reset-password/${resetToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message: `please click on the link to reset your password ${resetUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `Token sent to your email ${user.email} successfully`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Forgot Password action
const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Token is invalid or has expired", 400));
  }
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.password = password;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

module.exports = {
  createUser,
  getAllUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  blockUser,
  updatePassword,
  forgotPassword,
  resetPassword,
};
