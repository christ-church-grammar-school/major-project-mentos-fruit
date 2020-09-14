import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import { getLayout } from '../components/layout'

function Temp() {
  const { user, loading } = useFetchUser()
  // console.log(user)
  return (
      <div>
        -------------------------
        {loading ? <>LOADING</> : <>
          {!user ? <p>User Not Signed In</p> : <>
          <p>Client Rendered Information:</p>
          <img src={user.picture} alt="user picture" />
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
          ------------------------- API Values
          <p>graduation: {user["https://aad.com/gradYear"]}</p>
          <p>year: {user["https://aad.com/YearLevel"]}</p>
          <p>house: {user["https://aad.com/HouseTute"]}</p>
          <p>displayname: {user["https://aad.com/DisplayName"]}</p>
          <p>ID: {user["https://aad.com/EmployeeID"]}</p>
          <p>boarding: {user["https://aad.com/Boarding"]}</p>
        </>}</>}
      </div>
  )
}

Temp.getLayout = getLayout

export default Temp