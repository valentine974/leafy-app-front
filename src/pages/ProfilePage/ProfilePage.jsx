import "./ProfilePage.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";


function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
      <div>
        <h1>Profile page</h1>
        <p>{user.isNewEmployee && 'test'}</p>
        
        <Link to="/user/modify-password">To modify the password</Link>
        
      </div>
    );
  
}

export default ProfilePage;
