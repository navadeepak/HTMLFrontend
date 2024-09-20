import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "./utilities/axiosInstance";
import avatar from "../assets/avatar.webp";
import { GrFormPrevious } from "react-icons/gr";
import logo from "../assets/logo.png";
import { AttendanceContext } from "../context/AttendanceContext";

const Details = () => {
  const { attendanceData } = useContext(AttendanceContext);
  const { employee_ID } = useParams();
  const [user, setUser] = useState("");
  const [lastPunch, setLastPunch] = useState();

  useEffect(() => {
    if (
      attendanceData &&
      attendanceData.response &&
      attendanceData.response[0] &&
      attendanceData.response[0].attendance
    ) {
      console.log(
        attendanceData.response[0].attendance[
          attendanceData.response[0].attendance.length - 1
        ].date
      );
      let last =
        attendanceData.response[0].attendance[
          attendanceData.response[0].attendance.length - 1
        ].date;
      let dateType = new Date(last);
      let formatedLast = `${dateType.getDate()}-${
        dateType.getMonth() + 1
      }-${dateType.getFullYear()}`;
      setLastPunch(formatedLast);
    }
  }, [attendanceData]);

  const current = new Date();
  const format = `${current.getDate()} - ${
    current.getMonth() + 1
  }, ${current.getFullYear()}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await axios.get(`/employees/${employee_ID}`);

        if (status !== 200) {
          throw new Error("Network response was not ok");
        }
        console.log(data);
        // Format dates directly while setting the user data
        setUser({
          ...data,
          birthdate: formatDate(data.birthdate),
          hireDate: formatDate(data.hireDate),
        });
      } catch (error) {
        console.error("Fetch Employee error:", error);
      }
    };

    fetchData();
  }, [employee_ID]);

  // Utility function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full px-5 py-5 justify-center items-center max-lg:overflow-scroll ">
      <div className="flex flex-col h-full w-full rounded-lg shadow-lg max-lg:overflow-scroll">
        <div className="w-full h-full flex flex-row items-center justify-between p-5 max-lg:flex-col bg-gradient-to-r from-[#D8EAF8] to-[#2891E6] gap-4 shadow-md rounded-3xl">
          <div className="flex flex-row max-xl:flex-col max-lg:w-full h-full items-center max-lg:justify-center gap-5">
            <div className="flex text-[--common-color] items-center justify-evenly flex-col max-xl:h-fit text-5xl max-sm:text-xl capitalize text-nowrap shadow-md border bg-gray-100 h-full p-5 rounded-2xl">
              <img src={logo} alt="" className="w-20 h-20 max-xl:hidden" />
              <p>{user.role}</p>
            </div>
            <div className="flex flex-row items-center gap-5 max-lg:flex-col">
              <div className="">
                <img
                  src={user.photoUpload || avatar}
                  alt={user.username}
                  className="h-40 w-40 max-lg:w-20 max-lg:h-20 rounded-full shadow-md ring-2 ring-[--common-color]"
                />
              </div>
              <div className="w-1/2 h-full max-lg:w-full max-lg:text-center max-lg:text-wrap">
                <h1 className="capitalize font-bold text-5xl max-md:text-3xl text-nowrap max-lg:text-wrap">
                  {user.username}
                </h1>
                <p className="text-black text-2xl max-md:text-xl font-medium text-nowrap max-lg:text-wrap">
                  {user.email}
                </p>
                <p className="text-black text-2xl max-md:text-xl font-medium text-nowrap max-lg:text-wrap">
                  {user.phoneNumber}
                </p>
                <p className="text-black text-xl max-md:text-xl text-nowrap max-lg:text-wrap">
                  {user.currentAddress}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-between gap-20 h-full w-fit items-center">
            <Link to="/auth/employee">
              <button className=" bg-white group/move text-[--common-color] p-1 px-4 rounded-lg flex flex-row items-center justify-evenly">
                <GrFormPrevious className="text-3xl font-semibold group-hover/move:-translate-x-2 duration-200" />
                <p>Back</p>
              </button>
            </Link>

            <div className="flex flex-col items-center justify-center"> 
              <label className="text-xl text-[#313131] font-medium">Last Punch</label>
              <p className="text-lg text-[#313131]">{lastPunch}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Details Table */}
        <div className="p-5 flex flex-row max-md:flex-col gap-2 justify-evenly max-md:w-full max-lg:h-full overflow-scroll max-lg:overflow-auto">
          <table className="shadow-md rounded-md overflow-hidden w-1/3 h-fit max-md:w-full">
            <thead className="bg-[--common-color] text-white">
              <tr>
                <th colSpan={2} className="py-2">
                  Company Info
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 max-md:w-full max-md:items-center max-md:justify-center flex text-nowrap">
                  Employee ID
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.employee_ID}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  User Name
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.username}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Work Role
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.birthdate}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Team
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.team}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Manager
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.manager}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Status
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.status}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Join Date
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.birthdate}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-1/3 shadow-md rounded-md overflow-hidden max-md:w-full">
            <thead className="bg-[--common-color] text-white">
              <tr>
                <th colSpan={2} className="py-2">
                  Personal Info
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Gender
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.gender}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Birth Date
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.birthdate}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Marital Status
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.maritalStatus}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Personal E-mail
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.personalEmail}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex max-md:text-wrap text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Secondary Phone Number
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.secondaryPhoneNumber}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Current Address
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.currentAddress}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Permanent Address
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.permanentAddress}
                  </p>
                </td>
              </tr>
              <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                  Emergency Contact
                </th>
                <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                  <span className="max-md:hidden">{": "}</span>
                  <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                    {user.emergencyContactNumber}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          {user.bank && (
            <table className="h-fit w-1/3 min-w-1/3 shadow-md rounded-md overflow-hidden max-md:w-full">
              <thead className="bg-[--common-color] text-white">
                <tr>
                  <th colSpan={2} className="py-2">
                    Bank Info
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                  <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                    Name
                  </th>
                  <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                    <span className="max-md:hidden">{": "}</span>
                    <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                      {user.bank.name}
                    </p>
                  </td>
                </tr>
                <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                  <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                    Account Number
                  </th>
                  <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                    <span className="max-md:hidden">{": "}</span>
                    <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                      {user.bank.accountNumber}
                    </p>
                  </td>
                </tr>
                <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                  <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                    IFSC Code
                  </th>
                  <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                    <span className="max-md:hidden">{": "}</span>
                    <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                      {user.bank.ifscCode}
                    </p>
                  </td>
                </tr>
                <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                  <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                    Branch
                  </th>
                  <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                    <span className="max-md:hidden">{": "}</span>
                    <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                      {user.bank.branch}
                    </p>
                  </td>
                </tr>
                <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                  <th className="px-6 py-3 text-lg font-medium text-black w-1/2 flex text-nowrap max-md:w-full max-md:items-center max-md:justify-center">
                    Bank Name
                  </th>
                  <td className="px-6 py-3 w-1/2 text-lg text-black font-bold max-md:w-full max-md:items-center max-md:justify-center max-md:flex flex flex-row">
                    <span className="max-md:hidden">{": "}</span>
                    <p className="  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md-text-wrap max-md:text-center">
                      {user.bank.bankName}
                    </p>
                  </td>
                </tr>
                <tr className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center flex flex-row">
                  <th
                    colSpan={2}
                    className="py-2 max-md:w-full max-md:items-center max-md:justify-center"
                  >
                    <h4 className=" text-start px-2">Passbook Image:</h4>
                    <img
                      src={`http://localhost:3001/images/${user.bank.img}`}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
