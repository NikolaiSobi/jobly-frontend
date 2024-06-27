import React from "react";
import './Navbar.css'

const Navbar = ({token}) => {
    return (
        <header className="header">

            <a href="/" className="logo">Jobly</a>

            <nav className="navbar">
                {token ? <>
                <a href="/companies">Companies</a>
                <a href="/jobs">Jobs</a>
                <a href="/profile">Profile</a>
                <a href="/" onClick={() => localStorage.removeItem('token')}>Logout</a>
                </>
                : <>
                <a href="/login">Login</a>
                <a href="https://jobly-backend-pg4n.onrender.com/signup">Sign up</a>
                </>}

                
                
                
               
                
            </nav>
        </header>
    )
}

export default Navbar