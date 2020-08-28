import { getLayout } from '../components/layout'
import fetch from 'isomorphic-unfetch'

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
    
    return (
        <div>
            <img src="PAGES/Vote.png" className="placeholder"/>
            <button onClick={sendVotes}>Call API</button>
        </div>
    )
}

Voting.getLayout = getLayout

export default Voting