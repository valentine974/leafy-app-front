import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import formatDate from "../../utils/dateFormating";
import CalendarComponent from "../../components/Calendar/CalendarComponent";
import ChatBtn from "../../components/Chat/ChatBtn";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function RequestReviewPage(props) {
  const { togglePage } = props;

  const { user } = useContext(AuthContext);
const navigate = useNavigate();
  const [requests, setRequests] = useState(null);


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

  const reactLinkStyle = {
    textDecoration: "none",
    color: "pink !important",
    backgroundColor: "white !important",
    margin: "5px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid pink",
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
  };

  useEffect(() => {
    user &&
      authService
        .getRequests()
        .then((requests) => {

          console.log(requests)
          setRequests(
            requests.data.filter(
              (request) => request.requester._id === user._id
            )
          );
        })
        .catch((err) => console.log("err in loading requests", err));
  }, [user]);

  const handleDeleteButton = (id) => {
    authService.deleteRequest(id);
    let newRequests = requests.filter((request) => request._id !== id);
    setRequests(newRequests);
  };

  const linkStyle = {
    textDecoration: "none!important",
    margin: "5px",
    color: "white",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    paddingTop: "10px",
    "&.pageContainer a": {
      textDecoration: "none !important",
    }
  };

  return (
    <div className={`pageContainer ${togglePage}`}>
    {/* {requests? (<> */}
      <div className={`pageTitle ${togglePage}`}>
        <h1>LEAF REQUESTS</h1>
        
        <Link className={linkStyle} to="/create-request "><button className="blueButton">Request LEAF</button></Link>
      </div>
      <div className="pageContent">
      <br />
      <CalendarComponent date={new Date()} onDateChange={()=>console.log("this calendar is only a viewer, add new request please go to the request leaf page.")}/>
      <br />
        <div className="requestCards">
          {requests?.map((request) => (
            <div className={`requestCard ${request.status}`}>
              <p><b>Start date:</b> {formatDate(request.startDate)}</p>
              <p><b>Duration:</b> {request.duration} days</p>
              {/* <p><b>To be approved before:</b>
                 {formatDate(request.approvalLimitDate)}
              </p> */}
              <p><b>Status:</b> {request.status}</p>
              
              <p><b>Comments:</b> {request.comments?request.comments:"no comments"}</p>
              <table>
                <thead>
                  <tr>
                    <th>Validators</th>
                    <th>Status</th> 
                  </tr>
                </thead>
                <tbody> 
                {request.validations.map((validation) => (
                  <tr>
                    <td>{validation.validatorId.name}</td>
                    <td>{validation.status}</td>
                  </tr> 
              ))}

                </tbody>
              </table>

               
              <Link to={`/request/${request._id}/settings`}>
                <button className="blueButton">To modify my request</button> 
              </Link>
              <button onClick={() => handleDeleteButton(request._id)} className="blueButton deleteButton">
                Delete my request
              </button>
              <button
                className="chatBtn"
                onClick={() => handleChat([user._id,...request.validations.map(item => item.validatorId._id)])}
              >
                <ChatBtn/>
              </button>
            </div>
          ))}
        </div>
      </div>
{/* // </>): <Loading/> } */}
    </div>
  );
}

export default RequestReviewPage;
