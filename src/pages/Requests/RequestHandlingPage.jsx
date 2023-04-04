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
  }, [user]);

  const handleApproval = (request) => {
    const updatedRequest = request.validations.map((validation) => {
      if (validation.validatorId === user._id) {
        validation.approval = "approved";
      }
    });
    setRequests(updatedRequest);
    authService
      .updateRequest(request._id, JSON.parse(JSON.stringify(updatedRequest)))
      .catch((err) => console.log("err in updating request", err));
  };

  const handleRejection = (request) => {
    const updatedRequest = request.validations.map((validation) => {
      if (validation.validatorId === user._id) {
        validation.approval = "rejected";
      }
    });
    setRequests(updatedRequest);
    authService
      .updateRequest(request._id, JSON.parse(JSON.stringify(updatedRequest)))
      .then((response) => console.log("response", response))
      .catch((err) => console.log("err in updating request", err));
  };

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Pending Requests</h1>
      <div className="requestCards">
        {requests?.map((request) => 
            <div className={`requestCard ${request.status}`} key={request._id}>
              <h3 className="">{request._id}</h3>
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
