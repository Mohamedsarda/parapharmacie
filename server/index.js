const express = require("express");
const app = express();
const db = require("./database/db.js");
const sessions = require("express-session");
const MySQLStore = require("express-mysql-session")(sessions);
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Setting up express middlewares
app.use(express.json());
app.use(bodyParser.json());

// Setting up third party libraries
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    methods: ["POST", "GET", "PUT", "DELETE"],
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const sessionStore = new MySQLStore({}, db);
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Adding admin router
app.use("/admin/v1/", require("./Routes/adminTasks.js"));

app.listen(process.env.PORT, () => {
  console.log(`Listening to the port ${process.env.PORT}`);
});
