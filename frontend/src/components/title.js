/**
 * src/components/title.jsx
 */

import { Component } from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  background-color: #fee;
`;

class Title extends Component {
  render() {
    return <StyledTitle />;
  }
}

export default Title;
