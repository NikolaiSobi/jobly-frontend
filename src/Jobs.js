import {React, useEffect, useState} from "react";
import './Jobs.css'
import api from "./api";
import JobCard from "./JobCard";
import Homepage from "./Homepage";

const Jobs = ({ applyToJob, currentUser, token }) => {
    const [jobs, setJobs] = useState([])
    const [searchJobs, setSearchJobs] = useState([])



    const handleChange = (e) => {
        setSearchJobs(e.target.value)
    }

    const handleClick = async () => {
            const response = await api.searchJobs(searchJobs)
            setJobs(response)
    }
    useEffect(() => {
        async function fetchData() {
            const response = await api.getJobs()
            setJobs(response)
        }
        fetchData()
    }, [])
    return (
        <div className="jobs">
            {token? <>
            <div className="jobSearchBar">
                <input onChange={handleChange} placeholder="Enter search term..."></input>
                <button onClick={handleClick}>Submit</button>
            </div>
            {jobs.map((job, idx) => <JobCard job={job} key={idx} id={idx} applyToJob={applyToJob} currentUser={currentUser}/>)}
        </>
        : <>
        <Homepage/>
        </>}
        </div> 
    )
}

export default Jobs