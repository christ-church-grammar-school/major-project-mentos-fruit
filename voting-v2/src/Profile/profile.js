import React, { useContext } from 'react'
import "./profile.css"
import UserContext from '../UserContext'
import na from "../Navigation/na.png"

function Profile() {
    const user = UserData()

    return (
        <div>
            <h1 className="status">Profile.</h1>
            <div className="profile">
                <img className="profileImage" src={user.image ? user.image : na} />
                <div className="profileInfo">
                    <p className="profileInfoText"><strong>Name:</strong> {user.name}</p>
                    <p className="profileInfoText"><strong>Year:</strong> {user.year}</p>
                    <p className="profileInfoText"><strong>Student ID:</strong> {user.studentID}</p>
                    <p className="profileInfoText"><strong>Student Type:</strong> {user.studentType}</p>
                    <p className="profileInfoText"><strong>House:</strong> {user.house}</p>
                    <p className="profileInfoText"><strong>Tutorial:</strong> {user.tutorial}</p>
                    <p className="profileInfoText"><strong>Tutor:</strong> {user.tutor}</p>
                    <p className="profileInfoText"><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                    {/* <p className="profileInfoText"><strong>Timetable:</strong> {user.timetable}</p> */}
                </div>
            </div>
        </div>
    )
}

function UserData() {
    const { user, setUser } = useContext(UserContext)

    function getNameYear() {
        var name = []
        if (user.name !== undefined) {
            name = user.name.slice(14)
            name = name.split(',')
        } else {
            name[0] = undefined
            name[1] = undefined
        }
        return name
    }

    const NameYear = getNameYear()

    var userEasy = {}

    if (user.name !== undefined) {
        userEasy = {
            name: NameYear[0],
            year: user.data.yearLevel,
            studentID: user.data.studentID,
            studentType: user.data.studentType,
            tutorial: user.data.tutorGroup,
            house: user.data.house,
            dateOfBirth: user.data.dateOfBirth,
            tutor: user.data.tutor,
            image: user.image,
            timetable: []
        }

        for(var i=0; i<7; i++) {
            userEasy.timetable[i] = []
            for(var j=1; j<11; j++) {
                userEasy.timetable[i][j-1] = user.timetable[i][j].split("\n")

                if(userEasy.timetable[i][j-1].length < 3) {
                    userEasy.timetable[i][j-1][2] = "" 
                    userEasy.timetable[i][j-1][0] = "No Class"
                }
            }
        }
    }

    return userEasy
}

export {
    Profile,
    UserData
}