const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

function sanitize(name) {
  // Only allow alpha-numeric characters and -
  if (/[^A-Za-z0-9-]/.test(name)) {
    // Replace with this month's free story
    name = 0;
  }
  return name;
}

async function getStories(request, response) {
  const stories = await Story.find();
  response.send(stories);
}

async function newStory(request, response) {
  const update = request.body;
  const { name } = update
  const query = { name }
  let result;
  // try {
  //   result = new Story(storyData);
  //   await result.save();
  // } catch (error) {
  //   response.status(404);
  //   result = { error: error.message };
  // }
  // response.send(result);

  const options = {
    new: true,
    upsert: true
  }

  const callback = function (error, result) {
    if (error) {
      response.status(404);
      result = { error: error.message };
    }
    response.send(result);
  }

  Story.findOneAndUpdate(
    query,
    update,
    options,
    callback
  ).lean();
}

async function getStoryByName(request, response) {
  let name = sanitize(request.params.name);

  if (!isNaN(name) && !Number(name)) {
    // TODO: get the name of this month's free story
    name = "walk";
  }

  let status = 200;
  let result;
  try {
    result = await Story.findOne({ name });
    if (!result) {
      status = 404;
      result = { error: `Story "${name}" does not exist` };
    }
  } catch (error) {
    status = 500;
    result = { error: error.message };
  }

  response.status(status);
  response.send(result);
}

router.get("/story", getStories);
router.post("/story", newStory);
router.get("/story/:name", getStoryByName);

module.exports = router;
