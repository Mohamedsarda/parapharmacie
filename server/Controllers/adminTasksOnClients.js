const db = require("../Database/db");

const getClients = (req, res) => {
  const { from, to } = req.body;
  db.query(
    `
        SELECT 
        clientId,
        clientName,
        clientLastName,
        clientEmail,
        clientPhone,
        clientCity,
        clientAdress,
        clientPhoto
        FROM clients 
        LIMIT ?, ?
    `,
    [from, to],
    (err, result) => {
      if (err)
        result.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          clients: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: "Clients list fetched successfully",
        clients: result,
      });
    }
  );
};

const searchForClient = (req, res) => {
  const { searchedClient } = req.body;

  db.query(
    ` SELECT 
        clientId,
        clientName,
        clientLastName,
        clientEmail,
        clientPhone,
        clientCity,
        clientAdress,
        clientPhoto
        FROM clients 
        WHERE clientLastName LIKE ? LIMIT 0, 10`,
    ["%" + searchedClient + "%"],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          clients: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Client list fetched successfully`,
        clients: result,
      });
    }
  );
};
module.exports = { getClients, searchForClient };