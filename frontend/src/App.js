/**
 * /src/App.js
 *
 * The App component is mounted and renders once before it gets
 * Account to check whether the current user has registered. This
 * ensures that the splash screen is shown, and that all the
 * handOver() calls set up by the Courier instance will be triggered.
 */

import { Component } from "react";

// Data
import Store from "./api/store";
import Account from "./api/account";

// Utilities
import { extend } from './tools/utilities';

// Extensions
import GetPage from './extensions/getpage'

const config = require("./config.json");
const SPLASH_DELAY  = config.SPLASH_DELAY || 2000


class App extends Component {
  constructor(props) {
    super(props);

    // All the technicalities are taken care of in a separate
    // script whose methods are added to this instance.
    extend(this, GetPage);

    this.handOver = this.handOver.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.hideSplash = this.hideSplash.bind(this);

    this.pageOptions = {};

    this.state = {
      page: "loading"
    };
    Store.setState(this.state);

    this.pageSet = 0
    this.splashOut = setTimeout(this.hideSplash, SPLASH_DELAY);
  }

  hideSplash() {
    // Called by the timeout that was set in the constructor.
    // The splash screen has been visible for long enough...
    this.splashOut = 0

    if (this.pageSet) {
      // ... hide it already if another page has been set
      console.log("Hiding splash after", SPLASH_DELAY)
      this.pageChange(this.pageSet)
      this.pageSet = 0
    }
  }

  /**
   * pageChange listens to changes to ["page"] in the Store.
   * When the Store registers a change to the page, the App
   * should re-render with the new page.
   *
   * @param {*} newPage
   * @memberof App
   */
  pageChange(newPage) {
    if (this.splashOut) {
      // Ensure tha the splash page remains visible for at
      // least SPLASH_DELAY milliseconds
      this.pageSet = newPage
      return
    }

    console.log("Showing the new page")
    this.setState(newPage); // just used to force App to render
  }

  handOver({ delivery }) {
    this.setPageFor(delivery) // in getpage script
  }

  render() {
    const page = this.getPage(); // in extensions/getpage.js
    return page;
  }

  componentDidMount() {
    // Not called after first render in StrictMode
    this.mounted = true;

    // We can now start handling pageChange callbacks from the Store
    Store.addListener(this.pageChange, ["page"]);
    Store.addListener(this.handOver, ["delivery"]);
    Account.createAccount();
  }
}

export default App;
