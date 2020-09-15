import { getLayout } from '../components/layout'
import { useFetchUser } from '../lib/user'

function Timetable() {
    const { user, loading } = useFetchUser()
    return (
        <>
        {loading ? <>LOADING</> : <>
          {!user ? <p>User Not Signed In. Please sign in at the bottom right.</p> : <>
            <div>
                <img src="PAGES/TT.png" className="placeholder"/>
            </div>
        </>}</>}
        </>
    )
}

Timetable.getLayout = getLayout

export default Timetable