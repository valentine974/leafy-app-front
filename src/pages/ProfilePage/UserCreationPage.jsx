import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import { Select } from "antd";

function UserCreationPage(props) {
  const { togglePage } = props;
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

  const handlePosition = (value) => {
    setPosition(value);
  };
  const handleSurname = (e) => {
    setSurname(e.target.value);
  };
  const handleCompanyId = (e) => {
    setCompanyId(e.target.value);
  };

  const handleValidators = (selectedOptions) => {
    const selectedValidators = selectedOptions.map((option) => option.value);
    setValidators(selectedValidators);
  };

  const handleContractStartDate = (e) => {
    setContractStartDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "email:",
      email,
      "name:",
      name,
      "surname:",
      surname,
      "position:",
      position,
      "companyId:",
      companyId,
      "validators:",
      validators,
      "contractStartDate:",
      contractStartDate
    );
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
        surname,
        email,
        position,
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
      setCompanyId(user.companyId);
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
    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1>USER CREATION</h1>
      </div>
      <div className="pageContent">
        {user && (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  style={{width: '100%',}}
                  onChange={handleName}
                />
              </label>
              <label>
                Surname:
                <input
                  type="text"
                  name="surname"
                  style={{width: '100%',}}
                  value={surname}
                  onChange={handleSurname}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  style={{width: '100%',}}
                  value={email}
                  onChange={handleEmail}
                />
              </label>
              <label>
                Position: <br />
                <Select
                  defaultValue="employee"
                  onChange={handlePosition}
                  style={{
                    width: "100%",
                  }}
                  options={[
                    { value: "employee", label: "Employee" },
                    { value: "manager", label: "Manager" },
                    { value: "hr", label: "HR" },
                  ]}
                />
              </label>

              {user.position === "admin" && (
                <label>
                  Company: <br />
                  <Select
                    onChange={handleCompanyId}
                    options={companies.map((company) => ({
                      value: company._id,
                      label: company.name,
                    }))}
                  />
                </label>
              )}

              <label>
                Validators: <br />
                <Select
                  name="validators"
                  mode="multiple"
                  placeholder="Please select"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleValidators}
                  options={managers.map((manager) => ({
                    value: manager._id,
                    label: manager.name,
                  }))}
                />
              </label>

              <label>
                Contract Start Date:
                <input
                  type="date"
                  name="contractStartDate"
                  value={contractStartDate}
                  style={{width: '100%',}}
                  onChange={handleContractStartDate}
                />
              </label>
              <button type="submit">Create User</button>
            </form>
          </>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default UserCreationPage;
