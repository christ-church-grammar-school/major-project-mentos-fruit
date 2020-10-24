import React from 'react';
import "./dashboard.css"

function Home() {
    // const { user, loading } = useFetchUser()
    const d = new Date()
    const periods = [
      {label: "Tutorial", time: "8.30am-8.50am"},
      {label: "Period 1", time: "8.55am-9.45am"},
      {label: "Period 2", time: "9.50am-10.40am"},
      {label: "Period 3", time: "11.00am-11.50am"},
      {label: "Period 4", time: "11.55am-12.45pm"},
      {label: "Period 5", time: "8.30pm-8.50am"},
      {label: "Period 6", time: "8.30am-8.50am"}
    ]
    // const extLinks = [
    //   {label: "Nexus", subtitle: "CCGS Online Resources", icon: "/", url: "https://nexus.ccgs.wa.edu.au"},
    //   {label: "CCGS Website", subtitle: "The school's official website", icon: "/", url: "https://ccgs.wa.edu.au"}
    // ]
  
    var userTimetable = [
      [
        {class: "Tutorial", teacher: "Mr Nederpelt", room: "LibPrior"},
        {class: "English 1", teacher: "Mr Yeates", room: "M5"},
        {class: "Japanese 1", teacher: "Mr Shain", room: "R5"},
        {class: "Civics and Citienship 1", teacher: "Mr Phillips", room: "M8"},
        {class: "Maths 1", teacher: "Dr Sisson", room: "S15"},
        {class: "Advanced Software Development 1", teacher: "Mr Nolan", room: "L16"},
        {class: "Physics 1", teacher: "Ms Owen", room: "NP3"} 
      ]
    ]
  
    var state = undefined
  
    if (18 > d > 12) {
      state = "afternoon"
    } else if (d > 18) {
      state = "evening"
    } else {
      state = "morning"
    } 
  
    return (
        <>
        <div className="all">
              <h1 className="status">Good {state}, Hello.</h1>
              {(d.getDay !== 0 || d.getDay !== 6) ? <>
              <p className="today">Today: </p>
              <table className="docLinks">
                <thead className="tableLinks">
                    <tr>
                      {periods.map((el, index, arr) => /*{
                        if (index === 0) {
                          return <th className={[styles.tableHead, styles.left].join(' ')}>{el.label}<br/><p className={styles.theadtime}>{el.time}</p></th>
                        } else if (index === arr.length-1) {
                          return <th className={[styles.tableHead, styles.right].join(' ')}>{el.label}<br/><p className={styles.theadtime}>{el.time}</p></th>
                        } else {
                          return <th className={styles.tableHead}>{el.label}<br/><p className={styles.theadtime}>{el.time}</p></th>
                        }}*/
                        <th className="tableHead">{el.label}<br/><p className="theadtime">{el.time}</p></th>
                      )}
                    </tr>
                    <tr>
                      {userTimetable[0].map((el) => 
                        <td className="tableClass">
                          <h1 className="class">{el.class}</h1>
                          <p className="ttsub">{el.teacher}</p>
                          <p className="ttsub">{el.room}</p>
                        </td>
                      )}
                    </tr>
                </thead>
              </table>
              </> : <></>}
            </div>
        </>
    )
  }
  
  
  export default Home