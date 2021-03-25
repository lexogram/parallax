/**
 * /src/App.js
 *
 * The component is first rendered with just an empty <section>. This first
 * rendering sets this.viewPortRef.current to point to this <section> element.
 * The componentDidMount() method can then calculate the height and
 * aspect-ratio of the <section>, and these details are stored in this.state.
 *
 * Now that this.state.height and ~.ratio exist, a second render adds the layer
 * <div>s  at the given translateZ depths, with the appropriate .left and
 * .width values.
 *
 * When the window is resized, the .left and .width values can be adjusted.
 *
 * QUIRK:
 * —————————————————————————————————————————————————————————————————————————————
 * Chrome cannot show <div>s at their full width below certain translateZ
 * value, without this affecting the total scrollWidth of the parent <section>.
 * The value of this cutOff translateZ depends (amongst other things) on the
 * minimum viewPort height that is to be supported. (For a viewPort of height
 * 480px, the value is 57.2)
 * Beyond this cutOff point, the width of the <div> is ignored when calculating
 * scrollWidth.
 *
 * Firefox will extend the scrollWidth to show the entire width of any <div> to
 * which a translateZ transform has been applied. The width of <divs> beyond the
 * cutOff point are thus determined by Firefox; that below the cutOff point by
 * Chrome.
 * —————————————————————————————————————————————————————————————————————————————
 *
 * Tested on Ubuntu 16.04 in Chrome (Blink), Firefox (Gecko) and Epiphany
 * (Webkit)
 *
 *
*/

import React, { Component } from 'react';
import styled from 'styled-components'

import Layer from './components/layer'




// <<< HARD-CODED
const CUT_OFF = 57.2 // 54.2         // determined by trial and error
                                     // Allows a window height as low as 480px
const LAYER_BOTTOM = "39%"           // determined by trial and error

const BG_WIDTH = 400                 // vh
const VIEWPORT_WIDTH = 200           // vh

const PERSPECTIVE = 100              // px
const PERSPECTIVE_ORIGIN = "50% 50%" // may be tweaked

const BG_COLOR = "#333"              // arbitrary dark color
// HARD-CODED >>>




const StyledSection = styled.section`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;

  width: ${VIEWPORT_WIDTH}vh;
  perspective: ${PERSPECTIVE}px;
  perspective-origin: ${PERSPECTIVE_ORIGIN};

  background: ${BG_COLOR};
`



class App extends Component {
  constructor(props) {
    super(props)
    this.state = { // use HARD-CODED values
      cutOff: CUT_OFF
    , bgWidth: BG_WIDTH
    , bottom: LAYER_BOTTOM
    }

    this.setHeightAndRatio = this.setHeightAndRatio.bind(this)
    window.addEventListener("resize", this.setHeightAndRatio, false)

    this.viewPortRef = React.createRef()
  }


  setHeightAndRatio() {
    const viewPort = this.viewPortRef.current

    if (!viewPort) {
      return
    }

    const { height, width } = viewPort.getBoundingClientRect()
    const ratio = width / height

    this.setState({ height, ratio })
  }


  getLayers () {
    let layers = []
    const viewPort = this.viewPortRef.current

    if (viewPort) {
      // Epiphany (webkit) will show layers beyond 78 below the fold (unseen)
      layers = [
        0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
      , this.state.cutOff
      , 60, 65, 70, 75, 80
      ].map(( translateZ, index) => {
        return <Layer
          {...this.state}
          key={`layer_${index}`}
          translateZ={translateZ}
        />
      })
    }

    return layers
  }


  render() {
    const layers = this.getLayers()

    return (
      <StyledSection
        ref={this.viewPortRef}
      >
        {layers}
      </StyledSection>
    )
  }


 componentDidMount() {
    this.setHeightAndRatio()
  }
}

export default App;
