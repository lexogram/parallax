/**
 * /src/components/scrollmark.js
 */

import React, { Component } from "react";
import styled from "styled-components";

/**
 * ${ props => console.log(props) }
 *
 * props = {
 *   bgWidth:     <number of vh units>
 * , width:       <number 0.0 - 1.0, proportion of bgWidt>
 * , center:      <number 0.0 - 1.0, proportion of bgWidt>
 * , debug-color: <hex color>
 * , theme:       {}
 *
 * HARD-CODED values for height and bottom are used.
 */
const StyledDiv = styled.div`
  position: absolute;

  height: 100%;
  bottom: 0;
  background-color: ${(props) => props.debug_color};

  ${(props) => {
    const width = props.bgWidth * props.width;
    const center = props.bgWidth * props.center;
    const left = center - width / 2;
    return "left: " + left + "vh; width: " + width + "vh;";
  }}

  & div {
    position: absolute;

    height: 100%;
    top: 0;
    background-color: #fff;

    ${(props) => {
      const center = props.bgWidth * props.width ;
      const width = 0.2;
      const left = (center - width) / 2;
      return "left: " + left + "vh; width: " + width + "vh;";
    }}
  }

  & p {
    position: absolute;
    top: 0;
    margin: 0;
    color: #fff;
  }
`;


export default class ScrollMark extends Component {
  /**
   * console.log("this.props:", this.props)
   *
   * props = {
   *   key:         <unique string for this element>
   * , bgWidth:     <number of vh units>
   * , width:       <number 0.0 - 1.0, proportion of bgWidt>
   * , center:      <number 0.0 - 1.0, proportion of bgWidt>
   * , debug-color: <hex color>
   * }
   */
  render() {
    const name = this.props.name;

    return (
      <StyledDiv {...this.props}>
        <div></div>
        <p>{name}</p>
      </StyledDiv>
    );
  }
}
