import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import formatDate from "../../utils/dateFormating";
function RequestReviewPage(props) {
  const { togglePage } = props;
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState(null);

  useEffect(() => {
    user &&
      authService
        .getRequests()
        .then((requests) => {
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

  return (
    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1>Request Review</h1>
      </div>
      <div className="pageContent">
        <Link to="/create-request ">Request LEAF</Link>
        <div className="requestCards">
          {requests?.map((request) => (
            <div className={`requestCard ${request.status}`}>
              <p>Start date: {formatDate(request.startDate)}</p>
              <p>Duration: {request.duration} days</p>
              <p>
                To be approved before: {formatDate(request.approvalLimitDate)}
              </p>
              <p>Status: {request.status}</p>
              <p>Comments: {request.comments}</p>

              {request.validations.map((validation) => (
                <li>
                  {" "}
                  {validation.validatorId.name}: {validation.status}
                </li>
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
      </div>
    </div>
  );
}

export default RequestReviewPage;
