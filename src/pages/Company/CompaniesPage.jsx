import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";

function CompaniesPage(props) {
  const{togglePage}=props
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    authService
      .getCompanies()
      .then((companies) => {
        setCompanies(companies.data);
      })
      .catch((err) => console.log("err in loading companies", err));
  }, []);

  const handleDelete = (id) => {
    authService
      .deleteCompany(id)
      .then((response) => {
        setCompanies(companies.filter((company) => company._id !== id));
      })
      .catch((err) => console.log("err in deleting user", err));
  };
  return (
    <div className={`pageContainer ${togglePage}`}>
    <div className={`pageTitle ${togglePage}`}><h1 >Companies</h1> 
    <Link to="/create-company">
        <button className="blueButton">Create a new company</button>
      </Link>
      </div>
    <div className="pageContent">
    <div className="cards">
    {companies? companies.map((company) => (
        <div className="companyCard " key={company._id}>
        <div className="imageContainer">
          <img src={company.imageUrl} alt="logo" />
        </div>
        <h3>{company.name}</h3> 
        <button className="blueButton"><Link to={`/company/${company._id}`}> Go to company page </Link> </button>
        <button
                    className="blueButton deleteButton" 
                    onClick={() => handleDelete(company._id)}
                  >
                    Delete Company
          </button>
  
        </div>
      )): <Loading/> }
    </div>
    
 

    </div>
      
    </div>
  );
}

export default CompaniesPage;
