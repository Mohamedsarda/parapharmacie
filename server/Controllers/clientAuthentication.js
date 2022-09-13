const db = require("../Database/db.js");
const bcrypt = require("bcrypt");
const clientSignUp = async (req, res) => {
  const {
    clientName,
    clientLastName,
    clientEmail,
    clientPhone,
    clientCity,
    clientAdress,
    clientPassword,
  } = req.body;
  if (!checkEmail(clientEmail))
    return res
      .status(200)
      .send({ actionState: false, desc: "Email adress is not valid" });

  let hasedPassword = await bcrypt.hash(clientPassword, await bcrypt.genSalt());
  db.query(
    "CALL addClient(?, ?, ?, ?, ?, ?, ?)",
    [
      clientName,
      clientLastName,
      clientEmail,
      clientPhone,
      clientAdress,
      hasedPassword,
      clientCity,
    ],
    (err, result) => {
      console.log(err);
      if (err)
        return res.status(500).send({
          actionState: false,
          desc: `Client wasn't added. Database error`,
        });
      if (result[0][0].Result === "Email exists")
        return res.status(200).send({
          actionState: false,
          desc: `Client wasn't added. The given email already exists`,
        });
      if (result[0][0].Result === "Phone exists")
        return res.status(200).send({
          actionState: false,
          desc: `Client wasn't added. The given phone number already exists`,
        });
      if (result[0][0].Result === "Client added")
        return res.status(201).send({
          actionState: true,
          desc: `Client has been added successfylly`,
        });
    }
  );
};

const clientSignIn = (req, res) => {
  const { clientEmail, clientPassword } = req.body;
  if (!checkEmail(clientEmail))
    return res
      .status(200)
      .send({ actionState: false, desc: `The given email is not valide` });

  db.query(
    `SELECT id, clientEmail, clientPassword FROM clients WHERE clientEmail = ?`,
    [clientEmail],
    async (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
        });
      if (result.length === 0)
        return res.status(200).send({
          actionState: false,
          desc: `Email is incorrect`,
        });
      if (await bcrypt.compare(clientPassword, result[0].clientPassword)) {
        req.session.client = result[0].id;
        return res
          .status(200)
          .send({ actionState: true, desc: `Client Signed successfully` });
      } else {
        return res
          .status(200)
          .send({ actionState: false, desc: `Password is incorrect` });
      }
    }
  );
};

const checkEmail = (email) => {
  // checking if the given email is a valid email
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isClientAuth = (req, res) => {
  if (req.session.client)
    return res
      .status(200)
      .send({ actionState: true, desc: "Client is authenticated" });
  return res
    .status(200)
    .send({ actionState: false, desc: "Client is not authenticated" });
};

module.exports = { clientSignUp, clientSignIn, isClientAuth };
