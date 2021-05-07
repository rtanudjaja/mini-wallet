import React, { useState } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import UserContext from './context/UserContext';

import Home from "./components/Home";
import TopNavbar from "./components/TopNavbar";
import Wallet from "./components/Wallet"
import Error from "./components/Error"

export default function App() {
  const initialUserState = {
    name: "",
    customer_xid: "",
    login: "",
    token: ""
  };
  const [user, setUser] = useState(initialUserState)

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <TopNavbar></TopNavbar>
        <Switch>
          <Route render={(props) => (<Home {...props} />)} path="/" exact={true} />
          <Route render={(props) => (<Wallet {...props} />)} path="/wallet" exact={true} />
          <Route component={Error} path="/error" exact={true} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </UserContext.Provider>
    </div>
  )
}