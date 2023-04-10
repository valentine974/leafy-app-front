import { useState, useContext, useEffect} from "react"; 
import { useNavigate,useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import formatDate from "../../utils/dateFormating";

function RequestSettingPage(props) {
  const {togglePage}= props
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isFullDay, setIsFullDay] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [morningAfternoonStart, setMorningAfternoonStart] = useState("morning");
    const [endDate, setEndDate] = useState("");
    const [morningAfternoonEnd, setMorningAfternoonEnd] = useState("afternoon");
    const [comments, setComments] = useState("");
    const [approvalLimitDate, setApprovalLimitDate] = useState(new Date());
  
    const handleIsFullDay = (e) => {
      setIsFullDay(e.target.checked);
    };
    const handleStartDate = (e) => {
      setStartDate(e.target.value);
    };
    const handleMorningAfternoonStart = (e) => {
      setMorningAfternoonStart(e.target.value);
    };
    const handleEndDate = (e) => {
      setEndDate(e.target.value);
    };
    const handleMorningAfternoonEnd = (e) => {
      setMorningAfternoonEnd(e.target.value);
    };
    const handleComments = (e) => {
      setComments(e.target.value);
    };
  
    const { id } = useParams();
    
    

    useEffect(() => {
      authService.getRequest(id).then((foundRequest) => {  

        const {  isFullDay, startDate,morningAfternoonStart, endDate, morningAfternoonEnd, comments } = foundRequest.data;
        setIsFullDay(isFullDay);  
        setStartDate(formatDate(startDate))
        setMorningAfternoonStart(morningAfternoonStart)
        setEndDate(formatDate(endDate))
        setMorningAfternoonEnd(morningAfternoonEnd)
        setComments(comments)
        
      }).catch((err) => console.log("error in getting user", err));
  
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault(); 
      
      setApprovalLimitDate(new Date(startDate)); // TO CHANGE WITH DATE LOGIC
  
      authService
        .updateRequest(id,{
          status: "pending",
          isFullDay,
          startDate,
          morningAfternoonStart,
          endDate,
          morningAfternoonEnd,
          requester: user._id,
          comments,
          approvalLimitDate,
        })
        .then((request) => {
          console.log("New request :", request);
          navigate("/request/review");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.message);
        });
    };
  
    return (
      <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}><h1>Request Settings</h1></div>
      <div className="pageContent">
      {user && (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Full day
                  <input type="checkbox" checked={isFullDay} onChange={handleIsFullDay}/>
              </label>
              <label>
                Start date
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleStartDate}
                />
              </label>
  
              {isFullDay === false && (
                <label>
                  From the morning or the afternoon?
                  <select
                    name="morningAfternoonStart"
                    value={morningAfternoonStart}
                    onChange={handleMorningAfternoonStart}
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                  </select>
                </label>
              )}
  
              <label>
                End date
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={handleEndDate}
                />
              </label>
              {isFullDay === false && (
                <label>
                  Until the morning or the afternoon
                  <select
                    name="morningAfternoonEnd"
                    value={morningAfternoonEnd}
                    onChange={handleMorningAfternoonEnd}
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                  </select>
                </label>
              )}
  
              <label>
                Comments
                <input
                  type="textarea"
                  name="comments"
                  value={comments}
                  onChange={handleComments}
                />
              </label>
              <button type="submit">Change request</button>
            </form>
          </>
        )}
  
        {errorMessage && <p>{errorMessage}</p>}
      </div>
        
     
      </div>
    );
}

export default RequestSettingPage;