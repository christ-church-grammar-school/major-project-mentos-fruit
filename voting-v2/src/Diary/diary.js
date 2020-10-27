import React from 'react'
import "./diary.css"
import {motion} from 'framer-motion'

function Diary() {
    var tasks = [
        {subject: "English", due: "19/6", title: "Dystopian Composition", colour: "#fff5cc"},
        {subject: "Maths", due: "19/6", title: "Maths Homework", colour: "#ffcce0"}
    ]
    return (
        <div className="DiaryAll">
            <div className="DiarySide">
                <h1 className="DiaryHead">Tasks.</h1>
                <div className="DiaryContainer">
                    {tasks.map((el) => 
                    <>
                        <motion.button className="DiaryItem" whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} key={el.title}>
                            {el.title}
                        </motion.button>
                        <br/>
                    </>
                    )}
                </div>
            </div>
            <div className="DiarySide">
                <h1 className="DiaryHead">Assessments.</h1>
                <div className="DiaryContainer">
                    
                </div>
            </div>
        </div>
    )
}

export default Diary