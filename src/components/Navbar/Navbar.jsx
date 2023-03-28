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
          <button onClick={logOutUser}>Logout</button>

          <Link to="/user">
            <button>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>
          <Link to="/companies">
            {" "}
            <button>See Companies</button>{" "}
          </Link>
          <Link to="/company">
            {" "}
            <button>My company</button>{" "}
          </Link>

          <span>{user && user.name}</span>
        </>
      )}
      {/* AJOUTER MIDDLEWARE isAdmin */}
      {/* {!isLoggedIn && ( 
        <> 

        <Link to="/companies">
            {" "}
            <button>See Companies</button>{" "}
          </Link>
        </>
      )} */}

      {!isLoggedIn && (
        <> 
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
