import React from 'react';
import './Login.css';
import { motion, AnimatePresence } from "framer-motion";
import waveTop from './images/wave-top.png';
import waveMid from './images/wave-mid.png';
import waveBot from './images/wave-bot.png';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {user: '',password: '',message: 'Login', isEnabled: true};

        this.login=this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkSubmit = this.checkSubmit.bind(this);
        this.checkName = this.checkName.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    login(){
        this.setState({isEnabled: false, message: 'Authenticating'});
        fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify({user: this.state.user, password: this.state.password}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(res => {
            if (res.status === 200) {
                this.setState({message: "Great! Let's Get Started!"})
                setTimeout(() => {this.props.handler();}, 1000)
            } else {
              const error = [new Error(res.error),res.json()];
              throw error;
            }
          }).catch((err) => {
                console.log(err);
                err[1].then((res) => {
                    this.setState({message: res.error})
                    this.setState({isEnabled: true});
                })
          });
    }

    checkName(event){
        if(event.key === 'Enter'){
            this.passInput.focus();
        }
    }

    checkSubmit(event){
        if(event.key === 'Enter'){
            this.login();
        }
    }

    componentDidMount(){
        this.nameInput.focus(); 
     }

    render(){    
        const background = {  
            animate: {y: 0},
            exit: {y: "-100vh"},
          }

        const form = {  
            initial: {y: "-50%", x: "-50%"},
            animate: {y: "-50%", x: "-50%"},
            exit: {y: "calc(-50% - 100vh)", x: "-50%"},
        }

        const transition = {
            duration: 0.8,
            ease: [0, 0.1, 0.3, 1]
        }



        return(
            <div>
                
                <motion.div className="container"
                variants={form}
                transition={transition}
                animate={"animate"}
                initial={"initial"}
                exit={"exit"}>
                    <div className="mobileSupport">
                    <p id="title">CCGS Assistant</p>

                    <p>Username</p>
                    <input className={`${this.state.message === "Incorrect username or password" ? "redOutline" : ""}`} ref={(input) => { this.nameInput = input; }} onKeyPress={this.checkName} autoComplete="off" type="text" placeholder="Enter Username" id="user" value={this.state.username} onChange={this.handleChange} required/>

                    <p>Password</p>
                    <input className={`${this.state.message === "Incorrect username or password" ? "redOutline" : ""}`} ref={(input) => { this.passInput = input; }} onKeyPress={this.checkSubmit} autoComplete="off" type="password" placeholder="Enter Password" id="password" value={this.state.password} onChange={this.handleChange} required/>
                    <br/>
                    <motion.button disabled={!this.state.isEnabled} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} id="login" onClick={this.login}>{this.state.message}{!this.state.isEnabled && 
                    <div className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                        </svg>
                    </div>
                    }</motion.button>
                    </div>
                </motion.div>
                <motion.div className="waveWrapper waveAnimation"
                transition={transition}
                variants={background}
                animate={"animate"}
                exit={"exit"}>
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop" style={{backgroundImage: "url(" + waveTop + ")"}}></div>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle" style={{backgroundImage: "url(" +  waveMid + ")"}}></div>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom" style={{backgroundImage: "url(" +  waveBot + ")"}}></div>
                    </div>
                </motion.div>
                </div>
        );
        }
    }

export default Login;