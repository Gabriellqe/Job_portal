const docCatModel = require("../models/docCat.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const { default: slugify } = require("slugify");

const postDocCategory = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const newDocCat = await docCatModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Doc Category created successfully",
      data: newDocCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllDocCategory = asyncHandler(async (req, res, next) => {
  try {
    const allDocCat = await docCatModel.find();

    res.status(200).json({
      success: true,
      message: "Doc Category fetched successfully",
      data: allDocCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getDocCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const docCat = await docCatModel.findById(id);
    if (!docCat) {
      return next(new ErrorHandler("Doc Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Doc Category fetched successfully",
      data: docCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateDocCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const docCat = await docCatModel.findById(id);
    if (!docCat) {
      return next(new ErrorHandler("Doc Category not found", 404));
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateDocCat = await docCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Doc Category updated successfully",
      data: updateDocCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteDocCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const docCat = await docCatModel.findById(id);
    if (!docCat) {
      return next(new ErrorHandler("Doc Category not found", 404));
    }
    await docCatModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Doc Category deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  postDocCategory,
  getAllDocCategory,
  getDocCategory,
  updateDocCategory,
  deleteDocCategory,
};
