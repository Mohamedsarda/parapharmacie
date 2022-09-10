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
  editMark,
  addProduct,
  deleteProduct,
  editProduct,
  getOrders,
} = require("../Controllers/adminTasks.js");
const {
  getClients,
  searchForClient,
  deleteClient,
  editClient,
} = require("../Controllers/adminTasksOnClients.js");
const { clientSignUp } = require("../Controllers/clientActions.js");

const AdminTasksRoute = express.Router();
// Selecting categories from database

// Adding a categorie to database
AdminTasksRoute.post("/addCategorie", isAdminAuthenticated, addCategorie);
// Removing a categorie from database
AdminTasksRoute.post("/deleteCategorie", isAdminAuthenticated, deleteCategorie);
// Editing a categorie in the database
AdminTasksRoute.post("/editCategorie", isAdminAuthenticated, editCategorie);
// Adding a client in the database
AdminTasksRoute.post("/clientSignUp", clientSignUp);

// Adding a mark in the database
AdminTasksRoute.post("/addMark", isAdminAuthenticated, addMark);
// Removing a mark from database
AdminTasksRoute.post("/deleteMark", isAdminAuthenticated, deleteMark);
// Editing a mark in the database
AdminTasksRoute.post("/editMark", isAdminAuthenticated, editMark);

// Addint a product to database
AdminTasksRoute.post("/addProduct", isAdminAuthenticated, addProduct);
// Removing a product from database
AdminTasksRoute.post("/deleteProduct", isAdminAuthenticated, deleteProduct);
// Editing a product in database
AdminTasksRoute.post("/editProduct", isAdminAuthenticated, editProduct);

// Selecting clients from database
AdminTasksRoute.post("/getClients", isAdminAuthenticated, getClients);
// Search for a client in database
AdminTasksRoute.post("/findClient", isAdminAuthenticated, searchForClient);
// Delete client from database
AdminTasksRoute.post("/deleteClient", deleteClient);
// edit client in the database
AdminTasksRoute.post("/editClient", editClient);

// Select orders
AdminTasksRoute.post("/getOrders", getOrders);

module.exports = AdminTasksRoute;
