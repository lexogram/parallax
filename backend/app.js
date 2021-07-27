// ENVIRONMENT VARIABLES
const dotenv = require("dotenv");

const result = dotenv.config();
if (result && result.error) {
  throw result.error;
}

const { PORT, CORS_ORIGIN } = process.env;
const corsOptions = {
  origin: CORS_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// DEPENDENCIES
const express = require("express");
const cors = require("cors");

// ROUTES
const welcomePage = require("./routes/welcome");
const story = require("./routes/story");
const sequence = require("./routes/sequence");

const openApp = (parameters) => {
  // If called from server.js, parameters will contain data from
  // db.js:
  //   const { mongoose, db, closeDB } = parameters
  // If called from a test, it may be undefined

  app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use(welcomePage);
  app.use(story);
  app.use(sequence);

  const startUpCallback = () => {
    console.log(`Express server is running on port ${PORT}`);
  };

  const server = app.listen(PORT, startUpCallback);

  const closeApp = (result) => {
    const { done, error, silent } = result
    server.close();
    
    if (!silent) {
      console.log(`Express server on port ${PORT} closed`);
    }

    if (typeof done === "function") {
      done(error);
      if (!silent) {
        console.log("done() called after closing server");
      }
    }
  };

  return { app, closeApp }; // used for tests
};

module.exports = openApp
