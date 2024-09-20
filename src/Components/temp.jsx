import React, { useCallback, useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import { TiFlowMerge } from "react-icons/ti";
import checkin from "../assets/checkin.svg";
import checkout from "../assets/checkout.svg";
import vector from "../assets/Vector.svg";
import score from "../assets/score.svg";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { GrAchievement, GrTechnology } from "react-icons/gr";
import EmployeeDataTable from "./EmployeeDataTable";
import { useParams } from "react-router-dom";
import axios from "./utilities/axiosInstance";
import avatar from "../assets/avatar.webp";
import { format } from "date-fns";
import checkIn from "../assets/checkIn.svg";
import checkOut from "../assets/checkOut.svg";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { AttendanceContext } from "../context/AttendanceContext";
import { useEmployeeContext } from "../context/EmployeeContext";

const Attendance = () => {
  const { attendanceData, fetchData, setId } = useContext(AttendanceContext);
  const { employee, tryfun } = useEmployeeContext();

  const [employeeWorkingHours, setEmployeeWorkingHours] = useState();
  const [workingHours, setWorkingHours] = useState();
  const [totalscores, setTotalscores] = useState();
  const [buttonshow, setButtonshow] = useState(false);

  const current = new Date();

  const [attendance, setAttendance] = useState();
  const [todayCheckIn, setTodayCheckIn] = useState();
  const [todayCheckOut, settodayCheckOut] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // if(attendanceData){
    // setAttendance(attendanceData.response[0].attendance.reverse());
    // }
    setEmployeeWorkingHours(attendanceData.employeeWorkHours);
    setWorkingHours(attendanceData.workingHours);

    if (attendanceData.scores) {
      const numericScores = Object.values(attendanceData.scores).map((value) =>
        parseFloat(value)
      );
      // console.log(numericScores);
      const totalScore = numericScores.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      // console.log(totalScore);
      setTotalscores(totalScore);
    }

    console.log(attendanceData.response);
  }, [attendanceData]);

  const handlecheckInButton = async () => {
    var date = new Date();
    // console.log(date.toISOString());

    let data = {
      employee_ID: employee.employee_ID,
      name: employee.username,
      attendance: [{ checkIn: date.toISOString() }],
    };
    // console.log(data);

    try {
      const response = await axios.post("/attendance/check-in", data); // Use axiosInstance if applicable
      // console.log('Check-in successful:', response.data);
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const handlecheckOutButton = async () => {
    var date = new Date();
    // console.log(date.toISOString());
    let data = {
      employee_ID: employee.employee_ID,
      notes: "Sakthi checkOut",
      checkOut: date.toISOString(),
    };
    // console.log(data);
    try {
      const response = await axios.post("/attendance/check-out", data); // Use axiosInstance if applicable
      // console.log("Check-in successful:", response.data);
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [dayNotesVisible, setDayNotesVisible] = useState(false);
  const [formattedCheckinTime, setformattedCheckInTime] = useState("--:--");
  const [formattedCheckoutTime, setformattedCheckoutTime] = useState("--:--");
  const [show, setShow] = useState(false);
  // const [attendanceScore,setAttendanceScore]=useState(0)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    console.log(typeof employeeWorkingHours);
    if (workingHours)
      console.log(Object.keys(workingHours).filter((month) => month == "May"));
  }, [employeeWorkingHours, workingHours]);

  const Months = [
    {
      monthname: "January",
      workingTime: employeeWorkingHours
        ? ` ${employeeWorkingHours.January}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.January}`
        : "woekingHours is undefined",
    },
    {
      monthname: "February",
      workingTime: employeeWorkingHours
        ? ` ${employeeWorkingHours.February}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.February}`
        : "woekingHours is undefined",
    },
    {
      monthname: "March",
      workingTime: employeeWorkingHours
        ? ` ${employeeWorkingHours.March}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.March}`
        : "woekingHours is undefined",
    },
    {
      monthname: "April",
      workingTime: employeeWorkingHours
        ? ` ${employeeWorkingHours.April}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.April}`
        : "woekingHours is undefined",
    },
    {
      monthname: "May",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.May}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.May}`
        : "woekingHours is undefined",
    },
    {
      monthname: "June",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.June}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.June}`
        : "woekingHours is undefined",
    },
    {
      monthname: "July",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.July}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.July}`
        : "woekingHours is undefined",
    },
    {
      monthname: "August",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.August}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.August}`
        : "woekingHours is undefined",
    },
    {
      monthname: "September",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.September}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.September}`
        : "woekingHours is undefined",
    },
    {
      monthname: "October",

      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours?.October}`
        : "employeeWorkHours is undefined.",

      monthworkingHours: workingHours
        ? `${workingHours.October}`
        : "woekingHours is undefined",
    },
    {
      monthname: "November",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.November}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.November}`
        : "woekingHours is undefined",
    },
    {
      monthname: "December",
      workingTime: employeeWorkingHours
        ? `${employeeWorkingHours.December}`
        : "employeeWorkHours is undefined.",
      monthworkingHours: workingHours
        ? `${workingHours.December}`
        : "woekingHours is undefined",
    },
  ];

  console.log(Months);

  // const handleattendanceScore = () => {
  //   if (!Months || !Array.isArray(Months)) {
  //     console.error("Months array is not properly defined.");
  //     return <p>No data available</p>;
  //   }

  //   // Calculate the total score by summing up individual month scores
  //   const totalScore = Months.reduce((accumulator, month) => {
  //     // Make sure the score is defined and is a number
  //     const score = parseFloat(month.score) || 0;
  //     return accumulator + score;
  //   }, 0);

  //   // Return the total score as a formatted paragraph
  //   return <p> {totalScore.toFixed(2)}</p>;
  // };

  // const [checkin, setCheckIn] = useState("hidden");
  // const [checkout, setCheckOut] = useState("hidden");

  const [lastAttendance, setLastAttendance] = useState({});
  const [lastdate, setLastDate] = useState("");
  const [todayNote, setTodayNote] = useState("");

  const calculateAverageCheckIn = (attendanceData) => {
    // console.log(attendanceData)
    //   console.log(!Array(attendanceData));

    if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
      throw new Error("Invalid attendance data: Must be a non-empty array");
    }

    // Convert check-in times to total seconds since midnight
    const totalSeconds = attendanceData.reduce((total, record) => {
      if (record.check_in) {
        const date = new Date(record.check_in);
        const seconds =
          date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        // console.log("Record Check-In:", record);
        // console.log("Converted Seconds:", seconds);
        return total + seconds;
      } else {
        // console.log("No Check-In for Record:", record);
        return total;
      }
    }, 0);

    const averageSeconds = totalSeconds / attendanceData.length;

    // Convert back to hours and minutes
    const averageHours = Math.floor(averageSeconds / 3600);
    const averageMinutes = Math.floor((averageSeconds % 3600) / 60);

    // Determine AM or PM
    const ampm = averageHours >= 12 ? "PM" : "AM";
    const displayHours = averageHours % 12 || 12; // Convert 0 to 12

    // Format the output
    return `${String(displayHours).padStart(2, "0")}:${String(
      averageMinutes
    ).padStart(2, "0")} ${ampm}`;
  };

  let dateObject = users?.hireDate;
  let formattedDate;
  if (dateObject) {
    formattedDate = format(dateObject, "MMMM d, yyyy");
  }

  const checkInbtn = () => {
    const currentTime = new Date();
    // currentTime.setHours(18)
    console.log(currentTime, "CurrentTime");

    setformattedCheckInTime(
      `${currentTime.getHours()}:${currentTime.getMinutes()}`
    );
    const checkinData = {
      date: currentTime,
      check_in: currentTime,
      status: "present",
    };
    updateEmployeeAttendance(checkinData, "Check In");
  };

  const checkOutbtn = () => {
    if (users.attendance.length > 0) {
      const lastAttendance = users.attendance[users.attendance.length - 1];
      const attendanceId = lastAttendance.attendance_ID;
      const checkin = lastAttendance.check_in;
      const currentTime = new Date();
      setformattedCheckoutTime(
        `${currentTime.getHours()}:${currentTime.getMinutes()}`
      );
      const checkout = {
        date: currentTime,
        check_in: checkin,
        check_out: currentTime,
        status: "present",
        notes: todayNote,
        attendance_ID: attendanceId,
      };
      updateEmployeeAttendance(checkout, "Check Out");
    } else {
      console.warn("No attendance record found to update check-out time.");
    }
  };

  const handlecheckoutbox = async (event) => {
    event.preventDefault();
    onHide();
    checkOutbtn();
  };

  const opennotes = () => {
    true;
  };

  const updateEmployeeAttendance = async (Data, msg) => {
    try {
      // console.log(Data)
      const response = await axios.put(
        `http://localhost:3001/employees/attendance/update/${id}`,
        { attendance: [Data] }
      );

      toast.success(`Employee ${msg} Successfully`);
      // console.log(response.data.attendance[response.data.attendance.length-1]);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.warn("Error updating employee attendance:", error);
      throw error;
    }
  };

  const onHide = () => {
    // setNotevisible(false);
    setDayNotesVisible(false);
  };

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/check-role/${email}`
        );
        setRole(response.data.role.toLowerCase());
      } catch (error) {
        console.warn("Error fetching user role:", error.message);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  // console.log(lastAttendance);
  // let check_in = new Date(lastAttendance?.check_in);
  // console.log(check_in.getHours(),":",check_in.getMinutes());
  // let check_out = new Date(lastAttendance?.check_out);
  // console.log(check_out.getHours(),":",check_out.getMinutes(  ));
  // let work =
  //   check_out.getHours() * 60 +
  //   check_out.getMinutes() -
  //   (check_in.getHours() * 60 + check_in.getMinutes());
  // console.log(work);
  const expand = () => setShow(show ? false : true);
  // const

  return (
    <div className={"flex flex-col items-center mt-0 max-lg:overflow-x-hidden"}>
      <div className="w-full">
        <p className=" py-2 px-5 max-sm:pl-1 text-2xl text-[--common-color] font-semibold max-sm:text-sm">
          <span className="border-l-4 border-[--common-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
            <p className="animate-slide p-2">Attendance</p>
          </span>
        </p>
        <div className="border m-5 mt-0 rounded-xl shadow-[0_0_5px_0] shadow-gray-300">
          <div className="w-full p-5 overflow-hidden">
            <div className="flex max overflow-scroll h-36 max-lg:h-fit max-lg:w-full justify-between max-lg:justify-normal gap-2 max-lg:grid max-lg:grid-cols-2 max-lg: max-lg:overflow-x-scroll text-[--common-color]">
              <div className="w-1/4 max-xl:flex max-xl:h-full max-xl:flex-col p-10 max-sm:p-0 rounded-md max-xl:w-full text-center max-xl:px-28 duration-300 border-[1px] border-[--bg-gray] shadow-md">
                <div className="flex flex-row items-center max-sm:p-2 justify-center gap-3 max-lg:flex max-lg:flex-col">
                  <div className="w-16 h-16 bg-[#F1EAFF] flex items-center justify-center max-sm:w-10 max-sm:h-10 max-sm:p-2 rounded-lg">
                    <img src={checkin} alt="" />
                  </div>
                  <div className="mx-1">
                    <div className="flex flex-col">
                      <h6 className="font-normal text-xl max-lg:text-base text-wrap text-[#444444]">
                        Check In
                      </h6>
                      <p className="capitalize text-nowrap text-lg font-medium">
                        {users.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/4 max-xl:w-full max-xl:h-full max-xl:flex max-xl:flex-col p-10 max-sm:p-0 rounded-md text-center max-xl:px-28 duration-300 border-[1px] border-[--bg-gray] shadow-md">
                <div className="flex flex-row items-center max-sm:p-2 justify-center gap-3 max-lg:flex max-lg:flex-col">
                  {/* <MdOutlineDocumentScanner className="text-3xl" /> */}
                  <div className="w-16 h-16 bg-[#FFF7DA] flex items-center justify-center max-sm:w-10 max-sm:h-10 max-sm:p-2 rounded-lg">
                    <img src={checkout} alt="" />
                  </div>
                  <div className="mx-1">
                    <div className="flex flex-col">
                      <h6 className="font-normal text-xl max-lg:text-base text-wrap text-[#444444]">
                        Check Out
                      </h6>
                      <p className="capitalize text-nowrap text-lg font-medium">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/4 max-xl:w-full max-xl:flex max-xl:flex-col p-10 max-sm:p-0 rounded-lg text-center max-xl:px-28 duration-300 border-[1px] border-[--bg-gray] shadow-md">
                <div className="flex flex-row items-center max-sm:p-2 justify-center gap-3 max-lg:flex max-lg:flex-col">
                  <div className="w-16 h-16 bg-[#FFECEC] flex items-center justify-center max-sm:w-10 max-sm:h-10 max-sm:p-2 rounded-lg">
                    <img src={vector} alt="" />
                  </div>
                  <div className="mx-1">
                    <div className="flex flex-col">
                      <h6 className="font-normal text-xl max-xl:text-base text-wrap text-[#444444]">
                        Today Working Time
                      </h6>
                      <p className="capitalize text-nowrap text-lg font-medium">
                        {" "}
                        {totalscores?.toFixed(2)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/4 max-xl:w-full max-xl:flex max-xl:flex-col p-10 max-sm:p-0 rounded-lg text-center max-xl:px-28 duration-300 border-[1px] border-[--bg-gray] shadow-md">
                <div className="flex flex-row items-center max-sm:p-2 justify-center gap-3 max-lg:flex max-lg:flex-col">
                  <div className="w-16 h-16 bg-[#DCFFE5] flex items-center justify-center max-sm:w-10 max-sm:h-10 max-sm:p-2 rounded-lg">
                    <img src={score} alt="" />
                  </div>
                  <div className="mx-1">
                    <div className="flex flex-col">
                      <h6 className="font-normal text-xl max-lg:text-base text-wrap text-[#444444]">
                        Attendance Score
                      </h6>
                      <p className="capitalize text-nowrap text-lg font-medium">
                        {" "}
                        {totalscores?.toFixed(2)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-0 mx-0">
            <div className="w-full py-4 mt-1 flex flex-col">
              <div className="flex flex-row items-center justify-between max-lg:gap-2 w-full px-5">
                <div
                  onClick={() => {
                    handlecheckInButton, setButtonshow(!buttonshow);
                    console.log(buttonshow);
                  }}
                  className={`overflow-hidden ${
                    buttonshow && "hidden"
                  }  py-1 w-fit cursor-pointer hover:animate-pulse group max-lg:w-1/3 max-sm:w-1/2 max-lg:text-nowrap max-lg:text-sm px-2 bg-[--common-color] text-white rounded-md shadow-xl duration-150 `}
                >
                  <div className="h-full w-full flex flex-col space-y-2 items-center justify-center">
                    <button className="flex flex-row justify-evenly items-center text-xl font-semibold max-sm:text-base">
                      Check In
                      <img src={checkIn} className="w-5 h-5 mx-3 max-sm:hidden"/>
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => {
                    handlecheckOutButton,
                      setButtonshow(!buttonshow),
                      console.log(buttonshow);
                  }}
                  className={`overflow-hidden ${
                    !buttonshow && "hidden"
                  } py-1 w-fit cursor-pointer hover:animate-pulse group max-lg:w-1/3 max-sm:w-1/2 max-lg:text-nowrap max-lg:text-sm px-2 bg-[--common-color] text-white rounded-md shadow-xl duration-150  `}
                >
                  <div className="h-full w-full flex flex-col space-y-2 items-center justify-center">
                    <button className="flex flex-row justify-evenly text-xl font-semibold items-center max-sm:text-base group-hover:z-50">
                      Check Out
                      <img src={checkOut} className="w-5 h-5 mx-3 max-sm:hidden" />
                    </button>
                  </div>
                </div>
                <div className="max-sm:hidden">
                  <button
                    onClick={expand}
                    className={`px-3 py-1 bg-[--common-color] rounded-md text-white text-lg font-semibold mt-0 text-nowrap max-sm:text-base max-sm:w-full max-sm:items-center max-sm:justify-center ${
                      !show === true ? "flex" : "hidden"
                    }`}
                  >
                    Expand all
                  </button>
                  <button
                    onClick={expand}
                    className={`px-3 py-1 bg-[--common-color] rounded-md text-white text-lg font-semibold mt-0 max-sm:text-base text-nowrap max-sm:w-full max-sm:items-center max-sm:justify-center ${
                      show === true ? "flex" : "hidden"
                    }`}
                  >
                    Reduce all
                  </button>
                </div>
              </div>
              <div className="w-full overflow-scroll h-60">
                <div className=" gap-2 flex flex-row px-5 items-center justify-between h-full w-[1781px] overflow-x-scroll">
                  {Months.map((data, key) => (
                    <div
                      onClick={expand}
                      className={`flex flex-col shadow-[0_0_5px_0] shadow-gray-300 mx-0 text-nowrap group items-center justify-evenly rounded-md max-h-14 w-fit  group cursor-pointer overflow-hidden hover:max-h-[250px] duration-300 ${
                        !show ? "max-h-14 max-lg:max-h-[250px] max-lg:min-w-[240px] min-w-[240px]" : "max-h-[250px] max-lg:min-w-[240px] min-w-[240px]"
                      } duration-500 transition-all `}
                    >
                      <p
                        className={`p-3 text-xl font-semibold group-hover:border-b border-[--common-color]  ${
                          !show
                            ? "text-[#444444] hover:border-b"
                            : "bg-[#F4F4F4] text-black border-b border-[--common-color]"
                        } group-hover:text-black w-full px-5 text-center items-center justify-center"`}
                      >
                        {data.monthname}
                      </p>
                      <p className="p-3 text-[#444444] flex flex-col items-center justify-center font-semibold text-base">
                        <span>working hours</span>
                        <span className="text-[--common-color] text-lg text-wrap">
                          {data?.workingTime == "undefined"
                            ? "00.00"
                            : data.workingTime}
                        </span>
                      </p>
                      <hr className="border border-white w-full" />
                      <p className="p-3 flex flex-col items-center justify-center font-semibold text-base">
                        <span className="flex items-center justify-center text-center text-[#444444]">
                          Total hours
                        </span>
                        <span className="flex items-center justify-center text-center text-[--common-color]">
                          {data.monthworkingHours || "00.00"}
                          {/* {console.log(data.workingTime) }*/}
                        </span>
                      </p>
                    </div>

                    // </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 p-5 h-full m-5 rounded-xl shadow-[0_0_5px_0] shadow-gray-300">
          <div className="overflow-scroll">
            <EmployeeDataTable
              formattedCheckinTime={formattedCheckinTime}
              formattedCheckoutTime={formattedCheckoutTime}
            />
          </div>
        </div>
      </div>
      <Dialog
        className="w-1/3 h-2/3 bg-gray-900 "
        onHide={onHide}
        draggable={false}
        header="Notes"
        visible={dayNotesVisible}
        position="center"
        style={{ width: "25vw", height: "38vh" }}
      >
        <form onSubmit={handlecheckoutbox}>
          <div>
            <p>{lastdate}</p>
          </div>
          <div className="mb-4">
            <textarea
              value={todayNote}
              onChange={(e) => setTodayNote(e.target.value)}
              className="w-full px-3 py-2 border rounded outline-[#1970aa]"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 "
          >
            Submit
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default Attendance;