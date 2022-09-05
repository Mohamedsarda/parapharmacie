const express = require("express");
const {
  isAdminAuthenticated,
  isAdminNotAuthenticated,
} = require("../Middlewares/adminAuthentication.js");
const {
  getCategories,
  addCategorie,
  deleteCategorie,
} = require("../Controllers/adminTasks.js");
const AdminRoute = express.Router();

AdminRoute.post("/getCategories", getCategories);
AdminRoute.post("/addCategorie", addCategorie);
AdminRoute.post("/deleteCategorie", deleteCategorie);

module.exports = AdminRoute;
