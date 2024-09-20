import React, { useState, useRef, useEffect } from "react";
import { TiExport, TiUserAdd } from "react-icons/ti";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";
import { FcDoughnutChart, FcPieChart } from "react-icons/fc";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "./utilities/axiosInstance";
import avatar from "../assets/avatar.webp";
import { GrDocumentUser } from "react-icons/gr";
import { SlNote } from "react-icons/sl";
// PrimeReact Styles
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { RiSearchLine } from "react-icons/ri";
import { PiExportBold } from "react-icons/pi";
import { Tooltip } from "primereact/tooltip";
import { InfinitySpin, MutatingDots } from "react-loader-spinner";
import { IoPersonAddSharp } from "react-icons/io5";
import { Filter, Filter1, Filter1Outlined } from "@mui/icons-material";
import { BiFilter, BiFilterAlt } from "react-icons/bi";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showPieChart, setShowPieChart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState(null);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase once
    setFilterValue(value);

    const filtered = employees.filter((employee) => {
      const username = employee.username.toLowerCase();
      const employeeID = String(employee.employee_ID); // Ensure employee_ID is a string

      return username.includes(value) || employeeID.includes(value);
    });

    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all employees
        const response = await axios.get("/employees");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;

        // Update states with the fetched data
        setEmployees(data);
        setFilteredEmployees(data);
        setLoading(false);

      } catch (error) {
        console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectedOptions = (selectedValues) => {
    setSelectedOptions(selectedValues);

    if (selectedValues.length === 0) {
      setFilteredEmployees(employees);
      return;
    }

    const filteredEmployees = employees.filter((employee) => {
      const workRole = employee?.work_role || "";
      const status = employee?.status || "";
      const team = employee?.team || "";
      return (
        selectedValues.includes(workRole) ||
        selectedValues.includes(status) ||
        selectedValues.includes(team)
      );
    });

    setFilteredEmployees(filteredEmployees);
  };
  const options = [
    {
      label: "Role",
      items: [
        { label: "Design", value: "Design" },
        { label: "Developer", value: "Developer" },
        { label: "Backend", value: "Backend" },
        { label: "Front end", value: "Front end" },
      ],
    },
    {
      label: "Status",
      items: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
    {
      label: "Team",
      items: [
        { label: "Engineering", value: "Engineering" },
        { label: "Testing", value: "Testing" },
        { label: "Design", value: "Design" },
      ],
    },
  ];
  const groupedOptions = (options) => {
    return (
      <div className="flex items-center">
        <div className="font-semibold">{options.label}</div>
        <div className="">{options.items.label}</div>
      </div>
    );
  };

  const handleExportData = () => {
    try {
      const workBook = XLSX.utils.book_new();

      // First sheet data
      const flatData = filteredEmployees.map((employee) => ({
        EmployeeId: employee.employee_ID,
        Name: employee.username,
        Email: employee.email,
        Gender: employee.gender,
        Birthdate: employee.birthdate,
        Role: employee.work_role,
        PhoneNumber: `${employee.phoneNumber}, ${employee.secondaryPhoneNumber}`, // Corrected
        EmergencyContactNumber: employee.emergencyContactNumber,
        Manager: employee.manager,
        Status: employee.status,
        PesonalEmail: employee.personalEmail,
        Nationality: employee.nationality,
        CurrentAddress: employee.currentAddress,
        PermanentAddress: employee.permanentAddress,
        JoinDate: employee.hireDate,
        MaritalStatus: employee.maritalStatus,
        Team: employee.team,
        FromDate: employee.fromDate,
        ToDate: employee.toDate,
        Employee_Score: employee.employee_Score,
      }));

      // Second sheet data
      const flatData1 = filteredEmployees.map((employee) => ({
        EmployeeId: employee.employee_ID,
        Name: employee.username,
        Email: employee.email,
        Role: employee.work_role,
        PhoneNumber: `${employee.phoneNumber}, ${employee.secondaryPhoneNumber}`, // Corrected
        EmergencyContactNumber: employee.emergencyContactNumber,
      }));

      const workSheet = XLSX.utils.json_to_sheet(flatData);
      const workSheet1 = XLSX.utils.json_to_sheet(flatData1);
      XLSX.utils.book_append_sheet(workBook, workSheet1, "Contact Info");
      XLSX.utils.book_append_sheet(workBook, workSheet, "Employees");

      XLSX.writeFile(workBook, "employees_export.xlsx");

      console.log("Export successful");
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const nameheadTemplate = () => {
    return <div className="">Name</div>;
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center flex-col">
        <div className="">
          <div className="flex items-center justify-center flex-col">
            <img
              src={rowData.photoUpload || avatar}
              alt={rowData.username}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-xl font-medium">{rowData.username}</p>
          </div>
          <div className="">{rowData.email}</div>
        </div>
      </div>
    );
  };

  const roleHeadTemplate = () => {
    return <div className="">Role</div>;
  };

  const roleBodyTemplate = (rowData) => {
    return (
      <div className="text-xl font-normal">
        {rowData.work_role?.split(",").map((work_role, index) => (
          <span key={index} className="">
            {work_role}
          </span>
        ))}
      </div>
    );
  };

  const employeeheadTemplate = () => {
    return <div className="">employee_ID</div>;
  };

  const employeeIdBodyTemplate = (rowData) => {
    return (
      <div className="text-xl font-normal">
        {rowData.employee_ID?.split(",").map((employee_ID, index) => (
          <span key={index} className="">
            {employee_ID}
          </span>
        ))}
      </div>
    );
  };

  const teamHeadTemplate = () => {
    return <div className="">Team</div>;
  };

  const teamsBodyTemplate = (rowData) => {
    return (
      <div className="text-xl font-normal">
        {rowData.team?.split(",").map((team, index) => (
          <span key={index} className="">
            {team}
          </span>
        ))}
      </div>
    );
  };

  const deleteHeadTemplate = () => {
    return <div className="">Action</div>;
  };

  const deleteBodyTemplate = (rowData) => {
    const isSelected = selectedEmployees?.some(
      (emp) => emp.employee_ID === rowData.employee_ID
    );
    return (
      <div className={`flex gap-2 items-center justify-center`}>
        <Link to={`/auth/editEmployee/${rowData.employee_ID}`}>
          <div className="flex justify-center items-center shadow-[0_0_5px_0] shadow-gray-300 text-[--common-color] hover:bg-[--common-color] hover:text-white px-2 py-2 rounded-md border">
            {/* Edit Icon with Tooltip */}
            <Tooltip target=".edit-icon" position="top" content="Edit" />
            <SlNote className="edit-icon cursor-pointer" />
          </div>
        </Link>
        <Link to={`/auth/details/${rowData.employee_ID}`}>
          <div className="flex justify-center items-center shadow-[0_0_5px_0] shadow-gray-300 text-[--common-color] hover:bg-[--common-color] hover:text-white px-2 py-2 rounded-md  border">
            {/* Edit Icon with Tooltip */}
            <Tooltip target=".details-icons" position="top" content="Details" />
            <GrDocumentUser className="details-icons cursor-pointer" />
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full border rounded-xl shadow-md">
      <div className="w-full">
        <p className="text-3xl p-5 font-semibold text-[#444444]">
          List of Employees
        </p>
      </div>
      <div className="flex flex-col justify-between items-center my-0 px-5 py-3 rounded-lg w-full max-sm:flex max-sm:flex-col max-lg:flex-col max-xl:flex max-xl:flex-col">
        <div className="flex w-full flex-col gap-5 max-lg:flex-col max-lg:h-1/2 items-center max-sm:flex max-sm:flex-col max-sm:relative max-xl:flex max-xl:flex-col ">
          <div className="flex w-full h-full flex-row max-xl:flex-col items-center lg:gap-3">
            <div className="flex w-full max-lg:justify-evenly items-center max-2xl:flex-row xl:flex-col 2xl:flex-row flex-row max-md:flex-col gap-3 max-lg:grid max-lg:grid-cols-1 max-xl:grid max-xl:grid-cols-1 max-2xl:grid-cols-1">
              <div className="flex flex-row max-lg:w-full gap-5">
                <div className="relative h-fit w-fit flex items-center justify-between flex-row max-lg:w-full border-[1px] max-2xl:w-full shadow-md border-gray-300 bg-white rounded-xl max-md:placeholder:text-xs px-2 py-0 outline-none ">
                  <RiSearchLine className="text-gray-400 w-[25px] h-[25px] max-md:h-14" />
                  <input
                    type="text"
                    className=" max-md:w-4/5 w-fit h-14 max-sm:h-fit placeholder:text-lg outline-none mx-2 text-xl"
                    placeholder="Search"
                    value={filterValue}
                    onChange={handleFilterChange}
                  />
                </div>
                <MultiSelect
                  value={selectedOptions}
                  options={options}
                  onChange={(e) => handleSelectedOptions(e.value)}
                  placeholder="Filter"
                  optionLabel="label"
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  display="chip"
                  optionGroupTemplate={groupedOptions}
                  className="relative border-[1px] max-lg:hidden max-lg:w-1/3 lg:flex items-center justify-between w-40  text-xl font-semibold px-3 placeholder:text-[#444444] max-md:h-14 max-2xl:w-full shadow-md border-gray-300 max-md:placeholder:text-xs max-md:content-between rounded-xl py-[6px] outline-none"
                />
                <MultiSelect
                  value={selectedOptions}
                  options={options}
                  onChange={(e) => handleSelectedOptions(e.value)}
                  placeholder={<BiFilterAlt />}
                  optionLabel="label"
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  display="chip"
                  optionGroupTemplate={groupedOptions}
                  className="relative hidden max-lg:flex border-[1px] max-lg:w-1/3 items-center justify-between w-40  text-xl font-semibold px-3 placeholder:text-[#444444] max-md:h-14 max-2xl:w-full shadow-md border-gray-300 max-md:placeholder:text-xs max-md:content-between rounded-xl py-[6px] outline-none"
                />
              </div>

              <div className="flex flex-row gap-5">
                <Button
                  label={`Export`}
                  className=" max-md:w-16 max-lg:hidden max-md:h-16 px-2 border border-gray-300 max-md:items-center font-medium h-14 w-40 max-md:justify-center text-xl p-button-outlined bg-white shadow-md flex items-center hover:bg-[--common-color] hover:border-transparent hover:text-white duration-200 text-[#444444] justify-center rounded-xl"
                  onClick={handleExportData}
                />
                <Button
                  label={<PiExportBold />}
                  className="hidden max-lg:flex max-lg:w-1/5 max-lg:items-center text-center max-lg:justify-center border w-fit p-3 rounded-xl shadow-[0_0_5px_0] shadow-gray-300 bg-[--common-color] text-white text-3xl"
                  onClick={handleExportData}
                />

                <div className="bg-white max-xl:w-full max-md:text-base text-xl px-5 max-lg:w-full font-semibold text-[#444444] shadow-md w-fit flex items-center flex-row justify-between max-xl:justify-center py-0 border border-gray-300 rounded-xl text-center">
                  <p className="text-nowrap  max-lg:text-wrap">
                    Total Employees:
                  </p>
                  <span className="px-2 rounded-md">{employees.length}</span>
                  <FcPieChart
                    onClick={() => {
                      setShowPieChart(true);
                    }}
                    className=" max-md:h-16 max-md:hidden max-md:w-1/2 cursor-pointer w-10 m-2 h-10 flex items-center justify-center text-center text-[56px] rounded-md rounded-l-none duration-200"
                  />
                </div>
              </div>
            </div>
            <div className=" w-full mt-3 lg:mt-0 lg:justify-end lg:flex max-2xl:w-fit max-sm:w-full">
              <Link
                to={"/auth/addNewEmployee"}
                className="w-fit max-lg:w-full px-0 max-2xl:w-full max-xl:w-full flex items-center justify-end"
              >
                <Button className="newemp max-md:h-14 max-sm:w-full w-full  max-md:px-4 h-14 px-2 items-center justify-center gap-5 flex-row bg-[--common-color] max-2xl:w-full max-xl:w-fit duration-200 shadow-md flex text-nowrap rounded-xl max-lg:px-16 max-xl:px-20 text-white">
                  <IoPersonAddSharp className="max-lg:m-0 text-2xl" />
                  <p className=" max-md:flex text-lg font-semibold">
                    Add New Employee
                  </p>
                </Button>
              </Link>
              <Tooltip
                target=".newemp"
                position="top"
                content="Add New Employee"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="border flex flex-col items-center justify-evenly shadow-md rounded-xl mb-5">
          <InfinitySpin
            visible={true}
            width="200"
            color="#175FBE"
            ariaLabel="infinity-spin-loading"
          />
          <p className="m-10">Fetching Data Please Wait....</p>
        </div>
      ) : (
        <div className="card w-full mb-10 h-full p-0">
          <DataTable
            value={filteredEmployees}
            selection={selectedEmployees}
            onSelectionChange={(e) => setSelectedEmployees(e.value)}
            dataKey="employee_ID"
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={10}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rowsPerPageOptions={[10, 15, 20]}
            className="custom-datatable"
          >
            <Column
              field="name"
              align="center"
              header={nameheadTemplate}
              body={nameBodyTemplate}
              headerStyle={{ backgroundColor: "#F5F5F5", fontSize: "22px" }}
            ></Column>

            <Column
              field="role"
              align="center"
              header={roleHeadTemplate}
              body={roleBodyTemplate}
              headerStyle={{ backgroundColor: "#F5F5F5", fontSize: "22px" }}
            ></Column>
            <Column
              field="employee_ID"
              align="center"
              header={employeeheadTemplate}
              body={employeeIdBodyTemplate}
              headerStyle={{ backgroundColor: "#F5F5F5", fontSize: "22px" }}
            ></Column>
            <Column
              field="team"
              align="center"
              header={teamHeadTemplate}
              body={teamsBodyTemplate}
              headerStyle={{ backgroundColor: "#F5F5F5", fontSize: "22px" }}
            ></Column>
            <Column
              field="deleteBtn"
              align="center"
              header={deleteHeadTemplate}
              body={deleteBodyTemplate}
              headerStyle={{ backgroundColor: "#F5F5F5", fontSize: "22px" }}
            ></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
}
