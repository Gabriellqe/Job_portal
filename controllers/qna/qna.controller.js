const questionModel = require("../../models/qna/question.model");
const answerModel = require("../../models/qna/answer.model");
const qnaModel = require("../../models/qna/qna.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../../utils/errorHandler");
const slugify = require("slugify");

const createQna = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { title, description } = req.body;
  let user = null;

  try {
    if (title) {
      slug = slugify(title.toLowerCase());
    }
    if (_id) {
      user = _id;
    }

    const qna = new qnaModel({
      title,
      slug,
      description,
      user,
    });

    if (qna) {
      const createdQna = await qna.save();
      res.status(201).json(createdQna);
    } else {
      res.status(400);
      throw new Error("Invalid qna data");
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createQna,
};
