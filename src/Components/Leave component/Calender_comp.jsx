import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles
import { getHolidays } from "public-holidays"; // Import getHolidays from public-holidays
import "../custom css/calendar.css"; // Your custom styles

function CalendarComp() {
  const [value, setValue] = useState(new Date());
  const [leaveDays, setLeaveDays] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchLeaveDays = async () => {
      try {
        const response = await fetch("/api/leave-days");
        if (!response.ok) throw new Error("Failed to fetch leave days");
        const data = await response.json();
        setLeaveDays(data.map((dateString) => new Date(dateString)));
      } catch (error) {
        console.error("Error fetching leave days:", error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const options = { country: "india", lang: "tamil" };
        const holidays = await getHolidays(options);
        setHolidays(holidays.map((holiday) => new Date(holiday.date)));
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchLeaveDays();
    fetchHolidays();
  }, []);

  const getTileClass = ({ date, view }) => {
    if (view === "month") {
      const isLeaveDay = leaveDays.some(
        (leaveDate) => date.toDateString() === leaveDate.toDateString()
      );
      const isHoliday = holidays.some(
        (holiday) => date.toDateString() === holiday.toDateString()
      );

      if (isLeaveDay && isHoliday) {
        return "leave-day holiday";
      }
      if (isLeaveDay) {
        return "leave-day";
      }
      if (isHoliday) {
        return "holiday";
      }
    }
    return "";
  };

  const formatLeaveDays = () => {
    return leaveDays
      .map((leaveDate) =>
        leaveDate.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      )
      .join(", ");
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-md h-full w-full p-0">
      <div className="w-full h-full p-0 bg-white shadow-md rounded-b-lg">
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={getTileClass}
          className="border-none w-full h-full rounded-lg shadow-inner"
        />
      </div>
      {/* <hr className="border-gray-300 border my-2 mx-2 w-full" />
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-2">Leave Dates:</h3>
        <p className="text-sm text-gray-600">{formatLeaveDays()}</p>
      </div> */}
    </div>
  );
}

export default CalendarComp;




