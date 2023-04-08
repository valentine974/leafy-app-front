import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect,useContext } from "react"; 
import { AuthContext } from "../../context/auth.context";
import ChatListElem from "../../components/Chat/ChatListElem";
import "./ConversationPage.css";
import Chatbox from "../../components/Chat/Chatbox";

function ConversationPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  const handleCurrentConversation = (conversation) => {
    // console.log("on click :", conversation);
    setCurrentConversation(conversation);
  };

  const updateConversation = () => {
    user &&
      authService
        .getUserConversations(user._id)
        .then((response) => {
          setConversations(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

    currentConversation &&
      authService
        .getConversation(currentConversation._id)
        .then((response) => 
        {
          console.log("response", response.data)
          setCurrentConversation(response.data)
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateConversation()
  }, [user]);

 /*  useEffect(() => {
    if(currentConversation && conversations){
      const updatedConversation = conversations.filter(
        (conversation) => conversation._id === currentConversation._id
      );
      console.log("filter", updatedConversation)
  
      setCurrentConversation(updatedConversation[0]);
    } 
  }, [conversations]); */



  return (
    <div className="pageContainer conversationPage">
      <h1 className="pageTile">My conversations</h1>
      <div className="chatRoom">
        {/* map all user's messages */}
        <div className="chatList">
          {conversations && (
            <div>
              {conversations.map((conversation) => (
                <button
                  key={conversation._id}
                  onClick={() => handleCurrentConversation(conversation)}
                >
                  <ChatListElem conversation={conversation} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="chatBox">
          <Chatbox
            conversation={currentConversation}
            updateConversation={updateConversation}
          />
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
