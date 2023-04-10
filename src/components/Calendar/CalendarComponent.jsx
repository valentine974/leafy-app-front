import "./CalendarComponent.css";
import "react-calendar/dist/Calendar.css";
import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useState,useContext } from "react";
import authService from "../../services/auth.service"; 
import { AuthContext } from "../../context/auth.context";
import { eachDayOfInterval} from "date-fns";
import formatDate from "../../utils/dateFormating"

function CalendarComponent(){
  const [date, setDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const [absentDays, setAbsentDays] = useState([]);

  useEffect(() => {
  // put all absent days in an array
  user &&
  authService
  .getUserRequests(user._id)
  .then((response)=>{
    /* console.log("response", response) */
    const requests = response.data;
    let absentDays = [] 
    requests.map((request) => {
      const start = new Date(request.startDate);
      const end = new Date(request.endDate);
      absentDays.push(...eachDayOfInterval({ start, end }))
    },[]);
    absentDays = absentDays.map(day => formatDate(day))
    setAbsentDays(absentDays);
  })

  }, [user]);

  return (
    // react-calendar element loop through the days and add
    // a class to the title if the day is absent
    // then the class will be styled in the css file
    <div>
      <Calendar 
        value={date}
        tileClassName={({ date, view }) => {
      if(absentDays.find(elem => elem=== formatDate(date))){
        // console.log("this day is absent", formatDate(date))
       return  'leafy-calendar-absent'
      }
    }}
      />
    </div>
  );
}

export default CalendarComponent;

