import React from "react";
import LeaveAtendence from "../component/LeaveAtendence";
import PerformanceGraph from "../component/PerformanceGraph";
import EmployeeDetails from "../component/EmployeeDetails";
import Calender from "../component/Calender";
import Links from "../component/Links";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="my-20 mx-18">
        <LeaveAtendence />
        <PerformanceGraph />
        <div className="w-11/12 flex justify-between">
          <EmployeeDetails />
          <Links />
        </div>
      </div>
      <div className="w-fit">
        <Calender />
      </div>
    </div>
  );
};

export default Dashboard;
