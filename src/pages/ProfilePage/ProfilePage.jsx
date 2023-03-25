import "./ProfilePage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  return (
    <div>
      <h1>Profile page</h1>
      {/* <p>{user.isNewEmployee && 'test'}</p>s */}
      
      
    </div>
  );
}

export default ProfilePage;
