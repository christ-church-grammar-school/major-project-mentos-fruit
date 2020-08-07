import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import { getLayout } from '../components/layout'

const Temp = () => {
  const { user, loading } = useFetchUser()

  return (
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
  )
}

Temp.getLayout = getLayout

export default Temp