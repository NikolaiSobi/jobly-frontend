import React from "react";
import { useNavigate } from "react-router-dom";
import './CompanyCard.css'


const CompanyCard = ({company}) => {
    const navigate = useNavigate()
    return (
        <div className="companyCard" onClick={() => navigate(`/companies/${company.handle}`)}>
            <h3> {company.name} </h3>
            <p> {company.description} </p>
        </div>
    )
}

export default CompanyCard