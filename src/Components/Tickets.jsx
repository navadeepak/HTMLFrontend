import React, { useState, useEffect } from "react";
import axios from "axios";

import EmployeeTickets from "./EmployeeTickets";
import AdminTickets from "./AdminTickets";
import { Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

const Tickets = () => {
  const [role, setRole] = useState("");
  const { employee } = useEmployeeContext();
  useEffect(() => {
    if(employee)  setRole(employee.role)
  }, [employee])

  return (
    <>
      {/* Employee view */}

      <div
        className={`${role&&role === "admin" ? "hidden" : "block"} h-screen w-full`}
      >
        <EmployeeTickets />
      </div>
      {/* Admin view */}

      <div className={`${role&&role === "employee" ? "hidden" : "block "}`}>
        <AdminTickets />
      </div>
    </>
  );
};

export default Tickets;
