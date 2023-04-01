import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function RequestCreationPage() {
  /* request setting page with all it's properties: status, isFullDay, startDate, morningAfternoonStart, endDate, morningAfternoonEnd, comments */

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("startDate:",startDate);
    // if (startDate - Date.now() > 7) {
    //     approvalLimitDate.setDate(addDays(Date.now(), + 7));
    // } else {
    //     approvalLimitDate.setDate(addDays(startDate, -1));
    // }
    setApprovalLimitDate(new Date(startDate));
    console.log("approvalLimitDate:",  approvalLimitDate);

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
      .then((response) => {
        console.log("New request :", response);
        navigate("/");
      })
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
            <button type="submit">Create</button>
          </form>
        </>
      )}

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default RequestCreationPage;
