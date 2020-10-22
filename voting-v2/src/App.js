import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {getAuth} from './Auth';
import Login from './Login/Login';
import Main from './Main/Main';
import { AnimatePresence, motion } from "framer-motion"
import UserContext from './UserContext'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={auth:{loggedIn: true}}
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    getAuth().then((res)=> {
      console.log(res)
      this.setState({auth:res});
    });
  }

  handler() {
    getAuth().then((res)=>{
      this.setState({auth:res});
    });
  }

  setUser = (user) => {
    this.setState((prevState) => ({ auth: user }))
  }

  render () {
    const { user } = this.state.auth
    const { setUser } = this
    return (
      <div>
        <Router>
          <AnimatePresence>
          <UserContext.Provider
            value={{
              user,
              setUser,
            }}>
            {this.state.auth.loggedIn ?
            <Main/>:
            <Login handler={this.handler}/>}
            </UserContext.Provider>
          </AnimatePresence>
        </Router> 
      </div>
    );
  }
 }


export default App;
