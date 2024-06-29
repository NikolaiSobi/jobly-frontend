import './App.css';
import Homepage from './Homepage';
import Navbar from './Navbar';
import api from "./api"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from './Login';
import Signup from './Signup';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs';
import JoblyApi from './api';
import Profile from './Profile';

function App() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState([])
  const[token, setToken] = useState('')
  const[currentUser, setCurrentUser] = useState({})

  const signup = async(obj) => {
    try {
      const res = await api.signup(obj)
      await login({username: obj.username, password: obj.password})
      window.location.replace('https://jobly-1gfd.onrender.com/')
    } catch (error) {
      setErrorMessage(error)
    }
  }
  
  const login = async (obj) => {
    try {
      const res = await api.login(obj)
      localStorage.setItem('token', res.token)
      setToken(res.token)
      JoblyApi.token = res.token
      navigate('/')
      
    } catch (error) {
        setErrorMessage(error)
    }
  }

  useEffect(() => {
    if(!token) return
    async function fetchData() {
      const decoded = jwtDecode(token)
      const res = await api.getUser(decoded.username)
      
      setCurrentUser(res)
    }
    fetchData()
  }, [token])

  const isLoggedIn = () => {
    if(localStorage.getItem('token')) {
      JoblyApi.token = localStorage.getItem('token')
      setToken(localStorage.getItem('token'))
    }
    return false
  }
  
  useEffect(() => {
    isLoggedIn()
  }, [])
  
  const applyToJob = async (username, data, id) => {
    
      try {
        JoblyApi.token = token
        const res = await JoblyApi.applyToJob(username, data, id)
        return res
      } catch (error) {
          console.log(error)
      }
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar token={token} setToken={setToken} setCurrentUser={setCurrentUser}/>

      <div className='errors'>
      {errorMessage.map((error, idx) => <h3 key={idx}>{error}</h3>)}
      </div>
       
        <Routes>
          <Route path="/" element={<Homepage token={token} currentUser={currentUser} />} />
          <Route path="/companies" element={<Companies token={token}/>} />
          <Route path="/companies/:company" element={<CompanyDetails token={token} currentUser={currentUser} applyToJob={applyToJob} />} />
          <Route path="/jobs" element={<Jobs applyToJob={applyToJob} currentUser={currentUser} token={token} />} />
          <Route path="/login" element={<Login login={login}/>} />
          <Route path="/signup" element={<Signup signup={signup} login={login}/>} />
          <Route path="/profile" element={<Profile token={token} currentUser={currentUser} />} />
        </Routes>
       </BrowserRouter>
     
    </div>
  );
}

export default App;
