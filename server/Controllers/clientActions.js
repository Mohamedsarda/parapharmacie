const bcrypt = require("bcrypt");
const db = require("../Database/db.js");

const selectCities = (req, res) => {
  db.query("SELECT * FROM cities ORDER BY cityName ASC", (err, result) => {
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
  db.query(
    `SELECT * FROM products ORDER BY productAddedTime DESC LIMIT ?, ?`,
    [from, to],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          products: [],
        });
      console.log(result);
      return res.status(200).send({ actionState: true, products: result });
    }
  );
};
const searchForProduct = (req, res) => {
  const { keyword, state, from, to } = req.body;
  console.log(state);
  db.query(
    !state
      ? `SELECT * FROM products WHERE (productName LIKE ? OR productMark LIKE ? OR productCategorie LIKE ?) AND productQuantities > 0 LIMIT ?,?`
      : `SELECT * FROM products WHERE productName LIKE ? OR productMark = ? OR productCategorie = ?`,
    [keyword, keyword, keyword, from, to],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          products: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Product list fetched successfully`,
        products: result,
      });
    }
  );
};

const searchForProductWithFiler = (req, res) => {
  const { keyword, state, fromRow, toRow, fromPrice, toPrice } = req.body;
  console.log(keyword, state, fromRow, toRow, fromPrice, toPrice);
  db.query(
    !state
      ? `SELECT * FROM products WHERE (productName LIKE ? OR productMark LIKE ? OR productCategorie LIKE ?) AND productQuantities > 0 AND productCurrentPrice BETWEEN ? AND ? LIMIT ?,?`
      : `SELECT * FROM products WHERE productName LIKE ? OR productMark = ? OR productCategorie = ?`,
    [keyword, keyword, keyword, fromPrice, toPrice, fromRow, toRow],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          products: [],
        });
      }
      return res.status(200).send({
        actionState: true,
        desc: `Products fetched successfully`,
        products: result,
      });
    }
  );
};
const searchForProductsBasedOnCategorie = (req, res) => {
  const { categorieName, from, to } = req.body;
  db.query(
    `SELECT * FROM products WHERE productCategorie = ? ORDER BY productAddedTime DESC LIMIT ?, ?`,
    [categorieName, from, to],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Someting went wrong. Database error`,
          products: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Products fetched successfully`,
        products: result,
      });
    }
  );
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
  db.query(`SELECT * FROM marks ORDER BY markName ASC`, (err, result) => {
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

const addProductToOrders = (req, res) => {
  const { productId, productPrice, orderQuantity, state } = req.body;
  db.query(
    `INSERT INTO orders(orderClient,orderState,orderProduct, orderQuantity, orderPrice)
  VALUES(?, ?, ?, ?, ?)`,
    [
      req.session.client,
      state,
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
const getProductsFromOrders = (req, res) => {
  const { state } = req.body;
  db.query(
    `SELECT orders.orderId,orders.orderQuantity,orders.orderPrice, products.productImages, products.productName, products.productDescription, products.productCurrentPrice, products.productOldPrice FROM orders 
      INNER JOIN products ON orders.orderProduct = products.productId
      WHERE orderState = ? AND orderClient = ?`,
    [state, req.session.client],
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
const removeProductFromOrders = (req, res) => {
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

const getClientOrders = (req, res) => {
  const { state } = req.body;
  db.query(
    `SELECT orders.orderId, orders.orderClient,orders.orderState,orders.orderTime, clients.clientName, clients.clientLastName ,
  products.productName, products.productCurrentPrice, products.productImages
  FROM orders 
  INNER JOIN clients ON orders.orderClient = clients.id
  INNER JOIN products ON orders.orderProduct = products.productId
  WHERE orders.orderState = ? AND orders.orderClient = ? ORDER BY orders.orderTime DESC`,
    [state, req.session.client],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          orders: [],
        });
      return res.status(200).send({
        actionState: true,
        desc: `Orders fetched successfully`,
        orders: result,
      });
    }
  );
};
// get client info fun
const getClientInfo = (req, res) => {
  db.query(
    `SELECT id, clientName, clientLastName, clientEmail, clientPhone, clientCity, clientAdress FROM clients WHERE id = ?`,
    [req.session.client],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          clientInfo: {},
        });
      return res.status(200).send({
        actionState: true,
        desc: `Client info fetched successfully`,
        clientInfo: result[0],
      });
    }
  );
};
// edit client info fun
const editClientInfo = async (req, res) => {
  const { clientPassword } = req.body;
  var editInfo;
  if (clientPassword === "") {
    editInfo = await editClientInfoWithoutPass(req.body, req.session.client);
    console.log(editInfo);
  } else if (clientPassword !== "") {
    const hashedPass = await bcrypt.hash(
      clientPassword,
      await bcrypt.genSalt()
    );
    editInfo = await editClientInfoWithPass(
      req.body,
      hashedPass,
      req.session.client
    );
    console.log(editInfo);
  }
  return res
    .status(200)
    .send({ actionState: editInfo.state, desc: editInfo.desc });
};
const editClientInfoWithoutPass = (info, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE clients SET
  clientName = ?,
  clientLastName = ?,
  clientEmail = ?,
  clientPhone = ?,
  clientCity = ?,
  clientAdress = ?
  WHERE id = ?
  `,
      [
        info.clientName,
        info.clientLastName,
        info.clientEmail,
        info.clientPhone,
        info.clientCity,
        info.clientAdress,
        id,
      ],
      (err, result) => {
        // console.log(result);
        if (err)
          return reject({
            state: false,
            desc: `Something went wrong database error`,
          });
        return resolve({
          state: result.affectedRows === 0 ? false : true,
          desc:
            result.affectedRows === 0
              ? "No row affected"
              : "Client updated successfully",
        });
      }
    );
  });
};
const editClientInfoWithPass = (info, password, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE clients SET
  clientName = ?,
  clientLastName = ?,
  clientEmail = ?,
  clientPhone = ?,
  clientCity = ?,
  clientAdress = ?,
  clientPassword = ?
  WHERE id = ?
  `,
      [
        info.clientName,
        info.clientLastName,
        info.clientEmail,
        info.clientPhone,
        info.clientCity,
        info.clientAdress,
        password,
        id,
      ],
      (err, result) => {
        // console.log(result);
        if (err)
          return reject({
            state: false,
            desc: `Something went wrong database error`,
          });
        return resolve({
          state: result.affectedRows === 0 ? false : true,
          desc:
            result.affectedRows === 0
              ? "No row affected"
              : "Client updated successfully",
        });
      }
    );
  });
};

const selectProduct = (req, res) => {
  const { productId } = req.body;
  db.query(
    `SELECT * FROM products WHERE productId = ?`,
    [productId],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
          product: {},
        });

      return res.status(200).send({
        actionState: true,
        desc:
          result.length == 0
            ? `No product found with the given id`
            : `Product fetched succefully`,
        product: result.length == 0 ? {} : result[0],
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

      if (!req.session.client)
        return res.status(200).send({
          actionState: true,
          desc: `Products and categories fetched successfully`,

          products: splitLandingPageProducts(result),
        });

      return res.status(200).send({
        actionState: true,
        desc: `Products and categories fetched successfully`,

        products: splitLandingPageProducts(result),
      });
    }
  );
};
const getCategoriesForLandingPage = (req, res) => {
  db.query(
    "SELECT * FROM products_categories ORDER BY categorieName ASC LIMIT 0, 20",
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Dabase error`,
          categories: result,
        });
      return res.status(200).send({
        actionState: true,
        desc: `Categories fetched successfully`,
        categories: result,
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
  addProductToOrders,
  openLandingPage,
  getProductsFromOrders,
  removeProductFromOrders,
  editProductInCart,
  getProductsInTheCard,
  searchForProduct,
  searchForProductWithFiler,
  getCategoriesForLandingPage,
  getClientOrders,
  getClientInfo,
  editClientInfo,
  searchForProductsBasedOnCategorie,
  selectProduct,
};
