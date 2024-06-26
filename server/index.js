const express = require("express");
const app = express();
const db = require("./Database/db.js");
const sessions = require("express-session");
const MySQLStore = require("express-mysql-session")(sessions);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Setting up express middlewares
app.use(express.json());
app.use(fileUpload());

// Setting up third party libraries
app.use(bodyParser.json());
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

// admin tasks router
app.use("/adminTask/v1/", require("./Routes/adminTasks.js"));

// admin authentication router
app.use("/adminAuthentication/v1/", require("./Routes/adminAuthentication.js"));

// client actions router
app.use("/clientActions/v1/", require("./Routes/clientActions.js"));

// images route
app.use(express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT, () => {
  console.log(`Listening to the port ${process.env.PORT}`);
});
