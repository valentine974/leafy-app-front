import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function UserSettingPage() {
  //const {email, name, surname, contractStartDate, position, companyId, validators} = req.body
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [validators, setValidators] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getUser(user._id).then((foundUser) => {
      const { email, name, surname,companyId,validators } = foundUser.data;
      setEmail(email);
      setName(name);
      setSurname(surname);
      setCompanyId(companyId);
      setValidators(validators);
      
    }).then(() => {
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
    }).catch((err) => console.log("error in getting user", err));

  }, []);

  useEffect(() => {
    authService
      .getUsers()
      .then((response) => {

        setManagers(
          response.data.filter(
            (user) =>
          
              (user.position === "manager" || user.position === "hr") &&
              user.companyId._id === companyId._id
              ))
      })
      .catch((err) => console.log("error in getting managers", err));
  }, [companyId]);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleCompanyId = (e) => {
    setCompanyId(e.target.value);
  };
  const handleValidators = (e) => {
    setValidators(e.target.value);
  };
  
  const handleFileUpload = (e) => {
  
    // file dialog box when clicked on the file button
    const uploadData = new FormData();

    // append the image to the uploadData object
    uploadData.append("profilePictureUrl", e.target.files[0]);

    authService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("new profile picture url is: ", response.data.image_url);
        // response carries "fileUrl" which we can use to update the state
        setProfilePictureUrl(response.data.image_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || surname === "") {
      setErrorMessage("Email, name and surname can not be empty");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Provide a valid email address.");
      return;
    }
    profilePictureUrl === "" ? setProfilePictureUrl(user.profilePictureUrl) : setProfilePictureUrl(profilePictureUrl)
    authService
      .updateUserinfo(user._id, {email,name,surname,profilePictureUrl,companyId,validators})
      .then(() => navigate("/user"))
      .catch((err) => console.log("error in updating user info", err));
  };

  return (
    <div className="ModifyPasswordPage">
      <h1>Set a new password for {user.email}</h1>

      <form onSubmit={handleSubmit}>
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
          Profile Picture:
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => handleFileUpload(e)}
          />
        </label>

        {(user.position === "admin" || user.position ==="hr") && (
          <>
            <label>
              Company:
              <select name="companyId" onChange={handleCompanyId}>
                {companies.map((company) => ( 
                  company._id === companyId._id ? <option key={company._id} value={company._id} default>{company.name}</option> :
                  <option key={company._id} value={company._id}>{company.name}</option>
                ))}
              </select>
            </label>

            <label>
              Validators:
              <select
                name="validators"
                onChange={handleValidators}
                multiple
              >
                {managers.map((manager) => (
                  validators.includes(manager._id) ? <option key={manager._id} value={manager._id} selected>{manager.name}</option> :
                  <option key={manager._id} value={manager._id}>{manager.name}</option>
                ))}
              </select>
            </label>
          </>
        )}

        <button type="submit">Modify</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default UserSettingPage;
