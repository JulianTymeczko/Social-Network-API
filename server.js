require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

// Set up models
require("./models/Thought");
require("./models/User");

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up API routes
const routes = require("./routes");
app.use("/api", routes);

function connect() {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", () =>
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      })
    );
  return mongoose.connect(process.env.DB_URL);
}

connect();