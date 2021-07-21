const { MONGODB, DB_NAME } = process.env;
const mongoDB = `${MONGODB}${DB_NAME}`;

const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoDB, options);

const databaseOpenCallback = (a, b) => {
  console.log(`Connection to database is open at ${mongoDB}`);
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", databaseOpenCallback);


