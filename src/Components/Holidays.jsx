import React, { useEffect, useState } from "react";
import axios from "./utilities/axiosInstance";
import { Close, MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAllEmployeeContext } from "../context/AllEmployeeContext";

function Holidays() {
  const [daysData, setDaysData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numHolidays, setNumHolidays] = useState({
    year: "",
    month: "",
    govt: "",
    office: "",
  });
  const [holidayDetails, setHolidayDetails] = useState({
    govt: [],
    office: [],
  });
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonthNO, setSelectedMonthNo] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  
  const {
    pendingTicketsLength,
    pendingLeavesLength,
    monthBirthDays,
    holiday
  } = useAllEmployeeContext();


  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3001/days/get");
    //     setDaysData(response.data.response);
    //     setLoading(false);
    //   } catch (err) {
    //     setError(err.message || "Something went wrong");
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    if(holiday) {
       setDaysData(holiday)
      setLoading(false);
    }
  }, [holiday]);

  const [role, setRole] = useState();
  const email = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`employees/check-role/${email}`);
        setRole(response.data.role.toLowerCase());
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };
    fetchUserRole();
  }, [email]);

  const handleNumHolidaysChange = (e, type) => {
    const value = e.target.value;
    if (value === "") {
      setNumHolidays((prev) => ({ ...prev, [type]: "" }));
      setHolidayDetails((prev) => ({ ...prev, [type]: [] }));
      return;
    }
    const number = parseInt(value);
    if (isNaN(number) || number < 0 || number > 20) return;
    setNumHolidays((prev) => ({ ...prev, [type]: number }));
    setHolidayDetails((prev) => ({
      ...prev,
      [type]: Array(number).fill({ name: "", date: "" }),
    }));
  };

  const handleHolidayDetailChange = (index, field, value, type) => {
    const updatedDetails = [...holidayDetails[type]];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setHolidayDetails((prev) => ({
      ...prev,
      [type]: updatedDetails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedHolidays = [
      ...holidayDetails.govt.map((detail) => ({
        date: detail.date,
        name: detail.name,
        type: "Govt",
      })),
      ...holidayDetails.office.map((detail) => ({
        date: detail.date,
        name: detail.name,
        type: "Office",
      })),
    ];
    const data = {
      year: numHolidays.year,
      month: numHolidays.month,
      govtHolidays: numHolidays.govt,
      officeHolidays: numHolidays.office,
      holidays: formattedHolidays,
    };
    try {
      const response = await axios.post("http://localhost:3001/days/new", data);
      alert("Holidays added successfully!");
      console.log(response);
    } catch (err) {
      console.error(err.message || "Failed to add holidays");
    }
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setNumHolidays((prev) => ({ ...prev, month: selectedMonth }));
    const monthIndex = months.findIndex((mon) => mon === selectedMonth) + 1;
    setSelectedMonthNo(monthIndex);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const handleDetails = (monthName) => {
    setDetailsOpen(true);
    daysData.forEach((e) => {
      if (e.month === monthName) {
        setSelectedMonth(e);
      }
    });
  };

  return (
    <div className={`mt-0 mb-0`}>
      <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">
            Holidays
          </p>
        </span>
      </p>

      <div className="gap-2 rounded-xl p-5">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form
          className={`h-fit w-full shadow-[0_0_5px_0] shadow-gray-300 rounded-xl m-0 p-5 flex flex-col gap-5 ${
            role === "admin" ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col w-full gap-5">
            <p className="text-[--common-color] text-3xl">Add Holiday</p>
            <div className="flex flex-row max-xl:grid max-xl:grid-cols-2 max-xl:w-full xl:w-3/4 max-sm:flex-col max-sm:w-full items-center gap-5 justify-between text-[#444444] w-1/3 px-5 max-md:px-0">
              <div className="flex flex-col w-full gap-3">
                <label className="text-xl max-md:text-lg text-nowrap text-[#444444] font-medium">
                  Year
                </label>
                <input
                  type="number"
                  value={numHolidays.year}
                  onChange={(e) =>
                    setNumHolidays((prev) => ({
                      ...prev,
                      year: e.target.value,
                    }))
                  }
                  className="shadow-[0_0_3px_0] max-md:text-base shadow-gray-400 rounded-md h-12 p-5 text-xl opacity-80"
                  placeholder="Enter year"
                />
              </div>
              <div className="flex flex-col w-full gap-3">
                <label className="text-xl max-md:text-lg text-[#444444] text-nowrap font-medium">
                  Months
                </label>
                <select
                  name="work_role"
                  value={numHolidays.month}
                  onChange={handleMonthChange}
                  className="py-3 bg-white max-md:text-base flex outline-none font-medium text-lg text-[#444444] border-2 rounded-md"
                >
                  <option value="">Select Month</option>
                  {months.map((mon, index) => (
                    <option key={index} value={mon}>
                      {mon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label className="text-xl max-md:text-lg text-nowrap text-[#444444] font-medium">
                  Govt. Holidays
                </label>
                <input
                  type="number"
                  value={numHolidays.govt}
                  onChange={(e) => handleNumHolidaysChange(e, "govt")}
                  className="shadow-[0_0_3px_0] max-md:text-base shadow-gray-400 rounded-md h-12 p-5 text-xl opacity-80"
                  placeholder="Enter Holiday"
                  min="0"
                  max="20"
                />
              </div>
              <div className="flex flex-col w-full gap-3">
                <label className="text-xl max-md:text-lg text-[#444444] text-nowrap font-medium">
                  Office Holidays
                </label>
                <input
                  type="number"
                  value={numHolidays.office}
                  onChange={(e) => handleNumHolidaysChange(e, "office")}
                  min="0"
                  max="20"
                  className="shadow-[0_0_3px_0] max-md:text-base shadow-gray-400 rounded-md h-12 p-5 text-xl opacity-80"
                  placeholder="Enter Holiday"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-full">
            <div className="grid grid-cols-5 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-4 mt-4 overflow-scroll p-5 w-full">
              {["office", "govt"].map((type) =>
                Array.from({ length: numHolidays[type] }).map((_, index) => (
                  <div
                    key={`${type}-${index}`}
                    className="flex flex-col gap-2 shadow-[0_0_5px_0] shadow-gray-300 p-5 rounded-lg border-t-8 border-[--common-color]"
                  >
                    <label>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Holiday
                      Name
                    </label>
                    <input
                      type="text"
                      value={holidayDetails[type][index]?.name || ""}
                      onChange={(e) =>
                        handleHolidayDetailChange(
                          index,
                          "name",
                          e.target.value,
                          type
                        )
                      }
                      className="shadow-[0_0_3px_0] shadow-gray-400 rounded-md h-12 p-5 text-xl opacity-80"
                      placeholder="Holiday Name"
                    />
                    <label>Date</label>
                    <input
                      type="date"
                      min={`${numHolidays.year}-${String(
                        selectedMonthNO
                      ).padStart(2, "0")}-01`}
                      max={`${numHolidays.year}-${String(
                        selectedMonthNO
                      ).padStart(2, "0")}-${getDaysInMonth(
                        numHolidays.year,
                        selectedMonthNO
                      )}`}
                      value={holidayDetails[type][index]?.date || ""}
                      onChange={(e) =>
                        handleHolidayDetailChange(
                          index,
                          "date",
                          e.target.value,
                          type
                        )
                      }
                      className="shadow-[0_0_5px_0] rounded-md shadow-gray-300 border h-12 p-5"
                    />
                  </div>
                ))
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[--common-color] text-white w-fit max-md:w-full py-2 px-5 rounded-lg mt-5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full p-5">
        {detailsOpen && (
          <div className="w-full flex flex-col mt-5 gap-3">
            <p className="text-xl font-semibold px-5">
              {selectedMonth.monthName}
            </p>
            <div className="flex flex-wrap gap-2 px-5">
              {days.map((day) => (
                <div key={day} className="p-3 bg-gray-100 rounded-md shadow-md">
                  <p className="text-lg font-medium">{day}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="shadow-[0_0_5px_0] shadow-gray-300 rounded-xl overflow-scroll mt-5">
            <table className="min-w-full bg-white border-gray-200">
              <thead className="bg-[#efefef]">
                <tr>
                  <th className="py-2 px-4 border-b w-1/5">Month</th>
                  <th className="py-2 px-4 border-b w-1/5">Govt. Holidays</th>
                  <th className="py-2 px-4 border-b w-1/5">Office Holidays</th>
                  <th className="py-2 px-4 border-b w-1/5">Total Holiday</th>
                  <th className="py-2 px-4 border-b w-1/5">Details</th>
                </tr>
              </thead>
              <tbody>
                {daysData.map((day, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b w-1/5 text-center">
                      {day.month}
                    </td>
                    <td className="py-2 px-4 border-b w-1/5 text-center">
                      {day.govtHolidays}
                    </td>
                    <td className="py-2 px-4 border-b w-1/5 text-center">
                      {day.officeHolidays}
                    </td>
                    <td className="py-2 px-4 border-b w-1/5 text-center">
                      {day.govtHolidays + day.officeHolidays}
                    </td>
                    <td className="py-2 px-4 border-b w-1/5 text-center ">
                      <button onClick={() => handleDetails(day.month)}>
                        {/* <button onClick={() => setDetailsOpen(true)}> */}
                        <MoreHoriz />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className={`fixed ${
                detailsOpen === true ? "flex" : "hidden"
              } h-screen w-screen bg-black bg-opacity-40 top-0 left-0 flex items-center justify-center`}
            >
              <div className="w-[600px] max-2xl:h-[80vh] max-sm:w-full bg-white rounded-xl p-5 ">
                <div className="flex flex-row items-center justify-between border-b-2 border-[--common-color] pb-5 pt-3">
                  <p className="text-2xl max-sm:text-xl font-medium text-[#444444]">
                    {"Holidays"}
                  </p>
                  <button onClick={() => setDetailsOpen(false)}>
                    <Close />
                  </button>
                </div>
                <div className="overflow-scroll flex flex-col h-[500px] max-lg:h-[300px]">
                  {selectedMonth &&
                    selectedMonth?.holidays.map((data, key) => (
                      <div className=" h-20 flex items-center my-5">
                        <div className="w-full h-16 bg-[#FFE599] flex items-center px-5 justify-between">
                          <div className="w-1/6 h-20 bg-[#F1C232] flex text-center flex-col text-white justify-center text-xl font-semibold">
                            {console.log(
                              months[new Date(data.date).getMonth() + 1]
                            )}
                            <p>
                              {new Date(data.date).toLocaleString("en-US", {
                                month: "short",
                              })}
                            </p>
                            <p>{new Date(data.date).getDate()}</p>
                          </div>
                          <div className="w-1/2">
                            <p className="text-xl max-sm:text-base font-semibold text-[#444444] text-start">
                              {data.name}
                            </p>
                          </div>
                          <div className="border-l border-white h-full flex items-center justify-center max-sm:w-12 w-28 pl-5">
                            <p className="text-xl max-sm:text-base font-semibold text-[#444444]">
                              {days[new Date(data.date).getDay()]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Holidays;
