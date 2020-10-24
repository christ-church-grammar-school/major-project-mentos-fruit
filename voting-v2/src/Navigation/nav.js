import React, { useState, useEffect, useContext } from "react"
import styles from "./nav.module.css"
import logo from "./logoFull.jpg"
import { motion, useAnimation, AnimatePresence, useViewportScroll, useTransform } from "framer-motion"
import { useLocation, NavLink } from "react-router-dom"
import na from "./na.png"
import {logout} from '../Auth'
import UserContext from '../UserContext'
import { useScroll } from './scroll.js'

function Nav(props) {
    const router = useLocation()
    const [firstLoad, setFirstLoad] = useState(true)
    const [focus, setFocus] = useState(router.pathname)
    const controls = useAnimation()
    const { user, setUser } = useContext(UserContext)
    
    const links = [{url:"/", display: "Dashboard"}, 
    // {url: "/diary", display: "Diary"},
    {url: "/timetable", display: "Timetable"},
    {url: "/map", display: "Campus Map"},
    {url: "/info", display: "School Information"},
    {url: "/vote", display: "Voting"},
    {url: "/settings", display: "Settings"}]
    const imgDir = {
        "/": "icons/icons8-dashboard-100.svg",
        "/diary": "icons/icons8-today-100.svg",
        "/timetable": "icons/icons8-calendar.svg",
        "/map": "icons/icons8-map-100.svg",
        "/info": "icons/icons8-info-100.svg",
        "/vote": "icons/icons8-elections-100.svg",
        "/settings": "icons/icons8-slider-100.svg",
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

    function logoutUpdate() {
        console.log("tuing")
        logout().then(ok => {
            console.log("logoutp")
            if (ok) {
                console.log("logout")
                setUser({loggedIn: false})
            }
        })
    }

    function getName() {
        var name
        if (user.name !== undefined) {
            name = user.name
            name = name.slice(13)
            name = name.split(',')
            return <>{name[0]}</>
        }
    }

    return (
        
        <>
        {/* <link rel="icon" href={imgDir[router.pathname]} type="image/x-icon"/>
        <title>CCGS Assistant</title> */}
        <div className={`${styles.sideNav} ${props.class}`}>
            <img src={logo} alt="" className={styles.image} onLoad={handleLoad}/>

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
                // <NavLink  to={el.url} key={el.url}>
                // <a onClick={handleNav} id={el.url} className={focus === el.url ? styles.selected : styles.unSelected}>{el.display}</a>
                // </NavLink>
                <NavLink onClick={handleNav} id={el.url} className={focus === el.url ? styles.selected : styles.unSelected} to={el.url} key={el.url}>
                    {el.display}
                </NavLink>
            )}

            <div className={styles.profileArea}>

                {/* <img src={/*user ? user.picture : na} className={styles.profileImage}/> */}
                <img src={user.image ? user.image : na} alt={getName()} className={styles.profileImage}/>

                <div className={styles.profileTextArea}>
                <p className={styles.profileText}>{user.loggedIn ? <>{getName()}</> : <>Person </>}</p>
                
                <NavLink to="/">
                    <motion.button className={styles.sioButton} 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={logoutUpdate}>
                        Sign out
                    </motion.button>
                </NavLink>
                </div>
            </div>

        </div>
                
            {/* <motion.main className={styles.mainC}><>{children}</></motion.main> */}
        </>
    )
}

function MobileNav() {
    const [toggle, setToggle] = useState(false);
    const scroll = useViewportScroll()

    const transition = {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut"
    }

    const variants = {
        open: { x: 0 },
        closed: { x: "-100vw" },
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    return (
        <div className={styles.mobNav}>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className={styles.toggle} onClick={() => setToggle(!toggle)}>
                {toggle === true ? <><i className="icon ion-ios-close"/></> : <><i className="icon ion-ios-menu"/></>}
            </motion.button>
            <motion.div style={{ y: scroll.scrollY }} id="mob" initial="closed" className={styles.MobileNav} transition={transition} variants={variants} animate={toggle === true ? "open" : "closed"}>
                <Nav class={styles.extra} />
            </motion.div>
        </div>
    )
}

// onScroll={() => document.getElementById('mob').style.y = window.pageYOffset}

export {
    Nav,
    MobileNav
};