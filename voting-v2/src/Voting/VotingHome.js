import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion"
import "./VotingHome.css"

function VotingHome() {    
    return (
        <div className="mainV">
            <h1 className="heading">Voting</h1>
            <p className="subtitle">Welcome to CCGS voting. Please see below for information on how and why to vote.</p>
            <div>
                <h1 className="subH">Why to vote:</h1>
                <div className="votingContainer">
                    <p className="text">
                    Voting at CCGS is vital in order to maintain the voice of the staff and student body. 
                    We strive to offer everyone an equal opportunity when choosing the correct leader. 
                    </p>
                </div>
            </div>
            <div>
                <h1 className="subH">How to vote:</h1>
                <div className="votingContainer">
                    <p className="text">
                    This voting system is preferential, meaning that the person with the greatest amount of votes may not neccessarily be the winner. 
                    This means that you will be required to indicate your first, second, third, etc. preference for which candidate should be prefect. 
                    Please follow the steps below.
                    </p>
                </div>
            </div>
            <div>
                <h1 className="subH">Step 1: See the candidates.</h1>
                <div className="votingContainer">
                    <p className="text">
                    First, look at the voting candidates and read their biographies. There information can be accessed by clicking their row. To vote, click next.
                    </p>
                </div>
            </div>
            <div>
                <h1 className="subH">Step 2: Select your preferences.</h1>
                <div className="votingContainer">
                    <p className="text">
                    For each preference, click the drop down menu in order to select a candidate. Alternatively, type in the field to search for them. Click submit in order save your preferences. 
                    </p>
                </div>
            </div>

            <NavLink target="blank" to='/vote/page'>
                <motion.button style={{marginTop: "50px"}} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="optionToPage">Voting Stuff</motion.button>
            </NavLink>
        </div>
    )
}

export default VotingHome