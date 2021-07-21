/**
 * src/components/endless.jsx
 */

import { Component } from "react";
import styled from "styled-components";

const StyledEndless = styled.div`
  position: fixed;
  bottom: 0;
  height: 20vmin;
  width: 100vw;
  background-color: #0000000f;

  & img {
    position: absolute;
    width: 20vmin;
    animation-name: loco;
    animation-duration: ${props => 2}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes loco {
    0% {
      left: 100vw;
    }
    100% {
      left: -20vmin;
    }
  }
`;

class Endless extends Component {
  render() {
    return (
      <StyledEndless id="endless-progress-bar">
        <img src="/img/locomotive.svg" alt="locomotive"/>
      </StyledEndless>
    );
  }
}

export default Endless;
