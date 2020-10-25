import React, { useContext, useEffect, useState } from 'react';
import "./dashboard.css"
import { UserData } from '../Profile/profile'
import { motion } from 'framer-motion'
import { MobileTimetable } from "../Timetable/timetable.js"

function Home() {
  const user = UserData()
  const periods = [
    {label: "Tutorial", time: "8.30am-8.50am"},
    {label: "Period 1", time: "8.55am-9.45am"},
    {label: "Period 2", time: "9.50am-10.40am"},
    {label: "Period 3", time: "11.00am-11.50am"},
    {label: "Period 4", time: "11.55am-12.45pm"},
    {label: "Period 5", time: "1.25pm-2.15pm"},
    {label: "Period 6", time: "2.20pm-3.05pm"}
  ]

  var colours = [];

  for (var k = 0; k < 20; k++) {
    colours[k] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
  }

  const extLinks = [
    {label: "Nexus", subtitle: "CCGS Online Resources", icon: "usefulLink/nexus.png", url: "https://nexus.ccgs.wa.edu.au"},
    {label: "CCGS Website", subtitle: "The school's official website", icon: "usefulLink/ccgswebsite.png", url: "https://ccgs.wa.edu.au"},
    {label: "CCGS News", subtitle: "See your nexus feed", icon: "usefulLink/news.png", url: "https://nexus.ccgs.wa.edu.au/news?topic=all"}
  ]
  
  //userTimetableToday for CURRENT DAY ONLY
  var userTimetableToday = [
    {class: "Tutorial", teacher: "Mr Nederpelt", room: "LibPrior"},
    {class: "English 1", teacher: "Mr Yeates", room: "M5"},
    {class: "Japanese 1", teacher: "Mr Shain", room: "R5"},
    {class: "Civics and Citienship 1", teacher: "Mr Phillips", room: "M8"},
    {class: "Maths 1", teacher: "Dr Sisson", room: "S15"},
    {class: "Advanced Software Development 1", teacher: "Mr Nolan", room: "L16"},
    {class: "Physics 1", teacher: "Ms Owen", room: "NP3"} 
  ]

  console.log(user.timetable)

  var userTodayA = []
  var userTodayB = []

  const d = new Date()
  const day = d.getDay()

  if(day > 0 && day < 6) {
    if(user.timetable !== undefined) {
      for(var i=0; i<7; i++) {
        userTodayA[i] = {
          class: user.timetable[i][day-1][0],
          code: user.timetable[i][day-1][1],
          info: user.timetable[i][day-1][2]
        }
        userTodayB[i] = {
          class: user.timetable[i][day+4][0],
          code: user.timetable[i][day+4][1],
          info: user.timetable[i][day+4][2]
        }
      }
    }
  }

  // console.log(userTodayA)
  // console.log(userTodayB)

  // for (var j = 0; j < userTimetableToday.length; j++) {
  //   userTimetableToday[j].colour = colours[j]
  // }

  var mobTodayTimetable = [];

  for(var i = 0; i < periods.length; i++) {
    mobTodayTimetable[i] = {period: periods[i], class: userTimetableToday[i]}
  }

  //d.getDay()

  const state = () => {
    const h = d.getHours()
    if (h >= 18) return "evening" 
    else if (h >= 12) return "afternoon"
    else return "morning"
  }

  //window width
  const size = useWindowSize()

  function useWindowSize() {
    const [windowWidth, setWindowWidth] = useState();
    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize()
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
  
    return windowWidth;
  }

  function todayTimetable() {
    if (day === 0 || day === 6) {
      return <p className="dashSub">No classes today.</p>
    } else {
      return <>
      <p className="dashSub">Today: </p>
      {(size < 1000) ? <MobileTimetable timetable={mobTodayTimetable} /> : 
      <table className="dashttLinks">
        <thead className="tableLinks">
            <tr>
              {periods.map((el, index, arr) => 
              <th key={el.label} className="tableHead">{el.label}<br/><p className="theadtime">{el.time}</p></th>
              )}
            </tr>
            <tr>
              {userTodayA.map((el) => 
                <td key={el.class} className="tableClass">
                  <h1 className="class">{el.class}</h1>
                  <p className="ttsub">{el.code}</p>
                  <p className="ttsub">{el.info}</p>
                </td>
              )}
            </tr>
            <tr>
              {userTodayB.map((el) => 
                <td key={el.class} className="tableClass">
                  <h1 className="class">{el.class}</h1>
                  <p className="ttsub">{el.code}</p>
                  <p className="ttsub">{el.info}</p>
                </td>
              )}
            </tr>
        </thead>
      </table>
      }
      </>
    }
  }

  return (
      <>
      <div className="all">
        <h1 className="status">Good {state()}, <strong style={{fontWeight: 500}}>{user.name}</strong>.</h1>
        {todayTimetable()}
        <div>
          <div className="dashLowerArea">
            <div className="UsefulLinks">
              <p className="dashSub">Useful links: </p>
              {extLinks.map((el) => 
              <a target="blank" key={el.label} href={el.url}>
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="UsefulLink">
                  {el.label}
                  <img src={el.icon} className="UsefulLinkIcon" />
                  <br/>
                  <p className="UsefulSub">{el.subtitle}</p>
                </motion.button>
              </a>
              )}
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export {
  Home
}