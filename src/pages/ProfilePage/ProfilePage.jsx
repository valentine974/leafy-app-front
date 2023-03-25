import "./ProfilePage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  if (user.isNewEmployee) {
    return <Navigate to="/user/modify-password" />;
  }else{

    return (
      <div>
        <h1>Profile page</h1>
        <p>{user.isNewEmployee && 'test'}</p>
        
        
        
      </div>
    );
  }

}

export default ProfilePage;
