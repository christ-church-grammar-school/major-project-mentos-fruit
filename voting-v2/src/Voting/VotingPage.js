import React from 'react'
import "./VotingHome.css"
import "./VotingPage.css"
import { motion } from 'framer-motion'

function VotingPage() {
    var test = ["Brad", "Connor", "Graham", "Angela"]

    function submitCand() {
        var x = document.getElementById("type")
        console.log(x.value)
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