const express = require("express");
const ClientActionsRoute = express.Router();
const {
  selectCities,
  getProducts,
  getCategories,
  getMarks,
  addProductToOrders,
  getProductsFromOrders,
  removeProductFromOrders,
  openLandingPage,
  editProductInCart,
  getProductsInTheCard,
  searchForProduct,
  searchForProductWithFiler,
  getCategoriesForLandingPage,
} = require("../Controllers/clientActions.js");
const {
  clientSignUp,
  clientSignIn,
  isClientAuth,
  clientSignOut,
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
ClientActionsRoute.post("/clientSignOut", clientSignOut);
ClientActionsRoute.post("/isClientAuthenticated", isClientAuth);
ClientActionsRoute.post("/getProductInCart", getProductsInTheCard);

ClientActionsRoute.get("/getCities", selectCities);
ClientActionsRoute.get("/getMarks", getMarks);
ClientActionsRoute.get("/getCategories", getCategories);
ClientActionsRoute.post("/getProducts", getProducts);
ClientActionsRoute.post(
  "/addProductToCart",
  isClientAuthenticated,
  addProductToOrders
);
ClientActionsRoute.post(
  "/getProductsInCart",
  isClientAuthenticated,
  getProductsFromOrders
);
ClientActionsRoute.post(
  "/removeProductsFromCart",
  isClientAuthenticated,
  removeProductFromOrders
);
ClientActionsRoute.post(
  "/editProductInCart",
  isClientAuthenticated,
  editProductInCart
);
ClientActionsRoute.post("/searchForProduct", searchForProduct);
ClientActionsRoute.post(
  "/searchForProductWithFilter",
  searchForProductWithFiler
);
ClientActionsRoute.post("/openLandingPage", openLandingPage);
ClientActionsRoute.post(
  "/getCategoriesForLandingPage",
  getCategoriesForLandingPage
);

module.exports = ClientActionsRoute;
