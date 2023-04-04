import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./RequestPages.css";

function RequestHandlingPage() {
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
                (validation) => user._id === validation.validatorId
              )
            )
          );
        })
        .catch((err) => console.log("err in loading requests", err));
  }, [user, requests]);


  useEffect(() => {console.log("page updated")}, [requests]);

  const handleApproval = (request) => {
    // update validation status
    // deep copy request object's properties and modify validations array
    const updatedRequest = {
      ...request,
      validations: request.validations.map((validation) =>  
        validation.validatorId === user._id
          ? { ...validation, status: "approved" }
          : validation
      ),  
    };
  
    authService
      .updateRequest(request._id, updatedRequest)
      .then((updatedRequest) => {
        // update the showing requests
        setRequests((prevRequests) =>
          prevRequests.map((prevRequest) =>
            prevRequest._id === updatedRequest._id ? updatedRequest : prevRequest
          )
        );
      })
      .catch((err) => console.log("err in updating request", err));
  };

  const handleRejection = (request) => {
    
    const updatedRequest = {
      ...request,
      validations: request.validations.map((validation) =>  
        validation.validatorId === user._id
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
            prevRequest._id === updatedRequest._id ? updatedRequest : prevRequest
          )
        );
      })
      .catch((err) => console.log("err in updating request", err));
  };
  
 

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Pending Requests</h1>
      <div className="requestCards">
        {requests && requests.map((request) => 
            <div className={`requestCard ${request.status}`} key={request._id}>
              <h3 className="">{request._id}</h3>
              <p>Requester: {request.requester.name + " " + request.requester.surname}</p>
              <p>Status: {request.status}</p>
              <p>Comments: {request.comments}</p>
              <button onClick={() => handleApproval(request)}>Approve</button>
              <button onClick={() => handleRejection(request)}>Reject</button>
              {/* button to ask for information later when conversation models is built */}
            </div>
          )}
      </div>
    </div>
  );
}

export default RequestHandlingPage;
