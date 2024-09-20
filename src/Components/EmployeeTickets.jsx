import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import "./custom css/colors.css";
import "./custom css/primeReactComponentOverWritedStyle.css";
import { Toast } from "primereact/toast";

export default function EmployeeTickets() {
  const [Reason, setReason] = useState("");
  const [Ticket_Type, setTicket_Type] = useState("");
  const [role, setRole] = useState("");
  const [employee_ID, setEmployee_ID] = useState("");
  const [userName, setUserName] = useState("");
  const [ticketExists, setTicketExists] = useState("");
  const [What_they_want, setWhat_they_want] = useState("");
  const [ticketStatusByAdmin, setTicketStatusByAdmin] = useState("");
  const [OtherText, setOtherText] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [comment_for_ticket_by_admin, setcomment_for_ticket_by_admin] =
    useState("");
  const [qparticularEmpData, setParticularEmpData] = useState({});
  const [showReturn, setShowReturn] = useState(false);
  const [returnReasons, setReturnReasons] = useState({});
  const [message, setMessage] = useState("");
  const [dailogForReturn, setDailogForReturn] = useState(false);
  const openinput = () => {
    setDailogForReturn(true);
  };
  const closeinput = () => {
    setDailogForReturn(false);
  };

  const [myAllTickets, setMyAllTickets] = useState("");

  const ticketOptions = [
    { value: "", text: "-- Select --" },
    { value: "Keyboard", text: "Keyboard" },
    { value: "Mouse", text: "Mouse" },
    { value: "Laptop", text: "Laptop" },
    { value: "Desktop", text: "Desktop" },
    { value: "Other", text: "Other" },
  ];

  const handleTicketTypeChange = (e) => {
    const selectedValue = e.target.value;
    setTicket_Type(selectedValue);

    // Reset other text input if user selects a predefined option
    if (!ticketOptions.find((option) => option.value === selectedValue)) {
      setOtherText(""); // Clear other text input if user selects a predefined option
    }
  };

  const handleOtherTextChange = (e) => {
    setOtherText(e.target.value);
    setTicket_Type(e.target.value); // Update Ticket_Type with input field value
  };

  const designationOptions = [
    { value: "admin", text: "Admin" },
    { value: "employee", text: "Employee" },
  ];
  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/check-role/${email}`
        );
        setRole(response.data.role?.toLowerCase());
        setEmployee_ID(response.data.employee_ID);
        setUserName(response.data.username);
        setTicketExists(response.data.ticket_type);
        setWhat_they_want(response.data.What_they_want);
        setTicketStatusByAdmin(response.data.ticketStatus);
        setParticularEmpData(response.data);
        setcomment_for_ticket_by_admin(
          response.data.comment_for_ticket_by_admin
        );
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
    const fetchEmployeesWithTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/tickets/all"
        );
        // console.log(response.data);
        const data = response.data;
        const myData = data.find((emp) => emp.employee_ID === employee_ID);
        if (myData) {
          // console.log(myData);
          setMyAllTickets(myData);
        }

        // console.log(employee_ID);

        // setEmployeesWithTickets(response.data);
      } catch (error) {
        console.error("Error fetching employees with tickets:", error);
        // Handle error or show error message to the user
      }
    };

    fetchEmployeesWithTickets();
  }, [employee_ID]);

  // const returnReasons = {};

  const sendTicket = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (Reason.trim().length > 0 && Ticket_Type.trim().length > 0) {
      const url = `http://localhost:3001/employees/ticketsobj/${employee_ID}`;

      const payload = {
        tickets: [
          {
            ticketStatus: "Pending",
            requestDetails: Reason,
            ticketType: Ticket_Type,
          },
        ],
      };

      try {
        const response = await axios.patch(url, payload);
        // console.log("success", response);
        setReason("");
        setTicket_Type("");
        toast.success("SuccessFully added");
      } catch (error) {
        setStatus(`Error updating ticket: ${error.message}`);
        toast.error("Ticket Filed");
      }
    } else {
      // Handle the case where Reason or Ticket_Type is empty
      console.warn("Both Reason and Ticket Type must be filled.");
      toast.error("Fill All Filed");
    }
  };

  const handleReturn = async (ticket_ID) => {
    setShowReturn(true);
    try {
      const response = await axios.patch(
        `http://localhost:3001/employees/tickets/${employee_ID}/${ticket_ID}`,
        {
          returnReason: returnReasons[ticket_ID],
          returnStatus: "Pending",
        }
      );

      toast.success("Message sent");

      // After successful message send, update state to disable return button
      setReturnReasons((prevState) => ({
        ...prevState,
        [ticket_ID]: true, // Set to true to disable the button
      }));

      // Clear the input field
      setReturnReason("");

      // Update the ticket in the state with the return status from backend
      setParticularEmpData((prevData) => {
        // Ensure prevData is an array before mapping
        if (!Array.isArray(prevData)) {
          return prevData; // Return current state if not an array
        }

        return prevData.map((emp) => ({
          ...emp,
          tickets: emp.tickets.map((tkt) =>
            tkt.ticket_ID === ticket_ID
              ? {
                  ...tkt,
                  returnStatus: response.data.returnStatus, // Update returnStatus from backend
                }
              : tkt
          ),
        }));
      });
    } catch (error) {
      //console.log("Error in sending ticket", error);
      toast.error("Error Occurred. Retry again");
    }
  };

  const toggleReturnInput = (ticket_ID) => {
    setReturnReasons((prevState) => ({
      ...prevState,
      [ticket_ID]: " ",
    }));
  };

  const handleDelete = async (employee_ID, ticket_ID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/employees/tickets/delete/${employee_ID}/${ticket_ID}`
      );
      setMessage(response.data.message);
      toast.success(`Deleted successfully`);
    } catch (error) {
      toast.error(`try again`);
    }
  };

  return (
    <div>
      <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">Tickets</p>
        </span>
      </p>
      <div className=" w-full h-fit flex overflow-x-hidden max-lg:w-full p-5">
        <form className="mx-auto w-full overflow-x-hidden max-lg:w-full border rounded-xl">
          <div className="mt-4 rounded-lg shadow-xl bg-white overflow-x-hidden">
            <div className="p-10 grid grid-cols-2 gap-4 max-lg:flex max-lg:flex-col">
              <div className="flex flex-col">
                <label htmlFor="empid" className="font-semibold text-base">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="empid"
                  value={employee_ID}
                  className="border-[1px] border-[--bg-gray] rounded-md p-2 h-16 bg-white shadow-md text-[#444444] font-semibold text-base"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="empname" className="font-semibold text-base">
                  Employee Name
                </label>
                <input
                  type="text"
                  id="empname"
                  value={userName}
                  className="border-[1px] border-[--bg-gray] rounded-md p-2 h-16 bg-white shadow-md text-[#444444] font-semibold text-base"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="designation"
                  value={role}
                  disabled
                  className="font-semibold text-base"
                >
                  Designation
                </label>
                <p
                  id="designation"
                  value={role}
                  className="border-[1px] border-[--bg-gray] rounded-md p-2 h-16 bg-white shadow-md flex items-center justify-start text-[#444444] font-semibold text-base"
                >
                  {role}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="reason" className="font-semibold text-base">
                  Products
                </label>
                <select
                  id="reason"
                  value={Ticket_Type}
                  onChange={handleTicketTypeChange}
                  className="border-[1px] border-[--bg-gray] rounded-md p-2 h-16 bg-white shadow-md text-[#444444] font-semibold text-base"
                >
                  {ticketOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>

                {/* Render input field for "Other" option */}
                {Ticket_Type === "Other" && (
                  <input
                    type="text"
                    value={OtherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Enter other product"
                    className="border-[1px] border-[--bg-gray] rounded-md p-2 h-16 bg-white shadow-md text-[#444444] font-semibold text-base"
                  />
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="explain" className="font-semibold text-base">
                  What and Why you want ?
                </label>
                <textarea
                  id="explain"
                  value={Reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="border-[1px] border-[--bg-gray] rounded-md p-2 h-16 bg-white shadow-md  text-[#444444] font-semibold text-base resize-none"
                />
              </div>
              <div className="flex justify-end pt-8 col-span-2">
                <button
                  type="submit"
                  className=" font-bold py-3 px-12 rounded bg-[--common-color] text-white shadow-lg"
                  onClick={sendTicket}
                >
                  <p className="">Create</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        {/*  */}
        {myAllTickets.tickets ? (
          <div className="mx-4 overflow-x-scroll">
            <table className="w-full h-72 pb-2 mx-auto bg-gray-100 my-6 flex flex-col text-lg mt-10 text-center shadow-lg rounded-lg overflow-scroll max-lg:w-[1000px]">
              <thead className=" uppercase rounded-lg flex items-center justify-center text-[#444444] bg-[#EFEFEF] sticky top-0 max-lg:w-[1000px]">
                <tr className="w-full flex flex-row justify-evenly items-center max-lg:w-[1000px]">
                  <th className="px-8 w-1/2">
                    <p className="p-1">S.no</p>
                  </th>
                  <th className="px-8 w-1/2">
                    <p className="p-1">required</p>
                  </th>
                  <th className="px-8 w-1/2">
                    <p className="p-1">Status</p>
                  </th>

                  <th className="px-8 w-1/2">
                    <p className="p-1">Reason</p>
                  </th>
                  <th className="px-8 w-1/2">
                    <p className="p-1">Actions</p>
                  </th>
                  <th className="px-8 w-1/2">
                    <p className="p-1">Return Status</p>
                  </th>
                  <th className="px-8 w-1/2">
                    <p className="p-1">Return Comment</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {myAllTickets.tickets.map((ticket, index) => (
                  <tr
                    key={ticket.ticket_ID}
                    className="w-full flex flex-row justify-evenly items-center bg-gray-100 rounded border-[1px] border-gray-200 border-1 max-lg:w-[1000px]"
                  >
                    <td className="px-8 py-2 w-1/2 ">
                      {index + 1}
                    </td>
                    <td className="px-8 py-2 w-1/2 ">
                      {ticket.ticketType}
                    </td>
                    <td className="px-8 py-2 w-1/2 ">
                      {ticket.ticketStatus || "N/A"}
                    </td>
                    <td className="px-8 py-2 w-1/2 ">
                      {ticket.adminComment || "N/A"}
                    </td>
                    <td className="px-8 py-2 w-1/2 ">
                      {/* {returnReason&&console.log(returnReasons[ticket.ticket_ID])} */}
                      {ticket.ticketStatus === "approved" &&
                        ticket.returnStatus !== "Accepted" && (
                          <button
                            className="px-3 py-1 rounded-lg bg-[--common-color] text-white"
                            onClick={() => {
                              toggleReturnInput(ticket.ticket_ID),
                                setDailogForReturn(true);
                            }}
                          >
                            Return
                          </button>
                        )}

                      {ticket.ticketStatus !== "approved" &&
                        !returnReasons[ticket.ticket_ID] && (
                          <td className="px-8 py-2 w-1/2 ">
                            N/A
                          </td>
                        )}

                      {ticket.ticketStatus === "approved" &&
                        returnReasons[ticket.ticket_ID] && (
                          <div
                            className={`px-8 py-2 flex flex-col justify-center items-center text-center absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 ${
                              dailogForReturn ? "flex" : "hidden"
                            }`}
                          >
                            <div className="w-[300px] h-fit bg-white p-5 rounded-lg flex flex-col gap-10">
                              <input
                                placeholder="Why returning?"
                                className="px-2 py-1 border-[1px] bg-white border-[--bg-gray] shadow-md rounded-lg mx-2"
                                value={returnReasons[ticket.ticket_ID] || ""}
                                onChange={(e) =>
                                  setReturnReasons((prevState) => ({
                                    ...prevState,
                                    [ticket.ticket_ID]: e.target.value,
                                  }))
                                }
                              />
                              <div>
                                <button
                                  className="cursor-pointer shadow-md mx-2 px-2 py-1 bg-[--blue] text-white rounded"
                                  onClick={() => {
                                    handleReturn(ticket.ticket_ID);
                                    setDailogForReturn(false);
                                  }}
                                >
                                  Send
                                </button>
                                <button
                                  className="cursor-pointer shadow-md mx-2 px-2 py-1 bg-[--blue] text-white rounded"
                                  onClick={() => {
                                    setDailogForReturn(false);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                    </td>
                    {ticket.returnStatus !== "N/A" && (
                      <td className="px-8 py-2 w-1/2 ">
                        {ticket.returnStatus || "N/A"}
                      </td>
                    )}
                    {ticket.returnReason !== "N/A" && (
                      <td className="px-8 py-2 w-1/2 ">
                        {ticket.adminReturnComment || "N/A"}
                      </td>
                    )}

                    {ticket.returnReason === "Accepted" &&
                      ticket.ticketStatus === "approved"}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
