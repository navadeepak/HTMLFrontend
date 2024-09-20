import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaEye, FaRightFromBracket } from "react-icons/fa6";
import "./custom css/colors.css";
import "./custom css/primeReactComponentOverWritedStyle.css";
import { TabView, TabPanel } from "primereact/tabview";
import { RiSearchLine } from "react-icons/ri";
import { useAllEmployeeContext } from "../context/AllEmployeeContext";


export default function AdminTickets() {
  const {
    todayAttendance,
    employees1,
    pendingTickets12,
    pendingTicketsLength,
    pendingLeaves,
    pendingLeavesLength,
    state,
    setState,
  } = useAllEmployeeContext();

  const [filterInput, setFilterInput] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [searchReturn, setSearchReturn] = useState("");
  const [searchApproved, setSearchApproved] = useState("");
  const [approvedTickets, setApprovedTickets] = useState([]);
  const [searchRejected, setSearchRejected] = useState("");
  const [rejectedTickets, setRejectedTickets] = useState([]);
  const [filteredReturnTickets, setFilteredReturnTickets] = useState();
  const [commandBTN, setCommandBTN] = useState(false);
  console.log(filteredReturnTickets, "data...");

  const [comments, setComments] = useState({});
  const applyFilter = () => {
    const filteredData = pendingTickets.filter((employee) => {
      const matchesName = employee.username
        ?.toLowerCase()
        .includes(filterInput?.toLowerCase());
      const matchesID = employee.employee_ID
        .toString()
        .includes(filterInput?.toLowerCase());
      return matchesName || matchesID;
    });
    setFilteredEmployees(filteredData);
  };

  useEffect(() => {
    applyFilter();
  }, [filterInput]);

  useEffect(() => {
    const fetchPendingTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/tickets/pending"
        );
        const data = response.data;
        setPendingTickets(data.pendingTicketsRecords);
        // console.log(data);
      } catch (err) {}
    };

    fetchPendingTickets();
  }, []);

  useEffect(() => {
    const fetchApprovedTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/tickets/approved"
        );
        const data = response.data.approvedTicketsRecords;
        setApprovedTickets(data);
        setFilteredReturnTickets(response.data.approvedTicketsRecords);
        // console.log(data);

        // console.log(response.data.approvedTicketsRecords);
      } catch (err) {}
    };

    fetchApprovedTickets();
  }, []);

  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
  };

  const handleStatusChange = async (employee_ID, ticket_ID, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/employees/tickets/${employee_ID}/${ticket_ID}`,
        {
          adminComment: comments[ticket_ID] || "",
          ticketStatus: status,
        }
      );
      if (response.status === 200) {
        toast.success("Ticket status updated successfully");
      } else {
        toast.error("Failed to update ticket status");
      }
    } catch (error) {
      toast.error("Error updating ticket status");
      console.error("Error updating ticket status:", error.message);
      console.error("Error details:", error);
    }
  };

  const handleCommentSubmit = async (employee_ID, ticket_ID) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/employees/tickets/${employee_ID}/${ticket_ID}`,
        {
          comment_for_ticket_by_admin: comments[ticket_ID] || "", 
        }
      );

      if (response.status === 200) {
        toast.success("Ticket status updated successfully");
      } else {
        toast.error("Failed to update ticket status");
      }
    } catch (error) {
      toast.error("Error updating ticket status");
      console.error("Error updating ticket status:", error.message);
      console.error("Error details:", error.response?.data);
    }

  };

  const handleReturnStatusChange = async (
    employee_ID,
    ticket_ID,
    newStatus
  ) => {

    try {
      const response = await axios.patch(
        `http://localhost:3001/employees/tickets/${employee_ID}/${ticket_ID}`,
        {
          returnStatus: newStatus,
        }
      );
      toast.success("Success");
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error(error);
    }
  };

  const fetchEmployeesWithTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/employees/tickets/all"
      );
    } catch (error) {
      console.error("Error fetching employees with tickets:", error);
    }
  };

  const handleCommentChange = (ticket_ID, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [ticket_ID]: value,
    }));
  };

  useEffect(() => {
    fetchEmployeesWithTickets();
  }, []);

  useEffect(() => {
    const fetchRejectedTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/tickets/rejected"
        );
        setRejectedTickets(response.data.rejectedTicketsRecords);
      } catch (err) {
        console.warn("error", err);
      }
    };

    fetchRejectedTickets();
  }, []);

  const filteredApprovedTickets = approvedTickets.filter((employee) => {
    const matchesEmployeeID = employee.employee_ID.includes(searchApproved);
    const matchesUsername = employee.username
      ? employee.username.toLowerCase().includes(searchApproved.toLowerCase())
      : false;
    return matchesEmployeeID || matchesUsername;
  });
  const filteredRejectedTickets = rejectedTickets?.filter((employee) => {
    const matchesEmployeeID = employee.employee_ID.includes(searchRejected);
    const matchesUsername = employee.username
      ? employee.username.toLowerCase().includes(searchRejected.toLowerCase())
      : false;
    return matchesEmployeeID || matchesUsername;
  });

  return (
    <div>
      <div className="flex flex-col mt-0 m-auto w-full ">
        <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
          <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
            <p className="animate-slide p-2">Tickets</p>
          </span>
        </p>
        <div className=" px-5 py-3 rounded-md w-full h-full flex flex-col max-md:overflow-x-hidden">
          {/* Filter Input */}
          <div className="text-lg flex gap-2 bg-white shadow-md mb-4 px-8 h-fit w-1/4 max-lg:w-1/2 max-sm:w-full items-center justify-center flex-row 2xl:flex border-[1px] border-gray-300 rounded-md">
            <input
              type="text"
              placeholder="Filter by Employee ID or Name"
              // value={rejectedFilter}
              className="w-full h-full py-2 outline-none rounded-md"
              // value={filterValue}
              value={filterInput}
              onChange={handleFilterChange}
            />
            <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
          </div>

          <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 gap-24 justify-items-center overflow-scroll max-lg:grid-cols-1">
            {/* {console.log(filterInput)}   */}
            {(Array.isArray(filterInput ? filteredEmployees : pendingTickets)
              ? filterInput
                ? filteredEmployees
                : pendingTickets
              : []
            ).map((employee) => (
              <div
                key={employee.employee_ID}
                className="shadow-lg h-[525px] bg-white w-full pb-2 overflow-y-scroll overflow-x-hidden flex flex-col items-center rounded-xl border border-gray-300"
              >
                {/* Employee Info */}
                <div className=" w-full flex flex-row max-sm:text-sm text-black text-xl justify-between items-center sticky top-0 bg-white z-30 p-3 py-7 border-b-gray-300 border-b-2 ">
                  <p className="capitalize px-2">
                    {employee.username}
                  </p>
                  <p className=" px-2">
                    ID: {employee.employee_ID}
                  </p>
                </div>

                {/* Tickets */}
                {employee.tickets &&
                  employee.tickets.map(
                    (ticket) =>
                      ticket.What_they_want !== "" &&
                      ticket.ticket_type !== "" && (
                        <div
                          key={ticket.ticket_ID}
                          className=" relative w-full h-full flex items-center p-0 m-0"
                        >
                          {/* Ticket Type */}
                          <div className="flex flex-col max-h-[450px] px-5 pb-5 border-b w-full">
                            <div className="flex h-1/3 w-full flex-col gap-0 mb-5">
                              <div className="w-full flex flex-col items-center mb-5 text-center justify-center rounded-md">
                                <label
                                  htmlFor=""
                                  className="text-xl h-1/3 w-full flex items-center py-4"
                                >
                                  Type
                                </label>
                                <span className="text-lg h-12 opacity-50 overflow-x-scroll overflow-y-hidden w-full flex items-center rounded-lg pl-5 border shadow-md">
                                  {ticket.ticketType}
                                </span>
                              </div>

                              {/* Ticket Reason */}
                              <div className=" w-full flex flex-col items-center text-center rounded-md">
                                <label
                                  htmlFor=""
                                  className="text-xl h-1/3 w-full flex items-center py-4"
                                >
                                  Reason
                                </label>
                                <span className="text-lg h-20 opacity-50 overflow-scroll text-wrap w-full flex rounded-lg p-5 border shadow-md">
                                  {ticket.requestDetails}
                                </span>
                              </div>
                            </div>
                            <div className="h-1/2 w-full flex items-center">
                              <div className=" my-1 w-full gap-5 flex flex-col items-center justify-evenly">
                                <textarea
                                  placeholder="Add Comment..."
                                  type="text"
                                  cols={1}
                                  rows={1}
                                  className="border-2 py-2 h-12 pl-4 border-[--common-color] w-full mr-1 rounded-md resize-none"
                                  onChange={(e) =>
                                    handleCommentChange(
                                      ticket.ticket_ID,
                                      e.target.value
                                    )
                                  }
                                  value={comments[ticket.ticket_ID] || ""}
                                />
                                <div className=" w-full h-full gap-2 flex flex-row items-center justify-center">
                                  <button
                                    className={`py-4 max-sm:py-2 w-1/2 flex items-center justify-center m-0 rounded-md text-base text-white bg-[--common-color] duration-200`}
                                    onClick={() => {
                                      handleCommentSubmit(
                                        employee.employee_ID,
                                        ticket.ticket_ID
                                      );
                                      handleStatusChange(
                                        employee.employee_ID,
                                        ticket.ticket_ID,
                                        "approved"
                                      );
                                    }}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className={`py-4 max-sm:py-2 w-1/2 flex items-center justify-center m-0 rounded-md text-base text-[--common-color] border shadow-md  duration-200`}
                                    onClick={() => {
                                      handleCommentSubmit(
                                        employee.employee_ID,
                                        ticket.ticket_ID
                                      );
                                      handleStatusChange(
                                        employee.employee_ID,
                                        ticket.ticket_ID,
                                        "rejected"
                                      );
                                    }}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <TabView className=".custom-tabview">
          <TabPanel
            header="Return"
            headerClassName=" text-lg text-gray-500 mx-0 flex items-center justify-center rounded-md py-2 shadow-none"
          >
            <div className="border-[1px] border-[--bg-gray] mx-5 bg-white shadow-md text-lg flex gap-2 mb-4 px-8 h-fit w-1/4 max-lg:w-1/2 max-sm:w-[90vw] items-center justify-center flex-row 2xl:flex rounded-md">
              <input
                type="text"
                placeholder="Filter by Employee ID or Name"
                className="w-full h-full py-2 outline-none rounded-md"
                value={searchReturn}
                onChange={(e) => setSearchReturn(e.target.value)}
              />
              <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
            </div>
            <div className="border p-5 m-5 rounded-xl">
              {filteredReturnTickets && filteredReturnTickets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full max-lg:w-[1000px] pb-2 mx-auto border text-lg text-center overflow-x-auto capitalize">
                    {filteredReturnTickets.some(
                      (employee) =>
                        employee.tickets &&
                        employee.tickets.filter(
                          (ticket) => ticket.returnStatus === "Pending"
                        ).length > 0
                    ) && (
                      <thead className="w-full max-lg:w-[1000px] text-xl bg-[#efefef] text-[#444444]">
                        <tr className="border-b border-gray-300">
                          <th className="px-8 py-3 w-1/6">
                            <p className="p-1">S.no</p>
                          </th>
                          <th className="px-8 py-3 w-1/6">
                            <p className="p-1">Name</p>
                          </th>
                          <th className="px-8 py-3 w-1/6">
                            <p className="p-1">Employee ID</p>
                          </th>
                          <th className="px-8 py-3 w-1/6">
                            <p className="p-1">Why</p>
                          </th>
                          <th className="px-8 py-3 w-1/6">
                            <p className="p-1">Status</p>
                          </th>
                          <th className="px-8 py-3 w-1/6">
                            <p className="p-1">Comment</p>
                          </th>
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {filteredReturnTickets.map((employee) => (
                        <React.Fragment key={employee.employee_ID}>
                          {employee.tickets &&
                            employee.tickets.length > 0 &&
                            employee.tickets
                              .filter(
                                (ticket) => ticket.returnStatus === "Pending"
                              )
                              .map((ticket, index) => (
                                <React.Fragment key={ticket.ticket_ID}>
                                  <tr className="border-b">
                                    <td className="px-8 py-2 w-1/6">
                                      {index + 1}
                                    </td>
                                    <td className="px-8 py-2 w-1/6">
                                      {employee.name}
                                    </td>
                                    <td className="px-8 py-2 w-1/6">
                                      {employee.employee_ID}
                                    </td>
                                    <td className="px-8 py-2 w-1/6">
                                      {ticket.returnReason}
                                    </td>
                                    <td className="px-8 py-2 w-1/6">
                                      <button
                                        title="Approve"
                                        className="group hover:bg-[--blue] duration-200 px-2 py-2 bg-white shadow-md text-[--blue] mx-2 rounded-md"
                                        value="Accepted"
                                        onClick={() => {
                                          setCommandBTN(true),
                                            handleReturnStatusChange(
                                              employee.employee_ID,
                                              ticket.ticket_ID,
                                              "Accepted"
                                            );
                                        }}
                                      >
                                        <FaCheck className="group-hover:text-white" />
                                      </button>
                                      <button
                                        title="Reject"
                                        className="group hover:bg-[--red] duration-200 px-2 py-2 bg-white shadow-md text-[--red] mx-2 rounded-md"
                                        value="Declined"
                                        onClick={() => {
                                          setCommandBTN(true),
                                            handleReturnStatusChange(
                                              employee.employee_ID,
                                              ticket.ticket_ID,
                                              "Declined"
                                            );
                                        }}
                                      >
                                        <IoClose className="group-hover:text-white" />
                                      </button>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>

            {/* </div> */}
          </TabPanel>
          <TabPanel
            header="Approved"
            headerClassName=" text-lg text-gray-500 mx-0 flex items-center justify-center rounded-md py-2 shadow-none"
          >
            <div className="border-[1px] border-[--bg-gray] mx-5 bg-white shadow-md text-lg flex gap-2 mb-4 px-8 h-fit w-1/4 max-lg:w-1/2 max-sm:w-[90vw] items-center justify-center flex-row 2xl:flex rounded-md">
              <input
                type="text"
                placeholder="Filter by Employee ID or Name"
                // value={rejectedFilter}
                className="w-full h-full py-2 outline-none rounded-md"
                // value={filterValue}
                value={searchApproved}
                onChange={(e) => setSearchApproved(e.target.value)}
              />
              <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
            </div>
            <div className="border p-5 m-5 rounded-xl">
              {filteredApprovedTickets &&
              filteredApprovedTickets.length === 0 ? (
                <p>No approved tickets found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full h-52 table-auto border capitalize">
                    <thead className="bg-[#efefef] sticky top-0 border-gray-300 text-xl text-[#444444]">
                      <tr>
                        <th className="px-8 py-3 w-1/6 text-center text-nowrap">
                          S.no
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Employee ID
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Name
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Ticket Type
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          What They Want
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Ticket Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApprovedTickets &&
                        filteredApprovedTickets.map((employee, employeeIndex) =>
                          employee.tickets.map((ticket, index) => (
                            <tr key={ticket.ticket_ID} className="border-b">
                              <td className="px-8 py-2 w-1/6 text-center">
                                {index + 1}
                              </td>
                              <td className="px-8 py-2 w-1/3 text-center">
                                {employee.employee_ID}
                              </td>
                              <td className="px-8 py-2 w-1/3 text-center">
                                {employee.username}
                              </td>
                              <td className="px-8 py-2 w-1/3 text-center">
                                {ticket.ticketType}
                              </td>
                              <td className="px-8 py-2 w-1/3 text-center">
                                {ticket.requestDetails}
                              </td>
                              <td className="px-8 py-2 w-1/3 text-center text-[#006E1D]">
                                {ticket.ticketStatus || "N/A"}
                              </td>
                            </tr>
                          ))
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel
            header="Rejected"
            headerClassName=" text-lg text-gray-500 mx-0 flex items-center justify-center rounded-md py-2 shadow-none"
          >
            <div className="border-[1px] border-[--bg-gray] mx-5 bg-white shadow-md text-lg flex gap-2 mb-4 px-8 h-fit w-1/4 max-lg:w-1/2 max-sm:w-[90vw] items-center justify-center flex-row 2xl:flex rounded-md">
              <input
                type="text"
                placeholder="Filter by Employee ID or Name"
                // value={rejectedFilter}
                className="w-full h-full py-2 outline-none rounded-md"
                // value={filterValue}
                value={searchRejected}
                onChange={(e) => setSearchRejected(e.target.value)}
              />
              <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
            </div>
            <div className="border p-5 m-5 rounded-xl">
              {filteredRejectedTickets &&
              filteredRejectedTickets?.length === 0 ? (
                <p>No rejected tickets found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full h-52 text-lg text-center border shadow-lg mt-0 mx-auto capitalize">
                    <thead className="bg-[#efefef] sticky top-0 border-gray-300 text-xl text-[#444444]">
                      <tr>
                        <th className="px-8 py-3 w-1/6 text-center text-nowrap">
                          S.no
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Employee ID
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Name
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Ticket Type
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          What They Want
                        </th>
                        <th className="px-8 py-3 w-1/3 text-center text-nowrap">
                          Ticket Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRejectedTickets &&
                        filteredRejectedTickets.map((employee, employeeIndex) =>
                          employee.tickets.map((ticket, index) => (
                            <tr
                              key={ticket.ticket_ID}
                              className="border-b h-14"
                            >
                              <td className="px-8 py-2 w-1/6">{index + 1}</td>
                              <td className="px-8 py-2 w-1/3">
                                {employee.employee_ID}
                              </td>
                              <td className="px-8 py-2 w-1/3">
                                {employee.username}
                              </td>
                              <td className="px-8 py-2 w-1/3">
                                {ticket.ticketType}
                              </td>
                              <td className="px-8 py-2 w-1/3">
                                {ticket.requestDetails}
                              </td>
                              <td className="px-8 py-2 w-1/3 text-[#E03545]">
                                {ticket.ticketStatus || "N/A"}
                              </td>
                            </tr>
                          ))
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
