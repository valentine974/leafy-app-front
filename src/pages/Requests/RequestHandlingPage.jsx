import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function RequestHandlingPage() {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState(null);

  useEffect(() => {
    authService
      .getRequests()
      .then((requests) => {
        setRequests(
          requests.data.filter((request) => request.validations.some(validation=> user._id === validation.validatorId))
        );
      })
      .catch((err) => console.log("err in loading requests", err));
  }, [user]);


  const handleApproveButton = (request)=> { 
        const updatedRequest = request.validations.map(validation=>{
          if(validation.validator === user._id){
            validation.approved = true
          }
            return validation
        })
        authService.updateRequest(request._id, updatedRequest)
        .catch((err)=> console.log("err in updating request", err))
  }

    const handleRejectButton = (request)=> {

        const updatedRequest = request.validations.map(validation=>{
            if(validation.validator === user._id){
            validation.approved = false
            }
            return validation
        })
        authService.updateRequest(request._id, updatedRequest)
        .catch((err)=> console.log("err in updating request", err))

    }


  return (
    <div>
      <h1>Pending Requests</h1>

      {requests?.map((request) => (
        <div className="requestCard">
          <h3 className="">{request._id}</h3>
          <p>Status: {request.status}</p>
          <p>Comments: {request.comments}</p> 
          
          <button onClick={()=>handleApproveButton(request)} >Approve</button>
          <button onClick={()=>handleRejectButton(request)} >Reject</button>
          {/* button to ask for information later when conversation models is built */}
        </div>
      ))}

    </div>
  );
}

export default RequestHandlingPage;
