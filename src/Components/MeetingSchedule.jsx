import React, { useEffect, useState } from "react";
import { useAllEmployeeContext } from "../context/AllEmployeeContext";
import { Start } from "@mui/icons-material";

const MeetingForm = () => {

  const {employees1, } = useAllEmployeeContext();
  const [meetingType, setMeetingType] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [categroy,setCategroy]=useState("");
  const [employees,setEmployees]=useState()


// assginby , endtime

    useEffect(()=>{

      console.log(employees1);
      setEmployees(employees1);
    
    },[employees1])


    const handleScheduleMeet = () => {

        console.log("====================================================================");
        
        // Create an instance of FormData
        const formData = new FormData();
      
        // Check if each value exists before appending it to FormData
        if (meetingType==="Individual"&&employeeId) formData.append("employeeId", employeeId);
        // if (meetingType==="Individual" && employeeName) formData.append("employeeName", employeeName);
        if (meetingType) formData.append("meetingType", meetingType);
        if (categroy) formData.append("categroy", categroy);
        if (date) formData.append("date", date);
        if (time) formData.append("time", time);
        if (categroy==="Virtual"&&meetLink) formData.append("meetLink", meetLink);
        else if(categroy=="Physical") formData.append("meetLink", "Confernce Hall");
        if (meetingType==="Team"&&domain) formData.append("domain", domain);
        if (duration) formData.append("duration", duration);
        if (description) formData.append("description", description);
      
        // Check if formData has been appended with any data
        // if (!formData.has("employeeId") || !formData.has("meetingType") || !formData.has("date") || !formData.has("time")) {
        //   console.log("Required fields are missing");
        //   return;
        // }
      
        // Log the FormData content in the console (for debugging)
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      
        // Example of API call using axios (uncomment for real usage)
        // axios.post('/api/submit-meeting', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   })
        //   .then(response => console.log(response.data))
        //   .catch(error => console.error(error));
      };
      

  const   getID = (e) => {
    console.log(e);
    setEmployeeId(e);

    if (e === "") {
      setEmployeeName("");
      return;
    }

    const employee = employees.find((emp) => emp.employee_ID === e);

    console.log(employee);

    if (employee) return employee.username;
    else if (employee === undefined) return ""
  };

  useEffect(()=>{
    console.log("id changed");
    setEmployeeName(getID(employeeId))
  },[employeeId])

  return (
    <div className="flex flex-col text-sm mt-5 bg-white rounded-md shadow-gray-300 shadow-md border p-5">
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 px-0 p-3">
        {/* Meeting Type */}
        <div className="flex flex-col gap-4 items-center w-full">
          <label htmlFor="meetingType" className="w-full text-xl font-semibold text-[#444444]">
            Meeting Type:
          </label>
          <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
            <select
              id="meetingType"
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className="w-full py-4 text-opacity-50 text-black bg-white rounded text-xl font-medium"
            >
              <option value="">Select Type</option>
              <option value="Team">Team</option>
              <option value="Individual">Individual</option>
            </select>
          </div>
        </div>


        {/* Employee ID */}
        <div className={`flex flex-col gap-4 items-center w-full ${meetingType==="Individual"?"block":"hidden"}`}>
          <label htmlFor="employeeId" className="w-full text-xl font-semibold text-[#444444]">
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full border py-4 text-black border-gray-300 bg-white rounded text-xl font-medium"
          />
        </div>

        {/* Employee Name */}
        <div className={`flex flex-col gap-4 items-center w-full ${meetingType==="Individual"?"block":"hidden"}`}>
          <label htmlFor="employeeName" className="w-full text-xl font-semibold text-gray-400">
            Name:
          </label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className={`w-full border py-4 text-gray-500 border-gray-300 bg-white rounded text-xl font-medium`}
            // disabled
          />
        </div>

        {/* Meeting Type */}
        <div className="flex flex-col gap-4 items-center w-full">
          <label htmlFor="meetingType" className="w-full text-xl font-semibold text-[#444444]">
            Categroy
          </label>
          <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
            <select
              id="meetingType"
              value={categroy}
              onChange={(e) => setCategroy(e.target.value)}
              className="w-full py-4 text-opacity-50 text-black bg-white rounded text-xl font-medium"
            >
                <option value="">select categroy</option>
              <option value="Virtual">Virtual</option>
              <option value="Physical">Physical </option>
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-4 items-center w-full">
          <label htmlFor="date" className="w-full text-xl font-semibold text-[#444444]">
            Date:
          </label>
          <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full py-4 text-black bg-white rounded text-xl font-medium"
            />
          </div>
        </div>

        {/* Meeting Time */}
        <div className="flex flex-col gap-4 items-center w-full">
          <label htmlFor="time" className="w-full text-xl font-semibold text-[#444444]">
            Meeting Starting Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full py-4 text-black border border-gray-300 bg-white rounded text-xl font-medium"
          />
        </div>

        {/* Meeting Duration */}
        <div className="flex flex-col gap-4 items-center w-full">
          <label htmlFor="duration" className="w-full text-xl font-semibold text-[#444444]">
            Meeting Duration:
          </label>
          <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full py-4  bg-white rounded text-xl font-medium"
            >
              <option value="">Select Duration</option>
              <option value="1 hour">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="  minutes">1 hour</option>
              <option value="  minutes">2 hour</option>
              <option value="  minutes">3 hour</option>
            </select>
          </div>
        </div>

        {/* Meeting Link */}
        <div className={`flex flex-col gap-4 items-center w-full ${categroy=="Virtual"?"block":"hidden"} `}>
          <label htmlFor="meetLink" className="w-full text-xl font-semibold text-[#444444]">
            Meeting Link:
          </label>
          <input
            type="url"
            id="meetLink"
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
            className="w-full py-4 border text-black border-gray-300 bg-white rounded text-xl font-medium"
          />
        </div>

        {/* Domain */}
        <div className={`flex flex-col gap-4 items-center w-full ${meetingType==="Individual"?"hidden":"block"} `}>
          <label htmlFor="domain" className="w-full text-xl font-semibold text-[#444444]">
            Domain:
          </label>
          <div className="px-5 w-full border rounded-md border-gray-300 shadow-md">
            <select
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full py-4 text-black bg-white rounded text-xl font-medium"
            >
                <option value="">Select Domain</option>
                <option value="Frontend">Frontend</option>
                <option value="Full-stack Node.JS / React.js Developer">Full-stack Node.JS / React.js Developer</option>
                <option value="Mobile Application Developer">Mobile Application Developer</option>
                <option value="Embedded Engineer">Embedded Engineer</option>
                <option value="AI / ML Engineer">AI / ML Engineer</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
                <option value="Intern Full-stack Node.js / React.js Developer">Intern Full-stack Node.js / React.js Developer</option>
                <option value="Intern Mobile Application Developer Trainee">Intern Mobile Application Developer Trainee</option>
                <option value="Intern Embedded Engineer Trainee">Intern Embedded Engineer Trainee</option>
                <option value="Intern AI / ML Trainee">Intern AI / ML Trainee</option>
                <option value="Intern Cloud Engineer Trainee">Intern Cloud Engineer Trainee</option>
                <option value="Backend">Backend</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4 items-center w-full">
          <label htmlFor="description" className="w-full text-xl font-semibold text-[#444444]">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-4 border text-black border-gray-300 bg-white rounded text-xl font-medium"
            rows="3"
          />
        </div>
      </div>

      {/* Schedule Button */}
      <div className="flex justify-start items-center mt-4">
        <button onClick={()=>{handleScheduleMeet()}} className="group font-semibold text-base w-fit h-10 p-2 rounded-md shadow-md hover:scale-105 duration-200 bg-[--common-color] text-white">
          <p className="w-full h-full flex items-center justify-center">Schedule It</p>
        </button>
      </div>
    </div>
  );
};

export default MeetingForm;