import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css"; // Import the default react-calendar CSS
import AdminPieChart from "./AdminPieChart";
import axios2 from "axios";
import "./custom css/slideDataForMissionVision.css";
import EmployeeAttendance from "./EmployeeAttendance";
import EmployeeList from "./EmployeeList";

const AllEmployee = () => {
  const [role, setRole] = useState("");
  const [employeeData, setEmployeeData] = useState([0]); // Initialize with zeros
  const [showPieChart, setShowPieChart] = useState(false);


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

  //----to fetch individual user data---------
  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response2 = await axios2.get(
          ` http://localhost:3001/employees/check-role/${email}`
        );
        setRole(response2.data.role.toLowerCase());
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  return (
    <div className={`mt-0 mb-0 bg-white`}>
      <p className=" bg-[--title] py-2 px-5 mb-0 max-sm:pl-1 text-3xl text-[--common-color] font-light max-sm:text-sm">
        <span className="border-l-4 border-[--common-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2 font-semibold text-2xl">Employees</p>
        </span>
      </p>
      <div className="flex flex-col items-center gap-10 m-5 mt-0  ">
        
        <EmployeeList/> 
        <EmployeeAttendance />

        <div
          className={
            role.toLowerCase() == "admin"
              ? "bg-gray-200 w-full m-auto h-full overflow-y-scroll"
              : "hidden"
          }
        >
  
          <div className={showPieChart ? "w-full relative" : "hidden"}>
            <div
              className={`
            ${
              showPieChart
                ? "absolute left-0 top-0 w-1/3 h-screen bg-[#00000048] z-10 cursor-pointer flex items-center justify-center"
                : "hidden"
            }`}
              onClick={() => {
                setShowPieChart(false);
              }}
            >
              <AdminPieChart newData={employeeData} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .p-datatable thead th {
          // border-bottom: 1px solid black;
          padding: 10px;
          text-align: center; /* Center align header text */
        }
        .p-datatable-tbody > tr {
          // border-bottom: 1px solid black;
          padding: 10px;
        }
        .p-datatable-tbody > tr > td {
          padding: 10px;
        }
        .p-datatable-tbody > tr.p-highlight {
          background-color: #ccc;
        }
        .p-checkbox-box {
          width: 100%;
          height: 100%;
          border: 1px solid black;
        }
        .p-checkbox-box:checked {
          background-color: blue;
        }
        .p-menu {
          z-index: 1000;
        }
        .p-menu .p-menuitem-link {
          padding: 0.5rem 1rem;
        }
        .p-menu .p-menuitem-text {
          font-size: 1rem;
        }
        .p-menu .p-submenu-icon {
          font-size: 1rem;
        }
        .p-menu .p-menuitem {
          position: relative;
        }
        .p-menu .p-menuitem .p-submenu-icon::before {
          content: "\\25B6"; /* Right arrow */
          display: inline-block;
          margin-left: 0.5rem;
        }
        .p-menu .p-menuitem:hover .p-menuitem-text::after {
          content: "";
          display: block;
          position: absolute;
          right: -1.5rem;
          width: 1rem;
          height: 1rem;
          background: #ccc;
          z-index: 1000;
        }
        .p-menu .p-submenu-list {
          position: absolute;
          left: 100%;
          top: 0;
          display: none;
          margin-top: -0.5rem;
        }
        .p-menu .p-menuitem:hover .p-submenu-list {
          display: block;
          background: white;
          border: 1px solid #ccc;
        }
        .p-menu {
          z-index: 1000;
          background-color: #f5f7f8;
          padding: 10px;
          border-radius: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
            rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }
        .p-menuitem-link {
          padding: 0.5rem 2.5rem;
        }
        .p-menuitem-link:hover {
          background-color: #eeeeee;
        }
        .ui-paginator {
          text-align: right !important;
        }

        .ui-paginator span {
          text-align: left !important;
        }
        .ref {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

export default AllEmployee;