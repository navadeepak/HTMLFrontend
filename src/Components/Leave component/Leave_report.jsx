// import React, { useEffect, useState } from "react";
// import axios from "../utilities/axiosInstance";
// import { toast } from "react-hot-toast";
// import "../custom css/primeReactComponentOverWritedStyle.css";
// import "../custom css/colors.css";
// import { RiSearchLine } from "react-icons/ri";
// import { IoAlertCircleOutline } from "react-icons/io5";

// // import { useDispatch } from "react-redux";
// // import { receiveData } from "../../redux/slices/employeeLeaveDataSlice";

// import { TabView, TabPanel } from "primereact/tabview";
// import EmployeeLeaveReport from "./EmployeeLeaveReport";

// function LeaveReport() {
//   const [role, setRole] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [leaveData, setLeaveData] = useState([]);
//   // const [visible, setVisible] = useState(false);
//   const [employee_ID, setEmployee_ID] = useState("");

//   const [empName, setEmpName] = useState("");
//   const [workRole, setWorkRole] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [leaveType, setLeaveType] = useState("");
//   const [reason, setReason] = useState("");
//   const [leaveStatus, setStatus] = useState("");
//   const [particularEmpData, setParticularEmpData] = useState({});

//   const [rejectedEmployees, setRejectedEmployees] = useState([]);

//   const [approved, setApproved] = useState([]);

//   const [pending, setPending] = useState([]);

//   const [pendingFilter, setPendingFilter] = useState("");
//   const [approvedFilter, setApprovedFilter] = useState("");
//   const [rejectedFilter, setRejectedFilter] = useState("");
//   const [userDetails, setUserDetails] = useState("");

//   useEffect(() => {
//     const fetchUserRole = async (email) => {
//       try {
//         const response = await axios.get(`/employees/check-role/${email}`);
//         const {
//           role,
//           employee_ID,
//           username,
//           work_role,
//           fromDate,
//           toDate,
//           leaveType,
//           leaveInfo,
//           leaveStatus,
//         } = response.data;
//         setRole(role);
//         setEmployee_ID(employee_ID);
//         setEmpName(username);
//         setWorkRole(work_role);
//         setFromDate(fromDate);
//         setToDate(toDate);
//         setLeaveType(leaveType);
//         setReason(leaveInfo);
//         setStatus(leaveStatus);
//         setIsLoading(false);
//         setUserDetails(response.data);
//         // Set loading to false after setting state
//       } catch (error) {
//         //console.error("Error fetching user role:", error.message);
//       }
//     };

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.email) {
//       fetchUserRole(user.email);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchAllLeaveData = async () => {
//       try {
//         const response = await axios.get(`/employees/leaves/getall`);
//         setLeaveData(response.data);
//         // console.log(response.data, "response:::::::::::::::");
//       } catch (error) {
//         console.error("Error fetching leave data:", error.message);
//       }
//     };

//     fetchAllLeaveData();
//   }, []);

//   useEffect(() => {
//     // Define the function to fetch the data
//     const fetchApprovedData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/employees/leave/approved"
//         );
//         // console.log(response.data);
//         setApproved(response.data.approvedLeaveRecords);
//         // setLoading(false);
//       } catch (err) {
//         console.log(err);
//         // setLoading(false);
//       }
//     };
//     const fetchPendingData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/employees/leave/pending");
//         // console.log(response.data);
//         setPending(response.data.pendingLeaveRecords);
//         // setLoading(false);
//       } catch (err) {
//         console.log(err);
//         // setLoading(false);
//       }
//     };

//     const fetchEmployeesWithRejectedLeave = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/employees/leave/rejected"
//         );
//         setRejectedEmployees(response.data.rejectedLeaveRecords);
//         console.log("rejected employees", response.data.rejectedLeaveRecords);
//       } catch (error) {
//         console.warn("error in fetching rejected employees", error.message);
//         // setLoading(false);
//       }
//     };

//     fetchEmployeesWithRejectedLeave();
//     fetchPendingData();
//     fetchApprovedData();
//   }, []);

//   // useEffect(()=>{
//   //   console.log(approved
//   //   );

//   // },[approved])

//   useEffect(() => {
//     const fetchEmployeeLeaveData = async () => {
//       try {
//         if (employee_ID) {
//           // //console.log("empID:", employee_ID);
//           const response = await axios.get(
//             `/employees/admin/leave/${employee_ID}`
//           );
//           setParticularEmpData(response.data);
//         }
//       } catch (error) {
//         //console.error("Error fetching employee leave data:", error.message);
//         toast.error("Error fetching employee leave data");
//       }
//     };

//     fetchEmployeeLeaveData();
//   }, [employee_ID]);

//   if (isLoading) {
//     return <div>Loading....</div>;
//   }

//   let srNo = 1;
//   let rej_SrNo = 1;
//   let appr_SrNo = 1;

//   const handleFilterChange = (e, setFilter) => {
//     setFilter(e.target.value);
//   };

//   const filterData = (data, filter) => {
//     // console.log(data, filter, "test............");

//     return data.approvedLeaveRecords?.filter((record) =>
//       record.leave?.some(
//         (leave) =>
//           record.employee_ID.includes(filter) ||
//           record.username.includes(filter)
//       )
//     );
//   };

//   // Filtered data
//   const filteredPending = filterData(pending, pendingFilter);
//   const filteredApproved = filterData(approved, approvedFilter);
//   const filteredRejected = filterData(rejectedEmployees, rejectedFilter);

//   const handleDeny = async (arg, id) => {
//     console.log("click Deny - ", id, arg);

//     try {
//       const response = await axios.patch(
//         `http://localhost:3001/employees/leaveobj/${id}`,
//         {
//           leave: [{
//             leaveStatus:"rejected",
//             leave_ID: arg.leave_ID

//           }] // Send leaveData object as part of the request body
//         }
//       );

//       console.log('Response:', response.data); // Log the response data to the console
//       toast.success("Rejected");
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message); // Log the error to the console
//       toast.error("Failed to submit form");
//     }

//   };

//   const handleApprove = async (arg, id) => {
//     console.log("click Approve - ", id, arg);
//     try {
//       const response = await axios.patch(
//         `http://localhost:3001/employees/leaveobj/${id}`,
//         {
//           leave: [{
//             leaveStatus:"Approved",
//             leave_ID: arg.leave_ID

//           }] // Send leaveData object as part of the request body
//         }
//       );

//       console.log('Response:', response.data); // Log the response data to the console
//       toast.success("Approved");
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message); // Log the error to the console
//       toast.error("Failed to submit form");
//     }

//   };

//   const dateFormat=(data)=>{

//     const date=new Date(data)

//     const formatedDate=`${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`

//     return formatedDate;

//   }

//   return (
//     <div className=" w-full px-0">
//       <p
//         className={`bg-[--common-color] text-white rounded-lg shadow-md w-full p-2 m-auto text-center ${
//           role === "admin" ? "hidden" : "block"
//         }`}
//       >
//         Leave Report
//       </p>
//       <div
//         className={`w-full ${
//           role !== "admin" ? "max-md:m-0" : ""
//         } px-0 py-3 flex flex-col items-end justify-evenly border rounded-xl shadow-[0_0_5px_0] shadow-gray-300 border-gray-300`}
//       >
//         <div className="overflow-y-auto  w-full ">
//           {/* Admin View */}

//           <div
//             className={
//               role.toLowerCase() === "employee"
//                 ? "hidden"
//                 : "block  rounded-lg shadow-md w-full"
//             }
//           >
//             {/* start */}

//             <TabView>
//               <TabPanel
//                 header="Pending"
//                 headerClassName="text-lg text-gray-500 mx-0 flex items-center justify-center rounded-md py-2 max-sm:w-fit"
//               >
//                 <div className="px-5 max-sm:flex max-sm:items-center justify-center max-sm:flex-col">
//                   <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2  rounded-md w-[278px] flex flex-row items-center justify-evenly">
//                     <input
//                       type="text"
//                       placeholder="Filter by Employee ID or Name"
//                       value={pendingFilter}
//                       onChange={(e) => handleFilterChange(e, setPendingFilter)}
//                       className={`h-full outline-none w-full`}
//                     />
//                     <RiSearchLine
//                       className={`w-[25px] h-[25px] text-gray-400`}
//                     />
//                   </div>
//                   <div className="w-full bg-white rounded-md py-5">
//                     <div className="w-full h-16 shadow-md border bg-white max-lg:hidden rounded-md justify-between items-center flex-row flex px-5">
//                       <p className="flex w-fit items-center gap-5 text-xl">
//                         <IoAlertCircleOutline className="text-[#E60000]" />
//                         Deepak was absent on 01 Sep 2024 without any intimation
//                       </p>
//                       <button className="w-fit border shadow-md text-[--common-color] flex items-center px-5 p-1 rounded-md">
//                         Remainder
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-5 mt-5 w-full">
//                       {pending?.map((data) =>
//                         data.leaves.map((secondarydata) => (
//                           <div
//                             key={secondarydata.id} // Ensure each element has a unique key
//                             className="w-full h-60 border rounded-lg flex flex-col md:flex-row p-5 gap-5 md:items-center md:justify-center md:text-center"
//                           >
//                             <div className="w-full md:w-1/2 flex flex-col gap-8">
//                               <p className="flex flex-col">
//                                 <span className="text-xl font-medium capitalize">{empName}</span>
//                                 <span className="text-xl font-semibold">{data.employee_ID}</span>
//                                 <span className="text-lg">{workRole}</span>
//                               </p>
//                               <p className="text-3xl font-semibold">{secondarydata.leaveInfo}</p>
//                               <p>
//                                 {dateFormat(secondarydata?.fromDate)} / {dateFormat (secondarydata.toDate)}
//                               </p>
//                             </div>
//                             <div className="w-full md:w-1/2 flex flex-col gap-5">
//                               <div className="flex flex-row items-center justify-between gap-5">
//                                 <p className="px-2 p-1 rounded-md text-[--common-color] border">
//                                   {secondarydata.leaveType}
//                                 </p>
//                                 <p className="px-5 p-1 rounded-md text-[--common-color] border">2 Days</p>
//                               </div>
//                               <div className="flex flex-row items-center justify-between gap-5">
//                                 <button
//                                   onClick={() => handleDeny(secondarydata, data.employee_ID)}
//                                   className="px-5 p-1 rounded-md text-[--common-color] border shadow-md"
//                                 >
//                                   Deny
//                                 </button>
//                                 <button
//                                   onClick={() => handleApprove(secondarydata, data.employee_ID)}
//                                   className="bg-[#E2EFFF] px-5 p-1 rounded-md text-[--common-color] shadow-md"
//                                 >
//                                   Approve
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </TabPanel>
//               <TabPanel
//                 header="Approved"
//                 headerClassName=" text-lg text-[--blue] mx-0 flex items-center justify-center shadow-none rounded-md py-2 max-sm:w-fit"
//               >
//                 <div className="max-sm:overflow-hidden">
//                   <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-5 mx-5 rounded-md w-[278px] flex flex-row items-center justify-evenly">
//                     <input
//                       type="text"
//                       placeholder="Filter by Employee ID or Name"
//                       value={approvedFilter}
//                       onChange={(e) => handleFilterChange(e, setApprovedFilter)}
//                       className={`h-full outline-none w-full`}
//                     />
//                     <RiSearchLine
//                       className={`w-[25px] h-[25px] text-gray-400`}
//                     />
//                   </div>
//                   <div className="overflow-scroll">
//                     <table className="text-center max-lg:min-w-[700px] w-full bg-white h-[10vh] max-lg:overflow-scroll">
//                       <thead className="sticky top-0 bg-white">
//                         <tr className=" bg-[#EFEFEF] text-black text-lg font-semibold px-2 py-1">
//                           <td className=" max-lg:text-nowrap text-lg h-[50px]">
//                             Sr.No
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Emp ID
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Emp Name
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             From Date
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             To Date
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Leave Type
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Reason
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Status
//                           </td>
//                         </tr>
//                       </thead>
//                       <tbody className="h-[50px]">
//                         {approved?.map((record, index) =>
//                           record.leaves.map((leave, leaveIndex) => (
//                             <tr
//                               key={`${index}-${leaveIndex}`}
//                               className="h-[50px] text-black"
//                             >
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {appr_SrNo++}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {record.employee_ID}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {record.username}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {dateFormat(leave.fromDate)}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {dateFormat(leave.toDate)}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {leave.leaveType}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {leave.leaveInfo}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 <div className="w-full h-full card flex justify-center overflow-hidden">
//                                   <p
//                                     className={`${
//                                       leave.leaveStatus === "Approved" ||
//                                       leave.leaveStatus === "Rejected"
//                                         ? "block"
//                                         : "hidden"
//                                     } flex items-center justify-center w-full h-full ${
//                                       leave.leaveStatus === "Approved"
//                                         ? "text-green-500"
//                                         : "text-red-500"
//                                     }`}
//                                   >
//                                     {leave.leaveStatus}
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </TabPanel>
//               <TabPanel
//                 header="Rejected"
//                 headerClassName=" text-lg text-[--red-button] mx-0 flex items-center justify-center shadow-none focus:bg-red-500 rounded-md py-2"
//               >
//                 <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-5 mx-5 rounded-md w-[278px] flex flex-row items-center justify-evenly">
//                   <input
//                     type="text"
//                     placeholder="Filter by Employee ID or Name"
//                     value={rejectedFilter}
//                     onChange={(e) => handleFilterChange(e, setRejectedFilter)}
//                     className={`h-full outline-none w-full`}
//                   />
//                   <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
//                 </div>
//                 <div className="overflow-scroll">
//                   <table className="text-center max-lg:min-w-[700px] w-full bg-white h-[10vh] max-lg:overflow-scroll">
//                     <thead className="sticky top-0 bg-white border-x-[1px]">
//                       <tr className=" bg-[#EFEFEF] text-black text-lg border-x-[1px] font-semibold px-2 py-1">
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Sr.No
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Emp ID
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Emp Name
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           From Date
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           To Date
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Leave Type
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Reason
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Status
//                         </td>
//                       </tr>
//                     </thead>
//                     <tbody className="h-[50px]">
//                       {rejectedEmployees?.map((record, index) =>
//                         record.leaves       .map((leave, leaveIndex) => (
//                           <tr
//                             key={`${index}-${leaveIndex}`}
//                             className="h-[50px] text-black"
//                           >
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {rej_SrNo++}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {record.employee_ID}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {record.username}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {dateFormat(leave.fromDate)}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {dateFormat(leave.toDate)}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {leave.leaveType}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {leave.leaveInfo}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               <div className="w-full h-full card flex justify-center overflow-hidden">
//                                 <p
//                                   className={`${
//                                     leave.leaveStatus === "Approved" ||
//                                     leave.leaveStatus === "rejected" ||
//                                     leave.leaveStatus === "Rejected"
//                                       ? "block"
//                                       : "hidden"
//                                   } flex items-center justify-center w-full h-full ${
//                                     leave.leaveStatus === "Approved"
//                                       ? "text-green-500"
//                                       : "text-red-500"
//                                   }`}
//                                 >
//                                   {leave.leaveStatus}
//                                 </p>

//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </TabPanel>
//             </TabView>

//             {/* end */}
//           </div>

//           {/* Employee View */}
//           <div
//             className={`${
//               role === "employee" ? "" : "hidden"
//             } overflow-hidden rounded-md`}
//           >

//             <EmployeeLeaveReport/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeaveReport;

import React, { useEffect, useState } from "react";
import axios from "../utilities/axiosInstance";
import { toast } from "react-hot-toast";
import "../custom css/primeReactComponentOverWritedStyle.css";
import "../custom css/colors.css";
import { RiSearchLine } from "react-icons/ri";
import { IoAlertCircleOutline } from "react-icons/io5";

// import { useDispatch } from "react-redux";
// import { receiveData } from "../../redux/slices/employeeLeaveDataSlice";

import { TabView, TabPanel } from "primereact/tabview";
import EmployeeLeaveReport from "./EmployeeLeaveReport";

function LeaveReport() {
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [leaveData,     setLeaveData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [employee_ID, setEmployee_ID] = useState("");

  const [empName, setEmpName] = useState("");
  const [workRole, setWorkRole] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [leaveStatus, setStatus] = useState("");
  const [particularEmpData, setParticularEmpData] = useState({});

  const [rejectedEmployees, setRejectedEmployees] = useState([]);

  const [approved, setApproved] = useState([]);

  const [pending, setPending] = useState([]);

  const [pendingFilter, setPendingFilter] = useState("");
  const [approvedFilter, setApprovedFilter] = useState("");
  const [rejectedFilter, setRejectedFilter] = useState("");
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(`/employees/check-role/${email}`);
        const {
          role,
          employee_ID,
          username,
          work_role,
          fromDate,
          toDate,
          leaveType,
          leaveInfo,
          leaveStatus,
        } = response.data;
        setRole(role);
        setEmployee_ID(employee_ID);
        setEmpName(username);
        setWorkRole(work_role);
        setFromDate(fromDate);
        setToDate(toDate);
        setLeaveType(leaveType);
        setReason(leaveInfo);
        setStatus(leaveStatus);
        setIsLoading(false);
        setUserDetails(response.data);
        // Set loading to false after setting state
      } catch (error) {
        //console.error("Error fetching user role:", error.message);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchAllLeaveData = async () => {
      try {
        const response = await axios.get(`/employees/leaves/getall`);
        setLeaveData(response.data);
      } catch (error) {
        console.error("Error fetching leave data:", error.message);
      }
    };

    fetchAllLeaveData();
  }, []);

  useEffect(() => {
    // Define the function to fetch the data
    const fetchApprovedData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/leave/approved"
        );
        // console.log(response.data);
        setApproved(response.data.approvedLeaveRecords);
        // setLoading(false);
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    };
    const fetchPendingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/leave/pending"
        );
        // console.log(response.data);
        setPending(response.data.pendingLeaveRecords);
        // setLoading(false);
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    };

    const fetchEmployeesWithRejectedLeave = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/leave/rejected"
        );
        setRejectedEmployees(response.data.rejectedLeaveRecords);
        // console.log("rejected employees", response.data.rejectedLeaveRecords);
      } catch (error) {
        console.warn("error in fetching rejected employees", error.message);
        // setLoading(false);
      }
    };

    fetchEmployeesWithRejectedLeave();
    fetchPendingData();
    fetchApprovedData();
  }, []);

  // useEffect(()=>{
  //   console.log(approved
  //   );

  // },[approved])

  useEffect(() => {
    const fetchEmployeeLeaveData = async () => {
      try {
        if (employee_ID) {
          // //console.log("empID:", employee_ID);
          const response = await axios.get(
            ` /employees/admin/leave/${employee_ID}`
          );
          setParticularEmpData(response.data);
        }
      } catch (error) {
        console.error("Error fetching employee leave data:", error.message);
        toast.error("Error fetching employee leave data");  
      }
    };

    fetchEmployeeLeaveData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  let srNo = 1;
  let rej_SrNo = 1;
  let appr_SrNo = 1;

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const filterData = (data, filter) => {
    // console.log(data, filter, "test............");

    return data.approvedLeaveRecords?.filter((record) =>
      record.leave?.some(
        (leave) =>
          record.employee_ID.includes(filter) ||
          record.username.includes(filter)
      )
    );
  };

  // Filtered data
  const filteredPending = filterData(pending, pendingFilter);
  const filteredApproved = filterData(approved, approvedFilter);
  const filteredRejected = filterData(rejectedEmployees, rejectedFilter);
  
  
  const handleDeny = async (arg, id) => {
    console.log("Click Deny - ID:", id, "Arg:", arg);
  
    try {
      const response = await axios.patch(
        `/employees/leavebyid/${id}/${arg.leave_ID}`,
        {
          leaveStatus: "Rejected", 
        }
      );
  
      console.log(response.data);
      toast.success("Leave status updated successfully");
    } catch (error) {
      // Log the error details for better debugging
      console.error("Error updating leave status:", error.response ? error.response.data : error.message);
      toast.error("Error updating leave status");
    }
  };
  

  const handleApprove = async (arg, id) => {
    console.log("Click Approve - ID:", id, "Arg:", arg);
  
    try {
      // Ensure the URL is formatted correctly with the template literal
      const response = await axios.patch(
        `/employees/leavebyid/${id}/${arg.leave_ID}`,
        {
          leaveStatus: "Approved", // Approve should set status as "Approved"
        }
      );
  
      console.log(response.data);
      toast.success("Leave status updated successfully");
    } catch (error) {
      // Log the error details for better debugging
      console.error("Error updating leave status:", error.response ? error.response.data : error.message);
      toast.error("Error updating leave status");
    }
  };
    

  //Dummy Datas 1=233   2=234 3=235   213,214
  // const filteredPending = [
  //   {
  //     employee_ID: "12345",
  //     username: "Deepak",
  //     leave: [
  //       {
  //         leaveType: "Sick Leave",
  //         leaveStatus: "Pending",
  //         fromDate: "2024-09-01",
  //         toDate: "2024-09-01",
  //         leaveInfo: "Due to medical reasons.",
  //         leaveReasonByAdmin: "",
  //         leave_ID: "abc123"
  //       }
  //     ]
  //   },
  //   {
  //     employee_ID: "67890",
  //     username: "Amit",
  //     leave: [
  //       {
  //         leaveType: "Vacation",
  //         leaveStatus: "Pending",
  //         fromDate: "2024-08-15",
  //         toDate: "2024-08-20",
  //         leaveInfo: "Annual leave.",
  //         leaveReasonByAdmin: "",
  //         leave_ID: "def456"
  //       }
  //     ]
  //   }
  // ];

  // const workRole = "Software Developer";

  return (
    <div className=" w-full px-0">
      <p
        className={`bg-[--common-color] text-white rounded-lg shadow-md w-full p-2 m-auto text-center ${
          role === "admin" ? "hidden" : "block"
        }`}
      >
        Leave Report
      </p>
      <div
        className={`w-full ${
          role !== "admin" ? "max-md:m-0" : ""
        } px-0 flex flex-col items-end justify-evenly mt-5 rounded-xl shadow-[0_0_5px_0] shadow-gray-300`}
      >
        <div className="overflow-y-auto  w-full ">
          {/* Admin View */}

          <div
            className={
              role.toLowerCase() === "employee"
                ? "hidden"
                : "block  rounded-lg shadow-md w-full"
            }
          >
            {/* start */}

            <TabView>
              <TabPanel
                header="Pending"
                headerClassName="text-lg text-gray-500 mx-0 flex items-center justify-center rounded-md py-2 max-sm:w-fit"
              >
                <div className="px-5 max-sm:flex max-sm:items-center justify-center max-sm:flex-col">
                  <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2  rounded-md w-[278px] flex flex-row items-center justify-evenly">
                    <input
                      type="text"
                      placeholder="Filter by Employee ID or Name"
                      value={pendingFilter}
                      onChange={(e) => handleFilterChange(e, setPendingFilter)}
                      className={`h-full outline-none w-full`}
                    />
                    <RiSearchLine
                      className={`w-[25px] h-[25px] text-gray-400`}
                    />
                  </div>
                  <div className="w-full bg-white rounded-md py-5">
                    {/* <div className="w-full h-16 shadow-md border bg-white max-lg:hidden rounded-md justify-between items-center flex-row flex px-5">
                        <p className="flex w-fit items-center gap-5 text-xl">
                          <IoAlertCircleOutline className="text-[#E60000]" />
                          Deepak was absent on 01 Sep 2024 without any intimation
                        </p>
                        <button className="w-fit border shadow-md text-[--common-color] flex items-center px-5 p-1 rounded-md">
                          Remainder
                        </button>
                      </div> */}
                    <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-5 mt-5 w-full">
                      {pending?.map((data) =>
                        data.leaves.map((secondarydata) => (
                          <div className="w-full h-60 overflow-scroll border max-lg:gap-5 rounded-lg max-sm:flex-col max-lg:h-fit max-md:items-center max-md:justify-center max-md:text-center max-sm:justify-between flex flex-row p-5">
                            <div className="w-1/2 max-sm:w-full flex flex-col gap-8">
                              <p className="flex flex-col">
                                <p className="text-xl font-medium capitalize text-wrap">
                                  {empName}
                                </p>
                                <span className="text-xl font-semibold">
                                  {data.employee_ID}
                                </span>
                                <p className="text-lg text-wrap">{workRole}</p>
                              </p>
                              <p className="text-3xl font-semibold">
                                {secondarydata.leaveInfo}
                              </p>
                              <p>
                                {secondarydata.fromDate} /{" "}
                                {secondarydata.toDate}
                              </p>
                            </div>
                            <div className="w-1/2 flex flex-col max-sm:w-full justify-between h-full max-lg:w-1/2 max-md:gap-5">
                              <div className="w-full h-1/2 flex flex-row items-start justify-between gap-5 ">
                                <p className="px-4 p-1 rounded-full text-[--common-color] shadow-gray-300 shadow-[0_0_3px_0]">
                                  {secondarydata.leaveType}
                                </p>
                                <p className="px-5 p-1 rounded-full text-[--common-color] shadow-gray-300 shadow-[0_0_3px_0]">
                                  2 Days
                                </p>
                              </div>
                              <div className="w-full h-1/2 flex flex-row items-end justify-between gap-5">
                                <button
                                  onClick={() =>
                                    handleDeny(secondarydata, data.employee_ID)
                                  }
                                  className="px-5 p-1 rounded-full text-[--common-color] shadow-gray-300 shadow-[0_0_3px_0]"
                                >
                                  Deny
                                </button>
                                <button
                                  onClick={() =>
                                    handleApprove(
                                      secondarydata,
                                      data.employee_ID
                                    )
                                  }
                                  className="bg-[#E2EFFF] px-5 p-1 rounded-full text-[--common-color] shadow-[0_0_5px_0] shadow-gray-300"
                                >
                                  Approve
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                header="Approved"
                headerClassName=" text-lg text-[--blue] mx-0 flex items-center justify-center shadow-none rounded-md py-2 max-sm:w-fit"
              >
                <div className="max-sm:overflow-hidden">
                  <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-5 mx-5 rounded-md w-[278px] flex flex-row items-center justify-evenly">
                    <input
                      type="text"
                      placeholder="Filter by Employee ID or Name"
                      value={approvedFilter}
                      onChange={(e) => handleFilterChange(e, setApprovedFilter)}
                      className={`h-full outline-none w-full`}
                    />
                    <RiSearchLine
                      className={`w-[25px] h-[25px] text-gray-400`}
                    />
                  </div>
                  <div className="overflow-scroll mx-5 rounded-lg border">
                    <table className="text-center max-lg:min-w-[700px] w-full bg-white h-[10vh] max-lg:overflow-scroll">
                      <thead className="sticky top-0 bg-white">
                        <tr className=" bg-[#EFEFEF] text-black text-lg font-semibold px-2 py-1">
                          <td className=" max-lg:text-nowrap text-lg h-[50px]">
                            Sr.No
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            Emp ID
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            Emp Name
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            From Date
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            To Date
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            Leave Type
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            Reason
                          </td>
                          <td className=" max-lg:text-nowrap text-lg h-[50px] ">
                            Status
                          </td>
                        </tr>
                      </thead>
                      <tbody className="h-[50px]">
                        {approved?.map((record, index) =>
                          record.leaves.map((leave, leaveIndex) => (
                            <tr key={index} className="h-[50px] text-black">
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {appr_SrNo++}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {record.employee_ID}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {record.username}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {leave.fromDate}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {leave.toDate}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {leave.leaveType}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                {leave.leaveInfo}
                              </td>
                              <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
                                <div className="w-full h-full card flex justify-center overflow-hidden">
                                  <p
                                    className={`${
                                      leave.leaveStatus === "Approved" ||
                                      leave.leaveStatus === "Rejected"
                                        ? "block"
                                        : "hidden"
                                    } flex items-center justify-center w-full h-full ${
                                      leave.leaveStatus === "Approved"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {leave.leaveStatus}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                header="Rejected"
                headerClassName=" text-lg text-[--red-button] mx-0 flex items-center justify-center shadow-none focus:bg-red-500 rounded-md py-2"
              >
                <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-5 mx-5 rounded-md w-[278px] flex flex-row items-center justify-evenly">
                  <input
                    type="text"
                    placeholder="Filter by Employee ID or Name"
                    value={rejectedFilter}
                    onChange={(e) => handleFilterChange(e, setRejectedFilter)}
                    className={`h-full outline-none w-full`}
                  />
                  <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
                </div>
                <div className="overflow-scroll mx-5 rounded-lg border">
                <table className="text-center max-lg:min-w-[700px] w-full bg-white h-[10vh] max-lg:overflow-scroll">
                    <thead className="sticky top-0 bg-white border-x-[1px]">
                      <tr className=" bg-[#EFEFEF] text-black text-lg border-x-[1px] font-semibold px-2 py-1">
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          Sr.No
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          Emp ID
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          Emp Name
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          From Date
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          To Date
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          Leave Type
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          Reason
                        </td>
                        <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
                          Status
                        </td>
                      </tr>
                    </thead>
                    <tbody className="h-[50px]">
                      {rejectedEmployees?.map((record, index) =>
                        record.leaves.map((leave, leaveIndex) => (
                          <tr
                            key={`${index}-${leaveIndex}`}
                            className="h-[50px] text-black"
                          >
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {rej_SrNo++}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {record.employee_ID}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {record.username}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {leave.fromDate}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {leave.toDate}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {leave.leaveType}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              {leave.leaveInfo}
                            </td>
                            <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
                              <div className="w-full h-full card flex justify-center overflow-hidden">
                                <p
                                  className={`${
                                    leave.leaveStatus === "Approved" ||
                                    leave.leaveStatus === "Rejected"
                                      ? "block"
                                      : "hidden"
                                  } flex items-center justify-center w-full h-full ${
                                    leave.leaveStatus === "Approved"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {leave.leaveStatus}
                                </p>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabView>

            {/* end */}
          </div>

          {/* Employee View */}
          <div
            className={`${
              role === "employee" ? "" : "hidden"
            } overflow-hidden rounded-md`}
          >
            {/* {particularEmpData?.leaveType && particularEmpData !== "" ? (
              <div className=" h-[250px] rounded-md shadow-md overflow-scroll">
                <table className="text-center w-full bg-white rounded-md overflow-scroll max-lg:overflow-scroll">
                  <thead className="sticky top-0 bg-white rounded-md">
                    <tr className="bg-[--common-color] text-[12px] rounded">
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] rounded-tl-md">
                        Emp ID
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] font-semibold">
                        Emp Name
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] font-semibold">
                        Role
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] font-semibold">
                        From Date
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] font-semibold">
                        To Date
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] font-semibold">
                        Leave Type
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] font-semibold">
                        Reason
                      </td>
                      <td className="text-lg h-[50px] text-nowrap text-white border-[--common-color] rounded-tr-md font-semibold">
                        Status
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {particularEmpData.leave
                      // .filter(leave => leave.employee_ID === particularEmpData.employee_ID)
                      ?.map((leave, i) => (
                        <tr key={i}>
                          <td className="capitalize text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {particularEmpData.employee_ID}
                          </td>
                          <td className="capitalize text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {empName}
                          </td>
                          <td className="text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {workRole}
                          </td>
                          <td className="text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {leave.fromDate}
                          </td>
                          <td className="text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {leave.toDate}
                          </td>
                          <td className="capitalize text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {leave.leaveType}
                          </td>
                          <td className="text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold">
                            {leave.leaveInfo}
                          </td>
                          <td
                            className={`text-lg text-nowrap px-2 h-[50px] border-[1px] border-[--common-color] font-semibold ${
                              leave.leaveStatus === "Approved"
                                ? "bg-green-200 text-green-500"
                                : ""
                            } ${
                              leave.leaveStatus === "Rejected"
                                ? "bg-red-200 text-red-500"
                                : ""
                            } ${
                              leave.leaveStatus === "Pending"
                                ? " text-[--gray]"
                                : ""
                            } text-[12px]`}
                          >
                            {leave.leaveStatus}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="">{You didn't apply for any Leave}</p>
              </div>
            )} */}
            <EmployeeLeaveReport />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveReport;
// import React, { useEffect, useState } from "react";
// import axios from "../utilities/axiosInstance";
// import { toast } from "react-hot-toast";
// import "../custom css/primeReactComponentOverWritedStyle.css";
// import "../custom css/colors.css";
// import { RiSearchLine } from "react-icons/ri";
// import { IoAlertCircleOutline } from "react-icons/io5";

// // import { useDispatch } from "react-redux";
// // import { receiveData } from "../../redux/slices/employeeLeaveDataSlice";

// import { TabView, TabPanel } from "primereact/tabview";
// import EmployeeLeaveReport from "./EmployeeLeaveReport";

// function LeaveReport() {
//   const [role, setRole] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [leaveData, setLeaveData] = useState([]);
//   // const [visible, setVisible] = useState(false);
//   const [employee_ID, setEmployee_ID] = useState("");

//   const [empName, setEmpName] = useState("");
//   const [workRole, setWorkRole] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [leaveType, setLeaveType] = useState("");
//   const [reason, setReason] = useState("");
//   const [leaveStatus, setStatus] = useState("");
//   const [particularEmpData, setParticularEmpData] = useState({});

//   const [rejectedEmployees, setRejectedEmployees] = useState([]);

//   const [approved, setApproved] = useState([]);

//   const [pending, setPending] = useState([]);

//   const [pendingFilter, setPendingFilter] = useState("");
//   const [approvedFilter, setApprovedFilter] = useState("");
//   const [rejectedFilter, setRejectedFilter] = useState("");
//   const [userDetails, setUserDetails] = useState("");

//   useEffect(() => {
//     const fetchUserRole = async (email) => {
//       try {
//         const response = await axios.get(`/employees/check-role/${email}`);
//         const {
//           role,
//           employee_ID,
//           username,
//           work_role,
//           fromDate,
//           toDate,
//           leaveType,
//           leaveInfo,
//           leaveStatus,
//         } = response.data;
//         setRole(role);
//         setEmployee_ID(employee_ID);
//         setEmpName(username);
//         setWorkRole(work_role);
//         setFromDate(fromDate);
//         setToDate(toDate);
//         setLeaveType(leaveType);
//         setReason(leaveInfo);
//         setStatus(leaveStatus);
//         setIsLoading(false);
//         setUserDetails(response.data);
//         // Set loading to false after setting state
//       } catch (error) {
//         //console.error("Error fetching user role:", error.message);
//       }
//     };

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.email) {
//       fetchUserRole(user.email);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchAllLeaveData = async () => {
//       try {
//         const response = await axios.get(`/employees/leaves/getall`);
//         setLeaveData(response.data);
//         // console.log(response.data, "response:::::::::::::::");
//       } catch (error) {
//         console.error("Error fetching leave data:", error.message);
//       }
//     };

//     fetchAllLeaveData();
//   }, []);

//   useEffect(() => {
//     // Define the function to fetch the data
//     const fetchApprovedData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/employees/leave/approved"
//         );
//         // console.log(response.data);
//         setApproved(response.data.approvedLeaveRecords);
//         // setLoading(false);
//       } catch (err) {
//         console.log(err);
//         // setLoading(false);
//       }
//     };
//     const fetchPendingData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/employees/leave/pending");
//         // console.log(response.data);
//         setPending(response.data.pendingLeaveRecords);
//         // setLoading(false);
//       } catch (err) {
//         console.log(err);
//         // setLoading(false);
//       }
//     };

//     const fetchEmployeesWithRejectedLeave = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/employees/leave/rejected"
//         );
//         setRejectedEmployees(response.data.rejectedLeaveRecords);
//         console.log("rejected employees", response.data.rejectedLeaveRecords);
//       } catch (error) {
//         console.warn("error in fetching rejected employees", error.message);
//         // setLoading(false);
//       }
//     };

//     fetchEmployeesWithRejectedLeave();
//     fetchPendingData();
//     fetchApprovedData();
//   }, []);

//   // useEffect(()=>{
//   //   console.log(approved
//   //   );

//   // },[approved])

//   useEffect(() => {
//     const fetchEmployeeLeaveData = async () => {
//       try {
//         if (employee_ID) {
//           // //console.log("empID:", employee_ID);
//           const response = await axios.get(
//             `/employees/admin/leave/${employee_ID}`
//           );
//           setParticularEmpData(response.data);
//         }
//       } catch (error) {
//         //console.error("Error fetching employee leave data:", error.message);
//         toast.error("Error fetching employee leave data");
//       }
//     };

//     fetchEmployeeLeaveData();
//   }, [employee_ID]);

//   if (isLoading) {
//     return <div>Loading....</div>;
//   }

//   let rej_SrNo = 1;
//   let appr_SrNo = 1;

//   const handleFilterChange = (e, setFilter) => {
//     setFilter(e.target.value);
//   };

//   const filterData = (data, filter) => {
//     return data.approvedLeaveRecords?.filter((record) =>
//       record.leave?.some(
//         (leave) =>
//           record.employee_ID.includes(filter) ||
//           record.username.includes(filter)
//       )
//     );
//   };

//   // Filtered data
//   const filteredPending = filterData(pending, pendingFilter);
//   const filteredApproved = filterData(approved, approvedFilter);
//   const filteredRejected = filterData(rejectedEmployees, rejectedFilter);

//   const handleDeny = async (arg, id) => {
//     console.log("click Deny - ", id, arg);

//     try {
//       const response = await axios.patch(
//         `http://localhost:3001/employees/leaveobj/${id}`,
//         {
//           leave: [{
//             leaveStatus:"rejected",
//             leave_ID: arg.leave_ID

//           }] // Send leaveData object as part of the request body
//         }
//       );

//       console.log('Response:', response.data); // Log the response data to the console
//       toast.success("Rejected");
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message); // Log the error to the console
//       toast.error("Failed to submit form");
//     }

//   };

//   const handleApprove = async (arg, id) => {
//     console.log("click Approve - ", id, arg);
//     try {
//       const response = await axios.patch(
//         `http://localhost:3001/employees/leaveobj/${id}`,
//         {
//           leave: [{
//             leaveStatus:"Approved",
//             leave_ID: arg.leave_ID
//           }]
//         }
//       );

//       console.log('Response:', response.data); // Log the response data to the console
//       toast.success("Approved");
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message); // Log the error to the console
//       toast.error("Failed to submit form");
//     }

//   };

//   const dateFormat=(data)=>{

//     const date=new Date(data)

//     const formatedDate=`${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`

//     return formatedDate;

//   }

//   return (
//     <div className=" w-full px-0">
//       <p
//         className={`bg-[--common-color] text-white rounded-lg shadow-md w-full p-2 m-auto text-center ${
//           role === "admin" ? "hidden" : "block"
//         }`}
//       >
//         Leave Report
//       </p>
//       <div
//         className={`w-full ${
//           role !== "admin" ? "max-md:m-0" : ""
//         } px-0 py-3 flex flex-col items-end justify-evenly border rounded-xl shadow-[0_0_5px_0] shadow-gray-300 border-gray-300`}
//       >
//         <div className="overflow-y-auto  w-full ">
//           {/* Admin View */}

//           <div
//             className={
//               role.toLowerCase() === "employee"
//                 ? "hidden"
//                 : "block  rounded-lg shadow-md w-full"
//             }
//           >
//             {/* start */}

//             <TabView>
//               <TabPanel
//                 header="Pending"
//                 headerClassName="text-lg text-gray-500 mx-0 flex items-center justify-center rounded-md py-2 max-sm:w-fit"
//               >
//                 <div className="px-5 max-sm:flex max-sm:items-center justify-center max-sm:flex-col">
//                   <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2  rounded-md w-[278px] flex flex-row items-center justify-evenly">
//                     <input
//                       type="text"
//                       placeholder="Filter by Employee ID or Name"
//                       value={pendingFilter}
//                       onChange={(e) => handleFilterChange(e, setPendingFilter)}
//                       className={`h-full outline-none w-full`}
//                     />
//                     <RiSearchLine
//                       className={`w-[25px] h-[25px] text-gray-400`}
//                     />
//                   </div>
//                   <div className="w-full bg-white rounded-md py-5">
//                     <div className="w-full h-16 shadow-md border bg-white max-lg:hidden rounded-md justify-between items-center flex-row flex px-5">
//                       <p className="flex w-fit items-center gap-5 text-xl">
//                         <IoAlertCircleOutline className="text-[#E60000]" />
//                         Deepak was absent on 01 Sep 2024 without any intimation
//                       </p>
//                       <button className="w-fit border shadow-md text-[--common-color] flex items-center px-5 p-1 rounded-md">
//                         Remainder
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-5 mt-5 w-full">
//                       {pending?.map((data) =>
//                         data.leaves.map((secondarydata) => (
//                           <div
//                             key={secondarydata.id} // Ensure each element has a unique key
//                             className="w-full h-60 border rounded-lg flex flex-col md:flex-row p-5 gap-5 md:items-center md:justify-center md:text-center"
//                           >
//                             <div className="w-full md:w-1/2 flex flex-col gap-8">
//                               <p className="flex flex-col">
//                                 <span className="text-xl font-medium capitalize">{empName}</span>
//                                 <span className="text-xl font-semibold">{data.employee_ID}</span>
//                                 <span className="text-lg">{workRole}</span>
//                               </p>
//                               <p className="text-3xl font-semibold">{secondarydata.leaveInfo}</p>
//                               <p>
//                                 {dateFormat(secondarydata?.fromDate)} / {dateFormat (secondarydata.toDate)}
//                               </p>
//                             </div>
//                             <div className="w-full md:w-1/2 flex flex-col gap-5">
//                               <div className="flex flex-row items-center justify-between gap-5">
//                                 <p className="px-2 p-1 rounded-md text-[--common-color] border">
//                                   {secondarydata.leaveType}
//                                 </p>
//                                 <p className="px-5 p-1 rounded-md text-[--common-color] border">2 Days</p>
//                               </div>
//                               <div className="flex flex-row items-center justify-between gap-5">
//                                 <button
//                                   onClick={() => handleDeny(secondarydata, data.employee_ID)}
//                                   className="px-5 p-1 rounded-md text-[--common-color] border shadow-md"
//                                 >
//                                   Deny
//                                 </button>
//                                 <button
//                                   onClick={() => handleApprove(secondarydata, data.employee_ID)}
//                                   className="bg-[#E2EFFF] px-5 p-1 rounded-md text-[--common-color] shadow-md"
//                                 >
//                                   Approve
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </TabPanel>
//               <TabPanel
//                 header="Approved"
//                 headerClassName=" text-lg text-[--blue] mx-0 flex items-center justify-center shadow-none rounded-md py-2 max-sm:w-fit"
//               >
//                 <div className="max-sm:overflow-hidden">
//                   <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-5 mx-5 rounded-md w-[278px] flex flex-row items-center justify-evenly">
//                     <input
//                       type="text"
//                       placeholder="Filter by Employee ID or Name"
//                       value={approvedFilter}
//                       onChange={(e) => handleFilterChange(e, setApprovedFilter)}
//                       className={`h-full outline-none w-full`}
//                     />
//                     <RiSearchLine
//                       className={`w-[25px] h-[25px] text-gray-400`}
//                     />
//                   </div>
//                   <div className="overflow-scroll">
//                     <table className="text-center max-lg:min-w-[700px] w-full bg-white h-[10vh] max-lg:overflow-scroll">
//                       <thead className="sticky top-0 bg-white">
//                         <tr className=" bg-[#EFEFEF] text-black text-lg font-semibold px-2 py-1">
//                           <td className=" max-lg:text-nowrap text-lg h-[50px]">
//                             Sr.No
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Emp ID
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Emp Name
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             From Date
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             To Date
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Leave Type
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Reason
//                           </td>
//                           <td className=" max-lg:text-nowrap text-lg h-[50px] ">
//                             Status
//                           </td>
//                         </tr>
//                       </thead>
//                       <tbody className="h-[50px]">
//                         {approved?.map((record, index) =>
//                           record.leaves.map((leave, leaveIndex) => (
//                             <tr
//                               key={`${index}-${leaveIndex}`}
//                               className="h-[50px] text-black"
//                             >
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {appr_SrNo++}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {record.employee_ID}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {record.username}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {dateFormat(leave.fromDate)}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {dateFormat(leave.toDate)}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {leave.leaveType}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 {leave.leaveInfo}
//                               </td>
//                               <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 h-[50px] border-b border-gray-300">
//                                 <div className="w-full h-full card flex justify-center overflow-hidden">
//                                   <p
//                                     className={`${
//                                       leave.leaveStatus === "Approved" ||
//                                       leave.leaveStatus === "Rejected"
//                                         ? "block"
//                                         : "hidden"
//                                     } flex items-center justify-center w-full h-full ${
//                                       leave.leaveStatus === "Approved"
//                                         ? "text-green-500"
//                                         : "text-red-500"
//                                     }`}
//                                   >
//                                     {leave.leaveStatus}
//                                   </p>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </TabPanel>
//               <TabPanel
//                 header="Rejected"
//                 headerClassName=" text-lg text-[--red-button] mx-0 flex items-center justify-center shadow-none focus:bg-red-500 rounded-md py-2"
//               >
//                 <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-5 mx-5 rounded-md w-[278px] flex flex-row items-center justify-evenly">
//                   <input
//                     type="text"
//                     placeholder="Filter by Employee ID or Name"
//                     value={rejectedFilter}
//                     onChange={(e) => handleFilterChange(e, setRejectedFilter)}
//                     className={`h-full outline-none w-full`}
//                   />
//                   <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
//                 </div>
//                 <div className="overflow-scroll">
//                   <table className="text-center max-lg:min-w-[700px] w-full bg-white h-[10vh] max-lg:overflow-scroll">
//                     <thead className="sticky top-0 bg-white border-x-[1px]">
//                       <tr className=" bg-[#EFEFEF] text-black text-lg border-x-[1px] font-semibold px-2 py-1">
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Sr.No
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Emp ID
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Emp Name
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           From Date
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           To Date
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Leave Type
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Reason
//                         </td>
//                         <td className=" max-lg:text-nowrap text-lg h-[50px] font-semibold">
//                           Status
//                         </td>
//                       </tr>
//                     </thead>
//                     <tbody className="h-[50px]">
//                       {rejectedEmployees?.map((record, index) =>
//                         record.leaves       .map((leave, leaveIndex) => (
//                           <tr
//                             key={`${index}-${leaveIndex}`}
//                             className="h-[50px] text-black"
//                           >
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {rej_SrNo++}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {record.employee_ID}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {record.username}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {dateFormat(leave.fromDate)}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {dateFormat(leave.toDate)}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {leave.leaveType}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               {leave.leaveInfo}
//                             </td>
//                             <td className="capitalize max-lg:text-nowrap text-lg px-2 py-1 border-b border-gray-300">
//                               <div className="w-full h-full card flex justify-center overflow-hidden">
//                                 <p
//                                   className={`${
//                                     leave.leaveStatus === "Approved" ||
//                                     leave.leaveStatus === "rejected" ||
//                                     leave.leaveStatus === "Rejected"
//                                       ? "block"
//                                       : "hidden"
//                                   } flex items-center justify-center w-full h-full ${
//                                     leave.leaveStatus === "Approved"
//                                       ? "text-green-500"
//                                       : "text-red-500"
//                                   }`}
//                                 >
//                                   {leave.leaveStatus}
//                                 </p>

//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </TabPanel>
//             </TabView>

//             {/* end */}
//           </div>

//           {/* Employee View */}
//           <div
//             className={`${
//               role === "employee" ? "" : "hidden"
//             } overflow-hidden rounded-md`}
//           >

//             <EmployeeLeaveReport/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeaveReport;
