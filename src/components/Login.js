import React, { useContext, useState } from 'react'
import WalletDataService from "../services/WalletDataService"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import UserContext from "../context/UserContext"
import { v4 as uuidv4 } from 'uuid'

const Login = (props) => {
  const [formName, setFormName] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormName(e.target.value ? e.target.value : "");
  }

  //login + initialise
  const handleLogin = (e) => {
    e.preventDefault();
    let _id = uuidv4();
    let _data = {
      customer_xid: _id,
    };
    if (formName) {
      WalletDataService.initialise(_data)
        .then(response => {
          if (response.data.status === "fail") {
            return props.history.push({
              pathname: '/error',
              state: {
                error: "ERROR: " + JSON.stringify(response.data.data.error),
              },
            })
          }
          let { token } = response.data.data;
          setUser({
            name: formName,
            customer_xid: _id,
            login: true,
            token: token,
          })
        }).catch(e => {
          props.history.push({
            pathname: '/error',
            state: {
              error: JSON.stringify(e),
            },
          })
        });
    } else {
      props.history.push({
        pathname: '/error',
        state: {
          error: "Error: Missing name",
        },
      })
    }
  }

  //logout
  const handleLogout = () => {
    if (user.login) {
      setUser({
        ...user,
        name: "",
        login: false,
      })
    }
  }

  const enableWallet = () => {
    WalletDataService.enable(user.token)
      .then(response => {
        if (response.data.status === "fail") {
          return props.history.push({
            pathname: '/error',
            state: {
              error: "ERROR: " + JSON.stringify(response.data.data.error),
            },
          })
        }
        props.history.push('/wallet');
      })
      .catch(e => {
        props.history.push({
          pathname: '/error',
          state: {
            error: JSON.stringify(e),
          },
        })
      });
  }

  return (
    <>
      {!user.login ? (
        <Form className="w-100 d-flex flex-column align-items-center" onSubmit={(e) => handleLogin(e)}>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={formName} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
        </Form>
      ) : (<div>
        <Button variant="success" onClick={() => enableWallet()}>Enable</Button>{' '}
        <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>
      </div>
      )}
    </>
  )
}

export default Login
