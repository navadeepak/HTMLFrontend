import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import userAvatar from "../assets/avatar.webp";
import Drawer from "@mui/material/Drawer";
import axios from "../Components/utilities/axiosInstance";
// import { IoIosMenu } from "react-icons/io";
// import Sidebar from "./SideBar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { receiveData } from "../redux/slices/employeeLeaveDataSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";
import { FaBirthdayCake } from "react-icons/fa";
import { BiSolidCircle } from "react-icons/bi";
import { useAllEmployeeContext } from "../context/AllEmployeeContext";
import { useEmployeeContext } from "../context/EmployeeContext";


const Navbar = () => {
  const dispatch = useDispatch();

  const { pendingTicketsLength, pendingLeavesLength, monthBirthDays, holiday } =
    useAllEmployeeContext();

  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userDetails, setUserDetails] = useState("");
  //console.log("userd:::::::::::::::::::",userDetails);
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.username : null;
  const [empID, setEmpID] = useState(userDetails.employee_ID);
  // const [empID, setEmpID] = useState("");
  const [fullUserData, setUserData] = useState([]);
  const [LeaveInfo, setLeaveInfo] = useState([]);
  const [TodayBirthDay, setTodayBitrthDay] = useState();
  const [tomorrowBirthDay, setTomorrowBirthdays] = useState();

  //admin
  const [Count, setCount] = useState(0);
  const [notificationvisible, setNotificationvisible] = useState(false);
  const [MSGTicket, setMSGTicket] = useState([]);
  const [MSGLeave, setMSGLeave] = useState([]);
  //employee
  const [MSGTask, sedMSGTask] = useState([]);
  const [MSG_EMPMeet, setMSG_EMPMeet] = useState([]);
  const [MSG_TeamMeet, setMSG_TeamMeet] = useState([]);
  const current = new Date();

  useEffect(() => {
    if (pendingTicketsLength) setMSGTicket(pendingTicketsLength);
    if (pendingLeavesLength) setMSGLeave(pendingLeavesLength);

    if (monthBirthDays) {

      // console.log(monthBirthDays);
      const todayBirthdays = monthBirthDays.filter((emp) => {
        return current.getDate() === new Date(emp.birthdate).getDate();
      });

      const tomorrowBirthdays = monthBirthDays.filter((emp) => {
        return current.getDate() + 1 === new Date(emp.birthdate).getDate();
      });

      // console.log(todayBirthdays);
      setTodayBitrthDay(todayBirthdays);
      setTomorrowBirthdays(tomorrowBirthdays);
    }
  }, [pendingTicketsLength, pendingLeavesLength, monthBirthDays, holiday]);

  dispatch(receiveData(empID));

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setNotificationvisible(false);
  };

  useEffect(() => {
    const fetchUserRole = async () => {

      console.log(empID);
      
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/task_list/${empID}`
        );

        const data = response.data.task_list
        ;

        console.log(data);
        

      
      } catch (error) {
        console.error("Error fetching user tasks:", error.message);
      }
    };

    if (empID) {
      fetchUserRole();
    }
  }, [empID]);

  const { employee } = useEmployeeContext();

  useEffect(()=>{
    if(employee){
      
      console.log(employee);
      
    }
  },[])
  
  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(`/employees/check-role/${email}`);
        setUserRole(response.data.role.toLowerCase());
        setUserDetails(response.data);
        setEmpID(response.data.employee_ID);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response2 = await axios.get(
          "http://localhost:3001/employees/meetings/all"
        );
        const meeting = response2.data[0].meetings;
        const EMPMeetings = meeting.filter((e) => e.end_time === empID);
        setMSG_EMPMeet(EMPMeetings);
        const TeamMeetings = meeting.filter((e) => e.meeting_type === "1");
        setMSG_TeamMeet(TeamMeetings);
      } catch (error) {
        console.error("Error fetching meeting data:", error.message);
      }
    };

    fetchMeetingData();
  }, [empID]);

  const notification = () => {
    setNotificationvisible(true);
  };
  const handleVisible = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    if (userDetails?.leave) {
      const today = new Date();
      const leaveData = e.leave
        .filter((user) => {
          const fromDate = new Date(user.fromDate);
          // Check if fromDate is today or in the future
          return (
            fromDate >= today ||
            (fromDate.getDate() === today.getDate() &&
              fromDate.getMonth() === today.getMonth() &&
              fromDate.getFullYear() === today.getFullYear())
          );
        })
        .map((user) => ({
          leaveType: user.leaveType,
          leaveStatus: user.leaveStatus,
        }));
      setLeaveInfo(leaveData);
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      console.log(empID);
      
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/leave/all/${empID}`
        );  

        const today = new Date();
        const leaveData = response.data.leaves
        .filter((user) => {
          const fromDate = new Date(user.fromDate);
          // Check if fromDate is today or in the future
          return (
            fromDate >= today ||
            (fromDate.getDate() === today.getDate() &&
              fromDate.getMonth() === today.getMonth() &&
              fromDate.getFullYear() === today.getFullYear())
          );
        })
        .map((user) => ({
          leaveType: user.leaveType,
          leaveStatus: user.leaveStatus,
        }));
      setLeaveInfo(leaveData);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    // Example usage
    fetchLeaveData();
  }, []);


  // console.log(userDetails.photoUpload, "help");

  return (
    <div
      className={`bg-white w-full shadow-md z-50 h-[10vh] sticky top-0 ${
        handleVisible ? "w-screen" : "w-3/5"
      } flex flex-row items-center justify-between`}
    >
      <div className="flex justify-between items-center p-4 h-full w-full">
        <div
          onClick={handleVisible}
          className="ml-5 max-sm:ml-1 cursor-pointer"
        >
          <GiHamburgerMenu
            className={`${
              !handleVisible ? "hidden" : "block"
            } text-xl font-extralight text-[--common-color]`}
          />
        </div>
        <div className="flex flex-row justify-between items-center cursor-default">
          <img
            src={logo}
            alt=""
            className={`w-[60px] h-[55px] ml-5 max-sm:ml-2.5`}
          />
          <p className="text-nowrap text-2xl max-md:hidden max-lg:text-xl font-bold text-[#122C43]">
            Quantum Sharq Innovative Solutions
          </p>
          <p className="text-nowrap hidden max-md:block text-2xl font-bold text-[#122C43]">
            QSIS
          </p>
        </div>
        <div className="flex w-full items-center space-x-5 h-full max-sm:py-5 flex-row justify-end">
          <button
            onClick={notification}
            className="flex items-center justify-center"
          >
            <div className="flex items-center justify-center">
              <FiBell className="text-2xl flex items-center text-[--common-color]" />
              <div className="bg-red-500 rounded-full px-1 py-0 w-[10px] h-[10px] text-sm mb-7 mr-4 text-white"></div>
            </div>
          </button>
          <div className="">
            <img
              src={userDetails.photoUpload || userAvatar}
              alt="avatar"
              className="w-10 h-10 cursor-pointer bg-white rounded-full"
              onClick={handleDrawerOpen}
            />
          </div>
          <div className="flex space-x-3 items-center max-sm:absolute max-sm:right-1 mr-5">
            <p className=" max-sm:hidden md:block text-[#444444] text-xl capitalize cursor-default pr-4">
              {/* Hi, {userName} */}
              {userRole.toLowerCase() === "admin"
                ? "Hi,Admin"
                : `Hi, ${userDetails.name}`}
            </p>
          </div>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        className={`${
          userRole === "employee" ? "block" : "hidden"
        } p-4 bg-transparent`}
      >
        <div className="w-80 h-full flex flex-col items-center border-t-4 border-[#1970aa]">
          <div className="flex flex-col w-full items-center p-4">
            <img
              src={userDetails.photoUpload || userAvatar}
              alt="avatar"
              className="w-24 h-24 rounded-full mb-4 border border-gray-300"
            />
            <div className="text-center w-full shadow-[inset_0_0px_5px_rgba(0,0,0,0.2)] rounded-md p-4">
              <p className="text-lg font-semibold text-gray-500 capitalize mb-2">
                {userDetails.name}
              </p>
              <p className="group border-t-2 rounded-b-md bg-slate-200 h-14 mb-4 border-[#1970AA] flex items-center justify-center text-gray-600  hover:text-white duration-200 transition relative  after:content-[''] overflow-hidden after:text-black after:w-0 after:top-0 after:left-0 after:m-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-gray-300 after:z-10 z-50 hover:after:w-full">
                <p className="no-scrollbar group-hover:text-black group-hover:z-50 absolute top-0 left-0 flex items-center justify-start pl-4 w-full h-full">
                  <span className="mx-2">Employee ID:</span>{" "}
                  {userDetails.employee_ID}
                </p>
              </p>
              <p className="group border-t-2 rounded-b-md bg-slate-200 h-14 mb-4 border-[#1970AA] flex items-center justify-center text-gray-600  hover:text-white duration-200 transition relative  after:content-[''] overflow-hidden after:text-black after:w-0 after:top-0 after:left-0 after:m-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-gray-300 after:z-10 z-50 hover:after:w-full">
                <p className="no-scrollbar group-hover:text-black group-hover:z-50 absolute top-0 left-0 flex items-center justify-start pl-4 w-full h-full">
                  <span className="mx-2">Phone:</span> {userDetails.phoneNumber}
                </p>
              </p>
              <p className="group border-t-2 rounded-b-md bg-slate-200 h-14 mb-4 border-[#1970AA] flex items-center justify-center text-gray-600  hover:text-white duration-200 transition relative  after:content-[''] overflow-hidden after:text-black after:w-0 after:top-0 after:left-0 after:m-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-gray-300 after:z-10 z-50 hover:after:w-full">
                <p className="no-scrollbar group-hover:text-black group-hover:z-50 absolute top-0 left-0 flex items-center justify-start pl-4 w-full h-full overflow-scroll">
                  <span className="mx-2">Email:</span> {userDetails.email}
                </p>
              </p>
              <p className="group border-t-2 rounded-b-md bg-slate-200 h-14 mb-4 border-[#1970AA] flex items-center justify-center text-gray-600  hover:text-white duration-200 transition relative  after:content-[''] overflow-hidden after:text-black after:w-0 after:top-0 after:left-0 after:m-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-gray-300 after:z-10 z-50 hover:after:w-full">
                <p className="no-scrollbar group-hover:text-black group-hover:z-50 absolute top-0 left-0 flex items-center justify-start pl-4 w-full h-full">
                  <span className="mx-2">Role:</span> {userDetails.role}
                </p>
              </p>
              <p className="group border-t-2 rounded-b-md bg-slate-200 h-14 mb-4 border-[#1970AA] flex items-center justify-center text-gray-600  hover:text-white duration-200 transition relative  after:content-[''] overflow-hidden after:text-black after:w-0 after:top-0 after:left-0 after:m-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-gray-300 after:z-10 z-50 hover:after:w-full">
                <p className="no-scrollbar group-hover:text-black group-hover:z-50 absolute top-0 left-0 flex items-center justify-start pl-4 w-full h-full">
                  <span className="mx-2">Work_role:</span>{" "}
                  {userDetails.work_role}
                </p>
              </p>
            </div>
          </div>
          <Link to={`/auth/editEmployee/${empID}`} onClick={handleDrawerClose}>
            <button>Edit Profile</button>
          </Link>
        </div>
      </Drawer>
      <Drawer
        anchor="right"
        open={notificationvisible}
        onClose={handleDrawerClose}
      >
        {/* Admin notification */}
        <div
          className={`w-96 flex flex-col gap-0 ${
            userRole === "admin" ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-row items-center justify-between px-5">
            <h2 className="font-medium text-2xl mb-0 flex items-center justify-center py-5 text-[#707070]">
              Notifications
            </h2>
            <button className="text-[#707070] text-base">clear all</button>
          </div>
          <hr className=" border-gray-300 mx-1" />
          <div className="mb-0 text-black h-full">
            {/* {console.log("ticket",MSGTicket) } */}
            {MSGTicket > 0 ? (
              <Link to="/auth/ticket">
                <button onClick={handleDrawerClose} className="w-full">
                  <div className="flex flex-row justify-between items-center px-5 ">
                    <div className="flex flex-row gap-2 items-center justify-evenly">
                      <div className="w-3 h-3 mr-4 rounded-full bg-[--common-color]"></div>
                      <p className="p-0 text-lg rounded-md">{MSGTicket}</p>
                      <p className="py-1 text-lg">Tickets Pending</p>
                    </div>
                    {/* <div className="bg-[--red-button] h-[5px] w-[5px] rounded-full text-white animate-ping"></div> */}
                  </div>
                </button>
              </Link>
            ) : null}
            <hr className="m-1 border-gray-300" />
            {MSGLeave > 0 ? (
              <Link to="/auth/leave">
                <button onClick={handleDrawerClose} className="w-full">
                  <div className="flex flex-row justify-between items-center px-5 ">
                    <div className="flex flex-row gap-2 items-center justify-evenly">
                      <div className="w-3 h-3 mr-4 rounded-full bg-[--common-color]"></div>
                      <p className="p-0 text-lg rounded-md">{MSGLeave}</p>
                      <p className="py-1">Leaves Pending </p>
                    </div>
                    <div className="bg-[--red-button] h-[5px] w-[5px] rounded-full text-white animate-ping"></div>
                  </div>
                </button>
              </Link>
            ) : null}
          </div>
        </div>
        {/* Employee notification */}
        <div
          className={`w-96 flex flex-col gap-0 ${
            userRole === "employee" ? "block" : "hidden"  
          }`}
        >


          {/* {MSGTask.length > 0 ? (
              <Link to="/auth/todos">
                <button onClick={handleDrawerClose} className="w-full">
                  <div className="flex justify-between items-center px-5">
                    <div className="flex flex-row gap-3 items-center justify-evenly">
                      <div className="w-3 h-3 mr-4 rounded-full bg-[--common-color]"></div>
                      <p className="p-0 text-lg rounded-md">{MSGTask.length}</p>
                      <p className="py-1">Task</p>
                    </div>
                    <div className="bg-[--red-button] w-[5px] h-[5px] animate-ping rounded-full text-white"></div>
                  </div>{" "}
                </button>
              </Link>
            ) : null} */}

          {LeaveInfo && LeaveInfo.length > 0
              ? LeaveInfo.map((leave, index) =>
                  leave.leaveStatus !== "Pending" ? (
                    <div key={index}>
                      <Link to="/auth/leave">
                        <button onClick={handleDrawerClose} className="w-full">
                          <div
                            key={index}
                            className={`flex justify-between items-center px-3 mt-1  ${
                              leave.leaveStatus === "Rejected"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            <p className="m-2 text-base">{leave.leaveType}</p>
                            <BiSolidCircle className="mr-4 h-[10px] w-[10px] mt-1" />
                          </div>
                        </button>
                      </Link>
                    </div>
                  ) : null
                )
              : null}

        
        </div>
        {/* Birthday notification */}
        <div className="mt-4 bg-white">
          {TodayBirthDay?.length > 0
            ? TodayBirthDay.map((data, index) => (
                <div key={index} className="flex mb-4 m justify-between px-2">
                  <h1>
                    <span>Today </span>
                    {data.username}
                    <span> Birthday</span>
                  </h1>
                  <div className="px-2">
                    <FaBirthdayCake className=" w-10 h-6 text-pink-600 " />
                  </div>
                </div>
              ))
            : null}
            {/* {monthBirthDays?.length>0?<div></div>:<p>No</p>} */}
        </div>
        <div className="mt-4 bg-white">
     
          {tomorrowBirthDay?.length > 0
            ? tomorrowBirthDay.map((data, index) => (
                <div key={index} className="flex mb-4 m justify-between px-2">
                  <h1>
                    <span>Tomorrow </span>
                    {data.username}
                    <span> Birthday</span>
                  </h1>
                  <div className="px-2">
                    <FaBirthdayCake className=" w-10 h-6 text-pink-600 " />
                  </div>
                </div>
              ))
            : null}
          {/* {monthBirthDays?.length>0?<div></div>:<p>No</p>} */}
        </div>
      </Drawer>

      <div className={userRole === "admin" ? "hidden" : "block"}>
        {/* Content visible only to non-admin users */}
      </div>
    </div>
  );
};

export default Navbar;