import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ChatListElem from "../../components/Chat/ChatListElem";
import "./ConversationPage.css";
import Loading from "../../components/Loading/Loading";

function ConversationListPage(props) {
  const { togglePage } = props;
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    user &&
      authService
        .getUserConversations(user._id)
        .then((response) => {
          setConversations(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user]);

  const linkStyle = {
    textDecoration: "none",
    margin: "5px",
    color: "white",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10px",
  };

  return (
    <div className={`pageContainer conversationPage ${togglePage}`}>
      {conversations? (
        <>
          <div className={`pageTitle ${togglePage}`}>
            <h1>My conversations</h1>
          </div>
          <div className="pageContent">
            <div className="chatRoom">
              {/* map all user's messages */}
              <div className="chatList">
                <div>
                  {conversations.map((conversation) => (
                    <Link
                      key={conversation._id}
                      to={`/conversation/${conversation._id}`}
                      style={linkStyle}
                    >
                      <ChatListElem conversation={conversation} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ): <Loading/> }
    </div>
  );
}

export default ConversationListPage;
