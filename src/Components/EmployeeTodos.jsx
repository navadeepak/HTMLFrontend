import React, { useEffect, useState } from "react";
import { BsArrowRight, BsClock } from "react-icons/bs";
import axios from "./utilities/axiosInstance";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { BiRightArrowAlt } from "react-icons/bi";
import { PiCalendarBlankLight } from "react-icons/pi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { IoMdDoneAll } from "react-icons/io";
import toast from "react-hot-toast";

// export const fetchUserRole = { fetchUserRole };
export default function EmployeeTodos() {
  const [ToDo, setToDo] = useState([]); // Initialize toDo as an empty array
  const [allTask, setAllTask] = useState();
  const [taskTodo, setTaskTodo] = useState([]);
  const [taskProgress, setTaskProgress] = useState([]);
  const [taskComplete, setTaskComplete] = useState([]);
  const [role, setRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [completeFile, setCompleteFile] = useState("");

  const data = [
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
    { date: "10/10/2000", domain: "domain", title: "title" },
  ];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleAssignByID = (data) => {
    let id = data.split("&")[0];
    return id;
  };

  const handleAssignByName = (data) => {
    let name = data.split("&")[1];
    return name;
  };

  useEffect(() => {
    const fetchUserRole = async (email) => {
      try {
        const response = await axios.get(`employees/check-role/${email}`);
        setRole(response.data.role);
        setEmployeeId(response.data.employee_ID);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchUserRole(user.email);
    }
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/employees/task_list/${employeeId}`
      );

      const data = response.data;
      // console.log(data)
      setAllTask(data); // Assuming you want to set the task list from the response
    } catch (error) {
      console.error("Error fetching user tasks:", error.message);
    }
  };
  useEffect(() => {
    if (employeeId) {
      fetchUserRole();
    }
  }, [employeeId]); // This ensures the effect runs whenever employeeId changes

  useEffect(() => {
    if (allTask) {
      console.log(allTask.task_list); // Log the tasks when allTask state is updated
    }
  }, [allTask]);

  useEffect(() => {
    const filteredTodo = allTask?.task_list?.filter(
      (e) => e.task_board_type === "To_do"
    );
    console.log("todo", filteredTodo);
    setTaskTodo(filteredTodo);
    const filteredProgress = allTask?.task_list?.filter(
      (e) => e.task_board_type === "In_Progress"
    );
    setTaskProgress(filteredProgress);
    // console.log("Progress--",taskProgress)
    const filteredCompleted = allTask?.task_list?.filter(
      (e) => e.task_board_type === "Completed"
    );
    setTaskComplete(filteredCompleted);
    // console.log("Completed--",taskComplete)
  }, [allTask]);

  const handleOngoing = async (data) => {
    console.log("ongoing", data);

    const taskData = {
      task_list: [
        {
          task_board_type: "In_Progress",
          title: data.title,
          task: data.task,
          task_board_details: data.task_board_details,
          deadline: data.deadline,
          assign_time: data.assign_time,
          assigned_by: data.assigned_by,
          task_board_ID: data.task_board_ID,
        },
      ],
    };

    const url = `http://localhost:3001/employees/task_list/${employeeId}`;

    try {
      const response = await axios.put(url, taskData);
      toast.success("Task updated successfully!");
      console.log(response);
      // console.log(taskData);
      // setTaskVisible(false);
    } catch (error) {
      toast.error("Error updating task.");
      console.error("Error updating task:", error);
    }
  };

  const handleComplete = async (data) => {
    console.log("complete", data);

    const taskData = {
      task_list: [
        {
          task_board_type: "Completed",
          title: data.title,
          task: data.task,
          task_board_details: data.task_board_details,
          deadline: data.deadline,
          assign_time: data.assign_time,
          assigned_by: data.assigned_by,
          task_board_ID: data.task_board_ID,
        },
      ],
    };

    const url = `http://localhost:3001/employees/task_list/${employeeId}`;

    try {
      const response = await axios.put(url, taskData);
      toast.success("Task marked as completed!");
      console.log(response);
      // console.log(taskData);
      // setTaskVisible(false);
    } catch (error) {
      toast.error("Error completing task.");
      console.error("Error completing task:", error);
    }
  };

  const handleCompleteFileUplaod = () => {
    console.log("Complete File", data);
  };

  const formatDate = (assignTime) => {
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
    <div className="p-4 lg:p-6 xl:p-8">
      <div className="p-4 xl:p-8 pb-0 h-full min-h-screen w-full border shadow-md rounded-lg">
        <div className="h-full w-full flex flex-col gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 xl:flex-row">
          {/* Pending Section */}
          <div className="w-full xl:w-1/3 h-full flex flex-col items-center text-base lg:text-lg xl:text-xl font-semibold text-[#444444]">
            <div className="flex w-full flex-row items-center justify-between px-4 lg:px-6 xl:px-8 border-b-2 border-b-[#FF0303] py-2 shadow-md">
              <p>Pending</p>
              <p className="font-normal border border-gray-300 rounded-3xl px-4 xl:px-6 ">
                {taskTodo?.length}
              </p>
            </div>
            <div className="max-h-[300px] lg:max-h-[500px] xl:max-h-[650px] 2xl:max-h-[800px] w-full overflow-y-auto gap-4 lg:gap-6 xl:gap-8 flex flex-col py-4 xl:py-5">
              {taskTodo?.map((data) => (
                <div className="w-full flex flex-col items-center gap-4 lg:gap-5 xl:gap-6 pt-4 lg:pt-5 xl:pt-6 border shadow-md rounded-md">
                  <p className="w-full font-bold text-base xl:text-lg  flex flex-row justify-between items-start px-4 xl:px-6">
                    <span className="w-1/2">{data.title}</span>
                    <Button
                      onClick={() => handleOngoing(data)}
                      variant="contained"
                      className="flex gap-4 xl:gap-5 w-1/2"
                    >
                      On going
                      <BiRightArrowAlt className="text-xl" />
                    </Button>
                  </p>
                  <p className="w-full pl-4 xl:pl-6 font-medium">{data.task}</p>
                  <p className="w-full pl-4 xl:pl-6 text-sm lg:text-base">
                    {data.task_board_details}
                  </p>
                  <div className="flex px-4 xl:px-6 border-t py-3 xl:py-4 text-base xl:text-lg flex-col items-center font-light justify-between w-full">
                    <div className="flex w-full justify-between">
                      <p className="flex flex-row items-center gap-2">
                        <BsClock />
                        <span className="font-medium">
                          {formatDate(data.assign_time)}
                        </span>
                      </p>
                      <p className="flex flex-row items-center gap-2">
                        <PiCalendarBlankLight />
                        <span className="font-medium">
                          {formatDate(data.deadline)}
                        </span>
                      </p>
                    </div>
                    <p className="flex w-full justify-between mt-2">
                      <span className="text-lg mr-10">
                        {handleAssignByName(data.assigned_by)}
                      </span>
                      <span className="text-lg mr-10">
                        {handleAssignByID(data.assigned_by)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* On Going Section */}
          <div className="w-full xl:w-1/3 h-full flex flex-col items-center text-base lg:text-lg xl:text-xl font-semibold text-[#444444]">
            <div className="flex w-full flex-row items-center justify-between px-4 lg:px-6 xl:px-8 border-b-2 border-b-[#006EFF] py-2 shadow-md">
              <p>On Going</p>
              <p className="font-normal border border-gray-300 rounded-3xl px-4 xl:px-6 ">
                {taskProgress?.length}
              </p>
            </div>
            <div className="max-h-[300px] lg:max-h-[500px] xl:max-h-[650px] 2xl:max-h-[800px] w-full overflow-y-auto gap-4 lg:gap-6 xl:gap-8 flex flex-col py-4 lg:py-5 xl:py-6">
              {taskProgress?.map((data) => (
                <div className="w-full flex flex-col items-center gap-4 xl:gap-5 pt-4 xl:pt-5 border shadow-md rounded-md">
                  <p className="w-full font-bold text-base xl:text-lg  flex flex-row justify-between items-start px-4 xl:px-6 ">
                    <span className="w-1/2">{data.title}</span>
                    <Button
                      onClick={() => handleComplete(data)}
                      variant="contained"
                      className="flex gap-4 xl:gap-5 w-1/2"
                    >
                      Completed
                      <BiRightArrowAlt className="text-xl" />
                    </Button>
                  </p>
                  <p className="w-full pl-4 xl:pl-6 font-medium">{data.task}</p>
                  <p className="w-full pl-4 xl:pl-6 text-sm lg:text-base">
                    {data.task_board_details}
                  </p>
                  <div className="flex px-4 xl:px-6 border-t py-3 xl:py-4 text-base xl:text-lg flex-col items-center font-light justify-between w-full">
                    <div className="flex w-full justify-between">
                      <p className="flex flex-row items-center gap-2">
                        <BsClock />
                        <span className="font-medium">
                          {formatDate(data.assign_time)}
                        </span>
                      </p>
                      <p className="flex flex-row items-center gap-2">
                        <PiCalendarBlankLight />
                        <span className="font-medium">
                          {formatDate(data.deadline)}
                        </span>
                      </p>
                    </div>
                    <p className="flex w-full justify-between mt-2">
                      <span className="text-lg mr-10">
                        {handleAssignByName(data.assigned_by)}
                      </span>
                      <span className="text-lg mr-10">
                        {handleAssignByID(data.assigned_by)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Section */}
          <div className="w-full xl:w-1/3 h-full flex flex-col items-center text-base lg:text-lg xl:text-xl font-semibold text-[#444444]">
            <div className="flex w-full flex-row items-center justify-between px-4 xl:px-6 border-b-2 border-b-[#00A02B] py-2 shadow-md">
              <p>Completed</p>
              <p className="font-normal border border-gray-300 rounded-3xl px-4 xl:px-6 ">
                {taskComplete?.length}
              </p>
            </div>
            <div className="max-h-[300px] lg:max-h-[500px] xl:max-h-[650px] 2xl:max-h-[800px] w-full overflow-y-auto gap-4 lg:gap-6 xl:gap-8 flex flex-col py-4 lg:py-5 xl:py-6">
              {taskComplete?.map((data) => (
                <div className="w-full flex flex-col items-center gap-4 xl:gap-5 pt-4 xl:pt-5  border shadow-md rounded-md">
                  <p className="w-full font-bold text-base xl:text-lg  flex flex-row justify-between items-start px-4 xl:px-6">
                    <span className="w-1/2">{data.title}</span>
                    <Button
                      onClick={() => handleCompleteFileUpload(data)}
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      className="w-1/2"
                    >
                      Upload files
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                      />
                    </Button>
                  </p>
                  <p className="w-full pl-4 xl:pl-6 font-medium">{data.task}</p>
                  <p className="w-full pl-4 xl:pl-6 text-sm lg:text-base">
                    {data.task_board_details}
                  </p>
                  <div className="flex px-4 xl:px-6 border-t py-3 xl:py-4 text-base xl:text-lg flex-col items-center font-light justify-between w-full">
                    <div className="flex w-full justify-between">
                      <p className="flex flex-row items-center gap-2">
                        <BsClock />
                        <span className="font-medium">
                          {formatDate(data.assign_time)}
                        </span>
                      </p>
                      <p className="flex flex-row items-center gap-2">
                        <PiCalendarBlankLight />
                        <span className="font-medium">
                          {formatDate(data.deadline)}
                        </span>
                      </p>
                    </div>
                    <p className="flex w-full justify-between mt-2">
                      <span className="text-lg mr-10">
                        {handleAssignByName(data.assigned_by)}
                      </span>
                      <span className="text-lg mr-10">
                        {handleAssignByID(data.assigned_by)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
