import React, { useState } from "react";
import "./Login.css"
const Login = ({login}) => {
    const [loginState, setLoginState] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const value = e.target.value
        setLoginState({
            ...loginState, 
            [e.target.className]: value
        })
    }
    

    return (
        <div className="loginContainer">

            <div className="loginBox">

                <div className="loginH1">
                    <h1>Log in!</h1>
                </div>

                <div className="loginUsername">
                    <label htmlFor="username" > Username </label> <input className="username" onChange={handleChange} type="text"></input>
                </div>

                <div className="loginPassword">
                    <label htmlFor="password" > Password </label> <input className="password" type="password" onChange={handleChange}></input>
                </div>
            
                <div className="divLoginButton">
                    <button className="loginButton" onClick={()=> login(loginState)}>Submit</button>
                </div>

            </div>
            
        </div>
    )
}


export default Login