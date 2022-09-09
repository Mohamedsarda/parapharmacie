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
      return res
        .status(200)
        .send({
          actionState: true,
          desc: "Clients list fetched successfully",
          clients: result,
        });
    }
  );
};
module.exports = { getClients };
