/**
 * /src/api/getJSON.js
 *
 * Axios will retrieve string data and convert it automatically to
 * JSON if it can. If it can't, it will leave the result in string
 * format. This wrapper function will ensure that the callback
 * receives either:
 *
 * • a JSON object, and no error
 * OR
 * • an error and no JSON object
 */

import axios from "axios";
import Store from "./store";

const setProgressInStore = (event) => {
  const { lengthComputable, loaded, total } = event
  let progress = 0
  if (lengthComputable) {
    progress = loaded / total // value from 0.0 to 1.0
  }
  console.log("progress event:", progress);
  Store.setState({ progress })
}

const config = {
  onDownloadProgress: setProgressInStore
}

const getJSON = (route, callback) => {
  const returnJSON = (response) => {
    let error = null;
    let json;

    try {
      json = response.data;
      if (typeof json !== "object") {
        error = "JSON object expected";
        json = undefined;
      }
    } catch (err) {
      error = err;
    }
    callback(error, json);
  };

  const treatError = (error) => {
    error = error.errno
      || (error.response && error.response.status)
      || "fail";
    callback(error);
  };

  axios.get(route, config)
    .then(returnJSON)
    .catch(treatError);
};

export default getJSON;
