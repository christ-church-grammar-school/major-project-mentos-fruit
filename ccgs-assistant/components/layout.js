import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { useFetchUser } from '../lib/user'
import { Login, Logout } from './authFlow'
import styles from "../styles/nav.module.css"
import logo from "./logoFull.jpg"
import na from "./NA.png"
import { useRouter } from 'next/router'
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Head from 'next/head'

function Layout({ children }) {
        const router = useRouter()
        const [firstLoad, setFirstLoad] = useState(true)
        const [focus, setFocus] = useState(router.pathname)
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

        function handleLoad() {
          controls.start({
            y: document.getElementById(router.pathname).offsetTop,
            opacity: 1,
            transition: { duration: 0 },
          })
        }

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
          } 
          return () => window.removeEventListener("resize", callback);
      }, [router])

      function handleNav(evt) {
        controls.start({
              y: document.getElementById(evt.target.id).offsetTop, //This seems counter-intuitive. Im lazy.
              opacity: 1,
              transition: { duration: 0.7, type: "tween", ease: "anticipate"},
            })
        setFocus(evt.target.id)
      }

    return (
        <>
        <Head>
          <link rel="icon" href={imgDir[router.pathname]} type="image/x-icon"/>
          <title>CCGS Assistant</title>
        </Head>
         <div className={styles.all}>
          <div className={styles.sideNav}>
            <img src={logo} className={styles.image} onLoad={handleLoad}/>

            <motion.div animate={controls} className={styles.select} id="select">
              <AnimatePresence>
              <motion.img className={styles.navIcon} src={imgDir[router.pathname]} key={imgDir[router.pathname]}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{delay: 0.3}}
              />
              </AnimatePresence>
            </motion.div>
            {links.map((el) => 
              <Link href={el.url} key={el.url}>
                <a onClick={handleNav} id={el.url} className={focus === el.url ? styles.selected : styles.unSelected}>{el.display}</a>
              </Link>
            )}

            <div className={styles.profileArea}>

              <img src={user ? user.picture : na} className={styles.profileImage}/>

              <div className={styles.profileTextArea}>
              <p className={styles.profileText}>{user ? user["https://aad.com/DisplayName"] : <>User </>}</p>
              {loading ? <>LOADING</> :
                <>
                {user ? <>
                  <Logout>
                    <motion.button className={styles.sioButton} 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}>
                      Sign out
                    </motion.button>
                  </Logout>
                </>:<>
                  <Login>
                    <motion.button className={styles.sioButton}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}>
                      Sign in
                    </motion.button>
                  </Login>
                </>}
                </>
                }
              </div>
            </div>

          </div>
              
          <motion.main className={styles.mainC}><div>{children}</div></motion.main>
          </div>
        </>
    )
}

export const getLayout = page => <Layout>{page}</Layout>;

export default Layout;