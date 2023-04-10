import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function UserCreationPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [surname, setSurname] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [validators, setValidators] = useState([]);
  const [managers, setManagers] = useState([]); // managers are the possible validators
  const [contractStartDate, setContractStartDate] = useState("");
  const [companies, setCompanies] = useState([]);
  

  
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePosition = (e) => {
    setPosition(e.target.value);
  };
  const handleSurname = (e) => {
    setSurname(e.target.value);
  };
  const handleCompanyId = (e) => {
    setCompanyId(e.target.value);
  };

  const handleValidators = (e) => {
    const selectedOptions = e.target.selectedOptions;
    const values = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      values.push(selectedOptions[i].value);
    }
    setValidators(values);
  };

  const handleContractStartDate = (e) => {
    setContractStartDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email:", email,  "name:", name, "surname:", surname, "position:", position, "companyId:", companyId, "validators:", validators, "contractStartDate:", contractStartDate);
    if (
      name === "" ||
      surname === "" ||
      email === "" ||
  
      position === "" ||
      companyId === "" ||
      validators === "" ||
      contractStartDate === ""
    ) {
      setErrorMessage("All fields are required");
      return;
    }
    authService
      .createUser({
        name,
        email, 
        position,
        surname,
        companyId,
        validators,
        contractStartDate,
      })
      .then(() => navigate("/users"))
      .catch((err) => console.log("error in creating user info", err));
  };

  const { user } = useContext(AuthContext);

  // get all companies or the hr's company on load
  useEffect(() => {
    if (user && user.position === "admin") {
      authService
        .getCompanies()
        .then((response) => {
          setCompanies(response.data);
        })
        .catch((err) => console.log("error in getting companies", err));
    } else if (user && user.position === "hr") {
      setCompanyId(user.companyId)
      setCompanies([user.companyId]);
    }
  }, [user]);


  // get all managers the company's manager on load
  useEffect(() => {
    authService
      .getUsers()
      .then((response) => {
        setManagers(
          response.data.filter(
            (user) =>
              (user.position === "manager" || user.position === "hr") &&
              user.companyId._id === companyId
          )
        );
      })
      .catch((err) => console.log("error in getting managers", err));
  }, [companyId]);

  return (
    <div className="pageContainer">
      {user && (
        <>
          <h1 className="pageTitle">User Creation Page</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
            </label>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={surname}
                onChange={handleSurname}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </label>
       
            <label>
              Position:
              <select name="position" onChange={handlePosition}>
{/*                 <option key="admin" value="admin">
                  Admin
                </option> */}
                <option key="manager" value="manager">
                  Manager
                </option>
                <option key="hr" value="hr">
                  HR
                </option>
                <option key="employee" value="employee">
                  Employee
                </option>
              </select>
            </label>

            {user.position === "admin" && (
              <label>
                Company:
                <select name="companyId" onChange={handleCompanyId}>
                  <option value="" default>
                    Choose a company
                  </option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
                  Validators:
                  <select
                    name="validators"
                    value={validators}
                    onChange={handleValidators}
                    multiple
                  >
                    {managers.map((manager) => (
                      <option key={manager._id} value={manager._id}>
                        {manager.name}
                      </option>
                    ))}
                  </select>
                </label>

            <label>
              Contract Start Date:
              <input
                type="date"
                name="contractStartDate"
                value={contractStartDate}
                onChange={handleContractStartDate}
              />
            </label>
            <button type="submit">Create User</button>
          </form>
        </>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default UserCreationPage;
