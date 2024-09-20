import Calender from "./DashboardCalender";
import "react-calendar/dist/Calendar.css"; // Import the default react-calendar CSS
import CalendarAdmin from "./DashboardCalenderAdmin";
import { useState, useEffect } from "react";
import axios from "./utilities/axiosInstance";
import axios2 from "axios";
import "./custom css/slideDataForMissionVision.css";

const Meeting = () => {
  //--------user role Admin or Employee role----------------

  const [role, setRole] = useState("");
  const [employee_ID, setEmployee_ID] = useState("");
  const [individualDataUser, setIndividualDataUser] = useState("");

  //--------user role Admin or Employee role----------------

  const [employees, setEmployees] = useState([]);

  const [employeeData, setEmployeeData] = useState([0]); // Initialize with zeros

  const [employeeName, setEmployeeName] = useState("");

  // const[meetingData,setMeetingData] = useState([]);
  // const[meetingData2,setMeetingData2] = useState([]);
  const [allmeetData, setAllMeetdata] = useState([]);
  const [workRole, setWorkRole] = useState("");
  //   console.log("workRole",workRole);

  const workRoles = [
    "Frontend",
    "Full-stack Node.JS / React.js Developer",
    "Mobile Application Developer",
    "Embedded Engineer",
    "AI / ML Engineer",
    "Cloud Engineer",
    "Intern Full-stack Node.js / React.js Developer",
    "Intern Mobile Application Developer Trainee",
    "Intern Embedded Engineer trainee",
    "Intern AI / ML Trainee",
    "Intern Cloud Engineer Trainee",
    "Backend",
    "Not Mentioned",
  ];

  // ........................................................................................................
  const [value, setValue] = useState(new Date());

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [domain, setDomain] = useState("");
  const [date, setDate] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [duration, setDuration] = useState("");
  const [meetingType, setMeetingType] = useState(1);
  const [meetId, setMeetId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  // const [employeeName,setEmployeeName]=useState("")
  const [dataArray, setDataArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  // const [employees, setEmployees] = useState([]);

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

  const handleSubmit = async () => {
    if (!description || !time || !date || !meetLink || !duration) {
      toast.error("Fill out all fields to schedule the meeting");
      return;
    } else {
      const newEntry = {
        description,
        time,
        domain,
        date,
        meetLink,
        duration,
        // employeeName,
        employeeId,
        meetingType,
      };

      //--------Meeting data patched here-------------------------------
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
                start_time: currentTime,
                //"employee_name":newEntry.employeeName,
              },
            ],
          }
        );
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
        // console.log("meeting edited successfully", response.data);
        window.location.reload();
      } catch (error) {
        console.error("Error updating meeting:", error);
      }
      //--------Meeting data patched here-------------------------------
    }
  };

  const handleCancel = async (id, meet_id) => {
    // console.log("deleted id",meet_id)

    //
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the meet"
    );
    //

    if (!isConfirmed) {
      // If user cancels, exit the function
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3001/employees/meeting/delete/20240053/${meet_id}`
      );
      // console.log("Meeting deleted successfully", response.data);
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
    //console.log(e);
    setEmployeeId(e);

    if (e === "") {
      setEmployeeName("");
      return;
    }

    const employee = employees.find((emp) => emp.employee_ID === e);

    //console.log(employee)

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
  // useEffect(() => {
  //   console.log("Meeting data:", dataArray);
  // }, [dataArray]);

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
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate >= today ? selectedDate : today);
  };

  // ........................................................................................................

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employees");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setEmployees(data);
        // console.log("data of employee", data);

        // Calculate the count for each role
        const counts = workRoles.reduce((acc, role) => {
          acc[role] = data.filter(
            (employee) =>
              employee.work_role === role &&
              employee.role?.toLowerCase() === "employee"
          ).length;
          return acc;
        }, {});

        // Update state with the counts in the order of workRoles
        const newEmployeeData = workRoles.map((role) => counts[role] || 1);

        setEmployeeData(newEmployeeData);
      } catch (error) {
        console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  //----to fetch individual user data---------
  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response2 = await axios2.get(
          ` http://localhost:3001/employees/check-role/${email}`
        );
        setIndividualDataUser(response2.data);
        setWorkRole(response2.data.work_role);
        setEmployeeName(response2.data.username.toUpperCase());
        setRole(response2.data.role.toLowerCase());
        setEmployee_ID(response2.data.employee_ID);
        // console.log("employee_ID", employee_ID);
        //console.log(response2.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  //------Individual user data fetched and task calulated accoringly-----------

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response2 = await axios.get(
          "http://localhost:3001/employees/meetings/all"
        );
        setAllMeetdata(response2.data);
      } catch (error) {
        console.error("Error fetching meeting data:", error.message);
      }
    };

    fetchMeetingData(); // Call the function here
  }, []);

  const emp_ID = employee_ID;
  const meetingData = allmeetData?.flatMap((meeting) => meeting.meetings);
  const filteredMeetings = meetingData?.filter((meeting) => {
    // Ensure proper type matching
    const endTime = meeting.end_time;
    const isMatch =
      (typeof endTime === "string" && endTime === emp_ID) ||
      (typeof endTime === "number" && endTime.toString() === emp_ID);

    return isMatch;
  });

  const filteredMeetings2 = meetingData?.filter(
    (meeting) => meeting.meeting_type === "1"
  );

  const mergedMeetingsData = [
    ...filteredMeetings2?.reverse(),
    ...filteredMeetings?.reverse(),
  ]; //chnages done

  const filterByDomain = (meetings, targetDomain) => {
    return meetings?.filter((meeting) => meeting.domain === targetDomain);
  };

  const mergedMeetings = filterByDomain(mergedMeetingsData, workRole);

  const propsMergedMeetAdmin = [...meetingData.slice(-10)];

  //console.log(typeof emp_ID,"nill");
  //console.log(typeof employee_ID);
  //console.log(role,"role");

  // end

  return (
    <div className="">
      <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">
            {role === "admin" ? "Create Meeting" : "Meeting"}
          </p>
        </span>
      </p>
      <div className={role === "admin" ? "" : "hidden"}>
        {/* {console.log(role,"role") */}
        {/* } */}
        <div className="flex h-screen max-lg:h-[2000px] w-full max-lg:flex-col mt-5">
          <div className="mt-0 w-full max-lg:w-full max-lg:mr-0 mb-0 overflow-y-scroll">
            <CalendarAdmin
              meetdataAdmin={meetingData}
              setAllMeetdata={setAllMeetdata}
              admin_ID={employee_ID}
            />
          </div>
        </div>
      </div>

      {/* ----------ADMIN VIEW END HERE----------- */}

      {/* ----------EMPLOYEE VIEW STARTS HERE------------ */}

      <div
        className={
          role.toLowerCase() === "employee"
            ? "w-full m-auto overflow-y-scroll"
            : "hidden"
        }
      >
        <div className="flex w-full h-full max-lg:flex-col  max-xl:mx-0 ">
          <div className="flex max-sm:flex-col h-full max-sm:m-0 w-full ">
            <div className="mt-0 w-full max-lg:w-full mr-0 max-lg:mr-0 rounded-md overflow-y-scroll">
              <Calender meetinfo={mergedMeetings} emp_ID={employee_ID} emp={individualDataUser} />
            </div>
          </div>
        </div>
      </div>

      {/* -------------EMPLOYEE VIEW END HERE-------------- */}
    </div>
  );
};

export default Meeting;
