/**
 * src/components/splash.js
 *
 * Placeholder splash screen, which will appear until enough data
 * becomes available to show the interface.
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledSplash = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #cff;
  background-image: url(../../img/cityscape.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

class Splash extends Component {
  render() {
    return (
      <StyledSplash
        id="splash"
      />
    )
  }
}


export default Splash
