import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'

function Layout({ children }) {
        const [check, setCheck] = useState(0)
        const { user, loading } = useFetchUser()

        useEffect(() => {
            const id = setInterval(() => {
                setCheck(check + 1)
            }, 100);
            return () => clearInterval(id);
        }, [check])


    return (
        <>
         {//<p>Times check execute {check}</p>
         }
            <Link href="/">
              <a>Dashboard</a>
            </Link>
            <Link href="/diary">
              <a>Diary</a>
            </Link>
            <Link href="/settings">
              <a>Settings</a>
            </Link>
            {loading ? <>LOADING</> :
            <>
            {user ? <>
                <li>
                  <Logout>Logout</Logout>
                </li>
            </>:<>
            <li>
                <Login>Login</Login>
              </li>
            </>}
            </>
            }
        <main><div>{children}</div></main>
        </>
    )
}

export const getLayout = page => <Layout>{page}</Layout>;

export default Layout;