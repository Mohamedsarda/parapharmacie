const bcrypt = require("bcrypt");
const db = require("../Database/db.js");

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
// Start Editing
const addProductToCart = (req, res) => {
  const { productId, productPrice, orderQuantity } = req.body;
  db.query(
    `INSERT INTO orders(orderClient,orderState,orderProduct, orderQuantity, orderPrice)
  VALUES(?, 'cart', ?, ?, ?)`,
    [
      req.session.client,
      productId,
      orderQuantity,
      productPrice * orderQuantity,
    ],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
        });
      return res.status(200).send({
        actionState: true,
        desc: `Product added to card successfully`,
      });
    }
  );
};
const getProductsFromCart = (req, res) => {
  db.query(
    `SELECT orders.orderId,orders.orderQuantity,orders.orderPrice, products.productImages, products.productName, products.productDescription, products.productCurrentPrice, products.productOldPrice FROM orders 
      INNER JOIN products ON orders.orderProduct = products.productId
      WHERE orderState = 'cart' AND orderClient = ?`,
    [req.session.client],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          cart: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Product in cart fetched succesfully`,
        cart: result,
      });
    }
  );
};
const removeProductFromCart = (req, res) => {
  const { orderId } = req.body;
  db.query(`DELETE FROM orders WHERE orderId = ?`, [orderId], (err, result) => {
    if (err)
      return res.status(200).send({
        actionState: false,
        desc: `Something went wrong. Database error`,
      });
    return res
      .status(200)
      .send({ actionState: true, desc: `Product removed successfully` });
  });
};
const editProductInCart = (req, res) => {
  const { orderId, orderQuantity } = req.body;
  console.log(orderId, orderQuantity);
  db.query(
    `UPDATE orders SET orderQuantity = ? WHERE orderId = ?`,
    [orderQuantity, orderId],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
        });
      return res.status(200).send({
        actionState: true,
        desc: `Product in cart update successfully`,
      });
    }
  );
};
const getProductsInTheCard = (req, res) => {
  db.query(
    `SELECT COUNT(*) AS 'ordersCount' FROM orders  WHERE orderClient = ? AND orderState = 'cart'`,
    [req.session.client],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          cart: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Cart fetched successfully`,
        cart: result,
      });
    }
  );
};
// landing page action
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
        });
      const categories = await getCategoriesForLandingPage();
      if (!categories.fetchState)
        return res.status(200).send({
          actionState: false,
          desc: "Something went wrong. Database error 2",
          products: {},
          categories: [],
        });
      if (!req.session.client)
        return res.status(200).send({
          actionState: true,
          desc: `Products and categories fetched successfully`,
          categories: categories.categories,
          products: splitLandingPageProducts(result),
        });

      return res.status(200).send({
        actionState: true,
        desc: `Products and categories fetched successfully`,
        categories: categories.categories,
        products: splitLandingPageProducts(result),
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
// landing page action

module.exports = {
  selectCities,
  getProducts,
  getCategories,
  getMarks,
  addProductToCart,
  openLandingPage,
  getProductsFromCart,
  removeProductFromCart,
  editProductInCart,
  getProductsInTheCard,
};
