import React from "react";
import './Navbar.css'
import { useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken, setCurrentUser }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken("")
        setCurrentUser({})
        navigate('/')
    }
    return (
        <header className="header">

            <a href="/" className="logo">Jobly</a>

            <nav className="navbar">
                {token ? <>
                
                <h3 onClick={() => navigate('/companies')}>Companies</h3>
                <h3 onClick={() => navigate('/jobs')}>Jobs</h3>
                <h3 onClick={() => navigate('/profile')}>Profile</h3>
                <h3 onClick={handleLogout}>Logout</h3>
                </>
                : <>
                
                <h3 onClick={() => navigate('/login')}>Login</h3>
                <h3 onClick={() => navigate('/signup')}>Sign up</h3>

                </>}
                
            </nav>

        </header>
    )
}

export default Navbar