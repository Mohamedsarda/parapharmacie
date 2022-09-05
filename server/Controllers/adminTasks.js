const db = require("../Database/db.js");
const getCategories = (req, res) => {
  const { from, to } = req.body;

  db.query(
    "SELECT * FROM products_categories LIMIT ?, ?",
    [from, to],
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
        categories: result.length > 0 ? result : [],
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

module.exports = { getCategories, addCategorie, deleteCategorie };
