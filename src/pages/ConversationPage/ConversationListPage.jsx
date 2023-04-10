import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect,useContext } from "react"; 
import { AuthContext } from "../../context/auth.context";
import ChatListElem from "../../components/Chat/ChatListElem";
import "./ConversationPage.css";

function ConversationListPage() {
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


  return (
    <div className="pageContainer conversationPage">
      <h1 className="pageTile">My conversations</h1>
      <div className="chatRoom">
        {/* map all user's messages */}
        <div className="chatList">
          {conversations && (
            <div>
              {conversations.map((conversation) => (
                <Link
                  key={conversation._id}
                  to={`/conversation/${conversation._id}`}
                >
                  <ChatListElem conversation={conversation} />
                </Link>
              ))}
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
}

export default ConversationListPage;
