import axios from "../../Components/utilities/axiosInstance";
import React, { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";

function EmployeeLeaveReport() {
  const { employee, tryfun, tasklist } = useEmployeeContext();
  const [empLeaves, setEmpLeaves] = useState();

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

  return (
    <div className=" h-[250px] rounded-md shadow-md overflow-scroll">
      <table className="text-center w-full bg-white rounded-md overflow-scroll max-lg:overflow-scroll">
        <thead className="sticky top-0 bg-white rounded-md">
          <tr className="bg-[#efefef] text-[12px] rounded">
            <td className="text-lg h-[50px] text-nowrap text-[#444444] font-semibold">
              From Date
            </td>
            <td className="text-lg h-[50px] text-nowrap text-[#444444] font-semibold">
              To Date
            </td>
            <td className="text-lg h-[50px] text-nowrap text-[#444444] font-semibold">
              Leave Type
            </td>
            <td className="text-lg h-[50px] text-nowrap text-[#444444] font-semibold">
              Reason
            </td>
            <td className="text-lg h-[50px] text-nowrap text-[#444444] rounded-tr-md font-semibold">
              Status
            </td>
          </tr>
        </thead>
        <tbody>
          {empLeaves?.leaves?.map((leave, i) => (
            <tr key={i} className="border-b">
              <td className="text-lg text-nowrap px-2 h-[50px] font-semibold">
                {leave.fromDate}
              </td>
              <td className="text-lg text-nowrap px-2 h-[50px] font-semibold">
                {leave.toDate}
              </td>
              <td className="capitalize text-lg text-nowrap px-2 h-[50px]  font-semibold">
                {leave.leaveType}
              </td>
              <td className="text-lg text-nowrap px-2 h-[50px]  font-semibold">
                {leave.leaveInfo}
              </td>
              <td
                className={`text-lg text-nowrap px-2 h-[50px]  font-semibold text-[12px]`}
              >
                <p
                className={`${
                  leave.leaveStatus === "Approved"
                    ? "bg-green-200 text-green-500"
                    : ""
                } ${
                  leave.leaveStatus === "rejected"
                    ? "bg-red-200 text-red-500"
                    : ""
                } ${
                  leave.leaveStatus === "Pending" ? " text-[--gray]" : ""
                } w-full rounded-lg`}
                >{leave.leaveStatus}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeLeaveReport;
