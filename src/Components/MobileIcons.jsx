import React, { useEffect, useState } from "react";
import { AiFillProject } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsPersonFillCheck, BsPersonFillX } from "react-icons/bs";
import { IoPersonSharp, IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "../Components/utilities/axiosInstance";
import { useEmployeeContext } from "../context/EmployeeContext";

function MobileIcons() {
  const [empID, setEmpID] = useState("");
  const { employee } = useEmployeeContext();
  useEffect(() => {
    if(employee)  setEmpID(employee.employee_ID);
    
  }, [employee])
  const icondata = [
    {
      routlink: `/auth/attendance/${empID}`,
      icon: <BsPersonFillCheck />,
      title: "Attendance",
    },
    {
      routlink: "/auth/employee",
      icon: <IoPersonSharp />,
      title: "Employees",
    },
    {
      routlink: "/auth/todos",
      icon: <BiTask />,
      title: "Project",
    },
    {
      routlink: "/auth/leave",
      icon: <BsPersonFillX />,
      title: "Leave",
    },
    {
      routlink: "/auth/ticket",
      icon: <IoTicket />,
      title: "Ticket",
    },
    {
      routlink: "/auth/Meeting",
      icon: <AiFillProject />,
      title: "Meeting",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <p className="text-xl font-semibold">Quick Links</p>
      <div className="grid grid-cols-3 w-full">
        {icondata.map((data, key) => (
          <Link
            to={data.routlink}
            className="flex flex-col items-center justify-between gap-3 my-5"
          >
            <div className="shadow-[0_0_5px_0] shadow-gray-300 rounded-full p-5 text-[--common-color] text-3xl">
              {data.icon}
            </div>
            <p>{data.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileIcons;
