import { getLayout } from '../components/layout'
import { useFetchUser } from '../lib/user'

function Diary() {
    const { user, loading } = useFetchUser()
    return (
        <>
        {loading ? <>LOADING</> : <>
          {!user ? <p>User Not Signed In. Please sign in at the bottom right.</p> : <>
            <div>
                <img src="PAGES/Diary.png" className="placeholder"/>
            </div>
        </>}</>}
        </>
    )
}

Diary.getLayout = getLayout

export default Diary