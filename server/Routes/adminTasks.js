const express = require("express");
const {
  isAdminAuthenticated,
  isAdminNotAuthenticated,
} = require("../Middlewares/adminAuthentication.js");
const {
  getCategories,
  addCategorie,
  deleteCategorie,
  editCategorie,
} = require("../Controllers/adminTasks.js");
const AdminTasksRoute = express.Router();

AdminTasksRoute.post("/getCategories", getCategories);
AdminTasksRoute.post("/addCategorie", addCategorie);
AdminTasksRoute.post("/deleteCategorie", deleteCategorie);
AdminTasksRoute.post("/editCategorie", editCategorie);

module.exports = AdminTasksRoute;
