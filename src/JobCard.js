import React from "react";
import './JobCard.css'

const JobCard = ({ job, applyToJob, currentUser, id }) => {

    const handleClick = () => {
        let button = document.getElementById(id)
        button.innerText = "Applied"
        button.disabled = true
        applyToJob(currentUser.user.username, {}, job.id)

    }

    return (
        <div className="jobCard">
            <h3>{job.title}</h3>
            <p> Company: {job.companyName}</p>
            <p> Salary: ${job.salary}</p>
            <p> Equity: {job.equity ? job.equity : "None"}</p>
            <div className="applyButton">
                <button id={id} onClick={() => handleClick(id)}>APPLY</button>
            </div>
        </div>
    )
}

export default JobCard