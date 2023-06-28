const docModel = require("../models/documentation.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");

const createDoc = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  try {
    if (!title) {
      return next(new ErrorHandler("Please provide title", 400));
    }

    req.body.slug = slugify(title.toLowerCase());

    const newDoc = await docModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Doc created successfully",
      data: newDoc,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getDocs = asyncHandler(async (req, res, next) => {
  try {
    const allDocs = await docModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All docs found",
      data: allDocs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getDocById = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  try {
    const getDoc = await docModel.findOne({ slug });
    if (!getDoc) {
      return next(new ErrorHandler("Doc not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Doc found",
      data: getDoc,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteDoc = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await docModel.findById(id);
    if (!doc) {
      return next(new ErrorHandler("Doc not found", 404));
    }
    await docModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Doc deleted successfully",
      data: {},
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateDoc = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    if (!title) {
      return next(new ErrorHandler("Please provide title", 400));
    }
    req.body.slug = slugify(title.toLowerCase());

    const updateDoc = await docModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateDoc) {
      return next(new ErrorHandler("Doc not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Doc updated successfully",
      data: updateDoc,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createDoc,
  getDocs,
  getDocById,
  deleteDoc,
  updateDoc,
};
