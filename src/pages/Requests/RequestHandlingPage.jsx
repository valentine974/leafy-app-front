import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./RequestPages.css";
import formatDate from "../../utils/dateFormating";
import ChatBtn from "../../components/Chat/ChatBtn";
import { useNavigate } from "react-router-dom";

 
function RequestHandlingPage(props) {
  const {togglePage}=props
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    user &&
      authService
        .getRequests()
        .then((allrequests) => {
          setRequests(
            allrequests.data.filter((request) =>
              request.validations.some(
                (validation) => user._id === validation.validatorId._id
              )
            )
          );
        })
        .catch((err) => console.log("err in loading requests", err));
  }, [user]);

  useEffect(() => {
    console.log("showing requests get updated");
  }, [requests]);

  const handleChat = (participantIds) => {
    // verify if the conversation already exists
    // latter on we will intergrate the attachement of the conversation to the request
    authService
      .getUserConversations(user._id)
      .then((conversations) => {
        return conversations.data.filter((conversation) => {
          const participantIds = conversation.participants.map(
            (participant) => participant._id
          );
          return participantIds.every((id) =>
            participantIds.includes(id)
          );
        });
      })
      .then((conversationArr) => {
        if (conversationArr.length > 0) {
          // if it exists, redirect to the conversation page
          navigate(`/conversation/${conversationArr[0]._id}`);
        } else {
          // if not, create conversation then redirect to the conversation page
          authService
            .createConversation({ participants: participantIds })
            .then((response) => {
              navigate(`/conversation/${response.data._id}`);
            })
            .catch((err) => console.log(err));
        }
      });
  };
  const handleApproval = (request) => {

    const updatedRequest = request.validations.map((validation) => {
      if (validation.validatorId._id === user._id) {
        validation.status = "approved"
      }
    })

    authService
      .updateRequest(request._id, updatedRequest)
      .then((updatedRequest) => {
        // update the showing requests
        setRequests((prevRequests) =>
          prevRequests.map((prevRequest) =>
         prevRequest._id === updatedRequest.data._id
              ? updatedRequest.data
              : prevRequest
         )
        );
      })
      .catch((err) => console.log("err in updating request", err));
  };

  const handleRejection = (request) => {


    const updatedRequest = request
    updatedRequest.validations.map((validation) => {
      if (validation.validatorId._id === user._id) {
        validation.status = "rejected"
      }
    })

  
    authService
      .updateRequest(request._id, updatedRequest)
      .then((updatedRequest) => {
        //update the showing requests (it takes quite a while to update)
        
        setRequests((prevRequests) =>
          prevRequests.map((prevRequest) =>
            prevRequest._id === updatedRequest.data._id
              ? updatedRequest.data
              : prevRequest
          )
        );
      })
      .catch((err) => console.log("err in updating request", err));
  };

  return (
    <div className={`pageContainer ${togglePage}`}>
    <div className={`pageTitle ${togglePage}`}>
    <h1 >PENDING REQUESTS</h1>
    </div>
    <div className="pageContent">
      <div className="requestCards">
        {requests &&
          requests.map((request) => (
            <div className={`requestCard ${request.status}`} key={request._id}>
              <h3 className="">{request.requester.name}</h3>
              <p>Start date: {formatDate(request.startDate)}</p>
              <p>End date: {formatDate(request.endDate)}</p>
              <p>
                To be approved before: {formatDate(request.approvalLimitDate)}
              </p>
              <p>Status: {request.status}</p>
              <p>Comments: {request.comments}</p>
              <button onClick={() => handleApproval(request)}>Approve</button>
              <button onClick={() => handleRejection(request)}>Reject</button>
              {/* button to ask for information later when conversation models is built */}
              <button
                className="chatBtn"
                onClick={() => handleChat([ request.requester,...request.validations.map(item => item.validatorId._id)])}
              >
                <ChatBtn/>
              </button>
            </div>

          ))}
      </div>
    </div>
 </div>
  );
}

export default RequestHandlingPage;
