const bcrypt = require("bcrypt");
const db = require("../Database/db.js");
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
  console.log(checkEmail(clientEmail));
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
      if (err)
        return res.status(500).send({
          actionState: false,
          desc: `Client wasn't added. Database error`,
        });
      console.log(err);
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

const checkEmail = (email) => {
  // checking if the given email is a valid email
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = { clientSignUp };
