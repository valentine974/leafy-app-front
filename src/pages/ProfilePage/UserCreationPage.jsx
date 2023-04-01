import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function UserCreationPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [surname, setSurname] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [validators, setValidators] = useState([]);
  const [contractStartDate, setContractStartDate] = useState("");
  const [companies, setCompanies] = useState([]);
  const [managers, setManagers] = useState([]);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
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
    setValidators(e.target.value);
  };
  const handleContractStartDate = (e) => {
    setContractStartDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      position === "" ||
      surname === "" ||
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
        password,
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

  useEffect(() => {
    if (user.position === "admin") {
      authService
        .getCompanies()
        .then((response) => {
          setCompanies(response.data);
        })
        .catch((err) => console.log("error in getting companies", err));
    } else if (user.position === "hr") {
      setCompanies(user.companyId);
    }
  }, []);

  useEffect(() => {
    authService
      .getUsers()
      .then((response) => {
        setManagers(
          response.data.filter(
            (user) =>
              (user.position === "manager" || user.position === "hr") &&
              user.companyId === companyId
          )
        );
      })
      .catch((err) => console.log("error in getting managers", err));
  }, [companyId]);

  return (
      <div>
      {user && 
        <>
        <h1>User Creation Page</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={name} onChange={handleName} />
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
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </label>
          <label>
            Position:
            <select name="position"  onChange={handlePosition}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
            </select>
          </label>
          

          {user.position === "admin" && 
            <label>
            Company:
            <select name="companyId" onChange={handleCompanyId}>
            <option value="" default>Choose a company</option>
            {companies.map((company) => <option key={company._id} value={company._id}>{company.name}</option>)}
            </select>
            
          </label>}

          <label>
            Validators:
            <select name="validators" value={validators} onChange={handleValidators} multiple>
            {managers.map((manager) => <option key={manager._id} value={manager._id}>{manager.name}</option>)}
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
        </>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
  );
}

export default UserCreationPage;
