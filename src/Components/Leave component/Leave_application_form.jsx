import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../custom css/Leave_application_form.css";

function LeaveApplicationForm() {
  const [role, setRole] = useState("");
  const [employee_ID, setEmployee_ID] = useState("");
  const [userName, setUserName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    leaveInfo: "",
    leaveStatus: "Pending",
  });

  const handleRadioChange = (e) => {
    setLeaveData((prevData) => ({
      ...prevData,
      leaveType: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/check-role/${email}`
        );
        const { role, employee_ID, username } = response.data;
        setRole(role.toLowerCase());
        setEmployee_ID(employee_ID);
        setUserName(username);
      } catch (error) {
        toast.error("Error fetching user role");
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  useEffect(() => {
    console.log(employee_ID);
  }, [employee_ID]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    // You can perform validation checks here
    if (!leaveData.leaveType || !leaveData.fromDate || !leaveData.toDate) {
      toast.error("Make sure to fill in all the required fields");
      return;
    }
    console.log(leaveData);

    try {
      const response = await axios.patch(
        `http://localhost:3001/employees/leaveobj/${employee_ID}`,
        {
          leave: [leaveData], // Send leaveData object as part of the request body
        }
      );

      console.log("Response:", response.data); // Log the response data to the console
      toast.success("Request sent!");
      setLeaveData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        leaveInfo: "",
        leaveStatus: "Pending",
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      ); // Log the error to the console
      toast.error("Failed to submit form");
    }
  };

  const handleCancel = () => {
    setLeaveData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      leaveInfo: "",
      leaveStatus: "Pending",
    });
    toast.success("Form has been reset"); // Add toast message here
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="h-full w-full flex flex-col my-0 p-0 bg-white max-lg:h-fit"
    >
      <div className="flex flex-col gap-6 max-xl:gap-3 p-0 max-lg:w-full max-lg:h-fit">
        <div className="flex gap-6 max-lg:flex-col max-lg:w-full">
          <div className="flex gap-2 flex-col w-1/2 max-lg:w-full">
            <label
              htmlFor="empid"
              className="block text-lg font-semibold text-gray-700"
            >
              Reporting Manager
            </label>
            <input
              type="text"
              id="empid"
              value={"Saravanan"}
              disabled
              className="border rounded-lg shadow-[0_0_5px_0] shadow-gray-300 h-14 p-2 bg-white text-gray-500 text-lg  w-full mt-1"
            />
          </div>

          <div className="flex gap-2 flex-col w-1/2 max-lg:w-full">
            <label
              htmlFor="empname"
              className="block text-lg font-semibold text-gray-700"
            >
              Leave Left
            </label>
            <p
              type="text"
              id="empname"
              value={userName}
              disabled
              className="border rounded-lg shadow-[0_0_5px_0] shadow-gray-300 h-14 px-2 flex items-center bg-white text-gray-500 w-full mt-1"
            >
              {`You have ${"10"} Leave in Your Leaves`}
            </p>
          </div>
        </div>
        <div className="flex gap-6 max-lg:w-full">
          <div className="flex gap-2 flex-col w-full">
            <label
              htmlFor="reson"
              className="block text-lg font-semibold text-gray-700"
            >
              Leave Type
            </label>
            <div className="flex flex-row items-center gap-5 shadow-[0_0_5px_0] shadow-gray-300 max-md:flex-col min-h-14 max-lg:w-full rounded-lg">
              <div className="flex flex-row justify-between items-center gap-2 w-full px-1 max-md:grid max-md:grid-cols-2">
                <div className="flex items-center gap-2 max-md:justify-center">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Sick leave"
                    checked={leaveData.leaveType === "Sick leave"} // Access leaveType from leaveData
                    onChange={handleRadioChange} // Handle change event
                  />
                  <label>Sick Leave</label>
                </div>
                <div className="flex items-center gap-2 max-md:justify-center">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Casual leave"
                    checked={leaveData.leaveType === "Casual leave"}
                    onChange={handleRadioChange}
                  />
                  <label>Casual Leave</label>
                </div>
                <div className="flex items-center gap-2 max-md:justify-center">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Paid leave"
                    checked={leaveData.leaveType === "Paid leave"}
                    onChange={handleRadioChange}
                  />
                  <label>Paid Leave</label>
                </div>
                <div className="flex items-center gap-2 max-md:justify-center">
                  <input
                    type="radio"
                    name="leaveType"
                    value="Annual leave"
                    checked={leaveData.leaveType === "Annual leave"}
                    onChange={handleRadioChange}
                  />
                  <label>Annual Leave</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 max-xl:flex-col max-xl:gap-0 max-lg:w-full">
          <div className="flex flex-row items-center justify-between gap-6 max-lg:flex-col max-lg:w-full">
            <div className="w-1/2 flex gap-2 flex-col max-lg:w-full">
              <label
                htmlFor="fromDate"
                className="block text-lg font-semibold text-gray-700"
              >
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate" // Add name attribute
                value={leaveData.fromDate} // Use leaveData fromDate
                onChange={handleInputChange} // Handle change event
                min={today}
                className="border rounded-lg shadow-[0_0_5px_0] shadow-gray-300 p-2 h-14 bg-white w-full"
              />
            </div>
            {/* <div className="flex flex-col w-1/2 gap-2 max-lg:w-full">
              <label
                htmlFor=""
                className="block text-lg font-semibold text-gray-700"
              >
                Day Type
              </label>
              <div className="flex flex-row justify-between gap-5 h-14 border rounded-lg shadow-[0_0_5px_0] shadow-gray-300 px-5 max-lg:flex-col max-lg:h-fit">
                <div className="flex flex-row gap-2">
                  <input type="radio" name="fdate" />
                  <label
                    htmlFor=""
                    className="h-full flex items-center justify-center"
                  >
                    Full day
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input type="radio" name="fdate" />
                  <label
                    htmlFor=""
                    className="h-full flex items-center justify-center"
                  >
                    First Half
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input type="radio" name="fdate" />
                  <label
                    htmlFor=""
                    className="h-full flex items-center justify-center"
                  >
                    Second Half
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex flex-row items-center justify-between gap-6 max-lg:flex-col max-lg:w-full">
            <div className="w-1/2 flex gap-2 flex-col max-lg:w-full">
              <label
                htmlFor="toDate"
                className="block text-lg font-semibold text-gray-700"
              >
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate" // Add name attribute
                value={leaveData.toDate} // Use leaveData toDate
                onChange={handleInputChange} // Handle change event
                min={today}
                className="border rounded-lg shadow-[0_0_5px_0] shadow-gray-300 p-2 h-14 bg-white w-full"
              />
            </div>
            {/* <div className="flex flex-col w-1/2 gap-2 max-lg:w-full">
              <label
                htmlFor=""
                className="block text-lg font-semibold text-gray-700"
              >
                Day Type
              </label>
              <div className="flex flex-row justify-between gap-5 h-14 border rounded-lg shadow-[0_0_5px_0] shadow-gray-300 px-5 max-lg:flex-col max-lg:h-fit">
                <div className="flex flex-row gap-2">
                  <input type="radio" name="tdate" />
                  <label
                    htmlFor=""
                    className="h-full flex items-center justify-center"
                  >
                    Full day
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input type="radio" name="tdate" />
                  <label
                    htmlFor=""
                    className="h-full flex items-center justify-center"
                  >
                    First Half
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input type="radio" name="tdate" />
                  <label
                    htmlFor=""
                    className="h-full flex items-center justify-center"
                  >
                    Second Half
                  </label>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label
            htmlFor="explain"
            className="block text-lg font-semibold text-gray-700"
          >
            Reason For Leave
          </label>
          <textarea
            id="leaveInfo"
            name="leaveInfo"
            value={leaveData.leaveInfo}
            onChange={handleInputChange}
            className="border-[1px] border-[--bg-gray] h-28 outline-[#555555] shadow-[0_0_5px_0] shadow-gray-300 p-2 bg-white text-gray-500 resize-none rounded-md w-full mt-1"
          />
        </div>
        <div className="flex justify-center gap-10">
          <button
            type="submit"
            // disabled={!isFormValid}
            className={`bg-[--common-color] text-white font-bold py-2 px-4 rounded-md w-36 `}
          >
            Apply Leave
          </button>
          <button
            onClick={() => handleCancel()}
            type="button"
            className="w-36 border rounded-md py-2 px-4 shadow-[0_0_5px_0] shadow-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default LeaveApplicationForm;
