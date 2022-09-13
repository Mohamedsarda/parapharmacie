const isClientAuthenticated = (req, res, next) => {
  if (!req.session.client)
    return res
      .status(200)
      .send({ actionState: false, desc: `Client is not authenticated` });
  next();
};

const isClientNotAuthenticated = (req, res, next) => {
  if (req.session.client)
    return res
      .status(200)
      .send({ actionState: true, desc: `Client is authenticated` });
  next();
};

module.exports = { isClientAuthenticated, isClientNotAuthenticated };
