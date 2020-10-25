import React, { useContext } from 'react'
import "./profile.css"
import UserContext from '../UserContext'

function Profile() {
    const { user, setUser } = useContext(UserContext)
    console.log(user)

    return (
        <div>
            <p>It's a profile</p>
        </div>
    )
}

export {
    Profile
}