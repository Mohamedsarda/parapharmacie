const express = require("express");
const ClientActionsRoute = express.Router();
const {
  clientSignUp,
  selectCities,
  getProducts,
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

ClientActionsRoute.post("/getProducts", getProducts);

module.exports = ClientActionsRoute;
