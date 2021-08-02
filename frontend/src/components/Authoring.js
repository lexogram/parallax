/**
 * src/components/Authoring.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledComponent = styled.div`
  background-color: #fee;
`


class Authoring extends Component {
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
        <h1>Authoring</h1>
      </StyledComponent>
    )
  }
}


export default Authoring
