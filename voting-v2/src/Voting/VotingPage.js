import React from 'react'
import "./VotingHome.css"
import "./VotingPage.css"

function VotingPage() {
    return (
        <div className="buttonArea">
            <h1 style={{marginBottom: '20px'}} className="subH">Adding yourself as a candidate:</h1>
            <select name="type" id="type">
                <option>House</option>
                <option>School</option>
                <option>Boarding</option>
            </select>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="optionToPage">Add candidate</motion.button>

            <h1 style={{marginBottom: '20px'}} className="subH">Vote:</h1>
            <option onClick={getCand()} name="person" id="person">
                <option>select</option>
            </option>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="optionToPage">Add candidate</motion.button>
        </div>
    )
}

export default VotingPage