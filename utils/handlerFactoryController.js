const asyncHandler = require("express-async-handler");
const APIFeatures = require("./apiFeatures");
const ErrorHandler = require("./errorHandler");
const { default: slugify } = require("slugify");

const createOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title, { lower: true });
      }
      const data = await Model.create(req.body);
      res.status(200).json({
        success: true,
        message: "Details posted successfully",
        data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
};

const getAll = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      let filter = {};
      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const data = await features.query;
      res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
};

const getOne = (Model, populateOptions) => {
  return asyncHandler(async (req, res, next) => {
    const { id, slug } = req.params;
    try {
      let query;
      if (id) query = await Model.findById(id);

      if (slug) query = await Model.findOne({ slug });

      if (populateOptions) query = query.populate(populateOptions);

      const data = await query;
      if (!data) {
        return next(new ErrorHandler("Data not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
};

const updateOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title, { lower: true });
      }
      const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        return next(new ErrorHandler("Data not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Updated successfully",
        data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
};

const deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Model.findByIdAndDelete(id);
      if (!data) {
        return next(new ErrorHandler("Data not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
