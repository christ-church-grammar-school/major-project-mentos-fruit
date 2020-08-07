import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useFetchUser } from '../lib/user'

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
         <p>Times check execute {check}</p>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/ple">
              <a>PLE</a>
            </Link>
            {loading ? <>LOADING</> :
            <>
            {user ? <>
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
            </>:<>
            <li>
                <a href="/api/login">Login</a>
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