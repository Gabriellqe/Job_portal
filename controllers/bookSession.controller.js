const BookSession = require("../models/bookSession.model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../utils/handlerFactoryController");

const createBookSession = createOne(BookSession);
const getAllBookSessions = getAll(BookSession);
const getBookSession = getOne(BookSession);
const updateBookSession = updateOne(BookSession);
const deleteBookSession = deleteOne(BookSession);

module.exports = {
  createBookSession,
  getAllBookSessions,
  getBookSession,
  updateBookSession,
  deleteBookSession,
};
