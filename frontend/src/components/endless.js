/**
 * src/components/endless.js
 *
 * Use the CSS Custom Property var(--bg) set in index.css
 */

import { Component } from "react";
import styled from "styled-components";
import Store from "../api/store";

const config = require("../config.json");
const ENDLESS_DURATION = config.ENDLESS_DURATION;

const StyledEndless = styled.div`
  position: absolute;
  bottom: 0;
  height: 20vmin;
  width: 100%;
  background-color: #0000000f;

  & div {
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: var(--bg);
  }

  & div:first-child {
    z-index: 1;
    right: 100%;
  }

  & img {
    position: absolute;
    width: 20vmin;
    animation-name: loco;
    animation-duration: ${(props) => props.duration}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  & div:last-child {
    left: 100%;
  }

  @keyframes loco {
    0% {
      left: 100%;
    }
    100% {
      left: -20vmin;
    }
  }
`;

class Endless extends Component {
  constructor(props) {
    super(props);
    this.setDuration = this.setDuration.bind(this);

    // Assume a square viewport
    this.state = { duration: ENDLESS_DURATION };
  }

  render() {
    return (
      <StyledEndless id="endless-progress-bar" duration={this.state.duration}>
        <div></div>
        <img src="/img/locomotive.svg" alt="locomotive" />
        <div></div>
      </StyledEndless>
    );
  }

  setDuration({ ratio }) {
    const duration = ENDLESS_DURATION * ratio;
    // console.log("duration:", duration)
    this.setState({ duration });
  }

  componentDidMount() {
    const filter = ["ratio"];
    this.remove = Store.addListener(this.setDuration, filter, true);
  }

  componentWillUnmount() {
    this.remove();
  }
}

export default Endless;
