const express = require("express");
const ClientActionsRoute = express.Router();
const {
  clientSignUp,
  clientSignIn,
  selectCities,
  getProducts,
  getCategories,
  getMarks,
  openLandingPage,
} = require("../Controllers/clientActions.js");
const {
  isClientNotAuthenticated,
  isClientAuthenticated,
} = require("../Middlewares/clientAuthentication.js");

ClientActionsRoute.post(
  "/clientSignUp",

  clientSignUp
);
ClientActionsRoute.post(
  "/clientSignIn",
  isClientNotAuthenticated,
  clientSignIn
);

ClientActionsRoute.get("/getCities", selectCities);
ClientActionsRoute.get("/getMarks", getMarks);
ClientActionsRoute.get("/getCategories", getCategories);
ClientActionsRoute.post("/getProducts", getProducts);
ClientActionsRoute.post("/openLandingPage", openLandingPage);

module.exports = ClientActionsRoute;
