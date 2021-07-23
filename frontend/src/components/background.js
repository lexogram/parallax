/**
 * src/components/background.js
 */

import { Component } from "react";
import styled from "styled-components";

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

class Background extends Component {
  render() {
    const src = this.props.src;
    return <StyledBackground id="background" src={src} />;
  }
}

export default Background;
