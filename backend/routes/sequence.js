const express = require("express");
const router = express.Router();
const Sequence = require("../models/Sequence");


async function newSequence(request, response) {
  const sequenceData = request.body;
  let result;
  try {
    result = new Sequence(sequenceData);
    await result.save();
  } catch (error) {
    response.status(404);
    result = { error: error.message };
  }
  response.send(result);
}

async function getSequenceById(request, response) {
  let _id = sanitize(request.params.id);

  let status = 200;
  let result;
  try {
    result = await Sequence.findOne({ _id });
    if (!result) {
      status = 404;
      result = { error: `Sequence "${_id}" does not exist` };
    }
  } catch (error) {
    status = 500;
    result = { error: error.message };
  }

  response.status(status);
  response.send(result);
}

router.post("/sequence", newSequence);
router.get("/sequence/:id", getSequenceById);

module.exports = router;
