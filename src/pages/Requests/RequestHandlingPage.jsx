import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./RequestPages.css";
import formatDate from "../../utils/dateFormating";
 
function RequestHandlingPage(props) {
  const {togglePage}=props
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    user &&
      authService
        .getRequests()
        .then((requests) => {
          setRequests(
            requests.data.filter((request) =>
              request.validations.some(
                (validation) => user._id === validation.validatorId._id
              )
            )
          );
        })
        .catch((err) => console.log("err in loading requests", err));
  }, [user]);


  useEffect(() => {console.log("page updated")}, [requests]);

  const handleApproval = (request) => {
    // update validation status
    // deep copy request object's properties and modify validations array
    const updatedRequest = {
      ...request,
      validations: request.validations.map((validation) =>  
        validation.validatorId._id === user._id
          ? { ...validation, status: "approved" }
          : validation
      ),  
    };
  
    authService
      .updateRequest(request._id, updatedRequest)
      .then((updatedRequest) => {
        // update the showing requests
        console.log("updated request", updatedRequest);
        setRequests((prevRequests) =>
          prevRequests.map((prevRequest) =>
            prevRequest._id === updatedRequest.data._id ? updatedRequest.data : prevRequest
          )
        );
        console.log("updated request : ", updatedRequest.data.filter((request) => request.requester._id === user._id));
      })
      .catch((err) => console.log("err in updating request", err));
  };

  const handleRejection = (request) => {
    
    const updatedRequest = {
      ...request,
      validations: request.validations.map((validation) =>  
        validation.validatorId._id === user._id
          ? { ...validation, status: "rejected" }
          : validation
      ),  
    };
  
    authService
      .updateRequest(request._id, updatedRequest)
      .then((updatedRequest) => {

        //update the showing requests (it takes quite a while to update)
        setRequests((prevRequests) =>
          prevRequests.map((prevRequest) =>
            prevRequest._id === updatedRequest.data._id ? updatedRequest.data : prevRequest
          )
        );
        console.log("requests", requests.data.filter((request) => request.requester._id === user._id));
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
        {requests && requests.map((request) => 
            <div className={`requestCard ${request.status}`} key={request._id}>
              <h3 className="">{request.requester.name}</h3>
              <p>Start date: {formatDate(request.startDate)}</p>
            <p>End date: {formatDate(request.endDate)}</p>
            <p>To be approved before: {formatDate(request.approvalLimitDate)}</p>
              <p>Status: {request.status}</p>
              <p>Comments: {request.comments}</p>
              <button onClick={() => handleApproval(request)}>Approve</button>
              <button onClick={() => handleRejection(request)}>Reject</button>
              {/* button to ask for information later when conversation models is built */}
            </div>
          )}
      </div></div>

      
    </div>
  );
}

export default RequestHandlingPage;
