import Head from 'next/head'
import Link from 'next/link'
//import { useFetchUser } from '../lib/user'
import { getLayout } from '../components/layout'

function Home() {
  //const { user, loading } = useFetchUser()

  return (
      <div>
        <img src="PAGES/Dashboard.png" className="placeholder"/>
      </div>
  )
}

Home.getLayout = getLayout

export default Home
