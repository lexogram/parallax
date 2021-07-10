/**
 * /src/components/layer.js
 *
 * Creates a <div> at a given translateZ, and sets its left and width
 * so that it fits the viewPort exactly, without altering the
 * scrollWidth.
 *
 * The aspect-ratio of the parent section will affect the left and
 * width values, so these will be recalculated each time the window is
 * resized.
 *
 * TODO: Delete counter, background-color, name, the name paragraph and
 * the `& p` CSS rules associated with it, which are used for debugging
 * purposes only
 */

import React, { Component } from "react";
import styled from "styled-components";

// <<< HARD-CODED for debugging
import { getGoldenColor } from "../tools/debug";
const DEBUG_HEIGHT = "0.5vh";
// HARD-CODED >>>

/**
 * ${ props => console.log(props) }
 *
 * props = {
 *   bgWidth:    <number - vh value for width of div at translateZ(0)>
 * , cutOff:     <number - minimum translateZ for quirk in Chrome>
 * , height:     <number - height of parent section in pixels>
 * , left:       <number - left of div to be flush with left at scroll 0>
 * , ratio:      <number - ratio of width / height of parent section>
 * , theme:      {}
 * , translateZ: <number - 0 - 88: translateZ value for this div>
 * , width:      <number - width of div to not affect scrollWidth of parent>
 *
 * HARD-CODED values for height and bottom are used.
 */
const StyledDiv = styled.div`
  position: absolute;

  height: ${DEBUG_HEIGHT};
  background-color: ${(props) => getGoldenColor({ number: props.number })};

  bottom: ${(props) => props.bottom};
  transform: translateZ(${(props) => props.translateZ}px);
  left: ${(props) => props.left}vh;
  width: ${(props) => props.width}vh;

  & p {
    position: absolute;
    bottom: 0;
    margin: 0;
  }
`;

export default class Layer extends Component {
  getDimensions() {
    // bgWidth (in vh units) and cutOff (in transformZ) are hard-
    // coded in the App.js script
    // ratio (width / height) is set on componentDidMount()
    // translateZ is read from an array.
    const { bgWidth, cutOff, ratio, translateZ } = this.props;
    const customWidth = translateZ < cutOff;
    const left = (translateZ * ratio) / 2;
    let width;

    if (customWidth) {
      // Use Chrome's quirky width for layers behind the cutOff
      width =
        bgWidth -
        (bgWidth / 100) * translateZ +
        Math.pow(translateZ / 10, 2) * (ratio / 2);
    } else {
      // Use Firefox's logical width
      width = bgWidth - translateZ * ratio;
    }

    return { left, width };
  }

  /**
   * console.log("this.props:", this.props)
   *
   * props = {
   *   bgWidth:    <number - vh value for width of div at translateZ(0) >
   * , cutOff:     <number - minimum translateZ for quirk in Chrome >
   * , height:     <number - height of parent section in pixels >
   * , ratio:      <number - ratio of width / height of parent section >
   * , translateZ: <number - 0 - 88: translateZ value for this div >
   * , key:        <unique string for this element>
   */
  render() {
    const name = this.props.name;
    const index = this.props.index
    const dimensions = this.getDimensions(); // left and width

    return (
      <StyledDiv {...this.props} {...dimensions} number={index}>
        <p>{name}</p>
      </StyledDiv>
    );
  }
}
