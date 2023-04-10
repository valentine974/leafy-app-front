import authService from "../../services/auth.service";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import "./ConversationPage.css";
import Chatbox from "../../components/Chat/Chatbox";

function ConversationPage() {
  const { user } = useContext(AuthContext);
  const [currentConversation, setCurrentConversation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    updateConversation();
    const interval = setInterval(() => {
      updateConversation();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateConversation = () => {
    authService
      .getConversation(id)
      .then((response) => {
        console.log("response", response.data);
        setCurrentConversation(response.data);
      })
      .catch((err) =>
        console.log("error in retriving the conversation by id", err)
      );
  };

  return (

      <>
        <div className="pageContainer conversationPage">
          <div className="chatBox">
            <Chatbox
              conversation={currentConversation}
              updateConversation={updateConversation}
            />
          </div>
        </div>
      </>
    
  );
}

export default ConversationPage;
