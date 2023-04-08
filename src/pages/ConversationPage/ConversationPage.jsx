import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ChatListElem from "../../components/Chat/ChatListElem";
import "./ConversationPage.css";
import Chatbox from "../../components/Chat/Chatbox";

function ConversationPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation]= useState(null);
  console.log(conversations)

  const handleCurrentConversation =(conversation)=> { 
    console.log("on click :", conversation)
    setCurrentConversation(conversation)
  }

  useEffect(() => {
    updateConversation()
  }, [user]);

  useEffect(()=>{
    const updatedConversation= conversations.filter((conversation)=> conversation._id === currentConversation._id)
    setCurrentConversation(updatedConversation)
  },[conversations])

  const updateConversation = ()=>{
    user &&
    authService.getUserConversations(user._id).then((response) => { 
      setConversations(response.data);

    
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="pageContainer conversationPage">
      <h1 className="pageTile">My conversations</h1>
      <div className="chatRoom">
          {/* map all user's messages */}
          <div className="chatList">
          {(conversations && currentConversation) &&
          <div >

          {conversations.map((conversation) => (
              <button key={conversation._id} onClick={(()=> handleCurrentConversation(conversation))} >
                <ChatListElem conversation={conversation} />
              </button>
            ))}

          </div>
          }
          </div>
          <div className="chatBox">
            <Chatbox conversation={currentConversation} updateConversation={updateConversation()}/>
          </div>
      </div>
    </div>
  );
}

export default ConversationPage;
