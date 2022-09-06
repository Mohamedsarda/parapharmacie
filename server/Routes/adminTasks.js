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
  addMark,
  deleteMark,
} = require("../Controllers/adminTasks.js");
const { clientSignUp } = require("../Controllers/clientActions.js");

const AdminTasksRoute = express.Router();
// Selecting categories from database
AdminTasksRoute.post("/getCategories", getCategories);
// Adding a categorie to database
AdminTasksRoute.post("/addCategorie", addCategorie);
// Removing a categorie from database
AdminTasksRoute.post("/deleteCategorie", deleteCategorie);
// Editing a categorie in the database
AdminTasksRoute.post("/editCategorie", editCategorie);
// Adding a client in the database
AdminTasksRoute.post("/clientSignUp", isAdminAuthenticated, clientSignUp);

// Adding a mark in the database
AdminTasksRoute.post("/addMark", addMark);
// Removing a mark from database
AdminTasksRoute.post("/deleteMark", deleteMark);

module.exports = AdminTasksRoute;
