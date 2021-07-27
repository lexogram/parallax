// ENVIRONMENT VARIABLES
const dotenv = require("dotenv");

const result = dotenv.config();
if (result && result.error) {
  throw result.error;
}

// Connecting to MongoDB
const { MONGODB, DB_NAME, TEST_DB_NAME, NODE_ENV } = process.env;
const dbName = (NODE_ENV === "test")
  ? TEST_DB_NAME
  : DB_NAME

if (!dbName || !MONGODB) {
  const message = `process.env does not contain data necessary to open a MongoDB connection:\n* MONGODB: ${MONGODB}\n* DB_NAME: ${DB_NAME}\n* TEST_DB_NAME: ${TEST_DB_NAME} (used if NODE_ENV === "test")\n* NODE_ENV: ${NODE_ENV}`
  throw new Error(message)
}

const mongoDB = `${MONGODB}${dbName}`;

const mongoose = require("mongoose");

const openDB = new Promise((resolve, reject) => {
  const result = {} // { db, closeDB, mongoose }

  function connectionIsOpen(mongoose) {
    result.mongoose = mongoose
    resolve(result)
  }

  mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(connectionIsOpen)
    .catch((error) => {
      reject(error);
    });

  const databaseOpenCallback = () => {
    console.log(`Connection to database is open at ${mongoDB}`);
  };

  const db = result.db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", databaseOpenCallback);

  result.closeDB = (options) => {
    if (typeof options !== "object") {
      options = { options }
    }
    const { silent, done, error } = options

    db.close();
    if (!silent) {
      console.log(`Connection to database at ${mongoDB} closed`);
    }

    if (typeof done === "function") {
      done(error);
      if (!silent) {
        console.log("done() called after closing database");
      }
    }
  };
});

module.exports = openDB
