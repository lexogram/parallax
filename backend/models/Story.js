const example = {
  "name": "walk",
  "l10n": {
    "en": {
      "title": "A walk in the park",
      "author": ["James"],
      "voice": ["James"],
      "theme": ["plants", "trees", "animals", "birds"],
      "keyword": [],
      "summary": ""
    }
  },
  "splash_screen": "/img/park_splash.jpg",
  "creation_date": "2021-07-21",
  "modification_date": "2021-07-21",
  "age_range": [1, 5],
  "sequence_ids": []
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetaDataSchema = new Schema({
  title: { type: String, required: true },
  author: { type: [String], required: true },
  voice: { type: [String], required: true },
  theme: { type: [String], required: true },
  keyword: { type: [String], required: true },
  summary: { type: String, required: true },
  _id: false
});

const L10nSchema = new Schema({
  type: Map,
  of: MetaDataSchema,
  _id: false
});

const schema = new Schema({
  name: { type: String, required: true },
  splash_screen: { type: String, required: true },
  creation_date: { type: Date, required: true },
  modification_date: { type: Date, required: true },
  age_range: { type: [Number], required: true },
  sequence_ids: { type: [String], required: true },
  l10n: { type: MetaDataSchema, required: true }
});

const model = mongoose.model("Story", schema);

module.exports = model;
