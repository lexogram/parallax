/**
 * src/api/preferences.js
 *
 * A singleton instance of this script acts as a "middleware" for
 */

import Storage from "./storage";
import Store from "./store";
import Courier from "./courier";

class Preferences {
  constructor() {
    this.filter = ["account"];
    this.preferencesUpdate = this.preferencesUpdate.bind(this);
  }

  createPreferences() {

    this.remove = Store.addListener(this.preferencesUpdate, this.filter);
  }

  preferencesUpdate(account) {
  }
}

export default new Preferences();
