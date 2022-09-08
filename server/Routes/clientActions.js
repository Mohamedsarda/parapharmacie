const express = require("express");
const ClientActionsRoute = express.Router();
const {
  clientSignUp,
  selectCities,
  getProducts,
  getCategories,
  getMarks,
} = require("../Controllers/clientActions.js");
const {
  isClientNotAuthenticated,
  isClientAuthenticated,
} = require("../Middlewares/clientAuthentication.js");

ClientActionsRoute.post(
  "/clientSignUp",
  isClientNotAuthenticated,
  clientSignUp
);

ClientActionsRoute.get("/getCities", selectCities);
ClientActionsRoute.get("/getMarks", getMarks);
ClientActionsRoute.get("/getCategories", getCategories);

ClientActionsRoute.post("/getProducts", getProducts);

module.exports = ClientActionsRoute;
