import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

const TopNavbar = (user) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" >
        <Navbar.Brand>Mini Wallet</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user.name !== "" ? (
            <Navbar.Text>
              Signed in as: {user.name.toUpperCase()}
            </Navbar.Text>
          ) : (null)}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default TopNavbar
