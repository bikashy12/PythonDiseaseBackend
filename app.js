const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./Routes/users-routes");
var router = require("./Routes/userroutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.json(
    "Welcome to the Python Disease Backend. Hope! You will enjoy using the service."
  );
  res.end();
});

app.use("/api", router);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const url = process.env.DATABASE_URL;

mongoose
  .connect(url)
  .then(() => {
    app.listen(3001);
    console.log("Backend server started");
  })
  .catch((err) => {
    console.log(err);
  });
