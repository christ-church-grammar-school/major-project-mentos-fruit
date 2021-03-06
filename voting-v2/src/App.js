import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {getAuth} from './Auth';
import Login from './Login/Login';
import Main from './Main/Main';
import { AnimatePresence } from "framer-motion"
import UserContext from './UserContext'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={auth:{loggedIn: true}}
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    getAuth().then((res)=> {
      this.setState({auth:res});
    });
  }

  handler() {
    getAuth().then((res)=>{
      this.setState({auth:res});
    });
  }

  setUser = (user) => {
    this.setState({ auth: user })
  }

  render () {
    const user = this.state.auth
    const { setUser } = this
    return (
      <div>
        <Router>
          
          <UserContext.Provider
            value={{
              user,
              setUser,
            }}>
              <AnimatePresence>
            {this.state.auth.loggedIn ?
            <Main key="Main"/>:
            <Login handler={this.handler} key="Login"/>}
            </AnimatePresence>
            </UserContext.Provider>
        </Router> 
      </div>
    );
  }
 }


export default App;
