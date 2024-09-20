import React, { useEffect, useState } from "react";
import moment from "moment";
import userAvatar from "../assets/avatar.webp";
import axios from "../Components/utilities/axiosInstance";

const getStartAndEndDates = (weekType) => {
  const today = moment().startOf("day");
  let startDate, endDate;

  switch (weekType) {
    case "nextWeek":
      startDate = today.add(1, "weeks").startOf("week");
      endDate = today.add(1, "weeks").endOf("week");
      break;
    case "afterNextWeek":
      startDate = today.add(2, "weeks").startOf("week");
      endDate = today.add(2, "weeks").endOf("week");
      break;
    case "overall":
      startDate = moment().startOf("year");
      endDate = moment().endOf("year");
      break;
    default:
      startDate = today.startOf("week");
      endDate = today.endOf("week");
  }

  return { startDate, endDate };
};

function  EmployeeLeaveDetails({ employees = [] }) {
  const [selectedOption, setSelectedOption] = useState("thisWeek");
  const [approved, setApproved] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const { startDate, endDate } = getStartAndEndDates(selectedOption);

  useEffect(() => {
    const fetchApprovedData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees/leave/approved");
        setApproved(response.data.approvedLeaveRecords);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchApprovedData();
  }, []);

  useEffect(() => {
    // console.log(approved);
    
    const tempData = approved.flatMap((data) =>
      data.leaves.map((leave) => ({
        photo: "https://via.placeholder.com/100", // Placeholder for profile image
        name: data.username,
        emploee_Id:data.employee_ID, // You can replace this with dynamic data if available
        work_role: "Software Engineer",
        fromDate: leave.fromDate,
        toDate: leave.toDate,
      }))
    );
    setDisplayData(tempData);
    // console.log(tempData,"..........");
    
  }, [approved]);

  const filteredEmployees = employees.filter((employee) =>
    employee.leave?.some((leave) => {
      const leaveStartDate = moment(leave.fromDate);
      const leaveEndDate = moment(leave.toDate);
      return (
        leaveStartDate.isBetween(startDate, endDate, "day", "[]") ||
        leaveEndDate.isBetween(startDate, endDate, "day", "[]") ||
        (leaveStartDate.isBefore(startDate) && leaveEndDate.isAfter(endDate))
      );
    })
  );

  const overallLeaveDetails = employees.flatMap((employee) =>
    employee.leave?.map((leave) => ({
      name: employee.username,
      work_role: employee.work_role,
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      leaveType: leave.leaveType,
      leaveInfo: leave.leaveInfo,
      photo: employee.photoUpload,
    }))
  );

  const w1displayData =
    selectedOption === "overall"
      ? overallLeaveDetails
      : filteredEmployees.flatMap((employee) =>
          employee.leave.map((leave) => ({
            name: employee.username,
            work_role: employee.work_role,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            photo: employee.photoUpload,
          }))
        );

  return (
    <div className="h-full w-full max-lg:w-full max-sm:mb-5 max-sm:w-full max-sm:m-0 max-sm:p-5 max-lg:min-h-[300px] flex flex-col items-center overflow-scroll">
    <div className="w-full h-[40px] flex flex-row max-sm:flex-col max-sm:h-fit max-sm:p-1 justify-between items-center px-5 my-5">
      <h4 className="text-2xl font-medium flex justify-center text-center max-xl:text-sm">
        Employee on Leave
      </h4>
      <select
        className="rounded border bg-white shadow-md outline-none text-lg overflow-x-auto h-10"
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
      >
        <option value="overall">Overall Leave Details</option>
        <option value="thisWeek">This week</option>
        <option value="nextWeek">Next week</option>       
      </select>
    </div>
  
    <div className="w-full">
      <div className="py-0 grid grid-cols-4 max-lg:grid-cols-1 max-xl:grid-cols-2 max-md:grid-cols-1 overflow-y-auto w-full gap-5">
        {displayData.length > 0 ? (
          displayData.map((data, index) => (
            <div key={index}>
              <div className="relative w-full h-[450px] p-5 pt-0 flex bg-white flex-col border-[0.5px] overflow-hidden border-[--bg-gray] shadow-md rounded-md justify-evenly items-center duration-300 group">
                <div className="w-[150px] h-[150px] bg-[#e5e6eb] opacity-45 rounded-full absolute -top-20 -left-20"></div>
                <div className="w-[150px] h-[150px] bg-[#E5E6EB] opacity-45 rounded-full absolute -bottom-20 -right-20"></div>
                <div className="w-full flex flex-col items-center justify-evenly my-4">
                  <img
                    src={data?.photo || userAvatar}
                    alt="Profile"
                    className="rounded-full w-[100px] my-4 h-[100px] shadow-md"
                  />
                  <p className="text-2xl flex flex-col items-center text-center w-full text-black my-0">
                    <span className="text-black capitalize te mt-3">{data?.name}</span>
                    <span className="text-black capitalize mt-3">{data?.emploee_Id}</span>
                    <span className="text-[--gray] w-full px-10 pt-5 text-lg">
                      {data?.work_role}
                    </span>
                  </p>
                </div>
                <p className="text-base font-semibold gap-0 mb-4 text-gray-700 w-full flex flex-col items-center justify-center text-center">
                  <span className="font-light text-lg text-[#444444]">From / To Date</span>
                  <span className="text-xl">
                    {data?.fromDate} / {data?.toDate}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No records found</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default EmployeeLeaveDetails;
