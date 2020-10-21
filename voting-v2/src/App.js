import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {getAuth} from './Auth';
import Login from './Login/Login';
import Main from './Main/Main';
import { AnimatePresence, motion } from "framer-motion"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={loggedIn:undefined}
    this.handler = this.handler.bind(this)
  }

  componentDidMount() {
    getAuth().then((res)=>{
      this.setState({loggedIn: res})
    });
  }

  handler() {
    this.setState({
      loggedIn: true
    })
  }

  render () {

  return (
    
    <div className="App">
      
      <Router>
       <p> thing is loaded. </p>
      <AnimatePresence>
        {!this.state.loggedIn ? (this.state.loggedIn === false &&
        <Route key="child" path="/"><Login handler={this.handler}/></Route>
        ):
        <Main/> 
        }
        </AnimatePresence>
      </Router> 
    </div>
  );}}



export default App;
