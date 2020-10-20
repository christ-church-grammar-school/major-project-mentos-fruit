import { getLayout } from '../components/layout'
import fetch from 'isomorphic-unfetch'
import { useFetchUser } from '../lib/user'
import styles from "../styles/vote.module.css"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

// Function is isomorphic however unnecessary..
async function sendVotes() {
    try {const resp = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/recordVote`,{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ type: "test" }),});
    console.log(`RESPONSE ${resp.status} ${resp.statusText}`)
    } catch {
        console.log("POST Failed")
    }
    
}

function Voting() {
    const { user, loading } = useFetchUser()
    return (
        <>
        {loading ? <>LOADING</> : <>
            {!user ? <p>User Not Signed In. Please sign in at the bottom left.</p> : <>
                <div className={styles.mainV}>
                <h1 className={styles.heading}>Voting</h1>
                <p className={styles.subtitle}>Welcome to CCGS voting. Please see below for information on how and why to vote.</p>
                <>
                    <h1 className={styles.subH}>Why to vote:</h1>
                    <div className={styles.container}>
                        <p className={styles.text}>
                        Voting at CCGS is vital in order to maintain the voice of the staff and student body. 
                        We strive to offer everyone an equal opportunity when choosing the correct leader. 
                        </p>
                    </div>
                </>
                <>
                    <h1 className={styles.subH}>How to vote:</h1>
                    <div className={styles.container}>
                        <p className={styles.text}>
                        This voting system is preferential, meaning that the person with the greatest amount of votes may not neccessarily be the winner. 
                        This means that you will be required to indicate your first, second, third, etc. preference for which candidate should be prefect. 
                        Please see below for an example.
                        </p>
                        <div className={styles.lower}>
                            <img src="/Voting/VotingCardTemp.jpg" className={styles.egImg}/>
                        </div>
                        <p className={styles.text}>
                            As you can see in this example, the voter has placed Candidate 3 as their first preference, and Candidate 1 as their last preference. 
                        </p>
                    </div>
                </>
                <div className={styles.buttonArea}>
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className={styles.optionToPage}>House Prefect</motion.button>
                </div>
            </div>
          </>}</>}
          </>
    )
}

Voting.getLayout = getLayout

export default Voting