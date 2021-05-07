import React, { useContext } from 'react'
import UserContext from "../context/UserContext"
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

import Login from './Login';

const Home = (props) => {
  const { user } = useContext(UserContext);

  return (
    <Jumbotron className="h-100 d-flex align-items-center justify-content-center" >
      <Container className="w-100 d-flex flex-column align-items-center">
        <h1>{user.name !== "" ? user.name + "'s" : "My"} E-Wallet</h1>
        <Image src="../../wallet.png" fluid roundedCircle />
        <Login {...props} />
      </Container>
    </Jumbotron>
  )
}

export default Home
