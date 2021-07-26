/**
 * models/Sequence.test.js
 *
 *
 */

const openDB = require("../db"); // Promise
const SequenceModel = require("./Sequence");

const TIMEOUT_DELAY = 3000

const allData = {
  storyId: "all",
  index: 1,
  creation_date: "2021-07-24",
  modification_date: "2021-07-24",
  images: [
    {
      url: "/img/walk/tree.jpg",
      placements: [
        {
          x: 0,
          y: 0,
          z: 0,
          behaviorGroup_id: "behavior"
        }
      ]
    }
  ],
  audio: {
    background: [
      {
        url: "/walk/audio/background.mp3",
        sections: [
          {
            start_time: "0:00:00.000",
            end_time: "10:00:00.000",
            start_scroll: 0,
            end_scroll: 800,
            envelope: "flat",
            triggers: []
          }
        ]
      }
    ],
    sfx: {
      url: "/walk/audio/sfx.mp3",
      clips: {
        george: {
          start_time: "0:00:00.000",
          end_time: "0:00:01.000"
        },
        ringo: {
          start_time: "0:00:00.000",
          end_time: "0:00:01.000"
        }
      }
    },
    reader: {
      en: {
        james: {
          name: "James",
          url: "/walk/audio/reader/en_james.mp3",
          timing: {
            section_1: {
              start_time: "0:00:00.000",
              end_time: "0:00:02.000",
              words: [
                {
                  word: "This",
                  start_time: "0:00:00.000",
                  end_time: "0:00:00.500"
                },
                {
                  word: "is",
                  start_time: "0:00:00.500",
                  end_time: "0:00:01.000"
                },
                {
                  word: "a",
                  start_time: "0:00:01.000",
                  end_time: "0:00:01.500"
                },
                {
                  word: "test",
                  start_time: "0:00:01.500",
                  end_time: "0:00:02.000"
                }
              ]
            }
          }
        }
      },
      fr: {
        tanguy: {
          name: "Tanguy",
          url: "/walk/audio/reader/fr_tanguy.mp3",
          timing: {}
        }
      }
    },
    words: {
      en: {
        james: {
          url: "/walk/audio/words/en.mp3",
          timing: {
            this: {
              start_time: "0:00:00.000",
              end_time: "0:00:00.500"
            },
            is: {
              start_time: "0:00:00.500",
              end_time: "0:00:01.000"
            },
            a: {
              start_time: "0:00:01.000",
              end_time: "0:00:01.500"
            },
            test: {
              start_time: "0:00:01.500",
              end_time: "0:00:02.000"
            }
          }
        }
      }
    }
  },
  scripts: {
    script_1_name: "/scripts/name.js",
    script_2_name: "/scripts/name.js"
  },
  portals: {
    portal_name: "/scene/name.json"
  },
  behaviors: {
    behaviorGroup_id: {
      script_1_name: {
        property: "value"
      }
    }
  },
  sections: {
    section_1: {
      position: 0.1,
      text: {
        en: "This is a test",
        fr: "Ceci est un test"
      }
    }
  }
};

const minimumData = {
  storyId: "min",
  index: 1,
  creation_date: "2021-07-24",
  modification_date: "2021-07-24",
  images: [],
  audio: { background: [] },
  sections: {}
};

const testDocuments = [allData, minimumData];

describe("Test the mongoose models", testMongooseModels)

function testMongooseModels() {
  test("Sequence Model is valid", testSequenceModel);
}

function testSequenceModel(done) {
  const result = { done, silent: false }
  expect.assertions(6)

  openDB.then(runTest)

  function runTest({ db, closeDB, mongoose }) {
    setTimeoutToCloseConnection(TIMEOUT_DELAY)

    testDocuments.forEach(expectedData => {
      const sequence = new SequenceModel(expectedData);

      sequence.save((error, doc) => {
        try {
          expect(error).toBeNull()

          const { storyId } = expectedData
          const query = { storyId }
          // Ask mongoose for a POJO, not a Mongoose Document
          // https://mongoosejs.com/docs/tutorials/lean.html
          SequenceModel.findOne(query, callback).lean()

        } catch (error) {
          result.error = error
        }
      })

      function callback(error, retrievedData) {
        if (error) {
          result.error = error
        }

        try {
          expect(retrievedData).not.toBeNull()

          if (retrievedData) {
            // Dates in retrievedData include time zone info
            retrievedData = simplifyDates(retrievedData)
            // Remove properties added automatically by mongoose
            delete retrievedData._id;
            delete retrievedData.__v;

            expect(retrievedData).toEqual(expectedData)
          }
        } catch (error) {
          result.error = error
        }
      }
    })

    function setTimeoutToCloseConnection(delay) {
      setTimeout(() => {
        db.dropDatabase().then(() => {
          closeDB(result)
        })
      }, delay)
    }
  }
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
