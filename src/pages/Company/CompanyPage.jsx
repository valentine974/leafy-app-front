import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function CompanyPage() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [siret, setSiret] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [numberOfVacationDays, setNumberOfVacationDays] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const { id } = useParams();

  const handleChat = () => {
    console.log("chat")
 
  }

  useEffect(() => {
    user && authService.getCompany(id).then((foundCompany) => {
      const { name, address, siret, imageUrl, numberOfVacationDays, _id } =
        foundCompany.data;
      setCompanyId(_id);
      setName(name);
      setAddress(address);
      setSiret(siret);
      setImageUrl(imageUrl);
      setNumberOfVacationDays(numberOfVacationDays);
    });
  }, [user]);


  useEffect(() => {
    authService.getUsers()
    .then((foundUsers) => {
      setAllEmployees(foundUsers.data.filter((user) => user.companyId._id === companyId))
      console.log(allEmployees)
    });
  }, [companyId]);

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">{name}</h1>
      {name && (
        <>
          <div className="imageContainer">
          <img src={imageUrl} alt="logo" />
          </div>
          <p>Address: {address}</p>
          {(user.position === "hr" || user.position === "admin") && (
            <Link to={`/company/${id}/settings`}>
              To modify company informations
            </Link>
          )}
        </>
      )}

      <h1 className="pageTitle"> The Team</h1>
      {
        allEmployees && (
          <>  
            <div className="cards">
              {allEmployees.map((employee) => (
                <div className="userCard">
                  <div className="imageContainer">
                  <img src={employee.imageUrl} alt="avatar" />
                  </div>
                  
                  <h3>{employee.name}</h3>
                  <p>{employee.position}</p>
                  <p>{employee.email}</p>
                  {employee._id !== user._id && isLoggedIn && <button className="chatBtn" onClick={handleChat}>💬</button>}
                </div>))}
            </div>
          </>
        )
      }
    </div>
  );
}

export default CompanyPage;
