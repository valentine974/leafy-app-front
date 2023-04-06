import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ChatListElem from "../../components/Chat/ChatListElem";
import "./ConversationPage.css";

function ConversationPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    authService
      .getUserConversations(user._id)
      .then((response) => {
        console.log(response.data);
        setConversations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="pageContainer conversationPage">
      <h1 className="pageTile">My conversations</h1>
      <div className="chatRoom">
          {/* map all user's messages */}
          <div className="chatList">
            {conversations.map((conversation) => (
              <>
                <ChatListElem conversation={conversation} />
              </>
            ))}
          </div>
          <div className="chatBox">
            <h1>select one chat to see the details</h1>
          </div>
      </div>
    </div>
  );
}

export default ConversationPage;
