/**
 * models/Update.test.js
 *
 *
 */

const mongoose = require('mongoose')
const openDB = require("../db"); // Promise
const StoryModel = require("./Story");

const allData = {
  "name": "walk",
  "l10n": {
    "en": {
      "title": "A walk in the park",
      "author": [
        "James"
      ],
      "voice": [
        "James"
      ],
      "theme": [
        "plants",
        "trees",
        "animals",
        "birds"
      ],
      "keyword": [],
      "summary": "summary"
    },
    "fr": {
      "title": "Se promener dans le parc",
      "author": [
        "James"
      ],
      "voice": [
        "James"
      ],
      "theme": [
        "plantes",
        "arbres",
        "animaux",
        "oiseaux"
      ],
      "keyword": [],
      "summary": "resumé"
    }
  },
  "splash_screen": "/img/park_splash.jpg",
  "creation_date": "2021-07-21",
  "modification_date": "2021-07-21",
  "age_range": [
    1,
    5
  ],
  "sequence_ids": []
};

const minimumData = {
      "name": "min",
      "l10n": {},
      "splash_screen": "/img/park_splash.jpg",
      "creation_date": "2021-07-21",
      "modification_date": "2021-07-21",
      "age_range": [],
      "sequence_ids": []
    };

const testDocuments = [allData, minimumData];

describe("Test the finiOneAndUpdate command", findOneAndUpdateTest)

function findOneAndUpdateTest() {
  const closeConnection = () => {
    const db = mongoose.connection
    db.dropDatabase().then(() => {
      db.close()
    })
  }

  beforeAll(() => openDB)

  afterAll(closeConnection)

  expect.assertions(2)

  test("Update route is valid", testUpdateRoute);
}

function testUpdateRoute(done) {
  let counter = testDocuments.length

  testDocuments.forEach(async (expectedData) => {
    let testError

    const { name } = expectedData
    const filter = { name }
    const options = {
      new: true,
      upsert: true
    }

    const receivedData = await StoryModel.findOneAndUpdate(
      filter,
      expectedData,
      options
    ).lean();

    // Remove properties added automatically by mongoose, and
    // ensure dates have the expected (simple) format
    delete receivedData._id
    delete receivedData.__v
    simplifyDates(receivedData)

    try {
      expect(receivedData).toEqual(expectedData)
    } catch (error) {
      testError = error
    }

    if (!--counter) {
      done(testError)
    }
  })
}


// UTILITIES // UTILITIES // UTILITIES // UTILITIES // UTILITIES //

function simplifyDates(object) {
  if (typeof object === "object") {
    const keys = Object.getOwnPropertyNames(object)

    keys.forEach(key => {
      const value = object[key]

      if (typeof value === "object") {
        if (value instanceof Date) {
          object[key] = formatDate(value)
        } else if (Array.isArray(value)) {
          object[key] = value.map(item => simplifyDates(item))
        } else {
          object[key] = simplifyDates(value)
        }
      }
    })
  }

  return object
}

// https://stackoverflow.com/a/23593099/1927589
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
