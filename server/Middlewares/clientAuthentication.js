const isClientAuthenticated = (req, res, next) => {
  if (!req.session.client)
    return res
      .status(401)
      .send({ isAuthenticated: false, desc: `Client is not authenticated` });
  next();
};

const isClientNotAuthenticated = (req, res, next) => {
  if (req.session.client)
    return res
      .status(401)
      .send({ isAuthenticated: true, desc: `Client is authenticated` });
  next();
};

module.exports = { isClientAuthenticated, isClientNotAuthenticated };
