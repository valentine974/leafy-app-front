import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";
function UsersPage() {
  const [users, setUsers] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("user", user);
    authService
      .getUsers()
      .then((allUsers) => {
        if (user.position === "hr" || user.position === "manager") {
          setUsers(
            allUsers.data.filter(
              (employee) => employee.companyId._id === user.companyId
            )
          );
        } else if (user.position === "admin") {
          setUsers(allUsers.data);
        }
      })
      .catch((err) => console.log("err in loading Users", err));
  }, [user]);

  return (
    <>
      <h1 className="pageTitle">Company Page </h1> 
      <div className="cards">
      {users && user &&
        users.map((oneUser) => (
          <div className="userCard">
            <div className="imageContainer">
            <img src={oneUser.imageUrl} alt="" />
            </div>
            <h3>{oneUser.name}</h3>
            <Link to={`/user/${oneUser._id}`}> Go to user profile page </Link>
          </div>
        ))}
      </div>
      <Link to="/create-user">
        <button>Create a new user</button>
      </Link>
    </>
  );
}

export default UsersPage;
