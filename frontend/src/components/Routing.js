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
 * => Display a Router componenent (Reader or Author
 *    depending on the Store settings, thereafter.
 */

import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AboutUs from "./AboutUs";
import Account from "./Account";
import Authoring from "./Authoring";
import Library from "./Library";
import Preferences from "./Preferences";
import Story from "./Story";
import Home from "./Home";
import { render } from "@testing-library/react";

class Routing extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/about">
            <AboutUs />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/authoring">
            <Authoring />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/story">
            <Story />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Routing;
