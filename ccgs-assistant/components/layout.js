import Link from 'next/link'
import React, { useState, useEffect } from "react";

function Layout({ user, loading = false, children }) {
        const [check, setCheck] = useState(0)


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

export default Layout