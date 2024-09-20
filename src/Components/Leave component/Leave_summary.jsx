import { useState, useEffect } from "react";
import axios from "../utilities/axiosInstance";
import { useEmployeeContext } from "../../context/EmployeeContext";

function Leave_summery() {
  const { employee, tryfun, tasklist } = useEmployeeContext();
  const [empLeaves, setEmpLeaves] = useState();
  const [leaveTake, setLeaveTake] = useState();

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/leave/all/${employee.employee_ID}`
        );
        // console.log('Leave data:', response.data);
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
      // console.log(empLeaves);
      empLeaves.leaves.map((e) => {
        let From = new Date(e.fromDate);
        let To = new Date(e.toDate);
        LeaveDay = LeaveDay + (To.getDate() - From.getDate()) + 1;
      });
    }
    setLeaveTake(LeaveDay);
  }, [empLeaves]);

  const [totalLeave, setTotalLeave] = useState(30);
  const [leaveTaken, setLeaveTaken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [leaveReport, setLeaveReport] = useState([]);
  const [particularEmpData, setParticularEmpData] = useState({});
  const [employeeID, setEmployeeID] = useState(null);
  const [approved, setApproved] = useState("");

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(`/employees/check-role/${email}`);
        setEmployeeID(response.data.employee_ID);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        if (employeeID) {
          const leaveResponse = await axios.get("/employees/admin/leave");
          const empData = leaveResponse.data.filter(
            (data) => data.employee_ID === employeeID
          );
          setLeaveReport(empData);

          const empDataResponse = await axios.get(
            `/employees/admin/leave/${employeeID}`
          );
          setParticularEmpData(empDataResponse.data);
          // setIsLoading(true);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    fetchEmployeeData();
  }, [employeeID]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/leave/approved/${employeeID}`
        );
        setApproved(response.data);
      } catch (err) {
        console.warn(err.message);
      }
    };

    fetchLeaveData();
  }, [employeeID]);

  useEffect(() => {
    if (approved.length > 0) {
      setLeaveTaken(approved[0].leave.length);
    }
  }, [approved]);

  if (isLoading) {
    // return <div className="text-center py-4">Loading...</div>;
  }

  // const sickLeaveCount = approved[0]?.leave.reduce(
  //   (count, leave) => (leave.leaveType === "sick_leave" ? count + 1 : count),
  //   0
  // );

  return (
    <div className="mt-0 w-full xl:h-1/2 max-xl:w-full max-sm:w-full max-lg:h-full h-1/2 max-w-4xl mx-auto flex flex-col gap-3 bg-white">
      <p className="py-0 text-lg font-semibold text-[#444444] ">
        Leave Summary
      </p>
      <div className="grid w-full justify-between max-xl:text-sm grid-cols-3 gap-4 max-lg:p-2 h-full pb-10">
        <div className="flex flex-col items-center justify-between text-center p-4 bg-[#DCFFE5] gap-10 rounded-lg shadow-[0_0_5px_0] shadow-gray-300 h-full">
          <p className="text-gray-600 text-xl font-medium">
            Total Leave
          </p>
          <div className="text-6xl font-semibold mb-8">12</div>
        </div>
        <div className="flex flex-col items-center justify-between text-center p-4 bg-[#F1EAFF]  rounded-lg shadow-[0_0_5px_0] shadow-gray-300">
          <p className="text-gray-600 text-xl font-medium">
            Leave Taken
          </p>
          <div className="text-6xl font-semibold mb-8">{leaveTake}</div>
        </div>
        <div className="flex flex-col items-center justify-between text-center p-4 bg-[#FFF7DA] gap-20 rounded-lg shadow-[0_0_5px_0] shadow-gray-300">
          <p className="text-gray-600 text-xl font-medium">
            Leave Balance
          </p>
          <div className="text-6xl font-semibold mb-8">{12 - leaveTake}</div>
        </div>
      </div>
    </div>
  );
}

export default Leave_summery;
