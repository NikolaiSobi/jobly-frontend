import React, { useState } from "react";
import Homepage from "./Homepage";
import './Profile.css'
import JoblyApi from "./api";

const Profile = ( {token, currentUser} ) => {
    const[profileErrors, setProfileErrors] = useState([])
    const [profileState, setProfileState] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    
    
    if(currentUser.user == undefined){
        return (
            <Homepage/>
        )
    }
    const {username, firstName, lastName, email} = currentUser.user
    
    const handleChange = (e) => {
        const value = e.target.value

        setProfileState({
            ...profileState,
            [e.target.className]: value
        })
        console.log([profileState])
    }

    const handleClick = async () => {
        try {
            const res = await JoblyApi.updateUser(username, profileState)
            if(res) window.alert('profile successfully updated')
        } catch (error) {
            setProfileErrors(error)
        }
    }
    return (
        <div className="profileContainer">
            {token ? <>
            <div className="profileBox">
                
                <div className="errors">
                {profileErrors.map((error, idx) => <h4 key={idx}>{error}</h4>)}
                </div>

                <div className="profileUsername">
                    <label htmlFor="username"> Username </label> <input className="username" onChange={handleChange} value={username} type="text" disabled></input>
                </div>

                <div className="profileFirstName">
                    <label htmlFor="firstName"> First Name </label> <input className="firstName" onChange={handleChange} placeholder={firstName} value={profileState.firstName} type="text"></input>
                </div>

                <div className="profileLastName">
                    <label htmlFor="lastName"> Last Name </label> <input className="lastName" onChange={handleChange} placeholder={lastName} value={profileState.lastName} type="text"></input>
                </div>

                <div className="profileEmail">
                    <label htmlFor="email"> Email </label> <input className="email" onChange={handleChange} placeholder={email} value={profileState.email} type="text"></input>
                </div>

                <div className="divProfileButton">
                    <button className="profileButton" onClick={handleClick}>Save Changes</button>
                </div>
            </div>
            </>
            : <>
            <Homepage/>
            </>}
        </div>
        
    )
}

export default Profile