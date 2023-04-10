import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  return (
    <div className={`pageContainer ${togglePage}`}>
    <div className={`pageTitle ${togglePage}`}><h1 >Companies</h1> </div>
    <div className="pageContent">
    {companies?.map((company) => (
        <div>
          <h3>{company.name}</h3>
          <Link to={`/company/${company._id}`}> Go to company page </Link>
        </div>
      ))}
      <Link to="/create-company">
        <button>Create a new company</button>
      </Link>
    </div>
      
      
    </div>
  );
}

export default CompaniesPage;
