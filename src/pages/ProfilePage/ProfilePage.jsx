import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    authService.getUser(user._id).then((foundUser) => {
      const { email, name, surname, profilePictureUrl } = foundUser.data;
      setEmail(email);
      setName(name);
      setSurname(surname);
      setProfilePictureUrl(profilePictureUrl)
    });
  }, []);

  return (
    <div className="pageContainer">
      <h1>Profile page</h1>
      <div className="profilePictureContainer">
        <img className="profilePicture" src={profilePictureUrl} alt="prifile" />
      </div>

      <p>{name} {surname}</p>
      <p>{email}</p>

      <Link to="/user/settings">To modify user informations</Link>
      <Link to="/user/modify-password">To modify the password</Link>
    </div>
  );
}

export default ProfilePage;
