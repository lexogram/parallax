/**
 * /src/App.js
 *
 */

import React, { Component } from "react";

import Splash from "./components/splash";
import Viewer from "./components/viewer";
import Store from "./api/store"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: "loading"
    };

    this.statusChange = this.statusChange.bind(this)
    Store.initializeState(this.state)
    Store.addListener(this.statusChange, ["status"])

    setTimeout(() => {
      Store.setState({ status: "loaded" })
    }, 1000)
  }

  statusChange(newStatus) {
    this.setState(newStatus)
  }

  getPage() {
    switch (this.state.status) {
      case "loading":
        return <Splash />
      case "loaded":
        return <Viewer />
      default:
        return "This keeps the linter happy"
    }
  }

  render() {
    const page = this.getPage()
    return page
  }
}

export default App;
