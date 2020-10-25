import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from "../Dashboard/dashboard.js"
import "../Global Styles/globals.css"
import { Nav, MobileNav } from "../Navigation/nav.js"
import Diary from "../Diary/diary.js"
import Map from "../Map/map.js"
import { Timetable } from "../Timetable/timetable.js"
import Info from "../Information/info.js"
import VotingHome from "../Voting/VotingHome"
import { Profile } from "../Profile/profile"
import UserContext from '../UserContext'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: window.innerWidth };
    
  }

  static contextType = UserContext;

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
    // console.log(this.state.windowWidth)
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.scrollTo(0, 0)
    
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  } 

  render() {
    const { user } = this.context;
    console.log(user)
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vw = window.innerWidth * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    return (
    <>
      <div className="main">
        {user.loggedIn && <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="/diary">
            <Diary />
          </Route> */}
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/timetable">
            <Timetable />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/vote">
            <VotingHome />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>}
      </div>
      {(this.state.windowWidth < 1000) ? <MobileNav /> : <Nav />}
    </>
  );
  }
}

export default Main;