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
  const storyData = request.body;
  let result;
  try {
    result = new Story(storyData);
    await result.save();
  } catch (error) {
    response.status(404);
    result = { error: error.message };
  }
  response.send(result);
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

// const story = (request, response) => {
//   // console.log("story", request)
//   // url, method, headers, params, query
//   const { params, url, hostname, headers } = request;
//   const { host } = headers
//   const story_id = params.id || 0;

//   const object = {
//     JSON: `JSON for story ${story_id} goes here`,
//     data: "data",
//     host,
//     url
//   };

//   console.log("object:", object)

//   response.json(object);
// };

// router.get(["/story", "/story/:id"], story);

// module.exports = router;
