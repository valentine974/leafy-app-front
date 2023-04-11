import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import { setDay } from "date-fns";
import CalendarComponent from "../../components/Calendar/CalendarComponent";

function RequestCreationPage(props) {
  /* request setting page with all it's properties: status, isFullDay, startDate, morningAfternoonStart, endDate, morningAfternoonEnd, comments */

  const {togglePage}=props
  const [date, setDate] = useState(new Date());
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
  const [daysLeft, setDaysLeft] = useState(0);
  const [companyVacationDays, setCompanyVacationDays] = useState(0);

  const handleDateChange = (date) => {
    setDate(date);
    setStartDate(addDays(date[0], 1).toISOString().substr(0, 10));
    setEndDate(date[1].toISOString().substr(0, 10));
  };

  useEffect(() => {
    // get the comapny's vacationdays
    console.log("user", user);
    user &&
      authService
        .getCompany(user.companyId)
        .then((company) => {
          console.log(
            "company vacation days: ",
            company.data.numberOfVacationDays
          );
          setCompanyVacationDays(company.data.numberOfVacationDays);
        })
        .catch((err) => console.log("err in loading requests", err));
  }, [user]);

  useEffect(() => {
    if (user) {
      let workedDays = differenceInCalendarDays(
        new Date(),
        new Date(user.contractStartDate)
      );
      let availableDays =
        Math.floor((companyVacationDays / 365) * workedDays * 100) / 100;
      setDaysLeft(availableDays);
      authService
        .getUserRequests(user._id)
        .then((requests) => {
          // get the number of eligible vacation days
          let spentDays = requests.data.reduce(
            (acc, request) => acc + request.duration,
            0
          );
          // console.log("spent days", spentDays);
          setDaysLeft(Math.floor((availableDays - spentDays) * 100) / 100);
        })
        .catch((err) => console.log("err in loading requests", err));
    }
  }, [companyVacationDays]);

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

    //if start date is after end date, send error
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Start date cannot be after end date");
      return;
    }
    let duration =
      differenceInBusinessDays(new Date(endDate), new Date(startDate)) + 1;

    if (duration > daysLeft) {
      setErrorMessage("You don't have enough days left");
      return;
    }
    // add days left to verify if it's possible to create a request
    if (new Date(startDate) < new Date(limitDate))
      limitDate = subDays(new Date(startDate), 1);

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
        approvalLimitDate: limitDate,
      })
      .then((request) => {
        console.log(request.data);
        navigate("/request/review");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  };

  return (

    <div className={`pageContainer ${togglePage}`}>

    <div className={`pageTitle ${togglePage}`}>
      <h1>Request Creation</h1></div>
      <p> You have {daysLeft} vacation days left </p>
    <div className="pageContent">
    
  
    <CalendarComponent className="calendar" date={date} onDateChange={handleDateChange} />

      {user && (
        <div className="formBody">
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
        </div>
      )}

      {errorMessage && <p>{errorMessage}</p>}
    </div>


    </div>
  );
}

export default RequestCreationPage;
