/**
 * src/components/Library.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledComponent = styled.div`
  background-color: #fee;
`


class Library extends Component {
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
        <h1>Library</h1>
      </StyledComponent>
    )
  }
}


export default Library
