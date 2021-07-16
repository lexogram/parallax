/**
 * /src/components/viewer.js
 *
 * The component is first rendered with just an empty <section>. This
 * first rendering sets this.viewPortRef.current to point to this
 * <section> element.
 * The componentDidMount() method can then calculate the height and
 * aspect-ratio of the <section>, and these details are stored in
 * this.state.
 *
 * Now that this.state.height and ~.ratio exist, a second render adds
 * the layer <div>s  at the given translateZ depths, with the
 * appropriate .left and .width values.
 *
 * When the window is resized, the .left and .width values can be
 * adjusted.
 *
 * ————————————————————————————————————————————————————————————————————
 * QUIRK:
 * Chrome cannot show <div>s at their full width below certain
 * translateZ value, without this affecting the total scrollWidth of
 * the parent <section>. The value of this cutOff translateZ depends
 * (amongst other things) on the minimum viewPort height that is to be
 * supported. (For a viewPort of height 480px, the value is 57.2)
 * Beyond this cutOff point, the width of the <div> is ignored when
 * calculating scrollWidth.
 *
 * Firefox will extend the scrollWidth to show the entire width of any
 * <div> to which a translateZ transform has been applied. The width of
 * <divs> beyond the cutOff point are thus determined by Firefox; that
 * below the cutOff point by Chrome.
 * —————————————————————————————————————————————————————————————————————
 *
 * Tested on Ubuntu 16.04 in Chrome (Blink), Firefox (Gecko) and
 * Epiphany (Webkit)
 *
 *
 */

import React, { Component } from "react";
import styled from "styled-components";

// Components
import ScrollMark from "./scrollmark";
import Layer from "./layer";

// Managers
import ScrollController from "../controllers/scroll";

// API
import getJSON from "../api/getJSON";

// Utilities
import { extend } from '../tools/utilities';

// <<< HARD-CODED
const CUT_OFF = 57.2; // 54.2         // determined by trial and error
// Allows a window height as low as 480px
const LAYER_BOTTOM = "39%"; // determined by trial and error

const BG_WIDTH = 800; // vh
const VIEWPORT_WIDTH = 200; // vh

const PERSPECTIVE = 100; // px
const PERSPECTIVE_ORIGIN = "50% 50%"; // may be tweaked

const BG_COLOR = "#333"; // arbitrary dark color
// HARD-CODED >>>

const StyledSection = styled.section`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;

  width: ${VIEWPORT_WIDTH}vh;
  perspective: ${PERSPECTIVE}px;
  perspective-origin: ${PERSPECTIVE_ORIGIN};

  background: ${BG_COLOR};
`;

// REACT PROPERTIES:
// props
// context
// refs
// updater

// LOCAL PROPERTIES:
// state
// viewPortRef

// LOCAL METHODS
// treatJSON
// setHeightAndRatio
// initializeScroll
// getScrollMarks
// getLayers

// EXTENDED PROPERTIES:
// scrollElement
// scrollMarks

// EXTENDED METHODS:
// setScrollable
// importScrollMarks
// scroll
// wheel

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // use HARD-CODED values
      cutOff: CUT_OFF,
      bgWidth: BG_WIDTH,
      bottom: LAYER_BOTTOM
    };

    extend(this, ScrollController);

    this.treatJSON = this.treatJSON.bind(this);
    this.setHeightAndRatio = this.setHeightAndRatio.bind(this);
    window.addEventListener("resize", this.setHeightAndRatio, false);

    this.viewPortRef = React.createRef();

    getJSON("/scenes/test.json", this.treatJSON);
  }

  setHeightAndRatio() {
    const viewPort = this.viewPortRef.current;

    if (!viewPort) {
      return;
    }

    const { height, width } = viewPort.getBoundingClientRect();
    const ratio = width / height;

    this.setState({ height, ratio });
  }

  initializeScroll() {
    const viewPort = this.viewPortRef.current;

    if (!viewPort) {
      return;
    }

    this.setScrollable(viewPort, this.state.scrollmarks);
  }

  treatJSON(error, json) {
    if (!this.viewPortRef.current) {
      // The component has not been mounted yet. React.StrictMode
      // is just testing
      return;
    }

    if (!error) {
      // json should be { scrollmarks, layers }
      this.setState(json);
    } else {
      console.log("error in JSON:", error);
    }
  }

  getScrollMarks() {
    let scrollmarks = [];

    if (this.viewPortRef.current && this.state.scrollmarks) {
      // Epiphany (webkit) will show layers beyond 78
      // below the fold(unseen)
      scrollmarks = this.state.scrollmarks.map((mark) => {
        return (
          <ScrollMark key={mark.name} {...mark} bgWidth={this.state.bgWidth} />
        );
      });
    }

    return scrollmarks;
  }

  getLayers() {
    let layers = [];

    if (this.viewPortRef.current && this.state.layers) {
      // Epiphany (webkit) will show layers beyond 78
      // below the fold(unseen)
      layers = this.state.layers.map((layer) => {
        return <Layer {...this.state} key={layer.name} {...layer} />;
      });
    }

    return layers;
  }

  render() {
    const scrollmarks = this.getScrollMarks();
    const layers = this.getLayers();

    return (
      <StyledSection ref={this.viewPortRef}>
        {scrollmarks}
        {layers}
      </StyledSection>
    );
  }

  componentDidMount() {
    this.setHeightAndRatio();
    this.initializeScroll();
  }
}

export default Viewer;
