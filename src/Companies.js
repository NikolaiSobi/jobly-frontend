import React, { useEffect, useState } from "react";
import './Companies.css'
import api from "./api";
import CompanyCard from "./CompanyCard";
import { useNavigate } from "react-router-dom";
import Homepage from "./Homepage";

const Companies = ({token}) => {
    const [companies, setCompanies] = useState([])
    const [searchCompanies, setSearchCompanies] = useState([])
    const navigate = useNavigate()
    

    const handleChange = (e) => {
        setSearchCompanies(e.target.value)
    }

    const handleClick = async () => {
            const response = await api.searchCompanies(searchCompanies)
            setCompanies(response)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await api.getCompanies()
            setCompanies(response)
        }
        fetchData()
    }, [])

    return (
        <div className="companies">
            {token ? <>
            <div className="companySearchBar">
                <input onChange={handleChange} placeholder="Enter search term..."></input>
                <button onClick={handleClick}>Submit</button>
            </div>
            {companies.map((company, idx) => <CompanyCard company={company} key={idx}/>)}
            </>
            : <>
            <Homepage/>
            </>}
        </div>
        
    )
}

export default Companies