const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./helpers/errorHandlers");
const bodyParser = require("body-parser");
require("dotenv").config();
//Port
const port = process.env.PORT;

//middlewares
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

//routes
app.use("/api/users", require("./routes/users"));

//connect to mongodb
const connectionEstablish = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STR);
    console.log("Database is connected to the server");
  } catch (err) {
    console.log("there is an error during the database connection", err);
  }
};
connectionEstablish();

//start server
app.listen(port, () => {
  console.log(`server is running at localhost:${port}`);
});
