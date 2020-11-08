import React from 'react'
import "./VotingHome.css"
import "./VotingPage.css"
import { motion } from 'framer-motion'
import { UserData } from '../Profile/profile'

function VotingPage() {
    var test = ["Brad", "Connor", "Graham", "Angela"]
    const user = UserData()

    function submitCand() {
        var x = document.getElementById("type")
        if (x.value === "house") {
            addCand()
            addCandGroup((user.house).toLowerCase())
            console.log((user.house).toLowerCase())
        } else {
            addCand()
            addCandGroup(x.value)
            console.log(x.value)
        }
    }

    function addCand(){
        fetch('/api/addcandidate', {
            method: 'POST',
            body: JSON.stringify({ user: user.email }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(res => {
            if (res.status === 200) {
                console.log("I think it worked");
            } else {
              const error = [new Error(res.error),res.json()];
              throw error;
            }
          }).catch((err) => {
                console.log(err);
                err[1].then((res) => {
                    // this.setState({message: res.error})
                    // this.setState({isEnabled: true});
                    console.log("You broke it")
                })
          });
    }

    function addCandGroup(candGroup){
        fetch('/api/addcandgroup', {
            method: 'POST',
            body: JSON.stringify({ user: user.email, group: candGroup }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(res => {
            if (res.status === 200) {
                console.log("I think it worked");
            } else {
              const error = [new Error(res.error),res.json()];
              throw error;
            }
          }).catch((err) => {
                console.log(err);
                err[1].then((res) => {
                    // this.setState({message: res.error})
                    // this.setState({isEnabled: true});
                    console.log("You broke it")
                })
          });
    }

    var houseCandidates

    function getCands(candGroup){
        fetch('/api/getcands', {
            method: 'POST',
            body: JSON.stringify({ type: candGroup }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(res => {
            if (res.status === 400) {
                const error = [new Error(res.error),res.json()];
                throw error;
            } else {
                console.log("I think it worked");
                houseCandidates = res.status
            }
          }).catch((err) => {
                console.log(err);
                err[1].then((res) => {
                    // this.setState({message: res.error})
                    // this.setState({isEnabled: true});
                    console.log("You broke it")
                })
          });
    }

    return (
        <div className="buttonArea">
            <p>MESSAGE: Currently, you can only add yourself as a candidate. However, most voting functions have been implemented server side, but has not been made interactable.</p>
            <h1 style={{marginBottom: '20px'}} className="subH">Adding yourself as a candidate:</h1>
            <select defaultValue="none" name="type" id="type">
                <option value="none" disabled hidden> 
                    Select an Option 
                </option> 
                <option value="house">House</option>
                <option value="school">School</option>
                <option value="boarding">Boarding</option>
            </select>
            <motion.button onClick={() => submitCand()} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="optionToPage">Add candidate</motion.button>

            <h1 style={{marginBottom: '20px'}} className="subH">Vote (House - {user.house}):</h1>
            {
                // console.log(getCands(user.house))
            }
            <select name="person" id="person">
                {test.map((el) => 
                    <option value={el} key={el}>{el}</option>
                )}
            </select>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="optionToPage">Submit 1</motion.button>
        </div>
    )
}

export default VotingPage