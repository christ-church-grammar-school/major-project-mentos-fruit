import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from "../Dashboard/dashboard.js"
import "../Global Styles/globals.css"

function Main(props) {
  return (
    <div>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      </Switch>
    </div>
  );
}

export default Main;