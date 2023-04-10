import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import homeImage from "../../Images/home-icon-silhouette.png";
import logoutImage from "../../Images/logout.png";
import leavesImage from "../../Images/leavescute.png";
import authService from "../../services/auth.service";
import mailImage from "../../Images/mail.png"
import handleLeavesImage from "../../Images/leave.png"
import usersImage from "../../Images/group.png"
import companiesImage from "../../Images/target.png"
import loginImage from "../../Images/login.png"
function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [companyPicture, setCompanyPicture] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const { handleMenu, toggleMenuPage } = props;

  useEffect(() => {
    user &&
      authService
        .getCompany(user.companyId)
        .then((company) => setCompanyPicture(company.data.imageUrl));

    user &&
      authService
        .getUser(user._id)
        .then((response) => setProfilePicture(response.data.imageUrl));
  }, [user]);

  const linkStyle = {
    textDecoration: "none",
    margin: "5px",
    color: "white",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    paddingTop: "10px",
  };

   

  return (
    <nav className={toggleMenuPage}>
      <h1>Menu</h1>
      <Link to="/" style={linkStyle}>
        <img
          src={homeImage}
          alt="Home"
          onClick={() => {
            handleMenu();
          }}
        />{" "}
        <p>Home</p>
      </Link>

      {isLoggedIn && user && (
        <>
          <Link
            to={`/company/${user.companyId}`}
            style={linkStyle}
            onClick={() => {
              handleMenu();
            }}
          >
            
            <img src={companyPicture} alt="Company"  style={{"borderRadius":"20px"}}/><p>
              
              My company
            </p>
          </Link>
          <Link
            to={`user/${user._id}`}
            style={linkStyle}
            onClick={() => {
              handleMenu();
            }}
          >
          <img src={profilePicture} alt="Profile" />
            <p>
              Profile
            </p>
          </Link>
          <Link
            to={`/request/review`}
            style={linkStyle}
            onClick={() => {
              handleMenu();
            }}
          >
            <img src={leavesImage} alt="Leaves" /> <p>My Leaves</p>
          </Link>

        

          <Link
            to={`/conversations`}
            style={linkStyle}
            onClick={() => {
              handleMenu();
            }}
          >
            {/* add unread messages on red number later */} 
            <img src={mailImage} alt="inMails" /><p> InMails</p>
          </Link>

          <Link
            to="/"
            style={linkStyle}
            onClick={() => {
              handleMenu();
              logOutUser();
            }}
          >
            <img src={logoutImage} alt="Logout" />
            <p> Logout</p>
          </Link>
        </>
      )}

      {isLoggedIn && user && user.position !== "admin" && (
        <>

      <h1>HR & Managers</h1>

          
        </>
      )}

      {isLoggedIn &&
        user &&
        (user.position === "hr" || user.position === "manager") && (
          <>
            <Link
              to="/handle-request"
              style={linkStyle}
              onClick={() => {
                handleMenu();
              }}
            >
            <img src={handleLeavesImage} alt="handleLeaves" />
            <p> Handle Leaves</p> 
            </Link>
          </>
        )}

      {isLoggedIn &&
        user &&
        (user.position === "hr" ||
          user.position === "manager" ||
          user.position === "admin") && (
          <>

<h1>Admin pannel</h1>
            <Link
              to="/users"
              style={linkStyle}
              onClick={() => {
                handleMenu();
              }}
            >
            <img src={usersImage} alt="All users" />
            <p> All users</p>  
            </Link>
          </>
        )}

      {isLoggedIn && user && user.position === "admin" && (
        <>
          <Link
            to="/companies"
            style={linkStyle}
            onClick={() => {
              handleMenu();
            }}
          >

<img src={companiesImage} alt="All companies" />
            <p> All companies</p>   
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link
            to="/login"
            style={linkStyle}
            onClick={() => {
              handleMenu();
            }}
          >
<img src={loginImage} alt="Login" />
            <p> Login</p>    
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
