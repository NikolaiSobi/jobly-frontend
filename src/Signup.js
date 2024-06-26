import React, { useState } from "react";
import "./Signup.css"
const Signup = ({ signup }) => {
    const[signupErrors, setSignupErrors] = useState([])
    const [signupState, setSignupState] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })


    const handleChange = (e) => {
        const value = e.target.value

        setSignupState({
            ...signupState, 
            [e.target.className]: value
        })
    }


    return (
        <div className="signupContainer">

            <div className="signupBox">

                <div className="signupH1">
                    <h1> Sign up! </h1>
                </div>

                <div className="signupUsername">
                    <label htmlFor="username" > Username </label><input className="username" onChange={handleChange} type="text" ></input>
                </div>

                <div className="signupPassword">
                    <label htmlFor="password" > Password </label><input className="password" type="password" onChange={handleChange} ></input>
                </div>
            
                <div className="signupFirstName">
                    <label htmlFor="firstName" > First name </label><input className="firstName" onChange={handleChange} type="text"></input>
                </div>

                <div className="signupLastName">
                    <label htmlFor="lastName" > Last name </label><input className="lastName" onChange={handleChange} type="text"></input>
                </div>
                
                <div className="signupEmail">
                    <label htmlFor="email" > Email</label> <input className="email" onChange={handleChange} type="text"></input>
                </div>
                
                <div className="signupButtonDiv">
                    <button className="signupButton" onClick={()=> signup(signupState)}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Signup