import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link, useNavigate } from "react-router-dom";
import axios from "./utilities/axiosInstance";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FaTasks } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import "./custom css/primeReactComponentOverWritedStyle.css";
import "./custom css/colors.css";
import { RiSearchLine } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { PiCalendarBlankLight } from "react-icons/pi";
import { IoMdDoneAll } from "react-icons/io";
import { useEmployeeContext } from "../context/EmployeeContext";
// // import { fetchUserRole } from "./EmployeeTodos"; 

export default function AdminTodos() {
  const { tasklist } = useEmployeeContext();

  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [selectedEmpName, setSelectedEmpName] = useState("");
  const [selectEmpAllTask, setSelectEmpAllTask] = useState();
  const [taskTodo, setTaskTodo] = useState([]);
  const [taskProgress, setTaskProgress] = useState([]);
  const [taskComplete, setTaskComplete] = useState([]);

  const fetchData = useCallback(async (selectedData) => {
    try {
      console.log("i am called");
      console.log(selectedData.employee_ID);
      setSelectedEmpId(selectedData.employee_ID);
      setSelectedEmpName(selectedData.username);

      const data = await tasklist(selectedData.employee_ID);
      if (!data || !data.task_list) {
        console.error("Task list data is undefined or missing");
        return; // Exit early if data or task_list is missing
      }

      setSelectEmpAllTask(data);

      let todo = data.task_list.filter((e) => e.task_board_type === "To_do");
      let progress = data.task_list.filter(
        (e) => e.task_board_type === "In_Progress"
      );
      let complete = data.task_list.filter(
        (e) => e.task_board_type === "Completed"
      );

      console.log("all Task", data);
      console.log("todo", todo);
      console.log("progress", progress);
      console.log("complete", complete);

      setTaskTodo(todo);
      setTaskProgress(progress);
      setTaskComplete(complete);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  }, []);

  const [employees, setEmployees] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [detailsTable, setDetailsTable] = useState(false);
  const [assginBy, setAssginBy] = useState("");
  const [task, setTask] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dead, setDead] = useState("");
  const today = new Date();

  const [taskvisible, setTaskVisible] = useState(false);

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(`employees/check-role/${email}`);
        // setToDo(response.data.task_list);
        // setRole(response.data.role);
        setEmployeeId(response.data.employee_ID);
        setAssginBy(`${response.data.employee_ID}&${response.data.username}`);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  const handleAssignByID = (data) => {
    let id = data.split("&")[0];
    return id;
  };

  const handleAssignByName = (data) => {
    let name = data.split("&")[1];
    return name;
  };

  const taskSubmit = async (event) => {
    const current = new Date();

    // const assignTime = current.toLocaleTimeString(undefined, options);

    event.preventDefault();

    const data = {
      task_list: [
        {
          task_board_type: "To_do",
          title: taskTitle,
          task: task,
          task_board_details: taskDetails,
          deadline: dead,
          assign_time: current,
          assigned_by: assginBy,
        },
      ],
    };

    const url = `http://localhost:3001/employees/task_list/${employeeId}`;

    try {
      const response = await axios.put(url, data);
      toast.success("Task added successfully!");
      // setTimeout(() => window.location.reload(), 1000);
      console.log(response);
      console.log(data);
      setTaskVisible(false);
      fetchUserRole();
    } catch (error) {
      toast.error("Error adding task.");
      console.error("Error adding task:", error);
    }
  };

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("/employees");

      // Directly set employees data without explicit status check
      setEmployees(response.data);
    } catch (error) {
      console.error("Fetch All Employees error:", error);
      toast.error("Failed to load employees. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value.toLowerCase());
  };

  const filteredEmployees = useMemo(() => {
    const searchTerm = filterValue?.toLowerCase() || "";

    return employees.filter((employee) => {
      const username = employee.username.toLowerCase();
      const employeeID = String(employee.employee_ID);
      return username.includes(searchTerm) || employeeID.includes(searchTerm);
    });
  }, [filterValue, employees]);

  const handleTaskAssign = (employeeId) => {
    setTaskVisible(true);
    setEmployeeId(employeeId);
  };

  const handleView = (rowData) => {
    setDetailsTable(true);
    console.log(rowData, "nill");
    fetchData(rowData);
  };

  const onHide = () => {
    setDetailsTable(false);
    setTaskVisible(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDead(e.target.value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const nameBodyTemplate = (rowData) => (
    <div className="flex items-center gap-2 text-xl">
      <Link
        to={`/auth/attendance/${rowData.employee_ID}`}
        className="flex items-center gap-2"
      >
        <div>
          <div className="text-xl font text-[#444444]">{rowData.username}</div>
          <div className="text-gray-500 text-lg">{rowData.email}</div>
        </div>
      </Link>
    </div>
  );

  const employeeIdBodyTemplate = (rowData) => (
    <div className="flex justify-center text-xl">
      <div className="text-[#444444] font-normal">{rowData.employee_ID}</div>
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    // <span className="py-1 rounded-full px-4 inline-block">
    <button
      className="font-medium px-4 shadow-md hover:text-white hover:bg-[--common-color] py-2 rounded-md  text-lg text-[--common-color] bg-[#F0F4FF] duration-200 text-nowrap"
      onClick={() => handleTaskAssign(rowData.employee_ID)}
    >
      Assign Task
    </button>
    // </span>
  );

  const viewBodyTemplate = (rowData) => (
    <div className="flex w-full items-center justify-center">
      <button
        onClick={() => handleView(rowData)}
        className="p-2 rounded-md text-[--common-color] shadow-md text-xl flex items-center text-center  border hover:text-white hover:bg-[--common-color] duration-200"
      >
        <FaTasks />
      </button>
    </div>
  );

  const format = (assignTime) => {
    console.log(assignTime);

    const date = new Date(assignTime);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedDate = date
      .toLocaleString("en-IN", options)
      .replace(",", "");

    return formattedDate; // Will return something like "9:30 am 14-09-2024"
  };

  return (
    <div>
      <div className="mt-0 mb-0 px-1 w-full bg-[#FBFBFB]">
        <div className="flex flex-col items-center justify-center p-4">
          <div
            className={`py-5 border shadow-md w-full rounded-lg gap-5 ${
              detailsTable ? "hidden" : "block"
            }`}
          >
            <div className="flex justify-between my-0 rounded-lg w-full mb-5 pl-5">
              <div className="border-[1px] border-gray-300 shadow-md bg-white p-1 px-2 mb-0 rounded-md w-80 flex flex-row items-center justify-center">
                <input
                  type="text"
                  placeholder="Filter by Employee ID or Name"
                  value={filterValue}
                  onChange={handleFilterChange}
                  className={` h-10 w-full outline-none bg-white text-xl`}
                />
                <RiSearchLine className={`w-[25px] h-[25px] text-gray-400`} />
              </div>
            </div>
            <div className="card w-full h-full overflow-hidden">
              <DataTable
                value={filteredEmployees}
                dataKey="employee_ID"
                paginator
                rows={10}
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate={`Total: {totalRecords}`}
                rowsPerPageOptions={[10, 15, 20]}
                className="custom-datatable"
              >
                <Column
                  field="s.no"
                  header="S.No"
                  body={(rowData, { rowIndex }) => rowIndex + 1}
                  headerClassName="bg-[#f5f5f5] text-xl text-black border-b border-t border-gray-300 flex items-center"
                  className="text-black font-semibold border-b border-gray-300 w-10 text-center"
                />

                <Column
                  field="name"
                  header="Name"
                  body={nameBodyTemplate}
                  headerClassName="bg-[#f5f5f5] text-xl text-black px-30 border-b border-t border-gray-300"
                  className="text-black font-semibold border-b border-gray-300  w-1/4"
                />

                <Column
                  field="employee_ID"
                  header="Employee ID"
                  body={employeeIdBodyTemplate}
                  headerClassName="bg-[#f5f5f5] text-xl text-black px-30 border-b border-t border-gray-300 text-center text-nowrap flex items-center justify-center"
                  className="text-black font-semibold border-b border-gray-300"
                  bodyClassName="text-[#4444444]"
                />

                <Column
                  field="Action"
                  header="Action"
                  body={actionBodyTemplate}
                  headerClassName="bg-[#f5f5f5] text-xl text-black text-center border-b border-t border-gray-300 "
                  bodyClassName={
                    "text-xl text-black text-center border-b border-t border-gray-300 w-1/6"
                  }
                />
                <Column
                  field="Status"
                  header="Status"
                  body={viewBodyTemplate}
                  headerClassName="bg-[#f5f5f5] text-xl text-black w-2/12 border-b border-t  border-gray-300 text-center"
                  className="font-semibold border-b border-gray-300 w-2/12 text-center items-center content-center"
                  bodyClassName="text-xl text-black w-2/12 border-b border-t border-gray-300 text-center "
                />
              </DataTable>
            </div>
          </div>

          <div
            className={`${
              detailsTable ? "block" : "hidden"
            } p-5 h-screen max-sm:h-full w-full border shadow-md rounded-lg`}
          >
            <div className="flex flex-row max-sm:flex-col-reverse w-full justify-between max-sm:gap-5">
              <div className=" flex flex-row max-sm:flex-col-reverse max-sm:items-start max-sm:gap-5 items-center justify-between w-fit max-sm:w-full gap-10">
                <div className="border shadow-md rounded-md h-full flex flex-row gap-5 items-center px-5 max-sm:w-full py-2 max-sm:justify-between">
                  <p className="capitalize w-full">
                    {selectedEmpId && selectedEmpId}
                  </p>
                  <p className="text-[#444444] w-full text-nowrap flex items-center justify-end">
                    {selectedEmpName && selectedEmpName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailsTable(false)}
                className="bg-[--common-color] max-sm:w-fit px-5 py-2 text-base gap-3 text-white rounded-md flex flex-row items-center"
              >
                <span>
                  <BiLeftArrowAlt />
                </span>
                <p>Back</p>
              </button>
            </div>

            {selectEmpAllTask && selectEmpAllTask.task_list.length > 0 ? (
              <div className="h-full w-full flex flex-row mt-5 gap-5 max-lg:flex-col">
                <div className="w-1/3 max-lg:w-full h-full flex flex-col items-center overflow-hidden text-2xl font-semibold text-[#444444]">
                  <div className="flex w-full flex-row items-center justify-between px-5 border-b-2 border-b-[#FF0303] py-2 shadow-md">
                    <p>Pending</p>
                    <p className="font-normal border border-gray-300 rounded-3xl px-5">
                      {taskTodo && taskTodo.length}
                    </p>
                  </div>
                  <div className="max-h-[750px] w-full overflow-scroll gap-5 flex flex-col py-4 max-lg:flex-row">
                    {taskTodo &&
                      taskTodo.map((data) => (
                        <div className="w-full flex flex-col items-center gap-4 pt-5 border shadow-md rounded-md max-sm:min-w-[80vw] max-sm:justify-between">
                          <p className=" w-full font-bold text-3xl px-5 flex-col flex justify-between ">
                            <span className="flex flex-row w-full items-center justify-end gap-2">
                              <MdOutlineAssignmentInd />
                              <div className="flex-col items-start justify-center flex">
                                <span className="text-sm">
                                  {handleAssignByName(data.assigned_by)}
                                </span>
                                <span className="text-sm">
                                  {handleAssignByID(data.assigned_by)}
                                </span>
                              </div>
                            </span>
                            <hr className="my-2"/>
                            <span>{data.title}</span>
                          </p>
                          <p className="w-full pl-5 font-medium">{data.task}</p>
                          <p className="w-full pl-5 text-base">
                            {data.task_board_details}
                          </p>
                          <div className="flex px-5 border-t py-5 text-lg flex-row max-sm:flex-col flex-wrap items-center font-light justify-between w-full text-nowrap">
                            <p className="text-center flex flex-row items-center gap-2 max-sm:w-full max-sm:text-sm">
                              <BsClock />
                              <span className="font-medium">
                                {format(data.assign_time)}
                              </span>
                            </p>
                            <p className="text-center flex flex-row items-center gap-2 max-sm:w-full max-sm:text-sm">
                              <PiCalendarBlankLight />
                              <span className="font-medium">
                                {format(data.deadline)}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-1/3 max-lg:w-full h-full flex flex-col items-center overflow-hidden text-2xl font-semibold text-[#444444]">
                  <div className="flex w-full flex-row items-center justify-between px-5 border-b-2 border-b-[#006EFF] py-2 shadow-md">
                    <p>On Going</p>
                    <p className="font-normal border border-gray-300 rounded-3xl px-5">
                      {taskProgress && taskProgress.length}
                    </p>
                  </div>
                  <div className="max-h-[750px] w-full overflow-scroll gap-5 flex flex-col py-4 max-lg:flex-row">
                    {taskProgress &&
                      taskProgress.map((data) => (
                        <div className="w-full flex flex-col items-center gap-4 pt-5 border shadow-md rounded-md max-sm:min-w-[80vw] max-sm:justify-between">
                          <p className=" w-full font-bold text-3xl px-5 flex-col flex justify-between ">
                            <span className="flex flex-row w-full items-center justify-end gap-2">
                              <span className="text-sm">
                                {handleAssignByName(data.assigned_by)}
                              </span>
                              <span className="text-sm">
                                {handleAssignByID(data.assigned_by)}
                              </span>
                            </span>
                            <span>{data.title}</span>
                          </p>
                          <p className="w-full pl-5 font-medium">{data.task}</p>
                          <p className="w-full pl-5 text-base">
                            {data.task_board_details}
                          </p>
                          <div className="flex px-5 border-t py-5 text-lg flex-row max-sm:flex-col max-sm:justify-start items-center font-light justify-between w-full text-nowrap">
                            <p className="text-center flex flex-row items-center gap-2 max-sm:w-full max-sm:text-sm">
                              <BsClock />
                              <span className="font-medium">
                                {format(data.assign_time)}
                              </span>
                            </p>
                            <p className="text-center flex flex-row items-center gap-2 max-sm:w-full max-sm:text-sm">
                              <PiCalendarBlankLight />
                              <span className="font-medium">
                                {format(data.deadline)}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-1/3 max-lg:w-full h-full flex flex-col items-center overflow-hidden text-2xl font-semibold text-[#444444]">
                  <div className="flex w-full flex-row items-center justify-between px-5 border-b-2 border-b-[#00A02B] py-2 shadow-md">
                    <p>Completed</p>
                    <p className="font-normal border border-gray-300 rounded-3xl px-5">
                      {taskComplete && taskComplete.length}
                    </p>
                  </div>
                  <div className="max-h-[750px] w-full overflow-scroll gap-5 flex flex-col py-4 max-lg:flex-row">
                    {taskComplete &&
                      taskComplete.map((data) => (
                        <div className="w-full flex flex-col items-center gap-4 pt-5 border shadow-md rounded-md max-sm:min-w-[80vw] max-sm:justify-between">
                          <p className=" w-full font-bold text-3xl px-5 flex-col flex justify-between ">
                            <span className="flex flex-row w-full items-center justify-end gap-2">
                              <span className="text-sm">
                                {handleAssignByName(data.assigned_by)}
                              </span>
                              <span className="text-sm">
                                {handleAssignByID(data.assigned_by)}
                              </span>
                            </span>
                            <span>{data.title}</span>
                          </p>
                          <p className="w-full pl-5 font-medium">{data.task}</p>
                          <p className="w-full pl-5 text-base">
                            {data.task_board_details}
                          </p>
                          <div className="flex px-5 border-t py-5 text-lg flex-row max-sm:flex-col items-center font-light justify-between w-full text-nowrap">
                            <p className="text-center flex flex-row items-center gap-2 max-sm:w-full max-sm:text-sm">
                              <BsClock />
                              <span className="font-medium">
                                {format(data.assign_time)}
                              </span>
                            </p>
                            <p className="text-center flex flex-row items-center gap-2 text-[#00A02B] max-sm:w-full max-sm:text-sm">
                              <IoMdDoneAll />
                              <span className="font-medium">
                                {format(data.deadline)}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="w-full  mt-4 flex justify-center pr-20 text-2xl">
                please Assign Task
              </p>
            )}
          </div>

          <Dialog
            className="w-1/3 h-2/3 rounded-xl bg-gray-900 "
            onHide={onHide}
            draggable={false}
            header="Assgin Task"
            visible={taskvisible}
            position="center"
            style={{ width: "500px", height: "600px" }}
            headerClassName={"text-5xl"}
          >
            <form
              onSubmit={taskSubmit}
              className="border-t-2 border-[--common-color] h-fit p-2 shadow-md"
            >
              <label className="block text-black font-medium">Title</label>
              <input
                placeholder="Enter Title"
                type="text"
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-4 rounded-md outline-[--common-color] mb-4"
                required
              />
              <label className="block text-black font-medium">Task</label>
              <input
                placeholder="Enter Task"
                type="text"
                onChange={(e) => setTask(e.target.value)}
                className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-4 rounded-md outline-[--common-color] mb-4"
                required
              />
              <label className="block text-black font-medium">Details</label>
              <input
                placeholder="Task Details"
                onChange={(e) => setTaskDetails(e.target.value)}
                className="border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-4 rounded-md outline-[--common-color] w-full mb-4"
                required
              />

              <label className="block text-black font-medium">Deadline</label>
              <input
                type="datetime-local"
                value={selectedDate}
                onChange={handleDateChange}
                min={formatDate(today)}
                className="w-full border mb-8 border-[--bg-gray] bg-white shadow-md px-3 py-4 rounded-md outline-[--common-color]"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center"
              >
                <p className="py-2 flex rounded bg-[--common-color] shadow-md hover:scale-105 duration-200 text-white items-center justify-center w-fit px-5 h-full text-lg">
                  Submit
                </p>
              </button>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
