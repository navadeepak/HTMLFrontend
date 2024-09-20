import React, { useEffect, useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { AiFillProject } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsPersonFillCheck } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { BsPersonFillX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { FaPeopleGroup, FaUmbrellaBeach } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { Tooltip } from "primereact/tooltip";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { Link, useNavigate } from "react-router-dom";
import logout from "../assets/Logout.png";
import axios from "axios";
import { useSelector } from "react-redux";
import "../Components/custom css/sidebar.css";
import { useLocation } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employee_ID, setemployee_ID] = useState("");

  const isVisible = useSelector((state) => state.sidebar.isVisible);

  //console.log(isVisible,"esdfvgbynhuj");

  const navigate = useNavigate();

  const {employee}=useEmployeeContext();

  useEffect(()=>{
    console.log(employee.role);
    setRole(employee?.role?.toLowerCase());
    setEmployees(employee)
    setemployee_ID(employee?.employee_ID)
    
  },[employee])


  const pages = [
    { title: "Dashboard", path: "/auth/dashboard", image: <RiDashboardFill /> },
    {
      title: "Attendance",
      path: `/auth/attendance/${employee_ID}`,
      image: <BsPersonFillCheck />,
    },
    { title: "Employee", path: "/auth/employee", image: <IoPersonSharp /> },
    { title: "Project", path: "/auth/todos", image: <BiTask /> },
    { title: "Leave", path: "/auth/leave", image: <BsPersonFillX /> },
    // { title: "EMP Attendance",path: "/auth/employeeAttendance",image: <FaPeopleGroup /> },
    { title: "Ticket", path: "/auth/ticket", image: <IoTicket /> },
    { title: "Meet", path: "/auth/Meeting", image: <AiFillProject /> },
    { title: "Holiday", path: "/auth/holiday", image: <FaUmbrellaBeach/> },
    {
      title: "Inventory",
      path: "/auth/Inventory",
      image: <MdOutlineInventory2 />,
    },
    { title: "Chat", path: "/auth/Chat", image: <IoChatboxEllipses /> },
  ];

  const filteredPages = pages.filter((page) => {
    if (role === "employee") {
      return (
        page.title === "Dashboard" ||
        page.title === "Attendance" ||
        page.title === "Leave" ||
        page.title === "Ticket" ||
        page.title === "Project" ||
        page.title === "Meet" ||
        page.title === "Holiday" 
        // page.title === "Inventory"

        // page.title === "Chat"
      );
    } else if (role === "admin") {
      return (
        page.title === "Dashboard" ||
        page.title === "Attendance" ||
        page.title === "Employee" ||
        page.title === "Leave" ||
        page.title === "Ticket" ||
        page.title === "Project" ||
        page.title === "Meet" ||
        page.title === "Holiday" 
        // page.title === "Chat" ||
        // page.title === "Inventory"
      ); // Show all pages except Attendance for admin
    } else {
      return false; // Handle any other roles or unexpected cases
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // const [buttonHideAndShow, setBottonHideAndShow] = useState(false);
  // const openFun = () => {
  //   setBottonHideAndShow(true);
  // };
  // const closeFun = () => {
  //   setBottonHideAndShow(false);
  // };

  // const handleVisible = () => {
  //   dispatch(toggleSidebar());
  // };
  //console.log("Hello:::::::::",isVisible);
  const location = useLocation();

  return (
    <div
      className={`bg-[--common-color] relative h-full max-sm:flex max-sm:items-center top-0 max-lg:flex max-lg:flex-col max-lg:items-center max-sm:flex-col text-white w-1/6 ${
        isVisible
          ? "w-1/6 max-lg:w-[30%] max-sm:w-[70%] max-xl:w-[30%] max-2xl:w-[20%] max-sm:fixed max-sm:z-40 max-sm:top-[10vh] max-xl:translate-x-0"
          : "w-fit max-sm:hidden min-md:-translate-x-60"
      } duration-300`}
    >
      <div className="flex flex-col space-y-10 m-4 mb-0 h-5/6">
        <h1 className="font-bold w-full text-2xl flex items-center justify-center">
          MENU
        </h1>
        <div className="w-full h-3/4 flex items-start justify-evenly space-y-2 flex-col overflow-scroll">
          {filteredPages.map((page, i) => {
            const isActive = location.pathname === page.path;
            const shouldHide =
              role === "employee" &&
              ![
                "Dashboard",
                "Attendance",
                "Leave",
                "Ticket",
                "Project",
                "Meet",
                "Holiday",
                "Chat",
              ].includes(page.title);

            return (
              <Link
                key={i}
                to={page.path}
                className={`font-normal w-full items-center max-sm:font-extralight max-sm:flex max-lg:flex max-lg:items-center max-sm:items-center max-sm:text-xs text-slate-100 flex gap-3 max-sm:gap-2 p-3 rounded-md text-nowrap duration-300 hover:shadow-md relative after:content-[''] after:absolute after:w-0 after:top-0 after:left-0 after:h-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-[#fdfdfd59] hover:after:w-full after:rounded-md rounded-l-none hover:after:rounded-l-none max-lg:flex-row max-lg:text-sm ${
                  isActive ? "bg-[#fdfdfd59] border-l-4" : ""
                }`} // Apply active class if active
              >
                <div
                  title={page.title}
                  className={`${
                    isVisible
                      ? ""
                      : "flex w-full items-center justify-center flex-row duration-300"
                  } text-2xl duration-300`}
                >
                  {page.image}
                </div>
                {!shouldHide && (
                  <span
                    className={`${
                      isVisible ? "flex duration-300" : "hidden duration-300"
                    } max-md:text-base font-semibold flex items-center text-xl justify-center flex-row duration-300`}
                  >
                    <p title={page.title} className="tool">
                      {page.title}
                    </p>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <button
        className="absolute bottom-5 w-full h-1/6 left-0 px-5 flex-row justify-center items-center flex gap-4 max-sm:text-lg max-sm:left-0 max-md:bottom-24 text-white"
        onClick={handleLogout}
      >
        <span>
          <img
            src={logout}
            alt="logout"
            className="mt-1 max-sm:w-3 max-sm:h-3"
          />
        </span>
        <p className={`${isVisible ? "block" : "hidden"}`}>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
