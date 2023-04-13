import "./ProfilePages.css";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import Loading from "../../components/Loading/Loading";

function ProfilePage(props) {
  const { togglePage } = props;
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [company, setCompany] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { id } = useParams();

  useEffect(() => {
    authService
      .getUser(id)
      .then((foundUser) => {
        console.log(foundUser);
        const { email, name, surname, imageUrl, companyId } = foundUser.data;
        setEmail(email);
        setName(name);
        setSurname(surname);
        setCompany(companyId);
        setImageUrl(imageUrl);
      })
      .catch((err) => console.log("error in getting user", err));
  }, []);

  const adresseStyle = {
    textDecoration: "none",
    color: "pink !important",
    margin: "5px",
    padding: "5px",
  };
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
    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
      <h1>
          {name} {surname}
        </h1>
        <p>{email}</p>
      </div>
      <div className="pageContent">
        <div className="imageContainer profile">
          <img src={imageUrl} alt="profile" />
        </div>


        
        {company?(
          <Link to={`/company/${company._id}`} style={adresseStyle}>
            {" "}
            {company.name}
          </Link>
        ):<Loading/>}

        <Link to="/create-request" >
        <button className="blueButton">Request LEAF</button>
          
        </Link>
        <Link to={`/user/${id}/settings`} >
        <button className="blueButton">Profile setting</button>
          
        </Link>
        <Link to="/user/modify-password" >
        <button className="blueButton">Change Password</button>
          
        </Link>
      </div>

    </div>
  );
}

export default ProfilePage;
