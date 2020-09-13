import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import { getLayout } from '../components/layout'

function Home() {
  const { user, loading } = useFetchUser()

  return (
      <>
      {loading ? <>LOADING</> : <>
        {!user ? <p>User Not Signed In. Please sign in at the bottom right.</p> : <>
          <div>
            <img src="PAGES/Dashboard.png" className="placeholder"/>
          </div>
      </>}</>}
      </>
  )
}

Home.getLayout = getLayout

export default Home
