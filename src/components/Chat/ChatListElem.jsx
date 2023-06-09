import formatDate from "../../utils/dateFormating";
import Loading from "../../components/Loading/Loading"

function ChatListElem(props) {
  const { participants, messages } = props.conversation;
  return (
    <div className="singleChat card">
    {participants? (<>
      <div className="left imagesContainer">
      
        {participants.map((participant) => (
          <div key={participant._id} className="miniProfileImageContainer">
            <img src={participant.imageUrl} alt="profilePic" />
          </div>
        ))}
      </div>
      <div className="right">
        {/* preview of messages, show the last message in the conversation */}
        {messages.length > 0 ? (
          <>
            <p className="chatDate">{formatDate(messages[messages.length - 1].updatedAt)}</p>
          </>
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      </>): <Loading/>}
    </div>
  );
}

export default ChatListElem;

