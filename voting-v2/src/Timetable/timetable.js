import React, { useState } from 'react'
import "./timetable.css"
import "../Dashboard/dashboard.css"
import { UserData } from "../Profile/profile"
import { motion } from 'framer-motion'

function Timetable(props) {
    const user = UserData()
    const [ weekA, setWeekA ] = useState(true)
    const [ complete, setComplete ] = useState(false)

    const periods = [
        {label: "Tutorial", time: "8.30am-8.50am"},
        {label: "Period 1", time: "8.55am-9.45am"},
        {label: "Period 2", time: "9.50am-10.40am"},
        {label: "Period 3", time: "11.00am-11.50am"},
        {label: "Period 4", time: "11.55am-12.45pm"},
        {label: "Period 5", time: "1.25pm-2.15pm"},
        {label: "Period 6", time: "2.20pm-3.05pm"}
    ]

    console.log(user.timetable)
    
    var mobileTimetableFormat = {
        A: [],
        B: []
    }

    if(user.timetable !== undefined) {
        for(var i = 0; i < 5; i++) {
            mobileTimetableFormat.A[i] = []
            mobileTimetableFormat.B[i] = []
            for(var j = 0; j < periods.length; j++) {
                mobileTimetableFormat.A[i][j] = {
                    period: periods[j],
                    class: {
                        class: user.timetable[j][i][0],
                        code: user.timetable[j][i][1],
                        info: user.timetable[j][i][2]
                    }
                }
                mobileTimetableFormat.B[i][j] = {
                    period: periods[j],
                    class: {
                        class: user.timetable[j][i+5][0],
                        code: user.timetable[j][i+5][1],
                        info: user.timetable[j][i+5][2]
                    }
                }
            }
        }
    }

    const weekAColour = "rgba(204, 255, 204, 0.8)"
    const weekBColour = "rgba(255, 204, 224, 0.8)"

    console.log(mobileTimetableFormat)

    return (
        <div>
            <h1 className="timetableHead">Timetable for <strong>{user.name}</strong> (Year {user.year}).</h1>
            
            {(props.windowWidth < 1000) ? 
            <div style={{textAlign: "center", marginBottom: "100px"}}>
                <p className="timetableWeek">[
                    <motion.button
                    whileHover={{scale: 1.2}} 
                    whileTap={{scale: 0.9}} 
                    className="timetableWeek"
                    onClick={() => setWeekA(true)}
                    style={weekA ? {color: "rgb(112, 255, 112)"} : {}}>
                        Week A
                    </motion.button>|
                    <motion.button
                    whileHover={{scale: 1.2}} 
                    whileTap={{scale: 0.9}} 
                    className="timetableWeek"
                    onClick={() => setWeekA(false)}
                    style={!weekA ? {color: "rgb(255, 148, 190)"} : {}}>
                        Week B
                    </motion.button>
                ]</p>
                {weekA ? 
                mobileTimetableFormat.A.map((el, index) => 
                <div key={index}>
                    <p className="timetableDay">Day {index+1}:</p>
                    <MobileTimetable colour={weekAColour} timetable={el}/>
                </div>                
                )
                :
                mobileTimetableFormat.B.map((el, index) => 
                <div key={index}>
                    <p className="timetableDay">Day {index+6}:</p>
                    <MobileTimetable colour={weekBColour} timetable={el}/>
                </div>
                )
                }
                <table>

                </table>
            </div> :
            <>

            </>
            }
        </div>
    )
}

function MobileTimetable(props) {
    return (
        <table className="dashttLinks">
            <thead className="tableLinks">
            {props.timetable.map((el, index) => 
                <tr key={el.period.label}>
                <td className="tableHead">
                    {el.period.label}<br/>
                    <p className="theadtime">{el.period.time}</p>
                </td>
                <td style={{backgroundColor: props.colour}} className="tableClass">
                    <h1 className="class">{el.class.class}</h1>
                    <p className="ttsub">{el.class.code}</p>
                    <p className="ttsub">{el.class.info}</p>
                </td>
                </tr>
            )}
            </thead>
        </table>
    )
}

export {
    Timetable,
    MobileTimetable
} 