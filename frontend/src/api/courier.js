/**
 * A singleton of the Courier class takes care of:
 *
 * • Requesting JSON data from the backend
 * • Preloading assets
 * • Updating the Store when an server action is complete
 * • ... or has died in the attempt
 *
 * @class Courier
 */

import Store from './store'
import getJSON from './getJSON'

const config = require('../config.json')
const BACKEND = config.BACKEND


class Courier {
  getData(type, id = "") {
    const delivery = {
      id,
      type,
      status: "request"
    };
    Store.setState({ delivery });

    getJSON(`${BACKEND}/story/${id}`, handOver);

    /// Callback within closure, in case of concurrent calls ///

    function handOver(error, payload) {
      if (error) {
        console.log("Courier error:", error)
      }

      const status = error ? "fail" : "complete"
      const delivery = {
        id,
        type,
        status,
        payload // will be undefined if there was an error
      };

      Store.setState({ delivery })
    }
  }

  preload(assets) {

  }
}

export default new Courier()
