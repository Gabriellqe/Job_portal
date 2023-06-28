const contactModel = require("../models/contact.model");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

//create contact
const createcontact = asyncHandler(async (req, res, next) => {
  try {
    const newcontact = await contactModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "contact created successfully",
      data: newcontact,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get all contacts
const getAllcontacts = asyncHandler(async (req, res, next) => {
  try {
    const contacts = await contactModel.find();
    res.status(200).json({
      success: true,
      message: "All contacts",
      data: contacts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get contact by id
const getcontactById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactModel.findById(id);
    if (!contact) {
      return next(new ErrorHandler("contact not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "contact",
      data: contact,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
//update contact status
const updatecontactStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const contact = await contactModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!contact) {
      return next(new ErrorHandler("contact not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "contact status updated successfully",
      data: contact,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//delete contact
const deletecontactById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactModel.findByIdAndDelete(id);
    if (!contact) {
      return next(new ErrorHandler("contact not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "contact deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createcontact,
  getAllcontacts,
  getcontactById,
  deletecontactById,
  updatecontactStatus,
};
