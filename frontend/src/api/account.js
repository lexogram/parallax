/**
 * src/api/account.js
 *
 * A singleton instance of this script acts as a "middleware" for
 * user account details. Changes to the account are automatically
 * updated in Store and saved to localStorage.
 *
 * Depending on the type of account, the Store settings will
 * different:
 *
 * { ...
 *   account: {} || populated object
 * , demo: <boolean>
 * , ...
 * }
 */

import Storage from "./storage";
import Store from "./store";
import Courier from "./courier";

class Account {
  constructor() {
    this.filter = ["account"];
    this.accountUpdate = this.accountUpdate.bind(this);
  }

  createAccount() {
    // Create the account before setting up any Store listeners,
    // so that changes are only saved to Storage when they occur.
    // This will automatically get Courier to load either the
    // user's account data or the demo story. When these data are
    // available, a new getPage() call will be triggeerd in <App/>.

    let account = Storage.getItem("account");

    if (!account || !account._id) {
      // In demo mode. App.js will simply load the demo story
      account = {};
    } else {
      // If the user has an account, get the account preferences
      Courier.getData("account", account);
    }

    Store.setState({ account });
    this.remove = Store.addListener(this.accountUpdate, this.filter);
  }

  accountUpdate(account) {
    this.account = account
    Storage.setItem(account)
  }
}


export default new Account()
