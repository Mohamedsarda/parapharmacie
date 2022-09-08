const db = require("../Database/db.js");
const path = require("path");
const fs = require("fs");
const { resolve } = require("path");
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
const addCategorie = (req, res) => {
  const { categorieName } = req.body;
  db.query("CALL addCategorie(?)", [categorieName], (err, result) => {
    if (err)
      return res.status(200).send({
        actionState: false,
        desc: "Categorie didn't added. Database error",
      });
    return res.status(201).send({
      actionState: result[0][0].Response === 0 ? false : true,
      desc:
        result[0][0].Response === 0
          ? "Categorie has not been added. it's already exists"
          : "Categories has been added successfully",
      insertedId: result[0][0].insertedId,
    });
  });
};

const deleteCategorie = (req, res) => {
  const { categorieName } = req.body;

  db.query(
    "DELETE FROM products_categories WHERE categorieName = ?",
    [categorieName],
    (err, result) => {
      if (err)
        return res.status(500).send({
          actionState: false,
          desc: "Categorie didn't deleted successfully. Database error",
        });
      return res.status(200).send({
        actionState: result.affectedRows > 0 ? true : false,
        desc:
          result.affectedRows > 0
            ? `Categorie has been deleted successfully`
            : `Categorie didn't deleted. it don't exists`,
      });
    }
  );
};

const editCategorie = (req, res) => {
  const { newCateName, currentCateName } = req.body;
  db.query(
    "UPDATE products_categories SET categorieName = ? WHERE categorieName = ?",
    [newCateName, currentCateName],
    (err, result) => {
      if (err)
        return res.status(500).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
        });
      return res.status(200).send({
        actionState: result.affectedRows > 0 ? true : false,
        desc:
          result.affectedRows > 0
            ? `Categorie has been updated successfully`
            : `Something went wrong. Categorie didn't update`,
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

const addMark = (req, res) => {
  const { markName } = req.body;
  db.query("CALL addMark(?)", [markName], (err, result) => {
    if (err)
      return res.status(200).send({
        actionState: false,
        desc: "Something went wrong. Database error",
      });
    if (result[0][0].Response === 0)
      return res.status(200).send({
        actionState: false,
        desc: `Mark wasn't added. Something went wrong`,
      });
    else if (result[0][0].Response === 1)
      return res.status(200).send({
        actionState: true,
        desc: `Mark has been added..`,
        insertedId: result[0][0].insertedId,
      });
  });
};

const deleteMark = (req, res) => {
  const { markName } = req.body;

  db.query(
    "DELETE FROM marks WHERE markName = ?",
    [markName],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: "Something went wrong. Database error",
        });

      if (result.affectedRows === 0)
        return res.status(200).send({
          actionState: false,
          desc: "Something went wrong. No row affected",
        });
      else if (result.affectedRows > 0)
        return res
          .status(200)
          .send({ actionState: true, desc: `Mark deleted successfully.` });
    }
  );
};

const editMark = (req, res) => {
  const { markCurrentName, markNewName } = req.body;

  db.query(
    "UPDATE marks SET markName = ? WHERE markName = ?",
    [markNewName, markCurrentName],
    (err, result) => {
      if (err)
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
        });

      return res.status(200).send({
        actionState: result.affectedRows === 0 ? false : true,
        desc:
          result.affectedRows === 0
            ? "Something went wrong. No row affected"
            : `Mark updated successfully`,
      });
    }
  );
};

const addProduct = async (req, res) => {
  // console.log(req.files.file.name);
  const {
    productName,
    productDescription,
    productOldPrice,
    productCurrentPrice,
    productMark,
    productCategorie,
    productQuantitie,
  } = req.body;
  let uploadedImg = await uploadImageToServer(req.files.file, "./images");
  if (uploadedImg.uploaded === false)
    return res
      .status(200)
      .send({ actionState: false, desc: "Image failed to upload" });

  db.query(
    `INSERT INTO products(
        productName,
        productDescription,
        productOldPrice,
        productCurrentPrice,
        productMark,
        productCategorie,
        productImages,
        productQuantities
      ) VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )`,
    [
      productName,
      productDescription,
      productOldPrice,
      productCurrentPrice,
      productMark,
      productCategorie,
      uploadedImg.imageName,
      productQuantitie,
    ],
    (err, result) => {
      if (err) {
        removeImageFromServer(uploadedImg.imageName, `./images/`);
        return res.status(200).send({
          actionState: false,
          desc: `Something went wrong. Database error`,
        });
      }
      return res
        .status(200)
        .send({ actionState: true, desc: "Product added successfully" });
    }
  );
  // res.send({ msg: imageHashName });
};

const deleteProduct = (req, res) => {
  const { productId, productImage } = req.body;

  db.query("CALL deleteProduct(?)", [productId], (err, result) => {
    if (err)
      return res.status(200).send({
        actionState: false,
        desc: `Quelque chose s'est mal passé. Erreur de la base de données`,
      });
    if (result[0][0].Response === "Product has been deleted successfully") {
      try {
        removeImageFromServer(productImage, "./images/");
      } catch (e) {
        return res.status(200).send({
          actionState: true,
          desc: `Le produit a été supprimé avec succès`,
        });
      }
    }
    return res.status(200).send({
      actionState:
        result[0][0].Response ===
        "Ce produit est lié à certaines commandes en attente"
          ? false
          : true,
      desc: result[0][0].Response,
    });
  });
};

const editProduct = async (req, res) => {
  if (req.files) {
    let uploadImag = await uploadImageToServer(req.files.file, "./images");
    if (uploadImag.uploaded === false)
      return res
        .status(200)
        .send({ actionState: false, desc: `Failed to upload the image` });
    else {
      const editProd = await editProductWithImage(
        uploadImag.imageName,
        req.body
      );
      if (editProd.actionState) {
        return res
          .status(200)
          .send({ actionState: true, desc: `Categorie updated successfully` });
      }
      console.log(editProd);
    }

    // await editProductWithImage(req.files.file, req.body);
  } else
    return res
      .status(200)
      .send({ actionState: false, desc: `There is no image to upload.` });

  // console.log(req.files);
};

const editProductWithImage = async (imgName, infos) => {
  console.log(infos);
  return new Promise((resolve, reject) => {
    db.query(
      `
      UPDATE products SET 
      productName = ?,
      productDescription = ?,
      productOldPrice = ?,
      productCurrentPrice = ?,
      productMark = ?,
      productCategorie = ?,
      productImages = ?,
      productQuantities = ?
      WHERE productId = ?
    `,
      [
        infos.productName,
        infos.productDescription,
        infos.productOldPrice,
        infos.productCurrentPrice,
        infos.productMark,
        infos.productCategorie,
        imgName,
        infos.productQuantitie,
        infos.productId,
      ],
      (err, result) => {
        if (err) return reject({ actionState: false, desc: `Database error` });
        resolve({
          actionState: result.affectedRows === 0 ? false : true,
          desc:
            result.affectedRows === 0
              ? `Product to update wasn't found`
              : `Product updated successfully`,
        });
      }
    );
  });
};

const uploadImageToServer = (image, pathToFolder) => {
  console.log(image.name);
  const imageName = Date.now();
  return new Promise((resolve, reject) => {
    image.mv(
      `${pathToFolder}/${imageName + path.extname(image.name)}`,
      (err) => {
        if (err) {
          console.log(err);
          reject({ uploaded: false });
        } else {
          resolve({
            uploaded: true,
            imageName: imageName + path.extname(image.name),
          });
        }
      }
    );
  });
};

const removeImageFromServer = (img, pathToFolder) => {
  fs.unlinkSync(`${pathToFolder + img}`);
};

module.exports = {
  getCategories,
  addCategorie,
  deleteCategorie,
  editCategorie,
  addMark,
  deleteMark,
  editMark,
  addProduct,
  deleteProduct,
  editProduct,
  getMarks,
};
