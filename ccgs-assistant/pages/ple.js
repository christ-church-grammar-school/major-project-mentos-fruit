import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import Layout from '../components/layout'

export default function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <div>
        -------------------------
        {loading ? <>LOADING</> : <>
          {!user ? <p>User Not Signed In</p> : <>
          <p>Client Rendered Information:</p>
          <img src={user.picture} alt="user picture" />
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
        </>}</>}
      </div>
    </Layout>
  )
}
