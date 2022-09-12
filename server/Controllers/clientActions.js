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
  db.query(`SELECT * FROM marks`, (err, result) => {
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

const openLandingPage = (req, res) => {
  const {
    firstCategorie,
    secondCategorie,
    thirdCategorie,
    fourthCategorie,
    fifthCategorie,
    sixthCategroie,
  } = req.body;
  db.query(
    `(SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT 0, 5)
UNION
(SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT 0,5)
UNION 
(SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT 0,5)
UNION 
(SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT 0,5)
UNION 
(SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT 0,5)
UNION 
(SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT 0,5)`,
    [
      firstCategorie,
      secondCategorie,
      thirdCategorie,
      fourthCategorie,
      fifthCategorie,
      sixthCategroie,
    ],
    async (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error. 1`,
          products: {},
          categories: [],
          cart: [],
        });
      const categories = await getCategoriesForLandingPage();
      if (!categories.fetchState)
        return res.status(200).send({
          actionState: false,
          desc: "Something went wrong. Database error 2",
          products: {},
          categories: [],
          cart: [],
        });
      if (!req.session.client)
        return res.status(200).send({
          actionState: true,
          desc: `Products and categories fetched successfully`,
          categories: categories.categories,
          products: splitLandingPageProducts(result),
          cart: [],
        });
      const cart = await getProductsInTheCard(req.session.client);
      if (!cart.fetchState)
        return res.status(200).send({
          actionState: false,
          desc: "Something went wrong. Database error 3",
          products: {},
          categories: [],
          cart: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Products and categories fetched successfully`,
        categories: categories.categories,
        products: splitLandingPageProducts(result),
        cart: cart.cartProducts,
      });
    }
  );
};
const getCategoriesForLandingPage = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products_categories LIMIT 0, 20", (err, result) => {
      if (err)
        return reject({
          fetchState: false,
          desc: `Database error`,
          categories: [],
        });
      return resolve({
        fetchState: true,
        desc: `Categories fetched successfully`,
        categories: result,
      });
    });
  });
};
const getProductsInTheCard = (clientId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM orders WHERE orderClient = ? AND orderState = 'cart'`,
      [clientId],
      (err, result) => {
        if (err)
          return reject({
            fetchState: false,
            desc: `Database error 3`,
            cartProducts: [],
          });
        return resolve({
          fetchState: true,
          desc: `Cart fetched successfully`,
          cartProducts: result,
        });
      }
    );
  });
};
const splitLandingPageProducts = (products) => {
  let productsObj = { firstSlider: [], secondSlider: [] };
  for (let i = 0; i < products.length / 2; i++) {
    productsObj.firstSlider.push(products[i]);
  }
  for (let i = products.length / 2; i < products.length; i++) {
    productsObj.secondSlider.push(products[i]);
  }
  return productsObj;
};

module.exports = {
  clientSignUp,
  selectCities,
  getProducts,
  getCategories,
  getMarks,
  clientSignIn,
  openLandingPage,
};
