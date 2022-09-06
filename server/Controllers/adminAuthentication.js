const db = require("../Database/db.js");
const bcrypt = require("bcrypt");

const adminSignIn = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  db.query(
    "SELECT * FROM admin WHERE adminEmail = ?",
    [adminEmail],
    async (err, result) => {
      if (err) {
        return res.status(500).send({
          actionState: false,
          desc: "Quelque chose s'est mal passé. erreur de la base de données",
        });
      }
      if (result.length === 0) {
        return res.status(200).send({
          actionState: false,
          desc: "Aucun administrateur trouvé avec l'adresse e-mail indiquée",
        });
      }
      if (!(await bcrypt.compare(adminPassword, result[0].adminPassword))) {
        return res
          .status(200)
          .send({ actionState: false, desc: "Le mot de passe est incorrect" });
      } else {
        req.session.admin = result[0].adminId;

        return res
          .status(200)
          .send({ actionState: true, desc: "Connexion réussie" });
      }
    }
  );
};

const adminSignOut = (req, res) => {
  req.session.destroy();
  res
    .status(200)
    .send({ actionState: true, desc: "Admin signed out successfully" });
};

module.exports = { adminSignIn, adminSignOut };
