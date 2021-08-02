/**
 * src/components/Account.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledComponent = styled.div`
  background-color: #fee;
`


class Account extends Component {
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
        <h1>Account</h1>
      </StyledComponent>
    )
  }
}


export default Account
