const isAdminAuthenticated = (req, res, next) => {
  if (!req.session.admin)
    return res
      .status(401)
      .send({ isAuthenticated: false, desc: `Admin is not authenticated` });
  next();
};
const isAdminNotAuthenticated = (req, res, next) => {
  if (req.session.admin)
    return res
      .status(401)
      .send({ isAuthenticated: true, desc: `Admin is authenticated` });
  next();
};

module.exports = {
  isAdminAuthenticated,
  isAdminNotAuthenticated,
};
