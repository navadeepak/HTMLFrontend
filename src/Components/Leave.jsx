import Leave_application_form from "./Leave component/Leave_application_form";
import Leave_summery from "./Leave component/Leave_summary";
import Calender_comp from "./Leave component/Calender_comp";
import Leave_report from "./Leave component/Leave_report";
import Notifications from "./Leave component/Notification";
import "./custom css/leave.css";
import { useEffect, useState } from "react";
import axios from "../Components/utilities/axiosInstance";
import { useSelector } from "react-redux";
import EmployeeLeaveDetails from "./EmployeeLeaveDetails";

function Leave() {
  const [role, setRole] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState("")

  const isVisible = useSelector((state) => state.sidebar.isVisible);

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
            (employee) => employee.work_role === role && employee.role?.toLowerCase() === 'employee'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employees");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setEmployees(data);
        // setFilteredEmployees(data);
        // console.log("current::::::::::",data.length)
      } catch (error) {
        console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(`employees/check-role/${email}`);
        setRole(response.data.role.toLowerCase());
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
    <div className={`mt-0 overflow-x-hidden`}>
      <div className="w-full ml-0 mb-2 max-xl:sticky max-xl:left-0">
      <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">Leave</p>
        </span>
      </p>
      </div>

      <div className={`${role !== "admin" ? " h-screen max-xl:h-full p-5 pt-0" : "p-5 pt-0"}`}>
        {role !== "admin" && (
          <div className="flex flex-row min-h-[700px] max-xl:w-full max-xl:flex-col max-xl:h-full max-lg:flex-col gap-6 border p-6 rounded-xl">
            <div className="py-0 h-full max-lg:w-full pl-0 pr-0 w-3/5 max-xl:w-full">
              <Leave_application_form />
            </div>
            <div className="py-0 items-center w-2/5 max-xl:w-full max-xl:flex-col max-xl:flex max-lg:gap-4 max-lg:h-full max-lg:w-full pl-0 flex flex-col max-sm:gap-4 lg:justify-between">
              <Leave_summery />
              <Notifications />
            </div>
          </div>
        )}

        <div
          className={`mt-5 w-full ${
            role !== "admin" ? "max-lg:h-[300px] max-lg:mt-10" : ""
          } ${isVisible ? " max-sm:ml-0" : ""}`}
        >
          <Leave_report />
          <div className={role !== "admin"?"hidden":""}>
          <EmployeeLeaveDetails employees={employees}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leave;