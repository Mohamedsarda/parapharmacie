const express = require("express");
const AdminAuthenticationRoute = express.Router();
const {
  isAdminNotAuthenticated,
  isAdminAuthenticated,
} = require("../Middlewares/adminAuthentication.js");
const {
  adminSignIn,
  adminSignOut,
  isAdminAuth,
} = require("../Controllers/adminAuthentication.js");

AdminAuthenticationRoute.post("/signIn", isAdminNotAuthenticated, adminSignIn);
AdminAuthenticationRoute.post("/signOut", isAdminAuthenticated, adminSignOut);
AdminAuthenticationRoute.post("/isAdminAuth", isAdminAuth);

module.exports = AdminAuthenticationRoute;
