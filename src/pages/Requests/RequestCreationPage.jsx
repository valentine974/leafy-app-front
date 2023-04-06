import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import formatDate from "../../utils/dateFormating";
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
function RequestCreationPage() {
  /* request setting page with all it's properties: status, isFullDay, startDate, morningAfternoonStart, endDate, morningAfternoonEnd, comments */
  const msPerDay = 86400000;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const today = new Date().toISOString().substr(0, 10);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isFullDay, setIsFullDay] = useState(true);
  const [startDate, setStartDate] = useState(today);
  const [morningAfternoonStart, setMorningAfternoonStart] = useState("morning");
  const [endDate, setEndDate] = useState(today);
  const [morningAfternoonEnd, setMorningAfternoonEnd] = useState("afternoon");
  const [comments, setComments] = useState("");
  const [approvalLimitDate, setApprovalLimitDate] = useState(today);
   
  useEffect(() => {console.log("approval date changed to:",approvalLimitDate)}, [approvalLimitDate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("startDate:", startDate);
    // add 7 days to today's date

    let limitDate = addDays(new Date(), 7);
    
    if(new Date(startDate) < new Date(limitDate)) { 
      console.log("leafy within 7 days");
      limitDate = subDays(new Date(startDate), 1)
      console.log("limitDate:", limitDate);
    }
    console.log("limitDate:", limitDate);

    setApprovalLimitDate(limitDate);


    authService
      .createRequest({
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
        console.log(request.data)
        navigate("/request/review")})
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  };
  

  return (
    <div>
      <h1>Request Creation</h1>
      {user && (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Full day
              <input
                type="checkbox"
                checked={isFullDay}
                onChange={handleIsFullDay}
              />
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
            <button type="submit">Create</button>
          </form>
        </>
      )}

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default RequestCreationPage;
