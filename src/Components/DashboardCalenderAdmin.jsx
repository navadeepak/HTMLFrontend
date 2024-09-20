// import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default react-calendar CSS
import { SiGooglemeet } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./custom css/calendar.css";
import axios from "./utilities/axiosInstance";
import { Link } from "react-router-dom";
import { Cancel } from "@mui/icons-material";
import { useEmployeeContext } from "../context/EmployeeContext";

function DashboardCalendarAdmin({ meetdataAdmin }) {
  const [value, setValue] = useState(new Date());

  const {employee}=useEmployeeContext();

  useEffect(()=>{
    console.log(employee.username);
    
  },[employee])

  
  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [domain, setDomain] = useState("-");
  const [date, setDate] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [duration, setDuration] = useState("");
  const [meetingType, setMeetingType] = useState(1);
  const [meetId, setMeetId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [expand, setExpand] = useState(false);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      setCurrentTime(formatter.format(now));
    };

    updateTime();
    // Update the time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // console.log("current time",currentTime)

  const handleIndividual = async () => {
    // console.log("Starting handleSubmit...");

    // Validate input fields
    if (!description || !time || !date || !meetLink || !duration) {
      toast.error("Fill out all fields to schedule the meeting");
      // console.log("Validation failed: Some fields are missing.");
      return;
    }

    const newEntry = {
      description,
      time,
      domain,
      date,
      meetLink,
      duration,
      employeeId,
      meetingType,
    };


    // console.log("Input validated, preparing to send request...");

    // Meeting data patched here
    // console.log(newEntry);
    // console.log(data);
    

    try {  
      const response = await axios.put(
        `/employees/create-meeting/${employeeId}`,
        {
          meetings: [
            {
              description: newEntry.description,
              time: newEntry.time,
              domain: newEntry.domain,
              date: newEntry.date,
              meeting_link: newEntry.meetLink,
              meeting_type: newEntry.meetingType,
              duration: newEntry.duration,
              end_time: newEntry.employeeId,
              start_time: newEntry.time,
            },
          ],
        }
      );

      console.log("Request successful,'Individual' meeting edited:", response.data);
      toast.success("Meeting edited successfully!");
      setDescription("");
      setTime("");
      setDomain("");
      setDate("");
      setMeetLink("");
      setDuration("");
      setMeetingType("");
      setMeetId("");
      setEmployeeId("");
      setEditIndex("");

      // Optional: Reload the page to reflect changes
      // setTimeout(() => {
      //   window. location.reload();
      // }, 2000);
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  const handleTeam = async () => {
    // console.log("Starting handleSubmit...");
    
    
    
    
    
    if (!description || !time || !date || !meetLink || !duration || !domain) {
      toast.error("Fill out all fields to schedule the meeting");
      return;
    }

    const data={
      team: domain,
      description ,
      domain,
      date,
      meeting_link: meetLink,
      meeting_type: meetingType,
      start_time: time,
      duration,
      assigned_by :employee?.username,
    }



    // Meeting data patched here
    // console.log(newEntry);

    try {  
      const response = await axios.post(
        `http://localhost:3001/employees/team_meeting`,data   
      );

      console.log("Request successful,'TEAM' meeting edited:", response.data);
      toast.success("Meeting edited successfully!");

      // Clear input fields
      setDescription("");
      setTime("");
      setDomain("");
      setDate("");
      setMeetLink("");
      setDuration("");
      setMeetingType("");
      setMeetId("");
      setEmployeeId("");
      setEditIndex("");
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  const handleSubmit = () => {
    console.log(meetingType);
    console.log(typeof(meetingType));
    if(meetingType==="1"){
      console.log("team");
      handleTeam()
    }else if(meetingType==="0"){
      console.log("indiviual");
      handleIndividual()
    }
      
      
      
  };
 

  const handleCancel = async (id, meet_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the meet"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3001/employees/meeting/delete/20240053/${meet_id}`
      );
        toast.success("Meeting deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting meeting:", error);
      toast.error("Failed to detete the meeting");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employees");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setEmployees(data);
        // console.log(data)
      } catch (error) {
        console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  const getID = (e) => {
    console.log(e);
    setEmployeeId(e);

    if (e === "") {
      setEmployeeName("");
      return;
    }

    const employee = employees.find((emp) => emp.employee_ID === e);

    console.log(employee);

    if (employee) setEmployeeName(employee.username);
    else if (employee === undefined) setEmployeeName("");
  };

  const handleEdit = (index, id) => {
    const entry = meetdataAdmin.slice(-10)[index];
    setDescription(entry.description);
    setTime(entry.time);
    setDomain(entry.domain);
    setDate(entry.date);
    setMeetLink(entry.meeting_link);
    setDuration(entry.duration);
    setMeetingType(meetingType);
    setMeetId(id);
    setEmployeeId(entry.end_time);
    setEditIndex(index);
  };
  // console.log("index",editIndex)
  // console.log("uniq id ",meetId)

  const confirmEdit = async (editIndex, { meetdataAdmin }) => {
    if (!description || !time || !date || !meetLink || !duration) {
      toast.error("Fill out all fields to edit the meeting");
      return;
    } else {
      const editEntry = meetdataAdmin.slice(-10)[editIndex];

      // console.log("unique id",editEntry._id)
      try {
        const response = await axios.patch(
          `http://localhost:3001/employees/create-meeting/20240053`,
          {
            meetings: [
              {
                description: description,
                time: time,
                domain: domain,
                date: date,
                meeting_link: meetLink,
                meeting_type: meetingType,
                duration: duration,
                end_time: employeeId,
                start_time: editEntry.start_time,
                meeting_ID: meetId,
              },
            ],
          }
        );
        // console.log("Meeting info ttt updated:", response.data);
        toast.success("Meeting edited Successfully!");
        setDescription("");
        setTime("");
        setDomain("");
        setDate("");
        setMeetLink("");
        setDuration("");
        setMeetingType("");
        setMeetId("");
        setEmployeeId("");
        setEditIndex("");
        window.location.reload();
      } catch (error) {
        console.error("Error updating meeting:", error);
      }
    }
  };


  const durationOptions = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour 30 minutes",
    "2 hours",
    "2 hours 30 minutes",
    "3 hours",
  ];

  // setData(dataArray);

  const today = new Date().toISOString().split("T")[0];
  const [employeesCount, setEmployeesCount] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);

  const sortedAttendance = (data) => {
    // Sort data based on employee_ID
    // console.log(data);

    const sortedData = data.sort((a, b) => {
      return a.employee_ID.localeCompare(b.employee_ID);
    });

    // Create a new array with name, employee_ID, and check_in for each attendance record
    const item = sortedData.flatMap((emp) =>
      emp.attendance.map((day) => ({
        name: emp.name,
        employee_ID: emp.employee_ID,
        date: day.date,
        check_in: day.check_in,
        check_out: day.check_out,
        status: day.status,
        notes: day.notes,
      }))
    );
    const sortedItem = item.sort((a, b) => {
      // Convert check_in to Date objects for proper comparison
      return new Date(a.date) - new Date(b.date);
    });
    return sortedItem.reverse();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employees");
        const response1 = await axios.get(
          "http://localhost:3001/employees/attendance/getall"
        );
        // console.log(response1.data)
        setEmployeesCount(response.data.length);
        setAttendanceData(sortedAttendance(response1.data));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees/team_meeting/all");
   
        console.log(response.data);
        
        // setAttendanceData(response.data)
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const tileContent = (dat, view) => {
    let attendancecount = 0;
    const current = new Date();
    const date = new Date(dat.date);
    // console.log(attendanceData);

    attendanceData.map((day) => {
      // console.log(day.check_in)
      const data = new Date(day.check_in);

      if (
        date.getDate() === data.getDate() &&
        date.getMonth() === data.getMonth() &&
        date.getFullYear() === data.getFullYear()
      )
        attendancecount = attendancecount + 1;
      else console.log(day);
    });

    let persent = (parseInt(attendancecount) / parseInt(employeesCount)) * 100;

    // console.log(date.getDate(), "/", persent);

    if (current >= date) {
      return (
        <Link to={"/auth/employeeAttendance"}>
          <div
            className={`attendance text-lg ${
              persent === 100
                ? "text-lime-500"
                : persent >= 75
                ? "text-yellow-500"
                : "text-[--red]"
            } w-full flex items-center justify-center `}
          >
            <p className="bg-gray-200 w-fit m-2 rounded-md px-1 shadow-md hover:bg-gray-400 duration-200 hover:text-black group">
              <span>{attendancecount}</span>{" "}
              <span className="text-black">/</span>{" "}
              <span className="text-[--green] group-hover:text-black duration-200">
                {employeesCount}
              </span>
            </p>
          </div>
        </Link>
      );
    } else return;
  };

  return (
    <div className="w-full h-fit pt-0 overflow-y-scroll p-5">
      {/* <Calendar
        showNeighboringMonth={false}
        tileContent={tileContent}
        className=" bg-transparent border-none w-full h-full mb-0 shadow-md rounded-md border-[1px]"
      /> */}
      <div className="h-full w-full bg-[#fbfbfb] font-bold">
        <div className="overflow-y-auto h-full">
          <div className="flex flex-col text-sm mt-5 bg-white rounded-md shadow-gray-300 shadow-md border p-5">
            {meetingType == 0 ? (
              <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-2 gap-10 px-0 p-3">
                {/* <div className="flex flex-row  items-center gap-2 "> */}
                <div className="flex h-full w-full flex-col gap-4 items-center">
                  <label
                    htmlFor="meetingType"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Meeting Type:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <select
                      id="meetingType"
                      value={meetingType}
                      onChange={(e) => setMeetingType(e.target.value)}
                      className="w-full p-5 py-4 pl-0 opacity-50 bg-white outline-none rounded text-xl font-medium"
                      required
                    >
                      <option value={1}>Team</option>
                      <option value={0}>Individual</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center mt-0 w-full">
                  <label
                    htmlFor="employeeId"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Employee ID:
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    value={employeeId}
                    // onChange={(e) => setEmployeeId(e.target.value)}
                    onChange={(e) => getID(e.target.value)}
                    className="w-full border py-4 text-opacity-50 text-black border-gray-300 shadow-md bg-white p-1 rounded text-xl font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 items-center mt-0 w-full">
                  <label
                    htmlFor="employeeId"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Name :
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    value={employeeName}
                    className="w-full border py-4 text-opacity-50 text-black border-gray-300 bg-white shadow-md p-1 rounded text-xl font-medium"
                    required
                    disabled
                  />
                </div>
                {/* </div> */}
                {/* <div className="flex flex-row w-full gap-2"> */}

                <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="date"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Date:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white p-1 text-xl font-medium"
                      required
                      min={today}
                    />
                  </div>
                </div>
                <div className="flex flex-col text-xl gap-4 items-center w-full">
                  <label
                    htmlFor="time"
                    className="w-full  text-xl font-semibold text-[#444444]"
                  >
                    Meeting Time:
                  </label>
                  <TimePicker
                    onChange={setTime}
                    value={time}
                    disableClock={true}
                    //  format="HH:mm:"
                    className="w-full py-0 border text-opacity-50 text-black border-gray-300 bg-white p-0 rounded text-2xl shadow-md font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 items-center mt-0 w-full">
                  <label
                    htmlFor="duration"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Meeting Duration:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white p-1 rounded text-xl font-medium"
                      required
                    >
                      <option value="">Select Duration</option>
                      {durationOptions.map((durationOption, index) => (
                        <option key={index} value={durationOption}>
                          {durationOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* </div> */}
                {/* <div className="w-full flex flex-row gap-2"> */}

                <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="meetLink"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Meeting Link:
                  </label>
                  <input
                    type="url"
                    id="meetLink"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    className="w-full border py-4 text-opacity-50 text-black border-gray-300 bg-white p-1 rounded text-xl shadow-md font-medium"
                    required
                  />
                </div>
                {/* <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="domain"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Domain:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <select
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white p-1 text-xl font-medium"
                      required
                    >
                      <option value="">Select Domain</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Full-stack Node.JS / React.js Developer">
                        Full-stack Node.JS / React.js Developer
                      </option>
                      <option value="Mobile Application Developer">
                        Mobile Application Developer
                      </option>
                      <option value="Embedded Engineer">
                        Embedded Engineer
                      </option>
                      <option value="AI / ML Engineer">AI / ML Engineer</option>
                      <option value="Cloud Engineer">Cloud Engineer</option>
                      <option value="Intern Full-stack Node.js / React.js Developer">
                        Intern Full-stack Node.js / React.js Developer
                      </option>
                      <option value="Intern Mobile Application Developer Trainee">
                        Intern Mobile Application Developer Trainee
                      </option>
                      <option value="Intern Embedded Engineer Trainee">
                        Intern Embedded Engineer Trainee
                      </option>
                      <option value="Intern AI / ML Trainee">
                        Intern AI / ML Trainee
                      </option>
                      <option value="Intern Cloud Engineer Trainee">
                        Intern Cloud Engineer Trainee
                      </option>
                      <option value="Backend">Backend</option>
                      <option value="All">All</option>
                      <option value="Marketing Manager">Marketing Manager</option>
                    </select>
                  </div>
                </div> */}
                <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="description"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border py-4 text-opacity-50 text-black border-gray-300  bg-white shadow-md p-1 rounded text-xl font-medium"
                    rows="1"
                    required
                  />
                </div>
              </div>
            ) : (
              // </div>
              <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-2 gap-10 px-0 p-3">
                {/* <div className="w-full flex flex-row gap-2"> */}

                <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="meetingType"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Meeting Type:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <select
                      id="meetingType"
                      value={meetingType}
                      onChange={(e) => setMeetingType(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white  p-1 text-xl font-medium"
                      required
                    >
                      <option value={1}>Team</option>
                      <option value={0}>Individual</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="date"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Date:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white p-1 px-3 text-xl font-medium"
                      required
                      min={today}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center w-full">
                  <label
                    htmlFor="time"
                    className="w-full  text-xl font-semibold text-[#444444]"
                  >
                    Meeting Time:
                  </label>
                  {/* <div className="px-5 w-full border rounded-md border-gray-300 shadow-md"> */}
                  <TimePicker
                    onChange={setTime}
                    value={time}
                    disableClock={true}
                    //  format="HH:mm:"
                    className="w-full shadow-md py-0 text-opacity-50 text-black bg-white text-md font-medium"
                    required
                  />
                </div>
                {/* </div> */}
                <div className="flex flex-col gap-4 mt-2 items-center w-full">
                  <label
                    htmlFor="duration"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Meeting Duration:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white p-1 text-xl font-medium"
                      required
                    >
                      <option value="">Select Duration</option>
                      {durationOptions.map((durationOption, index) => (
                        <option key={index} value={durationOption}>
                          {durationOption}
                        </option>
                      ))}
                    </select>
                    {/* </div> */}
                  </div>
                </div>
                {/* <div className="flex w-full flex-row gap-2"> */}

                <div className="flex flex-col gap-4 items-center mt-2 w-full">
                  <label
                    htmlFor="meetLink"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Meeting Link:
                  </label>
                  <input
                    type="url"
                    id="meetLink"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    className="w-full py-4 border text-opacity-50 text-black p-1 border-gray-300  bg-white rounded shadow-md text-xl font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 items-center mt-2 w-full">
                  <label
                    htmlFor="domain"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Domain:
                  </label>
                  <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
                    <select
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full py-4 text-opacity-50 text-black bg-white p-1 text-xl font-medium"
                      required
                    >
                      <option value="">Select Domain</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Full-stack Node.JS / React.js Developer">
                        Full-stack Node.JS / React.js Developer
                      </option>
                      <option value="Mobile Application Developer">
                        Mobile Application Developer
                      </option>
                      <option value="Embedded Engineer">
                        Embedded Engineer
                      </option>
                      <option value="AI / ML Engineer">AI / ML Engineer</option>
                      <option value="Cloud Engineer">Cloud Engineer</option>
                      <option value="Intern Full-stack Node.js / React.js Developer">
                        Intern Full-stack Node.js / React.js Developer
                      </option>
                      <option value="Intern Mobile Application Developer Trainee">
                        Intern Mobile Application Developer Trainee
                      </option>
                      <option value="Intern Embedded Engineer Trainee">
                        Intern Embedded Engineer Trainee
                      </option>
                      <option value="Intern AI / ML Trainee">
                        Intern AI / ML Trainee
                      </option>
                      <option value="Intern Cloud Engineer Trainee">
                        Intern Cloud Engineer Trainee
                      </option>
                      <option value="Backend">Backend</option>
                      <option value="All">All</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center mt-2 w-full">
                  <label
                    htmlFor="description"
                    className="w-full text-xl font-semibold text-[#444444]"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full py-4 border text-opacity-50 text-black border-gray-300  bg-white p-1 rounded text-xl shadow-md font-medium"
                    rows="1"
                    required
                  />
                </div>
              </div>
              // </div>
            )}
            <div className="flex justify-start items-center">
              {editIndex === null ? (
                <button
                  onClick={handleSubmit}
                  className="group font-semibold text-base w-fit h-10 my-6 p-2 px-5 rounded-md shadow-md hover:scale-105 duration-200 bg-[--common-color] text-white"
                >
                  <p className="w-full h-full flex items-center text-nowrap justify-center">
                    Schedule It
                  </p>
                </button>
              ) : (
                <button
                  onClick={() => confirmEdit(editIndex, { meetdataAdmin })}
                  className="bg-white group font-medium text-xl w-1/4 h-10 p-2 rounded-md shadow-md border-2 border-[--common-color] text-[--common-color] hover:text-white duration-200 transition relative after:content-['save changes'] after:text-black after:absolute after:w-0 after:top-0 after:left-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-[--common-color] after:z-10 z-50 hover:after:w-full"
                >
                  <p className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                    Save Changes
                  </p>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 w-full border rounded-xl">
            <h3 className="text-xl font-semibold w-full flex items-center gap-2 p-3 text-[--common-color]">
              Scheduled Meet
            </h3>
            <div className="w-full h-80 mb-2 overflow-auto">
              <table className="w-full divide-y divide-gray-200 ">
                <thead className="bg-[#efefef] sticky top-0 text-[#444444] font-bold py-3 ">
                  <tr className="border-gray-300 border-t border-b ">
                    <th className="px-2 py-4 text-lg text-center">S.No</th>
                    <th className="px-2 py-4 text-lg text-center">ID</th>
                    <th className="px-2 py-4 text-lg text-center">
                      Description
                    </th>
                    <th className="px-2 py-4 text-lg text-nowrap text-center">
                      Meeting Time
                    </th>
                    <th className="px-2 py-4 text-lg text-center">Date</th>
                    <th className="px-2 py-4 text-lg text-center">Domain</th>
                    <th className="px-2 py-4 text-lg text-nowrap text-center">
                      Meeting Link
                    </th>
                    <th className="px-2 py-4 text-center text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {meetdataAdmin.slice(-10).map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1 whitespace-nowrap text-center text-lg font-normal text-[#444444]">
                        {index + 1}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-center  text-lg font-medium text-[#444444]">
                        {entry.meeting_type == 0 ? entry.end_time : "Team Meet"}
                      </td>
                      <td
                        onClick={() => {
                          setExpand(true);
                        }}
                        className={`px-2 py-1 cursor-pointer whitespace-nowrap text-nowrap text-center w-[100px] text-lg font-medium text-[#444444]`}
                      >
                        {entry.description && entry.description.length > 10
                          ? `${entry.description.slice(0, 10)}...Read more`
                          : entry.description}
                      </td>
                      <div
                        className={`${
                          expand ? "flex" : "hidden"
                        } flex justify-center items-center absolute top-0 left-0 bg-[#00000050] w-screen h-screen`}
                      >
                        <div className=" w-[500px] h-96 bg-white p-5 rounded-xl">
                          <p
                            className="cursor-pointer bg-white w-full flex items-center justify-end"
                            onClick={() => {
                              setExpand(false);
                            }}
                          >
                            <Cancel />
                          </p>
                          <div>{entry.description}</div>
                        </div>
                      </div>
                      <td className="px-2 py-1 whitespace-nowrap text-center font-medium text-lg text-gray-500">
                        {entry.time}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-center font-medium text-lg text-gray-500">
                        {entry.date}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap w-16 text-wrap font-medium text-center text-lg text-gray-500">
                        {entry.domain}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-center font-medium text-lg text-gray-500">
                        <a
                          href={entry.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[--common-color] underline cursor-pointer"
                        >
                          Meet Link
                        </a>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap flex flex-row gap-5 items-center justify-center text-lg text-center">
                        <button
                          onClick={() =>
                            handleCancel(entry.end_time, entry.meeting_ID)
                          }
                          className="border-[#DD2025] text-[#DD2025] border hover:bg-[#DD2025] hover:text-white py-1 w-20 transition rounded-md font-medium shadow-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEdit(index, entry.meeting_ID)}
                          className="border-[--common-color] text-[--common-color] border py-1 w-20 hover:bg-[--common-color] hover:text-white ml-1 mt-1  rounded-md font-medium transition shadow-md"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ToastContainer className="text-black font-medium text-sm" />
        </div>
      </div>
    </div>
  );
}

export default DashboardCalendarAdmin;
