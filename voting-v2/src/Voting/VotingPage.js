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
            addCand((user.house).toLowerCase())
        } else {
            addCand(x.value)
        }
    }

    function addCand(candGroup){
        fetch('/api/addcandidate', {
            method: 'POST',
            body: JSON.stringify({ group: candGroup }),
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

    return (
        <div className="buttonArea">
            <h1 style={{marginBottom: '20px'}} className="subH">Adding yourself as a candidate:</h1>
            <select name="type" id="type">
                <option value="none" selected disabled hidden> 
                    Select an Option 
                </option> 
                <option value="house">House</option>
                <option value="school">School</option>
                <option value="boarding">Boarding</option>
            </select>
            <motion.button onClick={() => submitCand()} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="optionToPage">Add candidate</motion.button>

            <h1 style={{marginBottom: '20px'}} className="subH">Vote:</h1>
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