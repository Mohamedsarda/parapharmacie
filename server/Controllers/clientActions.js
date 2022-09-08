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
  console.log(
    clientName,
    clientLastName,
    clientEmail,
    clientPhone,
    clientCity,
    clientAdress,
    clientPassword
  );
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

const checkEmail = (email) => {
  // checking if the given email is a valid email
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const selectCities = (req, res) => {
  db.query("SELECT * FROM cities", (err, result) => {
    if (err)
      return res.status(500).send({
        actionState: false,
        desc: "Cities didn't fetched. Database error",
        cities: [],
      });
    return res.status(200).send({
      actionState: true,
      desc: "Cities list fetched successfully",
      cities: result,
    });
  });
};

const getProducts = (req, res) => {
  const { from, to } = req.body;
  db.query(`SELECT * FROM products LIMIT ?, ?`, [from, to], (err, result) => {
    if (err)
      return res.status(200).send({
        actionState: false,
        desc: `Something went wrong. Database error`,
        products: [],
      });
    console.log(result);
    return res.status(200).send({ actionState: true, products: result });
  });
};

const getCategories = (req, res) => {
  db.query(
    "SELECT * FROM products_categories ",

    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          categories: [],
        });
      return res.status(200).send({
        actionState: true,
        desc:
          result.length > 0
            ? `Categories fetched successfully`
            : `There is no categories in the database`,
        categories: result,
      });
    }
  );
};
const getMarks = (req, res) => {
  const { from, to } = req.body;
  db.query(`SELECT * FROM marks LIMIT ?, ?`, [from, to], (err, result) => {
    if (err)
      return res.status(200).send({
        actionState: false,
        desc: `Something went wrong. Database error`,
      });
    return res.status(200).send({
      actionState: true,
      desc: `Marks fetched successfully`,
      marks: result,
    });
  });
};

module.exports = {
  clientSignUp,
  selectCities,
  getProducts,
  getCategories,
  getMarks,
};
