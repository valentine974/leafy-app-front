import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const linkStyle = {
    textDecoration: "none",
    margin: "5px",
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
      <Link to="/" style={linkStyle}>
        <button style={buttonStyle}>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/" style={linkStyle}>
          <button onClick={logOutUser} style={buttonStyle}>Logout</button>
          </Link>
          

          <Link to={`user/${user._id}`} style={linkStyle}>
            <button style={buttonStyle}>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <Link to={`/company/${user.companyId}`} style={linkStyle}>
            <button style={buttonStyle} >My company</button>
          </Link>
        </>
      )}


      {isLoggedIn && user && user.position !== "admin" && (
        <>
        <Link to={`/request/review`} style={linkStyle}>
            <button style={buttonStyle} >My requests</button>
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

      {isLoggedIn &&  <span>{user && user.name}</span>}


    </nav>
  );
}

export default Navbar;
