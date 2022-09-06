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
const { clientSignUp } = require("../Controllers/clientActions.js");

const AdminTasksRoute = express.Router();

AdminTasksRoute.post("/getCategories", getCategories);
AdminTasksRoute.post("/addCategorie", addCategorie);
AdminTasksRoute.post("/deleteCategorie", deleteCategorie);
AdminTasksRoute.post("/editCategorie", editCategorie);
AdminTasksRoute.post("/clientSignUp", isAdminAuthenticated, clientSignUp);

module.exports = AdminTasksRoute;
