import "react-calendar/dist/Calendar.css";

import { useState, useEffect, useContext } from "react";
import axios2 from "axios";
import userAvater from "../assets/avatar.webp";
import "./custom css/slideDataForMissionVision.css";
import EmployeeAnnoncement from "./EmployeeAnnoncement";
import { Link } from "react-router-dom";
import { useAllEmployeeContext } from "../context/AllEmployeeContext";
import { AttendanceContext } from "../context/AttendanceContext";
import axios from "../Components/utilities/axiosInstance";
import { useEmployeeContext } from "../context/EmployeeContext";

const Dashboard = () => {
  const { attendanceData } = useContext(AttendanceContext);
  const { employee } = useEmployeeContext();

  const [scroe, setScroe] = useState();
  const [empLeaves, setEmpLeaves] = useState();
  const [leaveTake, setLeaveTake] = useState();

  useEffect(()=>{
    if(employee) {
      setIndividualDataUser(employee);
      setBirthDate(employee.birthdate);
      setRole(employee.role);
      setEmployee_ID(employee.employee_ID);
    }
  },[employee])

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/leave/all/${employee.employee_ID}`
        );
        setEmpLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };
    // Example usage
    fetchLeaveData();
  }, [employee]);

  useEffect(() => {
    let LeaveDay = 0;
    if (empLeaves) {
      empLeaves.leaves.map((e) => {
        let From = new Date(e.fromDate);
        let To = new Date(e.toDate);
        LeaveDay = LeaveDay + (To.getDate() - From.getDate()) + 1;
      });
    }
    setLeaveTake(LeaveDay);
  }, [empLeaves]);

  useEffect(() => {
    if (attendanceData.scores) {
      const numericScores = Object.values(attendanceData.scores).map((value) =>
        parseFloat(value)
      );
      const totalScore = numericScores.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setScroe(totalScore);
    }
  }, [attendanceData]);

  const {
    todayAttendance,
    employees1,
    pendingTickets12,
    pendingTicketsLength,
    pendingLeaves,
    pendingLeavesLength
    
  } = useAllEmployeeContext();

  const [absent, setAbsent] = useState();

  useEffect(() => {
    if (employees1 && todayAttendance)
      setAbsent(employees1.length - todayAttendance.length);
   
  }, [
    employees1,
    pendingTickets12,
    pendingTicketsLength,
    pendingLeaves,
    todayAttendance,
  ]);

  const [role, setRole] = useState("");
  const [employee_ID, setEmployee_ID] = useState("");
  const [individualDataUser, setIndividualDataUser] = useState("");
  const [birthDate, setBirthDate] = useState("");

  //----to fetch individual user data---------


  

  const formattedDatedob = birthDate
    ? new Date(birthDate).toISOString().split("T")[0]
    : "";

  return (
    <div className="bg-[--bg-gray]">
      <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">Dashboard</p>
        </span>
      </p>
      {/*-------------------------- ADMIN DASHBOARD VIEW STARTS HERE ------------------------ */}
      <div
        className={`flex flex-col items-center w-full bg-white p-5 pt-0 gap-2 overflow-scroll max-lg:h-full ${
          role === "admin" ? "" : "hidden"
        }`}
      >
        <div className=" flex w-full flex-col gap-5">
          <div className="overflow-scroll">
            <div className="flex flex-row max-sm:grid max-lg:grid max-lg:grid-cols-2 max-sm:w-full gap-5 text-[#444444]">
              <Link
                to={`/auth/employee/`}
                className="w-[507.453px] max-sm:p-5 max-sm:w-full overflow-hidden h-52 max-sm:h-44 max-lg:w-full flex flex-col border items-center bg-gradient-to-bl shadow-md rounded-md from-[#FE8DAB] to-[#FFBE96] justify-center relative"
              >
                <div className="absolute right-[-90px] top-[-30px] bg-[#ffffff] opacity-20 rounded-full w-52 h-52 z-0"></div>
                <div className="absolute right-[-70px] top-[-20px] bg-[#ffffff] opacity-20 rounded-full w-60 h-60 z-0"></div>
                <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                  Total No of Absends
                </p>
                <p className="text-6xl mt-10 z-10 max-sm:text-5xl">
                  {absent && absent}
                </p>
              </Link>
              <Link
                to={`/auth/ticket`}
                className="w-[507.453px] max-sm:p-5 max-sm:w-full h-52 max-sm:h-44 flex flex-col max-lg:w-full border items-center justify-center bg-gradient-to-bl shadow-md rounded-md from-[#248FE5] to-[#CAE7FF] relative overflow-hidden"
              >
                <div className="absolute right-[-90px] top-[-30px] bg-[#ffffff] opacity-20 rounded-full w-52 h-52 z-0"></div>
                <div className="absolute right-[-70px] top-[-20px] bg-[#ffffff] opacity-20 rounded-full w-60 h-60 z-0"></div>
                <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                  Pending Tickets
                </p>
                <p className="text-6xl mt-10 z-10 max-sm:text-5xl">
                  {pendingTicketsLength && pendingTicketsLength}
                </p>
              </Link>
              <Link
                to={`/auth/Meeting`}
                className="w-[507.453px] max-sm:p-5 max-sm:w-full h-52 max-sm:h-44 flex flex-col max-lg:w-full items-center border justify-center bg-gradient-to-bl shadow-md rounded-md from-[#3AD7BE] to-[#C5FFFA] relative overflow-hidden"
              >
                <div className="absolute right-[-90px] top-[-30px] bg-[#B8FFC0] opacity-40 rounded-full w-52 h-52 z-0"></div>
                <div className="absolute right-[-70px] top-[-20px] bg-[#B8FFC0] opacity-40 rounded-full w-60 h-60 z-0"></div>
                <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                  Meeting
                </p>
                <p className="text-6xl mt-10 z-10 max-sm:text-5xl">3</p>
              </Link>
              <Link className="w-[507.453px] max-sm:p-5 max-sm:w-full h-52 max-sm:h-44 flex flex-col max-lg:w-full items-center border justify-center bg-gradient-to-bl shadow-md rounded-md from-[#D8D20D] to-[#FFFDB7] overflow-hidden relative">
                <div className="absolute right-[-90px] top-[-30px] bg-[#ffffff] opacity-30 rounded-full w-52 h-52 z-0"></div>
                <div className="absolute right-[-70px] top-[-20px] bg-[#ffffff] opacity-30 rounded-full w-60 h-60 z-0"></div>
                <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                  Pending Leaves
                </p>
                <p className="text-6xl mt-10 z-10 max-sm:text-5xl">
                  {pendingLeavesLength && pendingLeavesLength}
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-5 max-lg:h-full max-lg:flex-col">
            <EmployeeAnnoncement userRole={role} />
          </div>
        </div>
      </div>

      {/* ----------ADMIN DASHBOART VIEW END HERE----------- */}

      {/* ----------EMPLOYEE DASHBOARD VIEW STARTS HERE------------ */}

      <div
        className={`
          ${
            role === "employee"
              ? "m-auto overflow-y-scroll p-5 bg-white gap-5 flex flex-col overflow-hidden"
              : "hidden"
          } overflow-scroll max-lg:h-full`}
      >
        <div className="overflow-scroll">
          <div className="flex flex-row max-sm:grid max-lg:grid max-xl:grid-cols-2 max-xl:w-full gap-5 text-[#444444]">
            <div className="w-[507.453px] max-xl:text-center max-xl:p-0 gap-4 bg-gradient-to-tl to-gray-200 from-white shadow-md rounded-md flex flex-row max-xl:flex-col items-center px-5 overflow-hidden h-52 max-sm:h-44 max-lg:w-full border justify-center">
              <div className="w-52 h-52 max-xl:hidden flex items-center rounded-full">
                <img src={individualDataUser.photoUpload || userAvater} />
              </div>
              <div className="w-full h-full flex max-xl:text-center max-xl:items-center items-start flex-wrap justify-center flex-col">
                <p className="text-4xl max-lg:text-xl max-xl:text-2xl font-medium capitalize text-[--common-color] flex items-center">
                  {individualDataUser.name}
                </p>
                  <span className="text-xl max-sm:text-base max-lg:text-sm max-xl:text-lg text-black ">
                    ({individualDataUser.employee_ID})
                  </span>
                <p className="text-xl font-medium text-gray-700 max-lg:text-base max-xl:text-xl">
                  {individualDataUser.work_role}
                </p>
                <p>{formattedDatedob}</p>
              </div>
            </div>
            <Link
              to={`/auth/attendance/${employee_ID}`}
              className="w-[507.453px] max-sm:w-full overflow-hidden h-52 max-md:p-5 max-sm:h-44 max-lg:w-full flex flex-col border items-center bg-gradient-to-bl shadow-md rounded-md from-[#FE8DAB] to-[#FFBE96] justify-center relative"
            >
              <div className="absolute right-[-90px] top-[-30px] bg-[#ffffff] opacity-20 rounded-full w-52 h-52 z-0"></div>
              <div className="absolute right-[-70px] top-[-20px] bg-[#ffffff] opacity-20 rounded-full w-60 h-60 z-0"></div>
              <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                Attendance Score
              </p>
              <p className="text-6xl mt-10 z-10 max-sm:text-5xl">{scroe}</p>
            </Link>
            <Link
              to={`/auth/leave/`}
              className="w-[507.453px] max-sm:w-full overflow-hidden h-52 max-md:p-5 max-sm:h-44 max-lg:w-full flex flex-col border items-center bg-gradient-to-bl shadow-md rounded-md from-[#248FE5] to-[#CAE7FF] justify-center relative"
            >
              <div className="absolute right-[-90px] top-[-30px] bg-[#ffffff] opacity-20 rounded-full w-52 h-52 z-0"></div>
              <div className="absolute right-[-70px] top-[-20px] bg-[#ffffff] opacity-20 rounded-full w-60 h-60 z-0"></div>
              <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                No of Leave Taken
              </p>
              <p className="text-6xl mt-10 z-10 max-sm:text-5xl">{leaveTake}</p>
            </Link>
            <Link
              to={`/auth/todos/`}
              className="w-[507.453px] max-sm:w-full overflow-hidden h-52 max-md:p-5 max-sm:h-44 max-lg:w-full flex flex-col border items-center bg-gradient-to-bl shadow-md rounded-md from-[#3AD7BE] to-[#C5FFFA] justify-center relative"
            >
              <div className="absolute right-[-90px] top-[-30px] bg-[#B8FFC0] opacity-20 rounded-full w-52 h-52 z-0"></div>
              <div className="absolute right-[-70px] top-[-20px] bg-[#B8FFC0] opacity-20 rounded-full w-60 h-60 z-0"></div>
              <p className="text-2xl text-black font-medium drop-shadow-md z-10 text-center max-sm:text-xl">
                No of Task Done
              </p>
              <p className="text-6xl mt-10 z-10 max-sm:text-5xl">{"20"}</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-5 max-lg:h-full h-fit max-lg:flex-col">
          <EmployeeAnnoncement userRole={role} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
