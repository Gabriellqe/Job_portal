const newsLetterModel = require("../models/newLetter.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

const subscribeNewsLetter = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new ErrorHandler("Please provide email", 400));
    }
    const findemail = await newsLetterModel.findOne({ email });
    if (findemail) {
      return next(new ErrorHandler("Email already subscribed", 400));
    }

    const newSubscriber = await newsLetterModel.create({ email });
    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: newSubscriber,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const unsubscribeNewsLetter = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const subscriber = await newsLetterModel.findById(id);
    if (!subscriber) {
      return next(new ErrorHandler("Subscriber not found", 404));
    }

    const deletedSubscriber = await newsLetterModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllSubscribers = asyncHandler(async (req, res, next) => {
  try {
    const subscribers = await newsLetterModel.find();
    res.status(200).json({
      success: true,
      message: "All subscribers",
      data: subscribers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  getAllSubscribers,
  subscribeNewsLetter,
  unsubscribeNewsLetter,
};
