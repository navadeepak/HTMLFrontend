import React, { useEffect, useState } from "react";
import axios from "./utilities/axiosInstance";
import "./custom css/colors.css";
import AdminTodos from "./AdminTodos";
import EmployeeTodos from "./EmployeeTodos";
import { useEmployeeContext } from "../context/EmployeeContext";

export default function ToDos() {
  const [role, setRole] = useState("");
  const { employee } = useEmployeeContext();
  useEffect(() => {
    if(employee)  setRole(employee.role)
  }, [employee])

  return (
    <div className="bg-[#FBFBFB] h-full">
      <p className=" bg-white py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">Project</p>
        </span>
      </p>
      {role && role === "employee" ? <EmployeeTodos /> : <AdminTodos />}


    </div>
  );  
}
