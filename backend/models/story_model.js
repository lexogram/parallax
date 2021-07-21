const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  a_string: String,
  a_date: Date
});

const model = mongoose.model("Story", schema);

module.exports = model;
