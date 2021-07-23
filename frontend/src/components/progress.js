/**
 * src/components/progress.js
 *
 * Use the CSS Custom Property var(--bg) set in index.css
 */

import { Component } from "react";
import styled from "styled-components";
import Store from "../api/store";

const StyledProgress = styled.div`
  position: absolute;
  bottom: 0;
  height: 20vmin;
  width: 100%;
  background-color: #0000000f;
  z-index: 1;

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
    height: 100%;
    right: ${props => props.progress}%;
  }

  & div:last-child {
    left: 100%;
  }
`;

class Progress extends Component {
  constructor(props) {
    super(props);
    this.setProgress = this.setProgress.bind(this);
    this.state = { progress: 0 }
  }

  render() {
    const progress = (1 - this.state.progress) * 100
    return (
      <StyledProgress id="progress-bar" progress={progress}>
        <div></div>
        <img src="/img/train.svg" alt="train" />
        <div></div>
      </StyledProgress>
    );
  }

  setProgress({ progress }) {
    this.setState({ progress });
  }

  componentDidMount() {
    const filter = ["progress"];
    this.remove = Store.addListener(this.setProgress, filter, true);
  }

  componentWillUnmount() {
    this.remove();
  }
}

export default Progress;
