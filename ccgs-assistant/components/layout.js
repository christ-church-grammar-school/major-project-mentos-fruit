import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'
import styles from "../styles/nav.module.css"
import logo from "./logo.jpg"
import na from "./NA.png"

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
              <div className={styles.imageContainer}>
                <img src={logo} className={styles.image}/>
              </div>
              <div className={styles.textContainer}>
                <h1 className={styles.upper}>CCGS</h1>
                <br/>
                <h1 className={styles.lower}>Assistant</h1>
              </div>
            </div>
            <div className={styles.links}>
              <Link href="/">
                <a>Dashboard</a>
              </Link>
              <Link href="/diary">
                <a>Diary</a>
              </Link>
              <Link href="/timetable">
                <a>Timetable</a>
              </Link>
              <Link href="/map">
                <a>Campus map</a>
              </Link>
              <Link href="/info">
                <a>School information</a>
              </Link>
              <Link href="/vote">
                <a>Voting</a>
              </Link>
              <Link href="/settings">
                <a>Settings</a>
              </Link>
            </div>
            <div className={styles.profileArea}>
              <div className={styles.profileImgArea}>
                <img src={user ? user.picture : na} className={styles.profileImage}/>
              </div>
              <div className={styles.profileTextArea}>
                {loading ? <>LOADING</> :
                <>
                {user ? <>
                  <Logout>Logout</Logout>
                </>:<>
                  <Login>Login</Login>
                </>}
                </>
                }
              </div>
            </div>
          </div>
              
          <main><div>{children}</div></main>
          </div>
        </>
    )
}

export const getLayout = page => <Layout>{page}</Layout>;

export default Layout;