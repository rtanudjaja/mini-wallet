import React from 'react'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

import Login from './Login';

const Home = (props) => {
  return (
    <Jumbotron className="h-100 d-flex align-items-center justify-content-center" >
      <Container className="w-100 d-flex flex-column align-items-center">
        <h1>My E-Wallet</h1>
        {/** Title */}
        <Image src="../../wallet.png" fluid roundedCircle />
        <Login {...props} />
        {/** LOGIN */}
      </Container>
    </Jumbotron>
  )
}

export default Home
