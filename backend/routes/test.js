const router = require("express").Router();
const Test = require("../models/Test");

async function newTest(request, response) {
  const testData = request.body;
  console.log("testData:", testData)
  const test = new Test(testData);

  await test.save();
  response.send(test);
}
router.post("/test", newTest);

module.exports = router;
