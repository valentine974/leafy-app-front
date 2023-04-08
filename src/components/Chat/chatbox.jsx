import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

function Chatbox(props) {
 const {user}= useContext(AuthContext)
  const { conversation } = props;
  console.log("received prop", conversation)
  return (
    
    <div className="chatbox">
    {(user && conversation)?  
    <>
      <h1> 
        Conversation with: {conversation.participants.map((participant) => <img key={participant._id} src={participant.imageUrl} alt={participant.name}  style={{"width":"30px",}} />  )} 
      </h1>

      <div className="messageContainer">
      {conversation.messages.map((message)=>{
        <div className={`singleMessage ${message.sender._id ===user._id?"right":"left"}`}>
        <p><b>{message.sender.name}:</b> {message.content}</p>

        </div>
      })}

      </div>

    
      </>: 
            <h1>select one chat to see the details</h1>
    }

    </div>
 
  );
}

export default Chatbox;
