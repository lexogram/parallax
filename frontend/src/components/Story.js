/**
 * src/components/Story.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledComponent = styled.div`
  background-color: #fee;
`


class Story extends Component {
  constructor(props) {
    super(props)

    this.method = this.method.bind(this)
  }


  method() {

  }


  render() {
    return (
      <StyledComponent
      >
        <h1>Story</h1>
      </StyledComponent>
    )
  }
}


export default Story
