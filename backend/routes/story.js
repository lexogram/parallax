const express = require("express");
const router = express.Router();


const story = (request, response) => {
  // console.log("story", request)
  // url, method, headers, params, query
  const { params, url, hostname, headers } = request;
  const { host } = headers
  const story_id = params.id || 0;

  const object = {
    JSON: `JSON for story ${story_id} goes here`,
    data: "data",
    host,
    url
  };

  console.log("object:", object)

  response.json(object);
};

router.get(["/story", "/story/:id"], story);

module.exports = router;
