const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocalizedSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  _id: false
});

const L10nSchema = new Schema({
  type: Map,
  of: LocalizedSchema,
  _id: false
});

const schema = new Schema({
  key: { type: String, required: true },
  l10n: { type: LocalizedSchema, required: true }
});

const model = mongoose.model("Test", schema);

module.exports = model;
