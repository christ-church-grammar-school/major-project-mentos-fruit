import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from "../Dashboard/dashboard.js"
import "../Global Styles/globals.css"
import Nav from "../Navigation/nav.js"

function Main(props) {
  return (
    <>
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>   
      </div>
      <Nav />
    </>
  );
}

export default Main;