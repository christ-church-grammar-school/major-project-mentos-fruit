import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from "../Dashboard/dashboard.js"
import "../Global Styles/globals.css"
import { Nav, MobileNav } from "../Navigation/nav.js"
// import Diary from "../Diary/diary.js"
import Map from "../Map/map.js"
import { Timetable } from "../Timetable/timetable.js"
import Info from "../Information/info.js"
import VotingHome from "../Voting/VotingHome"
import { Profile } from "../Profile/profile"
import UserContext from '../UserContext'
import { AnimatePresence, motion } from 'framer-motion';
import VotingStepOne from "../Voting/VotingStep1"
import VotingPage from "../Voting/VotingPage"

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
    // console.log(user)
    
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    const pages = [
      {path: "/", component: <Home />},
      {path: "/map", component: <Map />},
      {path: "/timetable", component: <Timetable windowWidth={this.state.windowWidth} />},
      {path: "/info", component: <Info />},
      {path: "/vote", component: <VotingHome />},
      {path: "/profile", component: <Profile />},
      {path: "/vote/candidates", component: <VotingStepOne />},
      {path: "/vote/page", component: <VotingPage />}
    ]

    return (
    <>
      <div className={(window.location.pathname !== "/vote/candidates") ? ((window.location.pathname !== "/vote/page") ? "main" : "mainVoting") : "mainVoting"}>
        {user.loggedIn && 
          <>{/* <Route exact path="/">
            <Home />
          </Route>
          <Route path="/diary">
            <Diary />
          </Route>
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
          </Route> */}

          {/* More simplified */}
          <AnimatePresence initial={false}>
            <Switch>
            {pages.map((el) => 
              <Route key={el.path} exact path={el.path}>
                <motion.div >
                  {el.component}
                </motion.div>
              </Route>
            )}
            </Switch>
          </AnimatePresence>
        </>}
      </div>
      {(window.location.pathname !== "/vote/candidates") ? ((window.location.pathname !== "/vote/page") ? ((this.state.windowWidth < 1000) ? <MobileNav /> : <Nav />) : <></>) : <></>
      }
      
    </>
  );
  }
}

export default Main;