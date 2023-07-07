const projectModel = require("../models/project.model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../utils/handlerFactoryController");

const createProject = createOne(projectModel);
const getAllProjects = getAll(projectModel);
const getProject = getOne(projectModel);
const updateProject = updateOne(projectModel);
const deleteProject = deleteOne(projectModel);

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
