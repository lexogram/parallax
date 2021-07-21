// ENVIRONMENT VARIABLES
const dotenv = require("dotenv");

const result = dotenv.config();
if (result && result.error) {
  throw result.error;
}

const { PORT, MONGODB, DB_NAME, CORS_ORIGIN } = process.env;
const mongoDB = `${MONGODB}${DB_NAME}`;
const corsOptions = {
  origin: CORS_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// ROUTES
const welcomePage = require("./routes/welcome");
const story = require("./routes/story");

// EXPRESS will be launched after the MongoDB connection is ready
const launchApp = (Mongoose) => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(story);
  app.use(welcomePage);

  const startUpCallback = () => {
    console.log(`Express server is running on port ${PORT}`);
  };

  app.listen(PORT, startUpCallback);
};

// MONGODB
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(launchApp)
  .catch((error) => {
    throw error;
  });

const databaseOpenCallback = () => {
  console.log(`Connection to database is open at ${mongoDB}`);
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", databaseOpenCallback);
