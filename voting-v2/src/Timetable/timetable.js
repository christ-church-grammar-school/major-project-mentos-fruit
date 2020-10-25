import React from 'react'
import "./timetable.css"
import "../Dashboard/dashboard.css"

class Timetable extends React.Component {
    render() {
        return (
            <div>
                <h1>It's a timetable. Sugoidesune!</h1>
            </div>
        )
    }
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
                <td style={{backgroundColor: el.class.colour}}  className="tableClass">
                    <h1 className="class">{el.class.class}</h1>
                    <p className="ttsub">{el.class.teacher}</p>
                    <p className="ttsub">{el.class.room}</p>
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