import { useContext, useState} from "react";
import { AuthContext } from "../../context/auth.context";
import formatDateTime from "../../utils/dateTimeFormating"; 
import authService from "../../services/auth.service"; 
import Loading from '../../components/Loading/Loading'

function Chatbox(props) {
  const { user } = useContext(AuthContext);
  const { conversation , updateConversation} = props; 
 
  const [message,setMessage]=useState("")
  const[errorMessage, setErrorMessage]=useState('')

  const handleText= (e)=>{
     setMessage(e.target.value)
  }

  const handleSubmit=(e)=>{
     e.preventDefault()

  if(message===""){setErrorMessage("Your message is empty")
 return 
 }

     authService
     .sendMessage(conversation._id, {sender:user._id,content:message})
     .then((response)=>setMessage(""))
     .then(()=> updateConversation())
     .catch((err)=>console.log("err in sending message", err))

  }

 

  return (
    <div className="chatbox">
      {(user && conversation)? (
        <>
          <h1> 
            {conversation.participants.map((participant) => (
              <img
                key={participant._id}
                src={participant.imageUrl}
                alt={participant.name}
                style={{ "width": "80px", "height":"80px", "borderRadius":"50%"  }}
              />
            ))}
          </h1>

          <div className="messageContainer">
            {conversation.messages.map((message) => (
              <div
                key={message._id}
                className={`singleMessage ${
                  message.sender._id === user._id ? "me" : "others"
                }`}
              >
                <p>
                  <b>{message.sender.name}:</b> {message.content} 
                </p>
                <p style={{ color: "light-grey", fontSize: "0.5rem" }}>
                  {formatDateTime(message.createdAt)}
                </p>
              </div>
            ))}
          </div>

          <div className="chatForm">
            <form onSubmit={handleSubmit}>
              <label> <input
                  type="textarea"
                  value={message}
                  onChange={handleText}
                ></input>
              </label>
              <button type="submit" >Send</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </>
      ) : (
        <>
        <Loading/>
    </>
         
      )}
    </div>
  );
}

export default Chatbox;
