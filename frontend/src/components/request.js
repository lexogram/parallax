/**
 * src/components/request.js
 *
 *
 */

import { Component } from "react";
import styled from "styled-components";

const StyledRequest = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #cff;
  background-image: url(../../img/cityscape.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

class Request extends Component {
  render() {
<<<<<<< HEAD
    // console.log("Request props:", this.props)
=======
    console.log("Request props:", this.props)
>>>>>>> 2876f44784610b61a87a6a8eb44f2c94aaecabe5
    return <StyledRequest id="request" {...this.props}></StyledRequest>;
  }
}

export default Request;
