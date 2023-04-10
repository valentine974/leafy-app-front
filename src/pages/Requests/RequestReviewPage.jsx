import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import formatDate from "../../utils/dateFormating";
import CalendarComponent from "../../components/Calendar/CalendarComponent";
function RequestReviewPage() {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState(null);

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
      <br />
      <CalendarComponent />
      <br />

      <div className="requestCards">
        {requests?.map((request) => (
          <div className={`requestCard ${request.status}`}>
            <p>Start date: {formatDate(request.startDate)}</p>
            <p>Duration: {request.duration} days</p>
            <p>To be approved before: {formatDate(request.approvalLimitDate)}</p>
            <p>Status: {request.status}</p>
            <p>Comments: {request.comments}</p>

            {request.validations.map((validation) => (
              <li> {validation.validatorId.name}: {validation.status}</li>
            ))}

            <Link to={`/request/${request._id}/settings`} style={reactLinkStyle}>
              To modify my request
            </Link>
            <button onClick={() => handleDeleteButton(request._id)}>
              Delete my request
            </button>
          </div>
        ))}
      </div>
      <Link to="/create-request " style={reactLinkStyle}>Request LEAF</Link>
    </div>
  );
}

export default RequestReviewPage;
