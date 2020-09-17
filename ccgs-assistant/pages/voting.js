import { getLayout } from '../components/layout'
import { useFetchUser } from '../lib/user'
import styles from "../styles/voting.module.css"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

function VotingPage() {
    const { user, loading } = useFetchUser()
    return (
        <>
        {loading ? <>LOADING</> : <>
            {!user ? <p>User Not Signed In. Please sign in at the bottom left.</p> : <>
                <h1>Lol</h1>
          </>}</>}
          </>
    )
}

VotingPage.getLayout = getLayout

export default VotingPage