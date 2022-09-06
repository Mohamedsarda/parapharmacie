const express = require("express");
const ClientActionsRoute = express.Router();
const { clientSignUp } = require("../Controllers/clientActions.js");
const {
  isClientNotAuthenticated,
  isClientAuthenticated,
} = require("../Middlewares/clientAuthentication.js");

ClientActionsRoute.post(
  "/clientSignUp",
  isClientNotAuthenticated,
  clientSignUp
);

module.exports = ClientActionsRoute;
