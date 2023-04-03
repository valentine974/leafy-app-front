import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/">
          <button onClick={logOutUser}>Logout</button>
          </Link>
          

          <Link to={`user/${user._id}`}>
            <button>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <Link to={`/company/${user.companyId}`}>
            <button>My company</button>
          </Link>
        </>
      )}


      {isLoggedIn && user && user.position !== "admin" && (
        <>
        <Link to={`/request/review`}>
            <button>My requests</button>
          </Link>
        </>
      )}


      {isLoggedIn && user && (user.position === "hr"|| user.position ==="manager") && (
        <>
          <Link to="/handle-request">
            <button>Handle requests</button>
          </Link>
        </>
      )}

      {isLoggedIn && user && (user.position === "hr"|| user.position ==="manager" || user.position ==="admin") && (
        <>
          <Link to="/users">
            <button>All users</button>
          </Link>
        </> 
      )}

      {isLoggedIn && user && user.position === "admin" && (
        <> 
        <Link to="/companies">
            <button>All companies</button>
          </Link>
        </>
      )}

      

      {!isLoggedIn && (
        <> 
          <Link to="/login">
            <button>Login</button>{" "}
          </Link>
        </>
      )}

      {isLoggedIn &&  <span>{user && user.name}</span>}


    </nav>
  );
}

export default Navbar;
