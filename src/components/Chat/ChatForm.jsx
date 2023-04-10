 import { useState } from "react";

function ChatForm(props) { 
     const { conversation, sender } = props; 
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
        .sendMessage(conversation._id, {sender,content:message})
        .then((response)=>setMessage(""))
        .catch((err)=>console.log("err in sending message", err))

     }

 
  return (
    
    <div className="chatForm">
    <form onSubmit={handleSubmit}>
        <label>
            Text:
            <input type="textarea" value={message} onChange={handleText}></input>
        </label>
        <button type="submit">Send</button>
    </form>
    {errorMessage && <p>{errorMessage}</p>}
    

    </div>
 
  );
}

export default ChatForm;
