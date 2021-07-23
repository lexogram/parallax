/**
 * src/components/title.js
 */

import { Component } from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  position: absolute;
  font-size: 10vmin;
  z-index: 1;
`;

class Title extends Component {
  render() {
    return <StyledTitle>{this.props.children}</StyledTitle>;
  }
}

export default Title;
