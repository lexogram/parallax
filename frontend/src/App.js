/**
 * frontend/src/App.js
 *
 * The App component has a simple role. When it mounts, its starts
 * the process of checking the LocalStorage for user account data.
 * This can be in one of five formats, each of which gives different
 * access rights:
 *
 * - Missing.
 *   This indicates that the device owner is a Guest
 * - Adherent
 *   The device owner has provided an email address
 * - Subscriber
 *   The device owner has paid a subscription
 * - Author
 *   The device owner can save changes to certain titles
 * - Admin
 *   The device owner is part of the development team
 *
 * This App component will:
 * => Display a Splash screen while the account details are being
 *    read into the Store (and for a minimum period, if that is
 *    longer)
 * => Display a Routing componenent (Reader or Author
 *    depending on the Store settings, thereafter.
 */

// React
import { Component } from "react";

// API
import Store from "./api/store";
import Account from "./api/account";
import Preferences from "./api/preferences";

// Components
import Splash from "./components/Splash";
import Routing from "./components/Routing";

// Config
const config = require("./config.json");
const SPLASH_DELAY = config.SPLASH_DELAY || 2000;

class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.accountUpdate = this.accountUpdate.bind(this);
    this.preferenceUpdate = this.preferenceUpdate.bind(this);
    this.hideSplash = this.hideSplash.bind(this);

    this.splashOut = setTimeout(this.hideSplash, SPLASH_DELAY);
  }

  accountUpdate({ account }) {
    // Three scenarios:
    // 1. There is no account data ({}). In this case, the visitor i
    //    a guest, and we should start loading the demo story
    // 2. The account data is just what was read from localStorage,
    //    and there is no Preferences data. In this case, we need
    //    to get the full account data from the database.
    // 3. The full account data has been received from the database,
    //    so we can apply the startUp preferences.
    // In all three cases, we can start requesting remote data and
    // updating Store, even before the SPLASH_DELAY is over.

    if (!account._id) {
      // Case 1.
    } else {
      // Case 2.
    }

    if (this.splashOut) {
      // Ensure that the splash page remains visible for at
      // least SPLASH_DELAY milliseconds
      this.account = account;
      return;
    }

    this.setState({ account });
  }

  preferenceUpdate() {

  }

  hideSplash() {
    // Called by the timeout that was set in the constructor.
    // The splash screen has been visible for long enough...
    this.splashOut = 0;
    const account = this.account;

    if (account) {
      // ... so hide it already if the account has been set
      // console.log("Hiding splash after", SPLASH_DELAY)
      this.accountUpdate({ account });
    }
  }

  getSplashOrRouter() {
    if (this.state.account) {
      // undefined | {} | { _id: ... }
      return <Routing />;
    } else {
      return <Splash />;
    }
  }

  render() {
    const component = this.getSplashOrRouter();
    return component;
  }

  componentDidMount() {
    Store.addListener(this.accountUpdate, ["account"]);
    Store.addListener(this.preferenceUpdate, ["preferences"]);
    Account.createAccount();
    Preferences.createPreferences();
  }
}

export default App;
