import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'
import styles from "../styles/nav.module.css"
import logo from "./logo.jpg"

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
         <div className={styles.all}>
          <div className={styles.sideNav}>
            <div className={styles.logo}>
              <img src={logo} className={styles.image}/>
              <h1 className={styles.upper}>CCGS</h1>
              <br/>
              <h1 className={styles.lower}>Assistant</h1>
            </div>
            <div>
              <Link href="/">
                <a>Dashboard</a>
              </Link><br/>
              <Link href="/diary">
                <a>Diary</a>
              </Link><br/>
              <Link href="/timetable">
                <a>Timetable</a>
              </Link><br/>
              <Link href="/map">
                <a>Campus map</a>
              </Link><br/>
              <Link href="/info">
                <a>School information</a>
              </Link><br/>
              <Link href="/vote">
                <a>Voting</a>
              </Link><br/>
              <Link href="/settings">
                <a>Settings</a>
              </Link><br/>
            </div>
          </div>
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
          </div>
        </>
    )
}

export const getLayout = page => <Layout>{page}</Layout>;

export default Layout;