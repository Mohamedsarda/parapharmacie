const express = require("express");
const AdminAuthenticationRoute = express.Router();
const {
  isAdminNotAuthenticated,
  isAdminAuthenticated,
} = require("../Middlewares/adminAuthentication.js");
const {
  adminSignIn,
  adminSignOut,
} = require("../Controllers/adminAuthentication.js");

AdminAuthenticationRoute.post("/signIn", isAdminNotAuthenticated, adminSignIn);
AdminAuthenticationRoute.post("/signOut", isAdminAuthenticated, adminSignOut);

module.exports = AdminAuthenticationRoute;
