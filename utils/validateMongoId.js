const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");

const isValidMongoId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return new ErrorHandler("This id is not valid", 400);
  }
};

module.exports = isValidMongoId;
