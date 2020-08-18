import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'
import styles from "../styles/nav.module.css"
import logo from "./logoFull.jpg"
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
            <div className={styles.imageContainer}>
              <img src={logo} className={styles.image}/>
            </div>
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

            <div className={styles.profileArea}>

              <img src={user ? user.picture : na} className={styles.profileImage}/>

              <div className={styles.profileTextArea}>
              <p className={styles.profileText}>{user ? user["https://aad.com/DisplayName"] : <>User </>}</p>
                {loading ? <>LOADING</> :
                <>
                {user ? <>
                  <Logout>
                    <button className={styles.sioButton}>Logout</button>
                  </Logout>
                </>:<>
                  <Login>
                    <button>Login</button>
                  </Login>
                </>}
                </>
                }
              </div>
            </div>


          </div>
              
          <main className={styles.mainC}><div>{children}</div></main>
          </div>
        </>
    )
}

export const getLayout = page => <Layout>{page}</Layout>;

export default Layout;