/**
 * src/components/title.js
 */

import { Component } from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 10vmin;
`;

class Title extends Component {
  render() {
    return <StyledTitle>{this.props.children}</StyledTitle>;
  }
}

export default Title;
