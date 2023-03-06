const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const cookieController = require("./controllers/cookieController");
const cookieParser = require("cookie-parser");

// setup app and port
const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI =
  "mongodb+srv://shendo87:UIOqlCfrXxZJYeJL@cluster0.kzkmgom.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "scratch_project",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// enable ALL CORS requests
app.use(cors());

// handle requests for static files (bundle.js)
app.use("/build", express.static(path.resolve(__dirname, "../build")));

// route handlers

app.post(
  "/login",
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful log in?
    console.log("completing post request to '/login");
    // res.redirect('/secret');
    res.redirect("/");
  }
);

app.post(
  "/signup",
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful log in?
    console.log("completing post request to '/signup");
    // res.redirect('/secret');
    res.redirect("/");
  }
);

app.use("/api", sessionController.isLoggedIn, (req, res) => {
  console.log('completing request to "/api"');
});

// server index.html
app.get("/", (req, res) => {
  console.log(`Get request for '/'.  sending index.html`);
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// define catch-all route handler for requests to an unknown route
app.use((req, res) => res.status(404).send("No page found at that location"));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" + err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
