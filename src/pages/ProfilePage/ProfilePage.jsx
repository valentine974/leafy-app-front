import "./ProfilePages.css";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [company, setCompany] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { id } = useParams();

  useEffect(() => {
    authService.getUser(id).then((foundUser) => {
      console.log(foundUser)
      const { email, name, surname, imageUrl, companyId } = foundUser.data;
      setEmail(email);
      setName(name);
      setSurname(surname);
      setCompany(companyId); 
      setImageUrl(imageUrl)
    }).catch((err) => console.log("error in getting user", err));
  }, []);

  const adresseStyle = {
    textDecoration: "none",
    color: "pink !important",
    margin: "5px",
    padding: "5px",
  }
  const linkStyle = {
    textDecoration: "none",
    color: "pink !important",
    backgroundColor: "white !important",
    margin: "5px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid pink",
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
  };

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Profile page</h1>
      <div className="imageContainer">
        <img src={imageUrl} alt="prifile" />
      </div>

      <p>{name} {surname}</p>
      <p>{email}</p> 
      {company && <Link to={`/company/${company._id}`} style={adresseStyle}> {company.name}</Link>}

      <Link to="/create-request" style={linkStyle}>Request LEAF</Link>
      <Link to={`/user/${id}/settings`} style={linkStyle}>Profile setting</Link>
      <Link to="/user/modify-password" style={linkStyle}>Change Password</Link>
    </div>
  );
}

export default ProfilePage;
