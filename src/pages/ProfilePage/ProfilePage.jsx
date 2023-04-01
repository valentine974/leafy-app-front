import "./ProfilePage.css";
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

 

  return (
    <div className="pageContainer">
      <h1>Profile page</h1>
      <div className="profilePictureContainer">
        <img className="profilePicture" src={imageUrl} alt="prifile" />
      </div>

      <p>{name} {surname}</p>
      <p>{email}</p> 
      {company && <Link to="/company">Go to my company {company.address}</Link>}

      <Link to="/create-request ">Request LEAF</Link>

      <Link to={`/user/${id}/settings`}>To modify user informations</Link>
      <Link to="/user/modify-password">To modify the password</Link>
    </div>
  );
}

export default ProfilePage;
