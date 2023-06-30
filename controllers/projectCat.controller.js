const projectCatModel = require("../models/projectCat.model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../utils/handlerFactoryController");

const createProjectCat = createOne(projectCatModel);
const getAllProjectCats = getAll(projectCatModel);
const getProjectCat = getOne(projectCatModel);
const updateProjectCat = updateOne(projectCatModel);
const deleteProjectCat = deleteOne(projectCatModel);

module.exports = {
  createProjectCat,
  getAllProjectCats,
  getProjectCat,
  updateProjectCat,
  deleteProjectCat,
};
