import authService from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePages.css";
import ChatBtn from "../../components/Chat/ChatBtn";
import Loading from "../../components/Loading/Loading";

function UsersPage(props) {
  const { togglePage } = props;

  const [users, setUsers] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChat = (receiverId) => {
    // verify if the conversation already exists
    console.log("clicked");
    authService
      .getUserConversations(user._id)
      .then((conversations) => {
        return conversations.data.filter((conversation) => {
          const participantIds = conversation.participants.map(
            (participant) => participant._id
          );
          return participantIds.every((id) =>
            [user._id, receiverId].includes(id)
          );
        });
      })
      .then((conversationArr) => {
        if (conversationArr.length > 0) {
          // if it exists, redirect to the conversation page
          navigate(`/conversation/${conversationArr[0]._id}`);
        } else {
          // if not, create conversation then redirect to the conversation page
          authService
            .createConversation({ participants: [user._id, receiverId] })
            .then((response) => {
              navigate(`/conversation/${response.data._id}`);
            })
            .catch((err) => console.log(err));
        }
      });
  };

  const handleDelete = (id) => {
    authService
      .deleteUser(id)
      .then((response) => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.log("err in deleting user", err));
  };

  useEffect(() => {
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
    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1> Manage Users </h1>
        <Link to="/create-user">
          <button className="blueButton" >Create a new user</button>
        </Link>
      </div>
      <div className="pageContent">
        <div className="cards">
          {users? (
            user &&
            users.map((oneUser) => (
              <div className="userCard" key={oneUser._id}>
                <div className="imageContainer">
                  <img src={oneUser.imageUrl} alt="" />
                </div>
                <h3>{oneUser.name}</h3>

                <Link
                  to={`/user/${oneUser._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className="blueButton" style={{ width: "150px" }}>User page </button>{" "}
                </Link>
                {oneUser._id !== user._id && (
                  <button
                    className="blueButton deleteButton"
                    style={{ width: "150px" }}
                    onClick={() => handleDelete(oneUser._id)}
                  >
                    Delete User
                  </button>
                )}
                {oneUser._id !== user._id && isLoggedIn && (
                  <button
                    className="chatBtn"
                    onClick={() => handleChat(oneUser._id)}
                  >
                    <ChatBtn />
                  </button>
                )}
              </div>
            ))):<Loading/> }
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
