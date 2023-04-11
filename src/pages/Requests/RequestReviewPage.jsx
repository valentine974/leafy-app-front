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

  const linkStyle = {
    textDecoration: "none",
    margin: "5px",
    color: "white",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    paddingTop: "10px",
  };

  return (
    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1>LEAF REQUESTS</h1>
        <button>
        <Link className={linkStyle} to="/create-request ">Request LEAF</Link></button>
      </div>
      <div className="pageContent">
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
                <button>To modify my request</button> 
              </Link>
              <button onClick={() => handleDeleteButton(request._id)} className="deleteButton">
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
