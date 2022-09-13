const express = require("express");
const ClientActionsRoute = express.Router();
const {
  selectCities,
  getProducts,
  getCategories,
  getMarks,
  addProductToCart,
  getProductsFromCart,
  openLandingPage,
} = require("../Controllers/clientActions.js");
const {
  clientSignUp,
  clientSignIn,
  isClientAuth,
} = require("../Controllers/clientAuthentication.js");
const {
  isClientNotAuthenticated,
  isClientAuthenticated,
} = require("../Middlewares/clientAuthentication.js");

ClientActionsRoute.post("/clientSignUp", clientSignUp);
ClientActionsRoute.post(
  "/clientSignIn",
  isClientNotAuthenticated,
  clientSignIn
);

ClientActionsRoute.get("/isClientAuthenticated", isClientAuth);
ClientActionsRoute.get("/getCities", selectCities);
ClientActionsRoute.get("/getMarks", getMarks);
ClientActionsRoute.get("/getCategories", getCategories);
ClientActionsRoute.post("/getProducts", getProducts);
ClientActionsRoute.post(
  "/addProductToCart",
  isClientAuthenticated,
  addProductToCart
);
ClientActionsRoute.post(
  "/getProductsInCart",
  isClientAuthenticated,
  getProductsFromCart
);
ClientActionsRoute.post("/openLandingPage", openLandingPage);

module.exports = ClientActionsRoute;
