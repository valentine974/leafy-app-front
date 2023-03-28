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

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getUser(user._id).then((foundUser) => {
      const { email, name, surname } = foundUser.data;
      setEmail(email);
      setName(name);
      setSurname(surname);
    });
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    uploadData.append("profilePictureUrl", e.target.files[0]);

    authService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("new profile picture url is: ", response.data.secure_url);
        // response carries "fileUrl" which we can use to update the state
        setProfilePictureUrl(response.data.secure_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSignupSubmit = (e) => {
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
      .updateUserinfo(user._id, {email,name,surname,profilePictureUrl})
      .then(() => navigate("/user"))
      .catch((err) => console.log("error in updating user info", err));
  };

  return (
    <div className="ModifyPasswordPage">
      <h1>Set a new password for {user.email}</h1>

      <form onSubmit={handleSignupSubmit}>
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
          <input type="file" name="profilePictureUrl" onChange={(e) => handleFileUpload(e)}  />
        </label>
        <button type="submit">Modify</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default UserSettingPage;
