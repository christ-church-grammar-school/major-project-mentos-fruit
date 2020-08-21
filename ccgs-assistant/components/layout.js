import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'
import styles from "../styles/nav.module.css"
import logo from "./logoFull.jpg"
import na from "./NA.png"
import { useRouter } from 'next/router'
import { motion, useAnimation } from "framer-motion"

function Layout({ children }) {
        const router = useRouter()
        const [firstLoad, setFirstLoad] = useState(true)
        const { user, loading } = useFetchUser()
        const controls = useAnimation()
        
        const links = [{url:"/", display: "Dashboard"}, 
        {url: "/diary", display: "Diary"},
        {url: "/timetable", display: "Timetable"},
        {url: "/map", display: "Campus Map"},
        {url: "/info", display: "School Information"},
        {url: "/vote", display: "Voting"},
        {url: "/settings", display: "Settings"}]

        // useEffect(() => {
        //     function callback() {
        //       setOffset({transform: document.getElementById(router.pathname).offsetTop})
        //     }
        //     window.addEventListener("resize", callback)

        //     setOffset({transform: document.getElementById(router.pathname).offsetTop})

        //     return () => window.removeEventListener("resize", callback);
        // }, [router])

        useEffect(() => {
          function callback() {
            controls.start({
              y: document.getElementById(router.pathname).offsetTop,
              transition: { duration: 0 },
            })
          }
          window.addEventListener("resize", callback)

          if (firstLoad === true) {
            controls.start({
              y: document.getElementById(router.pathname).offsetTop,
              transition: { duration: 0 },
            })
            setFirstLoad(false)
          } else {
            controls.start({
              y: document.getElementById(router.pathname).offsetTop,
              transition: { duration: 0.7, type: "tween", ease: "anticipate"},
            })
          }
          
          return () => window.removeEventListener("resize", callback);
      }, [router])


    return (
        <>
         {//<p>Times check execute {check}</p>
         //console.log(offset)
         }
         <div className={styles.all}>
          <div className={styles.sideNav}>
            <div className={styles.imageContainer}>
              <img src={logo} className={styles.image}/>
            </div>

            <motion.div animate={controls} className={styles.select} id="select"></motion.div>
            {links.map((el) => 
              <Link href={el.url} key={el.url}>
              <a id={el.url}>{el.display}</a>
            </Link>
            )}

            

            
            {/* <Link href="/">
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
            </Link> */}
            

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