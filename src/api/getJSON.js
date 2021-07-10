/**
 * /src/api/getJSON.js
 */

import axios from "axios";

const getJSON = (filename, callback) => {
  console.log("filename:", filename);

  const returnJSON = (response) => {
    let error = null;
    let json;

    try {
      json = response.data;
      console.log("json:", json)
    } catch (err) {
      error = err;
    }
    callback(error, json);
  };

  axios.get(filename).then(returnJSON);
};

export default getJSON;
