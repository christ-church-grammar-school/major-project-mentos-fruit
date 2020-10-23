import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from "../Dashboard/dashboard.js"
import "../Global Styles/globals.css"
import { Nav, MobileNav } from "../Navigation/nav.js"
import Diary from "../Diary/diary.js"
import Map from "../Map/map.js"

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: window.innerWidth };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
    // console.log(this.state.windowWidth)
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  } 

  render() {
    return (
    <>
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/diary">
            <Diary />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
        </Switch>
      </div>
      {(this.state.windowWidth < 1000) ? <MobileNav /> : <Nav />}
    </>
  );
  }
}

export default Main;