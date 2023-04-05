import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function RequestReviewPage() {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState(null);

  useEffect(() => {
    user && authService
      .getRequests()
      .then((requests) => {
        setRequests(
          requests.data.filter((request) => request.requester._id === user._id)
        );
      })
      .catch((err) => console.log("err in loading requests", err));
  }, [user]);

  const handleDeleteButton = (id) => {
    authService.deleteRequest(id);
    let newRequests = requests.filter((request) => request._id !== id);
    setRequests(newRequests);
  };

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Request Review</h1>
      <div className="requestCards">
        {requests?.map((request) => (
          <div className={`requestCard ${request.status}`}>
            <h3 className="">{request._id}</h3>
            <p>Status: {request.status}</p>
            <p>Comments: {request.comments}</p>

            {request.validations.map((validation) => (
              <li>{validation.approval}</li>
            ))}

            <Link to={`/request/${request._id}/settings`}>
              To modify my request
            </Link>
            <button onClick={() => handleDeleteButton(request._id)}>
              Delete my request
            </button>
          </div>
        ))}
      </div>
      <Link to="/create-request ">Request LEAF</Link>
    </div>
  );
}

export default RequestReviewPage;
