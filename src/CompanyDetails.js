import React, { useEffect, useState } from "react";
import './CompanyDetails.css'
import { useParams } from "react-router-dom";
import Homepage from "./Homepage";
import api from "./api";


const CompanyDetails = ({ token, applyToJob, currentUser }) => {
    const [companyDetailError, setCompanyDetailError] = useState('')
    const [companyDetail, setCompanyDetail] = useState()
    const [buttonText, setButtonText] = useState('Apply')
    let {company} = useParams()

    useEffect(() => {
        async function fetchData() {
            const res = await api.getCompany(company)

            // if error message then put it in state for errors
            if(res[0]){
                setCompanyDetailError(res[0])
            } else {
                setCompanyDetail(res)
                console.log(res.company)
            }
        }
        fetchData() 
    }, [])

    const handleClick = (buttonId, jobId) => {
        let button = document.getElementById(buttonId)
        button.innerText = "Applied"
        button.disabled = true
        applyToJob(currentUser.user.username, {}, jobId)

    }

    if(companyDetailError.length < 1 && !companyDetail){
        return <h1>Loading</h1>
    }
    
    return (
        <div>
        { token ? <>
        <div className="companyDetailsContainer">
            <div>
                {companyDetailError ? (
                    <h1>{companyDetailError}</h1>
                ) : (
                    <div className="companyDetails">
                        <h1>{companyDetail.company.name}</h1>
                        <p>{companyDetail.company.description}</p>
                        {companyDetail.company.jobs.map((job, idx) => 
                        <div className="jobCard" key={idx}>
                            <h3 className="">{job.title}</h3>
                            <p className="salary"> Salary: ${job.salary}</p>
                            <p className="equity"> Equity: {job.equity ? job.equity : "None"}</p>
                            <div className="applyButton">
                                <button id={idx} onClick={()=> handleClick(idx, job.id)}>Apply</button>
                            </div>
                        </div>)}
                    </div>
                )}
            </div>
        </div>
        </>
        : <>
        <Homepage/>
        </>}
        </div>
    )
}

export default CompanyDetails