import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import homeImage from "../../Images/home-icon-silhouette.png";
import logoutImage from "../../Images/logout.png";
import profileImage from "../../Images/profile.png";
import leavesImage from "../../Images/leavescute.png";
import authService from "../../services/auth.service"; 


function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const[companyPicture, setCompanyPicture] = useState()
  const[profilePicture, setProfilePicture] = useState()

  
  useEffect(()=>{
    user &&
    authService
    .getCompany(user.companyId)
    .then((company)=> setCompanyPicture(company.data.imageUrl) )

    user && 
    authService
    .getUser(user._id)
    .then((response)=> setProfilePicture(response.data.imageUrl))

    
    // user && setProfilePicture(user.imageUrl)

  },[user])

  const linkStyle = {
    textDecoration: "none",
    margin: "5px",
    color: "white",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent:"center",
    paddingTop: "10px",

  };



  const buttonStyle = {
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
    
    <nav>
    <h1>Menu</h1>
      <Link to="/" style={linkStyle}>

      <img src={homeImage} alt="Home"/> <p>Home</p>
        {/* <button style={buttonStyle}>Home</button> */}
      </Link>

      {isLoggedIn && user && (
        <>
          <Link to="/"  style={linkStyle}> 
 
          <img src={logoutImage} alt="Logout"/><p onClick={logOutUser}  >  Logout</p>
           
          </Link>
          

          <Link to={`user/${user._id}`} style={linkStyle}> 
            <p ><img src={profilePicture} alt="Profile"/>Profile</p>
            {/* <img src={profileImage} alt="Profile"/><p >Profile</p> */}
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <Link to={`/company/${user.companyId}`}  style={linkStyle}> 
            <p ><img src={companyPicture} alt="Company"/>My company</p>
            {/* <button style={buttonStyle} >My company</button> */}
          </Link>
        </>
      )}


      {isLoggedIn && user && user.position !== "admin" && (
        <>
        <Link to={`/request/review`} style={linkStyle} >
        <img src={leavesImage} alt="Leaves"/> <p >My requests</p>
            {/* <button style={buttonStyle} >My requests</button> */}
          </Link>
        </>
      )}


      {isLoggedIn && user && (user.position === "hr"|| user.position ==="manager") && (
        <>
          <Link to="/handle-request" style={linkStyle}>
            <button style={buttonStyle}>Handle requests</button>
          </Link>
        </>
      )}

      {isLoggedIn && user && (user.position === "hr"|| user.position ==="manager" || user.position ==="admin") && (
        <>
          <Link to="/users" style={linkStyle}>
            <button style={buttonStyle}>All users</button>
          </Link>
        </> 
      )}

      {isLoggedIn && user && user.position === "admin" && (
        <> 
        <Link to="/companies" style={linkStyle}>
            <button style={buttonStyle}>All companies</button>
          </Link>
        </>
      )}

      

      {!isLoggedIn && (
        <> 
          <Link to="/login" style={linkStyle}>
            <button style={buttonStyle}>Login</button>{" "}
          </Link>
        </>
      )}



    </nav>
  );
}

export default Navbar;
