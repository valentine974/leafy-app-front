import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import { Select } from "antd";
import Loading from "../../components/Loading/Loading";

function UserSettingPage(props) {
  //const {email, name, surname, contractStartDate, position, companyId, validators} = req.body
  const {togglePage}=props
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [validators, setValidators] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    authService
      .getUser(id)
      .then((foundUser) => {
        console.log("foundUser", foundUser);
        const { email, name, imageUrl, surname, companyId, validators } =
          foundUser.data;
        console.log("name", name);
        setEmail(email);
        setName(name);
        setSurname(surname);
        setCompanyId(companyId);
        setValidators(validators);
        setImageUrl(imageUrl);
      })
      .then(() => {
        if (user.position === "admin") {
          authService
            .getCompanies()
            .then((response) => {
              setCompanies(response.data);
            })
            .catch((err) => console.log("error in getting companies", err));
        } else if (user.position === "hr") {
          setCompanies([user.companyId]);
        }
      })
      .catch((err) => console.log("error in getting user", err));
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
          )
        );
      })
      .catch((err) => console.log("error in getting managers", err));
  }, [companyId]);


  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleCompanyId = (value) => {
    setCompanyId(value);
  };
  const handleValidators = (values) => {
    setValidators(values);
  };

  const handleFileUpload = (e) => {
    // file dialog box when clicked on the file button
    const uploadData = new FormData();

    // append the image to the uploadData object
    uploadData.append("imageUrl", e.target.files[0]);

    authService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("new profile picture url is: ", response.data.image_url);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.image_url);
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
    imageUrl === "" ? setImageUrl(user.imageUrl) : setImageUrl(imageUrl);
    companyId === "" && setCompanyId(user.companyId)
    authService
      .updateUser(id, {
        email,
        name,
        surname,
        imageUrl,
        companyId,
        validators,
      })
      .then((returnedUser) => {
        console.log("user updated", returnedUser.data);
        navigate(`/user/${returnedUser.data._id}`)})
      .catch((err) => console.log("error in updating user info", err));
  };

  return (
    <div className={`pageContainer ${togglePage}`}>

<div className={`pageTitle ${togglePage}`}><h1>SETTINGS FOR: </h1> <h1 style={{"color":"darkgrey"}}><em>{name}{" "}{surname}</em></h1></div>
    <div className="pageContent">
    {user? (
        <>
          <div className="profilePicture">
            <img src={imageUrl} alt="profile" />
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                style={{width: "100%",}}
                onChange={handleEmail}
              />
            </label>

            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                style={{width: "100%",}}
                onChange={handleName}
              />
            </label>

            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={surname}
                style={{width: "100%",}}
                onChange={handleSurname}
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="file"
                name="imageUrl"
                style={{width: "100%",}}
                onChange={(e) => handleFileUpload(e)}
              />
            </label>

            {user.position === "admin" && (
              <>
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
              </>
            )}

            {(user.position === "hr" || user.position === "admin") && (
              <>
              <label>
                Validators: <br />
                <Select
                  name="validators"
                  mode="multiple"
                  defaultValue={validators}
                  placeholder="Please select"
                  style={{width: "100%",}}
                  onChange={handleValidators}
                  options={managers.map((manager) => ({
                    value: manager._id,
                    label: manager.name,
                  }))}
                />
              </label>
              </>
            )}

            <button type="submit">Modify</button>

          </form>
        </>
      ): <Loading/>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
      
      
    </div>
  );
}
export default UserSettingPage;
