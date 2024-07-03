import React from "react";
import "./Homepage.css"
import { useNavigate } from "react-router-dom";

const Homepage = ({ currentUser }) => {
    let username
    const navigate = useNavigate()
    if (!currentUser || !currentUser.user || !currentUser.user.username) {
        return (
            <div className="homepage">
                <div>
                    <h1>Jobly!</h1>
                    <h3>A place to find your dream job!</h3>
                    <div className="buttonDiv">
                        <button >Login</button>
                        <button onClick={() => navigate('/signup')}>Signup</button>
                    </div>
                </div>  
            </div>
    )
    } else {
        username = currentUser.user.username
        username = username.toUpperCase()
    }
    return (
        <div className="homepage">

            <div>
            <h1>Jobly!</h1>
            <h3>A place to find your dream job!</h3>

                <h1>WELCOME {username}!</h1>
            </div>
            
           
            
        </div>
    )
}

export default Homepage