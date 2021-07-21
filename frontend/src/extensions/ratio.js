/**
 * scr/extensions/aspect.js
 *
 * Creates a listener to watch for changes to the viewport dimensions
 * and updates Store with the new height and aspect-ratio when this
 * happens.
 *
 * The methods of this class are added to the App component.
 */

import Store from "../api/store";

class AspectRatio {
  initializeHeightAndRatio() {
    console.log("setHeightAndRatio")
    this.setHeightAndRatio = this.setHeightAndRatio.bind(this)
    window.addEventListener("resize", this.setHeightAndRatio, false);

    this.setHeightAndRatio();
  }

  setHeightAndRatio() {
    const viewPort = this.viewPortRef && this.viewPortRef.current;

    if (!viewPort) {
      return;
    }

    const { height, width } = viewPort.getBoundingClientRect();
    const ratio = width / height;

    Store.setState({ height, ratio });
  }
}

export default AspectRatio
