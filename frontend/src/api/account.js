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
    const demo = (this.demo = !!account);

    if (demo) {
      // In demo mode, simply load the demo story
      account = {};
<<<<<<< HEAD
      // console.log("account:", account);
=======
      console.log("account:", account);
>>>>>>> 2876f44784610b61a87a6a8eb44f2c94aaecabe5

      Courier.getData("story"); // no id given
    } else {
      // If the user has an account, get the account preferences
      Courier.getData("account", account);
    }

    Store.setState({ account, demo });
    this.remove = Store.addListener(this.accountUpdate, this.filter);
  }

  accountUpdate(account) {
    //acount = { account: <value> }
    this.account = account.account
    Storage.setItem(account)

    const demo = this.demo
    if (this.account && !demo) {
      Storage.setItem({ demo })
    }
  }
}


export default new Account()
