import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'
import styles from "../styles/nav.module.css"
import logo from "./logoFull.jpg"
import na from "./NA.png"
import { useRouter } from 'next/router'
import { motion, useAnimation, AnimatePresence } from "framer-motion"

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
        const imgDir = {
          "/": "icons8-dashboard-100.svg",
          "/diary": "icons8-today-100.svg",
          "/timetable": "icons8-calendar.svg",
          "/map": "icons8-map-100.svg",
          "/info": "icons8-info-100.svg",
          "/vote": "icons8-elections-100.svg",
          "/settings": "icons8-slider-100.svg",
        }

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
              opacity: 1,
              transition: { duration: 0 },
            })
          }
          window.addEventListener("resize", callback)

          if (firstLoad === true) {
            controls.start({
              y: document.getElementById(router.pathname).offsetTop,
              opacity: 1,
              transition: { duration: 0 },
            })
            setFirstLoad(false)
          } else {
            controls.start({
              y: document.getElementById(router.pathname).offsetTop,
              opacity: 1,
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

            <motion.div animate={controls} className={styles.select} id="select">
              <AnimatePresence>
              <motion.img className={styles.navIcon} src={imgDir[router.pathname]} key={imgDir[router.pathname]}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{delay: 0.5}}
              />
              </AnimatePresence>
            </motion.div>
            {links.map((el) => 
              <Link href={el.url} key={el.url}>
                <a id={el.url} className={router.pathname === el.url ? styles.selected : styles.unSelected}>{el.display}</a>
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